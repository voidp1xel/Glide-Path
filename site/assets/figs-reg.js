/* Air Regulations & Human Factors figures (R.K. Bali). Same conventions as figs-hb.js: 700-wide viewBox,
   theme variables only, labels ≥ 13 px, animations via CSS classes so prefers-reduced-motion turns them off. */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const AR = (x1, y1, x2, y2, c = 'var(--ink)', w = 2.2) => H.arrow(x1, y1, x2, y2, c, w);
  // two-headed dimension line with a centred label
  const DIM = (x1, x2, y, label, c = 'var(--ink)') => `${AR((x1 + x2) / 2, y, x1, y, c, 1.8)}${AR((x1 + x2) / 2, y, x2, y, c, 1.8)}<line x1="${x1}" x2="${x1}" y1="${y - 8}" y2="${y + 8}" stroke="${c}" stroke-width="1.6"/><line x1="${x2}" x2="${x2}" y1="${y - 8}" y2="${y + 8}" stroke="${c}" stroke-width="1.6"/><rect x="${(x1 + x2) / 2 - label.length * 4.4 - 8}" y="${y - 11}" width="${label.length * 8.8 + 16}" height="22" rx="11" fill="var(--panel)"/>${T((x1 + x2) / 2, y + 5, label, { a: 'middle', c })}`;
  // runway centre-line dashes
  const CL = (x1, x2, y) => { let s = ''; for (let x = x1 + 20; x < x2 - 30; x += 36) s += `<rect x="${x}" y="${y - 1.5}" width="20" height="3" fill="var(--m-paint)"/>`; return s; };

  /* ---------- Ch 1: aerodrome areas (manoeuvring vs movement) ---------- */
  F['reg-aerodrome-areas'] = () => `<svg viewBox="0 0 700 360">
    <rect x="0" y="0" width="700" height="360" fill="var(--m-ground)" opacity=".35"/>
    <rect x="30" y="40" width="640" height="300" rx="16" fill="none" stroke="var(--h3i)" stroke-width="2.5" stroke-dasharray="8 6"/>
    ${T(44, 32, 'MOVEMENT AREA = manoeuvring area + aprons', { c: 'var(--h3i)' })}
    <rect x="50" y="62" width="600" height="160" rx="12" fill="var(--h1)" opacity=".55" stroke="var(--h1i)" stroke-width="2"/>
    ${T(64, 84, 'MANOEUVRING AREA: take-off, landing, taxiing', { c: 'var(--h1i)' })}
    <rect x="80" y="100" width="540" height="44" fill="var(--m-asphalt)"/>${CL(80, 620, 122)}
    ${T(350, 166, 'RUNWAY', { a: 'middle', c: 'var(--ink)' })}
    <rect x="80" y="100" width="12" height="44" fill="var(--m-paint)" opacity=".7"/>
    <path d="M300 144 L300 200 L470 200 L470 144" fill="none" stroke="var(--m-asphalt)" stroke-width="18"/>
    ${T(385, 192, 'TAXIWAY', { a: 'middle', c: 'var(--m-paint)', s: 13 })}
    <rect x="220" y="240" width="330" height="80" rx="10" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>
    ${T(385, 268, 'APRON', { a: 'middle', c: 'var(--h2i)' })}${T(385, 290, 'load · fuel · park · maintain', { a: 'middle', c: 'var(--h2i)', w: 600 })}
    <path d="M385 222 L385 240" stroke="var(--m-asphalt)" stroke-width="18"/>
    ${H.plane(300, 300, 1, -90)}${H.plane(470, 300, 1, -90)}
    ${H.plane(560, 122, 1.2, 0)}
    ${T(64, 332, 'Apron is in the movement area, NOT in the manoeuvring area', { c: 'var(--h3i)', s: 13 })}
  </svg>`;

  /* ---------- Ch 1 / 12: declared distances ---------- */
  F['reg-declared-distances'] = () => {
    const x0 = 40, rw = 470, sw = 70, cw = 150; // runway, stopway, clearway (clearway extends beyond stopway)
    return `<svg viewBox="0 0 700 330">
      <rect x="${x0 + rw}" y="96" width="${cw}" height="60" fill="var(--h1)" opacity=".6" stroke="var(--h1i)" stroke-dasharray="6 4"/>
      ${T(x0 + rw + cw - 6, 90, 'clearway', { a: 'end', c: 'var(--h1i)' })}
      <rect x="${x0}" y="104" width="${rw}" height="44" fill="var(--m-asphalt)"/>${CL(x0, x0 + rw, 126)}
      <rect x="${x0 + rw}" y="108" width="${sw}" height="36" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>
      <path d="M${x0 + rw + 8} 112 l14 14 l-14 14 M${x0 + rw + 30} 112 l14 14 l-14 14" fill="none" stroke="var(--h4i)" stroke-width="2"/>
      ${T(x0 + rw + sw / 2, 170, 'stopway', { a: 'middle', c: 'var(--h4i)' })}
      ${H.plane(x0 + 40, 126, 1.3, 0)}
      ${T(x0, 90, 'runway: take-off direction →', { c: 'var(--ink)', w: 600 })}
      ${DIM(x0, x0 + rw, 206, 'TORA', 'var(--h0i)')}
      ${DIM(x0, x0 + rw + sw, 244, 'ASDA = TORA + stopway', 'var(--h4i)')}
      ${DIM(x0, x0 + rw + cw, 282, 'TODA = TORA + clearway', 'var(--h1i)')}
      ${T(350, 318, 'LDA = runway available for the landing roll (shorter if the threshold is displaced)', { a: 'middle', w: 600 })}
    </svg>`;
  };

  /* ---------- Ch 1 / 4: altitude, height, elevation, flight level, TA/TL ---------- */
  F['reg-vertical-refs'] = () => `<svg viewBox="0 0 700 380">
    <rect x="0" y="40" width="700" height="80" fill="var(--h4)" opacity=".35"/>
    <line x1="0" x2="700" y1="40" y2="40" stroke="var(--h4i)" stroke-width="2"/>${T(690, 34, 'TRANSITION LEVEL: lowest FL above TA · fly flight levels (1013.2)', { a: 'end', c: 'var(--h4i)' })}
    ${T(690, 86, 'TRANSITION LAYER (between them)', { a: 'end', c: 'var(--h4i)' })}
    <line x1="0" x2="700" y1="120" y2="120" stroke="var(--h0i)" stroke-width="2"/>${T(690, 140, 'TRANSITION ALTITUDE: at or below it, fly altitudes (QNH)', { a: 'end', c: 'var(--h0i)' })}
    <rect x="0" y="320" width="700" height="60" fill="var(--m-sea)" opacity=".7"/>${T(16, 346, 'MEAN SEA LEVEL', { c: 'var(--ink)' })}
    <path d="M230 320 L300 250 L360 270 L420 230 L500 320 Z" fill="var(--m-ground)" stroke="var(--ink)" stroke-width="1.5"/>
    <rect x="395" y="226" width="60" height="6" fill="var(--m-asphalt)"/>${T(425, 220, 'aerodrome', { a: 'middle', s: 13, w: 600 })}
    ${H.plane(560, 190, 1.4, 0)}
    ${AR(560, 206, 560, 316, 'var(--h2i)')}${T(570, 270, 'ALTITUDE', { c: 'var(--h2i)' })}${T(570, 288, 'from MSL', { c: 'var(--h2i)', w: 600 })}
    ${H.plane(425, 160, 1.2, 0)}
    ${AR(425, 172, 425, 224, 'var(--h3i)')}${T(320, 196, 'HEIGHT', { c: 'var(--h3i)' })}${T(300, 212, 'from a datum (QFE)', { c: 'var(--h3i)', w: 600 })}
    ${AR(300, 252, 300, 316, 'var(--h5i)')}${T(196, 280, 'ELEVATION', { c: 'var(--h5i)' })}${T(150, 298, 'a point on the ground', { c: 'var(--h5i)', w: 600 })}
    ${H.plane(180, 70, 1.3, 0)}${T(206, 75, 'FL 080: pressure level on 1013.2 hPa', { w: 600 })}
  </svg>`;

  /* ---------- Ch 3: where the marks go ---------- */
  F['reg-marks'] = () => `<svg viewBox="0 0 700 380">
    <!-- side view -->
    <path d="M40 120 Q60 98 120 96 L520 96 Q560 96 590 74 L625 30 L655 30 L640 96 Q660 104 660 116 Q655 132 600 136 L120 136 Q60 136 40 120 Z" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="96" y="102" width="12" height="22" rx="2" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(260, 124, 'VT-EPC', { s: 26, w: 800, c: 'var(--h0i)' })}
    ${T(640, 66, 'VT', { s: 13, w: 800, c: 'var(--h0i)', a: 'middle' })}
    <rect x="98" y="142" width="44" height="18" rx="3" fill="var(--h4)" stroke="var(--h4i)"/>${AR(120, 160, 120, 128, 'var(--h4i)', 1.6)}
    ${T(150, 176, 'ID plate: fireproof, near the main entrance', { c: 'var(--h4i)' })}
    ${AR(380, 112, 380, 84, 'var(--h0i)', 1.6)}${AR(380, 112, 380, 132, 'var(--h0i)', 1.6)}${T(392, 90, 'fuselage + tail: ≥ 30 cm', { c: 'var(--h0i)' })}
    <!-- top view of the wing -->
    ${T(40, 218, 'Wing (underside of the left wing, as a rule):', { w: 600 })}
    <path d="M60 300 L330 240 L370 240 L370 360 L330 360 Z" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="370" y="236" width="40" height="128" rx="18" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
    ${T(220, 318, 'VT-EPC', { s: 30, w: 800, c: 'var(--h1i)', a: 'middle' })}
    ${AR(120, 300, 120, 270, 'var(--h1i)', 1.6)}${AR(120, 300, 120, 338, 'var(--h1i)', 1.6)}
    ${T(440, 280, 'wings: ≥ 50 cm', { s: 15, c: 'var(--h1i)' })}${T(440, 302, 'lighter-than-air: ≥ 50 cm', { c: 'var(--h1i)', w: 600 })}${T(440, 324, 'same height within each group', { w: 600 })}${T(440, 346, 'no ornamentation, kept clean', { w: 600 })}
  </svg>`;

  /* ---------- Ch 2: the five freedoms of the air ---------- */
  F['reg-freedoms'] = () => {
    const rowH = 66, x = [300, 460, 615]; // home, State A, State B
    const st = (cx, cy, lab, hue) => `<rect x="${cx - 52}" y="${cy - 18}" width="104" height="36" rx="18" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="1.6"/>${T(cx, cy + 5, lab, { a: 'middle', c: `var(--h${hue}i)` })}`;
    const pax = (cx, cy, up) => `<g>${AR(cx, cy + (up ? 28 : 6), cx, cy + (up ? 6 : 28), 'var(--h2i)', 2.4)}</g>`;
    const rows = [
      ['1st', 'fly over, no landing', r => `${st(x[0], r, 'Home', 0)}${st(x[2], r, 'B', 3)}<path d="M${x[0] + 52} ${r} Q ${x[1]} ${r - 34} ${x[2] - 52} ${r}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/>${H.plane(x[1], r - 17, 1, 0)}${T(x[1], r + 16, 'over A', { a: 'middle', w: 600 })}`],
      ['2nd', 'land, no traffic (fuel, repair)', r => `${st(x[0], r, 'Home', 0)}${st(x[1], r, 'A', 1)}${st(x[2], r, 'B', 3)}${AR(x[0] + 52, r, x[1] - 54, r)}${AR(x[1] + 52, r, x[2] - 54, r)}${T(x[1], r + 32, 'fuel only', { a: 'middle', c: 'var(--h1i)' })}`],
      ['3rd', 'put down traffic from home', r => `${st(x[0], r, 'Home', 0)}${st(x[1], r, 'A', 1)}${AR(x[0] + 52, r, x[1] - 54, r)}${H.plane(x[0] + 85, r - 12, .9, 0)}${pax(x[1] + 70, r - 20, false)}${T(x[1] + 84, r + 4, 'drop off', { c: 'var(--h2i)' })}`],
      ['4th', 'take on traffic for home', r => `${st(x[0], r, 'Home', 0)}${st(x[1], r, 'A', 1)}${AR(x[1] - 54, r, x[0] + 52, r)}${H.plane(x[0] + 85, r - 12, .9, 180)}${pax(x[1] + 70, r - 20, true)}${T(x[1] + 84, r + 4, 'pick up', { c: 'var(--h2i)' })}`],
      ['5th', 'carry traffic between A and B', r => `${st(x[0], r, 'Home', 0)}${st(x[1], r, 'A', 1)}${st(x[2], r, 'B', 3)}${AR(x[0] + 52, r, x[1] - 54, r, 'var(--line)')}${AR(x[1] + 52, r, x[2] - 54, r, 'var(--h2i)', 3)}${T((x[1] + x[2]) / 2, r - 24, 'sell seats A→B', { a: 'middle', c: 'var(--h2i)' })}`],
    ];
    return `<svg viewBox="0 0 700 ${rows.length * rowH + 50}">
      ${rows.map(([n, d, f], i) => { const r = 40 + i * rowH; return `<rect x="10" y="${r - 28}" width="680" height="${rowH - 8}" rx="12" fill="${i < 2 ? 'var(--h4)' : 'var(--h5)'}" opacity=".18"/>${T(26, r - 2, n + ' freedom', { s: 15, w: 800 })}${T(26, r + 16, d, { w: 600 })}${f(r)}`; }).join('')}
      ${T(350, rows.length * rowH + 36, '1st–2nd: technical (Transit Agreement) · 3rd–5th: commercial (Transport Agreement)', { a: 'middle', w: 600 })}
    </svg>`;
  };
})();

