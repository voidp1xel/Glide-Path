/* Aviator's Handbook (Technical General) figures. Animations use CSS (offset-path / keyframes) so
   prefers-reduced-motion switches them off; labels stay ≥ 11.5 px and inside the viewBox. */
(function () {
  'use strict';
  const F = G.FIGS, H = G.FH;
  // labels never below 13 px in the 700-wide viewBox → ≥ 11 px on a phone, where figures scroll at 600 px
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" style="font:${o.w || 700} ${Math.max(13, o.s || 13)}px var(--font);fill:${o.c || 'var(--ink)'}">${s}</text>`;
  const AR = (x1, y1, x2, y2, c = 'var(--ink)', w = 2.2) => H.arrow(x1, y1, x2, y2, c, w);
  // a cambered aerofoil outline, chord from (x0,y0) length L, tilted by aoa (deg, nose up)
  function aerofoil(x0, y0, L, aoa, sym) {
    const pts = n => [...Array(n + 1)].map((_, i) => i / n);
    const t = 0.12, m = sym ? 0 : 0.045, p = 0.38;
    const yt = x => 5 * t * (0.2969 * Math.sqrt(x) - 0.126 * x - 0.3516 * x * x + 0.2843 * x ** 3 - 0.1036 * x ** 4);
    const yc = x => x < p ? m / (p * p) * (2 * p * x - x * x) : m / ((1 - p) ** 2) * ((1 - 2 * p) + 2 * p * x - x * x);
    const a = -aoa * Math.PI / 180, R = (x, y) => [x0 + (x * Math.cos(a) - y * Math.sin(a)) * L, y0 - (x * Math.sin(a) + y * Math.cos(a)) * L];
    const up = pts(40).map(x => R(x, yc(x) + yt(x))), lo = pts(40).reverse().map(x => R(x, yc(x) - yt(x)));
    const camber = pts(30).map(x => R(x, yc(x)));
    return { d: 'M' + up.concat(lo).map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L') + ' Z', camber: 'M' + camber.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L'), R,
      up: x => R(x, yc(x) + yt(x)), lo: x => R(x, yc(x) - yt(x)) };
  }
  G.HB = { T, AR, aerofoil }; // shared with the figure blocks appended below

  F['aerofoil-anatomy'] = () => {
    const A = aerofoil(150, 190, 400, 6);
    const [lx, ly] = A.R(0, 0), [tx, ty] = A.R(1, 0), [cx, cy] = A.R(0.27, 0.02);
    return `<svg viewBox="0 0 700 340">
      ${[0, 1, 2, 3].map(i => `<line x1="20" x2="120" y1="${206 + i * 6}" y2="${206 + i * 6}" stroke="var(--m-cold)" stroke-width="1.5" opacity=".5"/>`).join('')}
      ${T(20, 196, 'relative airflow', { s: 12, c: 'var(--m-cold)' })}
      <path d="${A.d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2.2"/>
      <line x1="${lx}" y1="${ly}" x2="${tx}" y2="${ty}" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="6 4"/>
      <path d="${A.camber}" fill="none" stroke="var(--m-warm)" stroke-width="2" stroke-dasharray="2 4"/>
      <line x1="${lx}" y1="${ly}" x2="${tx + 30}" y2="${ly}" stroke="var(--m-cold)" stroke-width="1.6"/>
      <path d="M${lx + 120} ${ly} A120 120 0 0 0 ${lx + 120 * Math.cos(6 * Math.PI / 180)} ${ly - 120 * Math.sin(6 * Math.PI / 180)}" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
      ${T(lx + 128, ly - 2, 'angle of attack', { s: 12 })}
      ${AR(cx, cy, cx, cy - 120, 'var(--ok)', 3)}${T(cx + 8, cy - 108, 'Lift ⟂ airflow', { c: 'var(--ok)' })}
      ${AR(cx, cy, cx + 70, cy, 'var(--warn)', 3)}${T(cx + 76, cy + 18, 'Drag ∥ airflow', { c: 'var(--warn)' })}
      ${AR(cx, cy, cx + 14, cy - 124, 'var(--ink)', 2)}${T(cx + 20, cy - 128, 'Total reaction', { s: 12 })}
      <circle cx="${cx}" cy="${cy}" r="5" fill="var(--ink)"/>${T(cx + 4, cy + 46, 'centre of pressure', { s: 12, a: 'middle' })}
      ${T(lx - 8, ly + 30, 'leading edge', { s: 12, a: 'middle' })}${T(tx, ty - 22, 'trailing edge', { s: 12, a: 'middle' })}
      ${T(380, 262, '— — chord line', { s: 12 })}${T(380, 282, '· · · mean camber line', { s: 12, c: 'var(--m-warm)' })}
      ${T(20, 322, 'Angle of attack: chord to relative airflow (changes). Angle of incidence: chord to aircraft datum (fixed).', { s: 12, w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['venturi'] = () => {
    const top = 'M30 70 C180 70 220 120 350 120 C480 120 520 70 670 70', bot = 'M30 270 C180 270 220 220 350 220 C480 220 520 270 670 270';
    const lanes = [100, 135, 170, 205, 240];
    const lane = y => { const k = (y - 170) / 100; return `M30 ${y} C180 ${y} 220 ${170 + k * 50} 350 ${170 + k * 50} C480 ${170 + k * 50} 520 ${y} 670 ${y}`; };
    const dots = lanes.map((y, i) => [0, 1, 2, 3].map(j => `<circle r="4.5" fill="var(--m-cold)" style="offset-path:path('${lane(y)}');animation:hb-flow 3.2s linear ${-(j * 0.8 + i * 0.17)}s infinite"/>`).join('')).join('');
    return `<svg viewBox="0 0 700 330">
      <style>@keyframes hb-flow{from{offset-distance:0%}to{offset-distance:100%}}</style>
      <path d="${top} L670 40 L30 40 Z" fill="var(--wash)"/><path d="${bot} L670 300 L30 300 Z" fill="var(--wash)"/>
      <path d="${top}" fill="none" stroke="var(--ink)" stroke-width="2.5"/><path d="${bot}" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
      ${lanes.map(y => `<path d="${lane(y)}" fill="none" stroke="var(--m-cold)" stroke-width="1" opacity=".35"/>`).join('')}
      ${dots}
      ${[[110, 'wide: slow', 'high static pressure'], [350, 'narrow: FAST', 'LOW static pressure'], [590, 'wide: slow', 'high static pressure']].map(([x, a, b]) => `<rect x="${x - 82}" y="300" width="164" height="0" fill="none"/>${T(x, 26, a, { a: 'middle', s: 13 })}${T(x, 322, b, { a: 'middle', s: 12, c: x === 350 ? 'var(--warn)' : 'var(--muted)' })}`).join('')}
      ${T(350, 172, 'A × V = constant', { a: 'middle', s: 14, w: 800 })}${T(350, 192, 'P + ½ρV² = constant', { a: 'middle', s: 13, w: 700, c: 'var(--muted)' })}
    </svg>`;
  };

  F['magnus'] = () => `<svg viewBox="0 0 700 300">
      <style>@keyframes hb-spin{to{transform:rotate(-360deg)}}</style>
      ${[[180, false, 'Not spinning: no lift'], [520, true, 'Spinning: lift (Magnus effect)']].map(([x, spin, lab]) => `
        ${[-80, -50, -25, 25, 50, 80].map(dy => { const close = Math.abs(dy) < 30; const bend = spin ? (dy < 0 ? (close ? 22 : 12) : (close ? 6 : 3)) : (close ? 14 : 7); const sgn = dy < 0 ? -1 : 1;
          return `<path d="M${x - 160} ${140 + dy} C${x - 60} ${140 + dy} ${x - 40} ${140 + dy + sgn * bend} ${x} ${140 + dy + sgn * bend} C${x + 40} ${140 + dy + sgn * bend} ${x + 60} ${140 + dy + (spin ? sgn * bend * 0.9 + 8 : 0)} ${x + 160} ${140 + dy + (spin ? 14 : 0)}" fill="none" stroke="var(--m-cold)" stroke-width="${spin && dy < 0 ? 2.4 : 1.4}" opacity=".75"/>`; }).join('')}
        <g style="transform-origin:${x}px 140px;${spin ? 'animation:hb-spin 2.2s linear infinite' : ''}"><circle cx="${x}" cy="140" r="38" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2.4"/><line x1="${x - 38}" x2="${x + 38}" y1="140" y2="140" stroke="var(--h4i)" stroke-width="2"/></g>
        ${spin ? AR(x, 92, x, 40, 'var(--ok)', 3) + T(x + 8, 52, 'lift', { c: 'var(--ok)' }) + T(x, 205, 'top: flow speeds up → low pressure', { a: 'middle', s: 12 }) + T(x, 222, 'bottom: flow slows → higher pressure', { a: 'middle', s: 12 }) : T(x, 205, 'equal flow above and below', { a: 'middle', s: 12 })}
        ${T(x, 265, lab, { a: 'middle', s: 13.5, w: 800 })}`).join('')}
      ${T(20, 292, 'Air flows left → right. A rough surface drags more air round the ball: more circulation, more lift.', { s: 12, w: 600, c: 'var(--muted)' })}
    </svg>`;

  F['cp-move'] = () => {
    const row = (y, title, sym, plate, cpLow, cpHigh, note) => {
      const L = 250, x0 = 140;
      const shape = plate ? `<rect x="${x0}" y="${y - 3}" width="${L}" height="6" rx="3" fill="var(--h3)" stroke="var(--h3i)" stroke-width="1.8"/>` : `<path d="${aerofoil(x0, y, L, 0, sym).d}" fill="var(--h3)" stroke="var(--h3i)" stroke-width="1.8"/>`;
      const X = f => x0 + f * L;
      return `${T(20, y + 5, title, { s: 13.5, w: 800 })}${shape}
        <line x1="${X(0.25)}" x2="${X(0.25)}" y1="${y - 30}" y2="${y + 30}" stroke="var(--ink)" stroke-dasharray="3 3"/>${T(X(0.25), y + 44, '25% chord', { a: 'middle', s: 11.5, c: 'var(--muted)' })}
        <circle cx="${X(cpLow)}" cy="${y - 24}" r="6" fill="var(--m-cold)"/><circle cx="${X(cpHigh)}" cy="${y - 24}" r="6" fill="var(--m-warm)"/>
        ${cpLow !== cpHigh ? AR(X(cpLow), y - 24, X(cpHigh) + (cpHigh > cpLow ? -8 : 8), y - 24, 'var(--ink)', 2) : ''}
        ${T(420, y + 5, note, { s: 12.5 })}`;
    };
    return `<svg viewBox="0 0 700 350">
      ${row(70, 'Cambered', false, false, 0.38, 0.22, 'CP moves FORWARD (nose-up)')}
      ${row(170, 'Symmetric', true, false, 0.25, 0.25, 'CP stays at ~25%')}
      ${row(260, 'Flat plate', false, true, 0.3, 0.45, 'CP moves BACK (nose-down)')}
      <circle cx="150" cy="332" r="6" fill="var(--m-cold)"/>${T(162, 336, 'low angle of attack', { s: 12 })}<circle cx="320" cy="332" r="6" fill="var(--m-warm)"/>${T(332, 336, 'higher angle of attack', { s: 12 })}
    </svg>`;
  };

  F['airspeed-ladder'] = () => {
    const S = [['IAS', 'what the ASI: shows', 'h0'], ['CAS', 'corrected for: position error', 'h1'], ['EAS', 'corrected for: compressibility', 'h4'], ['TAS', 'corrected for: density', 'h2'], ['Mach', 'TAS ÷ local: speed of sound', 'h3']];
    return `<svg viewBox="0 0 700 200">
      ${S.map(([k, s, h], i) => { const x = 20 + i * 136; return `<rect x="${x}" y="40" width="118" height="70" rx="16" fill="var(--${h})" stroke="var(--${h}i)" stroke-width="2"/>
        ${T(x + 59, 84, k, { a: 'middle', s: 22, w: 800, c: `var(--${h}i)` })}${T(x + 59, 136, s.split(': ')[0], { a: 'middle', s: 11.5, w: 600 })}${s.includes(': ') ? T(x + 59, 152, s.split(': ')[1], { a: 'middle', s: 11.5, w: 600, c: 'var(--muted)' }) : ''}
        ${i < 4 ? AR(x + 120, 75, x + 134, 75, 'var(--ink)', 2) : ''}`; }).join('')}
      ${T(350, 190, 'At ISA sea level IAS = TAS. Climbing at constant IAS, TAS and Mach number both rise.', { a: 'middle', s: 12, w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 2 · Airflow, lift and drag ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR, aerofoil } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['aerofoil-flow'] = () => {
    const A = aerofoil(170, 185, 380, 5);
    const xs = [...Array(61)].map((_, i) => 0.005 + i * 0.995 / 60);
    const th = x => 3 + 24 * x; // drawn (exaggerated) boundary-layer thickness
    const edge = (a, b, wav) => xs.filter(x => x >= a && x <= b).map(x => { const [px, py] = A.up(x); return [px, py - th(x) + (wav ? Math.sin(x * 90) * 2.2 : 0)]; });
    const surf = (a, b) => xs.filter(x => x >= a && x <= b).map(x => A.up(x));
    const band = (a, b, wav) => P(surf(a, b).concat(edge(a, b, wav).reverse())) + ' Z';
    const [sx, sy] = A.up(0.005), [tx, ty] = A.up(0.3), [qx, qy] = A.up(0.85), [ex, ey] = A.up(1);
    const line = (y, k) => `M10 ${y} C110 ${y} 120 ${y - 16 * k} 200 ${y - 20 * k} S 470 ${y - 6 * k} 560 ${y + 10 * k} S 650 ${y + 16 * k} 695 ${y + 16 * k}`;
    const lines = [[62, 1], [100, 1.15], [258, 0.55], [292, 0.4]];
    const dots = lines.map(([y, k], i) => [0, 1, 2].map(j => `<circle r="4" fill="var(--m-cold)" style="offset-path:path('${line(y, k)}');animation:hb-flow2 4s linear ${-(j * 1.33 + i * 0.3)}s infinite"/>`).join('')).join('');
    return `<svg viewBox="0 0 700 340">
      <style>@keyframes hb-flow2{from{offset-distance:0%}to{offset-distance:100%}}</style>
      ${lines.map(([y, k]) => `<path d="${line(y, k)}" fill="none" stroke="var(--m-cold)" stroke-width="1.4" opacity=".5"/>`).join('')}${dots}
      <path d="${band(0.005, 0.3, false)}" fill="var(--h1)" stroke="var(--h1i)" stroke-width="1.2"/>
      <path d="${band(0.3, 0.85, true)}" fill="var(--h2)" stroke="var(--h2i)" stroke-width="1.2"/>
      <path d="${A.d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2.2"/>
      <path d="M${qx} ${qy - 4} C${qx + 40} ${qy - 22} ${ex + 30} ${ey - 26} ${ex + 70} ${ey - 14}" fill="none" stroke="var(--warn)" stroke-width="2" stroke-dasharray="5 4"/>
      <path d="M${qx + 28} ${qy + 8} a10 10 0 1 1 14 -6" fill="none" stroke="var(--warn)" stroke-width="1.8"/>${AR(qx + 42, qy + 2, qx + 40, qy + 7, 'var(--warn)', 1.8)}
      <circle cx="${sx - 2}" cy="${sy + 2}" r="6" fill="var(--warn)"/>
      <line x1="${sx - 6}" y1="${sy + 6}" x2="118" y2="226" stroke="var(--ink)" stroke-width="1.2"/>
      ${T(24, 244, 'stagnation point')}${T(24, 262, 'V = 0, pressure max', { w: 600, c: 'var(--muted)' })}
      ${T(40, 160, 'upwash ↗', { c: 'var(--m-cold)' })}
      ${T(196, 146, 'laminar', { a: 'middle', c: 'var(--h1i)' })}
      <line x1="${tx}" y1="${ty - 2}" x2="${tx}" y2="${ty - th(0.3) - 18}" stroke="var(--ink)" stroke-width="1.4"/>
      ${T(tx, ty - th(0.3) - 38, 'transition point', { a: 'middle' })}${T(tx, ty - th(0.3) - 22, '≈ max camber, least pressure', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${T(420, 152, 'turbulent', { a: 'middle', c: 'var(--h2i)' })}
      ${T(qx + 20, qy - 36, 'separation point', { a: 'middle', c: 'var(--warn)' })}
      ${T(ex + 22, ey + 34, 'reverse flow, wake', { w: 600, c: 'var(--warn)' })}
      ${T(610, 112, 'downwash ↘', { a: 'middle', c: 'var(--m-cold)' })}
      ${T(20, 326, 'Boundary layer (drawn thick): air slower than 99% of free stream, ≈ 2 mm at the LE, ≈ 20 mm at the TE.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['tip-vortex'] = () => {
    const spiral = (cx, cy, dir) => { // dir 1 = clockwise on screen
      const pts = [...Array(46)].map((_, i) => { const a = i * 0.3 * dir, r = 4 + i * 0.5; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
      return `<g style="transform-origin:${cx}px ${cy}px;animation:hb-spin${dir > 0 ? 'cw' : 'ccw'} 2.6s linear infinite"><path d="${P(pts)}" fill="none" stroke="var(--m-cold)" stroke-width="2.2"/></g>`;
    };
    const c = [575, 205], L = 130, ang = 13 * Math.PI / 180;
    return `<svg viewBox="0 0 700 330">
      <style>@keyframes hb-spincw{to{transform:rotate(360deg)}}@keyframes hb-spinccw{to{transform:rotate(-360deg)}}</style>
      ${T(215, 30, 'Seen from behind', { a: 'middle', s: 14, w: 800 })}
      <rect x="55" y="140" width="320" height="10" rx="5" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <circle cx="215" cy="145" r="22" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${AR(190, 168, 90, 168, 'var(--warn)', 2.2)}${AR(240, 168, 340, 168, 'var(--warn)', 2.2)}
      ${AR(85, 120, 180, 120, 'var(--ok)', 2.2)}${AR(345, 120, 250, 120, 'var(--ok)', 2.2)}
      ${spiral(50, 145, 1)}${spiral(380, 145, -1)}
      ${T(215, 108, 'inward on top (low pressure)', { a: 'middle', c: 'var(--ok)' })}
      ${T(215, 192, 'outward underneath (high pressure)', { a: 'middle', c: 'var(--warn)' })}
      ${AR(120, 210, 120, 252, 'var(--m-cold)', 2.4)}${AR(215, 210, 215, 262, 'var(--m-cold)', 2.4)}${AR(310, 210, 310, 252, 'var(--m-cold)', 2.4)}
      ${T(215, 284, 'induced downwash behind the wing', { a: 'middle', c: 'var(--m-cold)' })}
      ${T(50, 90, 'tip vortex', { a: 'middle', c: 'var(--m-cold)' })}${T(380, 90, 'tip vortex', { a: 'middle', c: 'var(--m-cold)' })}
      <line x1="440" y1="40" x2="440" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(570, 30, 'Seen from the side', { a: 'middle', s: 14, w: 800 })}
      <path d="${aerofoil(510, 210, 140, 4).d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${AR(452, 250, 520, 250, 'var(--ink)', 2)}${T(452, 272, 'free stream', { w: 600 })}
      ${AR(452, 284, 518, 300, 'var(--m-cold)', 2)}${T(526, 304, 'effective (tilted down)', { w: 600, c: 'var(--m-cold)' })}
      ${AR(c[0], c[1], c[0], c[1] - L, 'var(--muted)', 2, '5 4')}${T(c[0] - 8, c[1] - L - 8, 'lift ⟂ free stream', { a: 'end', w: 600, c: 'var(--muted)' })}
      ${AR(c[0], c[1], c[0] + L * Math.sin(ang), c[1] - L * Math.cos(ang), 'var(--ok)', 3)}${T(c[0] + 36, c[1] - L + 18, 'actual lift', { c: 'var(--ok)' })}
      ${AR(c[0], c[1] - L * Math.cos(ang), c[0] + L * Math.sin(ang) - 3, c[1] - L * Math.cos(ang), 'var(--warn)', 2.6)}
      ${T(694, c[1] - L - 26, 'induced drag →', { a: 'end', c: 'var(--warn)' })}
    </svg>`;
  };

  F['drag-curve'] = () => {
    const X = v => 80 + v / 2.2 * 590, Y = d => 290 - d / 3 * 240;
    const curve = (f, a, b) => P([...Array(81)].map((_, i) => { const v = a + (b - a) * i / 80; return [X(v), Y(f(v))]; }));
    const dp = v => 0.5 * v * v, di = v => 0.5 / (v * v), tot = v => dp(v) + di(v);
    const vl = (v, lab, col) => `<line x1="${X(v)}" x2="${X(v)}" y1="${Y(tot(v))}" y2="290" stroke="${col}" stroke-width="1.6" stroke-dasharray="4 4"/><circle cx="${X(v)}" cy="${Y(tot(v))}" r="5" fill="${col}"/>${T(X(v), 310, lab, { a: 'middle', c: col })}`;
    const tv = 1.316, td = tot(tv);
    return `<svg viewBox="0 0 700 400">
      <line x1="80" y1="40" x2="80" y2="290" stroke="var(--ink)" stroke-width="2"/><line x1="80" y1="290" x2="680" y2="290" stroke="var(--ink)" stroke-width="2"/>
      ${T(24, 50, 'drag')}${T(676, 284, 'EAS', { a: 'end' })}
      <path d="${curve(dp, 0.2, 2.2)}" fill="none" stroke="var(--h2i)" stroke-width="2.4"/>
      <path d="${curve(di, 0.41, 2.2)}" fill="none" stroke="var(--h0i)" stroke-width="2.4"/>
      <path d="${curve(tot, 0.65, 2.15)}" fill="none" stroke="var(--ink)" stroke-width="3.4" class="anim-draw" pathLength="1000"/>
      <line x1="80" y1="290" x2="${X(2.0)}" y2="${Y(td * 2.0 / tv)}" stroke="var(--h4i)" stroke-width="1.6"/>
      ${vl(0.76, 'VMP', 'var(--h1i)')}${vl(1, 'VMD', 'var(--warn)')}${vl(tv, '1.32 VMD', 'var(--h4i)')}
      ${T(X(2.15), Y(tot(2.15)) - 10, 'total drag', { a: 'end', s: 14, w: 800 })}
      ${T(X(2.2), Y(dp(2.2)) + 26, 'parasite ∝ V²', { a: 'end', c: 'var(--h2i)' })}
      ${T(X(0.47) + 10, 56, 'induced ∝ 1/V²', { c: 'var(--h0i)' })}
      ${T(X(1.75), Y(td * 1.75 / tv) + 26, 'tangent from origin', { a: 'middle', w: 600, c: 'var(--h4i)' })}
      ${T(X(1) + 10, Y(1) + 34, 'Dp = Di', { w: 600, c: 'var(--warn)' })}
      <rect x="20" y="326" width="660" height="66" rx="12" fill="var(--wash)"/>
      ${T(34, 346, 'VMP = 0.76 VMD: least power → prop endurance, minimum sink (glide endurance)', { w: 600, c: 'var(--h1i)' })}
      ${T(34, 366, 'VMD: least drag, best L/D (≈ 4°) → RAGE: prop Range, Angle of climb, Glide range, jet Endurance', { w: 600, c: 'var(--warn)' })}
      ${T(34, 386, '1.32 VMD: best EAS ÷ drag → jet range', { w: 600, c: 'var(--h4i)' })}
    </svg>`;
  };
})();

/* ---- Ch 3 · Stalls and spins ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR, aerofoil } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');
  // side view of a T-tail jet, nose to the right, local origin at the wing; rot in SVG degrees (negative = nose up)
  const jet = (x, y, rot, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M-128 -10 L95 -12 Q135 -8 140 4 Q132 12 95 12 L-110 10 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M-120 -9 L-138 -70 L-112 -70 L-88 -11 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <rect x="-150" y="-76" width="54" height="8" rx="4" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>
      <path d="M30 2 L-38 6 L-46 2 L-38 -2 Z" fill="var(--h3)" stroke="var(--h3i)" stroke-width="2"/></g>`;
  const rot = (x, y, deg) => { const a = deg * Math.PI / 180; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; };

  F['deep-stall'] = () => {
    const wake = (x0, y0, dx, dy, len) => { const n = 30, nx = -dy, ny = dx; const top = [], bot = [];
      for (let i = 0; i <= n; i++) { const t = i / n, w = 6 + 16 * t, wob = Math.sin(t * 22) * 3; top.push([x0 + dx * len * t + nx * (w + wob), y0 + dy * len * t + ny * (w + wob)]); bot.push([x0 + dx * len * t - nx * (w - wob), y0 + dy * len * t - ny * (w - wob)]); }
      return `<path d="${P(top.concat(bot.reverse()))} Z" fill="var(--warn)" opacity=".22"/><path d="${P(top)}" fill="none" stroke="var(--warn)" stroke-width="1.2" stroke-dasharray="3 3"/>`; };
    const [tex, tey] = rot(-40, 4, -30);
    const d = [-Math.cos(20 * Math.PI / 180), -Math.sin(20 * Math.PI / 180)];
    return `<svg viewBox="0 0 700 340">
      ${T(175, 30, 'Before the stall', { a: 'middle', s: 14, w: 800 })}${T(525, 30, 'Deep stall', { a: 'middle', s: 14, w: 800, c: 'var(--warn)' })}
      <line x1="350" y1="44" x2="350" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${wake(175 - 40, 175, -1, 0, 120)}${jet(190, 170, -4, 0.95)}
      ${AR(330, 236, 280, 236, 'var(--m-cold)', 2)}${T(326, 258, 'relative airflow', { a: 'end', w: 600, c: 'var(--m-cold)' })}
      ${T(20, 60, 'T-tail in clean air,', { w: 600 })}${T(20, 78, 'above the wing wake', { w: 600 })}
      ${T(175, 288, 'elevator effective', { a: 'middle', c: 'var(--ok)' })}
      ${wake(555 + tex * 0.8, 180 + tey * 0.8, d[0], d[1], 140)}${jet(555, 180, -30, 0.8)}
      ${AR(690, 268, 630, 246, 'var(--m-cold)', 2)}${AR(690, 296, 630, 274, 'var(--m-cold)', 2)}${T(690, 320, 'airflow from below', { a: 'end', w: 600, c: 'var(--m-cold)' })}
      ${AR(372, 76, 440, 100, 'var(--ink)', 2.4)}${T(368, 62, 'flight path sinking', { w: 600 })}
      ${T(372, 236, 'tail blanketed', { c: 'var(--warn)' })}${T(372, 254, 'by the wake', { c: 'var(--warn)' })}
      ${T(372, 288, 'elevator ineffective', { c: 'var(--warn)' })}
      ${T(20, 320, 'Swept wing: CP stays forward → nose up. Cure: stick pusher.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['autorotation'] = () => {
    const X = a => 60 + a / 26 * 300, Y = c => 250 - c / 1.8 * 200;
    const cl = a => a <= 15 ? 0.1 * a : 1.5 - 0.07 * (a - 15);
    const cd = a => a <= 14 ? 0.08 + 0.002 * a * a : 0.47 + 0.09 * (a - 14) * 1.6;
    const pts = f => P([...Array(53)].map((_, i) => { const a = i * 0.5; return [X(a), Y(Math.min(1.75, f(a)))]; }));
    const r = 12, dn = 20;
    return `<svg viewBox="0 0 700 330">
      <line x1="60" y1="40" x2="60" y2="250" stroke="var(--ink)" stroke-width="2"/><line x1="60" y1="250" x2="370" y2="250" stroke="var(--ink)" stroke-width="2"/>
      ${T(366, 272, 'angle of attack', { a: 'end', w: 600 })}
      <line x1="${X(15)}" x2="${X(15)}" y1="40" y2="250" stroke="var(--muted)" stroke-dasharray="4 4"/>${T(X(15), 290, 'stall', { a: 'middle', c: 'var(--muted)' })}
      <path d="${pts(cl)}" fill="none" stroke="var(--ok)" stroke-width="3"/>${T(X(6), Y(cl(6)) - 14, 'CL', { c: 'var(--ok)', s: 14 })}
      <path d="${pts(cd)}" fill="none" stroke="var(--warn)" stroke-width="3"/>${T(X(24), Y(1.62) - 2, 'CD', { a: 'end', c: 'var(--warn)', s: 14 })}
      <circle cx="${X(r)}" cy="${Y(cl(r))}" r="7" fill="var(--h0i)"/>${T(X(r) - 10, Y(cl(r)) - 12, 'rising wing', { a: 'end', c: 'var(--h0i)' })}
      <circle cx="${X(dn)}" cy="${Y(cl(dn))}" r="7" fill="var(--h2i)"/>${T(X(dn) + 10, Y(cl(dn)) - 12, 'down-going wing', { c: 'var(--h2i)' })}
      <circle cx="${X(dn)}" cy="${Y(cd(dn))}" r="6" fill="var(--h2i)"/>
      ${AR(X(r) + 8, Y(cl(r)) + 4, X(dn) - 9, Y(cl(dn)) - 3, 'var(--ink)', 1.6)}
      <g transform="translate(540 150) rotate(18)">
        <rect x="-130" y="-5" width="260" height="10" rx="5" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/><circle r="17" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      </g>
      ${AR(660, 160, 660, 116, 'var(--m-cold)', 2.4)}${AR(420, 128, 420, 172, 'var(--m-cold)', 2.4)}
      ${T(540, 40, 'Seen from behind, rolling right', { a: 'middle', s: 14, w: 800 })}
      ${T(445, 212, 'rising: AoA ↓', { a: 'middle', c: 'var(--h0i)' })}${T(445, 230, 'more lift, less drag', { a: 'middle', w: 600, c: 'var(--h0i)' })}
      ${T(610, 212, 'down-going: AoA ↑', { a: 'middle', c: 'var(--h2i)' })}${T(610, 230, 'less lift, more drag', { a: 'middle', w: 600, c: 'var(--h2i)' })}
      ${T(540, 280, 'Roll and yaw both towards the low wing → spin', { a: 'middle', c: 'var(--warn)' })}
      ${T(540, 306, 'Don’t lift it with aileron: use rudder', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['spin-helix'] = () => {
    const ax = 180, R = 100, top = 40, pitch = 80, N = 360, tmax = 6 * Math.PI;
    const at = t => [ax + R * Math.sin(t), top + pitch * t / (2 * Math.PI) + 24 * Math.cos(t)];
    const pts = [...Array(N + 1)].map((_, i) => at(i / N * tmax));
    const seg = (cond, style) => { let s = '', run = []; pts.forEach((p, i) => { if (cond(i / N * tmax)) run.push(p); else { if (run.length > 1) s += `<path d="${P(run)}" ${style}/>`; run = []; } }); if (run.length > 1) s += `<path d="${P(run)}" ${style}/>`; return s; };
    const [p1x, p1y] = at(Math.PI / 2), [, p2y] = at(2.5 * Math.PI), [px, py] = at(4.5 * Math.PI);
const cx = 520, cy = 175;
    return `<svg viewBox="0 0 700 340">
      <line x1="${ax}" y1="24" x2="${ax}" y2="320" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="6 5"/>${T(ax + 6, 22, 'spin axis', { w: 600, c: 'var(--muted)' })}
      ${seg(t => Math.cos(t) <= 0, 'fill="none" stroke="var(--m-cold)" stroke-width="2" opacity=".35"')}
      ${seg(t => Math.cos(t) > 0, 'fill="none" stroke="var(--m-cold)" stroke-width="3"')}
      ${G.FH.plane(px, py, 1.3, 75, 'var(--ink)')}
      <line x1="${ax}" y1="${p1y}" x2="${p1x}" y2="${p1y}" stroke="var(--h2i)" stroke-width="2"/>${T(ax - 8, p1y + 5, 'c = radius', { a: 'end', c: 'var(--h2i)' })}
      <line x1="${p1x + 16}" y1="${p1y}" x2="${p1x + 16}" y2="${p2y}" stroke="var(--h4i)" stroke-width="2.4"/>
      ${T(p1x + 24, (p1y + p2y) / 2 - 4, 'p = height', { c: 'var(--h4i)' })}${T(p1x + 24, (p1y + p2y) / 2 + 14, 'lost per turn', { c: 'var(--h4i)' })}
      ${T(20, 330, 'Helix angle: tan θ = p ÷ c', { s: 14 })}
      <line x1="360" y1="40" x2="360" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(530, 34, 'Forces in a steady spin', { a: 'middle', s: 14, w: 800 })}
      <circle cx="${cx}" cy="${cy}" r="9" fill="var(--ink)"/>
      ${AR(cx, cy, cx, cy + 105, 'var(--warn)', 3)}${T(cx + 10, cy + 100, 'weight', { c: 'var(--warn)' })}
      ${AR(cx, cy, cx, cy - 100, 'var(--h4i)', 3)}${T(cx + 10, cy - 88, 'drag ≈ weight', { c: 'var(--h4i)' })}
      ${AR(cx, cy, cx - 120, cy, 'var(--ok)', 3)}${T(cx - 14, cy - 12, 'lift, towards axis', { a: 'end', c: 'var(--ok)' })}
      ${T(cx - 14, cy + 26, '= W V² ÷ g R', { a: 'end', w: 600, c: 'var(--ok)' })}
      ${T(380, 300, 'Wings stalled, one more than the other;', { w: 600, c: 'var(--muted)' })}${T(380, 318, 'steady after about 2 turns.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 4 · Aerofoils, wings, high-lift devices ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['wing-planforms'] = () => {
    const cells = [
      ['Elliptical', 'least Di; stalls all at once', t => 62 * Math.sqrt(Math.max(0, 1 - t * t)), 0, [0, 1], 'all'],
      ['Rectangular', 'root stalls first ✓', () => 52, 0, [0, 0.38]],
      ['Moderate taper 0.5', 'close to elliptical', t => 60 * (1 - 0.5 * t), 0, [0.3, 0.7]],
      ['High taper 0.25', 'tip-stall tendency', t => 66 * (1 - 0.75 * t), 0, [0.55, 0.95]],
      ['Pointed tip', 'tip always stalled', t => 66 * (1 - t), 0, [0.78, 1]],
      ['Swept back', 'tip stall → pitch-up', t => 58 * (1 - 0.5 * t), 0.75, [0.62, 1]],
    ];
    const body = cells.map(([name, note, chord, sweep, [a, b], all], i) => {
      const col = i % 3, row = Math.floor(i / 3), x0 = 26 + col * 228, cy = 92 + row * 160, span = 180;
      const le = t => [x0 + t * span, cy - chord(t) * 0.4 + sweep * t * 70], te = t => [x0 + t * span, cy + chord(t) * 0.6 + sweep * t * 70];
      const ts = n => [...Array(n + 1)].map((_, k) => k / n);
      const outline = P(ts(40).map(le).concat(ts(40).reverse().map(te))) + ' Z';
      const patch = P(ts(20).map(t => le(a + (b - a) * t)).concat(ts(20).reverse().map(t => te(a + (b - a) * t)))) + ' Z';
      return `<path d="${outline}" fill="var(--h${i % 6})" stroke="var(--h${i % 6}i)" stroke-width="2"/>
        <path d="${patch}" fill="var(--warn)" opacity="${all ? 0.22 : 0.4}"/>
        <line x1="${x0}" y1="${cy - 44}" x2="${x0}" y2="${cy + 48}" stroke="var(--ink)" stroke-width="3"/>
        ${T(x0 + 92, cy - 52 - (row ? 4 : 0), name, { a: 'middle', s: 14, w: 800 })}${T(x0 + 92, cy + 66 + (sweep ? 6 : 0), note, { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    }).join('');
    return `<svg viewBox="0 0 700 360">${body}
      <rect x="230" y="336" width="18" height="12" fill="var(--warn)" opacity=".4"/>${T(256, 347, 'where the stall starts (thick line = root)', { w: 600 })}
    </svg>`;
  };

  F['sweep-components'] = () => {
    const rLE = [130, 70], tLE = [430, 250], rTE = [130, 182], tTE = [430, 306];
    const u = [0.857, 0.514], n = [-0.514, 0.857], O = [292, 40], V = 116;
    const vn = [n[0] * V * 0.857, n[1] * V * 0.857], vu = [u[0] * V * 0.514, u[1] * V * 0.514];
    return `<svg viewBox="0 0 700 340">
      <rect x="96" y="20" width="34" height="310" rx="17" fill="var(--wash)" stroke="var(--wire)" stroke-width="2"/>
      <path d="M${rLE} L${tLE} L${tTE} L${rTE} Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2.2"/>
      <path d="M${[370, 214]} L${tLE} L${tTE} L${[370, 280]} Z" fill="var(--warn)" opacity=".3"/>
      ${T(452, 296, 'tip stall', { c: 'var(--warn)' })}
      <line x1="130" y1="70" x2="250" y2="70" stroke="var(--muted)" stroke-dasharray="4 4" stroke-width="1.6"/>
      <path d="M220 70 A90 90 0 0 1 207 116" fill="none" stroke="var(--ink)" stroke-width="1.8"/>${T(226, 100, 'Λ', { s: 16 })}
      ${AR(O[0], O[1], O[0], O[1] + V, 'var(--ink)', 3)}${T(O[0] + 8, O[1] + 4, 'V (free stream)', { w: 700 })}
      ${AR(O[0], O[1], O[0] + vn[0], O[1] + vn[1], 'var(--ok)', 3)}
      ${AR(O[0], O[1], O[0] + vu[0], O[1] + vu[1], 'var(--h4i)', 3)}
      <line x1="${O[0] + vn[0]}" y1="${O[1] + vn[1]}" x2="${O[0]}" y2="${O[1] + V}" stroke="var(--muted)" stroke-dasharray="3 3"/>
      <line x1="${O[0] + vu[0]}" y1="${O[1] + vu[1]}" x2="${O[0]}" y2="${O[1] + V}" stroke="var(--muted)" stroke-dasharray="3 3"/>
      ${[0.25, 0.45, 0.65].map(t => { const x = 130 + t * 300, y = 182 + t * 124 - 22; return AR(x, y, x + 46, y + 19, 'var(--h4i)', 2); }).join('')}
      ${T(470, 54, 'V cos Λ', { s: 15, w: 800, c: 'var(--ok)' })}${T(470, 74, 'at right angles to the LE:', { w: 600 })}${T(470, 92, 'makes the lift and sets', { w: 600 })}${T(470, 110, 'the local Mach number', { w: 600 })}
      ${T(470, 146, 'V sin Λ', { s: 15, w: 800, c: 'var(--h4i)' })}${T(470, 166, 'along the span: no lift;', { w: 600 })}${T(470, 184, 'drags the boundary layer', { w: 600 })}${T(470, 202, 'out to the tips', { w: 600 })}
      ${T(150, 330, 'Result: higher critical Mach, but lower CLmax, higher Vs and tip stall.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['high-lift-devices'] = () => {
    const t = 0.12, m = 0.04, p = 0.4;
    const yt = x => 5 * t * (0.2969 * Math.sqrt(Math.max(x, 0)) - 0.126 * x - 0.3516 * x * x + 0.2843 * x ** 3 - 0.1036 * x ** 4);
    const yc = x => x < p ? m / (p * p) * (2 * p * x - x * x) : m / ((1 - p) ** 2) * ((1 - 2 * p) + 2 * p * x - x * x);
    const xs = (a, b, n = 24) => [...Array(n + 1)].map((_, i) => a + (b - a) * i / n);
    const piece = (a, b) => xs(a, b).map(x => [x, yc(x) + yt(x)]).concat(xs(a, b).reverse().map(x => [x, yc(x) - yt(x)]));
    const rot = (pts, hx, hy, deg, dx = 0, dy = 0) => { const r = -deg * Math.PI / 180; return pts.map(([x, y]) => [hx + (x - hx) * Math.cos(r) - (y - hy) * Math.sin(r) + dx, hy + (x - hx) * Math.sin(r) + (y - hy) * Math.cos(r) + dy]); };
    const cells = [
      ['Plain flap', 'adds camber', () => [piece(0, 0.72), rot(piece(0.72, 1), 0.72, yc(0.72), 25)]],
      ['Split flap', 'lower skin only: big drag', () => [piece(0, 1), rot([[0.66, yc(0.66) - yt(0.66)], [1, yc(1) - yt(1) + 0.004], [1, yc(1) - yt(1) - 0.006], [0.66, yc(0.66) - yt(0.66) - 0.012]], 0.66, yc(0.66) - yt(0.66), 32)]],
      ['Slotted flap', 'camber + slot', () => [piece(0, 0.74), rot(piece(0.74, 1), 0.76, yc(0.76), 28, 0.02, -0.03)], [0.72, -0.04, 0.82, -0.005]],
      ['Fowler flap', 'area + camber: most CLmax', () => [piece(0, 0.72), rot(piece(0.72, 1), 0.72, yc(0.72), 26, 0.1, -0.035)], [0.66, -0.07, 0.8, -0.03]],
      ['Slat', 'slot energises BL; stall AoA ↑', () => [piece(0.13, 1), rot(piece(0, 0.13), 0.13, 0, 18, -0.05, -0.02)], [-0.06, -0.08, 0.06, 0.04]],
      ['Krueger flap', 'LE camber, no slot', () => [piece(0, 1), [[0.18, yc(0.18) - yt(0.18)], [-0.07, -0.1], [-0.08, -0.085], [0.18, yc(0.18) - yt(0.18) + 0.006]]]],
    ];
    const body = cells.map(([name, note, build, flow], i) => {
      const col = i % 3, row = Math.floor(i / 3), cx = 34 + col * 228, cy = 92 + row * 160, L = 168;
      const S = pts => P(pts.map(([x, y]) => [cx + x * L, cy - y * L])) + ' Z';
      const [main, extra] = build();
      return `<path d="${S(main)}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
        <path d="${S(extra)}" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>
        ${flow ? AR(cx + flow[0] * L, cy - flow[1] * L, cx + flow[2] * L, cy - flow[3] * L, 'var(--m-cold)', 2) : ''}
        ${T(cx + 84, cy - 46, name, { a: 'middle', s: 14, w: 800 })}${T(cx + 84, cy + 62, note, { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    }).join('');
    return `<svg viewBox="0 0 700 340">${body}
      ${T(350, 334, 'Blue arrows: air through the slot re-energising the boundary layer.', { a: 'middle', w: 600, c: 'var(--m-cold)' })}
    </svg>`;
  };
})();

/* ---- Ch 5 · Stability ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR, aerofoil } = G.HB;

  F['static-stability'] = () => {
    const panel = (cx, kind, title, note, hue) => {
      const y0 = 170;
      const d = kind === 'pos' ? `M${cx - 95} ${y0 - 60} Q${cx} ${y0 + 70} ${cx + 95} ${y0 - 60}` : kind === 'neu' ? `M${cx - 100} ${y0} L${cx + 100} ${y0}` : `M${cx - 95} ${y0 + 40} Q${cx} ${y0 - 90} ${cx + 95} ${y0 + 40}`;
      const by = kind === 'pos' ? y0 - 6 : kind === 'neu' ? y0 - 14 : y0 - 39;
      const bx = kind === 'pos' ? cx + 44 : kind === 'neu' ? cx + 30 : cx + 22;
      const ay = kind === 'pos' ? by - 26 : by - 22;
      const arrow = kind === 'pos' ? AR(bx - 8, ay, cx + 4, ay + 10, 'var(--ok)', 2.4) : kind === 'neu' ? `<text x="${bx}" y="${ay + 4}" text-anchor="middle" style="font:800 15px var(--font);fill:var(--muted)">stays</text>` : AR(bx + 10, ay + 4, bx + 50, ay + 26, 'var(--warn)', 2.4);
      return `<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="${cx}" cy="${kind === 'pos' ? y0 + 4 : kind === 'neu' ? y0 - 14 : y0 - 34}" r="13" fill="none" stroke="var(--muted)" stroke-dasharray="3 3"/>
        <circle cx="${bx}" cy="${by}" r="13" fill="var(--${hue})" stroke="var(--${hue}i)" stroke-width="2.4"/>${arrow}
        ${T(cx, 40, title, { a: 'middle', s: 15, w: 800, c: `var(--${hue}i)` })}
        ${T(cx, 262, note[0], { a: 'middle', w: 600 })}${T(cx, 282, note[1], { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    };
    return `<svg viewBox="0 0 700 310">
      ${panel(117, 'pos', 'Positive', ['returns towards', 'equilibrium'], 'h1')}
      ${panel(350, 'neu', 'Neutral', ['stays where', 'it was displaced'], 'h4')}
      ${panel(583, 'neg', 'Negative', ['keeps moving', 'away: unstable'], 'h2')}
      ${T(350, 304, 'dashed = where it started', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['pitch-balance'] = () => {
    const W = 250, CG = 300, TL = 590, y = 170;
    return `<svg viewBox="0 0 700 340">
      <path d="M80 ${y} Q90 ${y - 18} 130 ${y - 20} L610 ${y - 10} L640 ${y - 70} L660 ${y - 70} L650 ${y + 4} L130 ${y + 16} Q88 ${y + 14} 80 ${y} Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="${aerofoil(212, y + 2, 92, 2).d}" fill="var(--h3)" stroke="var(--h3i)" stroke-width="2"/>
      <path d="${aerofoil(560, y - 6, 62, 0, true).d}" fill="var(--h3)" stroke="var(--h3i)" stroke-width="2"/>
      <circle cx="${CG}" cy="${y}" r="10" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/><path d="M${CG} ${y - 10} A10 10 0 0 1 ${CG + 10} ${y} L${CG} ${y} Z M${CG} ${y + 10} A10 10 0 0 1 ${CG - 10} ${y} L${CG} ${y} Z" fill="var(--ink)"/>
      ${T(CG, y + 36, 'CG', { a: 'middle' })}
      <circle cx="${W}" cy="${y}" r="5" fill="var(--h1i)"/><circle cx="${TL - 14}" cy="${y - 6}" r="5" fill="var(--h1i)"/>
      ${AR(W, y - 8, W, y - 92, 'var(--ok)', 3)}${T(W - 8, y - 98, 'wing ΔL: nose-up', { a: 'end', c: 'var(--ok)' })}
      ${AR(TL - 14, y - 14, TL - 14, y - 84, 'var(--ok)', 3)}${T(TL - 24, y - 92, 'tail ΔL: nose-down', { a: 'end', c: 'var(--ok)' })}
      ${[150, 260, 370, 480, 590].map(x => AR(x - 20, 300, x, 262, 'var(--m-cold)', 1.8)).join('')}${T(20, 296, 'up-gust', { c: 'var(--m-cold)' })}
      <path d="M${W} ${y + 52} L${W} ${y + 60} L${CG} ${y + 60} L${CG} ${y + 52}" fill="none" stroke="var(--h2i)" stroke-width="2"/>${T((W + CG) / 2, y + 78, 'short arm', { a: 'middle', c: 'var(--h2i)' })}
      <path d="M${CG} ${y + 52} L${CG} ${y + 60} L${TL - 14} ${y + 60} L${TL - 14} ${y + 52}" fill="none" stroke="var(--h4i)" stroke-width="2"/>${T(470, y + 78, 'long tail arm', { a: 'middle', c: 'var(--h4i)' })}
      <rect x="282" y="34" width="60" height="12" rx="6" fill="var(--h1)" stroke="var(--h1i)"/>${T(312, 26, 'CG range', { a: 'middle', w: 600, c: 'var(--h1i)' })}
      <line x1="372" y1="28" x2="372" y2="52" stroke="var(--warn)" stroke-width="3"/>${T(380, 46, 'neutral point', { c: 'var(--warn)' })}
      <path d="M342 60 L342 66 L372 66 L372 60" fill="none" stroke="var(--ink)" stroke-width="1.6"/>${T(357, 84, 'static margin', { a: 'middle', w: 600 })}
      ${T(20, 330, 'Tail moment > wing moment → nose goes back down: positive longitudinal stability.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['dihedral-effect'] = () => {
    const cx = 330, cy = 170, bank = 18;
    return `<svg viewBox="0 0 700 330">
      ${T(330, 30, 'Seen from behind: banked right, slipping right', { a: 'middle', s: 14, w: 800 })}
      <g transform="translate(${cx} ${cy}) rotate(${bank})">
        <path d="M-20 -4 L-230 -40 L-232 -30 L-20 8 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
        <path d="M20 -4 L230 -40 L232 -30 L20 8 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
        <circle r="26" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
        <path d="M-4 -26 L-4 -70 L4 -70 L4 -26 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      </g>
      ${[0, 1, 2].map(i => AR(690, 210 + i * 26, 610, 210 + i * 26 - 18, 'var(--m-cold)', 2.4)).join('')}
      ${T(690, 300, 'sideslip airflow', { a: 'end', c: 'var(--m-cold)' })}
      ${AR(535, 300, 535, 252, 'var(--ok)', 3)}${T(520, 320, 'low wing: more AoA, more lift', { a: 'end', w: 700, c: 'var(--ok)' })}
      ${T(24, 150, 'high wing: less AoA,', { w: 600, c: 'var(--muted)' })}${T(24, 168, 'less lift', { w: 600, c: 'var(--muted)' })}
      <path d="M470 100 A150 150 0 0 0 330 50" fill="none" stroke="var(--ok)" stroke-width="2.6"/>${AR(352, 50, 330, 50, 'var(--ok)', 2.6)}
      ${T(470, 86, 'restoring roll', { c: 'var(--ok)' })}
    </svg>`;
  };
})();

/* ---- Ch 6 · Flight controls ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');
  // symmetric section pieces in chord units, rotated about a hinge (deg > 0 = trailing edge down)
  const yt = x => 0.6 * (0.2969 * Math.sqrt(Math.max(x, 0)) - 0.126 * x - 0.3516 * x * x + 0.2843 * x ** 3 - 0.1036 * x ** 4);
  const xs = (a, b, n = 20) => [...Array(n + 1)].map((_, i) => a + (b - a) * i / n);
  const piece = (a, b) => xs(a, b).map(x => [x, yt(x)]).concat(xs(a, b).reverse().map(x => [x, -yt(x)]));
  const rot = (pts, hx, deg) => { const r = -deg * Math.PI / 180; return pts.map(([x, y]) => [hx + (x - hx) * Math.cos(r) - y * Math.sin(r), (x - hx) * Math.sin(r) + y * Math.cos(r)]); };
  const draw = (pts, cx, cy, L, fill, stroke) => `<path d="${P(pts.map(([x, y]) => [cx + x * L, cy - y * L]))} Z" fill="var(--${fill})" stroke="var(--${stroke})" stroke-width="2"/>`;

  F['adverse-yaw'] = () => `<svg viewBox="0 0 700 340">
      ${T(230, 24, 'Rolling right (seen from above)', { a: 'middle', s: 14, w: 800 })}
      <rect x="40" y="130" width="380" height="46" rx="10" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <ellipse cx="230" cy="170" rx="20" ry="125" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <rect x="170" y="262" width="120" height="22" rx="8" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <rect x="52" y="176" width="96" height="14" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>
      <rect x="312" y="176" width="96" height="14" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>
      ${AR(100, 196, 100, 268, 'var(--warn)', 3.4)}${AR(360, 196, 360, 218, 'var(--warn)', 2.4)}
      ${T(30, 112, 'left aileron DOWN:', { c: 'var(--h2i)' })}${T(30, 128, 'more lift + more drag', { w: 600, c: 'var(--h2i)' })}
      ${T(430, 112, 'right aileron UP', { a: 'end', c: 'var(--h4i)' })}
      ${T(110, 290, 'big induced drag', { c: 'var(--warn)' })}${T(370, 240, 'small drag', { c: 'var(--warn)' })}
      <path d="M262 52 Q230 26 198 52" fill="none" stroke="var(--warn)" stroke-width="3"/>${AR(206, 44, 196, 54, 'var(--warn)', 3)}
      ${T(270, 58, 'nose yaws LEFT,', { c: 'var(--warn)' })}${T(270, 74, 'away from the turn', { w: 600, c: 'var(--warn)' })}
      <line x1="460" y1="30" x2="460" y2="320" stroke="var(--line)" stroke-width="2"/>
      ${T(580, 30, 'Cures', { a: 'middle', s: 14, w: 800 })}
      ${draw(piece(0, 0.74), 482, 82, 120, 'h0', 'h0i')}${draw(rot(piece(0.74, 1), 0.74, -28), 482, 82, 120, 'h4', 'h4i')}
      ${draw(piece(0, 0.74), 482, 132, 120, 'h0', 'h0i')}${draw(rot(piece(0.74, 1), 0.74, 12), 482, 132, 120, 'h2', 'h2i')}
      ${T(612, 84, 'up: big angle', { w: 600 })}${T(612, 140, 'down: small', { w: 600 })}${T(482, 176, 'Differential ailerons', { c: 'var(--h1i)' })}
      ${draw(piece(0, 0.7), 482, 236, 120, 'h0', 'h0i')}${draw(rot(piece(0.66, 1), 0.72, -22), 482, 236, 120, 'h4', 'h4i')}
      ${AR(560, 278, 568, 252, 'var(--warn)', 2)}${T(578, 284, 'nose drops into', { w: 600, c: 'var(--warn)' })}${T(578, 300, 'the airflow: drag', { w: 600, c: 'var(--warn)' })}
      ${T(482, 326, 'Frise aileron (up-going)', { c: 'var(--h1i)' })}
    </svg>`;

  F['control-tabs'] = () => {
    const cells = [
      ['Balance tab', 'moves opposite, by linkage', 'lighter, less effective', 15, -22],
      ['Anti-balance tab', 'moves the same way', 'heavier, more effective', 15, 18],
      ['Servo tab', 'pilot moves only the tab', 'tab flies the surface', 15, -24],
      ['Trim tab', 'set by trim wheel, opposite', 'zero stick force', 15, -18],
    ];
    const body = cells.map(([name, how, res, surf, tab], i) => {
      const col = i % 2, row = Math.floor(i / 2), cx = 30 + col * 345, cy = 96 + row * 150, L = 230;
      const sPts = rot(piece(0.62, 0.9), 0.62, surf);
      const hinge2 = rot([[0.9, 0]], 0.62, surf)[0];
      const tabPts = rot(rot(piece(0.9, 1), 0.9, tab), 0.62, surf).map(p => p);
      const tabDraw = rot(piece(0.9, 1), 0.9, tab).map(([x, y]) => [x, y]);
      const tabWorld = rot(tabDraw, 0.62, surf);
      return `${draw(piece(0, 0.62), cx, cy, L, 'h0', 'h0i')}${draw(sPts, cx, cy, L, 'h1', 'h1i')}${draw(tabWorld, cx, cy, L, 'h2', 'h2i')}
        <circle cx="${cx + 0.62 * L}" cy="${cy}" r="4" fill="var(--ink)"/><circle cx="${cx + hinge2[0] * L}" cy="${cy - hinge2[1] * L}" r="3.5" fill="var(--ink)"/>
        ${T(cx, cy - 46, name, { s: 15, w: 800 })}${T(cx, cy + 56, how, { w: 600 })}${T(cx, cy + 74, res, { w: 600, c: 'var(--muted)' })}`;
    }).join('');
    return `<svg viewBox="0 0 700 340">${body}
      <rect x="540" y="10" width="14" height="12" fill="var(--h1)" stroke="var(--h1i)"/>${T(560, 21, 'surface', { w: 600 })}
      <rect x="630" y="10" width="14" height="12" fill="var(--h2)" stroke="var(--h2i)"/>${T(650, 21, 'tab', { w: 600 })}
    </svg>`;
  };

  F['hinge-balance'] = () => {
    const ins = 30, cy = 120, L = 200;
    return `<svg viewBox="0 0 700 330">
      ${T(ins, 36, 'Inset hinge', { s: 15, w: 800 })}
      ${draw(piece(0, 0.6), ins, cy, L, 'h0', 'h0i')}${draw(rot(piece(0.56, 1), 0.68, 16), ins, cy, L, 'h1', 'h1i')}
      <circle cx="${ins + 0.68 * L}" cy="${cy}" r="4.5" fill="var(--ink)"/>
      ${AR(ins + 0.68 * L, cy + 40, ins + 0.68 * L, cy + 8, 'var(--ink)', 1.6)}${T(ins + 0.68 * L, cy + 56, 'hinge set back', { a: 'middle', w: 600 })}
      ${T(ins, cy + 80, 'area ahead of hinge helps;', { w: 600, c: 'var(--muted)' })}${T(ins, cy + 98, 'limit 20–25% of chord', { w: 600, c: 'var(--muted)' })}
      <line x1="250" y1="30" x2="250" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(270, 36, 'Horn balance (rudder)', { s: 15, w: 800 })}
      <path d="M300 80 L380 80 L380 260 L300 260 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M380 110 L380 260 L440 260 L440 150 L400 70 L360 70 L360 110 Z" fill="var(--h1)" stroke="var(--h1i)" stroke-width="2"/>
      <line x1="380" y1="56" x2="380" y2="280" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="5 4"/>${T(386, 296, 'hinge line', { w: 600 })}
      ${AR(330, 52, 368, 86, 'var(--warn)', 1.8)}${T(270, 52, 'horn ahead', { w: 600, c: 'var(--warn)' })}
      <line x1="470" y1="30" x2="470" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(490, 36, 'Mass balance', { s: 15, w: 800 })}
      ${draw(piece(0, 0.55), 470, cy, 240, 'h0', 'h0i')}${draw(rot(piece(0.55, 0.95), 0.6, 10), 470, cy, 240, 'h1', 'h1i')}
      <line x1="${470 + 0.6 * 240}" y1="${cy}" x2="${470 + 0.47 * 240}" y2="${cy - 2}" stroke="var(--ink)" stroke-width="2.4"/>
      <circle cx="${470 + 0.47 * 240}" cy="${cy - 2}" r="8" fill="var(--ink)"/><circle cx="${470 + 0.6 * 240}" cy="${cy}" r="4" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
      ${T(490, cy + 56, 'weight ahead of the hinge', { w: 600 })}${T(490, cy + 74, 'puts surface CG on the', { w: 600 })}${T(490, cy + 92, 'hinge → no flutter', { w: 600, c: 'var(--ok)' })}
      ${T(20, 322, 'Aerodynamic balance lightens the stick; mass balance stops flutter.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 7 · Flight mechanics ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;

  F['climb-forces'] = () => {
    const th = 20 * Math.PI / 180, c = [300, 180], W = 120;
    const u = [Math.cos(th), -Math.sin(th)], n = [-Math.sin(th), -Math.cos(th)];
    const at = (v, k, o = [0, 0]) => [c[0] + o[0] + v[0] * k, c[1] + o[1] + v[1] * k];
    const L = at(n, W * Math.cos(th)), Th = at(u, 95), D = at(u, -48, [n[0] * 16, n[1] * 16]), Wc = at([-n[0], -n[1]], W * Math.cos(th)), Ws = at(u, -W * Math.sin(th), [-n[0] * 14, -n[1] * 14]);
    const A = (p, col, w = 3, dash = '', o = [0, 0]) => AR(c[0] + o[0], c[1] + o[1], p[0], p[1], col, w, dash);
    return `<svg viewBox="0 0 700 340">
      <line x1="${c[0] - 260 * u[0]}" y1="${c[1] - 260 * u[1]}" x2="${c[0] + 330 * u[0]}" y2="${c[1] + 330 * u[1]}" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="6 5"/>
      <line x1="40" y1="${c[1] + 260 * Math.sin(th) - 0}" x2="200" y2="${c[1] + 260 * Math.sin(th)}" stroke="var(--muted)" stroke-width="1.4"/>
      <path d="M${c[0] - 260 * u[0] + 70} ${c[1] - 260 * u[1]} A70 70 0 0 0 ${c[0] - 260 * u[0] + 70 * Math.cos(th)} ${c[1] - 260 * u[1] - 70 * Math.sin(th)}" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
      ${T(c[0] - 260 * u[0] + 78, c[1] - 260 * u[1] - 6, 'θ climb angle', { w: 600 })}
      ${G.FH.plane(c[0], c[1], 1.6, -20, 'var(--ink)')}
      ${A(L, 'var(--ok)')}${T(L[0] - 8, L[1] - 8, 'Lift = W cos θ', { a: 'end', c: 'var(--ok)' })}
      ${A(Th, 'var(--h0i)')}${T(Th[0] + 6, Th[1] - 6, 'Thrust = D + W sin θ', { c: 'var(--h0i)' })}
      ${AR(c[0] + n[0] * 16, c[1] + n[1] * 16, D[0], D[1], 'var(--h4i)', 3)}${T(D[0] - 8, D[1] - 4, 'Drag', { a: 'end', c: 'var(--h4i)' })}
      ${A([c[0], c[1] + W], 'var(--warn)')}${T(c[0] + 8, c[1] + W + 16, 'Weight', { c: 'var(--warn)' })}
      ${A(Wc, 'var(--warn)', 2, '5 4')}${T(Wc[0] + 8, Wc[1] + 4, 'W cos θ', { w: 600, c: 'var(--warn)' })}
      ${AR(c[0] - n[0] * 14, c[1] - n[1] * 14, Ws[0], Ws[1], 'var(--warn)', 2, '5 4')}${T(Ws[0] - 8, Ws[1] + 16, 'W sin θ', { a: 'end', w: 600, c: 'var(--warn)' })}
      <rect x="470" y="236" width="214" height="90" rx="12" fill="var(--wash)"/>
      ${T(484, 258, 'Lift < Weight')}${T(484, 278, 'Thrust > Drag')}${T(484, 298, 'sin θ = (T − D) ÷ W', { w: 600 })}${T(484, 316, 'ROC = V sin θ', { w: 600 })}
    </svg>`;
  };

  F['turn-forces'] = () => {
    const c = [250, 200], phi = 30 * Math.PI / 180, W = 120, Lm = W / Math.cos(phi);
    const L = [c[0] + Lm * Math.sin(phi), c[1] - Lm * Math.cos(phi)];
    return `<svg viewBox="0 0 700 340">
      ${T(250, 24, 'Seen from behind, 30° bank to the right', { a: 'middle', s: 14, w: 800 })}
      <g transform="translate(${c[0]} ${c[1]}) rotate(30)"><rect x="-150" y="-5" width="300" height="10" rx="5" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/><circle r="18" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/><path d="M-4 -18 L-4 -50 L4 -50 L4 -18 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/></g>
      ${AR(c[0], c[1], L[0], L[1], 'var(--ok)', 3.4)}${T(L[0] + 8, L[1] + 4, 'Lift = W ÷ cos φ', { c: 'var(--ok)' })}
      ${AR(c[0], c[1], c[0], L[1], 'var(--ok)', 2, '5 4')}${T(c[0] - 8, L[1] + 4, 'L cos φ = W', { a: 'end', w: 600, c: 'var(--ok)' })}
      ${AR(c[0], c[1] - 2, L[0], c[1] - 2, 'var(--h4i)', 2.6)}
      ${T(L[0] + 64, c[1] - 30, 'L sin φ = centripetal', { a: 'middle', c: 'var(--h4i)' })}${T(L[0] + 64, c[1] - 12, 'force, towards the turn', { a: 'middle', w: 600, c: 'var(--h4i)' })}
      ${AR(c[0], c[1], c[0], c[1] + W, 'var(--warn)', 3)}${T(c[0] + 8, c[1] + W - 4, 'Weight', { c: 'var(--warn)' })}
      ${AR(c[0] - 4, c[1] + 22, c[0] - 70, c[1] + 22, 'var(--muted)', 2, '4 4')}${T(c[0] - 74, c[1] + 46, 'centrifugal', { a: 'end', w: 600, c: 'var(--muted)' })}
      <line x1="460" y1="40" x2="460" y2="320" stroke="var(--line)" stroke-width="2"/>
      ${T(480, 60, 'n = 1 ÷ cos φ', { s: 16, w: 800 })}
      ${[['30°', '1.15 g'], ['45°', '1.41 g'], ['60°', '2 g'], ['75°', '3.9 g']].map(([b, g], i) => T(480, 92 + i * 22, `${b} bank → ${g}`, { w: 600 })).join('')}
      ${T(480, 200, 'r = V² ÷ (g tan φ)', { s: 15 })}${T(480, 224, 'ω = g tan φ ÷ V', { s: 15 })}
      ${T(480, 256, '2 × TAS → 4 × radius,', { w: 600, c: 'var(--muted)' })}${T(480, 274, '½ the rate of turn', { w: 600, c: 'var(--muted)' })}
      ${T(480, 306, 'Radius does not depend', { w: 600, c: 'var(--muted)' })}${T(480, 324, 'on weight (same TAS, bank)', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 8 · High-speed flight ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR, aerofoil } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['shock-progression'] = () => {
    const cells = [
      ['M 0.75', 'subsonic everywhere', {}],
      ['M 0.81', 'Mcrit: shock forms on top', { top: 0.42, pocket: [0.12, 0.42] }],
      ['M 0.89', 'top shock aft, bottom shock, separation', { top: 0.7, bot: 0.58, pocket: [0.1, 0.7], sep: true }],
      ['M 0.98', 'both shocks at the trailing edge', { top: 1, bot: 1, pocket: [0.08, 1] }],
      ['M 1.2', 'bow wave ahead (detached)', { bow: 'det', top: 1, bot: 1 }],
      ['M 1.4', 'bow wave attached; CP ≈ 50%', { bow: 'att', top: 1, bot: 1 }],
    ];
    const body = cells.map(([m, note, o], i) => {
      const col = i % 2, row = Math.floor(i / 2), cx = 60 + col * 350, cy = 72 + row * 112, L = 200;
      const A = aerofoil(cx, cy, L, 0);
      const up = f => A.up(f), lo = f => A.lo(f);
      let s = '';
      if (o.pocket) { const xs = [...Array(13)].map((_, k) => o.pocket[0] + (o.pocket[1] - o.pocket[0]) * k / 12); const outer = xs.map(f => { const [x, y] = up(f); return [x, y - 26 * Math.sin(Math.PI * (f - o.pocket[0]) / (o.pocket[1] - o.pocket[0]))]; }); s += `<path d="${P(xs.map(up).concat(outer.reverse()))} Z" fill="var(--h2)" opacity=".85"/>`; }
      if (o.top) { const [x, y] = up(Math.min(o.top, 0.995)); s += `<line x1="${x}" y1="${y}" x2="${x + (o.top >= 1 ? 14 : 0)}" y2="${y - 34}" stroke="var(--warn)" stroke-width="3.4"/>`; }
      if (o.bot) { const [x, y] = lo(Math.min(o.bot, 0.995)); s += `<line x1="${x}" y1="${y}" x2="${x + (o.bot >= 1 ? 14 : 0)}" y2="${y + 28}" stroke="var(--warn)" stroke-width="3.4"/>`; }
      if (o.sep) { const [x, y] = up(0.72); s += `<path d="M${x} ${y - 4} q12 -10 22 -2 q10 8 22 -2 q10 -8 22 2" fill="none" stroke="var(--warn)" stroke-width="1.8" stroke-dasharray="3 3"/>`; }
      if (o.bow === 'det') s += `<path d="M${cx - 20} ${cy - 40} Q${cx - 34} ${cy} ${cx - 20} ${cy + 40}" fill="none" stroke="var(--warn)" stroke-width="3.4"/>`;
      if (o.bow === 'att') s += `<line x1="${cx}" y1="${cy}" x2="${cx + 44}" y2="${cy - 40}" stroke="var(--warn)" stroke-width="3.4"/><line x1="${cx}" y1="${cy}" x2="${cx + 44}" y2="${cy + 36}" stroke="var(--warn)" stroke-width="3.4"/>`;
      return `<path d="${A.d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>${s}
        ${T(cx + L + 14, cy - 8, m, { s: 15, w: 800 })}${T(cx - 40, cy + 46, note, { w: 600, c: 'var(--muted)' })}`;
    }).join('');
    return `<svg viewBox="0 0 700 380">${body}
      <rect x="200" y="358" width="16" height="12" fill="var(--h2)"/>${T(222, 369, 'supersonic pocket', { w: 600 })}<line x1="380" y1="364" x2="400" y2="364" stroke="var(--warn)" stroke-width="3.4"/>${T(406, 369, 'shockwave', { w: 600 })}
    </svg>`;
  };

  F['shock-types'] = () => {
    const lines = (x0, ys, f) => ys.map(y => `<path d="${f(y)}" fill="none" stroke="var(--m-cold)" stroke-width="1.8" opacity=".8"/>`).join('');
    return `<svg viewBox="0 0 700 320">
      ${T(115, 30, 'Normal shock', { a: 'middle', s: 15, w: 800 })}
      ${lines(0, [70, 110, 150, 190, 230], y => `M20 ${y} L210 ${y}`)}
      <line x1="115" y1="50" x2="115" y2="250" stroke="var(--warn)" stroke-width="5"/>
      ${T(66, 272, 'M > 1', { a: 'middle' })}${T(166, 272, 'M < 1', { a: 'middle' })}
      ${T(115, 296, 'no change of direction', { a: 'middle', w: 600, c: 'var(--muted)' })}${T(115, 314, 'big energy loss', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="235" y1="40" x2="235" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(350, 30, 'Oblique shock', { a: 'middle', s: 15, w: 800 })}
      <path d="M250 250 L330 250 L460 200 L460 260 L250 260 Z" fill="var(--wash)" stroke="var(--wire)" stroke-width="2"/>
      <line x1="330" y1="250" x2="430" y2="60" stroke="var(--warn)" stroke-width="5"/>
      ${lines(0, [100, 150, 200, 236], y => { const xs = 330 + (250 - y) * 100 / 190; return `M250 ${y} L${xs} ${y} L460 ${y - (460 - xs) * 0.385}`; })}
      ${T(280, 80, 'M > 1', { a: 'middle' })}${T(420, 140, 'turned;', { a: 'middle', w: 600 })}${T(420, 158, 'may stay M > 1', { a: 'middle', w: 600 })}
      ${T(350, 296, 'concave corner', { a: 'middle', w: 600, c: 'var(--muted)' })}${T(350, 314, 'less loss', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="470" y1="40" x2="470" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(585, 30, 'Expansion fan', { a: 'middle', s: 15, w: 800 })}
      <path d="M480 200 L570 200 L690 250 L690 262 L480 262 Z" fill="var(--wash)" stroke="var(--wire)" stroke-width="2"/>
      ${[0, 1, 2, 3].map(k => `<line x1="570" y1="200" x2="${600 + k * 26}" y2="${60 + k * 22}" stroke="var(--ok)" stroke-width="2" stroke-dasharray="5 4"/>`).join('')}
      ${lines(0, [90, 130, 170], y => `M480 ${y} L${560 + (200 - y) * 0.3} ${y} Q${620 + (200 - y) * 0.4} ${y + 6} 690 ${y + 46}`)}
      ${T(510, 72, 'M > 1', { a: 'middle' })}${T(650, 120, 'faster', { a: 'middle', w: 600, c: 'var(--ok)' })}
      ${T(585, 296, 'convex corner', { a: 'middle', w: 600, c: 'var(--muted)' })}${T(585, 314, 'no energy loss', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['vn-envelope'] = () => {
    const X = v => 80 + v / 260 * 560, Y = n => 200 - n * 30;
    const vs = 60, nl = 3.8, va = vs * Math.sqrt(nl), vsn = 82, nn = -1.5, van = vsn * Math.sqrt(-nn), vc = 200, vd = 240;
    const pos = [...Array(41)].map((_, i) => { const v = va * i / 40; return [X(v), Y((v / vs) ** 2)]; });
    const neg = [...Array(21)].map((_, i) => { const v = van * i / 20; return [X(v), Y(-((v / vsn) ** 2))]; });
    return `<svg viewBox="0 0 700 360">
      <path d="${P(pos.concat([[X(vd), Y(nl)], [X(vd), Y(0)], [X(vc), Y(nn)], [X(van), Y(nn)]]).concat(neg.slice().reverse()))} Z" fill="var(--h1)" opacity=".7"/>
      <line x1="80" y1="${Y(0)}" x2="660" y2="${Y(0)}" stroke="var(--ink)" stroke-width="2"/><line x1="80" y1="20" x2="80" y2="${Y(-2.2)}" stroke="var(--ink)" stroke-width="2"/>
      ${[-1, 1, 2, 3, 4, 5].map(n => `<line x1="76" x2="80" y1="${Y(n)}" y2="${Y(n)}" stroke="var(--ink)"/>${T(70, Y(n) + 5, (n > 0 ? '+' : '') + n, { a: 'end', w: 600, c: 'var(--muted)' })}`).join('')}
      ${T(30, 24, 'n (g)', { w: 700 })}${T(656, Y(0) + 22, 'EAS', { a: 'end' })}
      <path d="${P(pos)}" fill="none" stroke="var(--ok)" stroke-width="3"/><path d="${P(neg)}" fill="none" stroke="var(--ok)" stroke-width="3"/>
      <line x1="${X(va)}" y1="${Y(nl)}" x2="${X(vd)}" y2="${Y(nl)}" stroke="var(--h0i)" stroke-width="3"/>
      <line x1="${X(van)}" y1="${Y(nn)}" x2="${X(vc)}" y2="${Y(nn)}" stroke="var(--h0i)" stroke-width="3"/><line x1="${X(vc)}" y1="${Y(nn)}" x2="${X(vd)}" y2="${Y(0)}" stroke="var(--h0i)" stroke-width="3"/>
      <line x1="${X(vd)}" y1="${Y(nl)}" x2="${X(vd)}" y2="${Y(0)}" stroke="var(--warn)" stroke-width="3.4"/>
      <line x1="${X(va)}" y1="${Y(nl * 1.5)}" x2="${X(vd)}" y2="${Y(nl * 1.5)}" stroke="var(--warn)" stroke-width="1.6" stroke-dasharray="6 5"/>
      ${T(X(vd), Y(nl * 1.5) - 8, 'ultimate load = limit × 1.5', { a: 'end', w: 600, c: 'var(--warn)' })}
      ${T(X(vs) + 6, Y(2.6), 'stall: CLmax', { a: 'end', c: 'var(--ok)' })}${T(X(vs) + 6, Y(2.6) + 18, 'boundary', { a: 'end', c: 'var(--ok)' })}
      ${T((X(va) + X(vd)) / 2, Y(nl) - 8, '+ limit load factor', { a: 'middle', c: 'var(--h0i)' })}
      ${T((X(van) + X(vc)) / 2, Y(nn) + 22, '− limit', { a: 'middle', c: 'var(--h0i)' })}
      ${T(X(vd) + 6, Y(2), 'VD', { c: 'var(--warn)', s: 15 })}${T(X(vd) + 6, Y(2) + 18, '+5–10%', { w: 600, c: 'var(--warn)' })}
      <line x1="${X(vs)}" y1="${Y(1)}" x2="${X(vs)}" y2="${Y(0)}" stroke="var(--muted)" stroke-dasharray="3 3"/>${T(X(vs), Y(0) + 20, 'VS', { a: 'middle' })}
      <line x1="${X(va)}" y1="${Y(nl)}" x2="${X(va)}" y2="${Y(0)}" stroke="var(--muted)" stroke-dasharray="3 3"/>${T(X(va), Y(0) + 20, 'VA', { a: 'middle' })}
      ${T(X(vc), Y(0) + 20, 'VC', { a: 'middle', c: 'var(--muted)' })}
      ${T(X(150), Y(1.3), 'normal operations', { a: 'middle', w: 700, c: 'var(--h1i)' })}
      ${T(80, 352, 'Beyond the curve: stall, not overstress. Above the flat top: structural damage.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['aeroelastic'] = () => `<svg viewBox="0 0 700 320">
      ${T(115, 30, 'Aileron reversal', { a: 'middle', s: 15, w: 800 })}
      <path d="${aerofoil(30, 140, 170, -7).d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M190 158 L214 186 L208 190 L182 160 Z" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>
      ${AR(200, 210, 200, 186, 'var(--ok)', 2.4)}${T(206, 226, 'aileron lift', { a: 'middle', w: 600, c: 'var(--ok)' })}
      <path d="M60 96 A70 70 0 0 0 40 150" fill="none" stroke="var(--warn)" stroke-width="2.4"/>${AR(44, 140, 40, 152, 'var(--warn)', 2.4)}
      ${T(20, 82, 'wing twists nose-down', { w: 600, c: 'var(--warn)' })}
      ${T(115, 262, 'tip loses more lift than the', { a: 'middle', w: 600 })}${T(115, 280, 'aileron adds → rolls the wrong way', { a: 'middle', w: 600 })}
      ${T(115, 304, 'cure: inboard ailerons, stiffness', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="235" y1="40" x2="235" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(350, 30, 'Divergence', { a: 'middle', s: 15, w: 800 })}
      <path d="${aerofoil(260, 150, 180, 8).d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <circle cx="306" cy="136" r="6" fill="var(--ok)"/>${AR(306, 132, 306, 80, 'var(--ok)', 2.6)}${T(298, 76, 'lift at CP', { a: 'end', w: 600, c: 'var(--ok)' })}
      <circle cx="360" cy="146" r="6" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>${T(368, 186, 'flexural axis', { w: 600 })}
      <path d="M420 120 A60 60 0 0 0 410 70" fill="none" stroke="var(--warn)" stroke-width="2.4"/>${AR(414, 80, 408, 68, 'var(--warn)', 2.4)}${T(424, 72, 'twist ↑', { c: 'var(--warn)' })}
      ${T(350, 262, 'CP ahead of flexural axis:', { a: 'middle', w: 600 })}${T(350, 280, 'more twist → more lift → breaks', { a: 'middle', w: 600 })}
      ${T(350, 304, 'cure: stiffness, engines ahead/below', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="470" y1="40" x2="470" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(585, 30, 'Flutter', { a: 'middle', s: 15, w: 800 })}
      <path d="${P([...Array(81)].map((_, i) => { const x = 490 + i * 2.4; return [x, 130 - Math.sin(i / 5) * (6 + i * 0.5)]; }))}" fill="none" stroke="var(--warn)" stroke-width="2.6"/>
      ${T(585, 210, 'oscillation grows with each cycle', { a: 'middle', w: 600, c: 'var(--warn)' })}
      ${T(585, 262, 'control CG behind its hinge', { a: 'middle', w: 600 })}${T(585, 280, 'couples with wing bending/twist', { a: 'middle', w: 600 })}
      ${T(585, 304, 'cure: mass balance, stiffness', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
})();

/* ---- Ch 9 · Propellers ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR, aerofoil } = G.HB;
  const arc = (cx, cy, r, a0, a1, col = 'var(--ink)') => { const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `<path d="M${x0} ${y0} A${r} ${r} 0 0 0 ${x1} ${y1}" fill="none" stroke="${col}" stroke-width="2"/>`; };

  F['prop-angles'] = () => {
    const O = [150, 270], vr = 360, vf = 136, helix = Math.atan2(vf, vr) * 180 / Math.PI, blade = 32;
    const c = Math.cos(blade * Math.PI / 180), s = Math.sin(blade * Math.PI / 180);
    const Q = [O[0] + 330 * c, O[1] - 330 * s];
    const A = aerofoil(0, 0, 150, 0);
    return `<svg viewBox="0 0 700 330">
      <line x1="40" y1="${O[1]}" x2="680" y2="${O[1]}" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="6 5"/>${T(676, O[1] + 22, 'plane of rotation', { a: 'end', w: 600, c: 'var(--muted)' })}
      <line x1="${O[0]}" y1="${O[1]}" x2="${O[0] + 380 * c}" y2="${O[1] - 380 * s}" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="3 4"/>
      <path transform="matrix(${-c} ${s} ${s} ${c} ${Q[0]} ${Q[1]})" d="${A.d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${AR(O[0], O[1], O[0] + vr, O[1], 'var(--h4i)', 3)}${T(O[0] + vr / 2, O[1] + 22, 'rotational velocity (2πrN)', { a: 'middle', c: 'var(--h4i)' })}
      ${AR(O[0] + vr, O[1], O[0] + vr, O[1] - vf, 'var(--h1i)', 3)}${T(O[0] + vr + 8, O[1] - vf / 2, 'forward', { c: 'var(--h1i)' })}${T(O[0] + vr + 8, O[1] - vf / 2 + 18, 'speed (TAS)', { c: 'var(--h1i)' })}
      ${AR(O[0], O[1], O[0] + vr, O[1] - vf, 'var(--m-cold)', 3)}${T(O[0] + vr - 20, O[1] - vf - 12, 'helix path (effective pitch)', { a: 'end', c: 'var(--m-cold)' })}
      ${arc(O[0], O[1], 80, 0, helix, 'var(--m-cold)')}${T(O[0] + 86, O[1] - 10, 'helix angle', { w: 600, c: 'var(--m-cold)' })}
      ${arc(O[0], O[1], 150, helix, blade, 'var(--warn)')}${T(O[0] + 156 * Math.cos(26 * Math.PI / 180), O[1] - 156 * Math.sin(26 * Math.PI / 180) - 4, 'AoA', { c: 'var(--warn)' })}
      ${arc(O[0], O[1], 214, 0, blade, 'var(--ink)')}${T(O[0] + 220 * Math.cos(10 * Math.PI / 180), O[1] - 220 * Math.sin(10 * Math.PI / 180), 'blade angle', { w: 700 })}
      ${T(Q[0] + 18, Q[1] - 4, 'chord line', { w: 600 })}
      <rect x="20" y="24" width="250" height="70" rx="12" fill="var(--wash)"/>
      ${T(34, 48, 'blade angle = helix angle + AoA', { w: 700 })}${T(34, 68, 'more TAS → steeper helix → less AoA', { w: 600, c: 'var(--muted)' })}${T(34, 86, '(so the CSU coarsens the blade)', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['prop-forces'] = () => `<svg viewBox="0 0 700 330">
      ${T(110, 30, 'Seen from ahead', { a: 'middle', s: 14, w: 800 })}
      <circle cx="110" cy="250" r="16" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M100 236 L96 70 Q110 56 124 70 L120 236 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${AR(110, 120, 110, 50, 'var(--warn)', 3)}${T(126, 54, 'centrifugal force', { c: 'var(--warn)' })}${T(126, 72, '(stretches)', { w: 600, c: 'var(--warn)' })}
      <path d="M150 140 Q180 170 160 210" fill="none" stroke="var(--h4i)" stroke-width="2.6"/>${AR(166, 196, 160, 210, 'var(--h4i)', 2.6)}
      ${T(170, 160, 'torque', { c: 'var(--h4i)' })}${T(170, 178, 'bending', { c: 'var(--h4i)' })}
      ${T(40, 300, 'rotation →', { w: 600, c: 'var(--muted)' })}
      <line x1="240" y1="40" x2="240" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(340, 30, 'Seen from the side', { a: 'middle', s: 14, w: 800 })}
      <rect x="300" y="236" width="30" height="40" rx="6" fill="var(--wash)" stroke="var(--wire)" stroke-width="2"/>
      <path d="M318 236 Q330 150 352 70" fill="none" stroke="var(--h0i)" stroke-width="12" stroke-linecap="round"/>
      <path d="M318 236 L318 70" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 4"/>
      ${AR(380, 170, 420, 170, 'var(--ok)', 3)}${T(372, 150, 'thrust bending:', { c: 'var(--ok)' })}${T(372, 196, 'blade bends', { w: 600, c: 'var(--ok)' })}${T(372, 214, 'forward', { w: 600, c: 'var(--ok)' })}
      ${T(300, 300, 'flight →', { w: 600, c: 'var(--muted)' })}
      <line x1="450" y1="40" x2="450" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(575, 30, 'Twisting moments', { a: 'middle', s: 14, w: 800 })}
      <path transform="translate(520 170) rotate(-24)" d="${aerofoil(0, 0, 120, 0).d}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <circle cx="570" cy="148" r="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>${T(584, 170, 'pitch-change axis', { w: 600 })}
      <circle cx="546" cy="160" r="5" fill="var(--ok)"/>${T(476, 214, 'CP ahead of axis', { w: 600, c: 'var(--ok)' })}
      ${arc(570, 148, 56, 120, 160, 'var(--h4i)')}${T(470, 84, 'ATM → coarse', { c: 'var(--h4i)' })}
      ${arc(570, 148, 56, 20, 60, 'var(--h2i)')}${T(610, 84, 'CTM → fine', { c: 'var(--h2i)' })}
      ${T(470, 260, 'ATM > CTM normally;', { w: 600 })}${T(470, 278, 'windmilling: ATM joins CTM', { w: 600 })}
    </svg>`;

  F['prop-effects'] = () => {
    const box = (x, y, title) => `<rect x="${x}" y="${y}" width="335" height="150" rx="14" fill="var(--wash)"/>${T(x + 14, y + 24, title, { s: 14, w: 800 })}`;
    return `<svg viewBox="0 0 700 330">
      ${box(10, 10, 'Torque reaction')}
      <circle cx="90" cy="100" r="30" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M60 78 A40 40 0 0 1 124 80" fill="none" stroke="var(--h4i)" stroke-width="2.6"/>${AR(116, 72, 126, 84, 'var(--h4i)', 2.6)}${T(132, 70, 'prop clockwise', { w: 600, c: 'var(--h4i)' })}
      <path d="M120 128 A40 40 0 0 1 56 126" fill="none" stroke="var(--warn)" stroke-width="2.6"/>${AR(64, 134, 54, 122, 'var(--warn)', 2.6)}
      ${T(150, 112, 'airframe rolls LEFT', { c: 'var(--warn)' })}${T(150, 130, 'left wheel loaded', { w: 600, c: 'var(--warn)' })}
      ${box(355, 10, 'Spiral slipstream')}
      <rect x="430" y="88" width="170" height="16" rx="8" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/><path d="M590 78 L606 78 L606 114 L590 114 Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M420 96 C450 60 470 132 500 96 C530 60 550 132 580 80" fill="none" stroke="var(--m-cold)" stroke-width="2.4"/>${AR(572, 86, 588, 74, 'var(--m-cold)', 2.4)}
      ${T(372, 140, 'hits the fin on the left → yaw LEFT', { w: 700, c: 'var(--warn)' })}${T(372, 154, '', {})}
      ${box(10, 170, 'Asymmetric blade (P-factor)')}
      <line x1="60" y1="230" x2="250" y2="230" stroke="var(--muted)" stroke-dasharray="4 4"/>
      <circle cx="155" cy="250" r="10" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${AR(105, 260, 105, 232, 'var(--h4i)', 2)}${AR(205, 236, 205, 270, 'var(--h4i)', 2)}${T(70, 290, 'up-going', { w: 600 })}${T(196, 290, 'down-going', { w: 600 })}
      ${AR(70, 214, 70, 200, 'var(--ok)', 2)}${AR(250, 214, 250, 186, 'var(--ok)', 3.4)}${T(258, 200, 'more thrust', { w: 600, c: 'var(--ok)' })}
      ${T(24, 312, 'high AoA: down-going blade bites more → yaw LEFT', { w: 600, c: 'var(--warn)' })}
      ${box(355, 170, 'Gyroscopic precession')}
      ${G.FH.plane(440, 252, 1.6, -15, 'var(--ink)')}
      ${T(500, 230, 'tail-wheel aircraft:', { w: 600 })}${T(500, 248, 'tail comes up on', { w: 600 })}${T(500, 266, 'take-off → yaw LEFT', { c: 'var(--warn)' })}
      ${T(372, 302, 'Only while pitching or yawing', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 10 · Structures, hydraulics, pneumatics ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR, aerofoil } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['load-limits'] = () => {
    const X = e => 80 + e * 230, Y = l => 300 - l * 170;
    const curve = [...Array(41)].map((_, i) => { const e = i / 40 * 1.55; const l = e <= 1.2 ? e : 1.2 + 0.42 * (1 - Math.exp(-(e - 1.2) * 4)); return [X(e), Y(l)]; });
    const mark = (l, lab, col, dy = 0) => `<line x1="80" x2="${X(1.6)}" y1="${Y(l)}" y2="${Y(l)}" stroke="${col}" stroke-width="1.6" stroke-dasharray="6 4"/>${T(X(1.6) + 8, Y(l) + 5 + dy, lab, { c: col })}`;
    return `<svg viewBox="0 0 700 340">
      <rect x="80" y="${Y(1.2)}" width="${X(1.6) - 80}" height="${Y(0) - Y(1.2)}" fill="var(--h1)" opacity=".35"/>${T(90, Y(0.12), 'elastic: springs back', { w: 600, c: 'var(--h1i)' })}
      <line x1="80" y1="20" x2="80" y2="300" stroke="var(--ink)" stroke-width="2"/><line x1="80" y1="300" x2="${X(1.6)}" y2="300" stroke="var(--ink)" stroke-width="2"/>
      ${T(24, 24, 'load')}${T(X(1.6), 322, 'strain (deformation)', { a: 'end', w: 600 })}
      <path d="${P(curve)}" fill="none" stroke="var(--ink)" stroke-width="3"/>
      ${mark(1, 'DLL: most expected in service', 'var(--h0i)', 8)}
      ${mark(1.125, 'Proof 1.125 × DLL: no permanent set', 'var(--ok)', -6)}
      ${mark(1.5, 'Ultimate 1.5 × DLL: no collapse', 'var(--warn)')}
      ${T(X(1.2) - 10, Y(1.2) - 12, 'elastic limit', { a: 'end', w: 600 })}<circle cx="${X(1.2)}" cy="${Y(1.2)}" r="5" fill="var(--ink)"/>
    </svg>`;
  };

  F['wing-structure'] = () => {
    const ribs = 5, dx = 92, dy = -36, x0 = 70, y0 = 250, L = 230;
    const A = aerofoil(0, 0, L, 0);
    const pt = (i, f, top) => { const [x, y] = top ? A.up(f) : A.lo(f); return [x0 + x + i * dx, y0 + y + i * dy]; };
    let s = '';
    // torsion box shading on the top skin between spars
    s += `<path d="${P([pt(0, 0.15, true), pt(0, 0.65, true), pt(ribs - 1, 0.65, true), pt(ribs - 1, 0.15, true)])} Z" fill="var(--h4)" opacity=".55"/>`;
    for (let i = 0; i < ribs; i++) s += `<path transform="translate(${x0 + i * dx} ${y0 + i * dy})" d="${A.d}" fill="none" stroke="var(--h0i)" stroke-width="2.2"/>`;
    for (const f of [0.15, 0.65]) s += `<path d="${P([pt(0, f, true), pt(ribs - 1, f, true), pt(ribs - 1, f, false), pt(0, f, false)])} Z" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2" opacity=".9"/>`;
    for (const f of [0.3, 0.42, 0.53, 0.8]) s += `<line x1="${pt(0, f, true)[0]}" y1="${pt(0, f, true)[1]}" x2="${pt(ribs - 1, f, true)[0]}" y2="${pt(ribs - 1, f, true)[1]}" stroke="var(--h1i)" stroke-width="1.8"/>`;
    const lab = (p, tx, ty, t, c) => `<line x1="${p[0]}" y1="${p[1]}" x2="${tx}" y2="${ty}" stroke="var(--ink)" stroke-width="1.2"/>${T(tx + (tx < p[0] ? -4 : 4), ty + 4, t, { a: tx < p[0] ? 'end' : 'start', c })}`;
    return `<svg viewBox="0 0 700 330">${s}
      ${lab(pt(1, 0.15, false), 90, 300, 'front spar', 'var(--h2i)')}${lab(pt(2, 0.65, false), 380, 312, 'rear spar', 'var(--h2i)')}
      ${lab(pt(4, 0.9, true), 640, 90, 'rib (shape)', 'var(--h0i)')}${lab(pt(3, 0.42, true), 330, 70, 'stringers (stiffen skin)', 'var(--h1i)')}
      ${lab(pt(2, 0.4, true), 210, 110, 'torsion box', 'var(--h4i)')}
      <rect x="440" y="230" width="250" height="92" rx="12" fill="var(--wash)"/>
      ${T(454, 252, 'Spar: spanwise, bending + torsion', { w: 600 })}${T(454, 272, 'Rib: chordwise, holds the shape', { w: 600 })}${T(454, 292, 'Stringer: stops skin buckling', { w: 600 })}${T(454, 312, 'Box: resists bending and twist', { w: 600 })}
    </svg>`;
  };

  F['hydraulic-system'] = () => {
    const box = (x, y, w, h, t, hue = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>${T(x + w / 2, y + h / 2 + 5, t, { a: 'middle', c: `var(--h${hue}i)` })}`;
    const pl = (d) => `<path d="${d}" fill="none" stroke="var(--warn)" stroke-width="3.2"/>`, rl = (d) => `<path d="${d}" fill="none" stroke="var(--m-cold)" stroke-width="3.2" stroke-dasharray="7 5"/>`;
    return `<svg viewBox="0 0 700 330">
      ${pl('M150 230 L150 260 L230 260')}${pl('M330 260 L380 260')}${pl('M440 230 L440 260 L540 260 L540 220')}${pl('M440 260 L440 296 L470 296')}
      ${rl('M150 160 L150 120')}${rl('M600 220 L600 60 L110 60 L110 120')}${rl('M570 296 L640 296 L640 60')}
      ${pl('M110 160 L110 196')}
      ${box(70, 120, 120, 40, 'Reservoir', 0)}
      <circle cx="150" cy="215" r="18" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>${T(178, 220, 'pump', { c: 'var(--h4i)' })}
      ${box(230, 240, 100, 40, 'Filter', 1)}
      <rect x="380" y="200" width="60" height="80" rx="30" fill="var(--h3)" stroke="var(--h3i)" stroke-width="2"/>${T(410, 192, 'accumulator', { a: 'middle', c: 'var(--h3i)' })}
      ${box(470, 280, 100, 34, 'Relief valve', 2)}
      ${box(500, 180, 130, 40, 'Selector valve', 5)}
      <rect x="470" y="96" width="190" height="40" rx="6" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/><rect x="540" y="98" width="12" height="36" fill="var(--ink)"/><line x1="552" y1="116" x2="690" y2="116" stroke="var(--ink)" stroke-width="4"/>
      ${T(480, 88, 'actuator (jack)', { w: 700 })}
      ${pl('M540 180 L540 136')}
      <line x1="30" y1="40" x2="60" y2="40" stroke="var(--warn)" stroke-width="3.2"/>${T(66, 45, 'pressure line', { w: 600 })}
      <line x1="200" y1="40" x2="230" y2="40" stroke="var(--m-cold)" stroke-width="3.2" stroke-dasharray="7 5"/>${T(236, 45, 'return line', { w: 600 })}
      ${T(20, 318, 'Reservoir pressurised to stop cavitation; emergency supply drawn from its bottom.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 11 · Landing gear, tyres ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;

  F['gear-layouts'] = () => {
    // side view: fuselage, CG marker, wheels
    const cell = (x, y, name, ex, wheels, cg, pitch = 0, extra = '') => {
      const body = `<g transform="rotate(${pitch} ${x + 150} ${y + 40})"><path d="M${x + 20} ${y + 40} Q${x + 30} ${y + 22} ${x + 70} ${y + 20} L${x + 250} ${y + 26} L${x + 282} ${y - 6} L${x + 296} ${y - 6} L${x + 290} ${y + 40} L${x + 70} ${y + 56} Q${x + 30} ${y + 56} ${x + 20} ${y + 40} Z" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/></g>`;
      const w = wheels.map(([wx, r, h]) => `<line x1="${x + wx}" y1="${y + 50}" x2="${x + wx}" y2="${y + 92 - r}" stroke="var(--ink)" stroke-width="3"/><circle cx="${x + wx}" cy="${y + 92 - r}" r="${r}" fill="var(--ink)"/>`).join('');
      const c = `<circle cx="${x + cg}" cy="${y + 38}" r="8" fill="var(--paper)" stroke="var(--warn)" stroke-width="2.4"/><line x1="${x + cg}" y1="${y + 46}" x2="${x + cg}" y2="${y + 92}" stroke="var(--warn)" stroke-width="1.4" stroke-dasharray="3 3"/>`;
      return `${body}${w}${c}${extra}<line x1="${x}" y1="${y + 92}" x2="${x + 310}" y2="${y + 92}" stroke="var(--muted)" stroke-width="1.6"/>
        ${T(x, y - 18, name, { s: 15, w: 800 })}${T(x + 310, y - 18, ex, { a: 'end', w: 600, c: 'var(--muted)' })}`;
    };
    return `<svg viewBox="0 0 700 330">
      ${cell(20, 50, 'Tricycle', 'most aircraft', [[60, 9], [170, 12]], 150)}
      ${cell(370, 50, 'Tail-dragger', 'Dakota', [[120, 13], [280, 7]], 150, 5)}
      ${cell(20, 210, 'Bicycle + outriggers', 'Sea Harrier', [[80, 11], [230, 11]], 150, 0, `<line x1="170" y1="250" x2="170" y2="293" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/><circle cx="170" cy="296" r="6" fill="none" stroke="var(--ink)" stroke-width="2"/>`)}
      ${cell(370, 210, 'Quadricycle', 'B-52', [[100, 11], [130, 11], [210, 11], [240, 11]], 165)}
      ${T(20, 322, 'Orange circle = CG. Tricycle: mains behind the CG → stable; tail-dragger: mains ahead → swings.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['oleo-strut'] = () => {
    const strut = (x, comp, title) => {
      const pTop = 90 + comp, sep = 150 + comp * 0.4;
      return `${T(x + 60, 30, title, { a: 'middle', s: 14, w: 800 })}
        <rect x="${x}" y="50" width="120" height="200" rx="10" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.4"/>
        <rect x="${x + 6}" y="56" width="108" height="${pTop - 56}" fill="var(--h4)" opacity=".85"/>
        <rect x="${x + 18}" y="${pTop}" width="84" height="${250 - pTop + 40}" rx="6" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
        <rect x="${x + 24}" y="${pTop + 6}" width="72" height="${sep - pTop - 6}" fill="var(--h4)" opacity=".85"/>
        <rect x="${x + 24}" y="${sep}" width="72" height="8" fill="var(--ink)"/>
        <rect x="${x + 24}" y="${sep + 8}" width="72" height="${250 - sep + 26}" fill="var(--h1)"/>
        <circle cx="${x + 60}" cy="${pTop + 2}" r="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
        <circle cx="${x + 60}" cy="${300 + comp * 0.0}" r="16" fill="var(--ink)"/>`;
    };
    return `<svg viewBox="0 0 700 330">
      ${strut(60, 0, 'Static')}${strut(260, 50, 'Compressed (landing)')}
      ${AR(320, 312, 320, 280, 'var(--warn)', 2.6)}
      <rect x="440" y="60" width="250" height="210" rx="14" fill="var(--wash)"/>
      <rect x="456" y="80" width="18" height="14" fill="var(--h4)"/>${T(482, 92, 'oil', { c: 'var(--h4i)' })}
      <rect x="456" y="108" width="18" height="14" fill="var(--h1)"/>${T(482, 120, 'gas (nitrogen/air)', { c: 'var(--h1i)' })}
      <rect x="456" y="140" width="18" height="6" fill="var(--ink)"/>${T(482, 148, 'floating separator', { w: 600 })}
      <circle cx="465" cy="170" r="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>${T(482, 175, 'clack valve / orifice', { w: 600 })}
      ${T(456, 208, 'Gas absorbs the shock;', { w: 700, c: 'var(--ok)' })}${T(456, 228, 'oil through the orifice', { w: 700, c: 'var(--ok)' })}${T(456, 248, 'damps the rebound.', { w: 700, c: 'var(--ok)' })}
    </svg>`;
  };

  F['tyre-wear'] = () => {
    const tyre = (x, title, shape, wear, note, col) => `${T(x + 95, 34, title, { a: 'middle', s: 14, w: 800, c: col })}
      <path d="${shape}" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2.4" transform="translate(${x} 0)"/>
      <line x1="${x + 10}" y1="214" x2="${x + 180}" y2="214" stroke="var(--muted)" stroke-width="2"/>
      ${wear.map(([a, b]) => `<rect x="${x + a}" y="206" width="${b - a}" height="8" fill="${col}"/>`).join('')}
      ${T(x + 95, 244, note, { a: 'middle', w: 600 })}`;
    return `<svg viewBox="0 0 700 280">
      ${tyre(20, 'Correct', 'M40 210 Q30 120 60 70 L130 70 Q160 120 150 210 Z', [[42, 148]], 'even contact', 'var(--ok)')}
      ${tyre(250, 'Over-inflated', 'M50 206 Q20 110 70 64 L120 64 Q170 110 140 206 Q95 218 50 206 Z', [[72, 118]], 'centre wears', 'var(--warn)')}
      ${tyre(480, 'Under-inflated', 'M34 212 Q40 120 62 80 L128 80 Q150 120 156 212 Q95 196 34 212 Z', [[34, 60], [130, 156]], 'shoulders wear, overheats', 'var(--warn)')}
      ${T(350, 272, 'Under-inflation is a leading cause of tyre failure.', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 12 · Air conditioning, pressurisation ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const box = (x, y, w, h, t, hue, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>${T(x + w / 2, y + h / 2 + (sub ? -2 : 5), t, { a: 'middle', c: `var(--h${hue}i)` })}${sub ? T(x + w / 2, y + h / 2 + 16, sub, { a: 'middle', w: 600, c: 'var(--muted)' }) : ''}`;

  F['air-cycle'] = () => `<svg viewBox="0 0 700 300">
      ${box(10, 120, 100, 54, 'Bleed air', 2, '≈ 200 °C')}
      ${AR(112, 147, 140, 147, 'var(--warn)', 3)}
      ${box(142, 120, 110, 54, 'Heat exch.', 0, 'ram-air cooled')}
      ${AR(254, 147, 282, 147, 'var(--warn)', 3)}
      ${box(284, 120, 100, 54, 'Compressor', 4, 'hotter again')}
      ${AR(334, 176, 334, 222, 'var(--warn)', 3)}
      ${box(284, 224, 100, 50, 'Heat exch. 2', 0)}
      ${AR(386, 249, 414, 249, 'var(--warn)', 3)}
      ${box(416, 220, 110, 58, 'Turbine', 1, 'expands, works')}
      ${AR(471, 218, 471, 176, 'var(--m-cold)', 3)}
      ${box(416, 120, 110, 54, 'Water sep.', 1, 'removes water')}
      ${AR(528, 147, 556, 147, 'var(--m-cold)', 3)}
      ${box(558, 120, 120, 54, 'Mix → cabin', 5, '18–24 °C')}
      <line x1="384" y1="249" x2="416" y2="249" stroke="none"/>
      <path d="M430 220 Q380 196 384 176" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>${T(360, 206, 'shaft', { a: 'end', w: 600 })}
      ${T(350, 40, 'Turbo-compressor cold air unit', { a: 'middle', s: 15, w: 800 })}
      ${T(350, 66, 'Air loses heat when it is made to do work driving the turbine.', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;

  F['pressure-valves'] = () => {
    const v = (x, y, t, sub, hue) => `<circle cx="${x}" cy="${y}" r="12" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2.4"/>${T(x, y + 32, t, { a: 'middle', c: `var(--h${hue}i)` })}${T(x, y + 50, sub, { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    return `<svg viewBox="0 0 700 320">
      <path d="M60 150 Q60 70 160 70 L600 70 Q660 70 670 150 Q660 230 600 230 L160 230 Q60 230 60 150 Z" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.6"/>
      <line x1="80" y1="170" x2="650" y2="170" stroke="var(--ink)" stroke-width="2"/>
      ${T(360, 156, 'CABIN (cabin altitude ≤ 8000 ft)', { a: 'middle', s: 14, w: 800 })}${T(360, 205, 'cargo hold (pressurised)', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${AR(20, 110, 70, 110, 'var(--warn)', 3)}${T(14, 96, 'constant inflow', { c: 'var(--warn)' })}
      ${v(560, 230, 'Outflow valve', 'sets the pressure', 1)}${AR(560, 244, 560, 262, 'var(--m-cold)', 2.4)}
      ${v(180, 70, 'Safety relief', 'max + differential', 2)}
      ${v(330, 70, 'Inward relief', 'opens at −0.5 to −1 psi', 0)}
      ${v(480, 70, 'Dump', 'manual, emergency', 4)}
      <rect x="250" y="162" width="40" height="16" fill="var(--h5)" stroke="var(--h5i)" stroke-width="2"/>${T(240, 160, 'blow-out panel', { a: 'end', c: 'var(--h5i)' })}
      ${T(360, 312, 'Relief valves sit above the flotation line (ditching).', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 13 · Composites, fuel ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T } = G.HB;

  F['composite-layup'] = () => {
    const ply = (i, ang, hue) => { const y = 70 + i * 50, x = 40; let lines = '';
      for (let k = -12; k < 24; k++) { const a = ang * Math.PI / 180, dx = Math.cos(a) * 400, dy = -Math.sin(a) * 400, x0 = x + k * 14; lines += `<line x1="${x0 - dx}" y1="${y + 18 - dy}" x2="${x0 + dx}" y2="${y + 18 + dy}" stroke="var(--h${hue}i)" stroke-width="1.6"/>`; }
      return `<clipPath id="hbcl${i}"><rect x="${x}" y="${y}" width="280" height="36" rx="6"/></clipPath><rect x="${x}" y="${y}" width="280" height="36" rx="6" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/><g clip-path="url(#hbcl${i})">${lines}</g>${T(x + 296, y + 24, ang + '°', { s: 15, w: 800, c: `var(--h${hue}i)` })}`; };
    return `<svg viewBox="0 0 700 330">
      ${T(40, 40, 'Symmetrical lay-up (dashed = mirror line)', { s: 14, w: 800 })}
      ${ply(0, 0, 0)}${ply(1, 45, 1)}${ply(2, 90, 4)}${ply(3, 45, 1)}${ply(4, 0, 0)}
      <line x1="30" y1="188" x2="350" y2="188" stroke="var(--warn)" stroke-width="1.6" stroke-dasharray="5 4"/>
      <rect x="400" y="70" width="280" height="236" rx="14" fill="var(--wash)"/>
      ${T(416, 98, 'Fibre: carries the load', { w: 700 })}${T(416, 122, 'Matrix (resin): binds it and', { w: 600 })}${T(416, 140, 'passes the load to the fibres', { w: 600 })}
      ${T(416, 174, 'Balanced: same orientation', { w: 600 })}${T(416, 192, 'in each layer', { w: 600 })}
      ${T(416, 226, 'Symmetrical: top half mirrors', { w: 600 })}${T(416, 244, 'the bottom half', { w: 600 })}
      ${T(416, 278, 'Angles chosen → aero-elastic', { w: 700, c: 'var(--ok)' })}${T(416, 296, 'tailoring', { w: 700, c: 'var(--ok)' })}
    </svg>`;
  };

  F['fuel-colours'] = () => {
    const drop = (x, col, name, sub, ring) => `<path d="M${x} 50 C${x + 10} 80 ${x + 46} 120 ${x + 46} 156 A46 46 0 0 1 ${x - 46} 156 C${x - 46} 120 ${x - 10} 80 ${x} 50 Z" fill="${col}" stroke="${ring || 'var(--ink)'}" stroke-width="2.4"/>
      ${T(x, 236, name, { a: 'middle', s: 15, w: 800 })}${T(x, 258, sub, { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    return `<svg viewBox="0 0 700 290">
      ${drop(95, '#D9372B', 'AVGAS 80', 'red')}${drop(265, '#2E9E4F', 'AVGAS 100', 'green')}${drop(435, '#2F6FE0', 'AVGAS 100LL', 'blue, low lead')}${drop(605, '#EFE3B0', 'Jet A-1', 'clear / straw')}
    </svg>`;
  };
})();

/* ---- Ch 14 · Piston engines ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;

  F['four-stroke'] = () => {
    const cyl = (x, name, pistonY, inOpen, exOpen, fill, note, arrowDown, spark) => {
      const top = 60, w = 110;
      return `<rect x="${x}" y="${top}" width="${w}" height="170" rx="6" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.4"/>
        <rect x="${x + 3}" y="${top + 3}" width="${w - 6}" height="${pistonY - top - 3}" fill="${fill}" opacity=".75"/>
        <rect x="${x + 4}" y="${pistonY}" width="${w - 8}" height="34" rx="4" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
        <line x1="${x + w / 2}" y1="${pistonY + 34}" x2="${x + w / 2 + (arrowDown ? 14 : -14)}" y2="${pistonY + 74}" stroke="var(--ink)" stroke-width="4"/>
        <line x1="${x + 22}" y1="${top}" x2="${x + 22}" y2="${top - (inOpen ? 4 : 22)}" stroke="${inOpen ? 'var(--ok)' : 'var(--muted)'}" stroke-width="5"/>${T(x + 22, top - 28, 'in', { a: 'middle', w: 600, c: inOpen ? 'var(--ok)' : 'var(--muted)' })}
        <line x1="${x + w - 22}" y1="${top}" x2="${x + w - 22}" y2="${top - (exOpen ? 4 : 22)}" stroke="${exOpen ? 'var(--warn)' : 'var(--muted)'}" stroke-width="5"/>${T(x + w - 22, top - 28, 'ex', { a: 'middle', w: 600, c: exOpen ? 'var(--warn)' : 'var(--muted)' })}
        ${spark ? `<path d="M${x + 55} ${top + 6} l-8 14 h10 l-8 14" fill="none" stroke="var(--m-sun)" stroke-width="3"/>` : ''}
        ${AR(x + w + 10, arrowDown ? 120 : 200, x + w + 10, arrowDown ? 200 : 120, 'var(--ink)', 2)}
        ${T(x + w / 2, 290, name, { a: 'middle', s: 15, w: 800 })}${T(x + w / 2, 310, note, { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    };
    return `<svg viewBox="0 0 700 330">
      ${cyl(20, '1 Intake', 186, true, false, 'var(--h1)', 'charge drawn in', true)}
      ${cyl(195, '2 Compression', 80, false, false, 'var(--h4)', 'both valves shut', false)}
      ${cyl(370, '3 Power', 186, false, false, 'var(--h2)', 'spark just before TDC', true, true)}
      ${cyl(545, '4 Exhaust', 80, false, true, 'var(--wash)', 'gases pushed out', false)}
    </svg>`;
  };

  F['carburettor'] = () => `<svg viewBox="0 0 700 330">
      <path d="M200 30 L200 120 Q240 160 240 200 L240 300 M360 30 L360 120 Q320 160 320 200 L320 300" fill="none" stroke="var(--ink)" stroke-width="3"/>
      ${AR(280, 20, 280, 60, 'var(--m-cold)', 2.6)}${T(292, 30, 'air in', { c: 'var(--m-cold)' })}
      ${T(40, 100, 'venturi: fast air,', { w: 600 })}${T(40, 118, 'low pressure', { w: 600 })}
      <rect x="40" y="170" width="110" height="90" rx="8" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/>
      <rect x="44" y="205" width="102" height="51" fill="var(--h4)" opacity=".8"/><rect x="70" y="196" width="50" height="14" rx="4" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${T(95, 160, 'float chamber', { a: 'middle', w: 700 })}
      <path d="M150 240 L280 240 L280 186" fill="none" stroke="var(--h4i)" stroke-width="3"/>${T(165, 284, 'fuel jet', { c: 'var(--h4i)' })}
      ${[0, 1, 2, 3].map(i => `<circle cx="${270 + i * 7}" cy="${200 + i * 10}" r="2.6" fill="var(--h4i)"/>`).join('')}
      <line x1="248" y1="268" x2="312" y2="252" stroke="var(--ink)" stroke-width="5"/><circle cx="280" cy="260" r="4" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
      ${T(332, 266, 'throttle (butterfly) valve', { w: 600 })}
      <path d="M244 240 l-6 6 l6 6 l-6 6 M316 240 l6 6 l-6 6 l6 6" fill="none" stroke="var(--m-cold)" stroke-width="2.4"/>
      ${T(332, 238, 'ICE forms here', { c: 'var(--m-cold)', s: 14 })}
      ${AR(280, 296, 280, 326, 'var(--ink)', 2.4)}${T(292, 318, 'mixture to cylinders', { w: 600 })}
      <rect x="470" y="40" width="216" height="150" rx="12" fill="var(--wash)"/>
      ${T(484, 64, 'Temperature drop up to 22 °C', { w: 700 })}${T(484, 86, 'possible with OAT +30 to −10 °C', { w: 600 })}${T(484, 108, 'worst at low power (glide)', { w: 600 })}
      ${T(484, 140, 'Fixed pitch: RPM drops', { c: 'var(--warn)' })}${T(484, 162, 'Constant speed: MAP drops', { c: 'var(--warn)' })}
    </svg>`;
})();

/* ---- Ch 15 · Gas turbines ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');
  // simple side-section of a turbojet core between x0 and x1, centre y
  const core = (x0, y, sc = 1) => `
    <path d="M${x0} ${y - 52 * sc} L${x0 + 60} ${y - 50 * sc} L${x0 + 200} ${y - 34 * sc} L${x0 + 320} ${y - 40 * sc} L${x0 + 420} ${y - 46 * sc} L${x0 + 520} ${y - 30 * sc} L${x0 + 520} ${y + 30 * sc} L${x0 + 420} ${y + 46 * sc} L${x0 + 320} ${y + 40 * sc} L${x0 + 200} ${y + 34 * sc} L${x0 + 60} ${y + 50 * sc} L${x0} ${y + 52 * sc}" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.2"/>
    ${[...Array(7)].map((_, i) => `<line x1="${x0 + 70 + i * 18}" y1="${y - (46 - i * 2) * sc}" x2="${x0 + 70 + i * 18}" y2="${y + (46 - i * 2) * sc}" stroke="var(--h0i)" stroke-width="3"/>`).join('')}
    <rect x="${x0 + 220}" y="${y - 32 * sc}" width="90" height="${64 * sc}" rx="10" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>
    ${[0, 1, 2].map(i => `<line x1="${x0 + 330 + i * 18}" y1="${y - (40 + i * 2) * sc}" x2="${x0 + 330 + i * 18}" y2="${y + (40 + i * 2) * sc}" stroke="var(--h4i)" stroke-width="3"/>`).join('')}
    <rect x="${x0 + 60}" y="${y - 4}" width="330" height="8" fill="var(--ink)"/>`;

  F['engine-ptv'] = () => {
    const x0 = 90, X = f => x0 + f * 520, Y = (v, top = 322, h = 110) => top - v * h;
    const prs = [[0, .05], [.12, .1], [.38, .95], [.42, 1], [.58, .93], [.75, .35], [1, .12]];
    const tmp = [[0, .05], [.38, .32], [.45, .7], [.6, 1], [.75, .62], [1, .45]];
    const vel = [[0, .3], [.12, .45], [.38, .3], [.6, .35], [.75, .6], [1, 1]];
    const line = (pts, col) => `<path d="${P(pts.map(([f, v]) => [X(f), Y(v)]))}" fill="none" stroke="${col}" stroke-width="3"/>`;
    return `<svg viewBox="0 0 700 340">
      ${core(x0, 90, 0.9)}
      ${T(X(0.18), 160, 'compressor', { a: 'middle', w: 600 })}${T(X(0.51), 160, 'combustion', { a: 'middle', w: 600 })}${T(X(0.72), 160, 'turbine', { a: 'middle', w: 600 })}${T(X(0.94), 160, 'nozzle', { a: 'middle', w: 600 })}
      <line x1="${x0}" y1="322" x2="${X(1)}" y2="322" stroke="var(--muted)" stroke-width="1.6"/>
      ${line(prs, 'var(--h0i)')}${line(tmp, 'var(--warn)')}${line(vel, 'var(--ok)')}
      ${T(20, Y(1) + 4, 'pressure', { c: 'var(--h0i)' })}${T(20, Y(0.78) + 4, 'temperature', { c: 'var(--warn)' })}${T(20, Y(0.56) + 4, 'velocity', { c: 'var(--ok)' })}
      ${T(X(0.42), Y(1) - 10, 'max P: burner inlet', { a: 'middle', w: 700, c: 'var(--h0i)' })}
      ${T(X(0.6) + 8, Y(1) + 20, 'max T: burner outlet (NGVs)', { w: 700, c: 'var(--warn)' })}
      ${T(X(1), Y(1) - 10, 'jet', { a: 'end', w: 700, c: 'var(--ok)' })}
    </svg>`;
  };

  F['bypass-engines'] = () => `<svg viewBox="0 0 700 340">
      ${T(20, 26, 'Turbojet: all air through the core, fast jet', { s: 14, w: 800 })}
      <g transform="translate(-20 0) scale(0.9 0.9) translate(40 30)">${core(40, 60, 0.8)}</g>
      ${AR(520, 87, 640, 87, 'var(--warn)', 4)}${T(560, 72, 'small mass, high Vj', { w: 600, c: 'var(--warn)' })}
      ${T(20, 176, 'High-bypass turbofan: fan pushes most air round the core', { s: 14, w: 800 })}
      <path d="M40 200 L470 210 L470 220 M40 316 L470 306 L470 296" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
      <rect x="60" y="204" width="14" height="108" rx="4" fill="var(--h1)" stroke="var(--h1i)" stroke-width="2"/>${T(66, 334, 'fan', { a: 'middle', w: 600, c: 'var(--h1i)' })}
      <g transform="translate(70 230) scale(0.62 0.5)">${core(40, 56, 0.9)}</g>
      ${AR(480, 214, 620, 214, 'var(--m-cold)', 4)}${AR(480, 302, 620, 302, 'var(--m-cold)', 4)}${AR(420, 258, 520, 258, 'var(--warn)', 3)}
      ${T(640, 202, 'cold bypass', { a: 'end', w: 700, c: 'var(--m-cold)' })}${T(500, 252, 'hot core', { w: 700, c: 'var(--warn)' })}
      ${T(480, 336, 'Bypass ratio = bypass ÷ core flow', { w: 700 })}
    </svg>`;
})();

/* ---- Ch 16 · Intakes, compressors, combustors, turbines ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['intake-states'] = () => {
    const panel = (y, title, note, stream, col) => {
      const lip = 200;
      const duct = `<path d="M${lip} ${y - 26} Q${lip - 8} ${y - 30} ${lip} ${y - 34} L${lip + 220} ${y - 50} M${lip} ${y + 26} Q${lip - 8} ${y + 30} ${lip} ${y + 34} L${lip + 220} ${y + 50}" fill="none" stroke="var(--ink)" stroke-width="3"/><rect x="${lip + 222}" y="${y - 52}" width="12" height="104" fill="var(--h0)" stroke="var(--h0i)"/>`;
      return `${duct}${stream(lip, y)}${T(470, y - 6, title, { s: 15, w: 800, c: col })}${T(470, y + 14, note, { w: 600, c: 'var(--muted)' })}`;
    };
    const lines = (lip, y, ys, bend) => ys.map(dy => `<path d="M30 ${y + dy} C${lip - 70} ${y + dy} ${lip - 40} ${y + dy * bend} ${lip + 10} ${y + dy * bend * 0.9} L${lip + 210} ${y + dy * bend * 1.5}" fill="none" stroke="var(--m-cold)" stroke-width="1.8"/>`).join('');
    return `<svg viewBox="0 0 700 340">
      ${panel(60, 'Critical', 'just right: cruise', (l, y) => lines(l, y, [-24, -8, 8, 24], 1), 'var(--ok)')}
      ${panel(170, 'Sub-critical', 'engine wants less: spillage', (l, y) => lines(l, y, [-14, 0, 14], 1) + `<path d="M30 ${y - 34} C${l - 60} ${y - 34} ${l - 30} ${y - 40} ${l - 6} ${y - 64}" fill="none" stroke="var(--warn)" stroke-width="2"/><path d="M30 ${y + 34} C${l - 60} ${y + 34} ${l - 30} ${y + 40} ${l - 6} ${y + 64}" fill="none" stroke="var(--warn)" stroke-width="2"/>`, 'var(--warn)')}
      ${panel(280, 'Super-critical', 'engine wants more: separation', (l, y) => lines(l, y, [-40, -22, 0, 22, 40], 0.66) + `<path d="M${l + 8} ${y - 30} q12 8 22 0 q10 -8 22 0" fill="none" stroke="var(--warn)" stroke-width="2" stroke-dasharray="3 3"/>`, 'var(--warn)')}
    </svg>`;
  };

  F['compressor-types'] = () => `<svg viewBox="0 0 700 330">
      ${T(160, 28, 'Centrifugal (impeller + diffuser)', { a: 'middle', s: 14, w: 800 })}
      <circle cx="160" cy="170" r="110" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/>
      <circle cx="160" cy="170" r="70" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${[...Array(10)].map((_, i) => { const a = i * Math.PI / 5; return `<path d="M${160 + 16 * Math.cos(a)} ${170 + 16 * Math.sin(a)} Q${160 + 50 * Math.cos(a + 0.3)} ${170 + 50 * Math.sin(a + 0.3)} ${160 + 68 * Math.cos(a + 0.6)} ${170 + 68 * Math.sin(a + 0.6)}" fill="none" stroke="var(--h0i)" stroke-width="2.4"/>`; }).join('')}
      ${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<line x1="${160 + 78 * Math.cos(a)}" y1="${170 + 78 * Math.sin(a)}" x2="${160 + 104 * Math.cos(a + 0.25)}" y2="${170 + 104 * Math.sin(a + 0.25)}" stroke="var(--h4i)" stroke-width="2.4"/>`; }).join('')}
      ${AR(160, 170, 260, 100, 'var(--warn)', 2.6)}${T(160, 306, 'air flung outward at 90°: ≈ 4 : 1 per stage', { a: 'middle', w: 600 })}
      <line x1="330" y1="40" x2="330" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(510, 28, 'Axial (rotor + stator stages)', { a: 'middle', s: 14, w: 800 })}
      <path d="M360 90 L660 125 L660 215 L360 250 Z" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/>
      ${[...Array(8)].map((_, i) => { const x = 380 + i * 34, h = 76 - i * 4.4; return `<line x1="${x}" y1="${170 - h}" x2="${x}" y2="${170 + h}" stroke="var(--h${i % 2 ? 4 : 0}i)" stroke-width="4"/>`; }).join('')}
      ${AR(350, 170, 680, 170, 'var(--warn)', 2.6)}
      ${T(380, 272, 'rotor', { w: 600, c: 'var(--h0i)' })}${T(420, 272, 'stator', { w: 600, c: 'var(--h4i)' })}
      ${T(510, 306, 'annulus narrows; ≈ 1.2 : 1 per stage', { a: 'middle', w: 600 })}
    </svg>`;

  F['compressor-map'] = () => {
    const X = m => 80 + m * 560, Y = p => 290 - p * 250;
    const surge = [[0.1, 0.18], [0.3, 0.42], [0.5, 0.66], [0.62, 0.8], [0.7, 0.92]];
    const oper = [[0.15, 0.12], [0.35, 0.3], [0.55, 0.5], [0.72, 0.68], [0.85, 0.82]];
    return `<svg viewBox="0 0 700 330">
      <line x1="80" y1="30" x2="80" y2="290" stroke="var(--ink)" stroke-width="2"/><line x1="80" y1="290" x2="660" y2="290" stroke="var(--ink)" stroke-width="2"/>
      ${T(20, 26, 'pressure ratio')}${T(656, 312, 'mass flow', { a: 'end' })}
      ${[0.3, 0.5, 0.7, 0.85].map(r => `<path d="M${X(r - 0.2)} ${Y(r * 0.95)} Q${X(r)} ${Y(r * 1.05)} ${X(r + 0.12)} ${Y(r * 0.55)}" fill="none" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 4"/>`).join('')}
      <path d="${P(surge.map(([m, p]) => [X(m), Y(p)]))}" fill="none" stroke="var(--warn)" stroke-width="3.4"/>${T(X(0.7) + 8, Y(0.92), 'surge line', { c: 'var(--warn)' })}
      <path d="${P(oper.map(([m, p]) => [X(m), Y(p)]))}" fill="none" stroke="var(--ok)" stroke-width="3.4"/>${T(X(0.85) + 8, Y(0.82) + 4, 'operating line', { c: 'var(--ok)' })}
      ${AR(X(0.45), Y(0.45), X(0.39), Y(0.53), 'var(--ink)', 2)}${T(X(0.47), Y(0.42), 'surge margin', { w: 700 })}
      ${T(X(1), Y(0.12), 'dashed: constant RPM', { a: 'end', w: 600, c: 'var(--muted)' })}
      ${T(100, 318, 'Less flow at a given RPM → steeper blade AoA → towards the surge line.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['combustor'] = () => `<svg viewBox="0 0 700 320">
      <path d="M60 80 L640 80 M60 240 L640 240" stroke="var(--ink)" stroke-width="3"/>
      <path d="M140 120 Q170 100 220 104 L560 116 L600 130 L600 190 L560 204 L220 216 Q170 220 140 200 Z" fill="var(--h2)" opacity=".55" stroke="var(--h2i)" stroke-width="2"/>
      <path d="M150 160 l20 -10 l0 20 Z" fill="var(--h4i)"/>${T(160, 196, 'fuel', { a: 'middle', c: 'var(--h4i)' })}
      ${[0, 1, 2].map(i => `<path d="M${200 + i * 26} 160 q10 -14 20 0 q10 14 20 0" fill="none" stroke="var(--m-sun)" stroke-width="3"/>`).join('')}
      ${AR(70, 160, 140, 160, 'var(--h0i)', 3)}${T(70, 140, 'primary 20%', { c: 'var(--h0i)' })}
      ${AR(240, 90, 260, 112, 'var(--h1i)', 2.6)}${AR(240, 230, 260, 210, 'var(--h1i)', 2.6)}${T(200, 70, 'secondary 20% (swirl, anchors flame)', { c: 'var(--h1i)' })}
      ${[380, 440, 500].map(x => AR(x, 88, x + 8, 116, 'var(--m-cold)', 2.4) + AR(x, 232, x + 8, 206, 'var(--m-cold)', 2.4)).join('')}
      ${T(380, 266, 'tertiary / dilution 60%: cools walls and gas', { c: 'var(--m-cold)' })}
      ${AR(600, 160, 680, 160, 'var(--warn)', 3)}${T(676, 186, 'to NGVs', { a: 'end', c: 'var(--warn)' })}
      ${T(60, 306, 'Flame speed only 2–4 m/s: swirl and recirculation keep it alight.', { w: 600, c: 'var(--muted)' })}
    </svg>`;

  F['turbine-blades'] = () => {
    const blade = (x, y, type) => type === 'imp' ? `<path d="M${x} ${y} q30 30 0 60 q14 -30 0 -60" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>` : `<path d="M${x} ${y} q34 22 6 60 q10 -34 -6 -60" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>`;
    const row = (x0, y, type) => [0, 1, 2, 3].map(i => blade(x0 + i * 40, y, type)).join('');
    const ngv = (x0, y) => [0, 1, 2, 3].map(i => `<path d="M${x0 + i * 40} ${y} q-24 26 4 56 q-6 -30 -4 -56" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>`).join('');
    return `<svg viewBox="0 0 700 330">
      ${T(160, 30, 'Impulse', { a: 'middle', s: 15, w: 800 })}${T(520, 30, 'Reaction', { a: 'middle', s: 15, w: 800 })}
      ${ngv(90, 60)}${row(90, 150, 'imp')}
      ${ngv(450, 60)}${row(450, 150, 'rea')}
      ${T(20, 92, 'NGVs', { w: 700, c: 'var(--h4i)' })}${T(20, 184, 'rotor', { w: 700, c: 'var(--h0i)' })}
      ${AR(300, 70, 300, 210, 'var(--warn)', 2.4)}${AR(660, 70, 660, 210, 'var(--warn)', 2.4)}
      <line x1="350" y1="40" x2="350" y2="300" stroke="var(--line)" stroke-width="2"/>
      ${T(160, 250, 'NGVs accelerate the gas;', { a: 'middle', w: 600 })}${T(160, 270, 'blades only turn it (water wheel)', { a: 'middle', w: 600 })}${T(160, 292, 'starters, APUs', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${T(520, 250, 'blade passages also converge:', { a: 'middle', w: 600 })}${T(520, 270, 'gas accelerates, reaction turns it', { a: 'middle', w: 600 })}${T(520, 292, 'real blades: impulse root, reaction tip', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 17 · Exhaust and engine systems ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const box = (x, y, w, h, t, hue) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>${T(x + w / 2, y + h / 2 + 5, t, { a: 'middle', c: `var(--h${hue}i)` })}`;

  F['nozzles'] = () => `<svg viewBox="0 0 700 330">
      ${T(20, 30, 'Convergent', { s: 15, w: 800 })}
      <path d="M40 60 L250 95 M40 180 L250 145" fill="none" stroke="var(--ink)" stroke-width="3"/>
      ${AR(60, 120, 250, 120, 'var(--warn)', 3)}${T(256, 116, 'M 1 at the exit:', { w: 700 })}${T(256, 134, 'CHOKED', { c: 'var(--warn)' })}
      ${T(40, 214, 'exit pressure > ambient → under-expansion loss', { w: 600, c: 'var(--muted)' })}
      <line x1="380" y1="30" x2="380" y2="230" stroke="var(--line)" stroke-width="2"/>
      ${T(400, 30, 'Convergent–divergent', { s: 15, w: 800 })}
      <path d="M400 60 L540 100 L680 60 M400 180 L540 140 L680 180" fill="none" stroke="var(--ink)" stroke-width="3"/>
      ${AR(420, 120, 540, 120, 'var(--warn)', 3)}${AR(540, 120, 690, 120, 'var(--warn)', 4)}
      ${T(540, 138, 'throat M 1', { a: 'middle', w: 600 })}${T(620, 156, 'M > 1', { a: 'middle', c: 'var(--warn)' })}
      ${T(400, 214, 'expands to ambient: more thrust,', { w: 600, c: 'var(--muted)' })}${T(400, 232, 'but only at its design pressure ratio', { w: 600, c: 'var(--muted)' })}
      <rect x="20" y="256" width="660" height="60" rx="12" fill="var(--wash)"/>
      ${T(36, 280, 'Subsonic flow speeds up in a convergent duct; supersonic flow speeds up in a divergent duct.', { w: 600 })}
      ${T(36, 302, 'Aircraft use variable nozzles; they open when reheat is lit.', { w: 600 })}
    </svg>`;

  F['reversers'] = () => {
    const pipe = (y) => `<path d="M30 ${y - 30} L170 ${y - 30} M30 ${y + 30} L170 ${y + 30}" stroke="var(--ink)" stroke-width="3"/>`;
    return `<svg viewBox="0 0 700 330">
      ${T(20, 30, 'Clamshell (inside the jet pipe)', { s: 14, w: 800 })}${pipe(90)}
      <path d="M150 62 L190 90 L150 118" fill="none" stroke="var(--h2i)" stroke-width="6"/>
      ${AR(80, 90, 140, 90, 'var(--warn)', 3)}${AR(160, 58, 110, 34, 'var(--warn)', 3)}${AR(160, 122, 110, 146, 'var(--warn)', 3)}
      ${T(20, 190, 'Bucket / target (behind the nozzle)', { s: 14, w: 800 })}${pipe(250)}
      <path d="M210 210 Q240 250 210 290" fill="none" stroke="var(--h2i)" stroke-width="6"/>
      ${AR(80, 250, 196, 250, 'var(--warn)', 3)}${AR(196, 226, 150, 198, 'var(--warn)', 3)}${AR(196, 274, 150, 302, 'var(--warn)', 3)}
      <line x1="340" y1="30" x2="340" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(360, 30, 'Cold stream (high-bypass fan air)', { s: 14, w: 800 })}
      <path d="M370 70 L660 80 M370 230 L660 220" stroke="var(--ink)" stroke-width="3"/>
      <rect x="430" y="118" width="210" height="64" rx="20" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/>${T(535, 156, 'core', { a: 'middle', w: 600 })}
      <path d="M560 78 L540 118 M560 222 L540 182" stroke="var(--h2i)" stroke-width="6"/>
      ${AR(390, 98, 530, 98, 'var(--m-cold)', 3)}${AR(390, 202, 530, 202, 'var(--m-cold)', 3)}
      ${AR(540, 86, 500, 46, 'var(--m-cold)', 3)}${AR(540, 214, 500, 254, 'var(--m-cold)', 3)}
      ${T(360, 290, 'blocker doors turn the fan air forward', { w: 600 })}${T(360, 310, 'through cascades: most of the thrust', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['oil-system'] = () => `<svg viewBox="0 0 700 300">
      ${box(30, 120, 110, 50, 'Oil tank', 4)}
      ${box(190, 120, 110, 50, 'Pressure pump', 0)}
      ${box(350, 40, 150, 50, 'Bearings / gears', 2)}
      ${box(350, 200, 150, 50, 'Scavenge pumps', 1)}
      ${box(540, 120, 140, 50, 'Fuel-oil cooler', 5)}
      ${AR(140, 145, 188, 145, 'var(--warn)', 3)}${AR(300, 135, 350, 75, 'var(--warn)', 3)}${AR(425, 92, 425, 198, 'var(--m-cold)', 3)}
      ${AR(500, 225, 600, 172, 'var(--m-cold)', 3)}<path d="M610 120 L610 20 L85 20 L85 118" fill="none" stroke="var(--m-cold)" stroke-width="3"/>${AR(85, 100, 85, 118, 'var(--m-cold)', 3)}
      <circle cx="425" cy="150" r="8" fill="var(--m-sun)"/>${T(440, 155, 'chip detector', { w: 600 })}
      ${T(196, 108, 'P gauge after pump', { w: 600, c: 'var(--muted)' })}${T(540, 196, 'T gauge after cooler', { w: 600, c: 'var(--muted)' })}
      ${T(30, 290, 'Scavenge capacity > pressure-pump capacity, so the bearing chambers never flood.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
})();

/* ---- Ch 18–19 · Electrics ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['fleming'] = () => {
    const axes = (cx, cy, mirror, title, sub) => `${T(cx, 34, title, { a: 'middle', s: 15, w: 800 })}${T(cx, 54, sub, { a: 'middle', w: 600, c: 'var(--muted)' })}
        <ellipse cx="${cx}" cy="${cy}" rx="40" ry="30" fill="var(--wash)" stroke="var(--wire)" stroke-width="2"/>
        ${AR(cx, cy, cx, cy - 110, 'var(--ok)', 4)}${T(cx + 10, cy - 100, 'thuMb: Motion', { c: 'var(--ok)' })}
        ${AR(cx, cy, cx + 60, cy + 66, 'var(--h0i)', 4)}${T(cx + 40, cy + 92, 'First finger: Field', { a: 'middle', c: 'var(--h0i)' })}
        ${AR(cx, cy, cx - 110, cy, 'var(--warn)', 4)}${T(cx - 128, cy + 24, 'seCond: Current', { c: 'var(--warn)' })}`;
    return `<svg viewBox="0 0 700 330">
      ${axes(185, 190, false, 'Right hand → GENERATOR', 'motion + field give current')}
      <line x1="350" y1="30" x2="350" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${axes(520, 190, true, 'Left hand → MOTOR', 'field + current give motion')}
      ${T(350, 322, 'Thumb, first and second fingers held at right angles to each other.', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['magnet-field'] = () => {
    const loops = [40, 70, 100, 130].map(r => `<path d="M260 160 C260 ${160 - r * 1.5} 440 ${160 - r * 1.5} 440 160" fill="none" stroke="var(--m-cold)" stroke-width="1.8"/><path d="M260 160 C260 ${160 + r * 1.5} 440 ${160 + r * 1.5} 440 160" fill="none" stroke="var(--m-cold)" stroke-width="1.8"/>`).join('');
    return `<svg viewBox="0 0 700 330">
      ${loops}
      <rect x="240" y="140" width="110" height="40" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/><rect x="350" y="140" width="110" height="40" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${T(295, 166, 'S', { a: 'middle', s: 18, w: 800, c: 'var(--h2i)' })}${T(405, 166, 'N', { a: 'middle', s: 18, w: 800, c: 'var(--h0i)' })}
      ${AR(350, 30 + 4, 340, 34, 'var(--m-cold)', 2.4)}${AR(350, 286, 360, 286, 'var(--m-cold)', 2.4)}
      ${T(470, 100, 'lines leave N, enter S', { w: 600 })}${T(470, 120, 'continuous, never cross', { w: 600 })}
      <rect x="20" y="240" width="200" height="76" rx="12" fill="var(--wash)"/>${T(34, 264, 'Soft iron: temporary', { w: 700 })}${T(34, 284, 'Hard steel: permanent', { w: 700 })}${T(34, 304, 'Like poles repel', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['cells-series-parallel'] = () => {
    const cell = (x, y) => `<rect x="${x}" y="${y}" width="60" height="34" rx="6" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>${T(x + 30, y + 23, '12 V', { a: 'middle', c: 'var(--h4i)' })}`;
    return `<svg viewBox="0 0 700 300">
      ${T(160, 34, 'Series', { a: 'middle', s: 15, w: 800 })}
      ${cell(40, 100)}${cell(130, 100)}${cell(220, 100)}
      <line x1="100" y1="117" x2="130" y2="117" stroke="var(--ink)" stroke-width="3"/><line x1="190" y1="117" x2="220" y2="117" stroke="var(--ink)" stroke-width="3"/>
      ${T(160, 190, '36 V · 40 Ah', { a: 'middle', s: 18, w: 800, c: 'var(--warn)' })}${T(160, 214, 'volts add, Ah same', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="350" y1="30" x2="350" y2="270" stroke="var(--line)" stroke-width="2"/>
      ${T(520, 34, 'Parallel', { a: 'middle', s: 15, w: 800 })}
      ${cell(490, 60)}${cell(490, 110)}${cell(490, 160)}
      <path d="M470 77 L470 177 M470 77 L490 77 M470 127 L490 127 M470 177 L490 177 M570 77 L570 177 M550 77 L570 77 M550 127 L570 127 M550 177 L570 177" fill="none" stroke="var(--ink)" stroke-width="3"/>
      ${T(520, 236, '12 V · 120 Ah', { a: 'middle', s: 18, w: 800, c: 'var(--warn)' })}${T(520, 260, 'volts same, Ah add', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${T(350, 292, '(each cell 12 V, 40 Ah)', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['gen-alt'] = () => `<svg viewBox="0 0 700 330">
      ${T(170, 30, 'DC generator', { a: 'middle', s: 15, w: 800 })}
      <rect x="40" y="80" width="40" height="120" rx="6" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/><rect x="260" y="80" width="40" height="120" rx="6" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      ${T(60, 220, 'S', { a: 'middle', s: 16, w: 800 })}${T(280, 220, 'N', { a: 'middle', s: 16, w: 800 })}
      <rect x="130" y="110" width="80" height="60" fill="none" stroke="var(--warn)" stroke-width="3" transform="rotate(-20 170 140)"/>
      <path d="M150 250 A20 20 0 0 1 168 230 M172 230 A20 20 0 0 1 190 250" fill="none" stroke="var(--ink)" stroke-width="5"/>
      ${T(170, 284, 'split-ring commutator', { a: 'middle', w: 600 })}${T(170, 302, 'armature turns · field fixed · arcing', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="350" y1="30" x2="350" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(525, 30, 'Alternator', { a: 'middle', s: 15, w: 800 })}
      <circle cx="525" cy="150" r="100" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
      ${[0, 120, 240].map(a => { const r = a * Math.PI / 180; return `<rect x="${525 + 86 * Math.cos(r) - 12}" y="${150 + 86 * Math.sin(r) - 12}" width="24" height="24" fill="var(--h1)" stroke="var(--h1i)" stroke-width="2"/>`; }).join('')}
      <g style="transform-origin:525px 150px;animation:hb-spincw 3s linear infinite"><rect x="485" y="138" width="80" height="24" rx="6" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/></g>
      ${T(525, 284, '3 stator windings 120° apart', { a: 'middle', w: 600 })}${T(525, 302, 'field turns · output from stator', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <style>@keyframes hb-spincw{to{transform:rotate(360deg)}}</style>
    </svg>`;

  F['split-bus'] = () => {
    const box = (x, y, w, h, t, hue) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>${T(x + w / 2, y + h / 2 + 5, t, { a: 'middle', c: `var(--h${hue}i)` })}`;
    return `<svg viewBox="0 0 700 330">
      ${box(40, 30, 140, 44, 'Gen 1', 0)}${box(520, 30, 140, 44, 'Gen 2', 0)}
      <line x1="40" y1="120" x2="300" y2="120" stroke="var(--ink)" stroke-width="7"/><line x1="400" y1="120" x2="660" y2="120" stroke="var(--ink)" stroke-width="7"/>
      <line x1="110" y1="74" x2="110" y2="120" stroke="var(--ink)" stroke-width="3"/><line x1="590" y1="74" x2="590" y2="120" stroke="var(--ink)" stroke-width="3"/>
      ${T(170, 108, 'AC bus 1', { a: 'middle', w: 700 })}${T(530, 108, 'AC bus 2', { a: 'middle', w: 700 })}
      <path d="M300 120 L322 108 M378 120 L400 120" stroke="var(--warn)" stroke-width="4"/>${T(350, 98, 'bus tie', { a: 'middle', c: 'var(--warn)' })}${T(350, 144, 'open normally', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="40" y1="200" x2="660" y2="200" stroke="var(--ok)" stroke-width="7"/>${T(350, 190, 'ESSENTIAL bus', { a: 'middle', c: 'var(--ok)' })}
      <line x1="40" y1="250" x2="300" y2="250" stroke="var(--muted)" stroke-width="7"/>${T(170, 240, 'non-essential (shed first)', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="200" y1="120" x2="200" y2="200" stroke="var(--ink)" stroke-width="2"/><line x1="80" y1="120" x2="80" y2="250" stroke="var(--ink)" stroke-width="2"/>
      ${box(470, 228, 190, 40, 'Battery → hot bus', 4)}${box(470, 282, 190, 40, 'Static inverter', 5)}
      <line x1="565" y1="268" x2="565" y2="282" stroke="var(--ink)" stroke-width="2"/><line x1="470" y1="302" x2="420" y2="302" stroke="var(--ink)" stroke-width="2"/><line x1="420" y1="302" x2="420" y2="200" stroke="var(--ink)" stroke-width="2"/>
      ${T(40, 300, 'Both generators lost: inverter', { w: 600 })}${T(40, 318, 'feeds essential AC from the battery', { w: 600 })}
    </svg>`;
  };
})();

/* ---- Ch 20 · Pitot-static ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const dial = (cx, cy, r, label, hue) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2.4"/>${T(cx, cy + 5, label, { a: 'middle', c: `var(--h${hue}i)` })}`;

  F['hb-pitot-static'] = () => `<svg viewBox="0 0 700 320">
      <path d="M30 60 L120 60 L120 70 L30 70 Z" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>${T(30, 48, 'pitot tube (total)', { c: 'var(--h2i)' })}
      ${AR(4, 65, 28, 65, 'var(--m-cold)', 2.4)}
      <path d="M120 65 L600 65" stroke="var(--warn)" stroke-width="4"/>
      <rect x="30" y="250" width="40" height="14" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>${T(80, 262, 'static vents (both sides)', { c: 'var(--h4i)' })}
      <path d="M50 250 L50 210 L640 210" stroke="var(--m-cold)" stroke-width="4"/>
      ${dial(200, 140, 40, 'ASI', 0)}${dial(330, 140, 40, 'Mach', 3)}${dial(460, 140, 40, 'ALT', 1)}${dial(590, 140, 40, 'VSI', 5)}
      <line x1="185" y1="65" x2="185" y2="104" stroke="var(--warn)" stroke-width="3"/><line x1="315" y1="65" x2="315" y2="104" stroke="var(--warn)" stroke-width="3"/>
      ${[215, 345, 460, 590].map(x => `<line x1="${x}" y1="210" x2="${x}" y2="176" stroke="var(--m-cold)" stroke-width="3"/>`).join('')}
      <rect x="610" y="236" width="80" height="30" rx="8" fill="var(--wash)" stroke="var(--wire)" stroke-width="2"/>${T(650, 256, 'alternate', { a: 'middle', w: 600 })}<line x1="640" y1="210" x2="640" y2="236" stroke="var(--m-cold)" stroke-width="3" stroke-dasharray="4 3"/>
      <line x1="80" y1="292" x2="110" y2="292" stroke="var(--warn)" stroke-width="4"/>${T(116, 297, 'pitot (total = dynamic + static)', { w: 600 })}
      <line x1="380" y1="292" x2="410" y2="292" stroke="var(--m-cold)" stroke-width="4"/>${T(416, 297, 'static only', { w: 600 })}
    </svg>`;

  F['altimeter-temp'] = () => {
    const col = (x, title, gap, hue, note) => {
      const lines = [0, 1, 2, 3].map(i => { const y = 280 - (i + 1) * gap; return `<line x1="${x}" x2="${x + 180}" y1="${y}" y2="${y}" stroke="var(--h${hue}i)" stroke-width="2" stroke-dasharray="6 4"/>${T(x + 186, y + 5, (1013 - (i + 1) * 100) + ' hPa', { w: 600, c: `var(--h${hue}i)` })}`; }).join('');
      return `${T(x + 90, 30, title, { a: 'middle', s: 15, w: 800, c: `var(--h${hue}i)` })}${lines}${T(x + 90, 304, note, { a: 'middle', w: 600, c: 'var(--muted)' })}`;
    };
    return `<svg viewBox="0 0 700 320">
      <rect x="0" y="280" width="700" height="10" fill="var(--m-ground)"/>
      ${col(40, 'Warm air', 60, 2, 'pressure levels spread out')}${col(380, 'Cold air', 42, 0, 'pressure levels squeezed together')}
      ${G.FH.plane(130, 280 - 3 * 60, 1.2, 0, 'var(--ink)')}${G.FH.plane(470, 280 - 3 * 42, 1.2, 0, 'var(--ink)')}
      ${T(392, 180, 'same reading, actually lower', { c: 'var(--warn)' })}
      <line x1="340" y1="40" x2="340" y2="270" stroke="var(--line)" stroke-width="2"/>
    </svg>`;
  };

  F['asi-markings'] = () => {
    const cx = 200, cy = 170, r = 120, A = v => (-220 + v / 200 * 300) * Math.PI / 180;
    const arc = (v0, v1, rr, col, w) => { const a0 = A(v0), a1 = A(v1); return `<path d="M${cx + rr * Math.cos(a0)} ${cy + rr * Math.sin(a0)} A${rr} ${rr} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${cx + rr * Math.cos(a1)} ${cy + rr * Math.sin(a1)}" fill="none" stroke="${col}" stroke-width="${w}"/>`; };
    const tick = (v, col, len = 18, w = 4) => { const a = A(v); return `<line x1="${cx + (r - len) * Math.cos(a)}" y1="${cy + (r - len) * Math.sin(a)}" x2="${cx + (r + 6) * Math.cos(a)}" y2="${cy + (r + 6) * Math.sin(a)}" stroke="${col}" stroke-width="${w}"/>`; };
    return `<svg viewBox="0 0 700 340">
      <circle cx="${cx}" cy="${cy}" r="${r + 20}" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.4"/>
      ${arc(45, 100, r - 14, '#E8E8E8', 9)}${arc(55, 140, r - 2, '#2EA060', 9)}${arc(140, 175, r - 2, '#E5B92B', 9)}
      ${tick(175, '#D9372B', 26, 5)}${tick(95, '#2F6FE0', 22, 4)}
      ${[0, 40, 80, 120, 160, 200].map(v => { const a = A(v); return T(cx + (r - 40) * Math.cos(a), cy + (r - 40) * Math.sin(a) + 5, String(v), { a: 'middle', w: 600 }); }).join('')}
      <line x1="${cx}" y1="${cy}" x2="${cx + 70 * Math.cos(A(110))}" y2="${cy + 70 * Math.sin(A(110))}" stroke="var(--ink)" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="7" fill="var(--ink)"/>
      ${T(cx, cy + 50, 'KNOTS', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <rect x="380" y="40" width="300" height="250" rx="14" fill="var(--wash)"/>
      <rect x="396" y="58" width="22" height="10" fill="#E8E8E8" stroke="var(--ink)"/>${T(428, 68, 'White: VS0 → VFE (flaps)', { w: 700 })}
      <rect x="396" y="98" width="22" height="10" fill="#2EA060"/>${T(428, 108, 'Green: VS1 → VNO (normal)', { w: 700 })}
      <rect x="396" y="138" width="22" height="10" fill="#E5B92B"/>${T(428, 148, 'Yellow: VNO → VNE (caution)', { w: 700 })}
      <rect x="396" y="178" width="22" height="10" fill="#D9372B"/>${T(428, 188, 'Red line: VNE', { w: 700 })}
      <rect x="396" y="218" width="22" height="10" fill="#2F6FE0"/>${T(428, 228, 'Blue line: VYSE (twins)', { w: 700 })}
      ${T(396, 270, 'VS0 = stall, landing config; VS1 = clean', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 21 · Compasses and gyros ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;

  F['compass-errors'] = () => `<svg viewBox="0 0 700 330">
      ${T(170, 30, 'Acceleration error (NH)', { a: 'middle', s: 15, w: 800 })}
      ${G.FH.plane(170, 150, 2, 0, 'var(--ink)')}
      ${AR(210, 150, 290, 150, 'var(--ok)', 3)}${T(250, 136, 'accelerate east', { a: 'middle', w: 600, c: 'var(--ok)' })}
      ${AR(170, 120, 170, 66, 'var(--warn)', 3)}${T(184, 80, 'card shows a turn north', { c: 'var(--warn)' })}
      ${T(170, 220, 'ANDS: Accelerate → North,', { a: 'middle', s: 14, w: 800 })}${T(170, 242, 'Decelerate → South', { a: 'middle', s: 14, w: 800 })}
      ${T(170, 278, 'none on N/S headings', { a: 'middle', w: 600, c: 'var(--muted)' })}${T(170, 298, 'none at the magnetic equator', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="350" y1="30" x2="350" y2="310" stroke="var(--line)" stroke-width="2"/>
      ${T(525, 30, 'Turning error (NH)', { a: 'middle', s: 15, w: 800 })}
      <circle cx="525" cy="150" r="80" fill="none" stroke="var(--wire)" stroke-width="2" stroke-dasharray="5 5"/>
      ${T(525, 62, 'N', { a: 'middle', s: 16, w: 800 })}${T(525, 250, 'S', { a: 'middle', s: 16, w: 800 })}${T(619, 155, 'E', { a: 'middle', s: 16, w: 800 })}${T(431, 155, 'W', { a: 'middle', s: 16, w: 800 })}
      ${T(525, 100, 'lags / under-reads', { a: 'middle', c: 'var(--warn)' })}${T(525, 214, 'leads / over-reads', { a: 'middle', c: 'var(--h0i)' })}
      ${T(525, 278, 'UNOS: Undershoot North,', { a: 'middle', s: 14, w: 800 })}${T(525, 298, 'Overshoot South; none through E/W', { a: 'middle', w: 600 })}
    </svg>`;

  F['flux-valve'] = () => {
    const cx = 220, cy = 165, R = 100;
    const legs = [90, 210, 330].map(a => { const r = a * Math.PI / 180; return `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(r)}" y2="${cy - R * Math.sin(r)}" stroke="var(--h4i)" stroke-width="14" stroke-linecap="round"/><rect x="${cx + 0.7 * R * Math.cos(r) - 16}" y="${cy - 0.7 * R * Math.sin(r) - 16}" width="32" height="32" rx="6" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2" transform="rotate(${-a + 90} ${cx + 0.7 * R * Math.cos(r)} ${cy - 0.7 * R * Math.sin(r)})"/>`; }).join('');
    return `<svg viewBox="0 0 700 330">
      ${legs}<circle cx="${cx}" cy="${cy}" r="22" fill="var(--h2)" stroke="var(--h2i)" stroke-width="2"/>
      ${T(cx, cy + 5, '400 Hz', { a: 'middle', w: 700, c: 'var(--h2i)' })}
      ${[0, 1, 2, 3].map(i => AR(30, 60 + i * 18, 80, 60 + i * 18, 'var(--m-cold)', 1.6)).join('')}${T(30, 46, 'earth’s H field', { w: 600, c: 'var(--m-cold)' })}
      ${T(cx + 40, 46, 'pick-up coils → 800 Hz', { w: 600, c: 'var(--h0i)' })}
      <rect x="410" y="40" width="270" height="250" rx="14" fill="var(--wash)"/>
      ${T(426, 66, 'Three soft-iron (permalloy) legs', { w: 700 })}${T(426, 90, 'excited at 400 Hz; the earth’s', { w: 600 })}${T(426, 110, 'field shows as 800 Hz output', { w: 600 })}
      ${T(426, 142, '3 legs: no ambiguity, works', { w: 600 })}${T(426, 162, 'as H weakens with latitude', { w: 600 })}
      ${T(426, 194, 'Pendulous on a Hooke’s joint:', { w: 600 })}${T(426, 214, '±25° pitch/roll, fixed in azimuth', { w: 600 })}
      ${T(426, 246, 'Wing tip or tail; slaves the', { w: 600 })}${T(426, 266, 'gyro at ≈ 3°/min', { w: 600 })}
    </svg>`;
  };

  F['gyro-precession'] = () => `<svg viewBox="0 0 700 320">
      <ellipse cx="220" cy="170" rx="150" ry="55" fill="var(--h0)" stroke="var(--h0i)" stroke-width="3"/>
      <line x1="220" y1="60" x2="220" y2="280" stroke="var(--ink)" stroke-width="3"/>${T(230, 60, 'spin axis', { w: 600 })}
      <path d="M140 222 A150 55 0 0 0 300 222" fill="none" stroke="var(--ok)" stroke-width="3"/>${AR(290, 223, 304, 220, 'var(--ok)', 3)}${T(305, 250, 'direction of spin', { c: 'var(--ok)' })}
      ${AR(70, 110, 70, 158, 'var(--warn)', 4)}${T(30, 100, 'force applied here', { c: 'var(--warn)' })}
      <circle cx="220" cy="225" r="9" fill="var(--h4i)"/>${AR(220, 248, 220, 290, 'var(--h4i)', 4)}${T(232, 300, 'acts here: 90° on in the direction of spin', { c: 'var(--h4i)' })}
      <rect x="420" y="50" width="260" height="200" rx="14" fill="var(--wash)"/>
      ${T(436, 76, 'Rigidity rises with', { w: 700 })}${T(436, 98, '• higher RPM', { w: 600 })}${T(436, 118, '• more moment of inertia', { w: 600 })}
      ${T(436, 154, 'Precession rate ∝', { w: 700 })}${T(436, 176, 'torque ÷ (inertia × RPM)', { w: 600 })}
      ${T(436, 212, 'Drift: horizontal plane', { w: 600 })}${T(436, 232, 'Topple: vertical plane', { w: 600 })}
    </svg>`;

  F['slip-ball'] = () => {
    const face = (cx, title, needle, ball, note, col) => `<circle cx="${cx}" cy="150" r="90" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.4"/>
      <line x1="${cx}" y1="150" x2="${cx + 70 * Math.sin(needle * Math.PI / 180)}" y2="${150 - 70 * Math.cos(needle * Math.PI / 180)}" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="150" r="6" fill="var(--ink)"/>
      <path d="M${cx - 60} 196 Q${cx} 224 ${cx + 60} 196" fill="none" stroke="var(--muted)" stroke-width="16" stroke-linecap="round" opacity=".5"/>
      <line x1="${cx - 10}" y1="196" x2="${cx - 10}" y2="220" stroke="var(--ink)" stroke-width="1.6"/><line x1="${cx + 10}" y1="196" x2="${cx + 10}" y2="220" stroke="var(--ink)" stroke-width="1.6"/>
      <circle cx="${cx + ball}" cy="${208 - Math.abs(ball) * 0.12}" r="8" fill="var(--ink)"/>
      ${T(cx, 40, title, { a: 'middle', s: 15, w: 800, c: col })}${T(cx, 272, note, { a: 'middle', w: 600 })}`;
    return `<svg viewBox="0 0 700 300">
      ${face(120, 'Balanced', 25, 0, 'ball centred', 'var(--ok)')}
      ${face(350, 'Slip', 25, -32, 'ball inside: too much bank', 'var(--warn)')}
      ${face(580, 'Skid', 25, 32, 'ball outside: too much rudder', 'var(--warn)')}
      ${T(350, 296, 'All in a rate-1 turn to the right (3°/s). Step on the ball.', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;
  };
})();

/* ---- Ch 22–23 · Systems instruments, INS ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const box = (x, y, w, h, t, hue, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>${T(x + w / 2, y + h / 2 + (sub ? -3 : 5), t, { a: 'middle', c: `var(--h${hue}i)` })}${sub ? T(x + w / 2, y + h / 2 + 15, sub, { a: 'middle', w: 600, c: 'var(--muted)' }) : ''}`;

  F['thermocouple'] = () => `<svg viewBox="0 0 700 300">
      ${T(170, 30, 'Thermocouple (self-powered)', { a: 'middle', s: 15, w: 800 })}
      <path d="M60 90 L280 90" stroke="var(--h2i)" stroke-width="6"/><path d="M60 150 L280 150" stroke="var(--h0i)" stroke-width="6"/>
      <path d="M280 90 Q310 120 280 150" fill="none" stroke="var(--warn)" stroke-width="6"/><circle cx="292" cy="120" r="10" fill="var(--warn)"/>
      ${T(300, 186, 'hot junction', { a: 'middle', c: 'var(--warn)' })}${T(300, 204, '(EGT probe / CHT)', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <circle cx="60" cy="120" r="30" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/>${T(60, 125, 'mV', { a: 'middle' })}
      ${T(40, 186, 'cold junction', { w: 600 })}${T(40, 204, 'at the gauge', { w: 600, c: 'var(--muted)' })}
      ${T(170, 250, 'two dissimilar metals → EMF', { a: 'middle', w: 600 })}${T(170, 270, '(Seebeck effect)', { a: 'middle', w: 600, c: 'var(--muted)' })}
      <line x1="370" y1="30" x2="370" y2="280" stroke="var(--line)" stroke-width="2"/>
      ${T(530, 30, 'Resistance thermometer', { a: 'middle', s: 15, w: 800 })}
      <path d="M440 90 L620 90 L620 200 L440 200 Z" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
      ${box(500, 76, 60, 28, 'R1', 0)}${box(500, 186, 60, 28, 'R2', 0)}${box(426, 130, 28, 40, '', 4)}${box(606, 130, 28, 40, '', 2)}
      ${T(400, 156, 'R3', { a: 'end', w: 600 })}${T(646, 156, 'bulb', { w: 700, c: 'var(--h2i)' })}
      <circle cx="530" cy="145" r="20" fill="var(--wash)" stroke="var(--ink)" stroke-width="2"/>${T(530, 150, 'G', { a: 'middle' })}
      ${T(530, 250, 'Wheatstone bridge: needs power', { a: 'middle', w: 600 })}${T(530, 270, 'oil and air temperature', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;

  F['ins-chain'] = () => `<svg viewBox="0 0 700 260">
      ${box(20, 90, 140, 60, 'Accelerometer', 0, 'N–S, E–W, vertical')}
      ${AR(162, 120, 196, 120, 'var(--ink)', 2.6)}${box(198, 96, 100, 48, '∫ dt', 4)}
      ${AR(300, 120, 334, 120, 'var(--ink)', 2.6)}${box(336, 90, 120, 60, 'Velocity', 1, '(groundspeed)')}
      ${AR(458, 120, 492, 120, 'var(--ink)', 2.6)}${box(494, 96, 80, 48, '∫ dt', 4)}
      ${AR(576, 120, 600, 120, 'var(--ink)', 2.6)}${box(602, 90, 90, 60, 'Distance', 2, 'position')}
      ${box(198, 190, 140, 50, 'Gyros', 5, 'keep platform level')}${AR(268, 190, 110, 152, 'var(--h5i)', 2)}
      ${T(380, 222, 'TAS from the ADC + groundspeed → wind', { w: 600, c: 'var(--muted)' })}
      ${T(20, 40, 'Newton’s laws: integrate acceleration twice', { s: 14, w: 800 })}
    </svg>`;

  F['rlg'] = () => `<svg viewBox="0 0 700 300">
      <path d="M200 40 L340 250 L60 250 Z" fill="none" stroke="var(--h0i)" stroke-width="10" stroke-linejoin="round" opacity=".35"/>
      <path d="M200 52 L326 242 L74 242 Z" fill="none" stroke="var(--warn)" stroke-width="2.4" stroke-dasharray="10 6"><animate attributeName="stroke-dashoffset" from="0" to="-64" dur="1.2s" repeatCount="indefinite"/></path>
      <path d="M200 64 L314 234 L86 234 Z" fill="none" stroke="var(--m-cold)" stroke-width="2.4" stroke-dasharray="10 6"><animate attributeName="stroke-dashoffset" from="0" to="64" dur="1.2s" repeatCount="indefinite"/></path>
      ${[[200, 40], [340, 250], [60, 250]].map(([x, y]) => `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>`).join('')}
      ${T(200, 290, 'He–Ne cavity, three mirrors', { a: 'middle', w: 600 })}
      <rect x="380" y="40" width="300" height="230" rx="14" fill="var(--wash)"/>
      ${T(396, 66, 'Two beams, opposite ways round', { w: 700 })}${T(396, 92, 'Rotation lengthens one path,', { w: 600 })}${T(396, 112, 'shortens the other:', { w: 600 })}
      ${T(396, 136, 'frequency difference ∝ rate', { c: 'var(--warn)' })}${T(396, 156, '(Sagnac effect)', { w: 600, c: 'var(--muted)' })}
      ${T(396, 188, 'Lock-in at low rates →', { w: 600 })}${T(396, 208, 'cured by a dither motor', { w: 600 })}
      ${T(396, 240, 'No moving parts, < 10 min align', { w: 600, c: 'var(--ok)' })}
    </svg>`;
})();

/* ---- Ch 24 · Radio propagation ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  F['skywave'] = () => `<svg viewBox="0 0 700 320">
      <path d="M0 290 Q350 250 700 290 L700 320 L0 320 Z" fill="var(--m-ground)"/>
      <path d="M0 80 Q350 30 700 80" fill="none" stroke="var(--h4i)" stroke-width="14" opacity=".35"/>${T(690, 60, 'F layer (rises at night)', { a: 'end', c: 'var(--h4i)' })}
      <path d="M0 130 Q350 90 700 130" fill="none" stroke="var(--h1i)" stroke-width="10" opacity=".35"/>${T(690, 116, 'E layer', { a: 'end', c: 'var(--h1i)' })}
      <path d="M0 170 Q350 135 700 170" fill="none" stroke="var(--h0i)" stroke-width="8" opacity=".3" stroke-dasharray="8 6"/>${T(690, 158, 'D layer (day only)', { a: 'end', c: 'var(--h0i)' })}
      <rect x="56" y="250" width="10" height="34" fill="var(--ink)"/>${T(40, 312, 'transmitter', { w: 600 })}
      <path d="M62 258 Q120 268 170 278" fill="none" stroke="var(--ok)" stroke-width="3"/>${T(110, 246, 'ground wave', { c: 'var(--ok)' })}
      <path d="M62 252 L300 72 L540 272" fill="none" stroke="var(--warn)" stroke-width="3"/>
      <path d="M62 252 L180 30" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 4"/>${T(190, 28, 'too steep: escapes', { w: 600, c: 'var(--muted)' })}
      <path d="M170 286 L540 286" stroke="var(--h2i)" stroke-width="3"/>${T(355, 278, 'dead space', { a: 'middle', c: 'var(--h2i)' })}
      <path d="M62 300 L540 300" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="4 3"/>
      <circle cx="540" cy="272" r="7" fill="var(--warn)"/>${T(548, 262, 'first sky wave', { c: 'var(--warn)' })}
      ${T(300, 312, 'skip distance', { a: 'middle', w: 700 })}
    </svg>`;
})();

/* ---- Ch 25 · ADF, VOR, DME ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');
  const polar = (cx, cy, k, f) => P([...Array(181)].map((_, i) => { const a = i * 2 * Math.PI / 180; const r = Math.abs(f(a)) * k; return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; })) + ' Z';

  F['cardioid'] = () => `<svg viewBox="0 0 700 300">
      ${T(110, 30, 'Loop: figure of 8', { a: 'middle', s: 14, w: 800 })}<path d="${polar(110, 160, 80, a => Math.cos(a))}" fill="var(--h0)" opacity=".7" stroke="var(--h0i)" stroke-width="2"/>
      ${T(110, 280, 'two nulls: 180° ambiguity', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${T(255, 165, '+', { a: 'middle', s: 26, w: 800 })}
      ${T(350, 30, 'Sense: circle', { a: 'middle', s: 14, w: 800 })}<circle cx="350" cy="160" r="80" fill="var(--h1)" opacity=".7" stroke="var(--h1i)" stroke-width="2"/>
      ${T(350, 280, 'no direction', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${T(470, 165, '=', { a: 'middle', s: 26, w: 800 })}
      ${T(590, 30, 'Cardioid', { a: 'middle', s: 14, w: 800 })}<path d="${polar(590, 170, 55, a => 1 + Math.cos(a))}" fill="var(--h4)" opacity=".75" stroke="var(--h4i)" stroke-width="2"/>
      <circle cx="590" cy="170" r="5" fill="var(--warn)"/>${T(604, 196, 'single null', { c: 'var(--warn)' })}${T(590, 280, 'points to the NDB', { a: 'middle', w: 600, c: 'var(--muted)' })}
    </svg>`;

  F['vor-phase'] = () => {
    const X = d => 60 + d * 1.6, wave = (ph, col, y0) => `<path d="${P([...Array(73)].map((_, i) => { const d = i * 5; return [X(d), y0 - 30 * Math.cos((d - ph) * Math.PI / 180)]; }))}" fill="none" stroke="${col}" stroke-width="3"/>`;
    return `<svg viewBox="0 0 700 320">
      ${T(60, 30, 'Aircraft on radial 090', { s: 15, w: 800 })}
      ${wave(0, 'var(--h0i)', 100)}${T(660, 104, 'reference 30 Hz (FM)', { a: 'end', c: 'var(--h0i)' })}
      ${wave(90, 'var(--warn)', 200)}${T(660, 204, 'variable 30 Hz (AM)', { a: 'end', c: 'var(--warn)' })}
      <line x1="${X(0)}" y1="60" x2="${X(0)}" y2="250" stroke="var(--muted)" stroke-dasharray="4 4"/><line x1="${X(90)}" y1="160" x2="${X(90)}" y2="250" stroke="var(--muted)" stroke-dasharray="4 4"/>
      ${AR(X(0), 240, X(90) - 2, 240, 'var(--ink)', 2.4)}${T(X(45), 268, '90° phase difference', { a: 'middle', w: 700 })}
      ${T(60, 304, 'In phase at magnetic north; phase difference = radial (FROM the station).', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['dme-slant'] = () => `<svg viewBox="0 0 700 300">
      <rect x="0" y="250" width="700" height="50" fill="var(--m-ground)"/>
      <rect x="100" y="216" width="16" height="34" fill="var(--ink)"/>${T(108, 284, 'DME', { a: 'middle', w: 700, c: 'var(--paper)' })}
      ${G.FH.plane(520, 80, 1.6, 0, 'var(--ink)')}
      <line x1="108" y1="216" x2="510" y2="84" stroke="var(--warn)" stroke-width="3"/>${T(290, 130, 'slant range (what DME shows)', { a: 'middle', c: 'var(--warn)' })}
      <line x1="520" y1="96" x2="520" y2="250" stroke="var(--h0i)" stroke-width="2" stroke-dasharray="6 4"/>${T(512, 180, 'height', { a: 'end', c: 'var(--h0i)' })}
      <line x1="108" y1="250" x2="520" y2="250" stroke="var(--ok)" stroke-width="3"/>${T(314, 244, 'ground distance', { a: 'middle', c: 'var(--ok)' })}
      <rect x="560" y="120" width="130" height="80" rx="12" fill="var(--wash)"/>${T(574, 144, 'Overhead:', { w: 700 })}${T(574, 164, 'DME = height', { w: 600 })}${T(574, 184, '6000 ft ≈ 1 nm', { w: 600 })}
    </svg>`;
})();

/* ---- Ch 26 · ILS, weather radar ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  F['ils-lobes'] = () => `<svg viewBox="0 0 700 340">
      ${T(20, 26, 'Localiser (plan view, approaching from the left)', { s: 14, w: 800 })}
      <rect x="430" y="92" width="200" height="24" fill="var(--m-asphalt)"/><rect x="636" y="98" width="12" height="12" fill="var(--ink)"/>${T(642, 132, 'LOC', { a: 'middle', w: 700 })}
      <path d="M642 104 L40 30 L40 104 Z" fill="var(--m-sun)" opacity=".35"/><path d="M642 104 L40 178 L40 104 Z" fill="var(--m-cold)" opacity=".35"/>
      <line x1="40" y1="104" x2="642" y2="104" stroke="var(--ink)" stroke-dasharray="6 4" stroke-width="1.6"/>
      ${T(60, 64, '90 Hz (left)', { c: 'var(--num)' })}${T(60, 154, '150 Hz (right)', { c: 'var(--m-cold)' })}${T(250, 98, 'equal: on centreline', { w: 600 })}
      ${G.FH.plane(150, 104, 1.3, 0, 'var(--ink)')}
      ${T(300, 200, 'Glidepath (profile)', { s: 14, w: 800 })}
      <rect x="0" y="318" width="700" height="10" fill="var(--m-ground)"/><rect x="470" y="312" width="200" height="6" fill="var(--m-asphalt)"/>
      <line x1="530" y1="318" x2="20" y2="228" stroke="var(--ink)" stroke-dasharray="6 4" stroke-width="1.6"/>
      <path d="M530 318 L20 190 L20 228 Z" fill="var(--m-sun)" opacity=".35"/><path d="M530 318 L20 228 L20 270 Z" fill="var(--m-cold)" opacity=".35"/>
      ${T(40, 228, '90 Hz above', { c: 'var(--num)' })}${T(40, 262, '150 Hz below', { c: 'var(--m-cold)' })}
      ${T(560, 300, 'GP aerial', { w: 600 })}${T(300, 250, '3°: 300 ft per nm', { w: 700 })}
    </svg>`;

  F['wx-radar'] = () => {
    const cx = 200, cy = 300;
    const arcs = [80, 160, 240].map(r => `<path d="M${cx - r * Math.sin(Math.PI / 3)} ${cy - r * Math.cos(Math.PI / 3)} A${r} ${r} 0 0 1 ${cx + r * Math.sin(Math.PI / 3)} ${cy - r * Math.cos(Math.PI / 3)}" fill="none" stroke="var(--wire)" stroke-width="1.2"/>`).join('');
    return `<svg viewBox="0 0 700 320">
      <path d="M${cx} ${cy} L${cx - 280 * Math.sin(Math.PI / 3)} ${cy - 280 * Math.cos(Math.PI / 3)} A280 280 0 0 1 ${cx + 280 * Math.sin(Math.PI / 3)} ${cy - 280 * Math.cos(Math.PI / 3)} Z" fill="#0b0f14"/>${arcs}
      <ellipse cx="210" cy="140" rx="70" ry="44" fill="#2EA060"/><ellipse cx="215" cy="140" rx="44" ry="28" fill="#E5B92B"/><ellipse cx="222" cy="140" rx="22" ry="14" fill="#D9372B"/><ellipse cx="226" cy="138" rx="8" ry="6" fill="#C03BC0"/>
      <path d="M262 150 q22 10 10 30 q-12 6 -18 -8" fill="#D9372B"/>
      <path d="M200 96 L230 40 L250 96 Z" fill="#000" opacity=".9"/>
      ${G.FH.plane(cx, cy - 6, 1.2, -90, '#ffffff')}
      <rect x="400" y="30" width="280" height="270" rx="14" fill="var(--wash)"/>
      ${[['#2EA060', 'green: light'], ['#E5B92B', 'yellow: medium'], ['#D9372B', 'red: heavy'], ['#C03BC0', 'magenta: turbulence']].map(([c, t], i) => `<rect x="416" y="${52 + i * 26}" width="18" height="14" fill="${c}"/>${T(442, 64 + i * 26, t, { w: 600 })}`).join('')}
      ${T(416, 186, 'Worst where colours change', { w: 700 })}${T(416, 204, 'fastest; hooks and fingers', { w: 600 })}${T(416, 222, '= hail or tornado', { w: 600 })}
      ${T(416, 256, 'Black wedge behind a cell:', { w: 600 })}${T(416, 274, 'radar shadow, not clear air', { w: 600, c: 'var(--warn)' })}
    </svg>`;
  };
})();

/* ---- Ch 27 · TCAS ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T } = G.HB;
  F['tcas-display'] = () => {
    const cx = 200, cy = 190;
    const dia = (x, y, fill, lab) => `<path d="M${x} ${y - 11} L${x + 11} ${y} L${x} ${y + 11} L${x - 11} ${y} Z" fill="${fill ? '#2BC4D9' : 'none'}" stroke="#2BC4D9" stroke-width="2.4"/>${T(x + 14, y - 8, lab, { w: 700, c: '#2BC4D9' })}`;
    return `<svg viewBox="0 0 700 330">
      <rect x="30" y="20" width="340" height="300" rx="16" fill="#0b0f14"/>
      <circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="#9aa3b2" stroke-width="1.4" stroke-dasharray="3 6"/>
      ${G.FH.plane(cx, cy, 1.3, -90, '#ffffff')}
      ${dia(110, 80, false, '+21')}${dia(270, 130, true, '−06↑')}
      <circle cx="140" cy="230" r="10" fill="#E5B92B"/>${T(156, 222, '+04↓', { w: 700, c: '#E5B92B' })}
      <rect x="236" y="214" width="20" height="20" fill="#D9372B"/>${T(262, 222, '−02↑', { w: 700, c: '#D9372B' })}
      <rect x="400" y="20" width="280" height="300" rx="14" fill="var(--wash)"/>
      <path d="M420 52 L430 42 L440 52 L430 62 Z" fill="none" stroke="#2BC4D9" stroke-width="2.4"/>${T(452, 57, 'other traffic', { w: 600 })}
      <path d="M420 102 L430 92 L440 102 L430 112 Z" fill="#2BC4D9"/>${T(452, 100, 'proximate', { w: 700 })}${T(452, 118, 'within 6 nm, ±1200 ft', { w: 600, c: 'var(--muted)' })}
      <circle cx="430" cy="156" r="10" fill="#E5B92B"/>${T(452, 154, 'TA: "Traffic, traffic"', { w: 700 })}${T(452, 172, '20–48 s; look, no manoeuvre', { w: 600, c: 'var(--muted)' })}
      <rect x="420" y="200" width="20" height="20" fill="#D9372B"/>${T(452, 208, 'RA: climb / descend', { w: 700 })}${T(452, 226, '15–35 s; act within 5 s', { w: 600, c: 'var(--muted)' })}
      ${T(416, 266, '+21 = 2100 ft above', { w: 600 })}${T(416, 286, '↑ / ↓ = climbing/descending', { w: 600 })}${T(416, 304, '> 500 fpm', { w: 600 })}
    </svg>`;
  };
})();

/* ---- Ch 28 · Mass and runway ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  F['hb-mass-stack'] = () => {
    const seg = (x, y0, h, hue, t) => `<rect x="${x}" y="${y0 - h}" width="90" height="${h}" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="2"/>${T(x + 45, y0 - h / 2 + 5, t, { a: 'middle', c: `var(--h${hue}i)` })}`;
    const col = (x, parts, label) => { let y = 290, s = ''; parts.forEach(([h, hue, t]) => { s += seg(x, y, h, hue, t); y -= h; }); return s + T(x + 45, 314, label, { a: 'middle', s: 14, w: 800 }); };
    const B = [110, 0, 'BEM'], V = [40, 4, 'crew etc'], L = [60, 1, 'traffic'], F1 = [60, 2, 'fuel'];
    return `<svg viewBox="0 0 700 330">
      ${col(20, [B], 'BEM')}${col(130, [B, V], 'DOM')}${col(240, [B, V, L], 'ZFM')}${col(350, [B, V, L, F1], 'TOM')}${col(460, [B, V, L, [25, 2, 'reserve']], 'LM')}
      ${AR(548, 70, 548, 100, 'var(--warn)', 2.4)}${T(560, 86, 'trip fuel', { c: 'var(--warn)' })}${T(560, 104, 'burnt', { c: 'var(--warn)' })}
      ${T(580, 180, 'ZFM = DOM + TL', { w: 700 })}${T(580, 202, 'TOM = ZFM + fuel', { w: 700 })}${T(580, 224, 'LM = TOM − trip', { w: 700 })}
    </svg>`;
  };
  F['declared-distances'] = () => {
    const bar = (y, x1, x2, col, t) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${col}" stroke-width="3"/><line x1="${x1}" y1="${y - 7}" x2="${x1}" y2="${y + 7}" stroke="${col}" stroke-width="3"/><line x1="${x2}" y1="${y - 7}" x2="${x2}" y2="${y + 7}" stroke="${col}" stroke-width="3"/>${T((x1 + x2) / 2, y - 8, t, { a: 'middle', c: col })}`;
    return `<svg viewBox="0 0 700 300">
      <rect x="40" y="90" width="460" height="44" fill="var(--m-asphalt)"/><line x1="60" y1="112" x2="480" y2="112" stroke="var(--m-paint)" stroke-width="3" stroke-dasharray="20 14"/>
      <rect x="500" y="94" width="70" height="36" fill="var(--h4)" stroke="var(--h4i)" stroke-width="2"/>${T(535, 150, 'stopway', { a: 'middle', c: 'var(--h4i)' })}
      <path d="M500 76 L660 66 L660 158 L500 148 Z" fill="none" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 4"/>${T(620, 60, 'clearway', { a: 'middle', c: 'var(--ok)' })}
      ${T(270, 70, 'RUNWAY', { a: 'middle', w: 700, c: 'var(--muted)' })}
      ${bar(190, 40, 500, 'var(--ink)', 'TORA')}${bar(222, 40, 570, 'var(--h4i)', 'ASDA = TORA + stopway')}${bar(254, 40, 660, 'var(--ok)', 'TODA = TORA + clearway')}${bar(286, 80, 500, 'var(--h0i)', 'LDA (here with a displaced threshold)')}
    </svg>`;
  };
})();

/* ---- Ch 29 · Performance ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const P = pts => 'M' + pts.map(p => p.map(v => (+v).toFixed(1)).join(' ')).join(' L');

  F['takeoff-speeds'] = () => {
    const sp = [['VMCG', 120, 'rudder can hold', 'an engine failure'], ['V1', 230, 'go / stop', 'decision'], ['VR', 330, 'rotate', ''], ['VLOF', 420, 'lift-off', ''], ['V2', 560, 'safety speed', 'by 35 ft']];
    return `<svg viewBox="0 0 700 300">
      <rect x="20" y="200" width="460" height="30" fill="var(--m-asphalt)"/><rect x="0" y="230" width="700" height="10" fill="var(--m-ground)"/>
      <path d="M20 196 L400 196 Q470 190 560 120 L690 60" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/>
      ${sp.map(([n, x, a, b], i) => { const y = x < 430 ? 196 : (x === 560 ? 120 : 196); return `<circle cx="${x}" cy="${y}" r="7" fill="var(--h${i}i)"/><line x1="${x}" y1="${y - 8}" x2="${x}" y2="${60 + (i % 2) * 34}" stroke="var(--h${i}i)" stroke-width="1.4"/>${T(x, 52 + (i % 2) * 34, n, { a: 'middle', s: 15, w: 800, c: `var(--h${i}i)` })}${T(x, 262, a, { a: 'middle', w: 600 })}${b ? T(x, 280, b, { a: 'middle', w: 600, c: 'var(--muted)' }) : ''}`; }).join('')}
      <line x1="560" y1="120" x2="560" y2="230" stroke="var(--muted)" stroke-dasharray="3 3"/>${T(574, 190, '35 ft', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['takeoff-segments'] = () => {
    const X = d => 40 + d * 6.4, Y = h => 270 - h * 0.15;
    const path = [[0, 35], [12, 120], [45, 400], [70, 400], [100, 1500]];
    const net = path.map(([d, h], i) => [d, i === 0 ? 35 : h - i * 60]);
    return `<svg viewBox="0 0 700 320">
      <rect x="0" y="270" width="700" height="12" fill="var(--m-ground)"/><rect x="0" y="266" width="${X(0)}" height="6" fill="var(--m-asphalt)"/>
      <path d="${P(path.map(([d, h]) => [X(d), Y(h)]))}" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <path d="${P(net.map(([d, h]) => [X(d), Y(h)]))}" fill="none" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>
      ${T(X(100) - 4, Y(1500) - 10, '1500 ft', { a: 'end', w: 700 })}${T(X(70) + 8, Y(400) + 22, 'net path (−0.8%)', { c: 'var(--warn)' })}
      ${[[6, '1', 'gear up', 'positive'], [28, '2', 'V2, T/O flap', '2.4%'], [57, '3', 'accelerate,', 'flaps up'], [86, '4', 'clean, MCT', '1.2%']].map(([d, n, a, b]) => `${T(X(d), 40, 'Segment ' + n, { a: 'middle', s: 14, w: 800 })}${T(X(d), 60, a, { a: 'middle', w: 600 })}${T(X(d), 78, b, { a: 'middle', c: 'var(--h0i)' })}`).join('')}
      ${[12, 45, 70].map(d => `<line x1="${X(d)}" y1="90" x2="${X(d)}" y2="268" stroke="var(--line)" stroke-width="1.6"/>`).join('')}
      ${T(X(0) + 4, Y(35) + 22, '35 ft', { w: 600, c: 'var(--muted)' })}${T(X(45), Y(400) - 10, '400 ft', { a: 'middle', w: 600, c: 'var(--muted)' })}
      ${T(20, 306, 'Twin-engine gross gradients, one engine inoperative. Obstacles cleared by the net path + 35 ft.', { w: 600, c: 'var(--muted)' })}
    </svg>`;
  };

  F['coffin-corner'] = () => {
    const X = v => 80 + (v - 120) * 1.3, Y = fl => 280 - fl * 0.6, top = 370 / 0.9;
    const st = fl => 150 + 0.5 * fl, mc = fl => 520 - 0.4 * fl;
    const line = f => P([...Array(31)].map((_, i) => { const fl = top * i / 30; return [X(f(fl)), Y(fl)]; }));
    const cx = X(st(top)), cy = Y(top);
    return `<svg viewBox="0 0 700 320">
      <path d="${line(st)} L${X(mc(top))} ${cy} ${P([...Array(31)].map((_, i) => { const fl = top * (30 - i) / 30; return [X(mc(fl)), Y(fl)]; })).replace('M', 'L')} Z" fill="var(--h1)" opacity=".45"/>
      <line x1="80" y1="20" x2="80" y2="280" stroke="var(--ink)" stroke-width="2"/><line x1="80" y1="280" x2="660" y2="280" stroke="var(--ink)" stroke-width="2"/>
      ${T(24, 24, 'FL', { w: 700 })}${T(656, 302, 'TAS', { a: 'end' })}
      <path d="${line(st)}" fill="none" stroke="var(--h2i)" stroke-width="3"/>${T(X(st(150)) - 10, Y(150), 'low-speed', { a: 'end', c: 'var(--h2i)' })}${T(X(st(150)) - 10, Y(150) + 18, '(stall) buffet', { a: 'end', c: 'var(--h2i)' })}
      <path d="${line(mc)}" fill="none" stroke="var(--h0i)" stroke-width="3"/>${T(X(mc(150)) + 10, Y(150), 'high-speed', { c: 'var(--h0i)' })}${T(X(mc(150)) + 10, Y(150) + 18, '(Mach) buffet', { c: 'var(--h0i)' })}
      <circle cx="${cx}" cy="${cy}" r="9" fill="var(--warn)"/>${T(cx + 16, cy + 5, 'coffin corner = aerodynamic ceiling', { c: 'var(--warn)' })}
      ${T((X(st(60)) + X(mc(60))) / 2, Y(60), 'flyable speed band', { a: 'middle', w: 700, c: 'var(--h1i)' })}
    </svg>`;
  };
})();

/* ---- Ch 30–31 · Aeromedical ---- */
(function () {
  'use strict';
  const F = G.FIGS, { T, AR } = G.HB;
  const lab = (x1, y1, x2, y2, t, a = 'start', c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--ink)" stroke-width="1.2"/>${T(x2 + (a === 'end' ? -4 : 4), y2 + 4, t, { a, w: 600, c })}`;

  F['eye'] = () => `<svg viewBox="0 0 700 320">
      <circle cx="260" cy="160" r="120" fill="var(--wash)" stroke="var(--ink)" stroke-width="2.6"/>
      <path d="M150 110 A120 120 0 0 0 150 210" fill="none" stroke="var(--h0i)" stroke-width="5"/>
      <ellipse cx="160" cy="160" rx="16" ry="44" fill="var(--h0)" stroke="var(--h0i)" stroke-width="2"/>
      <path d="M380 160 m-8 -90 A120 120 0 0 1 372 252" fill="none" stroke="var(--h2i)" stroke-width="7"/>
      <circle cx="378" cy="160" r="7" fill="var(--warn)"/>
      <path d="M380 160 L450 170 L460 190" fill="none" stroke="var(--h4i)" stroke-width="8"/>
      <line x1="40" y1="160" x2="378" y2="160" stroke="var(--m-sun)" stroke-width="1.6" stroke-dasharray="5 4"/>
      ${lab(150, 112, 70, 60, 'cornea', 'end')}${lab(160, 200, 80, 270, 'lens', 'end')}${lab(385, 158, 470, 120, 'fovea: cones only', 'start', 'var(--warn)')}
      ${lab(372, 230, 470, 260, 'retina: rods densest', 'start', 'var(--h2i)')}${T(474, 280, '~10° off the fovea', { w: 600, c: 'var(--muted)' })}
      ${lab(456, 186, 520, 200, 'optic nerve (blind spot)')}
      <rect x="470" y="20" width="220" height="80" rx="12" fill="var(--wash)"/>${T(484, 44, 'Cones: day, colour, sharp', { w: 700 })}${T(484, 66, 'Rods: night, periphery,', { w: 700 })}${T(484, 86, '30 min to adapt', { w: 600, c: 'var(--muted)' })}
    </svg>`;

  F['ear'] = () => `<svg viewBox="0 0 700 320">
      <path d="M40 120 Q20 160 50 210 Q90 240 110 180 L230 170 L230 150 L110 140 Q80 90 40 120 Z" fill="var(--h1)" stroke="var(--h1i)" stroke-width="2"/>
      <line x1="232" y1="132" x2="232" y2="188" stroke="var(--ink)" stroke-width="5"/>
      <path d="M240 160 l20 -14 l20 10 l18 -6" fill="none" stroke="var(--h4i)" stroke-width="6" stroke-linecap="round"/>
      <path d="M250 190 Q300 250 380 280" fill="none" stroke="var(--h0i)" stroke-width="8"/>
      <path d="M330 170 q30 -10 30 20 q0 30 -30 30 q-24 0 -24 -20 q0 -16 18 -16" fill="none" stroke="var(--h2i)" stroke-width="6"/>
      ${[[340, 110, 40], [370, 120, 36], [356, 90, 30]].map(([x, y, r], i) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.6}" transform="rotate(${i * 60} ${x} ${y})" fill="none" stroke="var(--h3i)" stroke-width="5"/>`).join('')}
      ${lab(80, 210, 40, 270, 'outer ear', 'start')}${lab(232, 186, 200, 260, 'eardrum', 'end')}${lab(270, 152, 240, 60, 'ossicles (middle ear)', 'end', 'var(--h4i)')}
      ${lab(340, 210, 420, 230, 'cochlea: hearing', 'start', 'var(--h2i)')}${lab(390, 100, 450, 70, 'semicircular canals: angular', 'start', 'var(--h3i)')}
      ${lab(340, 140, 450, 150, 'otoliths: linear, gravity', 'start', 'var(--h1i)')}${lab(330, 265, 420, 296, 'Eustachian tube: equalises pressure', 'start', 'var(--h0i)')}
    </svg>`;

  F['illusions-runway'] = () => {
    const rw = (x, top, bot, title, note, col) => `<path d="M${x - top / 2} 70 L${x + top / 2} 70 L${x + bot / 2} 230 L${x - bot / 2} 230 Z" fill="var(--m-asphalt)"/>${T(x, 40, title, { a: 'middle', s: 14, w: 800, c: col })}${T(x, 262, note[0], { a: 'middle', w: 600 })}${T(x, 282, note[1], { a: 'middle', w: 600, c: 'var(--warn)' })}`;
    return `<svg viewBox="0 0 700 300">
      ${rw(90, 40, 120, 'Normal', ['correct picture', ''], 'var(--ok)')}
      ${rw(260, 60, 120, 'Up-slope / narrow', ['looks steep: feel high', '→ flies LOW'], 'var(--warn)')}
      ${rw(430, 26, 140, 'Down-slope / wide', ['looks flat: feel low', '→ flies HIGH'], 'var(--warn)')}
      <rect x="530" y="70" width="160" height="160" fill="#05070a"/><path d="M590 170 L630 170 L640 220 L580 220 Z" fill="#E5B92B" opacity=".8"/>
      ${T(610, 40, 'Black hole', { a: 'middle', s: 14, w: 800, c: 'var(--warn)' })}${T(610, 262, 'dark terrain at night', { a: 'middle', w: 600 })}${T(610, 282, '→ below glidepath', { a: 'middle', w: 600, c: 'var(--warn)' })}
    </svg>`;
  };

  F['hypoxia-stages'] = () => {
    const Y = h => 290 - h / 25000 * 260;
    const band = (h1, h2, hue, t, s) => `<rect x="60" y="${Y(h2)}" width="300" height="${Y(h1) - Y(h2)}" fill="var(--h${hue})" stroke="var(--h${hue}i)"/>${T(76, (Y(h1) + Y(h2)) / 2 - 2, t, { c: `var(--h${hue}i)` })}${T(76, (Y(h1) + Y(h2)) / 2 + 16, s, { w: 600, c: 'var(--muted)' })}`;
    return `<svg viewBox="0 0 700 310">
      ${band(0, 10000, 1, 'Indifferent', 'to 10,000 ft')}${band(10000, 15000, 4, 'Compensatory', 'breathing, pulse rise')}${band(15000, 20000, 2, 'Disturbance', 'body can’t cope')}${band(20000, 25000, 5, 'Critical', 'rapid collapse')}
      ${[0, 10000, 15000, 20000, 25000].map(h => T(52, Y(h) + 5, (h / 1000) + 'k', { a: 'end', w: 600 })).join('')}
      <rect x="400" y="30" width="280" height="250" rx="14" fill="var(--wash)"/>
      ${T(416, 56, 'Time of useful consciousness', { w: 800 })}
      ${[['20,000 ft', '≈ 10 min'], ['25,000 ft', '≈ 3 min'], ['27,000 ft', '≈ 1.5 min'], ['30,000 ft', '≈ 70 s']].map(([a, b], i) => `${T(416, 92 + i * 30, a, { w: 600 })}${T(664, 92 + i * 30, b, { a: 'end', c: 'var(--warn)' })}`).join('')}
      ${T(416, 228, 'Smokers: ~4000–5000 ft lower', { w: 600 })}${T(416, 252, 'In doubt at altitude: hypoxia', { w: 700, c: 'var(--warn)' })}
    </svg>`;
  };
})();
