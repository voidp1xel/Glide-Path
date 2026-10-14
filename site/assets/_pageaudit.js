// Loads each page in an iframe of the given width and checks every content SVG for clipped, overlapping or tiny text,
// and for SVGs cut off by an overflow-hidden ancestor.
window.__pageaudit = async function (pages, width = 1280, height = 900) {
  const out = [];
  for (const url of pages) {
    const f = document.createElement('iframe');
    f.style.cssText = `position:fixed;left:0;top:0;width:${width}px;height:${height}px;z-index:2147483647;background:#fff;border:0`;
    document.body.appendChild(f);
    await new Promise(r => { f.onload = r; f.src = url; });
    await new Promise(r => setTimeout(r, 1500));
    const d = f.contentDocument, w = f.contentWindow;
    // open collapsed sections so their figures render
    d.querySelectorAll('details').forEach(x => x.open = true);
    await new Promise(r => setTimeout(r, 400));
    const svgs = [...d.querySelectorAll('#app svg, main svg')].filter(s => { const r = s.getBoundingClientRect(); return r.width > 160 && r.height > 60; });
    for (const svg of svgs) {
      const S = svg.getBoundingClientRect();
      const id = (svg.closest('[id]') || {}).id || '';
      const vb = svg.viewBox && svg.viewBox.baseVal; const scale = vb && vb.width ? S.width / vb.width : 1;
      // ancestor clipping
      let a = svg.parentElement;
      while (a && a !== d.body) {
        const cs = w.getComputedStyle(a);
        if (/(hidden|clip)/.test(cs.overflowY + cs.overflowX) ) {
          const A = a.getBoundingClientRect();
          if (S.top < A.top - 2 || S.bottom > A.bottom + 2 || (S.left < A.left - 2 && !/auto|scroll/.test(cs.overflowX)) || (S.right > A.right + 2 && !/auto|scroll/.test(cs.overflowX))) { out.push([url, id, 'BOXCLIP', a.className.toString().slice(0, 40)]); }
          break;
        }
        a = a.parentElement;
      }
      const texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim() && w.getComputedStyle(t).display !== 'none' && +w.getComputedStyle(t).opacity > 0.05);
      const R = texts.map(t => t.getBoundingClientRect());
      texts.forEach((t, i) => {
        const r = R[i], tx = t.textContent.trim().slice(0, 36);
        if (!r.width) return;
        if (r.left < S.left - 2 || r.right > S.right + 2 || r.top < S.top - 2 || r.bottom > S.bottom + 2) out.push([url, id, 'CLIP', tx]);
        const fs = parseFloat(w.getComputedStyle(t).fontSize) * scale;
        if (fs < 10.5) out.push([url, id, 'SMALL', tx + ' ' + fs.toFixed(1)]);
        for (let j = i + 1; j < texts.length; j++) {
          const q = R[j]; if (!q.width) continue;
          const ix = Math.min(r.right, q.right) - Math.max(r.left, q.left), iy = Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top);
          if (ix > 2 && iy > Math.min(r.height, q.height) * 0.35) out.push([url, id, 'OVERLAP', tx + ' × ' + texts[j].textContent.trim().slice(0, 36)]);
        }
      });
    }
    f.remove();
  }
  return out;
};