/* ---------- Ch 4: Rules of the Air ---------- */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const AR = (x1, y1, x2, y2, c = 'var(--ink)', w = 2.2) => H.arrow(x1, y1, x2, y2, c, w);
  const box = (x, y, w, h, hue, title) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="var(--h${hue})" opacity=".35" stroke="var(--h${hue}i)" stroke-width="1.5"/>${T(x + w / 2, y + 22, title, { a: 'middle', s: 15, w: 800, c: `var(--h${hue}i)` })}`;

  // right of way: head-on, converging, overtaking
  F['reg-right-of-way'] = () => `<svg viewBox="0 0 700 330">
    ${box(10, 10, 220, 310, 0, 'Head-on')}${box(240, 10, 220, 310, 3, 'Converging')}${box(470, 10, 220, 310, 1, 'Overtaking')}
    ${H.plane(120, 80, 1.4, 90)}${H.plane(120, 260, 1.4, -90)}
    <path d="M120 100 Q120 150 70 170" fill="none" stroke="var(--h0i)" stroke-width="2.4" stroke-dasharray="5 4"/><path d="M120 240 Q120 190 170 170" fill="none" stroke="var(--h0i)" stroke-width="2.4" stroke-dasharray="5 4"/>
    ${T(120, 300, 'BOTH turn right', { a: 'middle', c: 'var(--h0i)' })}
    ${H.plane(300, 230, 1.4, -45)}${H.plane(410, 220, 1.4, -135)}
    ${T(300, 268, 'A', { a: 'middle', s: 15 })}${T(418, 258, 'B', { a: 'middle', s: 15 })}
    <circle cx="352" cy="150" r="8" fill="none" stroke="var(--warn,#d4493a)" stroke-width="2.5"/>
    ${T(350, 290, 'A has B on its right:', { a: 'middle', c: 'var(--h3i)' })}${T(350, 308, 'A gives way (turn right)', { a: 'middle', c: 'var(--h3i)' })}
    <path d="M580 110 L520 260 M580 110 L640 260" stroke="var(--h1i)" stroke-width="1.5" stroke-dasharray="4 4"/>
    ${T(580, 76, 'white light only', { a: 'middle', w: 600 })}
    ${H.plane(580, 110, 1.4, -90)}${H.plane(580, 230, 1.4, -90)}
    ${AR(592, 220, 625, 170, 'var(--h1i)')}
    ${T(580, 290, '< 70° behind: overtaker', { a: 'middle', c: 'var(--h1i)' })}${T(580, 308, 'turns right, keeps clear', { a: 'middle', c: 'var(--h1i)' })}
  </svg>`;

  // navigation light sectors, aircraft seen from above
  F['reg-nav-lights'] = () => {
    const cx = 350, cy = 175, R = 135, rad = d => (d - 90) * Math.PI / 180; // 0° = nose (up)
    const sector = (a1, a2, col) => { const p1 = [cx + R * Math.cos(rad(a1)), cy + R * Math.sin(rad(a1))], p2 = [cx + R * Math.cos(rad(a2)), cy + R * Math.sin(rad(a2))]; const large = ((a2 - a1 + 360) % 360) > 180 ? 1 : 0; return `<path d="M${cx} ${cy} L${p1} A${R} ${R} 0 ${large} 1 ${p2} Z" fill="${col}" opacity=".32" stroke="${col}" stroke-width="1.5"/>`; };
    return `<svg viewBox="0 0 700 395">
      ${sector(0, 110, '#2e9e5b')}${sector(250, 360, '#d4493a')}${sector(110, 250, '#9aa3b5')}
      ${H.plane(cx, cy, 2.4, -90)}
      <circle cx="${cx - 26}" cy="${cy + 3}" r="6" fill="#d4493a"/><circle cx="${cx + 26}" cy="${cy + 3}" r="6" fill="#2e9e5b"/><circle cx="${cx}" cy="${cy + 40}" r="5" fill="#fff" stroke="var(--ink)"/>
      ${T(cx + 120, cy - 70, 'GREEN', { s: 16, w: 800, c: '#2e9e5b' })}${T(cx + 120, cy - 52, 'right wing, 110°', { c: '#2e9e5b' })}
      ${T(cx - 120, cy - 70, 'RED', { a: 'end', s: 16, w: 800, c: '#d4493a' })}${T(cx - 120, cy - 52, 'left wing, 110°', { a: 'end', c: '#d4493a' })}
      ${T(cx, cy + 100, 'WHITE tail light, 140°', { a: 'middle', s: 15, w: 800 })}${T(cx, cy + 118, '(70° each side of dead astern)', { a: 'middle', w: 600 })}
      ${T(cx, 26, 'nose', { a: 'middle', w: 600 })}
      ${T(18, 362, 'Steady bearing = collision risk', { w: 800 })}${T(18, 382, 'see GREEN: you have right of way · see RED: give way, turn right', { w: 600 })}
    </svg>`;
  };

  // VMC minima as an altitude stack
  F['reg-vmc'] = () => `<svg viewBox="0 0 700 380">
    <rect x="0" y="0" width="700" height="380" fill="var(--m-sky)" opacity=".25"/>
    <rect x="0" y="330" width="700" height="50" fill="var(--m-ground)"/>
    <line x1="0" x2="700" y1="110" y2="110" stroke="var(--ink)" stroke-width="2" stroke-dasharray="7 5"/>${T(10, 104, '10,000 ft AMSL (FL 100 if TA is lower)', { w: 600 })}
    <line x1="0" x2="700" y1="240" y2="240" stroke="var(--ink)" stroke-width="2" stroke-dasharray="7 5"/>${T(10, 234, '3,000 ft AMSL or 1,000 ft above terrain, whichever higher', { w: 600 })}
    ${T(20, 50, '8 km visibility', { s: 22, w: 800, c: 'var(--h0i)' })}${T(20, 74, 'all classes', { w: 600 })}
    ${T(20, 160, '5 km visibility', { s: 22, w: 800, c: 'var(--h1i)' })}${T(20, 184, 'all classes', { w: 600 })}
    ${T(20, 275, '5 km', { s: 22, w: 800, c: 'var(--h3i)' })}${T(20, 298, 'A–E: cloud rule as above', { w: 600 })}${T(20, 318, 'F, G: clear of cloud, surface in sight', { w: 700, c: 'var(--h3i)' })}
    ${H.cloud(520, 60, 1.2)}${H.cloud(520, 175, 1.2)}
    ${H.plane(360, 60, 1.3, 0)}${H.plane(360, 175, 1.3, 0)}
    <line x1="380" x2="476" y1="60" y2="60" stroke="var(--h2i)" stroke-width="2"/>${T(430, 50, '1,500 m', { a: 'middle', c: 'var(--h2i)' })}
    <line x1="520" x2="520" y1="70" y2="104" stroke="var(--h2i)" stroke-width="2"/>${T(530, 98, '1,000 ft', { c: 'var(--h2i)' })}
    ${H.cloud(560, 255, 1)}${H.plane(470, 290, 1.2, 0)}${T(470, 318, 'F/G: just clear of cloud', { a: 'middle', w: 600 })}
  </svg>`;

  // semicircular cruising levels compass
  F['reg-semicircular'] = () => {
    const cx = 200, cy = 190, r = 150;
    return `<svg viewBox="0 0 700 380">
      <path d="M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} Z" fill="var(--h0)" opacity=".55" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M${cx} ${cy + r} A${r} ${r} 0 0 1 ${cx} ${cy - r} Z" fill="var(--h3)" opacity=".55" stroke="var(--h3i)" stroke-width="2"/>
      ${T(cx, cy - r - 10, '000°', { a: 'middle' })}${T(cx, cy + r + 22, '180°', { a: 'middle' })}
      ${T(cx + 75, cy - 10, 'ODD', { a: 'middle', s: 24, w: 800, c: 'var(--h0i)' })}${T(cx + 75, cy + 14, '000–179°', { a: 'middle', c: 'var(--h0i)' })}
      ${T(cx - 75, cy - 10, 'EVEN', { a: 'middle', s: 24, w: 800, c: 'var(--h3i)' })}${T(cx - 75, cy + 14, '180–359°', { a: 'middle', c: 'var(--h3i)' })}
      ${T(cx, cy + 4, 'magnetic', { a: 'middle', w: 600 })}${T(cx, cy + 20, 'track', { a: 'middle', w: 600 })}
      <line x1="${cx}" x2="${cx}" y1="${cy - r}" y2="${cy + r}" stroke="var(--ink)" stroke-width="2"/>
      ${T(390, 40, 'Eastbound (000–179°)', { s: 15, w: 800, c: 'var(--h0i)' })}
      ${T(390, 62, 'IFR: FL 10, 30, 50 … 270, 290', { w: 600 })}${T(390, 82, 'VFR: FL 35, 55 … 275 (odd + 500)', { w: 600 })}${T(390, 102, 'RVSM: 310, 330 … 410 · above: 450, 490', { w: 600 })}
      ${T(390, 150, 'Westbound (180–359°)', { s: 15, w: 800, c: 'var(--h3i)' })}
      ${T(390, 172, 'IFR: FL 20, 40, 60 … 280', { w: 600 })}${T(390, 192, 'VFR: FL 45, 65 … 285 (even + 500)', { w: 600 })}${T(390, 212, 'RVSM: 300, 320 … 400 · above: 430, 470', { w: 600 })}
      ${T(390, 262, 'RVSM: 1,000 ft steps, FL 290–410', { w: 700 })}${T(390, 284, 'No VFR in or above RVSM airspace', { w: 700 })}${T(390, 306, 'Polar areas (> 70°): grid tracks', { w: 600 })}
    </svg>`;
  };

  // visual ground signals (signal area panels), small square figures for the gallery
  const P = inner => `<svg viewBox="0 0 200 140"><rect x="0" y="0" width="200" height="140" rx="10" fill="var(--m-ground)" opacity=".55"/>${inner}</svg>`;
  F['reg-gs-noland'] = () => P(`<rect x="50" y="20" width="100" height="100" fill="#d4493a"/><path d="M50 20 L150 120 M150 20 L50 120" stroke="#f4c430" stroke-width="12"/>`);
  F['reg-gs-caution'] = () => P(`<rect x="50" y="20" width="100" height="100" fill="#d4493a"/><path d="M50 20 L150 120" stroke="#f4c430" stroke-width="12"/>`);
  F['reg-gs-dumbbell'] = () => P(`<circle cx="50" cy="70" r="26" fill="#fff"/><circle cx="150" cy="70" r="26" fill="#fff"/><rect x="50" y="62" width="100" height="16" fill="#fff"/>`);
  F['reg-gs-dumbbell-bars'] = () => P(`<circle cx="50" cy="70" r="26" fill="#fff"/><circle cx="150" cy="70" r="26" fill="#fff"/><rect x="50" y="62" width="100" height="16" fill="#fff"/><rect x="45" y="46" width="10" height="48" fill="#111"/><rect x="145" y="46" width="10" height="48" fill="#111"/>`);
  F['reg-gs-cross'] = () => P(`<rect x="20" y="40" width="160" height="60" fill="var(--m-asphalt)"/><path d="M70 50 L130 90 M130 50 L70 90" stroke="#fff" stroke-width="10"/>`);
  F['reg-gs-tee'] = () => P(`<rect x="60" y="30" width="80" height="16" fill="#fff"/><rect x="92" y="30" width="16" height="90" fill="#fff"/>`);
  F['reg-gs-righthand'] = () => P(`<path d="M40 100 L120 100 L120 50" fill="none" stroke="#f08c2e" stroke-width="14"/><path d="M100 60 L120 30 L140 60 Z" fill="#f08c2e"/>`);
  F['reg-gs-c'] = () => P(`<rect x="65" y="15" width="70" height="110" fill="#f4c430"/><text x="100" y="92" text-anchor="middle" style="font:900 64px var(--font);fill:#111">C</text>`);
  F['reg-gs-glider'] = () => P(`<path d="M40 40 L95 100 M95 40 L40 100 M105 40 L160 100 M160 40 L105 100" stroke="#fff" stroke-width="12"/>`);
  F['reg-gs-digits'] = () => P(`<rect x="72" y="10" width="56" height="120" fill="#111"/><text x="100" y="62" text-anchor="middle" style="font:900 44px var(--font);fill:#f4c430">2</text><text x="100" y="116" text-anchor="middle" style="font:900 44px var(--font);fill:#f4c430">7</text>`);
})();

/* ---------- Ch 5: Air Traffic Services ---------- */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  // cross-section of airspace around a busy Indian airport (as the book describes it)
  F['reg-india-airspace'] = () => `<svg viewBox="0 0 700 360">
    <rect x="0" y="300" width="700" height="60" fill="var(--m-ground)"/>
    <rect x="40" y="30" width="620" height="60" rx="8" fill="var(--h5)" opacity=".45" stroke="var(--h5i)" stroke-dasharray="6 4"/>
    ${T(350, 66, 'Above FL 285: Class A (proposed)', { a: 'middle', s: 15, c: 'var(--h5i)' })}
    <rect x="110" y="90" width="480" height="150" fill="var(--h0)" opacity=".55" stroke="var(--h0i)" stroke-width="2"/>
    ${T(350, 160, 'Class C', { a: 'middle', s: 22, w: 800, c: 'var(--h0i)' })}${T(350, 184, '4,000 ft to FL 285 · IFR & VFR need clearance', { a: 'middle', c: 'var(--h0i)' })}
    <rect x="40" y="240" width="620" height="60" fill="var(--h1)" opacity=".55" stroke="var(--h1i)" stroke-width="2"/>
    ${T(350, 276, 'Class D out to 30 NM', { a: 'middle', s: 16, w: 800, c: 'var(--h1i)' })}
    <rect x="330" y="294" width="40" height="6" fill="var(--m-asphalt)"/>${H.plane(400, 220, 1.2, -20)}
    ${T(600, 236, '4,000 ft', { a: 'end', w: 600 })}${T(600, 86, 'FL 285', { a: 'end', w: 600 })}
    ${T(350, 336, 'Airports with > 20 movements/hour and primary + secondary radar', { a: 'middle', w: 600 })}
    ${T(50, 330, '← 30 NM', { w: 600 })}${T(650, 330, '30 NM →', { a: 'end', w: 600 })}
  </svg>`;
})();

/* ---------- Ch 6: Separation ---------- */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const ray = (cx, cy, ang, len, col, w = 2.4, dash = '') => { const a = (ang - 90) * Math.PI / 180; return `<line x1="${cx}" y1="${cy}" x2="${cx + len * Math.cos(a)}" y2="${cy + len * Math.sin(a)}" stroke="${col}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`; };
  const pt = (cx, cy, ang, d) => { const a = (ang - 90) * Math.PI / 180; return [cx + d * Math.cos(a), cy + d * Math.sin(a)]; };
  // lateral: VOR 15° / NDB 30° with the 15 NM arc
  F['reg-lateral'] = () => {
    const panel = (cx, lab, sub, ang, hue, aid) => {
      const R = 210, r15 = 120, [ax, ay] = pt(cx, 300, -ang / 2, r15 + 40), [bx, by] = pt(cx, 300, ang / 2, r15 + 40);
      const arc = (() => { const [x1, y1] = pt(cx, 300, -ang / 2 - 12, r15), [x2, y2] = pt(cx, 300, ang / 2 + 12, r15); return `<path d="M${x1} ${y1} A${r15} ${r15} 0 0 1 ${x2} ${y2}" fill="none" stroke="var(--h${hue}i)" stroke-width="2" stroke-dasharray="6 4"/>`; })();
      return `${ray(cx, 300, -ang / 2, R, `var(--h${hue}i)`)}${ray(cx, 300, ang / 2, R, `var(--h${hue}i)`)}${arc}
        ${H.plane(ax, ay, 1.1, -90 - ang / 2)}${H.plane(bx, by, 1.1, -90 + ang / 2)}
        ${aid === 'vor' ? `<path d="M${cx - 12} 300 l6 -10 h12 l6 10 l-6 10 h-12 z" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>` : `<circle cx="${cx}" cy="300" r="9" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><circle cx="${cx}" cy="300" r="3" fill="var(--ink)"/>`}
        ${T(cx, 334, lab, { a: 'middle', s: 16, w: 800, c: `var(--h${hue}i)` })}${T(cx, 354, sub, { a: 'middle', w: 600 })}
        ${T(cx + r15 * 0.35 + 34, 300 - r15 - 4, '15 NM', { c: `var(--h${hue}i)` })}${T(cx, 222, ang + '°', { a: 'middle', s: 16, w: 800, c: `var(--h${hue}i)` })}`;
    };
    return `<svg viewBox="0 0 700 365">${panel(175, 'VOR', 'radials ≥ 15° apart', 15, 0, 'vor')}${panel(525, 'NDB', 'tracks ≥ 30° apart', 30, 3, 'ndb')}
      ${T(350, 30, 'and at least ONE aircraft 15 NM or more from the aid', { a: 'middle', w: 700 })}</svg>`;
  };
  // track types: same / reciprocal / crossing sectors around a reference track
  F['reg-track-types'] = () => {
    const cx = 230, cy = 185, R = 150;
    const sec = (a1, a2, col) => { const [x1, y1] = pt(cx, cy, a1, R), [x2, y2] = pt(cx, cy, a2, R); const large = ((a2 - a1 + 360) % 360) > 180 ? 1 : 0; return `<path d="M${cx} ${cy} L${x1} ${y1} A${R} ${R} 0 ${large} 1 ${x2} ${y2} Z" fill="${col}" opacity=".5" stroke="var(--ink)" stroke-width="1"/>`; };
    return `<svg viewBox="0 0 700 370">
      ${sec(-45, 45, 'var(--h1)')}${sec(135, 225, 'var(--h5)')}${sec(45, 135, 'var(--h4)')}${sec(225, 315, 'var(--h4)')}
      ${H.arrow(cx, cy + 60, cx, cy - R + 10, 'var(--ink)', 3)}${T(cx + 8, cy + 76, 'reference track', { w: 600 })}
      ${T(cx, cy - 95, 'SAME', { a: 'middle', s: 16, w: 800, c: 'var(--h1i)' })}${T(cx, cy - 77, '< 45°', { a: 'middle', c: 'var(--h1i)' })}
      ${T(cx, cy + 112, 'RECIPROCAL', { a: 'middle', s: 16, w: 800, c: 'var(--h5i)' })}${T(cx, cy + 130, '135°–225°', { a: 'middle', c: 'var(--h5i)' })}
      ${T(cx + 95, cy + 5, 'CROSSING', { a: 'middle', s: 15, w: 800, c: 'var(--h4i)' })}${T(cx - 95, cy + 5, 'CROSSING', { a: 'middle', s: 15, w: 800, c: 'var(--h4i)' })}
      ${T(420, 70, 'Angle between the two tracks:', { s: 15, w: 800 })}
      ${T(420, 104, 'Same track: less than 45°', { c: 'var(--h1i)' })}${T(420, 124, '(or more than 315°)', { w: 600 })}
      ${T(420, 162, 'Reciprocal: 135° to 225°', { c: 'var(--h5i)' })}
      ${T(420, 200, 'Crossing: 45°–135° or 225°–315°', { c: 'var(--h4i)' })}
      ${T(420, 250, 'Protection areas must overlap', { w: 600 })}${T(420, 270, 'for "same" or "reciprocal".', { w: 600 })}
    </svg>`;
  };
})();

