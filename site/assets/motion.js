/* Glidepath motion layer. Loaded last; only adds classes and listeners, never changes content. */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  if (!reduce) root.classList.add('mo');

  /* ---- scroll reveal (with stagger inside grids) ---- */
  const REVEAL = '.card,.tile,.lesson,.points,.purpose,.resume,.pnav a,.section-head,.grid>*,.tiles>*,.stage';
  const io = !reduce && 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px 4% 0px', threshold: 0 }) : null;

  /* figures pause until visible, then play (and restart draw animations) */
  const live = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting && !e.target.classList.contains('live')) {
        e.target.classList.add('live');
        e.target.querySelectorAll('.anim-draw').forEach(p => { p.style.animation = 'none'; void p.getBoundingClientRect(); p.style.animation = ''; });
        countUp(e.target);
      }
    });
  }, { threshold: .2 }) : null;

  function prep(scope) {
    if (!io) return;
    scope.querySelectorAll(REVEAL).forEach(n => {
      if (n.dataset.rv || n.closest('.rv:not(.in)') && n !== n.closest('.rv')) return;
      if (n.matches('.stage') && n.closest('.lesson')) { if (live) live.observe(n); return; }
      n.dataset.rv = 1;
      const r = n.getBoundingClientRect();
      if (r.top < innerHeight * .92 && r.bottom > 0) return; // already on screen: no flash
      n.classList.add('rv');
      const sib = n.parentElement ? [...n.parentElement.children].filter(c => c.dataset.rv) : [];
      n.style.setProperty('--d', Math.min(sib.indexOf(n) % 4, 3) * 0.05 + 's');
      io.observe(n);
    });
    if (live) scope.querySelectorAll('.lesson .stage').forEach(s => live.observe(s));
  }

  /* ---- number count-up for stat values ---- */
  function countUp(scope) {
    if (reduce) return;
    scope.querySelectorAll('.numc .v').forEach(v => {
      const m = v.textContent.match(/^([^\d−-]*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (!m || v.dataset.cu) return; v.dataset.cu = 1;
      const end = parseFloat(m[2].replace(/,/g, '')), dec = (m[2].split('.')[1] || '').length, comma = m[2].includes(',');
      if (!isFinite(end) || end === 0) return;
      const t0 = performance.now(), dur = 700;
      const fmt = x => { let s = x.toFixed(dec); if (comma) s = Number(s).toLocaleString('en-IN', { minimumFractionDigits: dec }); return m[1] + s + m[3]; };
      (function step(t) { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); v.textContent = fmt(end * e); if (k < 1) requestAnimationFrame(step); else v.textContent = m[1] + m[2] + m[3]; })(t0);
    });
  }

  /* ---- cursor spotlight on cards ---- */
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card,.tile');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ---- top bar shadow, reading progress, back-to-top ---- */
  const top = document.querySelector('.top');
  const up = document.body.appendChild(Object.assign(document.createElement('button'), { className: 'totop', title: 'Back to top', ariaLabel: 'Back to top' }));
  up.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  up.onclick = () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      if (top) top.classList.toggle('scrolled', y > 8);
      up.classList.toggle('on', y > innerHeight * 1.2);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  /* safety net: never leave revealed-on-scroll content hidden, even if IntersectionObserver stalls */
  let sweepT = null;
  function sweep() { const H = innerHeight; document.querySelectorAll('.rv:not(.in),.rv-scale:not(.in)').forEach(n => { if (n.getBoundingClientRect().top < H) n.classList.add('in'); }); }
  addEventListener('scroll', () => { clearTimeout(sweepT); sweepT = setTimeout(sweep, 140); }, { passive: true });
  setTimeout(sweep, 1500);

  /* ---- quiz: a small burst on a first-try correct answer ---- */
  const COLORS = ['#3D5BD9', '#1E8A5A', '#FFC83A', '#E0412F', '#8E6CFF'];
  function burst(x, y) {
    if (reduce) return;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('i'); p.className = 'burst';
      const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60;
      p.style.cssText = `left:${x}px;top:${y}px;background:${COLORS[i % 5]};--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 20}px;--r:${Math.random() * 360}deg`;
      document.body.appendChild(p); setTimeout(() => p.remove(), 900);
    }
  }
  document.addEventListener('click', e => {
    const o = e.target.closest && e.target.closest('.opt');
    if (!o) return;
    setTimeout(() => { if (o.classList.contains('ok')) { const r = o.getBoundingClientRect(); burst(r.left + 24, r.top + r.height / 2); } }, 0);
  });

  /* ---- skip link for keyboard users ---- */
  const main = document.querySelector('main');
  if (main) { main.id = main.id || 'app'; main.tabIndex = -1; document.body.prepend(Object.assign(document.createElement('a'), { className: 'skip', href: '#' + main.id, textContent: 'Skip to content' })); }

  /* run now, and on content the pages add later (quiz cards, tabs, filters) */
  prep(document);
  new MutationObserver(ms => { for (const m of ms) m.addedNodes.forEach(n => { if (n.nodeType === 1) prep(n.parentElement || n); }); })
    .observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
})();

/* ---------- G.modal: an in-page pop-up window with a close (✕) button ----------
   G.modal({ title, count, tools: [nodes], body: node }) → { dlg, body, close(), setCount(n) } */
(function () {
  const G = window.G;
  G.modal = function (o) {
    const { el } = G;
    const x = el('button', { class: 'gpm-x', 'aria-label': 'Close', title: 'Close (Esc)' });
    x.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    const cnt = el('span', { class: 'count' }, o.count != null ? String(o.count) : '');
    const ttl = el('span', null, o.title || '');
    const body = el('div', { class: 'gpm-body' }, o.body || null);
    const dlg = el('dialog', { class: 'gp-modal', 'aria-label': o.title },
      el('div', { class: 'gpm-head' }, el('h3', null, ttl, cnt), x),
      o.tools && o.tools.length ? el('div', { class: 'gpm-tools' }, o.tools) : null, body);
    document.body.appendChild(dlg);
    const y = scrollY;
    function close() {
      if (!dlg.open) return;
      dlg.classList.add('closing');
      setTimeout(() => { dlg.close(); dlg.remove(); document.body.classList.remove('gpm-lock'); scrollTo(0, y); o.onClose && o.onClose(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170);
    }
    x.onclick = close;
    dlg.addEventListener('cancel', e => { e.preventDefault(); close(); });                 // Esc
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });               // click on the backdrop
    document.body.classList.add('gpm-lock');
    dlg.showModal();
    return { dlg, body, close, setCount: n => { cnt.textContent = String(n); }, setTitle: t => { ttl.textContent = t; dlg.setAttribute('aria-label', t); } };
  };
})();
