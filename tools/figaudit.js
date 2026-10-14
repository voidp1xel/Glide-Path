// Paste-able audit: renders every G.FIGS figure in an overlay and reports clipping, overlap, hidden text, low contrast, tiny text.
window.__figaudit = async function (width = 680, only) {
  const out = [];
  const box = document.createElement('div');
  box.style.cssText = `position:fixed;left:0;top:0;width:${width}px;z-index:2147483647;background:var(--card,var(--bg));padding:0`;
  box.className = 'lesson';
  document.body.appendChild(box);
  const parse = c => { const m = c.match(/[\d.]+/g); return m ? m.slice(0, 4).map(Number) : [0, 0, 0, 1]; };
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const cr = (a, b) => { const A = lum(a), B = lum(b); return (Math.max(A, B) + .05) / (Math.min(A, B) + .05); };
  const blend = (top, a, bot) => top.map((v, i) => v * a + bot[i] * (1 - a));
  const pageBg = parse(getComputedStyle(box).backgroundColor).slice(0, 3);
  const names = only || Object.keys(G.FIGS);
  for (const name of names) {
    let svgStr; try { svgStr = G.FIGS[name](); } catch (e) { out.push([name, 'ERROR', String(e).slice(0, 80)]); continue; }
    if (typeof svgStr !== 'string' || !svgStr.includes('<svg')) continue;
    box.innerHTML = `<div class="fig">${svgStr}</div>`;
    const svg = box.querySelector('svg'); if (!svg) continue;
    svg.classList.add('fig'); svg.style.width = '100%'; svg.style.height = 'auto'; svg.style.display = 'block';
    await new Promise(r => setTimeout(r, 0));
    const S = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal; const scale = vb && vb.width ? S.width / vb.width : 1;
    const texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim() && getComputedStyle(t).display !== 'none' && getComputedStyle(t).visibility !== 'hidden' && +getComputedStyle(t).opacity > 0.05);
    const R = texts.map(t => t.getBoundingClientRect());
    texts.forEach((t, i) => {
      const r = R[i], tx = t.textContent.trim().slice(0, 40);
      if (r.width === 0) return;
      if (r.left < S.left - 2 || r.right > S.right + 2 || r.top < S.top - 2 || r.bottom > S.bottom + 2) out.push([name, 'CLIP', tx]);
      const fs = parseFloat(getComputedStyle(t).fontSize) * scale;
      if (fs < 10.5) out.push([name, 'SMALL', tx + ' (' + fs.toFixed(1) + 'px)']);
      for (let j = i + 1; j < texts.length; j++) {
        const q = R[j]; if (q.width === 0) continue;
        const ix = Math.min(r.right, q.right) - Math.max(r.left, q.left), iy = Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top);
        if (ix > 2 && iy > Math.min(r.height, q.height) * 0.35) out.push([name, 'OVERLAP', tx + '  ×  ' + texts[j].textContent.trim().slice(0, 40)]);
      }
      // hidden / contrast: sample points along the baseline middle
      const pts = [[r.left + r.width * .5, r.top + r.height * .55], [r.left + Math.min(6, r.width / 3), r.top + r.height * .55], [r.right - Math.min(6, r.width / 3), r.top + r.height * .55]];
      let hidden = 0, worst = 99;
      const fill = parse(getComputedStyle(t).fill || 'rgb(0,0,0)');
      const tOp = +getComputedStyle(t).opacity * (fill[3] ?? 1);
      for (const [x, y] of pts) {
        if (x < 0 || y < 0 || y > innerHeight) continue;
        const stack = document.elementsFromPoint(x, y);
        const topIn = stack.find(e => svg.contains(e) && e !== svg);
        if (topIn && topIn !== t && !t.contains(topIn) && topIn.tagName !== 'text' && topIn.tagName !== 'tspan' && !topIn.closest('text')) {
          const cs = getComputedStyle(topIn);
          if ((cs.fill !== 'none' && +cs.fillOpacity * +cs.opacity > .5) && topIn.tagName !== 'line' && topIn.tagName !== 'g') hidden++;
        }
        // background under the text
        let bg = pageBg;
        const under = stack.filter(e => svg.contains(e) && e !== svg && !e.closest('text')).reverse();
        for (const e of under) { const cs = getComputedStyle(e); if (cs.fill && cs.fill !== 'none' && !cs.fill.startsWith('url')) { const c = parse(cs.fill); const a = (c[3] ?? 1) * +cs.fillOpacity * +cs.opacity * +(getComputedStyle(e.parentElement).opacity || 1); bg = blend(c.slice(0, 3), a, bg); } }
        const tcs = getComputedStyle(t);
        const halo = tcs.paintOrder && tcs.paintOrder.startsWith('stroke') && tcs.stroke && tcs.stroke !== 'none' && parseFloat(tcs.strokeWidth) >= 2;
        const hb = halo ? blend(parse(tcs.stroke).slice(0, 3), Math.min(1, (parse(tcs.stroke)[3] ?? 1) * +tcs.strokeOpacity), bg) : bg;
        const fc = blend(fill.slice(0, 3), Math.min(1, tOp), hb);
        worst = Math.min(worst, cr(fc, hb));
      }
      if (hidden >= 2) out.push([name, 'HIDDEN', tx]);
      if (worst < 2.2) out.push([name, 'CONTRAST', tx + ' (' + worst.toFixed(2) + ')']);
    });
  }
  box.remove();
  return out;
};