/* ---------- Ch 7: Separation near aerodromes ---------- */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const rwy = (x, y, w) => `<rect x="${x}" y="${y - 9}" width="${w}" height="18" rx="3" fill="var(--m-asphalt)"/>`;
  F['reg-dep-sep'] = () => `<svg viewBox="0 0 700 330">
    <rect x="8" y="8" width="222" height="314" rx="14" fill="var(--h1)" opacity=".3"/><rect x="239" y="8" width="222" height="314" rx="14" fill="var(--h3)" opacity=".3"/><rect x="470" y="8" width="222" height="314" rx="14" fill="var(--h5)" opacity=".3"/>
    ${T(119, 36, '1 minute', { a: 'middle', s: 18, w: 800, c: 'var(--h1i)' })}${T(119, 56, 'tracks diverge ≥ 45°', { a: 'middle', w: 600 })}
    ${rwy(30, 280, 90)}<path d="M120 280 Q160 280 200 200" fill="none" stroke="var(--h1i)" stroke-width="2.5"/><path d="M120 280 Q170 280 215 270" fill="none" stroke="var(--h1i)" stroke-width="2.5" stroke-dasharray="6 4"/>
    ${H.plane(200, 200, 1.1, -60)}${H.plane(212, 270, 1.1, -10)}${T(150, 240, '≥ 45°', { s: 15, w: 800, c: 'var(--h1i)' })}
    ${T(350, 36, '2 minutes', { a: 'middle', s: 18, w: 800, c: 'var(--h3i)' })}${T(350, 56, 'same track, leader ≥ 40 kt faster', { a: 'middle', w: 600 })}
    ${rwy(260, 280, 90)}<line x1="350" y1="280" x2="450" y2="140" stroke="var(--h3i)" stroke-width="2.5"/>
    ${H.plane(430, 168, 1.2, -55)}${H.plane(372, 250, 1.2, -55)}${T(300, 160, 'fast jet', { w: 600 })}${T(280, 230, 'slower', { w: 600 })}
    ${T(581, 36, '5 minutes', { a: 'middle', s: 18, w: 800, c: 'var(--h5i)' })}${T(581, 56, 'climbing through the', { a: 'middle', w: 600 })}${T(581, 74, 'leader\'s level, same track', { a: 'middle', w: 600 })}
    ${[120, 160, 200].map((y, i) => `<line x1="490" x2="672" y1="${y}" y2="${y}" stroke="var(--line)" stroke-dasharray="4 4"/>${T(672, y - 4, ['FL 80', 'FL 70', 'FL 60'][i], { a: 'end', w: 600 })}`).join('')}
    ${rwy(490, 290, 80)}<path d="M570 290 L630 160" stroke="var(--h5i)" stroke-width="2.5"/><path d="M570 290 L660 110" stroke="var(--h5i)" stroke-width="2" stroke-dasharray="6 4"/>
    ${H.plane(628, 165, 1.1, -65)}${H.plane(600, 228, 1.1, -63)}
  </svg>`;
  F['reg-dep-arr'] = () => {
    const cx = 440, cy = 165, R = 150; // runway centre; arrival comes from the WEST (left), landing eastbound
    const p = d => [cx + R * Math.cos(d * Math.PI / 180), cy - R * Math.sin(d * Math.PI / 180)]; // d: 0 = east, 180 = west
    const [x1, y1] = p(135), [x2, y2] = p(225);
    return `<svg viewBox="0 0 700 360">
      <path d="M${cx} ${cy} L${x1} ${y1} A${R} ${R} 0 0 0 ${x2} ${y2} Z" fill="var(--h5)" opacity=".45"/>
      <path d="M${cx} ${cy} L${x1} ${y1} A${R} ${R} 0 1 1 ${x2} ${y2} Z" fill="var(--h1)" opacity=".3"/>
      ${rwy(cx - 60, cy, 120)}
      <line x1="${cx - 70}" x2="40" y1="${cy}" y2="${cy}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/>
      ${H.plane(70, cy, 1.3, 0)}${T(70, cy + 30, 'arrival on approach →', { w: 700 })}
      ${T(cx - 110, cy - 40, 'NO take-off', { a: 'middle', s: 15, w: 800, c: 'var(--h5i)' })}${T(cx - 110, cy - 22, 'towards the arrival', { a: 'middle', w: 600, c: 'var(--h5i)' })}${T(cx - 110, cy + 56, '±45° of the reciprocal', { a: 'middle', w: 600, c: 'var(--h5i)' })}
      ${T(cx + 150, cy - 110, 'Take-off allowed', { a: 'middle', s: 15, w: 800, c: 'var(--h1i)' })}${T(cx + 150, cy - 92, 'until 3 min before the', { a: 'middle', w: 600, c: 'var(--h1i)' })}${T(cx + 150, cy - 74, 'arrival reaches the runway', { a: 'middle', w: 600, c: 'var(--h1i)' })}
      ${T(20, 318, 'Full procedure: any direction until the arrival starts its procedure or base turn.', { w: 600 })}
      ${T(20, 340, 'Straight-in: any direction until 5 min out (then the 45° and 3-min rule, or a designated fix).', { w: 600 })}
    </svg>`;
  };
})();

