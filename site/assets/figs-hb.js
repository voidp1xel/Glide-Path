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
    return { d: 'M' + up.concat(lo).map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L') + ' Z', camber: 'M' + camber.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L'), R };
  }

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
