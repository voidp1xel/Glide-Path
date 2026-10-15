/* Glidepath core: DOM helpers, icons, storage, history, theme, shared chrome. */
(function () {
  'use strict';
  const G = (window.G = window.G || {});

  /* ---------- DOM helpers ---------- */
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'style' && typeof v === 'object') { for (const p in v) { if (p.startsWith('--')) n.style.setProperty(p, v[p]); else n.style[p] = v[p]; } }
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else if (k === 'dataset') Object.assign(n.dataset, v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    add(n, kids);
    return n;
  }
  function add(n, kids) {
    for (const c of kids.flat(Infinity)) {
      if (c == null || c === false) continue;
      n.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return n;
  }
  const NS = 'http://www.w3.org/2000/svg';
  function sv(tag, attrs, ...kids) {
    const n = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v);
    }
    for (const c of kids.flat(Infinity)) { if (c != null && c !== false) n.appendChild(c instanceof Node ? c : document.createTextNode(String(c))); }
    return n;
  }
  /* inline rich text: **bold**, *italic*, `code`, ==mark== */
  function rich(s) {
    if (s == null) return document.createTextNode('');
    const span = document.createElement('span');
    span.innerHTML = esc(String(s))
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/==(.+?)==/g, '<mark>$1</mark>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/(^|[\s(])\*(?!\s)(.+?)\*(?=[\s).,;:]|$)/g, '$1<i>$2</i>')
      .replace(/\n/g, '<br>');
    return span;
  }
  function esc(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- icons (simple 24px stroke icons) ---------- */
  const P = {
    cloud: 'M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.2 4.5 4.5 0 0 0 7 18z',
    wind: 'M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7',
    thermo: 'M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0zM12 9v7',
    drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    zap: 'M13 2 4 14h7l-1 8 9-12h-7z',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2c3 3 4 6.5 4 10s-1 7-4 10c-3-3-4-6.5-4-10s1-7 4-10z',
    compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15.5 8.5l-2 5-5 2 2-5z',
    map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
    plane: 'M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0v5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5z',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
    check: 'M20 6 9 17l-5-5',
    star: 'M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z',
    layers: 'M12 2 2 7l10 5 10-5zM2 12l10 5 10-5M2 17l10 5 10-5',
    target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    gauge: 'M12 14l4-4M3.3 19a10 10 0 1 1 17.4 0',
    radio: 'M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    sat: 'M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M16 8l-4-4M14 14l-2.5 2.5M3 21c2-.5 4-2 5-4M9 21c1-.5 2-1.5 2.5-2.5',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    brain: 'M9.5 2A2.5 2.5 0 0 0 7 4.5v.5a3 3 0 0 0-3 3 3 3 0 0 0 1 5.2V15a3 3 0 0 0 3 3h.5a2.5 2.5 0 0 0 5 0V4.5A2.5 2.5 0 0 0 11 2zM14.5 2A2.5 2.5 0 0 1 17 4.5v.5a3 3 0 0 1 3 3 3 3 0 0 1-1 5.2V15a3 3 0 0 1-3 3h-.5',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
    sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    right: 'M5 12h14M13 6l6 6-6 6',
    left: 'M19 12H5M11 6l-6 6 6 6',
    history: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l4 2',
    flag: 'M4 22V4s1-1 4-1 5 2 8 2 4-1 4-1v11s-1 1-4 1-5-2-8-2-4 1-4 1',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    calc: 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01',
    snow: 'M12 2v20M4.9 7l14.2 10M19.1 7 4.9 17M9 4l3 2 3-2M9 20l3-2 3 2',
    mountain: 'M8 3l4 8 5-5 5 15H2z',
    waves: 'M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2',
    storm: 'M21 4H3M18 8H6M19 12H9M16 16h-6M11 20H9',
    spark: 'M12 3l1.8 5.6L19.5 10l-5.7 1.6L12 17l-1.8-5.4L4.5 10l5.7-1.4z',
    info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
    help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01',
    bookmark: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8',
    home: 'M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15',
    shuffle: 'M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
    x: 'M18 6 6 18M6 6l12 12',
    menu: 'M3 12h18M3 6h18M3 18h18',
    alert: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
    tower: 'M9 22l1-12h4l1 12M8 10h8l-1-4H9zM10 6l2-4 2 4M5 22h14',
    ruler: 'M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4zM7.5 10.5l2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2',
    magnet: 'M6 15a6 6 0 0 0 12 0V4h-4v11a2 2 0 0 1-4 0V4H6zM6 8h4M14 8h4',
    sigma: 'M18 7V4H6l6 8-6 8h12v-3',
    play: 'M6 4l14 8-14 8z',
    pen: 'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z',
    timer: 'M10 2h4M12 14l3-3M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
    trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3',
    rain: 'M7 14h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 5.2 4.5 4.5 0 0 0 7 14zM8 18l-1 3M12 18l-1 3M16 18l-1 3',
    fog: 'M4 8h16M2 12h20M4 16h16M6 20h12',
    ice: 'M12 2l2.5 4.5L19 9l-4.5 2.5L12 16l-2.5-4.5L5 9l4.5-2.5zM12 16v6',
    pulse: 'M22 12h-4l-3 9L9 3l-3 9H2',
    sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    signal: 'M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16',
    doc: 'M4 4h16v16H4zM8 8h8M8 12h8M8 16h5',
    scale: 'M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8',
    medal: 'M7 3h10l-3 7h-4zM12 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12z',
    route: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 16h6a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6',
    fuel: 'M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.8a2 2 0 0 0-.6-1.4L18 5',
    weight: 'M6 7h12l2 14H4zM9 7a3 3 0 1 1 6 0',
    rotate: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    calendar: 'M4 5h16v16H4zM4 10h16M9 3v4M15 3v4',
    hash: 'M4 9h16M4 15h16M10 3 8 21M16 3l-2 18',
  };
  function icon(name, cls) {
    const d = P[name] || P.spark;
    return sv('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: cls || null, 'aria-hidden': 'true' }, sv('path', { d }));
  }

  /* ---------- storage ---------- */
  const KEY = 'glidepath-v1';
  let mem = null;
  function load() {
    if (mem) return mem;
    try { mem = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { mem = {}; }
    mem.hist = mem.hist || []; mem.seen = mem.seen || {}; mem.qa = mem.qa || {}; mem.days = mem.days || {};
    mem.marks = mem.marks || {}; mem.exams = mem.exams || []; mem.pos = mem.pos || {};
    return mem;
  }
  let saveT = null;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* storage full or blocked */ } }, 150);
  }
  function saveNow() { clearTimeout(saveT); try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }
  window.addEventListener('pagehide', saveNow);
  const S = {
    get state() { return load(); },
    save, saveNow,
    pref(k, v) { const s = load(); if (v === undefined) return s['pref_' + k]; s['pref_' + k] = v; save(); },
    /* history: one entry per visit; consecutive visits to the same place merge */
    visit(entry) {
      const s = load(); const now = Date.now();
      entry.t = now;
      const last = s.hist[0];
      if (last && last.href === entry.href && now - last.t < 30 * 60e3) { Object.assign(last, entry); }
      else s.hist.unshift(entry);
      if (s.hist.length > 400) s.hist.length = 400;
      s.last = entry;
      save();
    },
    tick(sec) { const s = load(); const d = dayKey(); s.days[d] = (s.days[d] || 0) + sec; save(); },
    seen(ch, lesson) { const s = load(); const a = (s.seen[ch] = s.seen[ch] || []); if (!a.includes(lesson)) { a.push(lesson); save(); } },
    /* every answer also schedules the question for spaced review: wrong → tomorrow; right → 1, 3, 7, 21, 60 days; a lucky guess stays short */
    answer(qid, picked, ok, guess) {
      const s = load(); const r = (s.qa[qid] = s.qa[qid] || { n: 0, w: 0 });
      r.n++; if (!ok) r.w++; r.last = picked; r.ok = ok; r.t = Date.now();
      const GAP = [1, 1, 3, 7, 21, 60];
      r.box = !ok ? 0 : guess ? Math.max(1, Math.min(r.box || 0, 1)) : Math.min(5, (r.box || 0) + 1);
      r.due = r.t + GAP[r.box] * 864e5; r.guess = !!(ok && guess);
      const d = dayKey(); s.days['q' + d] = (s.days['q' + d] || 0) + 1;
      save();
    },
    mark(qid, on) { const s = load(); if (on) s.marks[qid] = Date.now(); else delete s.marks[qid]; save(); },
  };
  function dayKey(t) { const d = t ? new Date(t) : new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }

  /* ---------- theme ---------- */
  function applyTheme() {
    let t = S.pref('theme');
    if (t !== 'light' && t !== 'dark') { /* first visit: start from the device setting, then it is a plain light/dark choice */
      t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; S.pref('theme', t);
    }
    document.documentElement.dataset.theme = t;
  }
  applyTheme();
  function setTheme(t) { S.pref('theme', t); applyTheme(); }
  /* display preferences from Settings: text size (zoom) and reduced motion */
  function applyPrefs() {
    const z = +(S.pref('textsize') || 1); document.documentElement.style.zoom = z === 1 ? '' : String(z);
    document.documentElement.classList.toggle('reduce-motion', !!S.pref('reducemotion'));
  }
  applyPrefs();
  function cycleTheme() { setTheme(S.pref('theme') === 'dark' ? 'light' : 'dark'); toast('Theme: ' + S.pref('theme')); }

  /* ---------- toast ---------- */
  let toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = el('div', { class: 'toast', role: 'status' }); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  /* ---------- paths ---------- */
  const ROOT = document.documentElement.dataset.root || '.';
  const url = p => ROOT + '/' + p;
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }

  /* ---------- shared chrome ---------- */
  /* top bar: everyday pages as pills, occasional ones under "More" */
  const MORE = [
    ['revise', 'revise.html', 'star', 'Flight bag', 'every value and formula'],
    ['tools', 'tools.html', 'calc', 'Tools', 'calculators and decoders'],
    ['mindmaps', 'mindmaps.html', 'brain', 'Mind maps', 'each subject on one page'],
    ['glossary', 'glossary.html', 'book', 'Glossary', 'every defined term, A–Z'],
    ['guide', 'guide.html', 'target', 'How DGCA asks', 'exam pattern and traps'],
    ['health', 'health.html', 'heart', 'Health plan', 'medical fitness plan'],
    ['notes', 'notes.html', 'pen', 'My notes', 'everything you have written'],
    ['history', 'history.html', 'history', 'History', 'where you left off'],
    ['sources', 'sources.html', 'book', 'Sources', 'books and references'],
  ];
  function topbar(opts = {}) {
    const pill = (on, href, ic, label) => el('a', { class: 'pill' + (opts.on === on ? ' on' : ''), href: url(href), title: label }, icon(ic), el('span', { class: 't' }, label));
    const nav = el('nav', null,
      pill('home', 'index.html', 'home', 'Home'),
      opts.burger ? el('button', { class: 'pill burger', 'aria-label': 'Contents', onclick: () => document.body.classList.toggle('toc-open') }, icon('menu'), el('span', { class: 't' }, 'Contents')) : null,
      pill('path', 'path.html', 'route', 'My path'),
      pill('practice', 'practice.html', 'check', 'Practice'),
      pill('flashcards', 'flashcards.html', 'layers', 'Flashcards'),
      pill('dashboard', 'dashboard.html', 'gauge', 'Dashboard'),
      pill('adapt', 'adapt.html', 'target', 'ADAPT'),
      moreMenu(opts),
      el('button', { class: 'pill searchpill', title: 'Search everything (Ctrl/⌘ K)', 'aria-label': 'Search', onclick: () => palette() }, icon('search'), el('span', { class: 't' }, 'Search')));
    const hdr = el('header', { class: 'top' },
      el('a', { class: 'logo', href: url('index.html') }, el('span', null, 'Glide', el('b', null, 'path'), el('small', null, 'DGCA CPL, made visual'))),
      opts.back ? el('a', { class: 'back', href: opts.back.href }, '← ', opts.back.label) : null,
      nav, profileMenu(opts));
    pinTop(hdr);
    setTimeout(() => focusTimer(false), 0);
    return hdr;
  }
  /* ---------- quick-jump search (Ctrl/⌘ K): pages, chapters, lessons, numbers, formulas, glossary, tools ---------- */
  let palData = null;
  const TOOLS_IDX = [['crosswind', 'Crosswind and headwind'], ['triangle', 'Wind triangle'], ['isa', 'ISA deviation & density altitude'], ['tasmach', 'CAS → TAS → Mach'], ['altim', 'QNH, QFE, pressure altitude'], ['cloud', 'Cloud base from dew point'], ['one60', '1-in-60'], ['pnr', 'PNR and PET'], ['sdt', 'Speed, time, distance, fuel'], ['descent', 'Descent planning'], ['conv', 'Departure & convergency'], ['time', 'Time: UTC, IST, LMT'], ['turn', 'Turns: radius & rate'], ['radio', 'VHF range & Q-codes'], ['cg', 'Weight & balance (CG)'], ['metar', 'METAR & TAF decoder'], ['units', 'Unit converter']];
  function loadPal() {
    if (palData) return Promise.resolve(palData);
    const pages = [['index.html', 'Home'], ['path.html', 'My path'], ['practice.html', 'Practice & mock exams'], ['flashcards.html', 'Flashcards'], ['dashboard.html', 'Dashboard'], ['adapt.html', 'ADAPT & cadet selection'], ['adapt-guide.html', 'ADAPT guide'], ...MORE.map(m => [m[1], m[3]]), ['notes.html', 'My notes'], ['settings.html', 'Settings'], ['signin.html', 'Sign in']].map(([h, t]) => ({ t, s: 'Page', h }));
    const tools = TOOLS_IDX.map(([id, t]) => ({ t, s: 'Tool', h: 'tools.html#' + id }));
    const need = [window.SEARCH ? null : loadScript(url('data/search.js')), window.GLOSSARY ? null : loadScript(url('data/glossary.js'))].filter(Boolean);
    return Promise.all(need.map(p => p.catch(() => null))).then(() => (palData = pages.concat(tools, (window.SEARCH || []).map(x => ({ t: x.t, s: x.s, h: x.h, k: x.k })), (window.GLOSSARY || []).map(x => ({ t: x.t, s: 'Glossary · ' + x.s, h: x.h, k: x.d })))));
  }
  function palette() {
    if (document.querySelector('dialog.pal')) return;
    const inp = el('input', { class: 'pal-in', type: 'search', placeholder: 'Jump to a chapter, lesson, term, tool or page…', 'aria-label': 'Search' });
    const list = el('div', { class: 'pal-list', role: 'listbox' });
    const dlg = el('dialog', { class: 'pal' }, el('div', { class: 'pal-head' }, icon('search'), inp, el('kbd', null, 'Esc')), list);
    document.body.append(dlg); dlg.showModal(); inp.focus();
    dlg.addEventListener('close', () => dlg.remove());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    let rows = [], sel = 0;
    const go = r => { dlg.close(); location.href = url(r.h); };
    function draw() {
      const words = inp.value.toLowerCase().split(/\s+/).filter(Boolean);
      const D = palData || [];
      if (!words.length) rows = D.filter(x => x.s === 'Page').slice(0, 12);
      else {
        rows = D.map(x => { const T = x.t.toLowerCase(), K = ((x.k || '') + ' ' + x.s).toLowerCase(); if (!words.every(w => T.includes(w) || K.includes(w))) return null;
          let sc = words.reduce((a, w) => a + (T.startsWith(w) ? 6 : T.includes(w) ? 3 : 1), 0); if (x.s === 'Page' || x.s === 'Tool') sc += 2; return [sc, x]; }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, 40).map(a => a[1]);
      }
      sel = 0; paint();
    }
    function paint() {
      list.replaceChildren(...(rows.length ? rows.map((r, i) => el('a', { class: 'pal-row' + (i === sel ? ' on' : ''), href: url(r.h), onmouseenter: () => { sel = i; paint(); } }, el('b', null, r.t), el('small', null, r.s))) : [el('p', { class: 'hint pal-empty' }, palData ? 'Nothing found.' : 'Loading…')]));
      const on = list.querySelector('.on'); if (on) on.scrollIntoView({ block: 'nearest' });
    }
    inp.addEventListener('input', draw);
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(rows.length - 1, sel + 1); paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); paint(); }
      else if (e.key === 'Enter' && rows[sel]) { e.preventDefault(); go(rows[sel]); }
    });
    paint(); loadPal().then(draw);
  }
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette(); } else if (e.key === '/' && !/input|textarea|select/i.test((e.target.tagName || '')) && !e.target.isContentEditable) { e.preventDefault(); palette(); } });

  /* ---------- focus timer: survives page changes (end time in state), logs focused minutes per day ---------- */
  function focusTimer(open) {
    const s = load(); s.focus = s.focus || {}; s.focusLog = s.focusLog || {};
    let box = document.querySelector('.ftimer');
    if (!open && !s.focus.end && !s.focus.left) { if (box) box.remove(); return; }
    if (!box) { box = el('div', { class: 'ftimer', role: 'timer' }); document.body.append(box); }
    let tick = null;
    const today = () => s.focusLog[dayKey()] || 0;
    const startRun = (min, kind) => { s.focus = { end: Date.now() + min * 60e3, len: min, kind }; save(); draw(); };
    function finish() {
      const f = s.focus; if (f.kind === 'focus') { s.focusLog[dayKey()] = today() + f.len; }
      s.focus = { done: f.kind }; save();
      try { const a = new (window.AudioContext || window.webkitAudioContext)(); const o = a.createOscillator(); o.frequency.value = 880; o.connect(a.destination); o.start(); o.stop(a.currentTime + .25); } catch (e) {}
      toast(f.kind === 'focus' ? 'Focus block done: take a 5-minute break' : 'Break over: back to it');
      draw();
    }
    function draw() {
      clearInterval(tick);
      const f = s.focus;
      const close = el('button', { class: 'ft-x', title: 'Close', onclick: () => { clearInterval(tick); s.focus = {}; save(); box.remove(); } }, '✕');
      if (f.end || f.left) {
        const left = () => f.left || Math.max(0, f.end - Date.now());
        const t = el('b', { class: 'ft-t' });
        const show = () => { const ms = left(); t.textContent = String(Math.floor(ms / 60e3)).padStart(2, '0') + ':' + String(Math.floor(ms / 1e3) % 60).padStart(2, '0'); if (!f.left && ms <= 0) { clearInterval(tick); finish(); } };
        box.replaceChildren(el('span', { class: 'ft-k' }, f.kind === 'focus' ? 'Focus' : 'Break'), t,
          el('button', { class: 'ft-b', onclick: () => { if (f.left) { f.end = Date.now() + f.left; delete f.left; } else { f.left = left(); delete f.end; } save(); draw(); } }, f.left ? '▶' : '❚❚'),
          el('button', { class: 'ft-b', title: 'Stop', onclick: () => { s.focus = {}; save(); draw(); } }, '■'), close);
        show(); if (!f.left) tick = setInterval(show, 1000);
      } else {
        box.replaceChildren(el('span', { class: 'ft-k' }, 'Today ' + today() + ' min'),
          el('button', { class: 'ft-b wide', onclick: () => startRun(25, 'focus') }, '25 min'), el('button', { class: 'ft-b wide', onclick: () => startRun(50, 'focus') }, '50'),
          el('button', { class: 'ft-b wide', onclick: () => startRun(5, 'break') }, 'Break 5'), close);
      }
    }
    draw();
  }

  function moreMenu(opts) {
    const on = MORE.some(m => m[0] === opts.on);
    const wrap = el('div', { class: 'more' });
    const btn = el('button', { class: 'pill' + (on ? ' on' : ''), title: 'More', 'aria-haspopup': 'menu', 'aria-expanded': 'false' }, icon('grid'), el('span', { class: 't' }, 'More'), el('span', { class: 'caret' }, '▾'));
    const menu = el('div', { class: 'mmenu', role: 'menu', hidden: true }, MORE.map(([k, href, ic, label, sub]) =>
      el('a', { class: 'mm-item' + (opts.on === k ? ' on' : ''), role: 'menuitem', href: url(href) }, el('span', { class: 'mm-ic' }, icon(ic)), el('span', null, el('b', null, label), el('small', null, sub)))));
    menu.append(el('button', { class: 'mm-item mm-btn', role: 'menuitem', onclick: () => { menu.hidden = true; focusTimer(true); } }, el('span', { class: 'mm-ic' }, icon('timer')), el('span', null, el('b', null, 'Focus timer'), el('small', null, 'Pomodoro: 25 min focus, 5 min break'))));
    const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', e => { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden)); });
    menu.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    wrap.append(btn, menu); return wrap;
  }

  /* ---------- profile: premade avatars + menu (theme, history) ---------- */
  const AVATARS = [
    ['plane', 'h1'], ['compass', 'h4'], ['globe', 'h0'], ['radio', 'h2'], ['tower', 'h3'], ['cloud', 'h0'],
    ['sun', 'h4'], ['moon', 'h1'], ['mountain', 'h3'], ['star', 'h5'], ['shield', 'h2'], ['medal', 'h5'],
  ];
  function avatarEl(i, cls) { const [ic, h] = AVATARS[i] || AVATARS[0]; return el('span', { class: 'avatar ' + h + (cls ? ' ' + cls : '') }, icon(ic)); }
  function profileMenu(opts) {
    let av = +(S.pref('avatar') || 0);
    const wrap = el('div', { class: 'profile' });
    const btn = el('button', { class: 'avatarbtn', 'aria-label': 'Profile menu', 'aria-haspopup': 'menu', 'aria-expanded': 'false' }, avatarEl(av));
    const menu = el('div', { class: 'pmenu', role: 'menu', hidden: true });
    function draw() {
      const th = S.pref('theme');
      const signed = G.sync && G.sync.user;
      menu.replaceChildren(
        el('div', { class: 'pm-head' }, avatarEl(av, 'big'), el('div', null, el('b', null, S.pref('name') || 'Profile'), el('small', null, signed ? (G.sync.user.email || 'Signed in') : 'Pick an icon'))),
        el('div', { class: 'pm-avs' }, AVATARS.map((_, i) => el('button', { class: 'pm-av' + (i === av ? ' on' : ''), 'aria-label': 'Icon ' + (i + 1), onclick: () => { av = i; S.pref('avatar', i); btn.replaceChildren(avatarEl(av)); draw(); } }, avatarEl(i)))),
        el('div', { class: 'pm-row', role: 'menuitem' }, el('span', { class: 'pm-l' }, icon(th === 'dark' ? 'moon' : 'sun'), 'Theme'),
          el('div', { class: 'seg' }, ['light', 'dark'].map(t => el('button', { class: th === t ? 'on' : '', onclick: () => { setTheme(t); draw(); } }, t === 'light' ? 'Light' : 'Dark')))),
        el('div', { class: 'pm-row', role: 'menuitem' }, el('span', { class: 'pm-l' }, icon('layers'), 'Study mode'),
          el('div', { class: 'seg' }, [['core', 'Core'], ['exam', '◆ Exam']].map(([k, t]) => el('button', { class: (S.pref('track') || 'core') === k ? 'on' : '', title: k === 'core' ? 'Core & Revision: the essential lessons' : 'Exam-Ready: every lesson, including ◆ exam-only ones',
            onclick: () => { S.pref('track', k); window.dispatchEvent(new CustomEvent('gp-track', { detail: k })); toast(k === 'exam' ? '◆ Exam-Ready mode: all lessons' : 'Core & Revision mode'); draw(); } }, t)))),
        el('a', { class: 'pm-row' + (opts.on === 'settings' ? ' on' : ''), role: 'menuitem', href: url('settings.html') }, el('span', { class: 'pm-l' }, icon('sliders'), 'Settings'), el('span', { class: 'pm-go' }, '›')),
        el('a', { class: 'pm-row' + (opts.on === 'signin' ? ' on' : ''), role: 'menuitem', href: url('signin.html') }, el('span', { class: 'pm-l' }, icon('user'), signed ? 'Account' : 'Sign in'), el('span', { class: 'pm-go' }, '›')));
    }
    const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', e => { e.stopPropagation(); const open = menu.hidden; if (open) draw(); menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); });
    menu.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    wrap.append(btn, menu);
    return wrap;
  }

  /* fixed top bar, always visible; --toph lets the page and sticky contents offset below it */
  function pinTop(hdr) {
    document.body.classList.add('has-top');
    const setH = () => document.documentElement.style.setProperty('--toph', hdr.offsetHeight + 'px');
    if (window.ResizeObserver) new ResizeObserver(setH).observe(hdr); else window.addEventListener('resize', setH);
    requestAnimationFrame(setH);
  }
  function footer() {
    return el('footer', { class: 'foot2' },
      el('div', { class: 'wrap' },
        el('p', null, 'Personal study aid from the DGCA reference books. Not affiliated with DGCA; rules change, so check the current CARs, AIP India and DGCA notices.'),
        el('p', { class: 'foot-links' }, el('a', { href: url('sources.html') }, 'Sources'))));
  }

  /* reading progress bar + time tracking */
  function readbar() {
    const b = el('div', { class: 'readbar' }); document.body.appendChild(b);
    const upd = () => { const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); b.style.width = (p * 100).toFixed(1) + '%'; };
    document.addEventListener('scroll', upd, { passive: true }); upd();
  }
  let active = Date.now();
  ['scroll', 'click', 'keydown', 'pointermove'].forEach(e => document.addEventListener(e, () => { active = Date.now(); }, { passive: true }));
  setInterval(() => { if (!document.hidden && Date.now() - active < 120e3) S.tick(15); }, 15e3);

  function fmtAgo(t) {
    const s = (Date.now() - t) / 1000;
    if (s < 60) return 'just now';
    if (s < 3600) return Math.round(s / 60) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' h ago';
    const d = Math.round(s / 86400); return d === 1 ? 'yesterday' : d + ' days ago';
  }
  function fmtTime(t) { const d = new Date(t); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

  /* find chapter meta from SITE */
  function chapterMeta(id) {
    const site = window.SITE; if (!site) return null;
    for (const sub of site.subjects) for (const c of sub.chapters) if (c.id === id) return Object.assign({ subject: sub }, c);
    return null;
  }
  function allChapters() { const out = []; (window.SITE?.subjects || []).forEach(s => s.chapters.forEach(c => out.push(Object.assign({ subject: s }, c)))); return out; }

  Object.assign(G, { el, sv, add, rich, esc, $, $$, icon, S, toast, url, ROOT, loadScript, topbar, footer, readbar, fmtAgo, fmtTime, dayKey, chapterMeta, allChapters, cycleTheme, setTheme, applyPrefs, palette, focusTimer });
})();