/* ---------- Ch 8: Aerodrome control ---------- */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const CL = (x1, x2, y) => { let s = ''; for (let x = x1 + 20; x < x2 - 30; x += 36) s += `<rect x="${x}" y="${y - 1.5}" width="20" height="3" fill="var(--m-paint)"/>`; return s; };
  F['reg-holding-pos'] = () => `<svg viewBox="0 0 700 300">
    <rect x="20" y="40" width="660" height="70" fill="var(--m-asphalt)"/>${CL(20, 680, 75)}
    ${T(30, 30, 'runway in use', { w: 600 })}${H.plane(120, 75, 1.3, 0)}${T(120, 130, 'landing aircraft', { a: 'middle', w: 600 })}
    <rect x="250" y="110" width="40" height="170" fill="var(--m-asphalt)"/>
    <line x1="240" x2="300" y1="190" y2="190" stroke="#f4c430" stroke-width="4"/><line x1="240" x2="300" y1="198" y2="198" stroke="#f4c430" stroke-width="4" stroke-dasharray="8 6"/>
    ${H.plane(270, 240, 1.3, -90)}
    <line x1="330" x2="330" y1="110" y2="194" stroke="var(--h3i)" stroke-width="2"/>${H.arrow(330, 150, 330, 112, 'var(--h3i)', 2)}${H.arrow(330, 150, 330, 192, 'var(--h3i)', 2)}
    ${T(342, 144, 'runway-holding position, or', { c: 'var(--h3i)' })}${T(342, 164, '50 m from the edge (runway ≥ 900 m)', { c: 'var(--h3i)' })}${T(342, 184, '30 m from the edge (runway < 900 m)', { c: 'var(--h3i)' })}
    ${T(30, 284, 'Report "vacated" only when the WHOLE', { w: 600 })}${T(342, 284, 'aircraft is past the holding line', { w: 600 })}
  </svg>`;
  F['reg-runway-sep'] = () => `<svg viewBox="0 0 700 300">
    <rect x="130" y="120" width="420" height="60" fill="var(--m-asphalt)"/>${CL(130, 550, 150)}
    <rect x="130" y="120" width="10" height="60" fill="var(--m-paint)"/>${T(134, 112, 'threshold', { a: 'middle', w: 600 })}
    ${H.plane(80, 150, 1.3, 0)}${T(14, 200, 'next aircraft', { w: 600 })}${T(14, 218, '(arrival or departure)', { w: 600 })}
    <path d="M330 180 L330 250" stroke="var(--m-asphalt)" stroke-width="22"/>${H.plane(330, 248, 1.2, 90)}
    ${T(330, 284, 'A: landed aircraft clear of the runway', { a: 'middle', c: 'var(--h1i)' })}
    ${H.plane(610, 150, 1.2, 0)}${T(690, 196, 'B: departure past', { a: 'end', c: 'var(--h3i)' })}${T(690, 214, 'the runway end', { a: 'end', c: 'var(--h3i)' })}
    <path d="M540 145 Q 590 140 620 70" fill="none" stroke="var(--h5i)" stroke-width="2" stroke-dasharray="6 4"/>${H.plane(618, 74, 1.1, -70)}${T(600, 50, 'C: departure has started a turn', { a: 'end', c: 'var(--h5i)' })}
    ${T(14, 26, 'The next aircraft waits until A, B or C applies', { s: 15, w: 800 })}
  </svg>`;
})();

