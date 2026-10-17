/* Glidepath tools: visual calculators and a METAR/TAF decoder. Mounted by content/pages/tools.js via G.tools.mount(). */
(function () {
  'use strict';
  const { el, icon } = G;
  const d2r = Math.PI / 180, r2d = 180 / Math.PI;
  const wrap = a => ((a % 360) + 360) % 360;
  const hdg = a => String(Math.round(wrap(a)) || 360).padStart(3, '0');
  const f0 = v => isFinite(v) ? Math.round(v).toLocaleString('en-IN') : '—';
  const f1 = v => isFinite(v) ? (Math.round(v * 10) / 10).toLocaleString('en-IN') : '—';
  const hm = h => { if (!isFinite(h) || h < 0) return '—'; const m = Math.round(h * 60); return Math.floor(m / 60) + ' h ' + String(m % 60).padStart(2, '0') + ' min'; };

  /* ---------- "How it's calculated" pop-ups: short, same shape for every tool ---------- */
  const HOW = {
    crosswind: { what: 'Splits the wind into a part along the runway (head/tailwind) and a part across it (crosswind).',
      f: ['Crosswind = V × sin θ', 'Headwind = V × cos θ', 'θ = wind direction − runway heading'],
      ex: ['RWY 27, wind 240°/20 kt', 'θ = 240 − 270 = 30° (from the left)', 'Crosswind = 20 × 0.5 = 10 kt', 'Headwind = 20 × 0.87 = 17 kt'],
      rem: ['Clock code: 30° → ½, 45° → ¾, 60°+ → all of it.', 'METAR winds are TRUE; runway numbers are MAGNETIC. Check the gust against the limit.'] },
    triangle: { what: 'Heading/TAS + wind = track/groundspeed. Gives the heading to steer and your groundspeed.',
      f: ['sin WCA = W × sin(WA) ÷ TAS', 'Heading = track + WCA', 'GS = TAS × cos WCA − W × cos WA', 'WA = wind direction − track'],
      ex: ['Track 090°, TAS 150 kt, wind 030°/30 kt', 'WA = −60° → sin WCA = 30 × (−0.87) ÷ 150 → WCA = −10°', 'Heading = 080°', 'GS = 147.7 − 15 = 133 kt'],
      rem: ['Max drift ≈ W ÷ TAS × 60 degrees.', 'Wind from the left → drift right → steer left (into wind).'] },
    isa: { what: 'Compares the real temperature with ISA to get the deviation, density altitude and TAS.',
      f: ['ISA temp = 15 − 2 × (PA ÷ 1000)', 'ISA dev = OAT − ISA temp', 'Density alt ≈ PA + 120 × ISA dev', 'TAS ≈ CAS + 2% per 1000 ft'],
      ex: ['PA 8000 ft, OAT +10 °C', 'ISA temp = 15 − 16 = −1 °C', 'ISA dev = +11', 'Density alt ≈ 8000 + 1320 ≈ 9,300 ft'],
      rem: ['ISA: 15 °C, 1013.25 hPa at MSL; −56.5 °C above 36,090 ft.', 'Hot and high = poor performance.'] },
    altim: { what: 'Converts between QNH, QFE and pressure altitude / flight level.',
      f: ['1 hPa ≈ 30 ft', 'QFE = QNH − elevation ÷ 30', 'PA = altitude + (1013 − QNH) × 30', 'FL = PA ÷ 100'],
      ex: ['Elevation 2000 ft, QNH 1003, at 6000 ft', 'QFE = 1003 − 67 = 936 hPa', 'PA = 6000 + 10 × 30 = 6,300 ft', 'FL063'],
      rem: ['QNH below 1013 → PA is higher than altitude.', 'High to low, look out below.'] },
    cloud: { what: 'Estimates the base of cumulus cloud from the temperature–dew point spread.',
      f: ['Base (ft AGL) ≈ (T − Td) × 400'],
      ex: ['T 30 °C, Td 22 °C', 'Spread = 8 °C', 'Base ≈ 8 × 400 = 3,200 ft'],
      rem: ['Why 400: the spread closes ≈ 2.5 °C per 1000 ft.', 'Spread ≤ 2 °C on a calm clear night → fog likely.'] },
    one60: { what: 'Gets you back on track using: 1 NM off after 60 NM = 1°.',
      f: ['TE = off × 60 ÷ distance gone', 'CA = off × 60 ÷ distance to go', 'Turn = TE + CA (to reach destination)'],
      ex: ['40 NM gone, 4 NM off, 80 NM to go', 'TE = 240 ÷ 40 = 6°', 'CA = 240 ÷ 80 = 3°', 'Turn 9° towards track'],
      rem: ['Parallel the track: turn by TE only.', 'Halfway: TE = CA, so double the TE.'] },
    pnr: { what: 'PET: same time to go on or turn back. PNR: furthest point you can go and still return.',
      f: ['PET distance = D × H ÷ (O + H)', 'PNR time = E × H ÷ (O + H)', 'PNR distance = PNR time × O', 'O = GS out, H = GS home, E = endurance'],
      ex: ['TAS 200, 20 kt headwind out, E 5 h, D 600 NM', 'O = 180, H = 220', 'PET = 600 × 220 ÷ 400 = 330 NM', 'PNR = 5 × 220 ÷ 400 = 2.75 h → 495 NM'],
      rem: ['Still air: PET is halfway. Headwind out moves it towards the destination.', 'PET ignores fuel; PNR depends on it.'] },
    sdt: { what: 'Distance, speed and time: know two, get the third. Fuel = flow × time.',
      f: ['D = S × T', 'T (min) = D ÷ S × 60', 'Fuel = flow × time'],
      ex: ['GS 180 kt, 270 NM, 2400 kg/h', 'T = 270 ÷ 180 = 1.5 h', 'Fuel = 2400 × 1.5 = 3,600 kg'],
      rem: ['180 kt = 3 NM/min, 240 kt = 4 NM/min.', 'Use groundspeed, not TAS.'] },
    descent: { what: 'Where to start down and what rate of descent to fly.',
      f: ['3° path ≈ 318 ft per NM', 'Distance ≈ height (thousands) × 3', 'ROD ≈ GS × 5'],
      ex: ['FL330 → 3000 ft, GS 300 kt', 'Height 30,000 ft → 30 × 3 = 90 NM', 'ROD ≈ 300 × 5 = 1,500 ft/min'],
      rem: ['Exact: distance = height ÷ (6076 × tan θ).', 'Tailwind → higher ROD for the same path.'] },
    time: { what: 'Converts longitude to time and gives local mean time and IST.',
      f: ['15° = 1 h, 1° = 4 min', 'LMT = UTC + longitude E ÷ 15 (− for W)', 'IST = UTC + 5:30'],
      ex: ['UTC 1200, 77.2° E', '77.2 × 4 = 309 min = 5:09', 'LMT = 1709', 'IST = 1730'],
      rem: ['Longitude east, UTC least; west, UTC best.', 'Date line: eastbound −1 day, westbound +1 day.'] },
    conv: { what: 'East-west distance (departure), convergency and the GC–RL conversion angle.',
      f: ['Departure = d.long (′) × cos lat', 'Convergency = d.long × sin mean lat', 'Conversion angle = ½ convergency'],
      ex: ['d.long 10°, lat 30°', 'Departure = 600 × 0.866 = 520 NM', 'Convergency = 10 × 0.5 = 5°', 'Conversion angle = 2.5°'],
      rem: ['1° of longitude: 60 NM at the equator, 30 NM at 60°.', 'The great circle lies on the polar side of the rhumb line.'] },
    turn: { what: 'Turn radius, rate of turn and load factor for a bank angle.',
      f: ['R (ft) = V² ÷ (11.26 × tan φ)', 'Rate (°/s) = 1091 × tan φ ÷ V', 'Rate-1 bank ≈ TAS ÷ 10 + 7', 'n = 1 ÷ cos φ'],
      ex: ['150 kt, 30° bank (tan 0.577)', 'R = 22,500 ÷ 6.5 ≈ 3,460 ft', 'Rate = 1091 × 0.577 ÷ 150 ≈ 4.2°/s', 'n = 1.15 g'],
      rem: ['Rate 1 = 3°/s = 2 min for 360°.', 'Double the speed → 4× the radius.'] },
    units: { what: 'Converts aviation units; type in any box.',
      f: ['1 NM = 1.852 km = 6076 ft', '1 kt = 1.852 km/h', '1 m = 3.28 ft', '1 inHg = 33.86 hPa', '1 kg = 2.2 lb', '1 US gal = 3.785 L', '°F = °C × 9/5 + 32'],
      rem: ['Jet fuel ≈ 0.8 kg per litre.'] },
    metar: { what: 'Reads a METAR (actual weather) or TAF (forecast) group by group, left to right.',
      f: ['Station · time Z · wind · visibility · RVR · weather · cloud · temp/dew · QNH · trend'],
      ex: ['32008KT → from 320° at 8 kt', '9999 → 10 km or more', 'BKN008 → 5–7 oktas at 800 ft', 'M02/M05 → −2 / −5 °C'],
      rem: ['Cloud heights are above the aerodrome; winds are true.', 'CAVOK: vis ≥ 10 km, no cloud below 5000 ft, no CB/TCU, no weather.'] },
    tasmach: { what: 'True airspeed from calibrated airspeed, then Mach number.',
      f: ['TAS = CAS ÷ √σ (σ = density ratio)', 'Rule: TAS ≈ CAS + 2% per 1000 ft', 'LSS (kt) = 38.94 × √(T in K)', 'Mach = TAS ÷ LSS'],
      ex: ['CAS 250 kt, FL250 ISA (−34.5 °C)', 'σ ≈ 0.448 → TAS ≈ 373 kt', 'LSS = 38.94 × √238.7 ≈ 602 kt', 'Mach ≈ 0.62'],
      rem: ['Speed of sound depends on temperature only (661 kt at 15 °C).', 'Climbing at constant CAS: TAS and Mach rise.'] },
    cg: { what: 'The balance point: total moment ÷ total weight.',
      f: ['Moment = weight × arm', 'CG = Σ moments ÷ Σ weights'],
      ex: ['600 kg @ 2.0, 160 @ 1.8, 100 @ 2.2, 40 @ 3.2', 'Moments = 1200 + 288 + 220 + 128 = 1836', 'Weight = 900 kg', 'CG = 1836 ÷ 900 = 2.04 m'],
      rem: ['Aft CG: less stable. Forward CG: higher stall speed.', 'Fuel burn moves the CG.'] },
    radio: { what: 'Line-of-sight VHF range and the Q-code bearings.',
      f: ['Range (NM) ≈ 1.23 × (√h₁ + √h₂), h in ft', 'QDR = QDM ± 180', 'QTE = QDR + variation (E +, W −)', 'QUJ = QTE ± 180'],
      ex: ['10,000 ft and 100 ft; QDM 250°, var 2° W', 'Range = 1.23 × 110 ≈ 135 NM', 'QDR = 070°', 'QTE = 068°, QUJ = 248°'],
      rem: ['M = magnetic (QDM, QDR); T/U = true (QTE, QUJ).', 'QDM / QUJ point TO the station; QDR / QTE FROM it.'] },
  };
  function openHow(id, title) {
    const h = HOW[id]; if (!h) return;
    const blk = (cls, label, kids) => el('div', { class: 'hw-blk ' + cls }, el('div', { class: 'hw-lab' }, label), kids);
    const dlg = el('dialog', { class: 'howdlg', 'aria-label': title },
      el('div', { class: 'hw-head' }, el('h3', null, title), el('button', { class: 'hw-x', 'aria-label': 'Close', onclick: () => close() }, '✕')),
      el('div', { class: 'hw-body' },
        el('p', { class: 'hw-what' }, h.what),
        blk('f', 'Formula', h.f.map(x => el('div', { class: 'hw-eq' }, x))),
        h.ex ? blk('ex', 'Worked example', el('ol', null, h.ex.map((x, i) => i === 0 ? null : el('li', null, x)).filter(Boolean)), ) : null,
        h.rem ? blk('rem', 'Remember', el('ul', null, h.rem.map(x => el('li', null, x)))) : null));
    if (h.ex) dlg.querySelector('.hw-blk.ex .hw-lab').append(el('span', null, ' · ' + h.ex[0]));
    function close() { dlg.close(); }
    dlg.addEventListener('close', () => { dlg.remove(); document.body.classList.remove('hw-lock'); });
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });
    document.body.append(dlg); document.body.classList.add('hw-lock'); dlg.showModal();
  }
  const howButton = (id, title) => HOW[id] ? el('button', { class: 'how-btn', type: 'button', onclick: () => openHow(id, title) }, icon('info'), el('span', null, 'How it\'s calculated')) : null;

  /* ---------- small building blocks ---------- */
  function inputs(spec, onch) {
    const vals = {};
    const box = el('div', { class: 'tl-in' }, spec.map(s => {
      vals[s.k] = s.v;
      if (s.opts) {
        const sel = el('select', { onchange: e => { vals[s.k] = e.target.value; onch(); } }, s.opts.map(([v, t]) => el('option', { value: v, selected: v === s.v ? true : null }, t)));
        return el('label', null, el('span', null, s.l), sel);
      }
      const inp = el('input', { type: 'number', step: s.step || 'any', value: s.v, inputmode: 'decimal', oninput: e => { vals[s.k] = e.target.value === '' ? NaN : +e.target.value; onch(); } });
      return el('label', null, el('span', null, s.l), el('div', { class: 'tl-f' }, inp, s.u ? el('small', null, s.u) : null));
    }));
    return { box, vals };
  }
  const outs = items => el('div', { class: 'tl-out' }, items.filter(Boolean).map(([k, v, hot]) => el('div', { class: hot ? 'hot' : '' }, el('small', null, k), el('b', null, v))));
  function tool(o) {
    const sec = el('section', { class: 'lesson tool ' + (o.hue || 'h0'), id: o.id },
      el('div', { class: 'lhead' }, el('div', { class: 'ltile' }, icon(o.icon || 'calc')), el('div', null, el('h3', null, o.title), o.lead ? el('p', { class: 'lead' }, o.lead) : null)));
    const stage = el('div', { class: 'stage tl-stage' });
    const res = el('div', { class: 'tl-res' }); const pic = el('div', { class: 'tl-pic' });
    const { box, vals } = inputs(o.inputs || [], () => draw());
    function draw() { try { const r = o.calc(vals); res.replaceChildren(outs(r.out)); pic.innerHTML = r.svg || ''; pic.hidden = !r.svg; } catch (e) { console.error(o.id, e); res.replaceChildren(el('p', { class: 'hint' }, 'Check the inputs.')); } }
    const hb = howButton(o.id, o.title); if (hb) stage.append(el('div', { class: 'tl-top' }, hb));
    stage.append(el('div', { class: 'tl-grid' }, el('div', null, box, res), pic));
    if (o.note) stage.append(el('p', { class: 'hint tl-note' }, o.note));
    sec.append(stage); draw();
    return sec;
  }
  const arrow = (x1, y1, x2, y2, col, w = 3, dash) => G.FH ? G.FH.arrow(x1, y1, x2, y2, col, w, dash) : `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}"/>`;
  const T = (x, y, t, col = 'var(--ink)', a = 'middle', sz = 13, wt = 700) => `<text x="${x}" y="${y}" text-anchor="${a}" style="font:${wt} ${sz}px var(--font);fill:${col};paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round">${t}</text>`;

  /* ---------- 1. crosswind ---------- */
  const crosswind = () => tool({
    id: 'crosswind', title: 'Crosswind and headwind', icon: 'wind', hue: 'h0',
    lead: 'Runway heading and the wind (direction it blows FROM, speed) → the two components.',
    inputs: [{ k: 'rwy', l: 'Runway (e.g. 27 or 270)', v: 27 }, { k: 'wd', l: 'Wind from', v: 240, u: '°' }, { k: 'ws', l: 'Wind speed', v: 20, u: 'kt' }, { k: 'g', l: 'Gust (optional)', v: 0, u: 'kt' }],
    calc: v => {
      const rh = v.rwy < 37 ? v.rwy * 10 : v.rwy; const a = wrap(v.wd - rh); const ar = a * d2r;
      const hw = v.ws * Math.cos(ar), xw = v.ws * Math.sin(ar), xg = v.g ? v.g * Math.sin(ar) : 0;
      const ang = a > 180 ? a - 360 : a;
      const cx = 170, cy = 150, L = 110;
      const wx = cx + L * Math.sin(ang * d2r), wy = cy - L * Math.cos(ang * d2r);
      return {
        out: [['Angle off the runway', Math.abs(Math.round(ang)) + '° ' + (ang > 0 ? 'right' : ang < 0 ? 'left' : '')], [hw >= 0 ? 'Headwind' : 'Tailwind', f0(Math.abs(hw)) + ' kt', hw < 0], ['Crosswind', f0(Math.abs(xw)) + ' kt from the ' + (xw >= 0 ? 'right' : 'left'), true], v.g ? ['Gust crosswind', f0(Math.abs(xg)) + ' kt'] : null],
        svg: `<svg viewBox="0 0 340 300"><rect x="${cx - 22}" y="20" width="44" height="260" rx="6" fill="var(--wash)" stroke="var(--line)"/>
          <line x1="${cx}" y1="30" x2="${cx}" y2="270" stroke="var(--wire)" stroke-width="3" stroke-dasharray="14 10"/>${T(cx, 296, 'RWY ' + String(Math.round(rh / 10)).padStart(2, '0'), 'var(--muted)')}
          ${arrow(wx, wy, cx, cy, '#3c8cf0', 4)}${T(wx + (wx > cx ? 10 : -10), wy - 6, f0(v.ws) + ' kt from ' + hdg(v.wd), '#3c8cf0', wx > cx ? 'start' : 'end')}
          ${Math.abs(xw) > .5 ? arrow(cx + Math.sign(xw) * 70, cy + 40, cx + Math.sign(xw) * 8, cy + 40, '#d4493a', 3) + T(cx + Math.sign(xw) * 74, cy + 44, 'X ' + f0(Math.abs(xw)), '#d4493a', xw > 0 ? 'start' : 'end') : ''}
          ${Math.abs(hw) > .5 ? arrow(cx - 40, hw > 0 ? 60 : 240, cx - 40, hw > 0 ? 120 : 180, '#2fb36b', 3) + T(cx - 46, hw > 0 ? 92 : 212, (hw > 0 ? 'H ' : 'T ') + f0(Math.abs(hw)), '#2fb36b', 'end') : ''}</svg>`,
      };
    },
    note: 'Crosswind = W × sin(angle); headwind = W × cos(angle). Quick rule: 30° → ½, 45° → ¾ (0.7), 60° → ~0.9 of the wind is crosswind.',
  });

  /* ---------- 2. navigation wind triangle ---------- */
  const triangle = () => tool({
    id: 'triangle', title: 'Wind triangle: heading, groundspeed, drift', icon: 'compass', hue: 'h1',
    lead: 'Required track, TAS and the wind velocity → heading to steer and groundspeed.',
    inputs: [{ k: 'tr', l: 'Track required', v: 90, u: '°T' }, { k: 'tas', l: 'TAS', v: 150, u: 'kt' }, { k: 'wd', l: 'Wind from', v: 30, u: '°T' }, { k: 'ws', l: 'Wind speed', v: 30, u: 'kt' }],
    calc: v => {
      const wa = (v.wd - v.tr) * d2r; const sinWca = v.ws * Math.sin(wa) / v.tas;
      if (Math.abs(sinWca) > 1) return { out: [['Result', 'Wind too strong for this TAS', true]] };
      const wca = Math.asin(sinWca) * r2d; const hd = wrap(v.tr + wca); const gs = v.tas * Math.cos(wca * d2r) - v.ws * Math.cos(wa);
      /* drawing: vectors scaled */
      const k = 150 / Math.max(v.tas, gs, 1); const ox = 40, oy = 230;
      const tv = [Math.sin(hd * d2r) * v.tas * k, -Math.cos(hd * d2r) * v.tas * k];
      const wv = [Math.sin((v.wd + 180) * d2r) * v.ws * k, -Math.cos((v.wd + 180) * d2r) * v.ws * k];
      const rot = -(v.tr - 90) * d2r; /* rotate so the track points right */
      const R = ([x, y]) => [x * Math.cos(rot) - y * Math.sin(rot), x * Math.sin(rot) + y * Math.cos(rot)];
      const a = R(tv), b = R([tv[0] + wv[0], tv[1] + wv[1]]);
      return {
        out: [['Heading to steer', hdg(hd) + '°T', true], ['Groundspeed', f0(gs) + ' kt', true], ['Drift / WCA', Math.abs(f1(wca)) + '° ' + (wca > 0 ? 'right (steer into wind)' : wca < 0 ? 'left (steer into wind)' : 'nil')], ['Headwind component', f0(v.ws * Math.cos(wa)) + ' kt']],
        svg: `<svg viewBox="0 0 340 300">${arrow(ox, oy - 60, ox + a[0], oy - 60 + a[1], 'var(--ink)', 3)}${arrow(ox + a[0], oy - 60 + a[1], ox + b[0], oy - 60 + b[1], '#3c8cf0', 3)}${arrow(ox, oy - 60, ox + b[0], oy - 60 + b[1], '#2fb36b', 4)}
          ${T(ox + a[0] / 2, oy - 60 + a[1] / 2 - 10, 'HDG/TAS', 'var(--ink)')}${T(ox + (a[0] + b[0]) / 2 + 8, oy - 60 + (a[1] + b[1]) / 2 + 4, 'W/V', '#3c8cf0', 'start')}${T(ox + b[0] / 2, oy - 60 + b[1] / 2 + 22, 'TR/GS', '#2fb36b')}</svg>`,
      };
    },
    note: 'Three vectors: heading/TAS + wind = track/groundspeed. Wind correction angle = asin(W·sin(wind angle)/TAS). Steer into the wind.',
  });

  /* ---------- 3. ISA, density altitude, TAS ---------- */
  const isa = () => tool({
    id: 'isa', title: 'ISA deviation and density altitude', icon: 'thermo', hue: 'h2',
    lead: 'Pressure altitude and outside air temperature → ISA temperature, deviation, density altitude and approximate TAS.',
    inputs: [{ k: 'pa', l: 'Pressure altitude', v: 8000, u: 'ft' }, { k: 'oat', l: 'Outside air temp', v: 10, u: '°C' }, { k: 'cas', l: 'CAS (optional)', v: 120, u: 'kt' }],
    calc: v => {
      const isaT = v.pa <= 36090 ? 15 - 1.98 * v.pa / 1000 : -56.5; const dev = v.oat - isaT; const da = v.pa + 120 * dev;
      const tas = v.cas ? v.cas * (1 + 0.02 * v.pa / 1000) * Math.sqrt((273.15 + v.oat) / (273.15 + isaT)) : NaN;
      return { out: [['ISA temperature', f1(isaT) + ' °C'], ['ISA deviation', (dev >= 0 ? 'ISA +' : 'ISA ') + f1(dev), true], ['Density altitude', f0(da) + ' ft', true], v.cas ? ['TAS (approx.)', f0(tas) + ' kt'] : null] };
    },
    note: 'ISA: 15 °C at MSL, −1.98 °C per 1000 ft to 36,090 ft, then −56.5 °C. Density altitude ≈ PA + 120 × ISA deviation. TAS ≈ CAS + 2% per 1000 ft (corrected here for temperature).',
  });

  /* ---------- 4. altimetry ---------- */
  const altim = () => tool({
    id: 'altim', title: 'QNH, QFE and pressure altitude', icon: 'gauge', hue: 'h3',
    lead: 'Aerodrome elevation and QNH → QFE, the aerodrome\'s pressure altitude, and your flight level.',
    inputs: [{ k: 'el', l: 'Aerodrome elevation', v: 2000, u: 'ft' }, { k: 'qnh', l: 'QNH', v: 1003, u: 'hPa' }, { k: 'alt', l: 'Your altitude (on QNH)', v: 6000, u: 'ft' }, { k: 'f', l: 'ft per hPa', v: '30', opts: [['30', '30 ft/hPa (DGCA)'], ['27', '27 ft/hPa (low level)']] }],
    calc: v => {
      const f = +v.f; const qfe = v.qnh - v.el / f; const paAd = v.el + (1013.25 - v.qnh) * f; const pa = v.alt + (1013.25 - v.qnh) * f;
      return { out: [['QFE', f0(qfe) + ' hPa', true], ['Aerodrome pressure altitude', f0(paAd) + ' ft'], ['Your pressure altitude', f0(pa) + ' ft'], ['Flight level', 'FL' + String(Math.max(0, Math.round(pa / 100))).padStart(3, '0'), true], ['Height above aerodrome', f0(v.alt - v.el) + ' ft']] };
    },
    note: 'PA = altitude + (1013 − QNH) × 30. QNH below 1013 → PA is higher than altitude. "High to low, look out below."',
  });

  /* ---------- 5. 1-in-60 ---------- */
  const oneIn60 = () => tool({
    id: 'one60', title: '1-in-60: back on track', icon: 'route', hue: 'h4',
    lead: 'Distance gone, how far off track, distance to go → track error, closing angle and the heading change.',
    inputs: [{ k: 'dg', l: 'Distance gone', v: 40, u: 'NM' }, { k: 'off', l: 'Off track', v: 4, u: 'NM' }, { k: 'dt', l: 'Distance to go', v: 80, u: 'NM' }],
    calc: v => {
      const te = v.off * 60 / v.dg, ca = v.off * 60 / v.dt;
      const W = 330, s = (W - 40) / (v.dg + v.dt), y0 = 150, ofs = Math.min(70, v.off * s * 3 + 20);
      const A = [20, y0], P = [20 + v.dg * s, y0 - ofs], B = [20 + (v.dg + v.dt) * s, y0];
      return {
        out: [['Track error (TE)', f1(te) + '°'], ['Closing angle (CA)', f1(ca) + '°'], ['Turn to reach destination', f1(te + ca) + '°', true], ['Turn to parallel track', f1(te) + '°']],
        svg: `<svg viewBox="0 0 350 200"><line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="var(--wire)" stroke-width="2" stroke-dasharray="6 5"/>${T((A[0] + B[0]) / 2, y0 + 20, 'planned track', 'var(--muted)', 'middle', 12, 600)}
          ${arrow(A[0], A[1], P[0], P[1], 'var(--ink)', 3)}${arrow(P[0], P[1], B[0], B[1], '#2fb36b', 3)}
          <line x1="${P[0]}" y1="${P[1]}" x2="${P[0]}" y2="${y0}" stroke="#d4493a" stroke-width="2"/>${T(P[0] + 6, (P[1] + y0) / 2 + 4, f1(v.off) + ' NM off', '#d4493a', 'start', 12)}
          ${T(A[0] + 30, y0 - 10, 'TE ' + f1(te) + '°', 'var(--ink)', 'start', 12)}${T(B[0] - 30, y0 - 10, 'CA ' + f1(ca) + '°', '#2fb36b', 'end', 12)}
          <circle cx="${A[0]}" cy="${A[1]}" r="4" fill="var(--ink)"/><circle cx="${B[0]}" cy="${B[1]}" r="5" fill="var(--warn)"/></svg>`,
      };
    },
    note: 'At 60 NM, 1 NM off = 1°. TE = off × 60 / gone; CA = off × 60 / to go. Alter heading by TE + CA to reach the destination, by TE alone to parallel.',
  });

  /* ---------- 6. PNR and PET ---------- */
  const pnr = () => tool({
    id: 'pnr', title: 'PNR and PET (ETP)', icon: 'fuel', hue: 'h5',
    lead: 'TAS, wind component and endurance → Point of No Return; total distance → Point of Equal Time.',
    inputs: [{ k: 'tas', l: 'TAS', v: 200, u: 'kt' }, { k: 'w', l: 'Wind component out (+ head / − tail)', v: 20, u: 'kt' }, { k: 'end', l: 'Safe endurance', v: 5, u: 'h' }, { k: 'd', l: 'Total distance (for PET)', v: 600, u: 'NM' }],
    calc: v => {
      const O = v.tas - v.w, H = v.tas + v.w; const tP = v.end * H / (O + H), dP = tP * O; const dE = v.d * H / (O + H), tE = dE / O;
      const W = 330, s = (W - 40) / Math.max(v.d, dP);
      return {
        out: [['GS out / home', f0(O) + ' / ' + f0(H) + ' kt'], ['Time to PNR', hm(tP), true], ['Distance to PNR', f0(dP) + ' NM', true], ['Distance to PET', f0(dE) + ' NM', true], ['Time to PET', hm(tE)]],
        svg: `<svg viewBox="0 0 350 130"><line x1="20" y1="70" x2="${20 + v.d * s}" y2="70" stroke="var(--ink)" stroke-width="3"/>${T(20, 98, 'A', 'var(--ink)', 'middle', 13, 800)}${T(20 + v.d * s, 98, 'B', 'var(--ink)', 'middle', 13, 800)}
          <line x1="${20 + dE * s}" y1="50" x2="${20 + dE * s}" y2="90" stroke="#3c8cf0" stroke-width="3"/>${T(20 + dE * s, 40, 'PET ' + f0(dE), '#3c8cf0', 'middle', 12)}
          <line x1="${20 + dP * s}" y1="58" x2="${20 + dP * s}" y2="82" stroke="#d4493a" stroke-width="3"/>${T(20 + dP * s, 118, 'PNR ' + f0(dP), '#d4493a', 'middle', 12)}</svg>`,
      };
    },
    note: 'PNR time = E × H / (O + H). PET distance = D × H / (O + H). A headwind out moves PET towards the destination; PNR depends on endurance, PET does not.',
  });

  /* ---------- 7. speed / time / distance / fuel ---------- */
  const sdt = () => tool({
    id: 'sdt', title: 'Speed, time, distance and fuel', icon: 'clock', hue: 'h0',
    lead: 'Leave the unknown blank (or 0): it is calculated from the other two.',
    inputs: [{ k: 'gs', l: 'Groundspeed', v: 180, u: 'kt' }, { k: 'd', l: 'Distance', v: 270, u: 'NM' }, { k: 't', l: 'Time', v: 0, u: 'min' }, { k: 'ff', l: 'Fuel flow', v: 2400, u: 'kg/h' }],
    calc: v => {
      let { gs, d, t } = v; const z = x => !x || !isFinite(x);
      if (z(t) && !z(gs) && !z(d)) t = d / gs * 60; else if (z(d) && !z(gs) && !z(t)) d = gs * t / 60; else if (z(gs) && !z(d) && !z(t)) gs = d / (t / 60);
      return { out: [['Groundspeed', f0(gs) + ' kt'], ['Distance', f0(d) + ' NM'], ['Time', hm(t / 60), true], v.ff ? ['Fuel', f0(v.ff * t / 60) + ' kg', true] : null, ['Distance per minute', f1(gs / 60) + ' NM/min']] };
    },
    note: 'D = S × T. Fuel = flow × time. At 180 kt you cover 3 NM a minute.',
  });

  /* ---------- 8. descent planning ---------- */
  const descent = () => tool({
    id: 'descent', title: 'Descent planning', icon: 'plane', hue: 'h1',
    lead: 'Height to lose and groundspeed → where to start down and the rate of descent.',
    inputs: [{ k: 'from', l: 'From', v: 33000, u: 'ft' }, { k: 'to', l: 'To', v: 3000, u: 'ft' }, { k: 'gs', l: 'Groundspeed', v: 300, u: 'kt' }, { k: 'ang', l: 'Path angle', v: 3, u: '°' }],
    calc: v => {
      const h = v.from - v.to; const dist = h / (6076 * Math.tan(v.ang * d2r)); const rod = v.gs * 6076 / 60 * Math.tan(v.ang * d2r);
      return { out: [['Height to lose', f0(h) + ' ft'], ['Start descent', f0(dist) + ' NM before', true], ['Rate of descent', f0(rod) + ' ft/min', true], ['Time', hm(h / rod / 60)], ['3° rule of thumb', f0(h / 1000 * 3) + ' NM · ROD ≈ GS × 5 = ' + f0(v.gs * 5)]] };
    },
    note: '3° path ≈ 318 ft per NM: distance ≈ height (thousands) × 3; ROD ≈ groundspeed × 5.',
  });

  /* ---------- 9. time, longitude ---------- */
  const time = () => tool({
    id: 'time', title: 'Time: UTC, IST and local mean time', icon: 'globe', hue: 'h2',
    lead: 'UTC and longitude → LMT; and UTC ↔ IST.',
    inputs: [{ k: 'utc', l: 'UTC (hhmm)', v: 1200, u: 'Z' }, { k: 'lon', l: 'Longitude (+E / −W)', v: 77.2, u: '°' }],
    calc: v => {
      const h = Math.floor(v.utc / 100) + (v.utc % 100) / 60; const lmt = h + v.lon / 15; const ist = h + 5.5;
      const fmt = x => { const d = Math.floor(x / 24); const m = Math.round((((x % 24) + 24) % 24) * 60); return String(Math.floor(m / 60) % 24).padStart(2, '0') + String(m % 60).padStart(2, '0') + (d > 0 ? ' (next day)' : d < 0 ? ' (previous day)' : ''); };
      return { out: [['Arc to time', f1(Math.abs(v.lon) * 4) + ' min ' + (v.lon >= 0 ? 'ahead' : 'behind')], ['LMT', fmt(lmt), true], ['IST (UTC + 5:30)', fmt(ist), true]] };
    },
    note: '15° = 1 h, 1° = 4 min, 1′ = 4 s. "Longitude east, UTC least; longitude west, UTC best."',
  });

  /* ---------- 10. departure and convergency ---------- */
  const conv = () => tool({
    id: 'conv', title: 'Departure, convergency, conversion angle', icon: 'map', hue: 'h3',
    lead: 'Change of longitude and latitude → east–west distance, convergency and conversion angle.',
    inputs: [{ k: 'dl', l: 'Change of longitude', v: 10, u: '°' }, { k: 'lat', l: 'Latitude (mean)', v: 30, u: '°' }],
    calc: v => {
      const dep = v.dl * 60 * Math.cos(v.lat * d2r), cv = v.dl * Math.sin(v.lat * d2r);
      return { out: [['Departure', f0(dep) + ' NM', true], ['Convergency', f1(cv) + '°', true], ['Conversion angle', f1(cv / 2) + '°'], ['1° of longitude here', f1(60 * Math.cos(v.lat * d2r)) + ' NM']] };
    },
    note: 'Departure = d.long (′) × cos lat. Convergency = d.long × sin mean lat. Conversion angle = ½ convergency (GC to RL).',
  });

  /* ---------- 11. turns ---------- */
  const turn = () => tool({
    id: 'turn', title: 'Turns: radius, rate, load factor', icon: 'rotate', hue: 'h4',
    lead: 'TAS and bank angle → turn radius, rate of turn, load factor and stall speed increase.',
    inputs: [{ k: 'tas', l: 'TAS', v: 150, u: 'kt' }, { k: 'b', l: 'Bank angle', v: 30, u: '°' }],
    calc: v => {
      const tb = Math.tan(v.b * d2r); const r = v.tas * v.tas / (11.26 * tb); const rate = 1091 * tb / v.tas; const n = 1 / Math.cos(v.b * d2r);
      return { out: [['Radius', f0(r) + ' ft · ' + f1(r / 6076) + ' NM', true], ['Rate of turn', f1(rate) + '°/s', true], ['Rate-1 bank (≈ TAS/10 + 7)', f0(v.tas / 10 + 7) + '°'], ['Load factor n', f1(n) + ' g'], ['Stall speed ×', f1(Math.sqrt(n))]] };
    },
    note: 'R = V² / (11.26 tan φ) [ft, kt]. Rate-1 turn = 3°/s (2 min for 360°). n = 1/cos φ; Vs rises with √n (60° → ×1.41).',
  });

  /* ---------- 12. cloud base / dew point ---------- */
  const cloud = () => tool({
    id: 'cloud', title: 'Cloud base from the dew-point spread', icon: 'cloud', hue: 'h5',
    lead: 'Surface temperature and dew point → approximate base of convective cloud and the freezing level.',
    inputs: [{ k: 't', l: 'Temperature', v: 30, u: '°C' }, { k: 'td', l: 'Dew point', v: 22, u: '°C' }, { k: 'el', l: 'Station elevation', v: 0, u: 'ft' }],
    calc: v => {
      const spread = v.t - v.td; const base = spread * 400; const fz = v.t / 1.98 * 1000;
      return { out: [['Spread', f1(spread) + ' °C'], ['Cloud base (AGL)', f0(base) + ' ft', true], ['Cloud base (AMSL)', f0(base + v.el) + ' ft'], ['Freezing level (ISA lapse)', f0(fz + v.el) + ' ft AMSL'], ['Fog/mist risk', spread <= 2 ? 'high (spread ≤ 2 °C)' : spread <= 4 ? 'possible' : 'low', spread <= 2]] };
    },
    note: 'A rising parcel closes the spread at about 2.5 °C per 1000 ft, so base ≈ spread × 400 ft. A rule of thumb, not a forecast.',
  });

  /* ---------- 13. unit converter ---------- */
  const UNITS = {
    Distance: { NM: 1852, km: 1000, SM: 1609.344, m: 1, ft: 0.3048 },
    Speed: { kt: 0.514444, 'km/h': 0.277778, 'm/s': 1, mph: 0.44704, 'ft/min': 0.00508 },
    Pressure: { hPa: 1, inHg: 33.8639, mmHg: 1.33322, psi: 68.9476 },
    Mass: { kg: 1, lb: 0.453592 },
    Volume: { L: 1, 'US gal': 3.78541, 'Imp gal': 4.54609 },
  };
  function converter() {
    const sec = el('section', { class: 'lesson tool h0', id: 'units' }, el('div', { class: 'lhead' }, el('div', { class: 'ltile' }, icon('sliders')), el('div', null, el('h3', null, 'Unit converter'), el('p', { class: 'lead' }, 'Type in any box; the others in the row update. Temperature included.'))));
    const stage = el('div', { class: 'stage' }, el('div', { class: 'tl-top' }, howButton('units', 'Unit converter')));
    Object.entries(UNITS).forEach(([name, u]) => {
      const row = el('div', { class: 'tl-conv' }, el('b', null, name));
      const boxes = Object.entries(u).map(([k, f]) => { const i = el('input', { type: 'number', step: 'any', inputmode: 'decimal' }); i.dataset.f = f; return [k, i]; });
      boxes.forEach(([k, i]) => { i.addEventListener('input', () => { const base = +i.value * +i.dataset.f; boxes.forEach(([k2, j]) => { if (j !== i) j.value = i.value === '' ? '' : String(Math.round(base / +j.dataset.f * 1000) / 1000); }); }); row.append(el('label', null, i, el('small', null, k))); });
      boxes[0][1].value = 1; boxes[0][1].dispatchEvent(new Event('input'));
      stage.append(row);
    });
    const c = el('input', { type: 'number', value: 15 }), f = el('input', { type: 'number' }), k = el('input', { type: 'number' });
    const up = src => { let C = src === c ? +c.value : src === f ? (+f.value - 32) * 5 / 9 : +k.value - 273.15; if (src !== c) c.value = Math.round(C * 100) / 100; if (src !== f) f.value = Math.round((C * 9 / 5 + 32) * 100) / 100; if (src !== k) k.value = Math.round((C + 273.15) * 100) / 100; };
    [c, f, k].forEach(x => x.addEventListener('input', () => up(x))); up(c);
    stage.append(el('div', { class: 'tl-conv' }, el('b', null, 'Temperature'), el('label', null, c, el('small', null, '°C')), el('label', null, f, el('small', null, '°F')), el('label', null, k, el('small', null, 'K'))));
    stage.append(el('p', { class: 'hint tl-note' }, '1 NM = 1.852 km = 6076 ft · 1 kt = 1.852 km/h · 1 m = 3.28 ft · 1 inHg = 33.86 hPa · 1 kg = 2.2 lb · 1 US gal = 3.785 L · °F = °C × 9/5 + 32'));
    sec.append(stage); return sec;
  }

  /* ---------- 14. METAR / TAF decoder ---------- */
  const WX = { MI: 'shallow', BC: 'patches of', PR: 'partial', DR: 'low drifting', BL: 'blowing', SH: 'showers of', TS: 'thunderstorm', FZ: 'freezing', DZ: 'drizzle', RA: 'rain', SN: 'snow', SG: 'snow grains', IC: 'ice crystals', PL: 'ice pellets', GR: 'hail', GS: 'small hail', UP: 'unknown precipitation', BR: 'mist', FG: 'fog', FU: 'smoke', VA: 'volcanic ash', DU: 'widespread dust', SA: 'sand', HZ: 'haze', PO: 'dust/sand whirls', SQ: 'squall', FC: 'funnel cloud', SS: 'sandstorm', DS: 'duststorm' };
  const COVER = { FEW: 'few (1–2 oktas)', SCT: 'scattered (3–4 oktas)', BKN: 'broken (5–7 oktas)', OVC: 'overcast (8 oktas)' };
  function decodeTok(t, ctx) {
    let m;
    if (/^(METAR|SPECI|TAF)$/.test(t)) { ctx.taf = t === 'TAF'; return { METAR: 'Routine aerodrome weather report', SPECI: 'Special report (significant change)', TAF: 'Aerodrome forecast' }[t]; }
    if (/^(AMD|COR|AUTO|NIL|CNL)$/.test(t)) return { AMD: 'Amended', COR: 'Corrected', AUTO: 'Fully automatic observation', NIL: 'Missing report', CNL: 'Cancelled' }[t];
    if (!ctx.st && /^[A-Z]{4}$/.test(t)) { ctx.st = 1; return 'Aerodrome ICAO code ' + t + (t[0] === 'V' ? ' (India: VI/VA/VE/VO)' : ''); }
    if ((m = t.match(/^(\d{2})(\d{2})(\d{2})Z$/))) return `Issued/observed on day ${m[1]} at ${m[2]}:${m[3]} UTC`;
    if ((m = t.match(/^(\d{2})(\d{2})\/(\d{2})(\d{2})$/))) return `Valid from day ${m[1]} ${m[2]}00 UTC to day ${m[3]} ${m[4]}00 UTC`;
    if ((m = t.match(/^(VRB|\d{3})(\d{2,3})(?:G(\d{2,3}))?(KT|MPS)$/))) return `Wind ${m[1] === 'VRB' ? 'variable' : 'from ' + m[1] + '°'} at ${+m[2]} ${m[4] === 'KT' ? 'kt' : 'm/s'}${m[3] ? ', gusting ' + +m[3] : ''}${m[1] === '000' && m[2] === '00' ? ' (calm)' : ''}`;
    if ((m = t.match(/^(\d{3})V(\d{3})$/))) return `Wind direction varying between ${m[1]}° and ${m[2]}°`;
    if (t === 'CAVOK') return 'Ceiling and visibility OK: visibility ≥ 10 km, no cloud below 5000 ft (or MSA) and no CB/TCU, no significant weather';
    if ((m = t.match(/^(\d{4})(N|NE|E|SE|S|SW|W|NW|NDV)?$/))) return m[1] === '9999' ? 'Visibility 10 km or more' : `Visibility ${+m[1]} m${m[2] && m[2] !== 'NDV' ? ' towards ' + m[2] : ''}`;
    if ((m = t.match(/^(\d{1,2})SM$/))) return `Visibility ${m[1]} statute miles`;
    if ((m = t.match(/^R(\d{2}[LCR]?)\/([PM]?)(\d{4})(?:V([PM]?)(\d{4}))?([UDN])?$/))) return `RVR runway ${m[1]}: ${m[2] === 'P' ? 'more than ' : m[2] === 'M' ? 'less than ' : ''}${+m[3]} m${m[5] ? ' varying to ' + +m[5] + ' m' : ''}${m[6] ? ', ' + { U: 'improving', D: 'deteriorating', N: 'no change' }[m[6]] : ''}`;
    if ((m = t.match(/^(\+|-|VC)?((?:MI|BC|PR|DR|BL|SH|TS|FZ)?)((?:DZ|RA|SN|SG|IC|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)*)$/)) && (m[2] || m[3])) {
      const ph = (m[3].match(/../g) || []).map(x => WX[x]).join(' and ');
      return `Weather: ${m[1] === '+' ? 'heavy ' : m[1] === '-' ? 'light ' : m[1] === 'VC' ? 'in the vicinity: ' : 'moderate '}${m[2] ? WX[m[2]] + ' ' : ''}${ph}`.replace('moderate thunderstorm', 'thunderstorm').trim();
    }
    if ((m = t.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/))) return `Cloud ${COVER[m[1]]} at ${+m[2] * 100} ft above aerodrome${m[3] ? ' — ' + (m[3] === 'CB' ? 'cumulonimbus' : 'towering cumulus') : ''}`;
    if ((m = t.match(/^VV(\d{3}|\/\/\/)$/))) return `Sky obscured, vertical visibility ${m[1] === '///' ? 'unknown' : +m[1] * 100 + ' ft'}`;
    if (/^(NSC|NCD|SKC|CLR)$/.test(t)) return { NSC: 'No significant cloud', NCD: 'No cloud detected (automatic)', SKC: 'Sky clear', CLR: 'No cloud below 12,000 ft (auto)' }[t];
    if ((m = t.match(/^(M?\d{2})\/(M?\d{2})?$/))) { const c = s => s ? (s[0] === 'M' ? -+s.slice(1) : +s) : null; return `Temperature ${c(m[1])} °C, dew point ${m[2] ? c(m[2]) + ' °C' : 'missing'}${m[2] ? ' (spread ' + (c(m[1]) - c(m[2])) + ' °C)' : ''}`; }
    if ((m = t.match(/^Q(\d{4})$/))) return `QNH ${+m[1]} hPa`;
    if ((m = t.match(/^A(\d{4})$/))) return `Altimeter ${m[1].slice(0, 2)}.${m[1].slice(2)} inHg`;
    if ((m = t.match(/^RE(\w+)$/))) return 'Recent weather (last hour): ' + ((m[1].match(/../g) || []).map(x => WX[x] || x).join(' '));
    if ((m = t.match(/^WS$/))) return 'Wind shear reported';
    if (t === 'NOSIG') return 'Trend: no significant change in the next 2 hours';
    if (t === 'BECMG') return 'Becoming (gradual change in the period that follows)';
    if (t === 'TEMPO') return 'Temporarily (fluctuations each < 1 h, in total < half the period)';
    if ((m = t.match(/^PROB(30|40)$/))) return `Probability ${m[1]} %`;
    if ((m = t.match(/^FM(\d{2})(\d{2})(\d{2})$/))) return `From day ${m[1]} at ${m[2]}:${m[3]} UTC (rapid change)`;
    if ((m = t.match(/^(TL|AT)(\d{4})$/))) return `${m[1] === 'TL' ? 'Until' : 'At'} ${m[2]} UTC`;
    if ((m = t.match(/^T([XN])(M?\d{2})\/(\d{2})(\d{2})Z$/))) return `${m[1] === 'X' ? 'Maximum' : 'Minimum'} temperature ${m[2].replace('M', '−')} °C on day ${m[3]} at ${m[4]} UTC`;
    if (t === 'NSW') return 'No significant weather (end of weather)';
    if (t === 'RMK') return 'Remarks follow';
    return null;
  }
  function decoder() {
    const sec = el('section', { class: 'lesson tool h1', id: 'metar' }, el('div', { class: 'lhead' }, el('div', { class: 'ltile' }, icon('doc')), el('div', null, el('h3', null, 'METAR & TAF decoder'), el('p', { class: 'lead' }, 'Paste a report. Each group is decoded on its own line.'))));
    const stage = el('div', { class: 'stage' }, el('div', { class: 'tl-top' }, howButton('metar', 'METAR & TAF decoder')));
    const ta = el('textarea', { class: 'tl-ta', rows: 3, spellcheck: 'false' });
    const out = el('div', { class: 'tl-dec' });
    const samples = [['METAR', 'METAR VIDP 140530Z 32008KT 2500 HZ FEW030 25/12 Q1012 NOSIG'], ['Fog', 'METAR VILK 140030Z 00000KT 0050 R27/0150N FG VV001 09/09 Q1018 BECMG 0300 FG'], ['Thunderstorm', 'SPECI VABB 141130Z 24015G30KT 3000 +TSRA SCT020CB BKN080 26/24 Q1004 TEMPO 1500 TSRA'], ['TAF', 'TAF VOBL 140500Z 1406/1512 09010KT 6000 SCT020 TEMPO 1410/1416 4000 TSRA FEW025CB PROB30 1500/1503 2000 BR TX33/1409Z TN19/1500Z']];
    function run() {
      const ctx = {}; const toks = ta.value.trim().toUpperCase().replace(/=$/, '').split(/\s+/).filter(Boolean);
      out.replaceChildren(...toks.map(t => { const d = decodeTok(t, ctx); return el('div', { class: d ? '' : 'unk' }, el('code', null, t), el('span', null, d || 'not recognised (check the group)')); }));
    }
    ta.addEventListener('input', run);
    stage.append(el('div', { class: 'qb-top' }, samples.map(([n, s]) => el('button', { class: 'btn ghost', onclick: () => { ta.value = s; run(); } }, n))), ta, out);
    ta.value = samples[0][1]; run();
    sec.append(stage); return sec;
  }


  /* ---------- 15. CAS → TAS → Mach ---------- */
  const tasmach = () => tool({
    id: 'tasmach', title: 'CAS → TAS → Mach', icon: 'gauge', hue: 'h5',
    lead: 'Calibrated airspeed, pressure altitude and temperature → true airspeed, local speed of sound and Mach number.',
    inputs: [{ k: 'cas', l: 'CAS', v: 250, u: 'kt' }, { k: 'pa', l: 'Pressure altitude', v: 25000, u: 'ft' }, { k: 'oat', l: 'OAT (blank = ISA)', v: NaN, u: '°C' }],
    calc: v => {
      const isaT = v.pa <= 36090 ? 15 - 1.98 * v.pa / 1000 : -56.5; const T = isFinite(v.oat) ? v.oat : isaT; const m = v.pa * 0.3048;
      const P = m <= 11000 ? 1013.25 * Math.pow(1 - 2.25577e-5 * m, 5.25588) : 226.32 * Math.exp(-(m - 11000) / 6341.6);
      const sigma = (P / 1013.25) * (288.15 / (273.15 + T)); const tas = v.cas / Math.sqrt(sigma); const lss = 38.94 * Math.sqrt(273.15 + T);
      return { out: [['Temperature used', f1(T) + ' °C' + (isFinite(v.oat) ? '' : ' (ISA)')], ['Density ratio σ', (Math.round(sigma * 1000) / 1000).toString()], ['TAS', f0(tas) + ' kt', true], ['Rule of thumb (+2%/1000 ft)', f0(v.cas * (1 + 0.02 * v.pa / 1000)) + ' kt'], ['Local speed of sound', f0(lss) + ' kt'], ['Mach', 'M' + (Math.round(tas / lss * 1000) / 1000).toFixed(3), true]] };
    },
    note: 'Ignores compressibility (CAS ≈ EAS below ~250 kt / 10,000 ft); fine for exam-style answers.',
  });

  /* ---------- 16. weight and balance ---------- */
  const cg = () => tool({
    id: 'cg', title: 'Weight and balance (CG)', icon: 'weight', hue: 'h0',
    lead: 'Weights and arms (distance aft of the datum) → total weight, moment and CG position.',
    inputs: [{ k: 'w1', l: 'Empty aircraft', v: 600, u: 'kg' }, { k: 'a1', l: 'arm', v: 2.0, u: 'm' }, { k: 'w2', l: 'Pilots / front seats', v: 160, u: 'kg' }, { k: 'a2', l: 'arm', v: 1.8, u: 'm' }, { k: 'w3', l: 'Fuel', v: 100, u: 'kg' }, { k: 'a3', l: 'arm', v: 2.2, u: 'm' }, { k: 'w4', l: 'Baggage / rear', v: 40, u: 'kg' }, { k: 'a4', l: 'arm', v: 3.2, u: 'm' }, { k: 'fwd', l: 'Forward limit', v: 1.9, u: 'm' }, { k: 'aft', l: 'Aft limit', v: 2.2, u: 'm' }],
    calc: v => {
      const it = [[v.w1, v.a1, 'Empty'], [v.w2, v.a2, 'Front'], [v.w3, v.a3, 'Fuel'], [v.w4, v.a4, 'Rear']].filter(([w, a]) => isFinite(w) && isFinite(a));
      const W = it.reduce((s, [w]) => s + w, 0), M = it.reduce((s, [w, a]) => s + w * a, 0), c = M / W; const ok = c >= v.fwd && c <= v.aft;
      const X = x => 30 + (x - 1) / 3 * 280;
      return {
        out: [['Total weight', f0(W) + ' kg'], ['Total moment', f0(M) + ' kg·m'], ['CG (aft of datum)', (Math.round(c * 100) / 100) + ' m', true], ['Within limits?', ok ? 'Yes' : (c < v.fwd ? 'No: too far FORWARD' : 'No: too far AFT'), !ok]],
        svg: `<svg viewBox="0 0 340 140"><line x1="20" y1="80" x2="320" y2="80" stroke="var(--ink)" stroke-width="4"/><rect x="${X(v.fwd)}" y="70" width="${X(v.aft) - X(v.fwd)}" height="20" fill="${ok ? 'var(--ok-bg)' : 'var(--warn-bg)'}" stroke="${ok ? 'var(--ok)' : 'var(--warn)'}"/>
          ${it.map(([w, a, n], i) => `<line x1="${X(a)}" y1="${80 - 8 - Math.min(40, w / 20)}" x2="${X(a)}" y2="76" stroke="var(--muted)" stroke-width="3"/>${T(X(a), i % 2 ? 128 : 26, n, 'var(--muted)', 'middle', 11, 600)}`).join('')}
          <path d="M${X(c) - 9} 100 L${X(c)} 84 L${X(c) + 9} 100 Z" fill="${ok ? 'var(--ok)' : 'var(--warn)'}"/>${T(X(c), 116, 'CG ' + (Math.round(c * 100) / 100), ok ? 'var(--ok)' : 'var(--warn)', 'middle', 12, 800)}</svg>`,
      };
    },
    note: 'Arms are measured from the datum (positive aft). Use the same units for every arm.',
  });

  /* ---------- 17. radio range and Q-codes ---------- */
  const radio = () => tool({
    id: 'radio', title: 'VHF range and Q-code bearings', icon: 'radio', hue: 'h1',
    lead: 'Heights → line-of-sight VHF range. QDM and variation → QDR, QTE and QUJ.',
    inputs: [{ k: 'ha', l: 'Aircraft height', v: 10000, u: 'ft' }, { k: 'hs', l: 'Station height', v: 100, u: 'ft' }, { k: 'qdm', l: 'QDM (magnetic, to station)', v: 250, u: '°' }, { k: 'var', l: 'Variation (+E / −W)', v: -2, u: '°' }],
    calc: v => {
      const rng = 1.23 * (Math.sqrt(Math.max(0, v.ha)) + Math.sqrt(Math.max(0, v.hs))); const qdr = wrap(v.qdm + 180), qte = wrap(qdr + v.var), quj = wrap(qte + 180);
      return { out: [['VHF range', f0(rng) + ' NM', true], ['QDM (mag, to)', hdg(v.qdm) + '°'], ['QDR (mag, from)', hdg(qdr) + '°', true], ['QTE (true, from)', hdg(qte) + '°', true], ['QUJ (true, to)', hdg(quj) + '°']] };
    },
  });

  const ALL = [['Wind', [crosswind, triangle]], ['Atmosphere, speed & altimetry', [isa, tasmach, altim, cloud]], ['Navigation', [oneIn60, pnr, sdt, descent, conv, time, turn, radio]], ['Aircraft', [cg]], ['Reports & units', [decoder, converter]]];
  function mount(w) {
    /* sticky jump bar: search + one chip per tool */
    const q = el('input', { class: 'tj-q', type: 'search', placeholder: 'Find a tool… (e.g. crosswind, PNR, METAR)', 'aria-label': 'Find a tool' });
    const chips = el('div', { class: 'tj-chips' });
    const bar = el('div', { class: 'tj-bar' }, q, chips);
    w.append(bar);
    const parts = [];
    ALL.forEach(([part, list], i) => {
      const pd = el('div', { class: 'partdiv' }, el('small', null, 'PART ' + (i + 1)), el('h2', null, part));
      w.append(pd); const secs = list.map(fn => { const sec = fn(); w.append(sec); return sec; });
      parts.push({ pd, secs });
    });
    const all = parts.flatMap(p => p.secs);
    const jump = sec => { const y = sec.getBoundingClientRect().top + scrollY - (bar.offsetHeight + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--toph')) || 64) + 10); scrollTo({ top: y, behavior: 'smooth' }); };
    const chipFor = sec => el('button', { class: 'tj-chip', onclick: () => { if (sec.hidden) { q.value = ''; filter(); } jump(sec); } }, sec.querySelector('h3').textContent.replace(/:.*$/, ''));
    const chipEls = all.map(sec => { const c = chipFor(sec); chips.append(c); return [sec, c]; });
    function filter() {
      const t = q.value.trim().toLowerCase();
      chipEls.forEach(([sec, c]) => { const hit = !t || sec.textContent.toLowerCase().includes(t); sec.hidden = !hit; c.hidden = !hit; });
      parts.forEach(p => { p.pd.hidden = p.secs.every(x => x.hidden); });
    }
    q.addEventListener('input', filter);
    q.addEventListener('keydown', e => { if (e.key === 'Enter') { const first = all.find(x => !x.hidden); if (first) jump(first); } });
    /* highlight the chip of the tool on screen */
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) chipEls.forEach(([sec, c]) => c.classList.toggle('on', sec === e.target)); }), { rootMargin: '-35% 0px -60% 0px' });
    all.forEach(x => io.observe(x));
    if (location.hash) setTimeout(() => { const t = document.getElementById(location.hash.slice(1)); if (t) jump(t); }, 150);
  }
  /* lets a chapter lesson embed any calculator: { type: 'tool', tool: 'pnr' } */
  const BY_ID = { crosswind, triangle, isa, tasmach, altim, cloud, one60: oneIn60, pnr, sdt, descent, conv, time, turn, radio, cg, metar: decoder, units: converter };
  if (G.R) G.R.tool = (d, stage) => {
    const make = BY_ID[d.tool]; if (!make) throw new Error('unknown tool ' + d.tool);
    const inner = make().querySelector('.stage');
    stage.classList.add('tl-stage'); while (inner.firstChild) stage.append(inner.firstChild);
  };
  G.tools = { mount, decodeTok, ids: Object.keys(BY_ID) };
})();
