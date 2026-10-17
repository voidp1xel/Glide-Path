/* Air Navigation Part II (Aircraft Instruments, ch 19–25) figures. Names are prefixed n2- so they never
   collide with figs-nav.js. Labels stay ≥ 13 px in the 700-wide viewBox. */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const AR = (x1, y1, x2, y2, c = 'var(--ink)', w = 2.2) => H.arrow(x1, y1, x2, y2, c, w);
  const rad = d => (d - 90) * Math.PI / 180; // 0° = 12 o'clock, clockwise
  const P = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))].map(v => +v.toFixed(1));
  const arc = (cx, cy, r, a1, a2) => { const [x1, y1] = P(cx, cy, r, a1), [x2, y2] = P(cx, cy, r, a2); return `M${x1} ${y1} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`; };
  G.N2 = { T, AR, P, arc };

  // ASI dial with its colour arcs (light twin)
  F['n2-asi-dial'] = () => {
    const cx = 200, cy = 190, R = 140;
    const kt = v => 20 + (v - 40) * 1.6; // 40 kt at 20°, 240 kt at 340°
    const ticks = [40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];
    const band = (a, b, r, col, w) => `<path d="${arc(cx, cy, r, kt(a), kt(b))}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
    const radial = (v, col) => { const [x1, y1] = P(cx, cy, R - 26, kt(v)), [x2, y2] = P(cx, cy, R + 2, kt(v)); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="5"/>`; };
    const lab = [
      ['White arc', 'VS0 → VFE: flaps may be out', '#f4f4f4', 'var(--ink)'],
      ['Green arc', 'VS1 → VNO: normal operations', 'var(--ok)'],
      ['Yellow arc', 'VNO → VNE: smooth air only', '#e8b600'],
      ['Red line', 'VNE: never exceed', 'var(--bad)'],
      ['Red radial (twin)', 'VMC: one engine out, min control', 'var(--bad)'],
      ['Blue radial (twin)', 'VYSE: best rate, one engine out', '#2d7ff9'],
    ];
    return `<svg viewBox="0 0 700 390">
      <circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#1d2330" stroke="var(--ink)" stroke-width="2"/>
      ${band(55, 110, R - 22, '#f4f4f4', 9)}
      ${band(65, 165, R - 8, 'var(--ok)', 11)}
      ${band(165, 200, R - 8, '#e8b600', 11)}
      ${radial(200, 'var(--bad)')}${radial(75, 'var(--bad)')}${radial(95, '#2d7ff9')}
      ${ticks.map(v => { const [tx, ty] = P(cx, cy, R - 52, kt(v));
        return `<text x="${tx}" y="${ty + 5}" text-anchor="middle" style="font:700 14px var(--font);fill:#fff">${v}</text>`; }).join('')}
      <text x="${cx}" y="${cy + 46}" text-anchor="middle" style="font:700 14px var(--font);fill:#fff">KNOTS</text>
      <line x1="${cx}" y1="${cy}" x2="${P(cx, cy, R - 30, kt(128))[0]}" y2="${P(cx, cy, R - 30, kt(128))[1]}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="9" fill="#fff"/>
      ${lab.map((l, i) => `<rect x="390" y="${40 + i * 54}" width="22" height="22" rx="4" fill="${l[2]}" stroke="var(--ink)" stroke-width="1"/>` +
        T(422, 56 + i * 54, l[0]) + T(422, 76 + i * 54, l[1], { w: 500 })).join('')}
      ${T(30, 382, 'Not marked: VA (manoeuvring) and VLO (gear operating).', { w: 500 })}
    </svg>`;
  };

  // ASI and Machmeter inside the case
  F['n2-asi-mach'] = () => `<svg viewBox="0 0 700 330">
      <rect x="20" y="40" width="300" height="200" rx="16" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
      ${T(170, 30, 'ASI: a differential pressure gauge', { a: 'middle' })}
      <path d="M90 160 q20 -40 40 0 q20 40 40 0 q20 -40 40 0" fill="var(--h1)" stroke="var(--h1i)" stroke-width="3"/>
      ${T(150, 120, 'capsule = pitot (P)', { a: 'middle', c: 'var(--h1i)' })}
      ${T(170, 220, 'case = static (S)', { a: 'middle', c: 'var(--h4i)' })}
      ${AR(-10 + 30, 160, 88, 160, 'var(--h1i)', 3)}
      ${T(30, 270, 'Capsule moves by P − S = ½ρV²', {})}
      <rect x="380" y="40" width="300" height="200" rx="16" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
      ${T(530, 30, 'Machmeter: ASI + altitude capsule', { a: 'middle' })}
      <path d="M410 120 q15 -30 30 0 q15 30 30 0 q15 -30 30 0" fill="var(--h1)" stroke="var(--h1i)" stroke-width="3"/>
      ${T(455, 160, 'airspeed capsule', { a: 'middle', c: 'var(--h1i)' })}
      <rect x="560" y="95" width="70" height="60" rx="10" fill="var(--h3)" stroke="var(--h3i)" stroke-width="3"/>
      ${T(595, 178, 'altitude capsule', { a: 'middle', c: 'var(--h3i)' })}
      <line x1="500" y1="205" x2="640" y2="205" stroke="var(--ink)" stroke-width="4"/>${T(570, 228, 'ratio arm', { a: 'middle' })}
      ${T(390, 270, 'Mach = (P − S) ÷ S = TAS ÷ LSS', {})}
      ${T(390, 296, 'No density or', { w: 500 })}${T(390, 316, 'temperature error', { w: 500 })}
      ${T(30, 296, 'ASI errors: Blockage, Lag, Instrument,', { w: 500 })}${T(30, 316, 'Position, Density, Compressibility', { w: 500 })}
    </svg>`;
  // VSI: direct static to the capsule, metered static to the case
  F['n2-vsi'] = () => {
    const panel = (x, title, cap, needle, note) => `
      <rect x="${x}" y="150" width="200" height="120" rx="12" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.6"/>
      ${T(x + 100, 140, title, { a: 'middle' })}
      <circle cx="${x + 60}" cy="210" r="36" fill="#1d2330"/>
      <line x1="${x + 60}" y1="210" x2="${x + 60 + 30 * Math.cos(needle * Math.PI / 180)}" y2="${210 - 30 * Math.sin(needle * Math.PI / 180)}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      ${T(x + 112, 200, 'capsule', { s: 13 })}${T(x + 112, 220, cap, { s: 13, c: 'var(--h1i)' })}
      ${T(x + 100, 296, note, { a: 'middle', w: 500 })}`;
    return `<svg viewBox="0 0 700 320">
      <rect x="250" y="10" width="200" height="96" rx="12" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
      <path d="M300 60 q12 -24 24 0 q12 24 24 0 q12 -24 24 0" fill="var(--h1)" stroke="var(--h1i)" stroke-width="3"/>
      ${T(350, 32, 'case', { a: 'middle', c: 'var(--h4i)' })}
      <line x1="40" y1="60" x2="300" y2="60" stroke="var(--h1i)" stroke-width="4"/>
      ${T(40, 50, 'static: direct → capsule', { c: 'var(--h1i)' })}
      <path d="M150 60 L150 94 L250 94" fill="none" stroke="var(--h4i)" stroke-width="4"/>
      <rect x="185" y="84" width="30" height="20" rx="4" fill="var(--warn)"/>
      ${T(40, 118, 'calibrated leak → case (lags)', { c: 'var(--h4i)' })}
      ${T(470, 50, 'Lag of the case pressure', { w: 700 })}${T(470, 70, 'behind the capsule pressure', { w: 500 })}${T(470, 90, '= rate of climb or descent', { w: 500 })}
      ${panel(20, 'Climb', 'contracts', 135, 'case pressure higher')}
      ${panel(250, 'Level', 'neutral', 180, 'pressures equal → zero')}
      ${panel(480, 'Descent', 'expands', 225, 'case pressure lower')}
    </svg>`;
  };
  // needle-and-ball: balanced, slipping and skidding left turns
  F['n2-needle-ball'] = () => {
    const inst = (x, title, ball, note, c) => {
      const cx = x + 100, cy = 120;
      const bx = cx + ball * 30, by = 186 - Math.abs(ball) * 4;
      return `<circle cx="${cx}" cy="${cy}" r="88" fill="#1d2330" stroke="var(--ink)" stroke-width="2"/>
        <text x="${cx - 52}" y="${cy - 34}" style="font:700 15px var(--font);fill:#fff">L</text><text x="${cx + 42}" y="${cy - 34}" style="font:700 15px var(--font);fill:#fff">R</text>
        <rect x="${cx - 46}" y="${cy - 82}" width="10" height="18" fill="#fff" transform="rotate(-20 ${cx} ${cy})"/>
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 70}" stroke="#fff" stroke-width="7" stroke-linecap="round" transform="rotate(-20 ${cx} ${cy})"/>
        <circle cx="${cx}" cy="${cy}" r="8" fill="#fff"/>
        <path d="M${cx - 60} 176 Q${cx} 204 ${cx + 60} 176" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity=".25"/>
        <line x1="${cx - 12}" y1="180" x2="${cx - 12}" y2="198" stroke="#fff" stroke-width="2"/><line x1="${cx + 12}" y1="180" x2="${cx + 12}" y2="198" stroke="#fff" stroke-width="2"/>
        <circle cx="${bx}" cy="${by}" r="9" fill="#111" stroke="#fff" stroke-width="2"/>
        ${T(cx, 240, title, { a: 'middle', c })}${T(cx, 262, note, { a: 'middle', w: 500 })}`;
    };
    return `<svg viewBox="0 0 700 290">
      ${inst(10, 'Balanced', 0, 'ball centred', 'var(--ok)')}
      ${inst(240, 'Slipping', -1.4, 'ball inside the turn', 'var(--warn)')}
      ${inst(470, 'Skidding', 1.4, 'ball outside the turn', 'var(--bad)')}
      ${T(350, 20, 'All three: needle left = rate 1 turn to the left', { a: 'middle', w: 500 })}
    </svg>`;
  };
  // INS: integrate twice; gimballed platform vs strap-down
  F['n2-ins'] = () => {
    const box = (x, y, w, s, c) => `<rect x="${x}" y="${y}" width="${w}" height="46" rx="10" fill="var(--${c})" stroke="var(--${c}i)" stroke-width="2"/>${T(x + w / 2, y + 29, s, { a: 'middle' })}`;
    return `<svg viewBox="0 0 700 330">
      ${box(10, 20, 150, 'Acceleration', 'h0')}${AR(162, 43, 200, 43)}${T(181, 34, '∫', { a: 'middle', s: 18 })}
      ${box(204, 20, 130, 'Velocity (GS)', 'h1')}${AR(336, 43, 374, 43)}${T(355, 34, '∫', { a: 'middle', s: 18 })}
      ${box(378, 20, 120, 'Distance', 'h2')}${AR(500, 43, 538, 43)}
      ${box(542, 20, 150, 'Lat / long', 'h3')}
      ${T(617, 88, '+ start position', { a: 'middle', w: 500 })}${T(270, 88, '+ TAS from ADC → wind', { a: 'middle', w: 500 })}
      <line x1="350" y1="110" x2="350" y2="320" stroke="var(--line, #888)" stroke-dasharray="5 5"/>
      ${T(175, 128, 'Gimballed INS', { a: 'middle' })}
      <ellipse cx="175" cy="215" rx="120" ry="58" fill="none" stroke="var(--ink)" stroke-width="2"/>
      <ellipse cx="175" cy="215" rx="88" ry="40" fill="none" stroke="var(--ink)" stroke-width="2"/>
      <rect x="125" y="200" width="100" height="30" rx="6" fill="var(--h1)" stroke="var(--h1i)" stroke-width="2"/>
      ${T(175, 221, 'platform', { a: 'middle' })}
      ${T(175, 298, 'kept level and north-aligned', { a: 'middle', w: 500 })}${T(175, 318, 'by 3 gyros and torquers', { a: 'middle', w: 500 })}
      ${T(525, 128, 'Strap-down IRS', { a: 'middle' })}
      <path d="M390 240 L660 240 L640 262 L410 262 Z" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>
      ${T(525, 256, 'airframe', { a: 'middle', s: 13, w: 500 })}
      <rect x="465" y="182" width="120" height="58" rx="6" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>
      ${T(525, 206, '3 RLGs +', { a: 'middle' })}${T(525, 226, '3 accelerometers', { a: 'middle' })}
      ${T(525, 298, 'bolted to the aircraft;', { a: 'middle', w: 500 })}${T(525, 318, 'platform kept mathematically', { a: 'middle', w: 500 })}
    </svg>`;
  };
  // TCAS traffic symbols
  F['n2-tcas'] = () => {
    const col = [
      ['Other traffic', 'hollow diamond', ['not a threat', ''], s => `<path d="M${s} 70 l22 22 -22 22 -22 -22 Z" fill="none" stroke="#3fc7d8" stroke-width="3"/>`, '+15', '#3fc7d8'],
      ['Proximate', 'solid cyan diamond', ['within 6 nm', 'and ±1200 ft'], s => `<path d="M${s} 70 l22 22 -22 22 -22 -22 Z" fill="#3fc7d8"/>`, '−12↑', '#3fc7d8'],
      ['Traffic advisory', 'solid amber circle', ['"TRAFFIC, TRAFFIC"', 'look; don’t manoeuvre'], s => `<circle cx="${s}" cy="92" r="20" fill="#f2b400"/>`, '+05↓', '#f2b400'],
      ['Resolution advisory', 'solid red square', ['act now:', 'follow the RA'], s => `<rect x="${s - 20}" y="72" width="40" height="40" fill="#e5484d"/>`, '−06↓', '#e5484d'],
    ];
    return `<svg viewBox="0 0 700 300">
      <rect x="0" y="40" width="700" height="140" rx="14" fill="#1d2330"/>
      ${col.map((c, i) => { const x = 88 + i * 175; return c[3](x) + `<text x="${x}" y="150" text-anchor="middle" style="font:700 16px var(--font);fill:${c[5]}">${c[4]}</text>`
        + T(x, 210, c[0], { a: 'middle' }) + T(x, 232, c[1], { a: 'middle', w: 500 }) + T(x, 254, c[2][0], { a: 'middle', w: 500 }) + T(x, 276, c[2][1], { a: 'middle', w: 500 }); }).join('')}
      ${T(350, 26, 'Number = relative altitude in hundreds of feet (+ above, − below); arrow = climbing or descending', { a: 'middle', w: 500 })}
    </svg>`;
  };
  // engine gauge colour bands
  F['n2-engine-arcs'] = () => {
    const bar = (y, title, segs, marks) => {
      const x0 = 150, W = 520;
      return T(20, y + 22, title) + segs.map(s => `<rect x="${x0 + s[0] * W}" y="${y}" width="${(s[1] - s[0]) * W}" height="30" fill="${s[2]}"/>`).join('')
        + `<rect x="${x0}" y="${y}" width="${W}" height="30" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`
        + marks.map(m => `<line x1="${x0 + m[0] * W}" y1="${y - 6}" x2="${x0 + m[0] * W}" y2="${y + 36}" stroke="${m[2] || 'var(--bad)'}" stroke-width="5"/>` + T(x0 + m[0] * W, y + 56, m[1], { a: 'middle', w: 500 })).join('');
    };
    return `<svg viewBox="0 0 700 330">
      ${bar(20, 'Carb air temp', [[0, .2, 'transparent'], [.2, .325, '#f2b400'], [.325, .45, 'var(--ok)'], [.45, 1, '#e5484d']], [[.2, '−10 °C', 'var(--ink)'], [.325, '+15', 'var(--ink)'], [.45, '+40 °C', 'var(--ink)']])}
      ${T(150, 100, 'yellow = icing · green = normal · red = detonation', { w: 500 })}
      ${bar(130, 'Oil pressure', [[.2, .75, 'var(--ok)']], [[.2, 'min'], [.75, 'max']])}
      ${bar(230, 'Manifold press.', [[.15, .45, '#2d7ff9'], [.45, .8, 'var(--ok)']], [[.8, 'max take-off MAP']])}
      ${T(150, 314, 'blue = lean mixture range · green = rich range · red radial = max take-off MAP', { w: 500 })}
    </svg>`;
  };
  // EFIS colour code
  F['n2-efis-colours'] = () => {
    const c = [
      ['#f4f4f4', 'White', 'scales, labels, selected data'], ['#3fc7d8', 'Cyan', 'inactive route, database items'],
      ['#d94fd9', 'Magenta', 'ACTIVE route, FD, computed data'], ['#3ecf6a', 'Green', 'engaged modes, valid data'],
      ['#f2b400', 'Amber', 'cautions, DH flashing'], ['#e5484d', 'Red', 'warnings, limits'],
    ];
    return `<svg viewBox="0 0 700 300">
      <rect x="0" y="0" width="700" height="300" rx="14" fill="#1d2330"/>
      ${c.map((k, i) => { const x = 20 + (i % 2) * 340, y = 30 + Math.floor(i / 2) * 88;
        return `<rect x="${x}" y="${y}" width="56" height="56" rx="8" fill="${k[0]}"/>
          <text x="${x + 72}" y="${y + 24}" style="font:700 17px var(--font);fill:${k[0]}">${k[1]}</text>
          <text x="${x + 72}" y="${y + 48}" style="font:500 14px var(--font);fill:#e8e8e8">${k[2]}</text>`; }).join('')}
    </svg>`;
  };
})();
