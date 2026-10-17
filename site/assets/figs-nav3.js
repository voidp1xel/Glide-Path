/* Air Navigation Part III (Radio Navigation, ch 26–33) figures. Names are prefixed n3- so they never
   collide with figs-nav.js / figs-nav2.js. Labels stay ≥ 13 px in the 700-wide viewBox. */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const AR = (x1, y1, x2, y2, c = 'var(--ink)', w = 2.2) => H.arrow(x1, y1, x2, y2, c, w);
  const rad = d => (d - 90) * Math.PI / 180; // 0° = 12 o'clock, clockwise
  const P = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))].map(v => +v.toFixed(1));
  const box = (x, y, w, h, hue, rx = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>`;

  // ch 26 — the frequency ladder with the aids in each band
  F['n3-bands'] = () => {
    const bands = [
      ['VLF', '3–30 kHz', 'myria-', []],
      ['LF', '30–300 kHz', 'kilo-', ['NDB / ADF', 'Loran C']],
      ['MF', '0.3–3 MHz', 'hecto-', ['NDB / ADF', 'AM radio']],
      ['HF', '3–30 MHz', 'deca-', ['HF comm', 'sky waves']],
      ['VHF', '30–300 MHz', 'metric', ['VOR · LOC', 'markers', 'VHF comm']],
      ['UHF', '0.3–3 GHz', 'decimetric', ['glide path', 'DME · SSR', 'GPS']],
      ['SHF', '3–30 GHz', 'centimetric', ['radio alt', 'weather radar', 'MLS']],
      ['EHF', '30–300 GHz', 'millimetric', []],
    ];
    const w = 84;
    return `<svg viewBox="0 0 700 330">
      ${T(350, 22, 'Frequency up → wavelength down (λ = c ÷ f)', { a: 'middle' })}
      ${AR(20, 36, 680, 36, 'var(--ink)', 2)}
      ${bands.map((b, i) => { const x = 14 + i * w; return `
        ${box(x, 50, w - 6, 92, i % 6)}
        ${T(x + (w - 6) / 2, 76, b[0], { a: 'middle', s: 16, c: `var(--h${i % 6}i)` })}
        ${T(x + (w - 6) / 2, 100, b[1], { a: 'middle', s: 13, w: 600 })}
        ${T(x + (w - 6) / 2, 124, b[2], { a: 'middle', s: 13, w: 500 })}
        ${b[3].map((a, j) => T(x + (w - 6) / 2, 172 + j * 22, a, { a: 'middle', s: 13, w: 600 })).join('')}`; }).join('')}
      <path d="M14 250 H${14 + 3 * w - 6}" stroke="var(--h3i)" stroke-width="3"/>
      ${T(14, 274, 'Surface + sky waves', { c: 'var(--h3i)' })}
      ${T(14, 296, 'long range, static, big aerials', { w: 500 })}
      <path d="M${14 + 4 * w} 250 H${14 + 8 * w - 6}" stroke="var(--h1i)" stroke-width="3"/>
      ${T(14 + 4 * w, 274, 'Line of sight only', { c: 'var(--h1i)' })}
      ${T(14 + 4 * w, 296, 'range = 1.25 (√H₁ + √H₂) NM', { w: 500 })}
    </svg>`;
  };

  // ch 26 — surface wave, sky wave, skip distance, dead space
  F['n3-propagation'] = () => `<svg viewBox="0 0 700 340">
      <rect x="0" y="40" width="700" height="56" fill="var(--h4)" opacity=".75"/>
      ${T(690, 64, 'Ionosphere (F layer)', { a: 'end', c: 'var(--h4i)' })}
      ${T(690, 86, 'higher at night → longer skip', { a: 'end', w: 500 })}
      <path d="M0 260 Q350 225 700 260 L700 340 L0 340 Z" fill="var(--m-ground)"/>
      <line x1="60" y1="250" x2="60" y2="206" stroke="var(--ink)" stroke-width="4"/><path d="M48 206 L60 190 L72 206 Z" fill="var(--ink)"/>
      ${T(60, 180, 'Tx', { a: 'middle' })}
      <path d="M64 244 Q150 232 240 236" fill="none" stroke="var(--h2i)" stroke-width="4" stroke-dasharray="10 6"/>
      ${T(150, 222, 'surface wave', { a: 'middle', c: 'var(--h2i)' })}
      <path d="M62 200 L300 90 L540 238" fill="none" stroke="var(--h0i)" stroke-width="3.5"/>
      <path d="M62 200 L360 52" fill="none" stroke="var(--h5i)" stroke-width="2.5" stroke-dasharray="6 6"/>
      ${T(376, 132, 'first returning sky wave', { c: 'var(--h0i)' })}
      ${T(376, 152, '(the critical ray)', { c: 'var(--h0i)', w: 500 })}
      ${T(366, 30, 'too steep: escapes', { c: 'var(--h5i)' })}
      <path d="M60 282 H540" stroke="var(--ink)" stroke-width="2"/><path d="M60 276 v12 M540 276 v12" stroke="var(--ink)" stroke-width="2"/>
      ${T(300, 304, 'Skip distance: transmitter → first sky wave', { a: 'middle' })}
      <path d="M240 318 H540" stroke="var(--h5i)" stroke-width="3"/><path d="M240 312 v12 M540 312 v12" stroke="var(--h5i)" stroke-width="3"/>
      ${T(390, 336, 'Dead space: no signal at all', { a: 'middle', c: 'var(--h5i)' })}
    </svg>`;

  // ch 27 — loop (figure of 8) + sense (circle) = cardioid
  F['n3-cardioid'] = () => {
    const poly = (cx, cy, f) => { let d = ''; for (let a = 0; a <= 360; a += 4) { const r = f(a * Math.PI / 180); const x = cx + r * Math.cos(a * Math.PI / 180), y = cy - r * Math.sin(a * Math.PI / 180); d += (a ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return d + 'Z'; };
    const lobe8 = (cx, cy) => poly(cx, cy, t => 60 * Math.abs(Math.cos(t)));
    return `<svg viewBox="0 0 700 260">
      ${T(110, 26, 'Loop: figure of 8', { a: 'middle' })}
      <path d="${lobe8(110, 120)}" fill="var(--h1)" stroke="var(--h1i)" stroke-width="2.5"/>
      ${T(110, 214, 'two nulls → 180° ambiguity', { a: 'middle', w: 500 })}
      ${T(220, 128, '+', { a: 'middle', s: 28 })}
      ${T(330, 26, 'Sense aerial: circle', { a: 'middle' })}
      <circle cx="330" cy="120" r="60" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2.5"/>
      ${T(330, 214, 'no direction at all', { a: 'middle', w: 500 })}
      ${T(440, 128, '=', { a: 'middle', s: 28 })}
      ${T(580, 26, 'Combined: cardioid', { a: 'middle' })}
      <path d="${poly(560, 120, t => 45 * (1 + Math.cos(t)))}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2.5"/>
      <circle cx="560" cy="120" r="5" fill="var(--bad)"/>
      ${AR(520, 160, 556, 126, 'var(--bad)', 2)}
      ${T(470, 182, 'one null', { c: 'var(--bad)' })}
      ${T(580, 214, 'one max, one null: no ambiguity', { a: 'middle', w: 500 })}
      ${T(350, 248, 'The null of the cardioid drives the RBI needle', { a: 'middle' })}
    </svg>`;
  };

  // ch 27 — coastal refraction
  F['n3-coastal'] = () => `<svg viewBox="0 0 700 320">
      <path d="M0 0 H360 L250 320 H0 Z" fill="var(--m-ground)"/>
      <path d="M360 0 H700 V320 H250 Z" fill="var(--m-sea)"/>
      ${T(20, 30, 'LAND (denser)', { c: 'var(--ink)' })}
      ${T(680, 30, 'SEA', { a: 'end', c: 'var(--ink)' })}
      <circle cx="90" cy="230" r="10" fill="var(--h0i)"/>${T(90, 262, 'NDB inland', { a: 'middle' })}
      <path d="M98 225 L300 145" stroke="var(--h5i)" stroke-width="3.5" fill="none"/>
      <path d="M300 145 L640 110" stroke="var(--h5i)" stroke-width="3.5" fill="none"/>
      <path d="M300 145 L660 2" stroke="var(--h5i)" stroke-width="2" stroke-dasharray="6 6" fill="none"/>
      ${T(470, 62, 'straight-line bearing', { c: 'var(--h5i)', w: 500 })}
      ${T(470, 146, 'actual path: bends', { c: 'var(--h5i)' })}
      ${T(470, 166, 'towards the land', { c: 'var(--h5i)' })}
      <path d="M98 236 L300 240" stroke="var(--h1i)" stroke-width="3.5" fill="none"/>
      <path d="M300 240 L660 247" stroke="var(--h1i)" stroke-width="3.5" fill="none"/>
      ${T(470, 280, 'crosses the coast at ~90°:', { c: 'var(--h1i)' })}
      ${T(470, 300, 'little or no error', { c: 'var(--h1i)' })}
      ${T(260, 118, 'acute angle', { a: 'end', c: 'var(--h5i)' })}
    </svg>`;

  // ch 28 — VOR phase difference = magnetic bearing from the station
  F['n3-vor-phase'] = () => {
    const cx = 170, cy = 170, R = 120;
    const rose = [0, 90, 180, 270].map(d => { const [x, y] = P(cx, cy, R, d), [lx, ly] = P(cx, cy, R + 24, d); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--h1i)" stroke-width="2.5"/>${T(lx, ly + 5, 'R' + String(d).padStart(3, '0'), { a: 'middle', c: 'var(--h1i)' })}`; }).join('');
    const wave = (x0, y0, ph, col) => { let d = ''; for (let i = 0; i <= 240; i += 4) { d += (i ? 'L' : 'M') + (x0 + i) + ' ' + (y0 - 22 * Math.sin((i / 120) * 2 * Math.PI - ph * Math.PI / 180)).toFixed(1); } return `<path d="${d}" fill="none" stroke="${col}" stroke-width="3"/>`; };
    return `<svg viewBox="0 0 700 340">
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
      ${rose}
      <circle cx="${cx}" cy="${cy}" r="12" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${T(cx, 26, 'Magnetic north: in phase (0°)', { a: 'middle' })}
      <path d="M${cx + 130} ${cy} l16 -10 v20 z" fill="var(--h5i)"/>
      ${T(420, 60, 'Aircraft east of the station', {})}
      ${wave(420, 120, 0, 'var(--h4i)')}${T(420, 160, 'Reference 30 Hz (FM, all directions)', { c: 'var(--h4i)', s: 13 })}
      ${wave(420, 220, 90, 'var(--h0i)')}${T(420, 260, 'Variable 30 Hz (AM, rotating)', { c: 'var(--h0i)', s: 13 })}
      ${T(420, 296, 'Phase difference 90° = radial 090', {})}
      ${T(420, 320, 'Phase difference = QDR (magnetic FROM)', { c: 'var(--h1i)' })}
    </svg>`;
  };

  // ch 28 — TO/FROM and fly-left/right with OBS 360
  F['n3-tofrom'] = () => {
    const q = (x, y, a, b, hue) => `${T(x, y, a, { a: 'middle', c: `var(--h${hue}i)`, s: 16 })}${T(x, y + 22, b, { a: 'middle', w: 600 })}`;
    return `<svg viewBox="0 0 700 340">
      <rect x="150" y="20" width="400" height="300" rx="16" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5"/>
      <line x1="350" y1="20" x2="350" y2="320" stroke="var(--h1i)" stroke-width="4"/>
      <line x1="150" y1="170" x2="550" y2="170" stroke="var(--bad)" stroke-width="2.5" stroke-dasharray="8 6"/>
      ${AR(350, 300, 350, 40, 'var(--h1i)', 4)}
      <circle cx="350" cy="170" r="12" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${q(250, 80, 'FROM', 'fly right', 2)}${q(450, 80, 'FROM', 'fly left', 2)}
      ${q(250, 240, 'TO', 'fly right', 4)}${q(450, 240, 'TO', 'fly left', 4)}
      ${T(30, 60, 'OBS set', {})}${T(30, 82, 'to 360', { c: 'var(--h1i)' })}
      ${T(30, 164, 'Abeam:', { c: 'var(--bad)' })}${T(30, 186, 'flag / no', { c: 'var(--bad)', w: 500 })}${T(30, 206, 'TO-FROM', { c: 'var(--bad)', w: 500 })}
      ${T(570, 60, 'Depends on', {})}${T(570, 82, 'position +', { w: 500 })}${T(570, 104, 'OBS only,', { w: 500 })}${T(570, 126, 'never on', { w: 500 })}${T(570, 148, 'heading', { w: 500 })}
    </svg>`;
  };

  // ch 29 — the standard holding pattern
  F['n3-hold'] = () => `<svg viewBox="0 0 700 330">
      <path d="M180 80 H520 A80 80 0 0 1 520 240 H180 A80 80 0 0 1 180 80 Z" fill="none" stroke="var(--h1i)" stroke-width="4"/>
      ${AR(300, 80, 420, 80, 'var(--h1i)', 4)}${AR(420, 240, 300, 240, 'var(--h1i)', 4)}
      <path d="M520 62 l12 18 l-12 18 l-12 -18 z" fill="var(--h0i)"/>
      ${T(520, 50, 'Fix (beacon)', { a: 'middle', c: 'var(--h0i)' })}
      ${T(350, 66, 'Inbound leg: 1 min', { a: 'middle' })}
      ${T(350, 270, 'Outbound leg: 1 min (1½ min above FL140)', { a: 'middle' })}
      ${T(640, 166, 'Rate 1', { a: 'middle' })}${T(640, 186, 'right', { a: 'middle' })}
      ${T(60, 166, 'Rate 1', { a: 'middle' })}${T(60, 186, 'right', { a: 'middle' })}
      ${T(350, 166, 'Holding side', { a: 'middle', c: 'var(--h4i)' })}
      ${T(350, 186, '(right of the inbound track)', { a: 'middle', c: 'var(--h4i)', w: 500 })}
      ${T(20, 306, 'IAS: 230 kt to FL140 · 240 kt to FL200 · 265 kt to FL340 · M0.83 above', {})}
    </svg>`;

  // ch 30 — ILS seen from above: localiser lobes and markers
  F['n3-ils-plan'] = () => `<svg viewBox="0 0 700 320">
      <path d="M640 160 L60 40 Q20 160 60 280 Z" fill="none" stroke="var(--line, var(--ink))" stroke-width="0"/>
      <path d="M640 160 L80 40 Q50 100 70 160 Z" fill="#f2c94c" opacity=".55"/>
      <path d="M640 160 L80 280 Q50 220 70 160 Z" fill="#5b8def" opacity=".45"/>
      ${T(200, 100, '90 Hz: left of course', { c: 'var(--ink)' })}
      ${T(200, 236, '150 Hz: right of course', { c: 'var(--ink)' })}
      <line x1="40" y1="160" x2="690" y2="160" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="6 6"/>
      <rect x="560" y="150" width="110" height="20" fill="var(--m-asphalt)"/>
      ${T(615, 194, 'runway', { a: 'middle' })}
      ${T(690, 140, 'LOC aerial', { a: 'end' })}${T(690, 124, 'far end', { a: 'end', w: 500 })}
      ${AR(20, 160, 60, 160, 'var(--ink)', 3)}${T(20, 186, 'approach', {})}
      ${[[180, 'OM', 'blue', '#2d7ff9'], [430, 'MM', 'amber', '#e8a400'], [520, 'IM', 'white', 'var(--ink)']].map(m => `<circle cx="${m[0]}" cy="160" r="9" fill="${m[3]}" stroke="var(--ink)" stroke-width="1.5"/>${T(m[0], 300, m[1], { a: 'middle' })}`).join('')}
      ${T(180, 30, '±10° to 25 NM · ±35° to 17 NM', { a: 'start' })}
    </svg>`;

  // ch 30 — ILS seen from the side: glide path lobes and false glide path
  F['n3-ils-side'] = () => `<svg viewBox="0 0 700 300">
      <rect x="0" y="250" width="700" height="50" fill="var(--m-ground)"/>
      <rect x="560" y="244" width="130" height="8" fill="var(--m-asphalt)"/>
      <path d="M600 248 L20 60 L20 248 Z" fill="#f2c94c" opacity=".45"/>
      <path d="M600 248 L20 60 L20 10 L60 0 Z" fill="#5b8def" opacity=".4"/>
      <line x1="600" y1="248" x2="20" y2="60" stroke="var(--h1i)" stroke-width="4"/>
      <line x1="600" y1="248" x2="160" y2="0" stroke="var(--h5i)" stroke-width="2.5" stroke-dasharray="8 6"/>
      ${T(300, 140, 'glide path 3°', { c: 'var(--h1i)' })}
      ${T(140, 214, '90 Hz below: fly up', {})}
      ${T(36, 34, '150 Hz above', {})}
      ${T(420, 70, 'first false glide path ≈ 6°', { c: 'var(--h5i)' })}
      ${T(420, 90, '(always above the real one)', { c: 'var(--h5i)', w: 500 })}
      ${T(690, 284, 'GP aerial beside the touchdown zone', { a: 'end' })}
    </svg>`;

  // ch 31 — pulses: width, interval, range
  F['n3-pulse'] = () => `<svg viewBox="0 0 700 260">
      <line x1="30" y1="150" x2="680" y2="150" stroke="var(--ink)" stroke-width="2"/>
      ${[60, 400].map(x => `<rect x="${x}" y="80" width="30" height="70" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>`).join('')}
      <rect x="230" y="122" width="30" height="28" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>
      ${T(245, 112, 'echo', { a: 'middle', c: 'var(--h4i)' })}
      ${T(75, 66, 'pulse', { a: 'middle', c: 'var(--h0i)' })}
      <path d="M60 172 H90" stroke="var(--h0i)" stroke-width="2.5"/>${T(75, 194, 'PW', { a: 'middle', c: 'var(--h0i)' })}
      <path d="M60 210 H400" stroke="var(--ink)" stroke-width="2"/><path d="M60 204 v12 M400 204 v12" stroke="var(--ink)" stroke-width="2"/>
      ${T(230, 234, 'PRI (PRF = 1 ÷ PRI): the echo must be back before the next pulse', { a: 'middle' })}
      ${T(470, 60, 'Range = c × t ÷ 2', {})}
      ${T(470, 84, 'Max range = c ÷ (2 × PRF)', {})}
      ${T(470, 108, 'Min range = c × PW ÷ 2', {})}
    </svg>`;

  // ch 31 — SSR interrogation modes: P1–P3 spacing
  F['n3-ssr-modes'] = () => {
    const rows = [['A', 8, 'identity (4096 codes)'], ['B', 17, 'not used'], ['C', 21, 'pressure altitude, 100 ft'], ['D', 25, 'research']];
    const sc = 12;
    return `<svg viewBox="0 0 700 250">
      ${T(20, 26, 'Interrogator 1030 MHz → transponder replies on 1090 MHz', {})}
      ${rows.map((r, i) => { const y = 70 + i * 46, x0 = 110; return `
        ${T(30, y + 6, 'Mode ' + r[0], { c: `var(--h${i}i)` })}
        <rect x="${x0}" y="${y - 16}" width="8" height="24" fill="var(--h${i}i)"/>
        <rect x="${x0 + r[1] * sc}" y="${y - 16}" width="8" height="24" fill="var(--h${i}i)"/>
        <path d="M${x0 + 4} ${y + 14} H${x0 + 4 + r[1] * sc}" stroke="var(--ink)" stroke-width="1.5"/>
        ${T(x0 + r[1] * sc + 24, y + 6, r[1] + ' µs · ' + r[2], { w: 600 })}`; }).join('')}
    </svg>`;
  };

  // ch 31 — DME slant range
  F['n3-dme-slant'] = () => `<svg viewBox="0 0 700 280">
      <rect x="0" y="230" width="700" height="50" fill="var(--m-ground)"/>
      <path d="M90 226 h24 l-12 -26 z" fill="var(--h0i)"/>${T(102, 258, 'DME', { a: 'middle' })}
      <path d="M560 60 l26 6 l-26 6 z" fill="var(--h5i)"/><circle cx="560" cy="66" r="4" fill="var(--h5i)"/>
      <line x1="104" y1="204" x2="556" y2="68" stroke="var(--h1i)" stroke-width="4"/>
      ${T(300, 116, 'slant range (what DME shows)', { c: 'var(--h1i)' })}
      <line x1="104" y1="226" x2="560" y2="226" stroke="var(--h4i)" stroke-width="4"/>
      ${T(330, 216, 'ground range = √(slant² − height²)', { a: 'middle', c: 'var(--h4i)' })}
      <line x1="560" y1="72" x2="560" y2="226" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/>
      ${T(574, 150, 'height in NM', {})}${T(574, 170, '(ft ÷ 6080)', { w: 500 })}
      ${T(20, 30, 'Overhead the station DME reads your height: FL360 ≈ 6 NM.', {})}
      ${T(20, 52, 'Error is small when height < 1000 ft per NM of range.', { w: 500 })}
    </svg>`;

  // ch 32 — how many satellites give what
  F['n3-gps-fix'] = () => {
    const panel = (x, n, label, sub, body) => `<rect x="${x}" y="20" width="160" height="200" rx="14" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5"/>
      ${T(x + 80, 46, n, { a: 'middle', s: 16, c: 'var(--h1i)' })}${body}
      ${T(x + 80, 186, label, { a: 'middle' })}${T(x + 80, 208, sub, { a: 'middle', w: 500 })}`;
    const c = (x, y, r, hue) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--h${hue}i)" stroke-width="2.5"/>`;
    return `<svg viewBox="0 0 700 250">
      ${panel(10, '1 satellite', 'a sphere', 'anywhere on it', c(90, 110, 50, 0))}
      ${panel(184, '2 satellites', 'a circle', 'ambiguous', c(250, 110, 45, 0) + c(290, 110, 45, 4) + `<line x1="270" y1="72" x2="270" y2="148" stroke="var(--h5i)" stroke-width="3"/>`)}
      ${panel(358, '3 satellites', 'two points', 'still ambiguous', c(420, 100, 40, 0) + c(456, 100, 40, 4) + c(438, 132, 40, 2) + `<circle cx="438" cy="92" r="5" fill="var(--h5i)"/><circle cx="438" cy="140" r="5" fill="var(--h5i)"/>`)}
      ${panel(532, '4 satellites', '3-D fix', '+ clock error solved', `<circle cx="612" cy="110" r="10" fill="var(--h1i)"/>` + c(612, 110, 26, 0) + c(612, 110, 44, 4))}
      ${T(350, 236, 'A fifth satellite gives RAIM (integrity); six to exclude a faulty one.', { a: 'middle' })}
    </svg>`;
  };
})();