/* ---------- Ch 9: Surveillance ---------- */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const scope = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0f2a1e" stroke="#2e9e5b" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="none" stroke="#2e9e5b" stroke-width="1" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="${r * 0.33}" fill="none" stroke="#2e9e5b" stroke-width="1" opacity=".5"/>`;
  const blip = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="#7dfc9e"/>`;
  F['reg-psr-ident'] = () => `<svg viewBox="0 0 700 330">
    ${scope(115, 150, 95)}${blip(150, 110)}${blip(80, 180)}${blip(170, 190)}<line x1="115" y1="150" x2="150" y2="110" stroke="#7dfc9e" stroke-dasharray="3 3"/>
    ${T(115, 275, 'Position report', { a: 'middle', s: 15, w: 800 })}${T(115, 295, 'blip matches the reported', { a: 'middle', w: 600 })}${T(115, 313, 'position and track', { a: 'middle', w: 600 })}
    ${scope(350, 150, 95)}<rect x="320" y="146" width="60" height="8" fill="#2e9e5b"/>${blip(392, 140)}<circle cx="380" cy="150" r="30" fill="none" stroke="#f4c430" stroke-dasharray="4 3"/>
    ${T(350, 275, 'Departing aircraft', { a: 'middle', s: 15, w: 800 })}${T(350, 295, 'identified within 1 NM', { a: 'middle', w: 600 })}${T(350, 313, 'of the runway end', { a: 'middle', w: 600 })}
    ${scope(585, 150, 95)}${blip(560, 200)}${blip(568, 170)}${blip(576, 140)}<path d="M576 140 Q584 118 612 112" fill="none" stroke="#f4c430" stroke-width="2"/>${blip(612, 112)}${blip(530, 110)}${blip(630, 200)}
    ${T(585, 275, 'Turn method', { a: 'middle', s: 15, w: 800 })}${T(585, 295, 'heading change ≥ 30°;', { a: 'middle', w: 600 })}${T(585, 313, 'only ONE blip responds', { a: 'middle', w: 600 })}
    ${T(350, 30, 'Identifying an aircraft with primary radar only', { a: 'middle', s: 15, w: 800 })}
  </svg>`;
})();
