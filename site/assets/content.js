/* Content-side enhancements: notes accordions and scrollable diagrams. Runs after pages.js has drawn the page. */
(function () {
  'use strict';
  function sectionize(notes) {
    if (!notes || notes.dataset.sec) return; notes.dataset.sec = '1';
    const kids = [...notes.childNodes]; let cur = null; const frag = document.createDocumentFragment();
    for (const n of kids) {
      if (n.nodeType === 1 && n.tagName === 'H3') {
        cur = document.createElement('details'); cur.className = 'nsec';
        const s = document.createElement('summary'); s.append(n);
        const body = document.createElement('div'); body.className = 'nbody';
        cur.append(s, body); cur._body = body; frag.append(cur);
        if (/trap/i.test(n.textContent)) { cur.classList.add('trap'); cur.open = true; }
        continue;
      }
      if (cur) cur._body.append(n); else frag.append(n);
    }
    notes.replaceChildren(frag);
    notes.querySelectorAll('.nsec').forEach(d => { const k = d._body.querySelectorAll('li, tr').length; const sm = document.createElement('small'); sm.textContent = k ? k + ' points' : ''; d.querySelector('summary').append(sm); });
    if (notes.querySelectorAll('.nsec').length > 2) {
      const bar = document.createElement('div'); bar.className = 'notes-tools';
      const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Open all';
      b.onclick = () => { const all = notes.querySelectorAll('.nsec'); const open = [...all].some(d => !d.open); all.forEach(d => d.open = open); b.textContent = open ? 'Close all' : 'Open all'; };
      bar.append(b); notes.prepend(bar);
    }
  }
  function wrapFig(svg) {
    if (!svg.classList.contains('fig') || (svg.parentElement && svg.parentElement.classList.contains('figscroll'))) return;
    const vb = svg.viewBox && svg.viewBox.baseVal; if (!vb || vb.width < 300) return;
    if (svg.closest('.vis, .numc, .card, .tcard')) return; // small thumbnails stay as they are
    const w = document.createElement('div'); w.className = 'figscroll';
    svg.replaceWith(w); w.append(svg);
    requestAnimationFrame(() => w.classList.toggle('can-scroll', w.scrollWidth > w.clientWidth + 4));
  }
  function run(root) {
    (root.querySelectorAll ? root : document).querySelectorAll('svg.fig').forEach(wrapFig);
    document.querySelectorAll('.points .notes, .stage.notes').forEach(sectionize);
  }
  function start() {
    run(document);
    let t = null;
    new MutationObserver(ms => { if (t) return; t = requestAnimationFrame(() => { t = null; run(document); }); }).observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
