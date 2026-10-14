/* Glidepath figure library: named, theme-aware SVG illustrations. G.fig(name, opts) -> <svg>. Figures register in G.FIGS. */
(function () {
  'use strict';
  const FIGS = (G.FIGS = G.FIGS || {});
  G.fig = function (name, o) {
    const f = FIGS[name];
    const d = document.createElement('div');
    if (!f) { d.innerHTML = '<svg viewBox="0 0 200 60" class="fig"><text x="10" y="35" class="sm">[figure: ' + name + ']</text></svg>'; return d.firstChild; }
    d.innerHTML = f(o || {}).trim();
    const s = d.firstElementChild; if (s) s.classList.add('fig');
    return s;
  };
  /* tiny shape helpers used by figure strings */
  const H = (G.FH = {
    cloud(x, y, s = 1, fill = 'var(--m-cloud)', stroke = 'var(--m-cloudline)') {
      return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 10 a14 14 0 0 1 4-25 a20 20 0 0 1 36-6 a15 15 0 0 1 24 12 a12 12 0 0 1-2 19z" fill="${fill}" stroke="${stroke}" stroke-width="${1.6 / s}"/></g>`;
    },
    cb(x, y, s = 1) { // cumulonimbus: cauliflower tower + anvil; (x,y) = centre of base
      return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 0 q-24-22 -2-44 q-22-30 10-52 q-12-34 28-46 L-130 -150 q-26-10 2-24 L160 -178 q28 8 2 26 L62 -140 q36 12 24 48 q30 22 8 50 q24 26 -14 42 Z" fill="var(--m-cloud)" stroke="var(--m-cloudline)" stroke-width="${1.8 / s}" stroke-linejoin="round"/><path d="M-60 -60 q20 -14 40 0 M0 -95 q20 -14 40 0 M-30 -20 q24 -12 48 0" fill="none" stroke="var(--m-cloudline)" stroke-width="${1.2 / s}"/></g>`;
    },
    plane(x, y, s = 1, rot = 0, col = 'var(--ink)') {
      return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-14 0 h22 l8-3 a3 3 0 0 1 0 6 l-8-3 M-2 0 l-6-12 h4 l10 12 M-2 0 l-6 12 h4 l10-12 M-14 0 l-4-6 h3 l5 6 M-14 0 l-4 6 h3 l5-6" fill="none" stroke="${col}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></g>`;
    },
    sun(x, y, r = 16) {
      let rays = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `<line x1="${x + Math.cos(a) * (r + 5)}" y1="${y + Math.sin(a) * (r + 5)}" x2="${x + Math.cos(a) * (r + 13)}" y2="${y + Math.sin(a) * (r + 13)}" stroke="var(--m-sun)" stroke-width="3" stroke-linecap="round"/>`; }
      return `<g class="anim-spin" style="transform-origin:${x}px ${y}px">${rays}</g><circle cx="${x}" cy="${y}" r="${r}" fill="var(--m-sun)"/>`;
    },
    arrow(x1, y1, x2, y2, col = 'var(--ink)', w = 2.2, dash = '') {
      const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
      const p1 = [x2 - h * Math.cos(a - .45), y2 - h * Math.sin(a - .45)], p2 = [x2 - h * Math.cos(a + .45), y2 - h * Math.sin(a + .45)];
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ''}/><path d="M${p1} L${x2},${y2} L${p2}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    },
    label(x, y, t, cls = 'lbl', anchor = 'middle', extra = '') { return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" ${extra}>${t}</text>`; },
    pill(x, y, t, hue = 0, anchor = 'middle') {
      const w = t.length * 6.8 + 16; const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
      return `<rect x="${x0}" y="${y - 12}" width="${w}" height="22" rx="11" fill="var(--h${hue})" stroke="var(--h${hue}i)" stroke-width="1"/><text x="${x0 + w / 2}" y="${y + 3.5}" text-anchor="middle" style="font:700 11.5px var(--font);fill:var(--h${hue}i)">${t}</text>`;
    },
    rain(x, y, w, n = 6, col = 'var(--m-rain)') { let s = ''; for (let i = 0; i < n; i++) { const xx = x + (i + .5) * (w / n); s += `<line class="anim-fall" style="animation-delay:${(i % 3) * .35}s" x1="${xx}" y1="${y}" x2="${xx - 4}" y2="${y + 12}" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`; } return s; },
    ground(y, w = 640, col = 'var(--m-ground)') { return `<rect x="0" y="${y}" width="${w}" height="40" fill="${col}"/>`; },
    sea(x, y, w, h = 40) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--m-sea)"/>`; },
  });
})();
