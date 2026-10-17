/* Glidepath interactive simulations: sliders drive a live SVG so hard-to-picture ideas (altimeter settings,
   pressure/temperature errors, ISA) can be seen moving. Registered in G.SIMS; rendered by lesson type 'sim'. */
(function () {
  'use strict';
  const SIMS = (G.SIMS = G.SIMS || {});
  const H = () => G.FH;
  const css = `
  .sim{display:grid;gap:14px}
  .sim svg{width:100%;height:auto;display:block;border-radius:14px;background:var(--panel)}
  .sim .ctl{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px 18px}
  .sim label{display:grid;gap:4px;font:600 14px var(--font);color:var(--ink)}
  .sim label span{color:var(--ink);opacity:.85}
  .sim label b{font:800 15px var(--head,var(--font));color:var(--ink)}
  .sim input[type=range]{width:100%;accent-color:var(--accent,#3a7)}
  .sim .seg{display:flex;flex-wrap:wrap;gap:6px}
  .sim .seg button{border:1.5px solid var(--line);background:var(--panel);color:var(--ink);border-radius:999px;padding:6px 14px;font:700 13px var(--font);cursor:pointer;transition:all .2s}
  .sim .seg button.on{background:var(--ink);color:var(--bg,#fff);border-color:var(--ink)}
  .sim .out{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
  .sim .out div{border:1.5px solid var(--line);border-radius:12px;padding:8px 12px;background:var(--panel)}
  .sim .out small{display:block;font:600 11.5px var(--font);opacity:.75}
  .sim .out span{font:800 18px var(--head,var(--font));color:var(--ink)}
  .sim .out .hot{border-color:var(--warn);}
  .sim svg .mv{transition:all .35s cubic-bezier(.2,.8,.2,1)}
  .sim svg text.halo{paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round}
  `;
  function style() { if (!document.getElementById('sim-css')) { const s = document.createElement('style'); s.id = 'sim-css'; s.textContent = css; document.head.append(s); } }
  function mk(tag, attrs, ...kids) { const e = document.createElement(tag); for (const k in attrs || {}) { if (k === 'on') for (const ev in attrs.on) e.addEventListener(ev, attrs.on[ev]); else e.setAttribute(k, attrs[k]); } kids.flat().forEach(k => k != null && e.append(k)); return e; }
  /* slider control: returns {el, get} */
  function slider(lbl, min, max, step, val, fmt, onch) {
    const b = mk('b', null, fmt(val));
    const i = mk('input', { type: 'range', min, max, step, value: val, on: { input: () => { b.textContent = fmt(+i.value); onch(); } } });
    return { el: mk('label', null, mk('span', null, lbl, ' · ', b), i), get: () => +i.value, set: v => { i.value = v; b.textContent = fmt(v); } };
  }
  function seg(opts, val, onch) {
    let cur = val; const box = mk('div', { class: 'seg' });
    const bs = opts.map(([v, t]) => { const b = mk('button', { type: 'button', on: { click: () => { cur = v; bs.forEach(x => x.classList.toggle('on', x === b)); onch(); } } }, t); if (v === val) b.classList.add('on'); box.append(b); return b; });
    return { el: box, get: () => cur };
  }
  const n0 = v => Math.round(v).toLocaleString('en-IN');
  const out = items => items.map(([k, v, hot]) => `<div class="${hot ? 'hot' : ''}"><small>${k}</small><span>${v}</span></div>`).join('');

  /* altimeter dial (100-ft needle + 1000-ft needle + drum + subscale window) */
  function dial(cx, cy, r, alt, sub, col) {
    let t = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#111a22" stroke="var(--line)" stroke-width="3"/>`;
    for (let i = 0; i < 10; i++) { const a = i * 36 - 90, ra = a * Math.PI / 180; t += `<text x="${cx + (r - 15) * Math.cos(ra)}" y="${cy + (r - 15) * Math.sin(ra) + 5}" text-anchor="middle" style="font:700 13px var(--font);fill:#e8eef3">${i}</text>`; for (let j = 1; j < 5; j++) { const rb = (a + j * 7.2) * Math.PI / 180; t += `<line x1="${cx + (r - 4) * Math.cos(rb)}" y1="${cy + (r - 4) * Math.sin(rb)}" x2="${cx + (r - 8) * Math.cos(rb)}" y2="${cy + (r - 8) * Math.sin(rb)}" stroke="#9fb1c0" stroke-width="1"/>`; } }
    const a100 = ((alt % 1000 + 1000) % 1000) / 1000 * 360, a1k = ((alt % 10000 + 10000) % 10000) / 10000 * 360;
    t += `<rect x="${cx - 34}" y="${cy + 14}" width="68" height="22" rx="4" fill="#000" stroke="#555"/><text x="${cx}" y="${cy + 30}" text-anchor="middle" style="font:700 14px ui-monospace,monospace;fill:#fff">${n0(Math.round(alt / 10) * 10).padStart(6, ' ')}</text>`;
    t += `<rect x="${cx + 20}" y="${cy - 9}" width="40" height="18" rx="3" fill="#000" stroke="${col}"/><text x="${cx + 40}" y="${cy + 5}" text-anchor="middle" style="font:700 11px ui-monospace,monospace;fill:${col}">${Math.round(sub)}</text>`;
    t += `<g class="mv" style="transform-origin:${cx}px ${cy}px;transform:rotate(${a1k}deg)"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * .45}" stroke="#e8eef3" stroke-width="6" stroke-linecap="round"/></g>`;
    t += `<g class="mv" style="transform-origin:${cx}px ${cy}px;transform:rotate(${a100}deg)"><line x1="${cx}" y1="${cy + 10}" x2="${cx}" y2="${cy - r * .8}" stroke="${col}" stroke-width="3" stroke-linecap="round"/></g><circle cx="${cx}" cy="${cy}" r="5" fill="#e8eef3"/>`;
    t += `<text x="${cx}" y="${cy + r + 18}" text-anchor="middle" style="font:600 11.5px var(--font);fill:var(--ink)">subscale ${Math.round(sub)} hPa</text>`;
    return t;
  }

  /* 1. QFE / QNH / QNE — what each setting makes the altimeter read */
  SIMS.altimetry = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = {
      elev: slider('Aerodrome elevation', 0, 6000, 100, 1500, v => n0(v) + ' ft', draw),
      qnh: slider('Today\'s QNH', 960, 1040, 1, 1000, v => v + ' hPa', draw),
      alt: slider('Aircraft altitude (above MSL)', 0, 12000, 100, 4500, v => n0(v) + ' ft', draw),
      set: seg([['QFE', 'Set QFE'], ['QNH', 'Set QNH'], ['QNE', 'Set 1013 (QNE)']], 'QNH', draw),
      f: seg([[27, '27 ft / hPa'], [30, '30 ft / hPa']], 27, draw),
    };
    const ctl = mk('div', { class: 'ctl' }, S.elev.el, S.qnh.el, S.alt.el, mk('label', null, mk('span', null, 'Subscale set to'), S.set.el), mk('label', null, mk('span', null, 'Rule of thumb'), S.f.el));
    st.append(mk('div', { class: 'sim' }, svgBox, ctl, o));
    function draw() {
      const elev = S.elev.get(), qnh = S.qnh.get(), f = S.f.get(); let alt = Math.max(S.alt.get(), elev);
      const qfe = qnh - elev / f, pa = alt + (1013 - qnh) * f, datum = (qnh - 1013) * f, hgt = alt - elev;
      const set = S.set.get(); const sub = set === 'QFE' ? qfe : set === 'QNH' ? qnh : 1013;
      const read = set === 'QFE' ? hgt : set === 'QNH' ? alt : pa;
      const Y = h => 300 - h * 0.021, X0 = 60;
      const C = { QFE: '#2fb36b', QNH: '#3c8cf0', QNE: '#f08c2e' };
      /* bars end at the aircraft; their labels sit above the arrow tip, centred, so the three never share space */
      const bar = (k, x, from, to, txt) => { const on = set === k; const up = Y(to) <= Y(from); const ty = up ? Y(to) - 12 : Y(to) + 22;
        return `<g opacity="${on ? 1 : .5}"><line class="mv" x1="${x}" x2="${x}" y1="${Y(from)}" y2="${Y(to)}" stroke="${C[k]}" stroke-width="${on ? 4 : 2.5}"/><path class="mv" d="M${x - 6} ${Y(to) + (up ? 8 : -8)} L${x} ${Y(to)} L${x + 6} ${Y(to) + (up ? 8 : -8)}" fill="none" stroke="${C[k]}" stroke-width="2.5"/><circle class="mv" cx="${x}" cy="${Y(from)}" r="4" fill="${C[k]}"/><text class="halo" x="${x}" y="${ty}" text-anchor="middle" style="font:800 12px var(--font);fill:${C[k]}">${k} ${txt}</text></g>`; };
      const ax = 70, ay = Y(alt);
      const dy = Y(datum) - Y(0); /* datum below MSL → MSL label above its line; datum above → below */
      const mslY = datum < 0 ? Y(0) - 6 : Y(0) + 15, dtmY = datum < 0 ? Y(datum) + 15 : Y(datum) - 6;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 360">
        <rect x="0" y="0" width="700" height="360" fill="var(--m-sky, #cfe6f7)" opacity=".25"/>
        <rect x="0" y="${Y(0)}" width="700" height="${360 - Y(0)}" fill="var(--m-sea, #7fb4d8)" opacity=".75"/>
        <path class="mv" d="M0 ${Y(0)} L0 ${Y(elev)} L230 ${Y(elev)} L262 ${Y(0)} Z" fill="var(--m-ground, #b9a27a)"/>
        <rect class="mv" x="20" y="${Y(elev) - 4}" width="190" height="5" fill="#555"/><text class="mv halo" x="14" y="${Y(elev) + 18}" style="font:700 12px var(--font);fill:var(--ink)">Aerodrome · ${n0(elev)} ft</text>
        <line class="mv" x1="0" x2="470" y1="${Y(datum)}" y2="${Y(datum)}" stroke="#f08c2e" stroke-width="2" stroke-dasharray="7 5"/>
        ${datum === 0 ? `<text class="halo" x="476" y="${Y(0) + 4}" style="font:700 11.5px var(--font);fill:#f08c2e">MSL = 1013 hPa</text>`
          : `<text class="halo" x="476" y="${mslY}" style="font:700 11.5px var(--font);fill:var(--ink)">MSL · 0 ft</text><text class="mv halo" x="476" y="${dtmY}" style="font:700 11.5px var(--font);fill:#f08c2e">1013 hPa level</text>`}
        ${bar('QFE', 190, elev, alt, n0(hgt) + ' ft')}${bar('QNH', 300, 0, alt, n0(alt) + ' ft')}${bar('QNE', 410, datum, alt, 'FL' + String(Math.max(0, Math.round(pa / 100))).padStart(3, '0'))}
        <line class="mv" x1="${ax + 24}" x2="420" y1="${ay}" y2="${ay}" stroke="var(--ink)" stroke-dasharray="3 4" opacity=".4"/>
        <g class="mv" style="transform:translate(${ax}px,${ay}px)">${H().plane(0, 0, 1.5)}</g>
        ${dial(620, 120, 62, read, sub, C[set])}
        <text x="620" y="232" text-anchor="middle" style="font:800 14px var(--font);fill:${C[set]}">reads ${n0(read)} ft</text>
        <text x="620" y="250" text-anchor="middle" style="font:600 11.5px var(--font);fill:var(--ink)">${set === 'QFE' ? 'height above aerodrome' : set === 'QNH' ? 'altitude above MSL' : 'pressure altitude (FL)'}</text>
      </svg>`;
      o.innerHTML = out([['QFE (pressure at aerodrome)', qfe.toFixed(0) + ' hPa', set === 'QFE'], ['QNH', qnh + ' hPa', set === 'QNH'], ['Height above aerodrome', n0(hgt) + ' ft'], ['Altitude (AMSL)', n0(alt) + ' ft'], ['Pressure altitude', n0(pa) + ' ft', set === 'QNE'], ['On the ground with 1013 set', n0(elev + (1013 - qnh) * f) + ' ft']]);
    }
    draw();
    ctx.info('Move the sliders', 'Each setting measures from a different floor: QFE from the runway, QNH from sea level, QNE from wherever 1013.25 hPa happens to be today. Watch the orange datum move when you change QNH.');
  };

  /* 2. High to low, look out below — pressure and temperature errors */
  SIMS.hilo = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = {
      ind: slider('Indicated altitude flown', 2000, 12000, 500, 6000, v => n0(v) + ' ft', draw),
      q1: slider('QNH set at departure', 990, 1030, 1, 1020, v => v + ' hPa', draw),
      q2: slider('Actual QNH at destination', 980, 1030, 1, 1000, v => v + ' hPa', draw),
      dt: slider('Temperature vs ISA', -30, 30, 3, 0, v => (v > 0 ? '+' : '') + v + ' °C', draw),
      hill: slider('Hill near destination', 0, 9000, 250, 4500, v => n0(v) + ' ft', draw),
    };
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, S.ind.el, S.q1.el, S.q2.el, S.dt.el, S.hill.el), o));
    function draw() {
      const ind = S.ind.get(), q1 = S.q1.get(), q2 = S.q2.get(), dt = S.dt.get(), hill = S.hill.get();
      const pErr = (q2 - q1) * 30;            // + = aircraft higher than indicated
      const tErr = ind * dt / 300;            // book: 1% of indicated altitude per 3 °C
      const tru = ind + pErr + tErr, clear = tru - hill;
      const Y = h => 300 - h * 0.022;
      const pts = []; for (let i = 0; i <= 20; i++) { const x = 30 + i * 30, fr = i / 20; pts.push(`${x},${Y(ind + (pErr + tErr) * fr)}`); }
      const danger = clear < 1000;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 340">
        <rect x="0" y="0" width="700" height="340" fill="var(--panel)"/>
        <rect x="0" y="${Y(0)}" width="700" height="40" fill="var(--m-sea,#7fb4d8)" opacity=".7"/>
        <text x="40" y="24" style="font:800 13px var(--head,var(--font));fill:${q1 >= q2 ? '#3c8cf0' : '#d4493a'}">${q1 >= q2 ? 'HIGH' : 'LOW'} ${q1} hPa · ${dt >= 0 ? 'warm' : 'cold'} start</text>
        <text x="660" y="24" text-anchor="end" style="font:800 13px var(--head,var(--font));fill:${q2 <= q1 ? '#d4493a' : '#3c8cf0'}">${q2 <= q1 ? 'LOW' : 'HIGH'} ${q2} hPa</text>
        <line x1="30" x2="630" y1="${Y(ind)}" y2="${Y(ind)}" stroke="var(--ink)" stroke-dasharray="6 5" opacity=".55"/>
        <text x="34" y="${Y(ind) - 8}" class="sm">what the altimeter says: ${n0(ind)} ft all the way</text>
        <polyline class="mv" points="${pts.join(' ')}" fill="none" stroke="${danger ? '#d4493a' : '#2fb36b'}" stroke-width="3.5"/>
        <path class="mv" d="M430 ${Y(0)} Q520 ${Y(hill * 1.02)} 610 ${Y(0)} Z" fill="var(--m-ground,#b9a27a)"/>
        <text x="520" y="${Y(hill) - 8}" text-anchor="middle" class="sm">hill ${n0(hill)} ft</text>
        <g class="mv" style="transform:translate(630px,${Y(tru)}px)">${H().plane(0, 0, 1.5)}</g>
        <text class="halo" x="660" y="${Y(tru) + 36}" text-anchor="end" style="font:800 13px var(--font);fill:${danger ? '#d4493a' : '#2fb36b'}">true ${n0(tru)} ft</text>
      </svg>`;
      const lower = ind - tru;
      o.innerHTML = out([['Pressure error (30 ft/hPa)', (pErr >= 0 ? '+' : '') + n0(pErr) + ' ft'], ['Temperature error (1%/3 °C)', (tErr >= 0 ? '+' : '') + n0(tErr) + ' ft'], ['True altitude', n0(tru) + ' ft', true], ['Altimeter over-reads by', lower > 0 ? n0(lower) + ' ft' : 'under-reads ' + n0(-lower) + ' ft', lower > 0], ['Clearance over hill', n0(clear) + ' ft', danger]]);
      ctx.info(lower > 0 ? 'Look out below' : 'Safe side', lower > 0 ? 'Flying from high to low pressure, or into colder air, without resetting the subscale: you are LOWER than the altimeter shows. High to low (or hot to cold), look out below.' : 'Into higher pressure or warmer air you are higher than indicated: the error is on the safe side.');
    }
    draw();
  };

  /* 3. ISA explorer */
  SIMS.isa = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = { h: slider('Height (pressure altitude)', 0, 65000, 500, 10000, v => n0(v) + ' ft', draw), dev: slider('Today vs ISA', -20, 30, 1, 0, v => 'ISA ' + (v >= 0 ? '+' : '') + v, draw) };
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, S.h.el, S.dev.el), o));
    const T = h => h <= 36090 ? 15 - 1.98 * h / 1000 : -56.5;
    const P = h => { const m = h * 0.3048; return m <= 11000 ? 1013.25 * Math.pow(1 - 2.25577e-5 * m, 5.25588) : 226.32 * Math.exp(-(m - 11000) / 6341.6); };
    const lv = [[850, 5000], [700, 10000], [500, 18000], [400, 24000], [300, 30000], [200, 38000], [100, 53000]];
    function draw() {
      const h = S.h.get(), dev = S.dev.get(), t = T(h), act = t + dev, p = P(h), dens = (p / 1013.25) * (288.15 / (273.15 + act));
      const Y = v => 320 - v * 0.0046, Xt = c => 380 + c * 3.4;
      let prof = ''; for (let v = 0; v <= 65000; v += 1000) prof += `${Xt(T(v) + dev)},${Y(v)} `;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 340">
        <rect width="700" height="340" fill="var(--panel)"/>
        <rect x="0" y="${Y(65000)}" width="700" height="${Y(36090) - Y(65000)}" fill="var(--h4,#eadff7)" opacity=".5"/><text x="690" y="${Y(50000)}" text-anchor="end" class="sm">stratosphere: constant −56.5 °C (to 65,617 ft)</text>
        <line x1="0" x2="700" y1="${Y(36090)}" y2="${Y(36090)}" stroke="var(--h4i,#8a5cc4)" stroke-width="2"/><text x="690" y="${Y(36090) - 6}" text-anchor="end" style="font:700 11.5px var(--font);fill:var(--h4i,#8a5cc4)">ISA tropopause 36,090 ft (11 km)</text>
        <line x1="${Xt(0)}" x2="${Xt(0)}" y1="${Y(0)}" y2="${Y(65000)}" stroke="var(--line)" stroke-dasharray="4 4"/><text x="${Xt(0) + 4}" y="${Y(65000) + 14}" class="sm">0 °C</text>
        ${dev ? `<polyline points="${(() => { let s = ''; for (let v = 0; v <= 65000; v += 1000) s += `${Xt(T(v))},${Y(v)} `; return s; })()}" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="5 4" opacity=".5"/>` : ''}
        <polyline points="${prof}" fill="none" stroke="#d4493a" stroke-width="3"/>
        ${lv.map(([hp, ft]) => `<line x1="20" x2="70" y1="${Y(ft)}" y2="${Y(ft)}" stroke="#3c8cf0" stroke-width="2"/><text x="74" y="${Y(ft) + 4}" style="font:700 11px var(--font);fill:#3c8cf0">${hp} hPa ≈ FL${ft / 100}</text>`).join('')}
        <line class="mv" x1="0" x2="700" y1="${Y(h)}" y2="${Y(h)}" stroke="var(--ink)" stroke-width="1.5"/>
        <circle class="mv" cx="${Xt(act)}" cy="${Y(h)}" r="7" fill="#d4493a" stroke="#fff" stroke-width="2"/>
        <text x="${Xt(act) + (Xt(act) > 600 ? -12 : 12)}" y="${Y(h) - 8}" text-anchor="${Xt(act) > 600 ? 'end' : 'start'}" class="halo" style="font:800 13px var(--font);fill:var(--ink)">${act.toFixed(1)} °C</text>
        <text x="${Xt(0)}" y="${Y(0) + 16}" text-anchor="middle" class="sm">MSL: 15 °C · 1013.25 hPa · 1.225 kg/m³ · lapse 1.98 °C / 1000 ft</text>
      </svg>`;
      o.innerHTML = out([['ISA temperature', T(h).toFixed(1) + ' °C'], ['Actual temperature', act.toFixed(1) + ' °C', !!dev], ['ISA pressure', p.toFixed(0) + ' hPa'], ['Density vs MSL', Math.round(dens * 100) + ' %'], ['Density altitude (approx.)', n0(h + 120 * dev) + ' ft', dev > 0]]);
    }
    draw();
    ctx.info('Slide up through the ISA', 'Temperature drops 1.98 °C per 1000 ft to the tropopause, then stays at −56.5 °C. Make the day hotter than ISA and density altitude rises (about 120 ft per °C): the aircraft performs as if higher.');
  };

  /* 4. Convergency and conversion angle: GC vs RL between two points (true spherical maths, Mercator plot) */
  SIMS.convergency = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = {
      la1: slider('Latitude A', -75, 75, 1, 60, v => Math.abs(v) + '°' + (v >= 0 ? 'N' : 'S'), draw),
      lo1: slider('Longitude A', -180, 180, 1, -120, v => Math.abs(v) + '°' + (v >= 0 ? 'E' : 'W'), draw),
      la2: slider('Latitude B', -75, 75, 1, 60, v => Math.abs(v) + '°' + (v >= 0 ? 'N' : 'S'), draw),
      lo2: slider('Longitude B', -180, 180, 1, -60, v => Math.abs(v) + '°' + (v >= 0 ? 'E' : 'W'), draw),
    };
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, S.la1.el, S.lo1.el, S.la2.el, S.lo2.el), o));
    const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI, n360 = a => ((a % 360) + 360) % 360;
    const gcBrg = (f1, l1, f2, l2) => n360(deg(Math.atan2(Math.sin(rad(l2 - l1)) * Math.cos(rad(f2)), Math.cos(rad(f1)) * Math.sin(rad(f2)) - Math.sin(rad(f1)) * Math.cos(rad(f2)) * Math.cos(rad(l2 - l1)))));
    const merY = f => Math.log(Math.tan(Math.PI / 4 + rad(f) / 2));
    function draw() {
      const f1 = S.la1.get(), l1 = S.lo1.get(), f2 = S.la2.get(); let l2 = S.lo2.get();
      let dl = l2 - l1; if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
      const ml = (f1 + f2) / 2, conv = Math.abs(dl) * Math.sin(rad(Math.abs(ml))), ca = conv / 2;
      const gA = gcBrg(f1, l1, f2, l1 + dl), gB = n360(gcBrg(f2, l1 + dl, f1, l1) + 180);
      const rl = n360(deg(Math.atan2(rad(dl), merY(f2) - merY(f1))));
      // plot on a Mercator frame fitted to the two points
      const pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40; // slerp along the GC
        const p1 = [Math.cos(rad(f1)) * Math.cos(rad(l1)), Math.cos(rad(f1)) * Math.sin(rad(l1)), Math.sin(rad(f1))], p2 = [Math.cos(rad(f2)) * Math.cos(rad(l1 + dl)), Math.cos(rad(f2)) * Math.sin(rad(l1 + dl)), Math.sin(rad(f2))];
        const w = Math.acos(Math.min(1, p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2])) || 1e-9; const a = Math.sin((1 - t) * w) / Math.sin(w), b = Math.sin(t * w) / Math.sin(w);
        const x = a * p1[0] + b * p2[0], y = a * p1[1] + b * p2[1], z = a * p1[2] + b * p2[2];
        let lon = deg(Math.atan2(y, x)); const lat = deg(Math.asin(z)); let dd = lon - l1; if (dd > 180) dd -= 360; if (dd < -180) dd += 360; pts.push([l1 + dd, lat]); }
      pts.splice(0, pts.length, ...pts.filter(p => isFinite(p[0]) && isFinite(p[1]))); const xs = pts.map(p => p[0]).concat([l1, l1 + dl]), ys = pts.map(p => merY(p[1])).concat([merY(f1), merY(f2)]);
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const span = Math.max(x1 - x0, deg(y1 - y0), 10), cxv = (x0 + x1) / 2, cyv = (y0 + y1) / 2;
      const X = lo => 350 + (lo - cxv) / span * 520, Y = la => 175 - (merY(la) - cyv) / rad(span) * 520 * 0.55;
      const gcPath = pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ');
      let grid = ''; if (isFinite(span) && isFinite(cxv)) for (let m = Math.ceil((cxv - span) / 10) * 10, n = 0; m <= cxv + span && n < 80; m += 10, n++) grid += `<line x1="${X(m)}" x2="${X(m)}" y1="0" y2="350" stroke="var(--line)"/>`;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 350"><rect width="700" height="350" fill="var(--panel)"/>${grid}
        <line x1="${X(l1)}" y1="${Y(f1)}" x2="${X(l1 + dl)}" y2="${Y(f2)}" stroke="#d4493a" stroke-width="3" stroke-dasharray="8 6"/>
        <path d="${gcPath}" fill="none" stroke="#3c8cf0" stroke-width="3.5"/>
        <circle cx="${X(l1)}" cy="${Y(f1)}" r="7" fill="var(--ink)"/><text class="halo" x="${(v => isFinite(v) ? Math.max(28, v) : 28)(X(l1) - 12)}" y="${(v => isFinite(v) ? Math.min(322, Math.max(64, v)) : 64)(Y(f1) + 5)}" text-anchor="end" style="font:800 14px var(--font);fill:var(--ink)">A</text>
        <circle cx="${X(l1 + dl)}" cy="${Y(f2)}" r="7" fill="var(--ink)"/><text class="halo" x="${(v => isFinite(v) ? Math.min(686, v) : 686)(X(l1 + dl) + 12)}" y="${(v => isFinite(v) ? Math.min(322, Math.max(64, v)) : 64)(Y(f2) + 5)}" style="font:800 14px var(--font);fill:var(--ink)">B</text>
        <text x="16" y="24" style="font:700 13px var(--font);fill:#3c8cf0">great circle</text><text x="16" y="44" style="font:700 13px var(--font);fill:#d4493a">rhumb line (straight on Mercator)</text>
        <text x="684" y="340" text-anchor="end" style="font:600 12px var(--font);fill:var(--ink)">The GC always lies on the polar side of the RL</text></svg>`;
      o.innerHTML = out([['d.long', Math.abs(dl).toFixed(0) + '°'], ['Mean latitude', Math.abs(ml).toFixed(1) + '°'], ['Convergency = d.long × sin lat', conv.toFixed(1) + '°', true], ['Conversion angle = ½ conv', ca.toFixed(1) + '°', true], ['GC track at A', gA.toFixed(0) + '°'], ['GC track at B', gB.toFixed(0) + '°'], ['RL track (constant)', rl.toFixed(0) + '°']]);
    }
    draw();
    ctx.info('Move A and B', 'Convergency is the change of great-circle track between A and B. It is zero at the equator and largest near the poles (d.long × sin lat). The rhumb line track sits halfway: GC ± conversion angle.');
  };

  /* 5. Time: UTC, LMT, zone time and the date line along a strip of longitudes */
  SIMS.time = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = {
      utc: slider('UTC', 0, 1439, 5, 360, v => String(Math.floor(v / 60)).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0') + ' UTC', draw),
      lon: slider('Your longitude', -180, 180, 0.5, 82.5, v => Math.abs(v) + '°' + (v >= 0 ? 'E' : 'W'), draw),
    };
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, S.utc.el, S.lon.el), o));
    const hm = m => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(Math.round(m % 60)).padStart(2, '0'); };
    const day = m => m < 0 ? 'previous day' : m >= 1440 ? 'next day' : 'same day';
    function draw() {
      const u = S.utc.get(), lon = S.lon.get();
      const lmt = u + lon * 4; let zn = Math.sign(lon) * Math.ceil(Math.abs(lon) / 15 - 0.5); if (Math.abs(lon) === 180) zn = lon > 0 ? 12 : -12;
      const zt = u + zn * 60, ist = u + 330;
      const X = l => 30 + (l + 180) / 360 * 640;
      let marks = ''; for (let l = -180; l <= 180; l += 30) marks += `<line x1="${X(l)}" x2="${X(l)}" y1="70" y2="150" stroke="var(--line)"/><text x="${X(l)}" y="168" text-anchor="middle" style="font:600 12px var(--font);fill:var(--ink)">${Math.abs(l)}${l > 0 ? 'E' : l < 0 ? 'W' : ''}</text><text x="${X(l)}" y="64" text-anchor="middle" style="font:700 12.5px var(--mono,monospace);fill:var(--ink)">${hm(u + l * 4)}</text>`;
      const night = h => { h = ((h % 1440) + 1440) % 1440; return h < 360 || h >= 1080; };
      let shade = ''; for (let l = -180; l < 180; l += 5) shade += `<rect x="${X(l)}" y="70" width="${640 / 72 + 1.2}" height="80" fill="${night(u + (l + 2.5) * 4) ? '#1d2140' : '#f2c46b'}" opacity="${night(u + (l + 2.5) * 4) ? .55 : .45}"/>`;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 250"><rect width="700" height="250" fill="var(--panel)"/>
        <text x="30" y="30" style="font:800 15px var(--font);fill:var(--ink)">LMT along the world at ${hm(u)} UTC</text>
        ${shade}${marks}
        <line x1="${X(0)}" x2="${X(0)}" y1="70" y2="150" stroke="var(--ink)" stroke-width="2.5"/><text x="${X(0)}" y="186" text-anchor="middle" style="font:700 12px var(--font);fill:var(--ink)">Greenwich</text>
        <line x1="${X(180) - 1}" x2="${X(180) - 1}" y1="70" y2="150" stroke="#d4493a" stroke-width="3"/><line x1="${X(-180) + 1}" x2="${X(-180) + 1}" y1="70" y2="150" stroke="#d4493a" stroke-width="3"/>
        <text x="${X(180)}" y="204" text-anchor="end" style="font:700 12px var(--font);fill:#d4493a">date line: west of it is one day ahead</text>
        <path d="M${X(lon)} 152 l-8 14 h16z" fill="var(--warn)"/><line x1="${X(lon)}" x2="${X(lon)}" y1="66" y2="152" stroke="var(--warn)" stroke-width="2.5"/>
        <text class="halo" x="${Math.min(Math.max(X(lon), 130), 570)}" y="230" text-anchor="middle" style="font:800 13px var(--font);fill:var(--warn)">you: LMT ${hm(lmt)} (${day(lmt)})</text>
      </svg>`;
      o.innerHTML = out([['d.long → time', (Math.abs(lon) * 4).toFixed(0) + ' min (' + (lon >= 0 ? 'ahead' : 'behind') + ')'], ['LMT', hm(lmt) + ' · ' + day(lmt), true], ['Zone number', (zn > 0 ? '+' : '') + zn], ['Zone time', hm(zt)], ['IST (82°30′E)', hm(ist)]]);
    }
    draw();
    ctx.info('Slide UTC and longitude', 'Every degree is 4 minutes. East of Greenwich local time is ahead ("longitude east, UTC least"); west it is behind ("longitude west, UTC best").');
  };

  /* 6. C-D-M-V-T: compass, magnetic and true north with the aircraft heading */
  SIMS.cdmvt = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = {
      ch: slider('Compass heading', 0, 359, 1, 74, v => String(v).padStart(3, '0') + '°C', draw),
      dev: slider('Deviation (E +, W −)', -15, 15, 1, 4, v => Math.abs(v) + '°' + (v >= 0 ? 'E' : 'W'), draw),
      vr: slider('Variation (E +, W −)', -30, 30, 1, 10, v => Math.abs(v) + '°' + (v >= 0 ? 'E' : 'W'), draw),
    };
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, S.ch.el, S.dev.el, S.vr.el), o));
    const n3 = x => String(((Math.round(x) % 360) + 360) % 360).padStart(3, '0') + '°';
    function draw() {
      const c = S.ch.get(), d = S.dev.get(), v = S.vr.get(), m = c + d, t = m + v;
      const cx = 230, cy = 190, R = 150, K = 3; // exaggerate the small angles so they can be seen
      const ray = (ang, col, lab, w = 3, len = R) => { const a = (ang - 90) * Math.PI / 180; const x = cx + len * Math.cos(a), y = cy + len * Math.sin(a); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${col}" stroke-width="${w}"/><text x="${x + 8 * Math.cos(a)}" y="${y + 8 * Math.sin(a) - 4}" text-anchor="middle" style="font:800 14px var(--font);fill:${col}">${lab}</text>`; };
      // true north up; magnetic north at -v*K, compass north at -(v+d)*K
      const mn = -v * K, cn = -(v + d) * K, hd = t;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 360"><rect width="700" height="360" fill="var(--panel)"/>
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line)" stroke-dasharray="4 5"/>
        ${ray(0, '#2fb36b', 'TN')}${ray(mn, '#3c8cf0', 'MN', 3, R - 18)}${ray(cn, '#f08c2e', 'CN', 3, R - 48)}
        <g style="transform-origin:${cx}px ${cy}px;transform:rotate(${hd}deg)" class="mv">${G.FH.plane(cx, cy - 60, 1.8, -90)}<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 120}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 4"/></g>
        <text x="${cx}" y="350" text-anchor="middle" style="font:600 12px var(--font);fill:var(--ink)">angles between the norths drawn ×${K} so you can see them</text>
        <g style="font:800 22px var(--mono,monospace)">
          <text x="440" y="80" fill="#f08c2e">C ${n3(c)}</text>
          <text x="440" y="118" style="font:700 15px var(--font);fill:var(--ink)">${d >= 0 ? '+' : '−'} dev ${Math.abs(d)}°${d >= 0 ? 'E' : 'W'}</text>
          <text x="440" y="160" fill="#3c8cf0">M ${n3(m)}</text>
          <text x="440" y="198" style="font:700 15px var(--font);fill:var(--ink)">${v >= 0 ? '+' : '−'} var ${Math.abs(v)}°${v >= 0 ? 'E' : 'W'}</text>
          <text x="440" y="240" fill="#2fb36b">T ${n3(t)}</text>
        </g>
        <text x="440" y="290" style="font:700 13px var(--font);fill:var(--ink)">East is least, west is best</text><text x="440" y="310" style="font:600 12px var(--font);fill:var(--ink)">(going from true towards compass)</text>
      </svg>`;
      o.innerHTML = out([['Compass', n3(c)], ['Magnetic = C + dev', n3(m), true], ['True = M + var', n3(t), true]]);
    }
    draw();
    ctx.info('C → D → M → V → T', 'Going from compass to true, ADD easterly and SUBTRACT westerly deviation and variation. Going the other way, do the opposite: "east is least, west is best".');
  };

  /* 7. Triangle of velocities */
  SIMS.velocity = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const S = {
      tas: slider('TAS', 80, 500, 5, 180, v => v + ' kt', draw), tr: slider('Required track', 0, 359, 1, 90, v => String(v).padStart(3, '0') + '°T', draw),
      wd: slider('Wind from', 0, 359, 5, 30, v => String(v).padStart(3, '0') + '°', draw), ws: slider('Wind speed', 0, 120, 1, 40, v => v + ' kt', draw),
    };
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, S.tas.el, S.tr.el, S.wd.el, S.ws.el), o));
    const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI, n3 = a => String(Math.round(((a % 360) + 360) % 360) % 360).padStart(3, '0') + '°';
    function arrowHeads(x1, y1, x2, y2, n, col) { const a = Math.atan2(y2 - y1, x2 - x1); let s = ''; for (let i = 0; i < n; i++) { const t = 0.5 + (i - (n - 1) / 2) * 0.06; const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; s += `<path d="M${x - 10 * Math.cos(a - .5)} ${y - 10 * Math.sin(a - .5)} L${x} ${y} L${x - 10 * Math.cos(a + .5)} ${y - 10 * Math.sin(a + .5)}" fill="none" stroke="${col}" stroke-width="2.5"/>`; } return s; }
    function draw() {
      const tas = S.tas.get(), tr = S.tr.get(), wd = S.wd.get(), ws = S.ws.get();
      const sinW = ws * Math.sin(rad(wd - tr)) / tas;
      if (Math.abs(sinW) > 1) { svgBox.innerHTML = ''; o.innerHTML = out([['Result', 'Wind too strong for this TAS', true]]); return; }
      const wca = deg(Math.asin(sinW)), hdg = tr + wca, gs = tas * Math.cos(rad(wca)) - ws * Math.cos(rad(wd - tr));
      const k = 420 / Math.max(tas, gs, 1), O = [150, 220];
      const v = (b, len) => [Math.sin(rad(b)) * len * k, -Math.cos(rad(b)) * len * k];
      const H = v(hdg, tas), W = v(wd + 180, ws); const A = [O[0] + H[0], O[1] + H[1]], B = [A[0] + W[0], A[1] + W[1]];
      // fit: shift so all points inside
      const xs = [O[0], A[0], B[0]], ys = [O[1], A[1], B[1]]; const dx = 60 - Math.min(...xs) > 0 ? 60 - Math.min(...xs) : Math.min(0, 640 - Math.max(...xs)); const dy = 40 - Math.min(...ys) > 0 ? 40 - Math.min(...ys) : Math.min(0, 320 - Math.max(...ys));
      const P = p => [p[0] + dx, p[1] + dy]; const [o0, a0, b0] = [P(O), P(A), P(B)];
      const line = (p, q, col, w, n, lab) => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${col}" stroke-width="${w}"/>${arrowHeads(p[0], p[1], q[0], q[1], n, col)}`;
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 360"><rect width="700" height="360" fill="var(--panel)"/>
        ${line(o0, a0, '#3c8cf0', 3.5, 1, 'HDG ' + n3(hdg) + ' / TAS ' + tas)}${line(a0, b0, '#f08c2e', 3, 3, 'W/V ' + n3(wd) + '/' + ws)}${line(o0, b0, '#2fb36b', 3.5, 2, 'TR ' + n3(tr) + ' / GS ' + Math.round(gs))}
        <circle cx="${o0[0]}" cy="${o0[1]}" r="5" fill="var(--ink)"/>
        <g style="font:800 14px var(--font)"><text x="16" y="26" fill="#3c8cf0">→ HDG ${n3(hdg)} / TAS ${tas}</text><text x="250" y="26" fill="#2fb36b">→→ TR ${n3(tr)} / GS ${Math.round(gs)}</text><text x="490" y="26" fill="#f08c2e">→→→ W/V ${n3(wd)}/${ws}</text></g>
        <text x="16" y="344" style="font:600 12px var(--font);fill:var(--ink)">Drift is measured from heading to track. Wind arrows follow the heading arrow; the track arrow closes the triangle.</text></svg>`;
      const drift = tr - hdg;
      o.innerHTML = out([['Heading', n3(hdg), true], ['Groundspeed', Math.round(gs) + ' kt', true], ['Drift', Math.abs(drift).toFixed(1) + '° ' + (drift > 0 ? 'starboard (S)' : drift < 0 ? 'port (P)' : '')], ['Wind correction angle', Math.abs(wca).toFixed(1) + '° ' + (wca > 0 ? 'right' : wca < 0 ? 'left' : '')]]);
    }
    draw();
    ctx.info('Six quantities, know four', 'Heading and TAS, track and GS, wind direction and speed. Know any four and the triangle gives the other two. Steer into the wind: drift is the opposite way.');
  };

  /* 8. CAS / TAS / Mach through ISA, isothermal and inversion layers */
  SIMS.speeds = (st, ctx) => {
    style();
    const svgBox = mk('div'); const o = mk('div', { class: 'out' });
    const layer = seg([['isa', 'ISA layer'], ['iso', 'Isothermal'], ['inv', 'Inversion']], 'isa', draw);
    const hold = seg([['cas', 'Constant CAS'], ['tas', 'Constant TAS'], ['mach', 'Constant Mach']], 'cas', draw);
    st.append(mk('div', { class: 'sim' }, svgBox, mk('div', { class: 'ctl' }, mk('label', null, mk('span', null, 'Layer'), layer.el), mk('label', null, mk('span', null, 'Fly at'), hold.el)), o));
    const P = h => 1013.25 * Math.pow(1 - 6.8756e-6 * h, 5.2559); // ISA pressure (h in ft)
    function draw() {
      const L = layer.get(), Hd = hold.get();
      const T = h => 273.15 + (L === 'isa' ? 15 - 1.98 * h / 1000 : L === 'iso' ? 15 : 15 + 1.0 * h / 1000);
      const sig = h => (P(h) / 1013.25) * (288.15 / T(h)), lss = h => 38.94 * Math.sqrt(T(h));
      const pts = []; for (let h = 0; h <= 30000; h += 1000) {
        let tas, cas, m;
        if (Hd === 'cas') { cas = 250; tas = cas / Math.sqrt(sig(h)); m = tas / lss(h); }
        else if (Hd === 'tas') { tas = 350; cas = tas * Math.sqrt(sig(h)); m = tas / lss(h); }
        else { m = 0.6; tas = m * lss(h); cas = tas * Math.sqrt(sig(h)); }
        pts.push({ h, tas, cas, m });
      }
      const rel = k => p => p[k] / pts[0][k] - 1;
      const maxAbs = Math.max(...['cas', 'tas', 'm'].map(k => Math.max(...pts.map(p => Math.abs(rel(k)(p))))), 1e-6);
      const X = f => 350 + f / maxAbs * 230, Y = h => 320 - h / 30000 * 270;
      const path = f => pts.map((p, i) => (i ? 'L' : 'M') + X(f(p)).toFixed(1) + ' ' + Y(p.h).toFixed(1)).join(' ');
      const col = { cas: '#3c8cf0', tas: '#2fb36b', m: '#f08c2e' };
      const same = k => Math.max(...pts.map(p => Math.abs(rel(k)(p)))) < 1e-3;
      const endX = k => X(rel(k)(pts[pts.length - 1]));
      const labs = ['cas', 'tas', 'm'].map(k => ({ k, x: endX(k) })).sort((a, b) => a.x - b.x);
      labs.forEach((l, i) => { if (i && l.x - labs[i - 1].x < 60) l.x = labs[i - 1].x + 60; });
      const lab = k => { const L = labs.find(l => l.k === k); return `<text x="${L.x}" y="${Y(30000) - 10}" text-anchor="middle" style="font:800 14px var(--font);fill:${col[k]}">${{ cas: 'CAS', tas: 'TAS', m: 'Mach' }[k]}</text>`; };
      svgBox.innerHTML = `<svg class="fig" viewBox="0 0 700 350"><rect width="700" height="350" fill="var(--panel)"/>
        <line x1="110" x2="110" y1="40" y2="325" stroke="var(--ink)" stroke-width="2"/><line x1="110" x2="620" y1="325" y2="325" stroke="var(--ink)" stroke-width="2"/>
        <text x="100" y="${Y(30000) + 4}" text-anchor="end" style="font:700 12px var(--font);fill:var(--ink)">30 000 ft</text><text x="100" y="${Y(0) + 4}" text-anchor="end" style="font:700 12px var(--font);fill:var(--ink)">0 ft</text>
        <text x="620" y="344" text-anchor="end" style="font:700 12px var(--font);fill:var(--ink)">← slower · faster →  (change from the start value)</text>
        ${['cas', 'tas', 'm'].map(k => `<path d="${path(rel(k))}" fill="none" stroke="${col[k]}" stroke-width="${same(k) ? 5 : 4}"/>`).join('')}${['cas', 'tas', 'm'].map(lab).join('')}</svg>`;
      const tr = k => { if (same(k)) return 'constant'; return pts[pts.length - 1][k] > pts[0][k] ? 'increases' : 'decreases'; };
      o.innerHTML = out([['Climbing: CAS', tr('cas'), Hd === 'cas'], ['Climbing: TAS', tr('tas'), Hd === 'tas'], ['Climbing: Mach', tr('m'), Hd === 'mach'], ['Descending', 'the reverse of each']]);
    }
    draw();
    ctx.info('Remember the order', 'Climbing in ISA or isothermal air the lines read C-T-M left to right ("Coffee, Tea or Me"); descending M-T-C. In an inversion climbing: C-M-T; descending: T-M-C. Whatever is held constant is vertical.');
  };
})();
