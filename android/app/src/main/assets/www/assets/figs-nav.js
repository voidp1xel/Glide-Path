/* Air Navigation figures. */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  F['earth-orbit'] = () => {
    const cx = 350, cy = 165, rx = 250, ry = 105, fx = 40; // sun offset towards perihelion (left)
    const pos = (a) => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    const earth = (a, lab, sub, tilt) => { const [x, y] = pos(a); return `<g><circle cx="${x}" cy="${y}" r="15" fill="var(--m-sea,#7fb4d8)" stroke="var(--ink)" stroke-width="1.5"/><line x1="${x - 22 * Math.sin(-0.41)}" y1="${y - 22 * Math.cos(-0.41)}" x2="${x + 22 * Math.sin(-0.41)}" y2="${y + 22 * Math.cos(-0.41)}" stroke="var(--ink)" stroke-width="2"/><text x="${x}" y="${y + (y > cy ? 36 : -24)}" text-anchor="middle" class="hd" style="font-size:13px">${lab}</text><text x="${x}" y="${y + (y > cy ? 52 : -40) }" text-anchor="middle" class="sm">${sub}</text></g>`; };
    return `<svg viewBox="0 0 700 360">
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="6 5"/>
      ${H.sun(cx - fx, cy, 24)}
      ${earth(Math.PI, 'Perihelion · early Jan', 'closest, fastest', 0)}${earth(0, 'Aphelion · early Jul', 'farthest, slowest', 0)}
      ${earth(-Math.PI / 2, '~21 Jun', 'sun over 23.5°N', 0)}${earth(Math.PI / 2, '~22 Dec', 'sun over 23.5°S', 0)}
      ${H.arrow(cx + 160, cy - 92, cx + 120, cy - 101, 'var(--ink)', 2)}<text x="${cx + 168}" y="${cy - 96}" class="sm">anticlockwise</text><text x="${cx + 168}" y="${cy - 80}" class="sm">(from above N pole)</text>
      <text x="350" y="352" text-anchor="middle" class="sm">Axis tilt 23.5° → seasons. Distance does NOT cause seasons.</text>
    </svg>`;
  };
  F['twilight'] = () => {
    const Y = d => 70 + d * 13;
    return `<svg viewBox="0 0 700 330">
      <rect x="0" y="0" width="700" height="${Y(0)}" fill="var(--m-sky,#cfe6f7)" opacity=".5"/>
      ${[[0, 6, '#f2b56b', 'Civil twilight · 0–6° · used in flying'], [6, 12, '#9a8cc9', 'Nautical twilight · 6–12°'], [12, 18, '#4b4f86', 'Astronomical twilight · 12–18°']].map(([a, b, c, t]) => `<rect x="0" y="${Y(a)}" width="700" height="${Y(b) - Y(a)}" fill="${c}" opacity=".55"/><text x="20" y="${(Y(a) + Y(b)) / 2 + 5}" style="font:700 13px var(--font);fill:var(--ink)">${t}</text>`).join('')}
      <rect x="0" y="${Y(18)}" width="700" height="${330 - Y(18)}" fill="#1d2140" opacity=".6"/><text x="20" y="${Y(18) + 20}" style="font:700 13px var(--font);fill:#fff">Night: sun more than 18° below</text>
      <line x1="0" x2="700" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--ink)" stroke-width="2.5"/><text x="690" y="${Y(0) - 6}" text-anchor="end" class="lbl">sensible horizon</text>
      <circle cx="520" cy="${Y(0) - 2}" r="18" fill="var(--m-sun)" opacity=".9"/><text x="300" y="${Y(0) - 30}" class="sm">sunset = upper edge on the visible horizon</text><text x="300" y="${Y(0) - 14}" class="sm">(sun's centre ~50′ below)</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS, H = G.FH;
  F['geodetic-lat'] = () => `<svg viewBox="0 0 700 320">
    <ellipse cx="260" cy="160" rx="200" ry="135" fill="var(--m-sea,#7fb4d8)" fill-opacity=".25" stroke="var(--ink)" stroke-width="2"/>
    <line x1="40" x2="480" y1="160" y2="160" stroke="var(--ink)" stroke-dasharray="5 4"/><text x="48" y="152" class="sm">equator plane</text>
    <circle cx="260" cy="160" r="4" fill="var(--ink)"/><text x="250" y="178" text-anchor="end" class="sm">centre</text>
    <circle cx="401" cy="64" r="6" fill="var(--warn)"/><text x="410" y="56" class="lbl">P</text>
    <line x1="260" y1="160" x2="401" y2="64" stroke="#3c8cf0" stroke-width="2.5"/><text x="300" y="120" style="font:700 12px var(--font);fill:#3c8cf0">geocentric</text>
    <line x1="401" y1="64" x2="321" y2="160" stroke="#d4493a" stroke-width="2.5"/><text x="330" y="148" style="font:700 12px var(--font);fill:#d4493a">normal → geodetic</text>
    <path d="M300 160 A40 40 0 0 0 293 138" fill="none" stroke="#3c8cf0" stroke-width="2"/><path d="M348 160 A28 28 0 0 0 340 140" fill="none" stroke="#d4493a" stroke-width="2"/>
    <text x="500" y="72" class="hd">Two latitudes</text>
    <text x="500" y="98" class="sm">Geocentric: line to the centre.</text><text x="500" y="122" class="sm">Geodetic (used on charts):</text><text x="500" y="138" class="sm">the normal to the surface.</text>
    <text x="500" y="166" class="sm">Biggest difference ≈ 11.6′</text><text x="500" y="182" class="sm">at 45° latitude.</text><text x="500" y="206" class="sm">Flattening ≈ 1/297</text><text x="500" y="222" class="sm">(exaggerated here).</text>
  </svg>`;
  F['gc-rhumb'] = () => {
    const R = 130, cx = 210, cy = 165;
    let mer = ''; for (let i = -3; i <= 3; i++) mer += `<ellipse cx="${cx}" cy="${cy}" rx="${Math.abs(i) * R / 3.2 + 0.1}" ry="${R}" fill="none" stroke="var(--line)"/>`;
    let par = ''; for (let j = -2; j <= 2; j++) { const y = cy + j * 45, w = Math.sqrt(R * R - (j * 45) ** 2); par += `<line x1="${cx - w}" x2="${cx + w}" y1="${y}" y2="${y}" stroke="var(--line)"/>`; }
    return `<svg viewBox="0 0 700 330">
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="var(--m-sea,#7fb4d8)" fill-opacity=".2" stroke="var(--ink)" stroke-width="2"/>${mer}${par}
      <line x1="${cx - R}" x2="${cx + R}" y1="${cy}" y2="${cy}" stroke="#2fb36b" stroke-width="3"/>
      <path class="anim-draw" pathLength="1000" d="M${cx - 110} ${cy + 35} Q${cx} ${cy - 120} ${cx + 110} ${cy + 35}" fill="none" stroke="#3c8cf0" stroke-width="3.5"/>
      <path class="anim-draw" pathLength="1000" d="M${cx - 110} ${cy + 35} Q${cx} ${cy - 40} ${cx + 110} ${cy + 35}" fill="none" stroke="#d4493a" stroke-width="3" stroke-dasharray="7 5"/>
      <circle cx="${cx - 110}" cy="${cy + 35}" r="5" fill="var(--ink)"/><circle cx="${cx + 110}" cy="${cy + 35}" r="5" fill="var(--ink)"/><text x="${cx - 118}" y="${cy + 55}" class="lbl">A</text><text x="${cx + 108}" y="${cy + 55}" class="lbl">B</text>
      <text x="400" y="70" style="font:800 14px var(--font);fill:#3c8cf0">Great circle</text><text x="400" y="90" class="sm">plane through the centre · shortest way</text><text x="400" y="106" class="sm">direction changes along it · radio waves follow it</text>
      <text x="400" y="146" style="font:800 14px var(--font);fill:#d4493a">Rhumb line</text><text x="400" y="166" class="sm">same angle with every meridian · constant track</text><text x="400" y="182" class="sm">longer · spirals towards the nearer pole</text>
      <text x="400" y="222" style="font:800 14px var(--font);fill:#2fb36b">Equator</text><text x="400" y="242" class="sm">the only line that is both a great circle</text><text x="400" y="258" class="sm">and a rhumb line (with the meridians)</text>
      <text x="${cx}" y="${cy - R - 8}" text-anchor="middle" class="sm">N</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  /* three projections side by side: graticule + GC (blue) + RL (red dashed) */
  F['projections-3'] = () => {
    const panel = (x, title, sub, inner) => `<g transform="translate(${x} 0)"><rect x="0" y="30" width="215" height="210" rx="14" fill="var(--panel)" stroke="var(--line)"/>${inner}<text x="107" y="20" text-anchor="middle" class="hd">${title}</text><text x="107" y="262" text-anchor="middle" class="sm">${sub}</text></g>`;
    let merc = ''; for (let i = 0; i < 6; i++) merc += `<line x1="${22 + i * 34}" x2="${22 + i * 34}" y1="40" y2="230" stroke="var(--line)"/>`;
    [0, 30, 60, 100, 150].forEach(d => merc += `<line x1="12" x2="203" y1="${225 - d}" y2="${225 - d}" stroke="var(--line)"/>`);
    merc += `<line x1="30" y1="190" x2="190" y2="110" stroke="#d4493a" stroke-width="3" stroke-dasharray="7 5"/><path d="M30 190 Q100 95 190 110" fill="none" stroke="#3c8cf0" stroke-width="3"/>`;
    let lam = ''; for (let i = -3; i <= 3; i++) lam += `<line x1="${107 + i * 10}" y1="-20" x2="${107 + i * 42}" y2="232" stroke="var(--line)"/>`;
    [140, 180, 220, 260].forEach(r => lam += `<path d="M${107 - Math.sin(.5) * r} ${-20 + Math.cos(.5) * r} A${r} ${r} 0 0 0 ${107 + Math.sin(.5) * r} ${-20 + Math.cos(.5) * r}" fill="none" stroke="var(--line)"/>`);
    lam += `<line x1="40" y1="190" x2="180" y2="170" stroke="#3c8cf0" stroke-width="3"/><path d="M40 190 Q110 200 180 170" fill="none" stroke="#d4493a" stroke-width="3" stroke-dasharray="7 5"/>`;
    let pol = ''; [30, 60, 90].forEach(r => pol += `<circle cx="107" cy="135" r="${r}" fill="none" stroke="var(--line)"/>`); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; pol += `<line x1="107" y1="135" x2="${107 + 95 * Math.cos(a)}" y2="${135 + 95 * Math.sin(a)}" stroke="var(--line)"/>`; }
    pol += `<line x1="40" y1="110" x2="175" y2="110" stroke="#3c8cf0" stroke-width="3"/><path d="M40 110 Q107 60 175 110" fill="none" stroke="#d4493a" stroke-width="3" stroke-dasharray="7 5"/><circle cx="107" cy="135" r="4" fill="var(--ink)"/>`;
    return `<svg viewBox="0 0 700 300">
      ${panel(10, 'Mercator', 'RL straight · GC bows to the pole', merc)}${panel(242, 'Lambert conformal', 'GC ≈ straight · RL bows to the pole', `<clipPath id="lc"><rect x="0" y="30" width="215" height="210" rx="14"/></clipPath><g clip-path="url(#lc)">${lam}</g>`)}${panel(475, 'Polar stereographic', 'GC ≈ straight near the pole', pol)}
      <line x1="200" x2="230" y1="288" y2="288" stroke="#3c8cf0" stroke-width="3"/><text x="236" y="292" class="sm">great circle</text><line x1="350" x2="380" y1="288" y2="288" stroke="#d4493a" stroke-width="3" stroke-dasharray="7 5"/><text x="386" y="292" class="sm">rhumb line</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  F['departure'] = () => {
    const R = 140, cx = 200, cy = 170;
    const par = lat => { const y = cy - R * Math.sin(lat * Math.PI / 180), w = R * Math.cos(lat * Math.PI / 180); return { y, w }; };
    const rows = [0, 30, 60].map(l => { const p = par(l); return `<line x1="${cx - p.w}" x2="${cx + p.w}" y1="${p.y}" y2="${p.y}" stroke="var(--line)" stroke-width="1.5"/><line x1="${cx}" x2="${cx + p.w * 0.35}" y1="${p.y}" y2="${p.y}" stroke="#d4493a" stroke-width="5"/><text x="${cx + R + 30}" y="${p.y + 5}" style="font:700 14px var(--font);fill:var(--ink)">${l}°: 1° of long = ${Math.round(60 * Math.cos(l * Math.PI / 180))} NM</text>`; }).join('');
    return `<svg viewBox="0 0 700 330">
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="var(--m-sea,#7fb4d8)" fill-opacity=".18" stroke="var(--ink)" stroke-width="2"/>
      <line x1="${cx}" x2="${cx}" y1="${cy - R}" y2="${cy + R}" stroke="var(--line)"/>${rows}
      <text x="${cx}" y="${cy - R - 8}" text-anchor="middle" class="lbl">N</text>
      <text x="${cx + R + 30}" y="${cy - R - 8}" class="hd">Departure = d.long′ × cos lat</text>
      <text x="${cx + R + 30}" y="${cy + 80}" style="font:600 13px var(--font);fill:var(--ink)">1° of latitude is always 60 NM.</text>
      <text x="${cx + R + 30}" y="${cy + 100}" style="font:600 13px var(--font);fill:var(--ink)">1° of longitude shrinks with cos lat.</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  F['fixes'] = () => `<svg viewBox="0 0 700 320">
    <g transform="translate(20 20)">
      <text x="150" y="16" text-anchor="middle" class="hd">Two lines at 90°</text>
      <circle cx="60" cy="240" r="7" fill="var(--ink)"/><text x="60" y="262" text-anchor="middle" class="sm">DME A</text>
      <circle cx="250" cy="250" r="7" fill="var(--ink)"/><text x="250" y="272" text-anchor="middle" class="sm">DME B</text>
      <path d="M60 240 m-170 0 a170 170 0 0 1 170 -170 a170 170 0 0 1 170 170" fill="none" stroke="#3c8cf0" stroke-width="2.5" transform="translate(0 0)"/>
      <path d="M250 250 m-150 0 a150 150 0 0 1 150 -150" fill="none" stroke="#2fb36b" stroke-width="2.5"/>
      <circle cx="178" cy="118" r="9" fill="none" stroke="var(--warn)" stroke-width="3"/><text x="192" y="110" class="lbl">fix</text>
      <text x="150" y="292" text-anchor="middle" class="sm">twin DME, cuts 60–90° = most accurate</text>
    </g>
    <g transform="translate(370 20)">
      <text x="150" y="16" text-anchor="middle" class="hd">Three lines: cocked hat</text>
      <line x1="20" y1="230" x2="290" y2="70" stroke="#3c8cf0" stroke-width="2.5"/><line x1="40" y1="60" x2="280" y2="240" stroke="#2fb36b" stroke-width="2.5"/><line x1="0" y1="140" x2="300" y2="165" stroke="#f08c2e" stroke-width="2.5"/>
      <polygon points="138,159 177,129 159,163" fill="var(--warn)" opacity=".35"/>
      <text x="150" y="215" text-anchor="middle" class="sm">aim for cuts of 120°;</text><text x="150" y="232" text-anchor="middle" class="sm">the fix is the centre of the triangle</text>
    </g>
  </svg>`;
})();
(function () {
  const F = G.FIGS;
  F['mass-stack'] = () => {
    const blocks = [['Basic empty mass', 'structure, unusable fuel, oil, emergency kit', 110, 1], ['+ crew, catering, water', '→ Dry operating mass (DOM)', 45, 0], ['+ traffic load', 'passengers, bags, cargo → Zero fuel mass', 55, 4], ['+ take-off fuel', 'trip + contingency + alternate + reserve → TOM', 50, 3], ['+ taxi fuel', '→ Ramp mass', 32, 5]];
    let y = 310, out = '';
    blocks.forEach(([t, s, h, hue]) => { y -= h; out += `<rect x="60" y="${y}" width="230" height="${h - 3}" rx="8" fill="var(--h${hue})" stroke="var(--h${hue}i)"/><text x="72" y="${y + Math.min(h - 8, 22)}" style="font:800 13.5px var(--font);fill:var(--ink)">${t}</text><text x="310" y="${y + Math.min(h - 8, 22)}" style="font:600 12.5px var(--font);fill:var(--ink)">${s}</text>`; });
    return `<svg viewBox="0 0 700 330">${out}
      <text x="60" y="326" style="font:600 12px var(--font);fill:var(--ink)">Useful load = traffic load + usable fuel = TOM − DOM</text></svg>`;
  };
})();
(function () {
  const F = G.FIGS;
  F['declared'] = () => {
    const x0 = 70, rw = 440, sw = 70, cw = 150, dt = 80, y = 150;
    const bar = (x1, x2, yy, lab, col) => `<line x1="${x1}" x2="${x2}" y1="${yy}" y2="${yy}" stroke="${col}" stroke-width="3"/><path d="M${x1} ${yy - 7} v14 M${x2} ${yy - 7} v14" stroke="${col}" stroke-width="3"/><text x="${(x1 + x2) / 2}" y="${yy - 8}" text-anchor="middle" style="font:800 14px var(--font);fill:${col}">${lab}</text>`;
    return `<svg viewBox="0 0 760 330">
      <rect x="${x0 + rw}" y="${y - 60}" width="${cw}" height="120" fill="none" stroke="#2fb36b" stroke-width="2" stroke-dasharray="6 4"/><text x="${x0 + rw + cw / 2}" y="${y + 50}" text-anchor="middle" class="sm">clearway</text><text x="${x0 + rw + cw - 6}" y="${y - 42}" text-anchor="end" class="sm">≤ ½ TORA long</text><text x="${x0 + rw + cw - 6}" y="${y - 27}" text-anchor="end" class="sm">≥ 75 m each side</text>
      <rect x="${x0}" y="${y - 22}" width="${rw}" height="44" rx="4" fill="var(--m-asphalt,#555)"/>
      <rect x="${x0 + rw}" y="${y - 22}" width="${sw}" height="44" fill="#8a8f98" stroke="#fff" stroke-dasharray="4 4"/><text x="${x0 + rw + sw / 2}" y="${y + 5}" text-anchor="middle" style="font:700 12.5px var(--font);fill:#fff">stopway</text>
      <line x1="${x0 + dt}" x2="${x0 + dt}" y1="${y - 22}" y2="${y + 22}" stroke="#fff" stroke-width="4"/><text x="${x0 + dt + 6}" y="${y + 38}" class="sm">displaced threshold</text>
      <text x="${x0 + dt + 14}" y="${y + 5}" style="font:700 12px var(--font);fill:#fff">→ take-off direction</text>
      ${bar(x0, x0 + rw, 60, 'TORA = runway', 'var(--h0i)')}${bar(x0, x0 + rw + cw, 30, 'TODA = TORA + clearway', 'var(--h1i)')}
      ${bar(x0, x0 + rw + sw, 230, 'ASDA = TORA + stopway', 'var(--h2i)')}${bar(x0 + dt, x0 + rw, 270, 'LDA = runway − displaced threshold', 'var(--h5i)')}
      <text x="${x0}" y="316" class="sm">Balanced field: V1 chosen so that ASDR = TODR — the shortest field length, the highest take-off mass.</text>
    </svg>`;
  };
  F['segments'] = () => `<svg viewBox="0 0 760 305">
    <line x1="30" x2="740" y1="260" y2="260" stroke="var(--ink)" stroke-width="2"/>
    <path d="M30 260 L120 260 L200 230 L330 160 L470 160 L720 60" fill="none" stroke="#3c8cf0" stroke-width="4"/>
    ${[[160, 'Seg 1', 'to gear up'], [265, 'Seg 2 · LIMITING', 'to ≥ 400 ft at V2'], [400, 'Seg 3', 'level, flaps up'], [600, 'Final', '≥ 1500 ft, clean, MCT']].map(([x, a, b]) => `<text x="${x}" y="280" text-anchor="middle" style="font:800 13px var(--font);fill:var(--ink)">${a}</text><text x="${x}" y="296" text-anchor="middle" class="sm">${b}</text>`).join('')}
    <line x1="120" x2="120" y1="248" y2="272" stroke="var(--ink)"/><text x="120" y="240" text-anchor="middle" class="sm">35 ft (screen)</text>
    <text x="30" y="24" class="sm">Net gradient = gross OEI gradient − 0.8% · clear obstacles by 35 ft</text>
  </svg>`;
})();
(function () {
  const F = G.FIGS;
  // The ICAO flight plan as a filled strip: item number, what goes in it, the book's example value.
  F['fp-form'] = () => {
    const rows = [
      ['7', 'Aircraft identification', 'ACF402', '≤ 7 characters', 1],
      ['8', 'Flight rules / type', 'I N', 'I V Y Z · S N G M X', 2],
      ['9', 'Number, type / wake', 'A30B/H', 'H ≥ 136 t · L ≤ 7 t', 3],
      ['10', 'Equipment / surveillance', 'S/C', 'S = VHF, VOR, ILS', 4],
      ['13', 'Departure + EOBT', 'EHAM0940', 'off-block time', 5],
      ['15', 'Speed, level, route', 'K0830F290 LEK2B …', 'K/N/M · F/S/A/M', 0],
      ['16', 'Destination + TEET, altns', 'LPPT0230 LPPR', 'max 2 alternates', 1],
      ['18', 'Other information', 'EET/LPPC0158 REG/FBVGA SEL/EJFL', '0 if none', 2],
      ['19', 'Supplementary', 'E/0345 P/300 R/UVE …', 'cross out what is NOT carried', 3],
    ];
    const rh = 33, y0 = 40;
    const body = rows.map(([n, what, ex, tip, h], i) => {
      const y = y0 + i * rh;
      return `<rect x="20" y="${y}" width="720" height="${rh - 4}" rx="7" fill="var(--h${h})" opacity=".55"/>
        <circle cx="44" cy="${y + rh / 2 - 2}" r="13" fill="var(--h${h}i)"/><text x="44" y="${y + rh / 2 + 3}" text-anchor="middle" style="font:800 13px var(--font);fill:var(--panel)">${n}</text>
        <text x="66" y="${y + rh / 2 + 3}" style="font:700 13.5px var(--font);fill:var(--ink)">${what}</text>
        <text x="282" y="${y + rh / 2 + 3}" style="font:700 13px ui-monospace,Menlo,monospace;fill:var(--ink)">${ex}</text>
        <text x="730" y="${y + rh / 2 + 3}" text-anchor="end" class="sm">${tip}</text>`;
    }).join('');
    return `<svg viewBox="0 0 760 ${y0 + rows.length * rh + 34}">
      <text x="66" y="26" class="sm">Item</text><text x="282" y="26" class="sm">Book example (Amsterdam → Lisbon)</text><text x="730" y="26" text-anchor="end" class="sm">Remember</text>
      ${body}
      <text x="20" y="${y0 + rows.length * rh + 22}" class="sm">Items 7–18 always; 19 when required. Numbers skip because they match ATS message field types. Times: 4 figures UTC.</text>
    </svg>`;
  };
})();
(function () {
  const F = G.FIGS, H = G.FH;
  // Pitot feeds the ASI only; static feeds all three.
  F['pitot-static'] = () => {
    const P = '#d4493a', S = '#3c8cf0';
    const inst = (x, lab, sub) => `<circle cx="${x}" cy="90" r="46" fill="var(--panel)" stroke="var(--ink)" stroke-width="2.5"/><text x="${x}" y="88" text-anchor="middle" style="font:800 18px var(--font);fill:var(--ink)">${lab}</text><text x="${x}" y="108" text-anchor="middle" class="sm">${sub}</text>`;
    return `<svg viewBox="0 0 720 330">
      <path d="M110 260 H312 V133" fill="none" stroke="${P}" stroke-width="5"/>
      <path d="M600 262 H560 V200 H348 M560 200 H630 M348 200 V133 M480 200 V136 M630 200 V136" fill="none" stroke="${S}" stroke-width="5"/>
      <path d="M30 252 h80 v16 h-80 z" fill="#9aa3ad" stroke="var(--ink)"/><path d="M30 256 h-14 v8 h14" fill="${P}"/>
      <text x="20" y="296" class="lbl">Pitot tube</text><text x="20" y="314" class="sm">ram (total) pressure · heated</text>
      <rect x="600" y="246" width="12" height="32" rx="3" fill="${S}"/><line x1="612" x2="660" y1="262" y2="262" stroke="var(--ink)" stroke-dasharray="3 3"/>
      <text x="530" y="296" class="lbl">Static port</text><text x="500" y="314" class="sm">flush, both sides of fuselage</text>
      ${inst(330, 'ASI', 'pitot − static')}${inst(480, 'ALT', 'static')}${inst(630, 'VSI', 'static')}
      <text x="150" y="250" style="font:700 13px var(--font);fill:${P}">pitot line</text><text x="380" y="218" style="font:700 13px var(--font);fill:${S}">static line</text>
      <text x="20" y="30" class="sm">Pitot → ASI only.</text><text x="20" y="48" class="sm">Static → ASI, altimeter and VSI.</text>
    </svg>`;
  };
  // Altimeter error "look out below": which way the reading goes.
  F['alt-errors'] = () => {
    const card = (x, title, from, to, read, hue) => `<g><rect x="${x}" y="40" width="210" height="230" rx="14" fill="var(--h${hue})" opacity=".5"/>
      <text x="${x + 105}" y="70" text-anchor="middle" style="font:800 16px var(--font);fill:var(--ink)">${title}</text>
      <text x="${x + 105}" y="104" text-anchor="middle" class="lbl">${from}</text>
      ${H.arrow(x + 105, 116, x + 105, 156, 'var(--ink)', 2.5)}
      <text x="${x + 105}" y="180" text-anchor="middle" class="lbl">${to}</text>
      <rect x="${x + 20}" y="200" width="170" height="50" rx="10" fill="var(--h${hue}i)"/>
      <text x="${x + 105}" y="231" text-anchor="middle" style="font:800 15px var(--font);fill:var(--panel)">${read}</text></g>`;
    return `<svg viewBox="0 0 720 320">
      ${card(20, 'Pressure', 'HIGH pressure', 'LOW pressure', 'OVER-reads', 5)}
      ${card(255, 'Temperature', 'WARM air', 'COLD air', 'OVER-reads', 0)}
      ${card(490, 'Position error', 'static port', 'disturbed by airflow', 'UNDER-reads', 3)}
      <text x="360" y="300" text-anchor="middle" class="sm">High → low (pressure or temperature): you are lower than the altimeter says. Look out below.</text>
    </svg>`;
  };
})();
