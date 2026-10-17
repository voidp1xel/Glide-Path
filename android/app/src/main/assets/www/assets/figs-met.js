/* Meteorology figures. */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;

  /* layers of the atmosphere with the temperature curve */
  F['atm-layers'] = () => {
    const Y = h => 392 - h * 3.6, X = t => 360 + t * 2.4;
    const band = (h0, h1, fill, name, sub) => `<rect x="40" y="${Y(h1)}" width="560" height="${Y(h0) - Y(h1)}" fill="${fill}"/>
      <text x="52" y="${Y(h1) + 20}" class="hd">${name}</text><text x="52" y="${Y(h1) + 36}" class="sm">${sub}</text>`;
    const pts = [[0, 15], [11, -56.5], [20, -56.5], [32, -44.5], [50, -2], [80, -100], [100, -40]];
    const path = pts.map((p, i) => (i ? 'L' : 'M') + X(p[1]) + ',' + Y(p[0])).join(' ');
    return `<svg viewBox="0 0 640 430">
      ${band(0, 11, 'var(--h0)', 'Troposphere', 'weather · falls 6.5°C/km')}
      ${band(11, 50, 'var(--h3)', 'Stratosphere', 'ozone · dry · stable · rises')}
      ${band(50, 80, 'var(--h1)', 'Mesosphere', 'falls · meteors burn')}
      ${band(80, 105, 'var(--h5)', 'Thermosphere', 'rises · ionosphere above 60 km')}
      ${[11, 50, 80].map((h, i) => `<line x1="40" x2="600" y1="${Y(h)}" y2="${Y(h)}" stroke="var(--ink)" stroke-dasharray="5 5" stroke-width="1.2"/><text x="596" y="${Y(h) - 5}" text-anchor="end" style="font:700 11.5px var(--font);fill:var(--ink)">${['Tropopause 11 km (ISA)', 'Stratopause 50 km', 'Mesopause 80 km · coldest ≈ −100°C'][i]}</text>`).join('')}
      <rect x="430" y="${Y(28)}" width="120" height="${Y(20) - Y(28)}" rx="8" fill="var(--h4)" opacity=".9"/><text x="490" y="${Y(24) + 4}" text-anchor="middle" style="font:700 11px var(--font);fill:var(--h4i)">Ozone max 20–25 km</text>
      <path d="${path}" fill="none" stroke="var(--m-warm)" stroke-width="3.2" class="anim-draw" pathLength="1000"/>
      ${pts.map(p => `<circle cx="${X(p[1])}" cy="${Y(p[0])}" r="4" fill="var(--m-warm)"/>`).join('')}
      <text x="${X(15) + 8}" y="${Y(0) - 6}" class="sm">15°C</text><text x="${X(-56.5) - 6}" y="${Y(15)}" text-anchor="end" class="sm">−56.5°C (11–20 km)</text>
      <text x="${X(-2) + 8}" y="${Y(50) + 14}" class="sm">≈ 0°C</text>
      ${H.cloud(470, Y(4), .55)} ${H.plane(540, Y(9), 1, -8)}
      <line x1="${X(-70)}" y1="${Y(70)}" x2="${X(-64)}" y2="${Y(64)}" stroke="var(--m-sun)" stroke-width="2.5" stroke-linecap="round"/><text x="${X(-62)}" y="${Y(64) + 4}" class="sm">meteor</text>
      <line x1="40" x2="40" y1="${Y(0)}" y2="${Y(105)}" stroke="var(--ink)" stroke-width="2"/>
      ${[0, 20, 40, 60, 80, 100].map(h => `<text x="34" y="${Y(h) + 4}" text-anchor="end" class="sm">${h}</text>`).join('')}
      <text x="12" y="${Y(52)}" class="sm" transform="rotate(-90 12 ${Y(52)})" text-anchor="middle">height (km)</text>
      <line x1="40" x2="600" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--ink)" stroke-width="2"/>
      ${[-100, -50, 0].map(t => `<text x="${X(t)}" y="${Y(0) + 18}" text-anchor="middle" class="sm">${t}°C</text>`).join('')}
      <text x="${X(-20)}" y="${Y(0) + 34}" text-anchor="middle" style="font:700 11.5px var(--font);fill:var(--m-warm)">red line = temperature</text>
    </svg>`;
  };

  /* tropopause from equator to pole: three sections and the breaks where jets live */
  F['tropopause-breaks'] = () => {
    const X = lat => 60 + lat * 6.2, Y = km => 330 - km * 16;
    return `<svg viewBox="0 0 640 400">
      <rect x="${X(0)}" y="${Y(19)}" width="${X(90) - X(0)}" height="${Y(0) - Y(19)}" fill="var(--h0)" opacity=".45"/>
      <path d="M${X(0)},${Y(16.5)} L${X(38)},${Y(16)}" stroke="var(--h2i)" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M${X(30)},${Y(12)} L${X(62)},${Y(11)}" stroke="var(--h3i)" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M${X(55)},${Y(9)} L${X(90)},${Y(8)}" stroke="var(--h1i)" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${H.pill(X(17), Y(16.5) - 20, 'Tropical · 100 hPa · 16–16.5 km (India)', 2)}
      ${H.pill(X(54), Y(12) - 22, 'Middle · 200 hPa · ≈11.5 km', 3)}
      ${H.pill(X(76), Y(8.4) + 26, 'Polar · 300 hPa · 8–10 km', 1)}
      <g class="anim-pulse"><circle cx="${X(34)}" cy="${Y(14.2)}" r="15" fill="var(--m-warm)"/><text x="${X(34)}" y="${Y(14.2) + 4}" text-anchor="middle" style="font:800 11px var(--head);fill:#fff">STJ</text></g>
      <g class="anim-pulse"><circle cx="${X(58.5)}" cy="${Y(10)}" r="15" fill="var(--m-cold)"/><text x="${X(58.5)}" y="${Y(10) + 4}" text-anchor="middle" style="font:800 11px var(--head);fill:#fff">PFJ</text></g>
      <text x="${X(34) - 20}" y="${Y(14.2) + 4}" text-anchor="end" class="sm">break ≈40° (more prominent)</text>
      <text x="${X(58.5) - 20}" y="${Y(10) + 22}" text-anchor="end" class="sm">break ≈60°</text>
      <line x1="${X(0)}" x2="${X(90)}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--ink)" stroke-width="2"/>
      ${[0, 30, 60, 90].map(l => `<text x="${l === 90 ? X(l) + 12 : X(l)}" y="${Y(0) + 18}" text-anchor="${l === 90 ? 'end' : 'middle'}" class="sm">${l}°${l === 0 ? ' Equator' : l === 90 ? ' Pole' : ''}</text>`).join('')}
      <text x="${X(0)}" y="${Y(0) + 42}" class="lbl">Equator: 16–18 km high, −70 to −75°C (colder)</text>
      <text x="${X(90)}" y="${Y(0) + 62}" text-anchor="end" class="lbl">Poles: 8–10 km high, −40 to −45°C (warmer)</text>
      ${[0, 5, 10, 15].map(k => `<text x="${X(0) - 8}" y="${Y(k) + 4}" text-anchor="end" class="sm">${k}</text>`).join('')}
      <text x="18" y="${Y(9)}" class="sm" transform="rotate(-90 18 ${Y(9)})" text-anchor="middle">height (km)</text>
      ${H.arrow(X(8), Y(1.5), X(8), Y(13), 'var(--m-warm)', 2.2, '5 4')}<text x="${X(8) + 8}" y="${Y(6)}" class="sm">hot convection pushes it up</text>
    </svg>`;
  };

  /* how the atmosphere is heated: from below */
  F['heated-below'] = () => `<svg viewBox="0 0 640 300">
    <rect width="640" height="300" fill="var(--m-sky)" opacity=".35"/>
    ${H.sun(70, 60, 22)}
    ${H.arrow(100, 85, 250, 225, 'var(--m-sun)', 3)}${H.arrow(110, 70, 380, 225, 'var(--m-sun)', 3)}
    <text x="150" y="132" class="lbl">short-wave sunlight</text><text x="150" y="150" class="sm">passes through the air</text>
    ${H.ground(240)}
    ${[260, 340, 420, 500].map((x, i) => `<g class="anim-rise" style="animation-delay:${i * .6}s">${H.arrow(x, 230, x, 150, 'var(--m-warm)', 2.4, '4 4')}</g>`).join('')}
    <text x="380" y="270" text-anchor="middle" style="font:700 13px var(--font);fill:#fff">Earth's surface warms first</text>
    ${H.pill(545, 40, 'latent heat 77%', 4)}${H.pill(545, 70, 'sensible heat 23%', 2)}
    <text x="400" y="118" class="lbl">… which then heats the air</text><text x="400" y="136" class="sm">conduction · convection</text><text x="400" y="152" class="sm">long-wave radiation · condensation</text>
  </svg>`;

  F['air-composition-big'] = () => `<svg viewBox="0 0 400 260">
    <circle cx="130" cy="130" r="90" fill="none" stroke="var(--h0i)" stroke-width="44" stroke-dasharray="${2 * Math.PI * 90 * .7809} 999" transform="rotate(-90 130 130)"/>
    <circle cx="130" cy="130" r="90" fill="none" stroke="var(--h1i)" stroke-width="44" stroke-dasharray="0 ${2 * Math.PI * 90 * .7809} ${2 * Math.PI * 90 * .2095} 999" transform="rotate(-90 130 130)"/>
    <text x="130" y="138" text-anchor="middle" style="font:800 26px var(--head);fill:var(--ink)">air</text>
    <text x="250" y="105" style="font:800 26px var(--head);fill:var(--h0i)">78% N₂</text><text x="250" y="145" style="font:800 26px var(--head);fill:var(--h1i)">21% O₂</text><text x="250" y="180" style="font:700 18px var(--font);fill:var(--muted)">1% others</text>
  </svg>`;
  /* composition donut */
  F['air-composition'] = () => {
    const parts = [[78.09, 'var(--h0i)', 'Nitrogen 78.09%'], [20.95, 'var(--h1i)', 'Oxygen 20.95%'], [0.96, 'var(--h2i)', 'Argon 0.93% + CO₂ 0.035% + traces']];
    let a = -Math.PI / 2, s = '';
    const cx = 170, cy = 150, r = 110, r2 = 64;
    parts.forEach(([v, c]) => {
      const b = a + (v / 100) * Math.PI * 2;
      const L = b - a > Math.PI ? 1 : 0;
      const p = (rr, t) => [cx + rr * Math.cos(t), cy + rr * Math.sin(t)];
      const [x1, y1] = p(r, a), [x2, y2] = p(r, b), [x3, y3] = p(r2, b), [x4, y4] = p(r2, a);
      s += `<path d="M${x1},${y1} A${r},${r} 0 ${L} 1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 ${L} 0 ${x4},${y4}z" fill="${c}"/>`;
      a = b;
    });
    return `<svg viewBox="0 0 640 300">${s}
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" class="hd">N₂ : O₂</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" class="sm">4 : 1 by volume</text><text x="${cx}" y="${cy + 31}" text-anchor="middle" class="sm">3 : 1 by weight</text>
      ${parts.map((p, i) => `<rect x="320" y="${70 + i * 38}" width="18" height="18" rx="4" fill="${p[1]}"/><text x="348" y="${84 + i * 38}" class="lbl">${p[2]}</text>`).join('')}
      <text x="320" y="196" class="lbl">+ water vapour up to 4%</text><text x="320" y="222" class="lbl">+ dust, salt, smoke</text><text x="320" y="254" class="hd">Same mix up to 80 km</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS, H = G.FH;
  /* pressure levels over a warm and a cold column */
  F['warm-cold-columns'] = () => `<svg viewBox="0 0 640 340">
    <rect x="70" y="40" width="180" height="250" fill="var(--h5)" opacity=".7"/><rect x="390" y="40" width="180" height="250" fill="var(--h0)" opacity=".8"/>
    <text x="160" y="30" text-anchor="middle" class="hd" style="fill:var(--m-warm)">WARM column</text><text x="480" y="30" text-anchor="middle" class="hd" style="fill:var(--m-cold)">COLD column</text>
    ${[[0, '1000 hPa'], [1, '850 hPa'], [2, '700 hPa'], [3, '500 hPa']].map(([i, t]) => { const yw = 280 - i * 78, yc = 280 - i * 62; return `<path d="M70 ${yw} L250 ${yw} C320 ${yw} 320 ${yc} 390 ${yc} L570 ${yc}" fill="none" stroke="var(--ink)" stroke-width="2"/><text x="576" y="${yc + 4}" class="sm">${t}</text>`; }).join('')}
    ${H.ground(290)}
    ${H.arrow(320, 220, 320, 180, 'var(--ink)', 1.5)}<text x="326" y="196" class="sm">levels dip</text>
    <text x="160" y="140" text-anchor="middle" class="lbl">levels spread out</text><text x="160" y="156" text-anchor="middle" class="sm">(pressure falls slowly)</text>
    <text x="480" y="190" text-anchor="middle" class="lbl">levels squeezed</text><text x="480" y="206" text-anchor="middle" class="sm">(pressure falls fast)</text>
    ${H.pill(160, 64, 'HIGH aloft', 5)}${H.pill(480, 64, 'LOW aloft', 0)}
    <text x="320" y="325" text-anchor="middle" class="lbl">Same surface pressure, but at any height the warm side has the higher pressure.</text>
  </svg>`;

  /* QFE / QNH / QNE on one airfield */
  F['altimeter-settings'] = () => {
    const dial = (x, y, val, lab, set, hue) => `<g transform="translate(${x} ${y})"><circle r="44" fill="var(--panel)" stroke="var(--ink)" stroke-width="3"/>
      ${Array.from({ length: 10 }, (_, i) => { const a = i * 36 * Math.PI / 180; return `<line x1="${Math.sin(a) * 36}" y1="${-Math.cos(a) * 36}" x2="${Math.sin(a) * 41}" y2="${-Math.cos(a) * 41}" stroke="var(--ink)" stroke-width="2"/>`; }).join('')}
      <text y="-6" text-anchor="middle" style="font:700 15px var(--mono);fill:var(--ink)">${val}</text><text y="12" text-anchor="middle" class="sm">ft</text>
      <rect x="-26" y="20" width="52" height="16" rx="4" fill="var(--h${hue})"/><text y="32" text-anchor="middle" style="font:700 10px var(--mono);fill:var(--h${hue}i)">${set}</text>
      <text y="66" text-anchor="middle" class="hd">${lab}</text></g>`;
    return `<svg viewBox="0 0 640 380">
      <line x1="20" x2="620" y1="300" y2="300" stroke="var(--m-sea)" stroke-width="3"/><text x="24" y="318" class="sm" style="fill:var(--m-sea)">Mean sea level (QNH datum)</text>
      <line x1="20" x2="620" y1="330" y2="330" stroke="var(--h3i)" stroke-width="2" stroke-dasharray="6 5"/><text x="24" y="348" class="sm" style="fill:var(--h3i)">1013.25 hPa surface (QNE / flight-level datum) — below MSL on a high-pressure day</text>
      <path d="M20 300 L170 300 L250 240 L620 240 L620 300" fill="var(--m-ground)" opacity=".85"/>
      <rect x="300" y="232" width="250" height="8" fill="var(--m-asphalt)"/>${H.plane(420, 222, 1.2, 0)}
      <text x="560" y="262" text-anchor="end" style="font:700 12px var(--font);fill:#fff">Aerodrome elevation 1,500 ft (QFE datum)</text>
      ${dial(110, 90, '0', 'QFE', '950 hPa', 1)} ${dial(320, 90, '1,500', 'QNH', '1000 hPa', 0)} ${dial(530, 90, '1,890', 'QNE', '1013 hPa', 3)}
      <text x="110" y="190" text-anchor="middle" class="sm">height above aerodrome</text><text x="320" y="190" text-anchor="middle" class="sm">altitude above MSL</text><text x="530" y="190" text-anchor="middle" class="sm">pressure altitude</text>
    </svg>`;
  };

  /* isobaric pressure patterns */
  F['pressure-patterns'] = () => {
    const ell = (cx, cy, rx, ry, n, col) => Array.from({ length: n }, (_, i) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx * (i + 1) / n}" ry="${ry * (i + 1) / n}" fill="none" stroke="${col}" stroke-width="1.6"/>`).join('');
    return `<svg viewBox="0 0 640 330">
      ${ell(120, 120, 95, 70, 3, 'var(--m-cold)')}<text x="120" y="126" text-anchor="middle" style="font:800 26px var(--head);fill:var(--m-cold)">L</text>
      <path d="M120 50 a70 70 0 1 0 1 0" fill="none" stroke="var(--m-cold)" stroke-width="0"/>
      ${H.arrow(205, 120, 196, 96, 'var(--m-cold)')}${H.arrow(120, 196, 150, 188, 'var(--m-cold)')}${H.arrow(35, 120, 44, 146, 'var(--m-cold)')}${H.arrow(120, 44, 88, 52, 'var(--m-cold)')}
      <text x="120" y="222" text-anchor="middle" class="lbl">Low: anticlockwise, converging (NH)</text><text x="120" y="238" text-anchor="middle" class="sm">rising air · cloud · rain · visibility better</text>
      ${ell(500, 120, 95, 70, 3, 'var(--m-warm)')}<text x="500" y="128" text-anchor="middle" style="font:800 26px var(--head);fill:var(--m-warm)">H</text>
      ${H.arrow(595, 120, 586, 146, 'var(--m-warm)')}${H.arrow(500, 196, 470, 188, 'var(--m-warm)')}${H.arrow(415, 120, 424, 96, 'var(--m-warm)')}${H.arrow(500, 44, 532, 52, 'var(--m-warm)')}
      <text x="500" y="222" text-anchor="middle" class="lbl">High: clockwise, diverging (NH)</text><text x="500" y="238" text-anchor="middle" class="sm">sinking air · fair · haze, poor visibility</text>
      <path d="M260 40 L310 140 L360 40" fill="none" stroke="var(--m-cold)" stroke-width="2"/><path d="M240 40 L310 175 L380 40" fill="none" stroke="var(--m-cold)" stroke-width="2"/>
      <text x="310" y="196" text-anchor="middle" class="lbl">Trough: V-shaped</text>
      <path d="M240 320 Q310 220 380 320" fill="none" stroke="var(--m-warm)" stroke-width="2"/><path d="M260 320 Q310 250 360 320" fill="none" stroke="var(--m-warm)" stroke-width="2"/>
      <text x="310" y="262" text-anchor="middle" class="lbl">Ridge: rounded</text>
      <text x="20" y="290" class="lbl">Col: between two highs and two lows</text><text x="20" y="306" class="sm">uniform pressure, light variable winds</text>
      <text x="500" y="290" text-anchor="middle" class="lbl">Isobars every 2 hPa</text><text x="500" y="306" text-anchor="middle" class="sm">close together = steep gradient = strong wind</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['insolation'] = () => `<svg viewBox="0 0 640 280">
    ${H.sun(150, 40, 18)} ${H.sun(470, 40, 18)}
    <path d="M120 70 L180 70 L180 220 L120 220z" fill="var(--m-sun)" opacity=".35"/>
    <path d="M440 70 L500 70 L600 220 L400 220z" fill="var(--m-sun)" opacity=".18" transform="skewX(0)"/>
    <path d="M420 60 L480 60 L620 220 L480 220z" fill="var(--m-sun)" opacity=".25"/>
    ${H.ground(220)}
    <line x1="120" x2="180" y1="226" y2="226" stroke="var(--m-warm)" stroke-width="5"/><line x1="480" x2="620" y1="226" y2="226" stroke="var(--m-warm)" stroke-width="5" opacity=".6"/>
    <text x="150" y="252" text-anchor="middle" style="font:700 12.5px var(--font);fill:#fff">Sun overhead: small area</text>
    <text x="530" y="252" text-anchor="middle" style="font:700 12.5px var(--font);fill:#fff">Slant: same energy, bigger area</text>
    <text x="150" y="120" text-anchor="middle" class="lbl">MORE insolation</text><text x="150" y="136" text-anchor="middle" class="sm">noon · tropics</text>
    <text x="330" y="120" text-anchor="middle" class="lbl">LESS insolation</text><text x="330" y="136" text-anchor="middle" class="sm">sunrise/sunset · poles</text>
  </svg>`;
  F['cloudy-night'] = () => `<svg viewBox="0 0 640 260">
    <rect width="318" height="260" fill="var(--m-night)"/><rect x="322" width="318" height="260" fill="#1b2230"/>
    ${[40, 90, 150, 220, 270].map((x, i) => `<circle cx="${x}" cy="${30 + (i % 3) * 18}" r="1.8" fill="#fff"/>`).join('')}
    <text x="159" y="100" text-anchor="middle" style="font:700 13px var(--font);fill:#fff">CLEAR night</text>
    ${[80, 160, 240].map(x => H.arrow(x, 200, x, 120, 'var(--m-warm)', 2.4, '5 4')).join('')}
    <text x="159" y="150" text-anchor="middle" style="font:600 11px var(--font);fill:#ffb4a8">long-wave heat escapes</text>
    ${H.cloud(420, 70, .9, '#d8dde6', '#9aa3b2')}${H.cloud(540, 64, .8, '#d8dde6', '#9aa3b2')}
    ${[420, 540].map(x => H.arrow(x, 205, x, 105, 'var(--m-warm)', 2.4, '5 4') + H.arrow(x + 30, 110, x + 30, 200, 'var(--m-sun)', 2.4, '5 4')).join('')}
    <text x="481" y="150" text-anchor="middle" style="font:600 11px var(--font);fill:#ffe39b">cloud absorbs & sends it back</text>
    <rect y="205" width="640" height="55" fill="var(--m-ground)"/>
    <text x="159" y="238" text-anchor="middle" style="font:800 14px var(--head);fill:#fff">Ground cools a lot → cold, dew, fog</text>
    <text x="481" y="238" text-anchor="middle" style="font:800 14px var(--head);fill:#fff">Ground stays warm → warmer night</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['density-halves'] = () => {
    const Y = km => 300 - km * 14;
    return `<svg viewBox="0 0 640 330">
      ${[[0, 1, 'surface 1225 g/m³'], [6, .5, '½ at 6 km'], [11, .25, '¼ at 11 km'], [17, .125, '⅛ at 17 km']].map(([k, f, t], i) => `<rect x="120" y="${Y(k) - 16}" width="${380 * f}" height="26" rx="8" fill="var(--h${i})" stroke="var(--h${i}i)"/><text x="${130 + 380 * f}" y="${Y(k) + 2}" class="lbl">${t}</text>`).join('')}
      <line x1="110" x2="110" y1="${Y(0) + 14}" y2="${Y(19)}" stroke="var(--ink)" stroke-width="2"/>
      ${[0, 6, 11, 17].map(k => `<text x="102" y="${Y(k) + 4}" text-anchor="end" class="sm">${k} km</text>`).join('')}
      <text x="320" y="320" text-anchor="middle" class="sm">Density halves roughly every 5–6 km (≈3% per 1000 ft low down)</text>
    </svg>`;
  };
  F['thermometers'] = () => `<svg viewBox="0 0 640 280">
    ${[[120, 'Dry bulb', 'T', 30, 'var(--m-warm)'], [320, 'Wet bulb', 'Tw', 22, 'var(--h3i)'], [520, 'Dew point', 'Td', 16, 'var(--m-cold)']].map(([x, n, s, v, c]) => `<rect x="${x - 10}" y="40" width="20" height="170" rx="10" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><circle cx="${x}" cy="220" r="18" fill="${c}"/><rect x="${x - 5}" y="${210 - v * 5}" width="10" height="${v * 5}" fill="${c}" class="anim-rise" style="animation:none"/><text x="${x}" y="258" text-anchor="middle" class="hd">${n}</text><text x="${x + 22}" y="${210 - v * 5}" class="lbl">${s} = ${v}°C</text>`).join('')}
    <text x="320" y="24" text-anchor="middle" class="lbl">Unsaturated air: T &gt; Tw &gt; Td · Saturated (fog, rain): all three equal</text>
    <text x="320" y="276" text-anchor="middle" class="sm">Cloud base ≈ (T − Td) × 400 ft = (30 − 16) × 400 = 5,600 ft</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  const isob = (y, t) => `<line x1="40" x2="600" y1="${y}" y2="${y}" stroke="var(--wire)" stroke-width="2"/><text x="606" y="${y + 4}" class="sm">${t}</text>`;
  F['geostrophic'] = () => `<svg viewBox="0 0 660 300">
    ${isob(60, '1000 hPa')}${isob(150, '1004 hPa')}${isob(240, '1008 hPa')}
    <text x="50" y="40" style="font:800 20px var(--head);fill:var(--m-cold)">LOW</text><text x="50" y="280" style="font:800 20px var(--head);fill:var(--m-warm)">HIGH</text>
    <circle cx="150" cy="200" r="7" fill="var(--ink)"/>${H.arrow(150, 200, 150, 140, 'var(--m-cold)', 3)}<text x="158" y="160" class="sm">PGF (high → low)</text>
    <path d="M150 200 C 190 170, 230 150, 280 150" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="6 5"/>
    <text x="170" y="222" class="sm">starts towards low, Coriolis bends it right…</text>
    ${H.arrow(430, 150, 560, 150, 'var(--ink)', 4)}<text x="495" y="138" text-anchor="middle" class="hd">Geostrophic wind</text>
    ${H.arrow(430, 150, 430, 95, 'var(--m-cold)', 3)}<text x="438" y="108" class="sm">PGF</text>
    ${H.arrow(430, 150, 430, 205, 'var(--m-warm)', 3)}<text x="438" y="200" class="sm">Coriolis (90° right of wind)</text>
    <text x="330" y="292" text-anchor="middle" class="lbl">Balanced: wind parallel to straight isobars, low on the LEFT (NH)</text>
  </svg>`;
  F['friction-wind'] = () => `<svg viewBox="0 0 660 300">
    ${isob(70, '1000 hPa')}${isob(230, '1004 hPa')}
    <text x="50" y="50" style="font:800 18px var(--head);fill:var(--m-cold)">LOW</text>
    ${H.arrow(80, 150, 230, 150, 'var(--ink)', 3.5)}<text x="155" y="140" text-anchor="middle" class="lbl">Above 1 km: geostrophic</text><text x="155" y="172" text-anchor="middle" class="sm">parallel, full speed</text>
    <g transform="translate(300 150)">${H.arrow(0, 0, 105, -28, 'var(--m-sea)', 3.5)}<text x="50" y="30" text-anchor="middle" class="lbl">Over SEA</text><text x="50" y="46" text-anchor="middle" class="sm">≈15° across · ⅔ speed</text></g>
    <g transform="translate(470 150)">${H.arrow(0, 0, 70, -40, 'var(--m-ground)', 3.5)}<text x="50" y="30" text-anchor="middle" class="lbl">Over LAND</text><text x="50" y="46" text-anchor="middle" class="sm">≈30° across · ⅓–½ speed</text></g>
    <text x="330" y="288" text-anchor="middle" class="lbl">Friction slows the wind, Coriolis weakens, PGF wins: wind turns towards the low</text>
  </svg>`;
  F['gradient-wind'] = () => {
    const sys = (cx, lbl, col, cw) => `<circle cx="${cx}" cy="140" r="95" fill="none" stroke="var(--wire)" stroke-width="2"/><text x="${cx}" y="148" text-anchor="middle" style="font:800 26px var(--head);fill:${col}">${lbl}</text>
      <path d="M${cx - 95} 140 A95 95 0 0 ${cw} ${cx} ${cw ? 45 : 235}" fill="none" stroke="var(--ink)" stroke-width="3"/>`;
    return `<svg viewBox="0 0 660 320">${sys(160, 'L', 'var(--m-cold)', 1)}${sys(500, 'H', 'var(--m-warm)', 0)}
      ${H.arrow(85, 82, 125, 60, 'var(--ink)', 3)}${H.arrow(420, 198, 460, 222, 'var(--ink)', 3)}
      <text x="160" y="262" text-anchor="middle" class="hd">Low: SUB-geostrophic</text><text x="160" y="280" text-anchor="middle" class="sm">part of PGF is used to turn the air</text><text x="160" y="296" text-anchor="middle" class="sm">gradient wind &lt; geostrophic</text>
      <text x="500" y="262" text-anchor="middle" class="hd">High: SUPER-geostrophic</text><text x="500" y="280" text-anchor="middle" class="sm">Coriolis must exceed PGF to turn it</text><text x="500" y="296" text-anchor="middle" class="sm">gradient wind &gt; geostrophic</text>
    </svg>`;
  };
  F['sea-land-breeze'] = () => `<svg viewBox="0 0 660 330">
    <g><rect width="320" height="150" fill="var(--m-sky)" opacity=".4"/>${H.sun(40, 30, 13)}
      <rect y="110" width="150" height="40" fill="var(--m-sea)"/><rect x="150" y="110" width="170" height="40" fill="var(--m-ground)"/>
      ${H.arrow(140, 98, 230, 98, 'var(--m-cold)', 3)}${H.arrow(240, 95, 240, 45, 'var(--m-warm)', 3)}${H.arrow(230, 35, 90, 35, 'var(--ink)', 2, '5 4')}${H.arrow(80, 45, 80, 92, 'var(--ink)', 2, '5 4')}
      ${H.cloud(245, 34, .45)}<text x="160" y="16" text-anchor="middle" class="hd">DAY: sea breeze</text><text x="185" y="88" class="sm">cool, moist</text></g>
    <g transform="translate(340 0)"><rect width="320" height="150" fill="var(--m-night)"/>
      <rect y="110" width="150" height="40" fill="var(--m-sea)"/><rect x="150" y="110" width="170" height="40" fill="var(--m-ground)"/>
      ${H.arrow(230, 100, 140, 100, 'var(--m-cold)', 3)}${H.arrow(80, 95, 80, 60, 'var(--m-warm)', 2, '5 4')}${H.arrow(90, 50, 220, 50, '#fff', 2, '5 4')}
      <text x="160" y="16" text-anchor="middle" style="font:800 15px var(--head);fill:#fff">NIGHT: land breeze</text><text x="165" y="90" style="font:600 11px var(--font);fill:#cfd6e4">weaker, shallower</text></g>
    <text x="20" y="180" class="lbl">• Sea breeze starts a few hours after sunrise; temperature falls, humidity rises</text>
    <text x="20" y="202" class="lbl">• Reaches 15–25 km inland (Pune, 170 km from Mumbai) and up to 3,000–5,000 ft</text>
    <text x="20" y="224" class="lbl">• Coriolis later turns it along the coast, land on the left (NH)</text>
    <text x="20" y="246" class="lbl">• Land breeze is lighter, only a few hundred feet deep, less regular</text>
    <text x="20" y="268" class="lbl">• An offshore gradient wind delays the sea breeze to the afternoon</text>
  </svg>`;
  F['slope-winds'] = () => {
    const hill = x => `<path d="M${x} 210 L${x + 90} 70 L${x + 180} 210z" fill="var(--m-ground)"/>`;
    return `<svg viewBox="0 0 660 300">
      <g>${hill(20)}${H.sun(40, 34, 12)}${H.arrow(50, 190, 100, 110, 'var(--m-warm)', 3)}${H.arrow(190, 190, 140, 110, 'var(--m-warm)', 3)}<text x="110" y="240" text-anchor="middle" class="hd">Anabatic</text><text x="110" y="258" text-anchor="middle" class="sm">day · warm air up the slope</text></g>
      <g>${hill(240)}<circle cx="430" cy="34" r="10" fill="#d8dde6"/>${H.arrow(320, 105, 270, 190, 'var(--m-cold)', 3)}${H.arrow(360, 105, 410, 190, 'var(--m-cold)', 3)}<ellipse cx="330" cy="212" rx="70" ry="8" fill="var(--h0)" opacity=".8"/><text x="330" y="240" text-anchor="middle" class="hd">Katabatic</text><text x="330" y="258" text-anchor="middle" class="sm">night · cold air down</text><text x="330" y="274" text-anchor="middle" class="sm">→ frost, fog in hollows</text></g>
      <g>${hill(460)}${H.cloud(530, 72, .6)}${H.rain(510, 92, 40, 4)}${H.arrow(470, 200, 535, 100, 'var(--h0i)', 2.5)}${H.arrow(570, 100, 635, 200, 'var(--m-warm)', 3.5)}<text x="550" y="240" text-anchor="middle" class="hd">Föhn</text><text x="550" y="258" text-anchor="middle" class="sm">up at SALR (rain out)</text><text x="550" y="274" text-anchor="middle" class="sm">down at DALR</text><text x="550" y="290" text-anchor="middle" class="sm">warm, dry lee wind (Chinook)</text></g>
    </svg>`;
  };
  F['microburst'] = () => `<svg viewBox="0 0 660 300">
    ${H.cb(330, 100, .55)}
    ${[300, 330, 360].map(x => H.arrow(x, 95, x, 215, 'var(--m-cold)', 3.5)).join('')}
    <path d="M300 220 C 260 240, 200 240, 140 232" fill="none" stroke="var(--m-cold)" stroke-width="3"/><path d="M360 220 C 400 240, 460 240, 520 232" fill="none" stroke="var(--m-cold)" stroke-width="3"/>
    ${H.arrow(150, 233, 130, 231, 'var(--m-cold)', 3)}${H.arrow(510, 233, 530, 231, 'var(--m-cold)', 3)}
    ${H.ground(245, 660)}
    <path d="M40 150 L120 175 L200 205 L280 190 L380 205 L470 235 L560 250" fill="none" stroke="var(--m-warm)" stroke-width="2.5" stroke-dasharray="7 5"/>
    ${H.plane(40, 150, 1.1, 18, 'var(--m-warm)')}
    <text x="80" y="128" class="sm">1. headwind: IAS up, climbs</text><text x="300" y="166" text-anchor="middle" class="sm" style="fill:#fff">2. downdraught</text><text x="470" y="215" class="sm">3. tailwind: IAS drops, sinks</text>
    <text x="330" y="282" text-anchor="middle" style="font:700 12.5px var(--font);fill:#fff">≈ 4 km across · lasts 1–5 min · up to 90 kt difference · wet or dry</text>
  </svg>`;
  F['thermal-wind'] = () => `<svg viewBox="0 0 660 260">
    ${H.arrow(60, 200, 240, 200, 'var(--h0i)', 4)}<text x="150" y="222" text-anchor="middle" class="lbl" style="fill:var(--h0i)">lower wind V₀</text>
    ${H.arrow(240, 200, 420, 80, 'var(--m-warm)', 4)}<text x="345" y="190" text-anchor="end" class="lbl" style="fill:var(--m-warm)">thermal wind Vₜ</text>
    ${H.arrow(60, 200, 420, 80, 'var(--ink)', 4)}<text x="200" y="120" class="lbl">upper wind V₁</text>
    <text x="440" y="70" class="hd">V₁ = V₀ + Vₜ</text><text x="440" y="92" class="lbl">Vₜ = V₁ − V₀</text>
    <text x="440" y="122" class="sm">Blows along isotherms</text><text x="440" y="138" class="sm">(thickness lines)</text><text x="440" y="154" class="sm">COLD on the left (NH)</text>
    <text x="440" y="170" class="sm">Warm south, cold north</text><text x="440" y="186" class="sm">→ westerly thermal wind</text>
  </svg>`;
  F['coriolis'] = () => `<svg viewBox="0 0 660 280">
    <circle cx="170" cy="140" r="115" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/><circle cx="170" cy="140" r="5" fill="var(--ink)"/><text x="170" y="128" text-anchor="middle" class="sm">N pole</text>
    <path d="M170 140 C 200 100, 250 90, 270 110" fill="none" stroke="var(--m-warm)" stroke-width="3" stroke-dasharray="6 4"/>${H.arrow(262, 102, 272, 112, 'var(--m-warm)', 3)}
    ${H.arrow(170, 140, 280, 70, 'var(--ink)', 2, '3 4')}<text x="285" y="62" class="sm">intended path</text>
    <path d="M70 70 A130 130 0 0 1 120 40" fill="none" stroke="var(--ink)" stroke-width="2"/>${H.arrow(110, 44, 122, 39, 'var(--ink)', 2)}<text x="40" y="34" class="sm">earth turns W → E (anticlockwise from above)</text>
    <text x="350" y="120" class="hd">Deflected RIGHT in NH, LEFT in SH</text>
    <text x="350" y="146" class="lbl">Coriolis = 2Ωρ V sin φ</text>
    <text x="350" y="170" class="sm">• Maximum at the poles (sin 90° = 1)</text><text x="350" y="188" class="sm">• Zero at the equator → geostrophic rule fails</text><text x="350" y="206" class="sm">• Grows with wind speed and air density</text><text x="350" y="224" class="sm">• Acts at 90° to the wind</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['slant-vis'] = () => `<svg viewBox="0 0 660 260">
    <rect width="660" height="260" fill="var(--m-sky)" opacity=".35"/>
    <rect x="0" y="175" width="660" height="45" fill="#cfd5dd" opacity=".85"/>
    <rect x="0" y="220" width="660" height="40" fill="var(--m-ground)"/><rect x="380" y="214" width="200" height="6" fill="var(--m-asphalt)"/>
    ${H.plane(470, 50, 1.2, 0)}<line x1="470" y1="62" x2="470" y2="214" stroke="var(--ok)" stroke-width="2.5" stroke-dasharray="6 4"/>
    <text x="482" y="112" class="lbl" style="fill:var(--ok)">vertical: thin fog</text><text x="482" y="130" class="lbl" style="fill:var(--ok)">→ runway visible</text>
    ${H.plane(90, 120, 1.2, 14)}<line x1="100" y1="126" x2="400" y2="214" stroke="var(--warn)" stroke-width="2.5" stroke-dasharray="6 4"/>
    <text x="70" y="98" class="lbl" style="fill:var(--warn)">slant: long path through fog → runway lost</text>
    <text x="20" y="200" class="sm">shallow fog layer</text>
  </svg>`;
  F['fog-types'] = () => {
    const panel = (x, t, sub, inner) => `<g transform="translate(${x} 0)"><rect width="200" height="170" rx="14" fill="var(--wash)"/>${inner}<text x="100" y="195" text-anchor="middle" class="hd">${t}</text><text x="100" y="212" text-anchor="middle" class="sm">${sub}</text></g>`;
    return `<svg viewBox="0 0 660 230">
      ${panel(10, 'Radiation', 'clear night · light wind · land', `<rect y="120" width="200" height="50" fill="var(--m-ground)" rx="0"/><rect y="98" width="200" height="22" fill="#cfd5dd" opacity=".9"/>${[40, 100, 160].map(x => H.arrow(x, 112, x, 60, 'var(--m-cold)', 2, '4 4')).join('')}<circle cx="170" cy="30" r="9" fill="#d8dde6"/>`)}
      ${panel(230, 'Advection', 'warm moist air over cold surface', `<rect y="120" width="200" height="50" fill="var(--h0)"/><rect y="96" width="200" height="24" fill="#cfd5dd" opacity=".9"/>${H.arrow(20, 70, 170, 70, 'var(--m-warm)', 3)}<text x="95" y="60" text-anchor="middle" class="sm">warm, moist</text><text x="100" y="150" text-anchor="middle" class="sm">cold sea / land</text>`)}
      ${panel(450, 'Steaming', 'cold air over warm sea', `<rect y="120" width="200" height="50" fill="var(--m-sea)"/>${[30, 70, 110, 150].map((x, i) => `<path class="anim-rise" style="animation-delay:${i * .5}s" d="M${x} 118 q8 -10 0 -20 q-8 -10 0 -20" fill="none" stroke="#9aa3b2" stroke-width="3"/>`).join('')}${H.arrow(20, 50, 170, 50, 'var(--m-cold)', 3)}<text x="95" y="40" text-anchor="middle" class="sm">cold air</text><text x="100" y="150" text-anchor="middle" style="font:600 11px var(--font);fill:#fff">warm water</text>`)}
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['cloud-atlas'] = () => {
    // Three equal bands (not to scale) so every cloud gets room; CU and CB get their own column on the right.
    const B = { hi: 30, md: 190, lo: 350 }, BH = 160, G0 = B.lo + BH; // ground line
    const col = [95, 265, 435];
    const cirrus = (x, y) => `<path d="M${x - 50} ${y + 8} q30 -18 70 -10 q14 3 30 -12 M${x - 40} ${y + 22} q34 -16 80 -6 M${x - 10} ${y - 6} q16 -14 40 -16" fill="none" stroke="var(--m-cloudline)" stroke-width="2.4" stroke-linecap="round"/>`;
    const sheet = (x, y, w, h, c) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" stroke="var(--m-cloudline)" stroke-width="1.2"/>`;
    const puff = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--m-cloud)" stroke="var(--m-cloudline)" stroke-width="1.2"/>`;
    const row = (x, y, n, r, gap) => Array.from({ length: n }, (_, i) => puff(x + (i - (n - 1) / 2) * gap, y + (i % 2) * 3, r)).join('');
    const lbl = (x, y, t, sub) => `<text x="${x}" y="${y}" class="hd" text-anchor="middle">${t}</text><text x="${x}" y="${y + 17}" class="sm" text-anchor="middle">${sub}</text>`;
    const band = (y, h, title, sub) => `<rect x="0" y="${y}" width="760" height="${BH}" fill="var(--h${h})" opacity=".28"/><line x1="0" x2="760" y1="${y}" y2="${y}" stroke="var(--line)"/>
      <text x="12" y="${y + 20}" class="lbl" style="font-weight:800">${title}</text><text x="12" y="${y + 37}" class="sm">${sub}</text>`;
    const gy = k => B[k] + 78, ly = k => B[k] + 122;
    return `<svg viewBox="0 0 760 560">
      ${band(B.hi, 3, 'HIGH', '20,000–60,000 ft · ice crystals')}${band(B.md, 0, 'MEDIUM', '6,500–20,000 ft')}${band(B.lo, 1, 'LOW', 'surface–6,500 ft')}
      <line x1="560" x2="560" y1="${B.hi}" y2="${G0}" stroke="var(--line)" stroke-dasharray="5 5"/>
      <text x="660" y="${B.hi + 20}" class="lbl" text-anchor="middle" style="font-weight:800">VERTICAL</text>
      <rect x="0" y="${G0}" width="760" height="10" fill="var(--m-ground,#8a7b5c)"/>
      ${cirrus(col[0], gy('hi'))}${lbl(col[0], ly('hi'), 'CI', 'feathery ice')}
      ${sheet(col[1], gy('hi'), 140, 14, 'var(--m-cloud)')}${lbl(col[1], ly('hi'), 'CS', 'veil · halo')}
      ${row(col[2], gy('hi'), 5, 8, 20)}${lbl(col[2], ly('hi'), 'CC', 'tiny ripples')}
      ${row(col[0], gy('md'), 4, 13, 30)}${lbl(col[0], ly('md'), 'AC', 'rolls · icing possible')}
      ${sheet(col[1], gy('md'), 150, 22, '#e2e6ec')}${lbl(col[1], ly('md'), 'AS', 'ground-glass sun · corona')}
      <path d="M${col[2] - 75} ${G0 - 34} V${B.md + 70} q75 -26 150 0 V${G0 - 34} z" fill="#9aa3b2" stroke="var(--m-cloudline)"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${col[2] - 60 + i * 20}" x2="${col[2] - 66 + i * 20}" y1="${G0 - 30}" y2="${G0 - 6}" stroke="#4f7fd6" stroke-width="2"/>`).join('')}
      <text x="${col[2]}" y="${B.lo + 60}" text-anchor="middle" class="hd" style="fill:#fff">NS</text><text x="${col[2]}" y="${B.lo + 78}" text-anchor="middle" class="sm" style="fill:#fff">continuous rain</text>
      <text x="${col[2]}" y="${B.md + 100}" text-anchor="middle" class="sm" style="fill:#fff">tops into medium</text>
      ${sheet(col[0], B.lo + 96, 150, 16, '#d5dae2')}${lbl(col[0], B.lo + 128, 'ST', 'drizzle · fog on ground')}
      ${row(col[1], B.lo + 92, 4, 15, 34)}${lbl(col[1], B.lo + 128, 'SC', 'grey rolls')}
      ${row(605, G0 - 96, 3, 18, 22)}${puff(605, G0 - 116, 20)}<rect x="578" y="${G0 - 84}" width="54" height="8" fill="var(--m-cloudline)" opacity=".5"/>
      ${lbl(605, G0 - 46, 'CU', 'heaps')}
      <path d="M655 ${G0 - 30} L665 ${B.hi + 80} L640 ${B.hi + 52} H752 L728 ${B.hi + 80} L740 ${G0 - 30} Z" fill="#7d8697" stroke="var(--m-cloudline)" stroke-width="1.4"/>
      ${[[656, G0 - 60], [662, B.lo + 30], [664, B.md + 110], [666, B.md + 10], [739, G0 - 60], [733, B.lo + 30], [730, B.md + 110], [728, B.md + 10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14" fill="#7d8697"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<line x1="${668 + i * 18}" x2="${662 + i * 18}" y1="${G0 - 28}" y2="${G0 - 4}" stroke="#4f7fd6" stroke-width="2.4"/>`).join('')}
      <text x="697" y="${B.md + 40}" text-anchor="middle" class="hd" style="fill:#fff">CB</text><text x="697" y="${B.md + 58}" text-anchor="middle" class="sm" style="fill:#fff">thunder</text><text x="697" y="${B.md + 76}" text-anchor="middle" class="sm" style="fill:#fff">hail</text><text x="697" y="${B.md + 94}" text-anchor="middle" class="sm" style="fill:#fff">showers</text>
      <text x="697" y="${B.hi + 44}" text-anchor="middle" class="sm">anvil to tropopause</text>
      <text x="380" y="548" text-anchor="middle" class="sm">Bands drawn equal height for clarity (not to scale). NS, CU and CB grow through several bands.</text>
    </svg>`;
  };
  F['conv-div'] = () => `<svg viewBox="0 0 660 280">
    <g transform="translate(165 0)"><text y="22" text-anchor="middle" class="hd" style="fill:var(--m-cold)">LOW · convergence</text>
      ${H.arrow(-140, 230, -30, 230, 'var(--ink)', 3)}${H.arrow(140, 230, 30, 230, 'var(--ink)', 3)}${[-10, 10].map(x => H.arrow(x, 220, x, 80, 'var(--m-warm)', 3)).join('')}
      ${H.arrow(-20, 60, -130, 60, 'var(--ink)', 2, '5 4')}${H.arrow(20, 60, 130, 60, 'var(--ink)', 2, '5 4')}${H.cloud(0, 110, 1)}
      <text y="262" text-anchor="middle" class="sm">rising air · cloud · rain · good visibility</text></g>
    <g transform="translate(495 0)"><text y="22" text-anchor="middle" class="hd" style="fill:var(--m-warm)">HIGH · divergence</text>
      ${H.arrow(-130, 60, -20, 60, 'var(--ink)', 2, '5 4')}${H.arrow(130, 60, 20, 60, 'var(--ink)', 2, '5 4')}${[-10, 10].map(x => H.arrow(x, 80, x, 220, 'var(--m-cold)', 3)).join('')}
      ${H.arrow(-30, 230, -140, 230, 'var(--ink)', 3)}${H.arrow(30, 230, 140, 230, 'var(--ink)', 3)}
      <rect x="-120" y="180" width="240" height="22" fill="#d9c9a5" opacity=".6"/><text y="196" text-anchor="middle" class="sm">haze under subsidence inversion</text>
      <text y="262" text-anchor="middle" class="sm">sinking air · fair · poor visibility</text></g>
  </svg>`;
  F['contrails'] = () => `<svg viewBox="0 0 660 300">
    ${[[40, 'NO CONTRAILS', 'above Maxtra (stratosphere)', 3], [100, 'Contrails possible / certain', 'between Drytra and Maxtra', 0], [160, 'Contrails if moist', 'Mintra → Drytra (≈2 km band)', 4], [220, 'NO CONTRAILS', 'below Mintra (≈ −45°C level for jets)', 1]].map(([y, a, b, h]) => `<rect x="40" y="${y - 30}" width="580" height="56" fill="var(--h${h})" opacity=".7"/><text x="60" y="${y}" class="hd">${a}</text><text x="60" y="${y + 17}" class="sm">${b}</text>`).join('')}
    <text x="610" y="76" text-anchor="end" class="lbl">Maxtra level</text><text x="610" y="136" text-anchor="end" class="lbl">Drytra level</text><text x="610" y="196" text-anchor="end" class="lbl">Mintra level</text>
    <path d="M330 100 L560 100" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".9"/>${H.plane(570, 100, 1.1, 0)}
    <text x="330" y="290" text-anchor="middle" class="sm">Exhaust trails form from about 9 km up; distrails are clear lanes cut through cloud.</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  const rings = (cx, cy, rs, cols) => rs.map((r, i) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${cols[i]}" stroke-width="5" opacity=".85"/>`).join('');
  F['halo-corona'] = () => `<svg viewBox="0 0 660 280">
    <rect width="330" height="230" fill="#cfe4f7"/><rect x="330" width="330" height="230" fill="#b9c3d1"/>
    ${rings(165, 115, [88, 94], ['#f2f2f2', 'var(--m-warm)'])}<circle cx="165" cy="115" r="14" fill="var(--m-sun)"/>
    <path d="M10 40 q80 -14 160 -4 q80 10 150 0" stroke="#fff" stroke-width="16" opacity=".5" fill="none"/>
    <text x="165" y="252" text-anchor="middle" class="hd">Halo · CS (ice)</text><text x="165" y="270" text-anchor="middle" class="sm">refraction · 22° radius · red outside · little icing</text>
    ${rings(495, 115, [20, 27, 34], ['#8fa8ff', '#f5e27a', 'var(--m-warm)'])}<circle cx="495" cy="115" r="13" fill="#fff6c9"/>
    <text x="495" y="252" text-anchor="middle" class="hd">Corona · AS (droplets)</text><text x="495" y="270" text-anchor="middle" class="sm">diffraction · small rings (≤5°) · red outside · icing possible</text>
  </svg>`;
  F['rainbow'] = () => `<svg viewBox="0 0 660 250">
    ${['#e0412f', '#f08a24', '#f5d33a', '#4cb050', '#3d7bd9', '#5a3fb0', '#8f3fb5'].map((c, i) => `<path d="M${150 + i * 7} 220 A${180 - i * 7} ${180 - i * 7} 0 0 1 ${510 - i * 7} 220" fill="none" stroke="${c}" stroke-width="7"/>`).join('')}
    <path d="M110 220 A220 220 0 0 1 550 220" fill="none" stroke="#8f3fb5" stroke-width="3" opacity=".4"/><path d="M118 220 A212 212 0 0 1 542 220" fill="none" stroke="#e0412f" stroke-width="3" opacity=".4"/>
    <text x="330" y="150" text-anchor="middle" class="hd">Primary bow: 42°, red outside</text><text x="330" y="168" text-anchor="middle" class="sm">2 refractions + 1 total internal reflection</text>
    <text x="330" y="22" text-anchor="middle" class="sm">faint secondary bow ≈ 52°: colours reversed (red inside)</text>
    <text x="330" y="240" text-anchor="middle" class="sm">seen with the sun behind you</text>
  </svg>`;
  F['mirage'] = () => `<svg viewBox="0 0 660 230">
    <g><rect width="320" height="180" fill="#f7e2b8"/><rect y="150" width="320" height="30" fill="#c99a5b"/>
      <path d="M30 120 Q170 165 290 125" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>${H.arrow(270, 127, 290, 125)}
      <rect x="30" y="95" width="10" height="25" fill="#3a6b35"/><rect x="30" y="150" width="10" height="20" fill="#3a6b35" opacity=".35"/>
      <text x="160" y="25" text-anchor="middle" class="hd">Inferior mirage</text><text x="160" y="43" text-anchor="middle" class="sm">hot road / sand · steep lapse rate</text><text x="160" y="205" text-anchor="middle" class="sm">"water" on the road: image below object</text></g>
    <g transform="translate(340 0)"><rect width="320" height="180" fill="#dbe9f6"/><rect y="150" width="320" height="30" fill="#fff"/>
      <path d="M30 140 Q170 70 290 130" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>${H.arrow(272, 124, 290, 130)}
      <path d="M20 150 l20 -18 l20 18z" fill="#6c7a89"/><path d="M20 70 l20 18 l20 -18z" fill="#6c7a89" opacity=".35"/>
      <text x="160" y="25" text-anchor="middle" class="hd">Superior mirage</text><text x="160" y="43" text-anchor="middle" class="sm">snow / cold sea · inversion</text><text x="160" y="205" text-anchor="middle" class="sm">image raised above the object</text></g>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['rain-theories'] = () => `<svg viewBox="0 0 700 300">
    <g><rect x="10" y="10" width="330" height="240" rx="16" fill="var(--h0)" opacity=".5"/>
      <line x1="10" x2="340" y1="120" y2="120" stroke="var(--m-cold)" stroke-dasharray="6 4"/><text x="334" y="114" text-anchor="end" class="sm">0°C level</text>
      ${[[60, 60], [120, 80], [200, 55], [260, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="var(--m-rain)"/>`).join('')}
      <path d="M160 70 l8 -8 l8 8 l-8 8z M150 66 h36 M168 52 v36" stroke="var(--h0i)" stroke-width="2" fill="none"/>
      ${H.arrow(110, 78, 150, 70, 'var(--m-rain)', 1.5, '3 3')}${H.arrow(205, 58, 180, 66, 'var(--m-rain)', 1.5, '3 3')}
      <text x="175" y="104" text-anchor="middle" class="sm">drops evaporate → crystal grows</text>
      ${H.arrow(168, 130, 168, 200, 'var(--h0i)', 2.5)}<text x="178" y="170" class="sm">falls, melts → rain</text>
      <text x="175" y="275" text-anchor="middle" class="hd">Bergeron (cold cloud)</text><text x="175" y="292" text-anchor="middle" class="sm">SVP over ice &lt; over water</text></g>
    <g transform="translate(360 0)"><rect x="0" y="10" width="330" height="240" rx="16" fill="var(--h2)" opacity=".5"/>
      ${[[60, 50, 4], [100, 90, 4], [150, 60, 5], [200, 100, 4], [250, 70, 4], [170, 140, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--m-rain)"/>`).join('')}
      ${H.arrow(170, 150, 170, 220, 'var(--m-rain)', 2.5)}<text x="180" y="196" class="sm">big drop sweeps</text><text x="180" y="212" class="sm">up small ones</text>
      <text x="165" y="275" text-anchor="middle" class="hd">Coalescence (warm cloud)</text><text x="165" y="292" text-anchor="middle" class="sm">collision + merging; tropics. Giant salt nuclei: maritime</text></g>
  </svg>`;
  F['ice-types'] = () => `<svg viewBox="0 0 700 260">
    ${[[120, 'Hoar frost', 'clear air, deposition', 'feathery, light', 'var(--h0)', 'M60 120 l10 -14 M80 120 l-6 -16 M100 120 l8 -14 M120 120 l-6 -16 M140 120 l8 -14 M160 120 l-6 -14'],
       [350, 'Rime', 'small supercooled drops', 'white, porous, brittle', 'var(--h3)', ''],
       [580, 'Clear / glaze', 'large supercooled drops', 'glassy, heavy, sticky', 'var(--h5)', '']].map(([x, t, a, b, c], i) => `
      <path d="M${x - 90} 130 q20 -40 90 -40 q60 0 90 40 z" fill="#cfd5dd"/>
      ${i === 0 ? `<g stroke="#8fa8c8" stroke-width="2">${[0, 1, 2, 3, 4, 5].map(k => `<line x1="${x - 60 + k * 22}" y1="${100 - (k % 2) * 4}" x2="${x - 56 + k * 22}" y2="${86 - (k % 2) * 4}"/>`).join('')}</g>` : ''}
      ${i === 1 ? `<path d="M${x - 90} 130 q10 -50 90 -52 q12 0 18 4 q-60 6 -86 48z" fill="#fff" stroke="#c3cad6"/>` : ''}
      ${i === 2 ? `<path d="M${x - 90} 130 q14 -56 90 -56 q50 0 84 40 q-40 -18 -80 -18 q-60 2 -94 34z" fill="#bfe3ff" opacity=".85" stroke="#6aa7d8"/>` : ''}
      <text x="${x}" y="170" text-anchor="middle" class="hd">${t}</text><text x="${x}" y="190" text-anchor="middle" class="sm">${a}</text><text x="${x}" y="206" text-anchor="middle" class="sm">${b}</text>`).join('')}
    <text x="350" y="245" text-anchor="middle" class="lbl">Drop size decides it: small → rime · large → glaze (most dangerous)</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  const stage = (x, title, sub, cloud, arrows) => `<g transform="translate(${x} 0)">${cloud}${arrows}<text x="110" y="300" text-anchor="middle" class="hd">${title}</text><text x="110" y="318" text-anchor="middle" class="sm">${sub}</text></g>`;
  F['ts-lifecycle'] = () => `<svg viewBox="0 0 700 330">
    <line x1="0" x2="700" y1="40" y2="40" stroke="var(--h3i)" stroke-dasharray="6 5"/><text x="696" y="34" text-anchor="end" class="sm">tropopause</text>
    <line x1="0" x2="700" y1="160" y2="160" stroke="var(--m-cold)" stroke-dasharray="4 4" opacity=".6"/><text x="696" y="154" text-anchor="end" class="sm">0°C</text>
    ${H.ground(270, 700)}
    ${stage(0, '1. Cumulus', 'updraughts only', `<path d="M40 250 q-10-30 20-40 q-6-50 50-55 q50 0 52 55 q30 10 20 40z" fill="var(--m-cloud)" stroke="var(--m-cloudline)"/>`, [80, 110, 140].map(x => H.arrow(x, 262, x, 170, 'var(--m-warm)', 2.5)).join(''))}
    ${stage(235, '2. Mature', 'up + down · rain, hail, lightning · 20–40 min', H.cb(110, 250, .82), H.arrow(80, 262, 80, 80, 'var(--m-warm)', 2.5) + H.arrow(140, 90, 140, 262, 'var(--m-cold)', 2.5) + H.rain(120, 252, 50, 4) + `<path d="M140 268 q40 0 80 -6" stroke="var(--m-cold)" stroke-width="2.5" fill="none"/><text x="180" y="262" class="sm" style="fill:#fff">gust front</text><path d="M100 120 l8 14 -6 0 8 16" stroke="var(--m-sun)" stroke-width="2.5" fill="none"/>`)}
    ${stage(470, '3. Dissipating', 'downdraughts only', `<path d="M30 250 q-10-24 26-32 q-4-40 60-46 L40 60 h150 L120 100 q40 20 40 60 q30 10 20 90z" fill="#e4e8ee" stroke="var(--m-cloudline)" opacity=".85"/>`, [80, 120, 160].map(x => H.arrow(x, 120, x, 262, 'var(--m-cold)', 2.2)).join('') + H.rain(70, 252, 100, 4))}
  </svg>`;
  F['ts-hazards'] = () => `<svg viewBox="0 0 700 330">
    ${H.ground(290, 700)}${H.cb(330, 270, 1.05)}
    ${[['Turbulence: 20 km around', 120, 70], ['Hail under the anvil', 560, 60], ['Icing 0 to −30°C', 330, 22], ['Lightning +10 to −10°C', 520, 150], ['Gust front up to 100 kt', 570, 285], ['Microburst · wind shear', 150, 245], ['Altimeter over-reads below base', 120, 200]].map(([t, x, y]) => `<text x="${x}" y="${y}" text-anchor="middle" class="lbl">${t}</text>`).join('')}
    ${H.arrow(470, 98, 470, 140, 'var(--h0i)', 2, '3 3')}${H.rain(300, 275, 60, 5)}
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['cold-front'] = () => `<svg viewBox="0 0 700 300">
    <path d="M0 250 L330 250 Q300 160 220 120 Q120 70 0 60z" fill="var(--h0)" opacity=".8"/>
    <rect x="0" y="0" width="700" height="250" fill="var(--h5)" opacity=".25"/>
    <text x="80" y="200" class="hd" style="fill:var(--m-cold)">COLD air</text><text x="520" y="200" class="hd" style="fill:var(--m-warm)">WARM air</text>
    ${H.arrow(60, 230, 180, 230, 'var(--m-cold)', 3)}<text x="60" y="244" class="sm">moves 20–30+ kt</text>
    ${H.cb(355, 245, .8)}${H.rain(320, 240, 70, 5)}
    ${H.arrow(360, 240, 400, 130, 'var(--m-warm)', 2.5)}
    <path d="M330 250 l14 -10 l-2 12z M300 250 l14 -10 l-2 12z" fill="var(--m-cold)"/>
    <text x="350" y="285" text-anchor="middle" class="lbl">slope ~1:50 (ana) to 1:120 (kata) · narrow band of CB, showers, squalls · clears quickly behind</text>
    <text x="560" y="60" text-anchor="middle" class="sm">line squall may form 100–300 km ahead</text>
  </svg>`;
  F['warm-front'] = () => `<svg viewBox="0 0 700 300">
    <path d="M700 250 L80 250 Q300 200 700 70z" fill="var(--h0)" opacity=".8"/>
    <rect width="700" height="250" fill="var(--h5)" opacity=".25"/>
    <text x="40" y="150" class="hd" style="fill:var(--m-warm)">WARM air</text><text x="560" y="200" class="hd" style="fill:var(--m-cold)">COLD air</text>
    ${H.arrow(40, 230, 150, 230, 'var(--m-warm)', 3)}<text x="40" y="244" class="sm">10–15 kt</text>
    <path d="M630 70 q30 -10 60 -4" stroke="var(--m-cloudline)" stroke-width="2" fill="none"/><text x="655" y="56" text-anchor="middle" class="sm">CI · 1000 km</text>
    <rect x="470" y="96" width="140" height="10" rx="5" fill="#eef1f5" stroke="var(--m-cloudline)"/><text x="540" y="92" text-anchor="middle" class="sm">CS</text>
    <rect x="300" y="138" width="200" height="16" rx="8" fill="#dde2ea" stroke="var(--m-cloudline)"/><text x="400" y="134" text-anchor="middle" class="sm">AS · 400–500 km</text>
    <path d="M120 230 Q220 170 320 175 L320 215 Q220 215 120 240z" fill="#b6bfcc"/>${H.rain(140, 225, 170, 8)}<text x="230" y="168" text-anchor="middle" class="sm">NS · continuous rain</text>
    <rect x="320" y="226" width="110" height="16" rx="8" fill="#cfd5dd"/><text x="375" y="238" text-anchor="middle" class="sm">ST · drizzle · fog</text>
    <path d="M80 250 a10 10 0 0 1 20 0z M110 250 a10 10 0 0 1 20 0z" fill="var(--m-warm)"/>
    <text x="350" y="285" text-anchor="middle" class="lbl">slope 1:150–1:180 · cloud sequence CI → CS → AS → NS → ST · FZRA/FZFG ahead</text>
  </svg>`;
  F['occlusions'] = () => `<svg viewBox="0 0 700 260">
    <g><text x="170" y="22" text-anchor="middle" class="hd">Cold occlusion (summer)</text>
      <path d="M20 220 L170 220 Q140 150 60 120 L20 110z" fill="var(--h0)"/><text x="50" y="200" class="lbl">COLD</text>
      <path d="M170 220 L320 220 L320 180 Q250 190 200 160 Q180 190 170 220z" fill="#cfe0ff"/><text x="260" y="210" class="lbl">COOL</text>
      <path d="M60 120 Q150 60 320 100 L320 180 Q250 190 200 160 Q170 120 60 120z" fill="var(--h5)" opacity=".7"/><text x="230" y="120" class="lbl">WARM (lifted)</text></g>
    <g transform="translate(350 0)"><text x="170" y="22" text-anchor="middle" class="hd">Warm occlusion (winter)</text>
      <path d="M20 220 L160 220 Q150 190 100 160 L20 150z" fill="#cfe0ff"/><text x="40" y="205" class="lbl">COOL</text>
      <path d="M160 220 L320 220 L320 130 Q220 150 100 160 Q150 190 160 220z" fill="var(--h0)"/><text x="250" y="205" class="lbl">COLD</text>
      <path d="M20 150 L100 160 Q220 150 320 130 L320 60 Q150 60 20 100z" fill="var(--h5)" opacity=".7"/><text x="150" y="100" class="lbl">WARM (lifted)</text></g>
    <text x="350" y="250" text-anchor="middle" class="sm">The colder of the two cold air masses always ends up underneath.</text>
  </svg>`;
  F['wd-track'] = () => `<svg viewBox="0 0 700 320">
    <rect width="700" height="320" fill="var(--h0)" opacity=".25"/>
    <path d="M400 70 Q470 60 540 90 L600 110 Q640 140 620 170 L560 200 Q520 250 470 300 Q440 250 420 200 Q380 180 360 150 Q350 110 400 70z" fill="var(--m-ground)" opacity=".85"/>
    <text x="490" y="180" text-anchor="middle" style="font:800 16px var(--head);fill:#fff">INDIA</text>
    <path d="M440 75 Q520 70 600 100" stroke="#fff" stroke-width="6" opacity=".8" fill="none"/><text x="560" y="78" class="sm">Himalaya</text>
    <ellipse cx="60" cy="70" rx="45" ry="16" fill="var(--m-sea)"/><text x="60" y="56" text-anchor="middle" class="sm">Mediterranean</text>
    <ellipse cx="190" cy="50" rx="22" ry="14" fill="var(--m-sea)"/><text x="190" y="34" text-anchor="middle" class="sm">Caspian</text>
    <ellipse cx="130" cy="30" rx="26" ry="10" fill="var(--m-sea)"/><text x="130" y="18" text-anchor="middle" class="sm">Black Sea</text>
    <path d="M70 80 Q200 90 330 110 Q390 115 430 95 Q500 80 600 110" stroke="var(--m-cold)" stroke-width="4" fill="none" stroke-dasharray="10 6" class="anim-draw" pathLength="1000"/>
    ${H.arrow(560, 100, 600, 110, 'var(--m-cold)', 4)}
    <path d="M430 100 Q480 140 560 170" stroke="var(--m-cold)" stroke-width="2.5" fill="none" stroke-dasharray="5 5"/>
    <text x="24" y="140" class="lbl">W → E, north of 20°N · 250–300 km/day</text>
    <text x="24" y="160" class="sm">5–7 a month in winter · nil in monsoon · back from October</text>
    <text x="24" y="180" class="sm">arrive occluded · worst along the foothills</text>
    <text x="24" y="200" class="sm">after passage: fog and cold wave over N India</text>
    <text x="440" y="262" class="sm">induced low forms to the SOUTH</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['jet-section'] = () => {
    const cx = 330, cy = 120;
    const iso = [140, 115, 90, 65].map((r, i) => `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.6}" ry="${r * .55}" fill="var(--h${[0, 3, 2, 5][i]})" opacity="${.35 + i * .15}" stroke="var(--h${[0, 3, 2, 5][i]}i)"/>`).join('');
    return `<svg viewBox="0 0 700 300">
      ${iso}<circle cx="${cx}" cy="${cy}" r="8" fill="var(--ink)"/><text x="${cx}" y="${cy - 14}" text-anchor="middle" class="hd">core ≥ 60 kt</text>
      ${[60, 80, 100, 120].map((v, i) => `<text x="${cx + (140 - i * 25) * 1.6 - 4}" y="${cy + 4}" text-anchor="end" class="sm">${v} kt</text>`).join('')}
      <path d="M40 60 L250 70 L330 90 L480 105 L660 100" stroke="var(--h3i)" stroke-width="2.5" stroke-dasharray="7 5" fill="none"/><text x="660" y="94" text-anchor="end" class="sm">tropopause</text>
      <text x="80" y="240" class="hd" style="fill:var(--m-cold)">COLD side (N, low pressure)</text><text x="620" y="240" text-anchor="end" class="hd" style="fill:var(--m-warm)">WARM side (S)</text>
      <path d="M150 160 q60 30 130 20" fill="none" stroke="var(--warn)" stroke-width="3" stroke-dasharray="4 3"/><text x="150" y="196" class="lbl" style="fill:var(--warn)">worst CAT: below axis, cold side</text>
      <path d="M380 70 q100 -20 220 0" stroke="#d8dde6" stroke-width="14" fill="none" stroke-linecap="round"/><text x="490" y="52" text-anchor="middle" class="sm">cirrus sheet / streaks on the warm side</text>
      <text x="350" y="280" text-anchor="middle" class="sm">Cross-section looking downstream (NH): flow is into the page. Shear ≈ 5 m/s per km vertically.</text>
    </svg>`;
  };
  F['jets-india'] = () => `<svg viewBox="0 0 700 300">
    <rect width="700" height="300" fill="var(--h0)" opacity=".2"/>
    <path d="M330 60 Q400 50 470 80 L530 100 Q570 130 550 160 L490 190 Q450 240 400 290 Q370 240 350 190 Q310 170 290 140 Q280 100 330 60z" fill="var(--m-ground)" opacity=".8"/>
    <path d="M20 95 Q200 80 360 100 Q520 120 690 90" stroke="var(--m-warm)" stroke-width="6" fill="none"/>${H.arrow(640, 95, 690, 90, 'var(--m-warm)', 4)}
    <text x="40" y="78" class="hd" style="fill:var(--m-warm)">STJ · westerly · ~27°N (22°N Feb) · ~12 km · Oct–May</text>
    <path d="M690 200 Q520 190 380 205 Q200 220 20 205" stroke="var(--m-cold)" stroke-width="6" fill="none"/>${H.arrow(70, 207, 20, 205, 'var(--m-cold)', 4)}
    <text x="690" y="232" text-anchor="end" class="hd" style="fill:var(--m-cold)">TEJ · easterly · ~13°N · 15–16 km · Jun–Aug</text>
    <path d="M60 280 Q200 260 330 230" stroke="var(--h1i)" stroke-width="3.5" stroke-dasharray="8 5" fill="none"/>${H.arrow(300, 238, 330, 230, 'var(--h1i)', 3)}
    <text x="40" y="294" class="sm">Low-level (Somali) jet 1–3 km in the SW monsoon</text>
  </svg>`;
  F['mountain-wave'] = () => `<svg viewBox="0 0 700 300">
    <rect width="700" height="300" fill="var(--m-sky)" opacity=".3"/>
    <path d="M0 270 L120 270 L200 150 L280 270 L700 270 L700 300 L0 300z" fill="var(--m-ground)"/>
    ${H.arrow(10, 130, 120, 130, 'var(--ink)', 3)}<text x="10" y="120" class="sm">wind within 30° of ⊥, increasing with height</text>
    ${[90, 130, 170].map((y, i) => `<path d="M0 ${y + 40} Q160 ${y + 40 - 10 * (3 - i)} 200 ${y - 10} Q260 ${y + 60} 330 ${y + 30} Q400 ${y - 20} 470 ${y + 30} Q540 ${y + 70} 610 ${y + 30} Q660 ${y} 700 ${y + 20}" fill="none" stroke="var(--h0i)" stroke-width="1.6" opacity=".7"/>`).join('')}
    <path d="M170 150 q30 -26 60 0" fill="#fff" stroke="var(--m-cloudline)"/><text x="200" y="136" text-anchor="middle" class="sm">cap cloud</text>
    <path d="M225 160 q30 40 30 100" stroke="#fff" stroke-width="10" fill="none" opacity=".8"/><text x="250" y="200" class="sm">Föhn wall</text>
    ${[400, 610].map(x => `<ellipse cx="${x}" cy="85" rx="60" ry="10" fill="#fff" stroke="var(--m-cloudline)"/>`).join('')}<text x="400" y="66" text-anchor="middle" class="lbl">lenticular (wave crest)</text>
    <g class="anim-spin" style="transform-origin:400px 215px"><circle cx="400" cy="215" r="24" fill="#e8ebf0" stroke="var(--m-cloudline)" stroke-width="2"/><path d="M380 215 a20 20 0 0 1 40 0" fill="none" stroke="var(--warn)" stroke-width="2.5"/></g>
    <text x="400" y="258" text-anchor="middle" class="lbl" style="fill:var(--warn)">rotor: worst turbulence (2–4 g, 7 g seen)</text>
    <text x="330" y="292" text-anchor="middle" style="font:700 11.5px var(--font);fill:#fff">waves extend 100–200 km downwind · wavelength ≈ 10 km · stable layer at ridge level</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['cyclone-plan'] = () => {
    const cx = 330, cy = 160;
    let bands = '';
    for (let k = 0; k < 4; k++) { let d = ''; for (let t = 0; t < 7; t += 0.1) { const r = 30 + t * 20; const a = t + k * Math.PI / 2; d += (t ? 'L' : 'M') + (cx + r * Math.cos(a)) + ',' + (cy + r * Math.sin(a) * .8); } bands += `<path d="${d}" fill="none" stroke="#c8d0dc" stroke-width="${10 - k}" opacity=".85"/>`; }
    return `<svg viewBox="0 0 700 330">
      <rect width="700" height="330" fill="var(--m-sea)" opacity=".18"/>
      <g class="anim-spin" style="transform-origin:${cx}px ${cy}px;animation-direction:reverse;animation-duration:20s">${bands}</g>
      <circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="#9aa6b8" stroke-width="20" opacity=".9"/>
      <circle cx="${cx}" cy="${cy}" r="22" fill="var(--m-sky)" stroke="var(--ink)" stroke-width="1.5"/>
      <text x="${cx}" y="${cy + 4}" text-anchor="middle" class="sm">eye</text>
      <path d="M${cx} ${cy} L${cx + 160} ${cy - 120} A200 160 0 0 1 ${cx + 200} ${cy}z" fill="var(--warn)" opacity=".15"/>
      <text x="${cx + 120}" y="${cy - 80}" class="lbl" style="fill:var(--warn)">worst: right-forward (NH)</text>
      ${H.arrow(cx, cy - 10, cx - 60, cy - 120, 'var(--ink)', 2.5)}<text x="${cx - 120}" y="${cy - 128}" class="sm">track W/NW, recurves NE near 25°</text>
      <text x="20" y="40" class="hd">Eye 30–65 km</text><text x="20" y="58" class="sm">calm, clear, warm core, lowest pressure</text>
      <text x="20" y="90" class="hd">Eye wall 50–150 km</text><text x="20" y="108" class="sm">CB wall, &gt; 64 kt, most dangerous</text>
      <text x="20" y="140" class="hd">Outer area to ~400 km</text><text x="20" y="158" class="sm">gales ≥ 34 kt, spiral rain bands</text>
      <text x="520" y="250" class="sm">needs SST &gt; 26°C (60 m deep)</text><text x="520" y="266" class="sm">5–25° latitude, low shear</text><text x="520" y="282" class="sm">moves 300–500 km/day</text>
      <text x="20" y="300" class="sm">NH: anticlockwise inflow</text>
    </svg>`;
  };
  F['monsoon-depression'] = () => `<svg viewBox="0 0 700 300">
    <rect width="700" height="300" fill="var(--h0)" opacity=".2"/>
    ${[160, 120, 80, 45].map((r, i) => `<ellipse cx="330" cy="140" rx="${r}" ry="${r * .6}" fill="none" stroke="var(--m-cold)" stroke-width="1.5"/>`).join('')}
    <text x="330" y="146" text-anchor="middle" style="font:800 22px var(--head);fill:var(--m-cold)">D</text>
    <path d="M330 140 L170 260 A200 120 0 0 1 220 200z" fill="var(--m-rain)" opacity=".35"/>
    <path d="M150 230 L330 140 L260 270z" fill="var(--m-rain)" opacity=".3"/>
    <text x="150" y="285" class="lbl" style="fill:var(--h0i)">SW sector: heavy steady rain (≈400 km belt)</text>
    <text x="500" y="54" class="sm">NE sector: rain shifts</text><text x="500" y="70" class="sm">here at recurvature</text>
    ${H.arrow(330, 120, 280, 40, 'var(--ink)', 2.5)}<text x="200" y="34" class="sm">moves NW inland from the head Bay</text>
    <text x="500" y="200" class="sm">life 3–5 days · winds 17–33 kt</text><text x="500" y="216" class="sm">slopes SW with height</text><text x="500" y="232" class="sm">(to 300 hPa)</text>
  </svg>`;
  F['itcz'] = () => `<svg viewBox="0 0 700 260">
    <rect width="700" height="260" fill="var(--m-sea)" opacity=".15"/>
    <line x1="0" x2="700" y1="130" y2="130" stroke="var(--ink)" stroke-dasharray="4 4"/><text x="8" y="124" class="sm">equator</text>
    <line x1="0" x2="700" y1="70" y2="70" stroke="var(--wire)" stroke-dasharray="2 4"/><text x="8" y="64" class="sm">20°N</text>
    <path d="M0 80 Q120 60 240 75 Q360 95 480 70 Q600 55 700 85" stroke="var(--m-warm)" stroke-width="4" fill="none"/><text x="690" y="48" text-anchor="end" class="lbl" style="fill:var(--m-warm)">July: up to ~20°N</text>
    <path d="M0 175 Q140 190 260 170 Q400 160 520 200 Q620 215 700 195" stroke="var(--m-cold)" stroke-width="4" fill="none"/><text x="690" y="235" text-anchor="end" class="lbl" style="fill:var(--m-cold)">January: south of the equator</text>
    ${[100, 300, 500].map(x => H.arrow(x, 30, x + 30, 60, 'var(--ink)', 1.8) + H.arrow(x + 40, 240, x + 70, 205, 'var(--ink)', 1.8)).join('')}
    <text x="350" y="20" text-anchor="middle" class="sm">NE trades</text><text x="380" y="255" text-anchor="middle" class="sm">SE trades</text>
    ${H.cb(330, 125, .28)}${H.cb(150, 120, .22)}
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  const india = `<path d="M300 40 Q380 30 450 60 L520 80 Q560 110 540 140 L480 170 Q440 220 390 280 Q360 220 340 170 Q300 150 280 120 Q270 80 300 40z" fill="var(--m-ground)" opacity=".75"/>`;
  F['monsoon-onset'] = () => `<svg viewBox="0 0 700 320">
    <rect width="700" height="320" fill="var(--m-sea)" opacity=".18"/>${india}
    ${[[392, 262, '1 Jun · Kerala'], [330, 175, '15 Jun · Mumbai'], [380, 80, '1 Jul · Delhi'], [300, 50, '8 Jul · whole country'], [560, 238, '~20 May · Andaman']].map(([x, y, t]) => `<circle cx="${x}" cy="${y}" r="6" fill="var(--warn)"/><text x="${x > 500 ? x - 10 : x + 10}" y="${y + 4}" text-anchor="${x > 500 ? 'end' : 'start'}" class="lbl">${t}</text>`).join('')}
    ${H.arrow(200, 300, 360, 250, 'var(--h0i)', 4)}<text x="60" y="300" class="lbl" style="fill:var(--h0i)">Arabian Sea branch</text>
    ${H.arrow(620, 300, 520, 160, 'var(--h3i)', 4)}<text x="600" y="296" class="lbl" style="fill:var(--h3i)">Bay branch</text>
    <path d="M300 75 Q380 85 470 120" stroke="var(--m-cold)" stroke-width="3" stroke-dasharray="8 6" fill="none"/><text x="470" y="112" class="sm" style="fill:var(--m-cold)">monsoon trough</text>
    <text x="20" y="30" class="sm">Withdrawal: Rajasthan 1 Sep → NW India 15 Sep → most of India by 15 Oct</text>
  </svg>`;
  F['break-monsoon'] = () => `<svg viewBox="0 0 700 276">
    <g>${india.replace('opacity=".75"', 'opacity=".75" transform="translate(-180 -20) scale(.9)"')}<path d="M110 70 Q190 75 270 100" stroke="var(--m-cold)" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
      <text x="40" y="240" class="hd">Active monsoon</text><text x="40" y="256" class="sm">trough over the Gangetic plains</text><text x="40" y="272" class="sm">→ rain over most of India</text>${H.rain(120, 110, 140, 7)}</g>
    <g transform="translate(350 0)">${india.replace('opacity=".75"', 'opacity=".75" transform="translate(-180 -20) scale(.9)'+'"')}<path d="M100 40 Q190 30 280 60" stroke="var(--m-cold)" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
      <text x="40" y="240" class="hd">Break monsoon</text><text x="40" y="256" class="sm">trough on the foothills · pressure rises</text><text x="40" y="272" class="sm">→ rain only on the foothills</text>${H.rain(150, 52, 110, 6)}</g>
  </svg>`;
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['three-cells'] = () => {
    const Y = lat => 300 - lat * 3.0;
    const cell = (l0, l1, dir, hue, name) => { const y0 = Y(l1), y1 = Y(l0), my = (y0 + y1) / 2; return `<ellipse cx="420" cy="${my}" rx="200" ry="${(y1 - y0) / 2 - 6}" fill="var(--h${hue})" opacity=".45" stroke="var(--h${hue}i)" stroke-width="2"/>
      <path d="M560 ${dir > 0 ? y1 - 12 : y0 + 12} L280 ${dir > 0 ? y1 - 12 : y0 + 12}" stroke="var(--h${hue}i)" stroke-width="0"/>
      <text x="420" y="${my + 5}" text-anchor="middle" class="hd">${name}</text>`; };
    return `<svg viewBox="0 0 700 330">
      ${cell(0, 30, 1, 2, 'Hadley cell')}${cell(30, 60, -1, 1, 'Ferrel cell')}${cell(60, 90, 1, 0, 'Polar cell')}
      ${[[0, 'Equatorial LOW · ITCZ · doldrums', 'var(--m-warm)'], [30, 'Subtropical HIGH · horse latitudes · deserts', 'var(--m-cold)'], [60, 'Temperate LOW · polar front', 'var(--m-warm)'], [90, 'Polar HIGH', 'var(--m-cold)']].map(([l, t, c]) => `<line x1="10" x2="215" y1="${Y(l)}" y2="${Y(l)}" stroke="${c}" stroke-width="2.5"/><text x="12" y="${Y(l) - 6}" style="font:700 11.5px var(--font);fill:${c}">${l}° ${t}</text>`).join('')}
      <text x="12" y="${Y(15) + 4}" class="lbl">↙ NE trades (surface)</text><text x="12" y="${Y(45) + 4}" class="lbl">↗ westerlies (surface)</text><text x="12" y="${Y(75) + 4}" class="lbl">↙ polar easterlies</text>
      ${H.arrow(330, Y(2), 330, Y(28), 'var(--m-warm)', 2.5)}<text x="300" y="${Y(14)}" text-anchor="end" class="sm">rising</text>
      ${H.arrow(520, Y(29), 520, Y(3), 'var(--m-cold)', 2.5)}<text x="530" y="${Y(14)}" class="sm">sinking at 30°</text>
      <text x="640" y="${Y(31) - 4}" text-anchor="end" class="sm" style="fill:var(--m-warm)">STJ aloft</text><text x="640" y="${Y(61) - 4}" text-anchor="end" class="sm" style="fill:var(--m-cold)">PFJ aloft</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['sat-orbits'] = () => `<svg viewBox="0 0 700 330">
    <circle cx="350" cy="170" r="70" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
    <line x1="270" x2="430" y1="170" y2="170" stroke="var(--h0i)" stroke-dasharray="4 4"/><text x="350" y="166" text-anchor="middle" class="sm">equator</text>
    <ellipse cx="350" cy="170" rx="250" ry="40" fill="none" stroke="var(--m-warm)" stroke-width="2.5" stroke-dasharray="7 5"/>
    <rect x="588" y="160" width="22" height="20" rx="3" fill="var(--m-warm)"/><text x="610" y="205" text-anchor="middle" style="font:700 12px var(--font);fill:var(--m-warm)">Geostationary</text>
    <text x="610" y="222" text-anchor="middle" class="sm">~36 000 km over equator</text><text x="610" y="238" text-anchor="middle" class="sm">INSAT · METEOSAT · GOES</text>
    <ellipse cx="350" cy="170" rx="38" ry="105" fill="none" stroke="var(--m-cold)" stroke-width="2.5"/>
    <rect x="339" y="56" width="22" height="20" rx="3" fill="var(--m-cold)"/><text x="375" y="50" style="font:700 12px var(--font);fill:var(--m-cold)">Polar orbiting</text>
    <text x="375" y="36" class="sm">650–1500 km · NOAA</text>
    <text x="20" y="300" class="sm">Polar: whole earth twice a day. Geostationary: fixed spot; 5 cover the globe.</text>
  </svg>`;
  F['airborne-radar'] = () => {
    const c = [['#3aa655', 'Green', '1–4 mm/h · light', 230], ['#e3b416', 'Yellow', '4–12 mm/h · avoid', 170], ['#d93a2b', 'Red', '> 12 mm/h · always avoid', 110], ['#b0168f', 'Magenta', 'TS, hail, severe turb', 60]];
    return `<svg viewBox="0 0 780 300">
      <path d="M350 280 L109 140 A280 280 0 0 1 591 140 Z" fill="var(--panel)" stroke="var(--line)" stroke-width="2"/>
      ${c.map(([col, n], i) => `<ellipse cx="${350 + (i - 1.5) * 18}" cy="${150 - i * 4}" rx="${70 - i * 15}" ry="${44 - i * 9}" fill="${col}" opacity=".85"/>`).join('')}
      ${H.plane(350, 262, 0.9, -90)}
      <text x="350" y="296" text-anchor="middle" class="sm">±70° either side of heading · beam ~3° · X-band (3 cm)</text>
      ${c.map(([col, n, t], i) => `<rect x="610" y="${40 + i * 34}" width="18" height="18" rx="4" fill="${col}"/><text x="634" y="${54 + i * 34}" style="font:700 13.5px var(--font);fill:var(--ink)">${n}</text><text x="634" y="${68 + i * 34}" class="sm">${t}</text>`).join('')}
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  /* station model plot: o = {dir, kt, N(octas), TT, VV, ww, TdTd, PPP, P24, CL, CM, CH, NhH, W, RRR, ship:{dir,v}} */
  const sm = (o, cx = 350, cy = 165) => {
    const r = 20, t = (x, y, s, a = 'middle', sz = 22) => `<text x="${x}" y="${y}" text-anchor="${a}" style="font:600 ${sz}px var(--mono, monospace);fill:var(--ink)">${s}</text>`;
    const rad = (o.dir - 90) * Math.PI / 180, L = 95;
    const x0 = cx + r * Math.cos(rad), y0 = cy + r * Math.sin(rad), x1 = cx + (r + L) * Math.cos(rad), y1 = cy + (r + L) * Math.sin(rad);
    let barbs = '', k = o.kt, i = 0;
    const px = Math.cos(rad + Math.PI / 2), py = Math.sin(rad + Math.PI / 2);
    while (k >= 8) { const bx = x1 - i * 12 * Math.cos(rad), by = y1 - i * 12 * Math.sin(rad); barbs += `<line x1="${bx}" y1="${by}" x2="${bx + 30 * px + 10 * Math.cos(rad)}" y2="${by + 30 * py + 10 * Math.sin(rad)}" stroke="var(--ink)" stroke-width="2.5"/>`; k -= 10; i++; }
    if (k >= 3) { const bx = x1 - i * 12 * Math.cos(rad), by = y1 - i * 12 * Math.sin(rad); barbs += `<line x1="${bx}" y1="${by}" x2="${bx + 15 * px + 5 * Math.cos(rad)}" y2="${by + 15 * py + 5 * Math.sin(rad)}" stroke="var(--ink)" stroke-width="2.5"/>`; }
    const fill = o.N >= 8 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--ink)"/>` : o.N > 0 ? `<path d="M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 ${o.N > 4 ? 1 : 0} 1 ${cx + r * Math.sin(o.N / 8 * 2 * Math.PI)} ${cy - r * Math.cos(o.N / 8 * 2 * Math.PI)} Z" fill="var(--ink)"/>` : '';
    return `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="var(--ink)" stroke-width="2.5"/>${barbs}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--panel)" stroke="var(--ink)" stroke-width="2.5"/>${fill}
      ${o.CH ? `<g transform="translate(${cx + 20},${cy - 95})">${o.CH}</g>` : ''}${o.CM ? `<g transform="translate(${cx + 20},${cy - 55})">${o.CM}</g>` : ''}${o.CL ? `<g transform="translate(${cx},${cy + 48})">${o.CL}</g>` : ''}
      ${t(cx - 70, cy - 32, o.TT, 'end')}${t(cx - 70, cy + 8, o.VV + ' ' + (o.ww || ''), 'end')}${t(cx - 70, cy + 50, o.TdTd, 'end')}
      ${t(cx + 70, cy - 32, o.PPP, 'start')}${t(cx + 70, cy + 8, o.P24 || '', 'start')}${t(cx + 70, cy + 50, o.W || '', 'start')}
      ${o.NhH ? t(cx, cy + 82, o.NhH) : ''}${o.RRR ? t(cx + 70, cy + 82, o.RRR, 'start') : ''}
      ${o.ship ? `<g transform="translate(${cx + 130},${cy + 70}) rotate(${o.ship.dir - 90})"><line x1="-30" y1="0" x2="30" y2="0" stroke="var(--ink)" stroke-width="2.2"/><path d="M30 0 l-10 -6 v12z" fill="var(--ink)"/></g>${t(cx + 160, cy + 52, o.ship.v, 'start', 18)}` : ''}`;
  };
  const CI = '<path d="M0 0 v-14 M0 0 h34 q8 0 8 -10" fill="none" stroke="var(--ink)" stroke-width="2.4"/>';
  const ASNS = '<path d="M0 0 l12 -16 M14 0 l12 -16 M0 0 h40" fill="none" stroke="var(--ink)" stroke-width="2.4"/>';
  const AC = '<text x="0" y="0" style="font:600 26px serif;fill:var(--ink)">ω</text>';
  const FS = '<path d="M-24 0 h14 M-6 0 h12 M10 0 h14" stroke="var(--ink)" stroke-width="2.4"/>';
  F['station-model-ex'] = () => `<svg viewBox="0 0 700 300">${sm({ dir: 330, kt: 15, N: 8, TT: '34', VV: '93', ww: '≡', TdTd: '27', PPP: '998', P24: '15', W: '≡', CL: FS, CM: ASNS, CH: CI, NhH: '3 / 2' })}
    <text x="20" y="272" class="sm">330/15 kt · T 34 · vis 500–<1000 m in fog · Td 27 · QFF 999.8 · 24-h change 1.5</text><text x="20" y="290" class="sm">CI · AS/NS · fracto-stratus 3/8, base 100–199 m · past weather fog</text></svg>`;
  F['station-model-q'] = () => `<svg viewBox="0 0 700 300">${sm({ dir: 315, kt: 20, N: 0, TT: '34', VV: '95', ww: '•]', TdTd: '30', PPP: '962', P24: '−14', W: '•', CL: FS, CM: AC, CH: CI, NhH: '3 / 2', RRR: '2', ship: { dir: 45, v: '5' } })}</svg>`;
  F['station-model-layout'] = () => {
    const t = (x, y, s, a = 'middle') => `<text x="${x}" y="${y}" text-anchor="${a}" style="font:700 18px var(--font);fill:var(--ink)">${s}</text>`;
    const tip = (x, y, s, a) => `<text x="${x}" y="${y}" text-anchor="${a}" class="sm">${s}</text>`;
    return `<svg viewBox="0 0 700 330">
      <line x1="336" y1="150" x2="290" y2="60" stroke="var(--ink)" stroke-width="2.5"/><line x1="290" y1="60" x2="318" y2="46" stroke="var(--ink)" stroke-width="2.5"/>
      <circle cx="350" cy="165" r="22" fill="var(--panel)" stroke="var(--ink)" stroke-width="2.5"/>${t(350, 171, 'N')}
      ${t(370, 72, 'C<tspan font-size="12">H</tspan>')}${t(370, 118, 'C<tspan font-size="12">M</tspan>')}${t(350, 225, 'C<tspan font-size="12">L</tspan>')}
      ${t(250, 118, 'TT', 'end')}${t(250, 171, 'VV ww', 'end')}${t(250, 225, 'T<tspan font-size="12">d</tspan>T<tspan font-size="12">d</tspan>', 'end')}
      ${t(440, 118, 'PPP', 'start')}${t(440, 171, 'P<tspan font-size="12">24</tspan>P<tspan font-size="12">24</tspan>', 'start')}${t(440, 225, 'W<tspan font-size="12">1</tspan>W<tspan font-size="12">2</tspan>', 'start')}
      ${t(350, 270, 'N<tspan font-size="12">h</tspan> / h')}${t(440, 270, 'RRR', 'start')}
      ${tip(150, 112, 'temperature °C', 'end')}${tip(176, 158, 'visibility code', 'end')}${tip(176, 174, 'present weather', 'end')}${tip(150, 219, 'dew point °C', 'end')}
      ${tip(530, 112, 'QFF (last 3 digits, tenths)', 'start')}${tip(530, 165, '24-h pressure change', 'start')}${tip(530, 219, 'past weather', 'start')}
      ${tip(400, 66, 'high cloud type', 'start')}${tip(382, 140, 'medium cloud type', 'start')}${tip(350, 290, 'low/medium cloud amount / base code', 'middle')}${tip(530, 264, 'rain since 03 UTC (code)', 'start')}
      ${tip(276, 36, 'wind: shaft from direction;', 'end')}${tip(276, 52, 'full barb 10 kt, half 5', 'end')}
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  /* a coded message shown as a wrapped monospace block */
  const msg = (lines, h) => `<svg viewBox="0 0 700 ${h || 30 + lines.length * 30}"><rect x="2" y="2" width="696" height="${(h || 30 + lines.length * 30) - 4}" rx="12" fill="var(--panel)" stroke="var(--line)" stroke-width="2"/>
    ${lines.map((l, i) => `<text x="18" y="${36 + i * 30}" style="font:700 19px var(--mono, ui-monospace, monospace);fill:var(--ink)">${l}</text>`).join('')}</svg>`;
  F['metar-q25'] = () => msg(['METAR VIDP 160230Z 30005KT 290V050 1500S 5000N', 'R15/P1500U BR FEW020 FEW025CB SCT120 BKN300', '32/29 Q1003 REFG TEMPO FM0330 22015G25KT 3000', '+TSRA FEW010 SCT025CB BKN150 BECMG AT0415', '27008KT CAVOK=']);
  F.msg = msg;
})();
(function () {
  const F = G.FIGS;
  F['taf-q26'] = () => F.msg(['TAF VILK 241800Z 2500/2509 09008KT 0800 FG', 'BECMG 2504/2505 09015KT 6000 SCT008 BKN120', 'TEMPO 2506/2508 12015G30KT 3000 TSRA FEW012', 'FEW025CB BKN100 BECMG AT 25/0800 09010KT', '7000 FEW030 SCT120 BKN280 =']);
  F['rofor-q26'] = () => F.msg(['ROFOR 010000Z 010610 KT VECC VILK 2SC030', '2CB030 3AC100 2CI300 7///170 621800 541501', '405022 28015 407010 28020 410005 29030', '420M05 27045 440M41 27105', '11111 12870 380120 22222 36140 2825=']);
})();
(function () {
  const F = G.FIGS;
  /* RAREP echo plot: radar at centre, echo polygon from bearing/range points */
  F['rarep-plot'] = () => {
    const cx = 260, cy = 175, k = 2.1; const P = (b, r) => [cx + r * k * Math.sin(b * Math.PI / 180), cy - r * k * Math.cos(b * Math.PI / 180)];
    const pts = [[270, 50], [300, 60], [350, 25], [280, 10]].map(([b, r]) => P(b, r));
    const tops = [[270, 9, 50], [340, 10, 60], [280, 12, 10]];
    return `<svg viewBox="0 0 700 350">
      ${[25, 50, 75].map(r => `<circle cx="${cx}" cy="${cy}" r="${r * k}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/><text x="${cx + 4}" y="${cy - r * k - 3}" class="sm">${r} km</text>`).join('')}
      <line x1="${cx}" y1="${cy - 165}" x2="${cx}" y2="${cy + 165}" stroke="var(--line)"/><line x1="${cx - 165}" y1="${cy}" x2="${cx + 165}" y2="${cy}" stroke="var(--line)"/><text x="${cx - 16}" y="${cy - 140}" class="lbl">N</text>
      <polygon class="anim-draw" pathLength="1000" points="${pts.map(p => p.join(',')).join(' ')}" fill="#3aa655" fill-opacity=".35" stroke="#2c8a45" stroke-width="2.5"/>
      ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#2c8a45"/><text x="${p[0] - 6}" y="${p[1] - 8}" text-anchor="end" class="sm">${['270/050', '300/060', '350/025', '280/010'][i]}</text>`).join('')}
      ${G.FH.arrow(cx - 70, cy - 30, cx - 70 + 45 * Math.sin(150 * Math.PI / 180), cy - 30 - 45 * Math.cos(150 * Math.PI / 180), 'var(--warn)', 2.5)}<text x="${cx + 30}" y="${cy + 120}" style="font:700 12px var(--font);fill:var(--warn)">1525: moving towards 150° at 25 km/h</text>
      <circle cx="${cx}" cy="${cy}" r="6" fill="var(--ink)"/><text x="${cx + 8}" y="${cy + 16}" class="sm">radar (Palam 42375)</text>
      <text x="470" y="60" class="hd">RAREP 42375 15030</text>
      <text x="470" y="84" class="lbl">SLD = solid echo area</text><text x="470" y="104" class="lbl">INCG = increasing</text>
      <text x="470" y="134" class="lbl">ALTD tops (km AMSL):</text>
      ${tops.map(([b, h, r], i) => `<text x="480" y="${156 + i * 20}" class="sm">${b}° at ${r} km → top ${h} km</text>`).join('')}
      <text x="470" y="236" class="sm">Points anticlockwise; area starts at</text><text x="470" y="252" class="sm">the northernmost point; range in km.</text>
    </svg>`;
  };
  /* Met T-4 style cross-section */
  F['t4-section'] = () => {
    const Y = fl => 300 - fl * 0.65, H = G.FH;
    return `<svg viewBox="0 0 700 345">
      ${[50, 100, 180, 300, 400].map(fl => `<line x1="70" x2="660" y1="${Y(fl)}" y2="${Y(fl)}" stroke="var(--line)" stroke-dasharray="3 5"/><text x="62" y="${Y(fl) + 4}" text-anchor="end" class="sm">FL${fl}</text>`).join('')}
      <rect x="70" y="${Y(0)}" width="590" height="10" fill="var(--m-ground)"/>
      <text x="80" y="336" class="hd">VECC</text><text x="650" y="336" text-anchor="end" class="hd">VIDP</text>
      <path d="M90 ${Y(340)} q60 -18 120 0 q60 -16 120 0 q80 -18 160 0 q60 -14 150 0" fill="none" stroke="var(--m-cloudline)" stroke-width="3" stroke-dasharray="14 6"/><text x="360" y="${Y(355)}" text-anchor="middle" class="lbl">CI</text>
      <rect x="110" y="${Y(180)}" width="440" height="${Y(110) - Y(180)}" rx="18" fill="var(--m-cloud)" stroke="var(--m-cloudline)"/><text x="190" y="${(Y(180) + Y(110)) / 2 + 4}" text-anchor="middle" class="lbl">AS</text>
      ${H.cloud(170, Y(30), .9)}${H.cloud(470, Y(30), .9)}<text x="170" y="${Y(30) + 4}" text-anchor="middle" class="sm">SC</text><text x="470" y="${Y(30) + 4}" text-anchor="middle" class="sm">SC</text>
      ${H.cb(330, Y(5), .55)}<text x="330" y="${Y(5) - 6}" text-anchor="middle" class="sm">CB</text>
      <path d="M560 ${Y(8)} h70" stroke="var(--m-cloudline)" stroke-width="6" stroke-linecap="round"/><text x="595" y="${Y(8) - 8}" text-anchor="middle" class="sm">ST</text>
      <text x="660" y="${Y(400) - 10}" text-anchor="end" class="sm">heights in flight levels · winds/temps tabled at FL100–400 at each end</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  /* scales of atmospheric motion on a log size axis */
  F['met-scales'] = () => {
    const X = km => 60 + (Math.log10(km) + 1) * 105; // 0.1 km .. 10^4 km
    const band = (a, b, y, h, hue, t, sub) => `<rect class="anim-pop" x="${X(a)}" y="${y}" width="${X(b) - X(a)}" height="${h}" rx="12" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="1.5"/><text x="${(X(a) + X(b)) / 2}" y="${y + 20}" text-anchor="middle" class="hd" style="font-size:14px">${t}</text><text x="${(X(a) + X(b)) / 2}" y="${y + 38}" text-anchor="middle" class="sm">${sub}</text>`;
    return `<svg viewBox="0 0 700 300">
      ${[0.1, 1, 10, 100, 1000, 10000].map(k => `<line x1="${X(k)}" x2="${X(k)}" y1="40" y2="262" stroke="var(--line)" stroke-dasharray="3 5"/><text x="${X(k)}" y="282" text-anchor="middle" class="sm">${k >= 1 ? k.toLocaleString() : k} km</text>`).join('')}
      ${band(0.1, 1, 50, 46, 0, 'Micro', '≤ 10 min · gusts')}
      ${band(5, 500, 104, 46, 1, 'Meso', '≤ 1 day · TS, squall line, sea breeze')}
      ${band(500, 3000, 158, 46, 3, 'Synoptic', '~1 day+ · lows, fronts, jets')}
      ${band(3000, 10000, 212, 46, 4, 'Planetary', '≥ 5 days · ENSO, ITCZ')}
    </svg>`;
  };
  /* iso-lines: one panel per family */
  F['iso-lines'] = () => {
    const items = [['Isobar', 'pressure'], ['Isotherm', 'temperature'], ['Isotach', 'wind SPEED'], ['Isogon', 'wind DIRECTION'], ['Isohyet', 'rainfall'], ['Isallobar', 'pressure CHANGE'], ['Isopycnic', 'density'], ['Isohel', 'sunshine (Helios)'], ['Isohypse / contour', 'height'], ['Isopleth', 'any quantity'], ['Isomer', '% of yearly rain'], ['Streamline', 'along the wind']];
    return `<svg viewBox="0 0 700 300">${items.map(([n, m], i) => { const x = 10 + (i % 4) * 172, y = 10 + Math.floor(i / 4) * 96; return `<g class="anim-pop" style="animation-delay:${i * 60}ms"><rect x="${x}" y="${y}" width="164" height="86" rx="12" fill="var(--h${i % 6})" stroke="var(--h${i % 6}i)"/><path d="M${x + 12} ${y + 64} q30 -22 60 0 t60 0 t30 -6" fill="none" stroke="var(--h${i % 6}i)" stroke-width="2.4"/><text x="${x + 12}" y="${y + 24}" class="hd" style="font-size:14px">${n}</text><text x="${x + 12}" y="${y + 42}" class="sm">constant ${m}</text></g>`; }).join('')}</svg>`;
  };
})();
