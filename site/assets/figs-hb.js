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
