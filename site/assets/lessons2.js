/* Glidepath lesson renderers, part 2: lesson types and layouts modelled on only70's feature set
   (own implementation). Loaded after lessons.js; every type here is an addition to G.R, and the two
   upgraded types (tree, flow) keep the old data shape working.
   New types: hotspot, signals, fly, hold, plan. Explore tabs gain kind: dial | wheel | board | shelf. */
(function () {
  'use strict';
  const { el, sv, rich, icon } = G;
  const R = G.R;
  const HUES = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5'];
  const hue = i => HUES[((i % 6) + 6) % 6];
  const reduced = () => document.documentElement.classList.contains('reduce-motion') || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const plain = t => String(t || '').replace(/\*\*|==|`/g, '').replace(/(^|\s)\*(\S.*?)\*/g, '$1$2').trim();
  const svgFrom = (d, opts) => {
    if (d.fig) return G.fig(d.fig, opts || d);
    if (typeof d.svg === 'string' && d.svg.trim().startsWith('<svg')) { const w = el('div'); w.innerHTML = d.svg.trim(); return w.firstElementChild; }
    return null;
  };
  const vbox = s => { const v = s && s.viewBox && s.viewBox.baseVal; return v && v.width ? v : { x: 0, y: 0, width: 100, height: 100 }; };

  /* =====================================================================
     Focus centring: tapping anything interactive inside a lesson glides the page so that the
     lesson's figure and its info bar sit in the middle of the screen (below the fixed top bar).
     Taller-than-screen figures centre on the thing you tapped instead. Off in Settings via pref 'autocenter'.
     ===================================================================== */
  G.autoCenter = function (root) {
    let t = null, ro = null, stopT = null;
    const INTERACTIVE = 'button, [role=button], .hot, .mmn, .pring, .wsg, .hspin, .sgcard, .mark, .scale .bar, td.tip, .bk, summary, input[type=range], select';
    /* how far to scroll so the block [stage top → info bar bottom] is centred, or, when it is taller
       than the screen, so its bottom (the info bar with the answer) shows while the tapped item stays visible */
    function delta(target, stage) {
      const lesson = stage.closest('.lesson');
      const info = lesson && lesson.querySelector('.infobar:not([hidden])');
      const top = stage.getBoundingClientRect().top;
      const bottom = (info || stage).getBoundingClientRect().bottom;
      const topEl = document.querySelector('.top'), sideEl = window.innerWidth <= 640 ? document.querySelector('.chap .side') : null;
      const head = topEl ? Math.max(0, topEl.getBoundingClientRect().bottom) : 64;
      const sr = sideEl && sideEl.getBoundingClientRect(), sideB = sr && sr.top <= head + 4 ? sr.bottom : 0; // only while the contents strip is stuck under the bar
      const vTop = Math.max(head, sideB) + 12, vBot = window.innerHeight - 12, vH = vBot - vTop;
      if (bottom - top <= vH) return (top + bottom) / 2 - (vTop + vBot) / 2;
      const r = target.getBoundingClientRect();
      let d = bottom - vBot;                       // show the answer under the figure
      if (r.top - d < vTop) d = r.top - vTop;       // …but never push the tapped item off the top
      if (r.bottom - d > vBot) d = r.bottom - vBot;
      return d;
    }
    function go(target, stage, glow) {
      if (G.S && G.S.pref && G.S.pref('autocenter') === false) return;
      if (!target.isConnected) target = stage;
      const d = delta(target, stage);
      if (Math.abs(d) >= 24) window.scrollBy({ top: d, behavior: reduced() ? 'instant' : 'smooth' });
      if (glow) { stage.classList.remove('focusglow'); void stage.offsetWidth; stage.classList.add('focusglow'); }
    }
    function follow(target, stage) {
      // the tap often changes the height (info bar text, an opened box, a new card): re-centre once it settles
      if (ro) ro.disconnect(); clearTimeout(stopT);
      const lesson = stage.closest('.lesson') || stage;
      let rt = null;
      if (window.ResizeObserver) {
        ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => go(target, stage, false), 120); });
        ro.observe(lesson);
        stopT = setTimeout(() => { if (ro) ro.disconnect(); ro = null; }, 1500);
      }
    }
    function handle(target, stage) { clearTimeout(t); t = setTimeout(() => { go(target, stage, true); follow(target, stage); }, 80); }
    root.addEventListener('click', e => {
      const target = e.target.closest(INTERACTIVE);
      const stage = e.target.closest('.lesson .stage');
      if (!target || !stage || target.closest('a[href^="#"]') || target.matches('input[type=range]')) return;
      handle(target, stage);
    });
    root.addEventListener('change', e => { const stage = e.target.closest('.lesson .stage'); if (stage && e.target.matches('input[type=range]')) handle(e.target, stage); });
  };

  /* =====================================================================
     The big picture (tree): org-chart wires on desktop, an accordion on phones.
     Same data as before: root{label, sub, children[{label, sub, icon, tip, children[{label, sub, tip, quote, children}]}]}
     Leaves may carry jump: '<lesson id>' (the auto big picture uses it) and tier: 'exam'.
     ===================================================================== */
  R.tree = (d, st, ctx) => {
    const root = d.root, fams = root.children || [];
    const box = el('div', { class: 'tree2' + (fams.length >= 5 ? ' dense' : fams.length === 4 ? ' snug' : ''), style: { '--n': fams.length } });
    const rp = el('button', { class: 'rootpill', type: 'button', onclick: () => ctx.info(root.label, root.tip || root.sub || '', root.quote) }, root.label, root.sub ? el('small', null, root.sub) : null);
    box.append(el('div', { class: 't2root' }, rp));
    const row = el('div', { class: 'fams2' });
    const clear = () => st.querySelectorAll('.tnode.on').forEach(x => x.classList.remove('on'));
    fams.forEach((f, i) => {
      const kids = f.children || [];
      const col = el('div', { class: 'fam2 ' + (f.hue != null ? hue(f.hue) : hue(ctx.hueStart + i)) });
      const head = el('button', { class: 'famhead', type: 'button', 'aria-expanded': 'false', onclick: () => {
        const open = col.classList.toggle('open'); head.setAttribute('aria-expanded', String(open));
        ctx.info(f.label, f.tip || (kids.length + ' boxes: ' + kids.map(k => plain(k.label)).join(' · ')), f.quote);
      } }, icon(f.icon || 'spark'), el('div', null, f.label, f.sub ? el('small', null, f.sub) : null), el('span', { class: 'cnt' }, kids.length + (kids.length === 1 ? ' box' : ' boxes'), el('i', null, '▾')));
      const leaves = el('div', { class: 'leaves' });
      kids.forEach(n => leaves.append(node(n)));
      col.append(head, leaves);
      row.append(col);
    });
    function node(n) {
      const wrap = el('div', { class: 'lf' });
      const kids = n.children && n.children.length ? el('div', { class: 'tkids', hidden: true }) : null;
      const b = el('button', { class: 'tnode' + (n.tier === 'exam' ? ' ex' : ''), type: 'button', onclick: () => {
        clear(); b.classList.add('on');
        ctx.info(n.label, n.tip || n.sub || '', n.quote, n.jump ? { jump: n.jump, jumpLabel: 'Go to this lesson' } : null);
        if (kids) { kids.hidden = !kids.hidden; b.querySelector('.plus').textContent = kids.hidden ? '+' : '–'; }
      } }, n.tier === 'exam' ? el('span', { class: 'exd' }, '◆') : null, n.label, n.sub ? el('small', null, n.sub) : null, kids ? el('span', { class: 'plus' }, '+') : null);
      wrap.append(b);
      if (kids) { n.children.forEach(k => kids.append(node(k))); wrap.append(kids); }
      return wrap;
    }
    box.append(row);
    st.append(el('div', { class: 'scrollx' }, box));
    ctx.info(d.infoTitle || 'Tap any box', d.infoText || 'See what it means in the book. Boxes with + open up further.');
  };

  /* builds "The big picture" for a chapter that has no authored tree: families = the chapter's parts */
  G.bigPicture = function (c, lessons) {
    const use = lessons.filter(l => l.type !== 'notes' && l.type !== 'facts' && l.type !== 'qbank');
    if (!use.length) return null;
    const ROLE = { understand: ['story', 'svg', 'fig', 'sim', 'sequence', 'layers', 'flow', 'cycle', 'chart', 'explore', 'fly', 'hold', 'plan', 'hotspot', 'gallery', 'tree', 'mindmap', 'tool'],
      remember: ['numbers', 'matrix', 'tricks', 'pairs', 'bullets', 'formulas', 'decoder', 'timeline', 'scale', 'signals'], test: ['quiz', 'stamp', 'classify'] };
    const fams = [];
    const short = l => plain(l.short || l.ask || l.id).replace(/\?$/, '');
    const sub = l => { const t = plain(l.takeaway || l.lead || ''); if (!t) return ''; const s = t.split(/(?<=[.;])\s/)[0]; return s.length > 64 ? s.slice(0, 61).replace(/\s+\S*$/, '') + '…' : s; };
    const leaf = l => ({ label: short(l), sub: sub(l), tip: l.takeaway || l.lead || '', quote: l.quote, jump: l.id, tier: l.tier });
    const hasParts = use.some(l => l.part);
    if (hasParts) {
      let curName = null;
      use.forEach(l => {
        if (l.part) curName = l.part;
        if (l.type === 'mindmap' && !curName) return;
        const p = curName || 'Start here';
        let f = fams.find(x => x.label === p);
        if (!f) { f = { label: p, icon: l.icon, children: [] }; fams.push(f); }
        f.children.push(leaf(l));
      });
    } else {
      const names = { understand: ['See how it works', 'eye'], remember: ['Know it by heart', 'brain'], test: ['Test yourself', 'check'] };
      Object.keys(ROLE).forEach(k => {
        const ls = use.filter(l => (ROLE[k].includes(l.type) || (k === 'understand' && !Object.values(ROLE).flat().includes(l.type))) && l.type !== 'mindmap');
        if (ls.length) fams.push({ label: names[k][0], icon: names[k][1], children: ls.map(leaf) });
      });
    }
    if (!fams.length) return null;
    return { id: 'bigpicture', type: 'tree', auto: true, short: 'The big picture', icon: 'map',
      ask: 'The big picture: what is in ' + c.title + '?',
      lead: 'Every lesson in this chapter on one chart, grouped by part. Tap a box for its one-line answer, then jump straight to it.',
      takeaway: c.big,
      infoTitle: 'Tap any box', infoText: 'Each box is one lesson below: tap it for the answer, then “Go to this lesson”.',
      root: { label: c.title, sub: c.tag || '', tip: c.purpose || c.big, children: fams } };
  };

  /* =====================================================================
     flow: the whole chart is drawn at once (only70 style) when the graph is a ladder
     (each question leads to at most one further question; the other answers end).
     Other graphs keep the step-by-step reveal from lessons.js.
     ===================================================================== */
  const stepFlow = R.flow;
  const isEnd = n => n && (n.end || n.type === 'end');
  const optsOf = n => n.options || [{ label: 'Yes', to: n.yes }, { label: 'No', to: n.no }];
  function ladder(d) {
    const spine = []; let id = d.start; const seen = new Set();
    while (id && d.nodes[id] && !isEnd(d.nodes[id])) {
      if (seen.has(id)) return null; seen.add(id);
      const os = optsOf(d.nodes[id]);
      if (os.some(o => !d.nodes[o.to])) return null;
      const qn = os.filter(o => !isEnd(d.nodes[o.to]));
      if (qn.length > 1) return null;
      spine.push({ id, n: d.nodes[id], os, next: qn[0] || null });
      id = qn[0] ? qn[0].to : null;
    }
    return spine.length ? spine : null;
  }
  R.flow = (d, st, ctx) => {
    const spine = d.layout === 'steps' ? null : ladder(d);
    if (!spine) return stepFlow(d, st, ctx);
    const chart = el('div', { class: 'fchart' });
    const seen = new Set();
    let active = 0;
    const rows = spine.map((q, k) => {
      const last = k === spine.length - 1;
      const ends = q.os.filter(o => o !== q.next);
      const below = last && !q.next && ends.length > 1 ? ends[ends.length - 1] : null;
      const side = below ? ends.slice(0, -1) : ends;
      const btns = q.os.map(o => el('button', { type: 'button', onclick: () => choose(k, o) }, o.label));
      const qb = el('div', { class: 'fcq' }, el('span', { class: 'qm' }, '?'), el('div', { class: 'qt' }, rich(q.n.text)), el('div', { class: 'yn' }, btns));
      const endEl = o => {
        const n = d.nodes[o.to], again = seen.has(o.to); seen.add(o.to);
        const b = el('button', { type: 'button', class: 'fce ' + (n.hue != null ? hue(n.hue) : hue(ctx.hueStart + 2 + Object.keys(d.nodes).indexOf(o.to))) + (again ? ' again' : ''), 'data-to': o.to,
          onclick: () => ctx.info(plain(n.text), n.body || '', n.quote, { icon: 'flag' }) }, again ? '→ ' : null, rich(n.text));
        return b;
      };
      const sideEls = side.map(o => { const e = endEl(o); const w = el('div', { class: 'fcbr', 'data-o': o.label }, el('span', { class: 'wire' }, el('small', null, o.label)), e); w._o = o; return w; });
      const r = el('div', { class: 'fcrow' + (k ? '' : ' act') }, el('div', { class: 'fcl' }, qb), el('div', { class: 'fcr' }, sideEls));
      chart.append(r);
      let down = null, downEnd = null;
      if (q.next) { down = el('div', { class: 'fcdown' }, el('small', null, q.next.label)); chart.append(down); }
      else if (below) { down = el('div', { class: 'fcdown' }, el('small', null, below.label)); downEnd = el('div', { class: 'fcrow' }, el('div', { class: 'fcl' }, endEl(below))); downEnd._o = below; chart.append(down, downEnd); }
      return { q, r, btns, sideEls, down, downEnd, below };
    });
    function reset() {
      active = 0; chart.classList.remove('done');
      chart.querySelectorAll('.lit,.pick,.past').forEach(x => x.classList.remove('lit', 'pick', 'past'));
      rows.forEach((x, k) => { x.r.classList.toggle('act', k === 0); x.btns.forEach(b => { b.disabled = k !== 0; }); });
      ctx.info(d.infoTitle || 'Start at the top', d.infoText || 'Answer each question on the chart. The path you take lights up.', null, { icon: 'flag' });
    }
    function choose(k, o) {
      if (k !== active) return;
      const x = rows[k];
      x.btns.forEach(b => b.classList.toggle('pick', b.textContent === o.label));
      x.btns.forEach(b => { b.disabled = true; });
      x.r.classList.remove('act'); x.r.classList.add('past');
      if (x.q.n.tip) ctx.info(plain(x.q.n.text), x.q.n.tip, null, { icon: 'flag' });
      if (o === x.q.next) {
        x.down.classList.add('lit'); active = k + 1;
        const nx = rows[active]; nx.r.classList.add('act'); nx.btns.forEach(b => { b.disabled = false; });
        return;
      }
      let endBtn;
      if (x.below === o) { x.down.classList.add('lit'); x.downEnd.classList.add('lit'); endBtn = x.downEnd.querySelector('.fce'); }
      else { const br = x.sideEls.find(s => s._o === o); br.classList.add('lit'); endBtn = br.querySelector('.fce'); }
      endBtn.classList.add('lit'); chart.classList.add('done');
      const n = d.nodes[o.to];
      ctx.info(plain(n.text), n.body || '', n.quote, { icon: 'flag', tone: 'good' });
    }
    st.append(el('div', { class: 'row', style: { marginBottom: '16px' } }, el('button', { class: 'btn', type: 'button', onclick: reset }, icon('refresh'), 'Start again'), el('span', { class: 'hint' }, d.note || 'Or tap any answer box to read it.')),
      el('div', { class: 'scrollx' }, chart));
    reset();
  };

  /* =====================================================================
     hotspot: a drawing with numbered pins and a legend of chips.
     d.svg (markup) or d.fig; spots[{x, y, label, sub, tip, quote}] in the drawing's own units
     (viewBox), or in % when d.pct is true. "Name the parts" hides the labels to test yourself.
     ===================================================================== */
  R.hotspot = (d, st, ctx) => {
    const fig = svgFrom(d);
    if (!fig) { st.append(el('p', { class: 'hint' }, 'Drawing missing.')); return; }
    fig.classList.add('fig');
    const box = el('div', { class: 'hsbox' }, fig);
    const leg = el('div', { class: 'hsleg' });
    let test = false; const named = new Set();
    const cnt = el('span', { class: 'hint' });
    const pins = d.spots.map((s, i) => {
      const p = el('button', { type: 'button', class: 'hspin ' + hue(s.hue != null ? s.hue : ctx.hueStart + i), 'aria-label': 'Part ' + (i + 1), onclick: () => pick(i) }, String(i + 1));
      box.append(p);
      const chip = el('button', { type: 'button', class: 'hschip ' + hue(s.hue != null ? s.hue : ctx.hueStart + i), onclick: () => pick(i) }, el('b', null, i + 1), el('span', { class: 'nm' }, s.label));
      leg.append(chip);
      return { p, chip };
    });
    const place = () => {
      const v = vbox(fig);
      d.spots.forEach((s, i) => {
        const x = d.pct ? s.x : ((s.x - v.x) / v.width) * 100, y = d.pct ? s.y : ((s.y - v.y) / v.height) * 100;
        Object.assign(pins[i].p.style, { left: x + '%', top: y + '%' });
      });
    };
    place();
    function pick(i) {
      pins.forEach((x, j) => { x.p.classList.toggle('on', i === j); x.chip.classList.toggle('on', i === j); });
      const s = d.spots[i];
      if (test) { named.add(i); pins[i].chip.classList.add('named'); cnt.textContent = named.size + ' of ' + d.spots.length + ' named'; }
      ctx.info((i + 1) + '. ' + s.label + (s.sub ? ' · ' + s.sub : ''), s.tip || '', s.quote, { icon: 'target' });
    }
    const tbtn = el('button', { type: 'button', class: 'btn ghost sm', onclick: () => {
      test = !test; named.clear(); leg.classList.toggle('testing', test); leg.querySelectorAll('.named').forEach(x => x.classList.remove('named'));
      tbtn.lastChild.textContent = test ? 'Show the labels' : 'Name the parts: hide the labels';
      cnt.textContent = test ? '0 of ' + d.spots.length + ' named' : '';
      ctx.info(test ? 'Name each part' : 'Tap a pin', test ? 'Say the name of each numbered part, then tap its pin to check.' : 'Each number marks one part of the picture.', null, { icon: 'target' });
    } }, icon('eye'), el('span', null, 'Name the parts: hide the labels'));
    st.append(el('div', { class: 'row', style: { marginBottom: '12px' } }, tbtn, cnt), el('div', { class: 'scrollx' }, el('div', { class: 'hswrap', style: { minWidth: (d.minWidth || 520) + 'px' } }, box)), leg);
    if (d.caption) st.append(el('p', { class: 'figcap' }, rich(d.caption)));
    ctx.info(d.infoTitle || 'Tap a pin', d.infoText || 'Each number marks one part of the picture.', null, { icon: 'target' });
  };

  /* =====================================================================
     signals: a filterable grid of picture cards, with "hide the names and test me".
     d.groups[], d.cards[{name, sub, group, svg | fig | visual | emoji, tip, quote, hue}]
     ===================================================================== */
  R.signals = (d, st, ctx) => {
    let grp = 'All', test = false; const seen = new Set();
    const groups = ['All'].concat(d.groups || []);
    const pills = el('div', { class: 'sgpills' });
    const grid = el('div', { class: 'sggrid' });
    const cnt = el('span', { class: 'hint' });
    const gi = g => Math.max(0, (d.groups || []).indexOf(g));
    const cards = d.cards.map((c, i) => {
      const vis = c.svg ? (() => { const w = el('div'); w.innerHTML = c.svg; return w.firstElementChild; })() : c.fig ? G.fig(c.fig, c) : c.visual ? G.visual(c.visual) : el('span', { class: 'emo' }, c.emoji || '•');
      const b = el('button', { type: 'button', class: 'sgcard ' + hue(c.hue != null ? c.hue : gi(c.group) + ctx.hueStart), onclick: () => pick(i) },
        el('div', { class: 'pic' }, vis), el('b', { class: 'nm' }, c.name), c.sub ? el('small', null, c.sub) : null, el('span', { class: 'q' }, '?'));
      grid.append(b); return b;
    });
    function pick(i) {
      const c = d.cards[i];
      cards.forEach((b, j) => b.classList.toggle('on', i === j));
      if (test) { seen.add(i); cards[i].classList.add('shown'); count(); }
      ctx.info(c.name + (c.sub ? ' · ' + c.sub : ''), c.tip || '', c.quote, { icon: 'eye' });
    }
    function count() { const vis = d.cards.filter((c, i) => grp === 'All' || c.group === grp); cnt.textContent = test ? vis.filter(c => seen.has(d.cards.indexOf(c))).length + ' of ' + vis.length + ' named' : vis.length + ' cards'; }
    function filter() {
      pills.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.g === grp));
      cards.forEach((b, i) => { b.hidden = !(grp === 'All' || d.cards[i].group === grp); });
      count();
    }
    if (d.groups && d.groups.length) groups.forEach(g => pills.append(el('button', { type: 'button', 'data-g': g, onclick: () => { grp = g; filter(); } }, g)));
    const tbtn = el('button', { type: 'button', class: 'btn ghost sm', onclick: () => {
      test = !test; seen.clear(); grid.classList.toggle('testing', test); cards.forEach(b => b.classList.remove('shown'));
      tbtn.lastChild.textContent = test ? 'Show the names' : 'Hide the names and test me'; count();
      ctx.info(test ? 'Name each one' : 'Tap a card', test ? 'Say the name aloud, then tap the card to check.' : 'Each card explains one signal.', null, { icon: 'eye' });
    } }, icon('eye'), el('span', null, 'Hide the names and test me'));
    st.append(pills, el('div', { class: 'row', style: { margin: '4px 0 14px' } }, tbtn, el('span', { class: 'spacer' }), cnt), grid);
    filter();
    ctx.info(d.infoTitle || 'Tap a card', d.infoText || (d.groups ? 'Pick a group, or test yourself with the names hidden.' : 'Tap a card, or test yourself with the names hidden.'), null, { icon: 'eye' });
  };

  /* =====================================================================
     fly: an animated drawing. Groups marked data-k="..." appear step by step; a plane flies
     SVG paths. d.svg | d.fig; d.base[] = keys visible from the start;
     d.steps[{label, show[], hide[], fly[{d, dur, tone, keep}], tip, quote}]
     ===================================================================== */
  const PLANE = 'M14 0 L5 -2 L1 -10 L-2 -10 L0 -2 L-8 -2 L-11 -6 L-13 -6 L-12 0 L-13 6 L-11 6 L-8 2 L0 2 L-2 10 L1 10 L5 2 Z';
  R.fly = (d, st, ctx) => {
    const svg = svgFrom(d);
    if (!svg) { st.append(el('p', { class: 'hint' }, 'Drawing missing.')); return; }
    svg.classList.add('fig', 'flysvg');
    const v = vbox(svg), sc = d.planeScale || Math.max(0.8, v.width / 520);
    const keyed = [...svg.querySelectorAll('[data-k]')];
    keyed.forEach(g => g.classList.add('fk'));
    const trails = sv('g', { class: 'fltrails' });
    const plane = sv('g', { class: 'flplane', opacity: 0 }, sv('path', { d: PLANE, transform: `scale(${sc})` }));
    svg.append(trails, plane);
    let i = -1, token = 0;
    const chips = el('div', { class: 'flchips' });
    const chipEls = d.steps.map((s, k) => { const b = el('button', { type: 'button', onclick: () => go(k, true) }, el('b', null, k + 1), s.label); chips.append(b); return b; });
    const back = el('button', { class: 'btn ghost', type: 'button', onclick: () => go(i - 1, false) }, icon('left'), 'Back');
    const playAll = el('button', { class: 'btn dark', type: 'button', onclick: () => all() }, icon('plane'), 'Play all');
    const replay = el('button', { class: 'btn', type: 'button', onclick: () => go(Math.max(0, i), true) }, icon('refresh'), 'Replay');
    const next = el('button', { class: 'btn', type: 'button', onclick: () => go(i + 1, true) }, 'Next', icon('right'));
    function visibleAt(k) {
      const on = new Set(d.base || []);
      for (let j = 0; j <= k; j++) { (d.steps[j].show || []).forEach(x => on.add(x)); (d.steps[j].hide || []).forEach(x => on.delete(x)); }
      return on;
    }
    function trailPath(f, k, anim) {
      const tone = f.tone ? `var(--${f.tone}i)` : 'var(--accent)';
      const p = sv('path', { d: f.d, fill: 'none', stroke: tone, 'stroke-width': (f.w || 3) * sc, 'stroke-linecap': 'round', 'stroke-dasharray': f.dash ? `${8 * sc} ${7 * sc}` : null, class: 'fltrail', 'data-step': k });
      trails.append(p);
      return p;
    }
    function setPlane(p, len, at) {
      const L = Math.max(0, Math.min(len, at));
      const a = p.getPointAtLength(L), b = p.getPointAtLength(Math.min(len, L + 1)), b0 = p.getPointAtLength(Math.max(0, L - 1));
      const ang = Math.atan2(b.y - b0.y, b.x - b0.x) * 180 / Math.PI;
      plane.setAttribute('transform', `translate(${a.x} ${a.y}) rotate(${ang})`); plane.setAttribute('opacity', 1);
    }
    function staticTo(k) {
      trails.replaceChildren(); plane.setAttribute('opacity', 0);
      let lastP = null;
      for (let j = 0; j <= k; j++) (d.steps[j].fly || []).forEach(f => { if (f.keep === false && j < k) return; lastP = trailPath(f, j); });
      if (lastP) setPlane(lastP, lastP.getTotalLength(), lastP.getTotalLength());
    }
    function show(k) {
      const on = visibleAt(k), prev = visibleAt(k - 1);
      keyed.forEach(g => { const kk = g.getAttribute('data-k'); g.classList.toggle('off', !on.has(kk)); g.classList.toggle('new', on.has(kk) && !prev.has(kk)); });
      chipEls.forEach((b, j) => { b.classList.toggle('on', j === k); b.classList.toggle('past', j < k); });
      back.disabled = k <= 0; next.disabled = k >= d.steps.length - 1;
      const s = d.steps[k];
      ctx.info((k + 1) + '. ' + s.label, s.tip || '', s.quote, { icon: s.role === 'alert' ? 'alert' : 'plane', tone: s.role === 'alert' ? 'bad' : null });
    }
    function animate(k, my) {
      const fl = (d.steps[k].fly || []);
      if (!fl.length) return Promise.resolve();
      return fl.reduce((pr, f) => pr.then(() => new Promise(res => {
        if (my !== token) return res();
        const p = trailPath(f, k); const len = p.getTotalLength();
        if (reduced()) { setPlane(p, len, len); return res(); }
        p.style.strokeDasharray = f.dash ? '' : len; if (!f.dash) p.style.strokeDashoffset = len;
        const dur = (f.dur || 2.4) * 1000, t0 = performance.now();
        const tick = now => {
          if (my !== token) return res();
          const u = Math.min(1, (now - t0) / dur), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
          if (!f.dash) p.style.strokeDashoffset = len * (1 - e);
          setPlane(p, len, len * e);
          if (u < 1) requestAnimationFrame(tick); else res();
        };
        requestAnimationFrame(tick);
      })), Promise.resolve());
    }
    function go(k, play) {
      if (k < 0 || k >= d.steps.length) return;
      token++; const my = token;
      i = k; staticTo(k - 1);
      show(k);
      if (play) return animate(k, my); staticTo(k); return Promise.resolve();
    }
    async function all() {
      token++; const my = token + 1;
      for (let k = 0; k < d.steps.length; k++) {
        token = my + k; const me = token;
        i = k; staticTo(k - 1); show(k);
        await animate(k, me);
        if (token !== me) return;
        await new Promise(r => setTimeout(r, reduced() ? 300 : 1100));
        if (token !== me) return;
      }
    }
    st.append(el('div', { class: 'flybox' }, svg), chips, el('div', { class: 'row', style: { marginTop: '12px' } }, back, playAll, replay, next));
    if (d.caption) st.append(el('p', { class: 'figcap' }, rich(d.caption)));
    keyed.forEach(g => g.classList.toggle('off', !(d.base || []).includes(g.getAttribute('data-k'))));
    go(0, false);
    ctx.info(d.infoTitle || 'Press Play', d.infoText || 'Watch it step by step, or tap any numbered step.', null, { icon: 'plane' });
  };

  /* =====================================================================
     hold: holding-pattern entry trainer. The sectors follow PANS-OPS: direct 180°,
     teardrop (offset) 70°, parallel 110°, split by the inbound track and the 70° line.
     d.inbound (deg), d.turn 'R' | 'L', d.heading (arrival heading). All optional.
     ===================================================================== */
  const rad = a => a * Math.PI / 180;
  const n360 = a => ((a % 360) + 360) % 360;
  G.holdEntry = function (inbound, turn, hdg) {
    let dlt = n360(hdg - inbound);
    if (turn === 'L') dlt = n360(-dlt);
    if (dlt > 110 && dlt < 180) return 'teardrop';
    if (dlt >= 180 && dlt < 290) return 'parallel';
    return 'direct';
  };
  R.hold = (d, st, ctx) => {
    const W = 560, H = 440, CX = 300, CY = 200, LEG = 120, RHO = 42;
    let C = d.inbound != null ? d.inbound : 360, T = d.turn || 'R', HDG = d.heading != null ? d.heading : 135, token = 0, answered = false;
    const svg = sv('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig holdsvg', role: 'img', 'aria-label': 'Holding pattern with entry sectors' });
    const gSect = sv('g'), gPat = sv('g'), gArr = sv('g'), gTrail = sv('g'), gPlane = sv('g', { class: 'flplane' }, sv('path', { d: PLANE, transform: 'scale(1.15)' }));
    svg.append(gSect, gPat, gTrail, gArr, gPlane);
    const vec = h => [Math.sin(rad(h)), -Math.cos(rad(h))];
    const S = T2 => T2 === 'R' ? 1 : -1;
    function sectorPath(a0, a1, r) { // bearings from the fix, clockwise a0→a1
      const p0 = [CX + r * Math.sin(rad(a0)), CY - r * Math.cos(rad(a0))], p1 = [CX + r * Math.sin(rad(a1)), CY - r * Math.cos(rad(a1))];
      const big = n360(a1 - a0) > 180 ? 1 : 0;
      return `M${CX},${CY} L${p0[0]},${p0[1]} A${r},${r} 0 ${big} 1 ${p1[0]},${p1[1]} Z`;
    }
    function sectors() {
      // arrival bearings (from the fix) for a right-hand hold with inbound C: direct C+110..C+290, teardrop C+290..C+360, parallel C..C+110
      const s = S(T), r = 196;
      const b = x => n360(C + s * x);
      const segs = T === 'R' ? [['direct', b(110), b(290)], ['teardrop', b(290), b(360)], ['parallel', b(0), b(110)]]
        : [['direct', b(290), b(110)], ['teardrop', b(0), b(70)], ['parallel', b(250), b(360)]];
      gSect.replaceChildren();
      const tone = { direct: 'h1', teardrop: 'h4', parallel: 'h0' };
      segs.forEach(([k, a0, a1]) => {
        gSect.append(sv('path', { d: sectorPath(a0, a1, r), class: 'hsec', 'data-e': k, style: `fill:var(--${tone[k]})` }));
        const mid = n360(a0 + n360(a1 - a0) / 2);
        gSect.append(sv('text', { x: CX + 150 * Math.sin(rad(mid)), y: CY - 150 * Math.cos(rad(mid)) + 5, 'text-anchor': 'middle', class: 'hlab', style: `fill:var(--${tone[k]}i)` }, k[0].toUpperCase() + k.slice(1)));
      });
      // inbound track extended + 70° line
      const [ux, uy] = vec(C);
      gSect.append(sv('line', { x1: CX - ux * 200, y1: CY - uy * 200, x2: CX + ux * 200, y2: CY + uy * 200, class: 'hline' }));
      const l70 = n360(C + S(T) * 110), [lx, ly] = vec(l70);
      gSect.append(sv('line', { x1: CX - lx * 200, y1: CY - ly * 200, x2: CX + lx * 200, y2: CY + ly * 200, class: 'hline dash' }));
    }
    function pattern() {
      const [ux, uy] = vec(C), s = S(T), [rx, ry] = vec(C + 90 * s);
      const F = [CX, CY], A = [CX + rx * 2 * RHO, CY + ry * 2 * RHO], B = [A[0] - ux * LEG, A[1] - uy * LEG], Bs = [CX - ux * LEG, CY - uy * LEG];
      const sw = s > 0 ? 1 : 0;
      gPat.replaceChildren(sv('path', { d: `M${Bs[0]},${Bs[1]} L${F[0]},${F[1]} A${RHO},${RHO} 0 0 ${sw} ${A[0]},${A[1]} L${B[0]},${B[1]} A${RHO},${RHO} 0 0 ${sw} ${Bs[0]},${Bs[1]}`, class: 'hpat' }),
        sv('circle', { cx: CX, cy: CY, r: 7, class: 'hfix' }),
        sv('text', { x: CX + ux * 16 + rx * -14, y: CY + uy * 16 + ry * -14 + 4, 'text-anchor': 'middle', class: 'hsm' }, 'FIX'),
        sv('text', { x: (Bs[0] + F[0]) / 2 - rx * 18, y: (Bs[1] + F[1]) / 2 - ry * 18 + 4, 'text-anchor': 'middle', class: 'hsm' }, 'inbound ' + String(Math.round(C) % 360 || 360).padStart(3, '0') + '°'));
    }
    function arrival() {
      const B0 = n360(HDG + 180), r = 186; const [bx, by] = [Math.sin(rad(B0)), -Math.cos(rad(B0))];
      const P0 = [CX + bx * r, CY + by * r];
      gTrail.replaceChildren(); gArr.replaceChildren(sv('line', { x1: P0[0], y1: P0[1], x2: CX + bx * 14, y2: CY + by * 14, class: 'harr' }));
      gPlane.setAttribute('transform', `translate(${P0[0]} ${P0[1]}) rotate(${HDG - 90})`);
      return P0;
    }
    /* entry path by simple flight simulation: straight legs, rate-limited turns, homing to the fix */
    function entryPath(kind) {
      const s = S(T), O = n360(C + 180), pts = []; let x, y, h = HDG;
      const P0 = arrival(); x = P0[0]; y = P0[1]; pts.push([x, y]);
      const step = 3, w = step / RHO * 180 / Math.PI;
      const fwd = n => { for (let k = 0; k < n; k += step) { const [vx, vy] = vec(h); x += vx * step; y += vy * step; pts.push([x, y]); } };
      const turnTo = (tgt, dir) => { let g = 0; while (Math.abs(((tgt - h + 540) % 360) - 180) > w && g++ < 400) { h = n360(h + dir * w); const [vx, vy] = vec(h); x += vx * step; y += vy * step; pts.push([x, y]); } h = tgt; };
      const home = (tx, ty, dirPref) => { let g = 0; while (Math.hypot(tx - x, ty - y) > step * 1.5 && g++ < 900) { const brg = n360(Math.atan2(tx - x, -(ty - y)) * 180 / Math.PI); let df = ((brg - h + 540) % 360) - 180; if (dirPref && Math.abs(df) > 150) df = dirPref * Math.abs(df); h = n360(h + Math.max(-w, Math.min(w, df))); const [vx, vy] = vec(h); x += vx * step; y += vy * step; pts.push([x, y]); } };
      home(CX, CY);
      const circuit = () => { turnTo(O, s); fwd(LEG); turnTo(n360(C), s); const [ux, uy] = vec(C); home(CX, CY); };
      if (kind === 'direct') { const df = ((O - h + 540) % 360) - 180; turnTo(O, s); fwd(LEG); turnTo(n360(C), s); home(CX, CY); }
      else if (kind === 'teardrop') { turnTo(n360(O - 30 * s), (((n360(O - 30 * s) - h + 540) % 360) - 180) >= 0 ? 1 : -1); fwd(LEG); turnTo(n360(C), s); home(CX, CY); }
      else { turnTo(O, (((O - h + 540) % 360) - 180) >= 0 ? 1 : -1); fwd(LEG); turnTo(n360(C + 30 * s * -1 + 0), -s); home(CX, CY, -s); }
      return 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
    }
    function fly(kind) {
      token++; const my = token;
      const p = sv('path', { d: entryPath(kind), class: 'htrail ' + kind });
      gTrail.replaceChildren(p);
      const len = p.getTotalLength();
      if (reduced()) { const a = p.getPointAtLength(len); gPlane.setAttribute('transform', `translate(${a.x} ${a.y})`); return; }
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      const dur = 5200, t0 = performance.now();
      const tick = now => {
        if (my !== token) return;
        const u = Math.min(1, (now - t0) / dur), L = len * u;
        p.style.strokeDashoffset = len - L;
        const a = p.getPointAtLength(L), b = p.getPointAtLength(Math.min(len, L + 1)), b0 = p.getPointAtLength(Math.max(0, L - 1));
        gPlane.setAttribute('transform', `translate(${a.x} ${a.y}) rotate(${Math.atan2(b.y - b0.y, b.x - b0.x) * 180 / Math.PI})`);
        if (u < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    const ro = el('div', { class: 'hread' });
    const ans = el('div', { class: 'row hans' });
    const KINDS = [['direct', 'Direct'], ['teardrop', 'Teardrop (offset)'], ['parallel', 'Parallel']];
    const abtn = KINDS.map(([k, l]) => { const b = el('button', { type: 'button', class: 'stampb', onclick: () => guess(k, b) }, l); ans.append(b); return b; });
    const slider = el('input', { type: 'range', min: 0, max: 359, step: 5, value: HDG, 'aria-label': 'Arrival heading', oninput: e => { HDG = +e.target.value; fresh(false); } });
    let score = 0, tries = 0;
    const sc = el('span', { class: 'hint' });
    function fresh(randomHold) {
      token++; answered = false;
      if (randomHold) { C = Math.round(Math.random() * 35 + 1) * 10; T = Math.random() < .75 ? 'R' : 'L'; }
      svg.classList.remove('reveal');
      sectors(); pattern(); arrival();
      abtn.forEach(b => b.classList.remove('good', 'bad'));
      ro.replaceChildren(el('div', null, el('small', null, 'Hold'), el('b', null, 'Inbound ' + String(C % 360 || 360).padStart(3, '0') + '° · ' + (T === 'R' ? 'right turns (standard)' : 'left turns (non-standard)'))),
        el('div', null, el('small', null, 'You arrive heading'), el('b', { class: 'mono' }, String(HDG % 360 || 360).padStart(3, '0') + '°')));
      slider.value = HDG;
      ctx.info('Which entry?', 'Look at your heading relative to the inbound course, then press Direct, Teardrop or Parallel.', null, { icon: 'rotate' });
    }
    function guess(k, b) {
      const right = G.holdEntry(C, T, HDG);
      if (!answered) { tries++; if (k === right) score++; }
      answered = true;
      abtn.forEach((x, j) => x.classList.toggle('good', KINDS[j][0] === right));
      if (k !== right) b.classList.add('bad');
      svg.classList.add('reveal');
      gSect.querySelectorAll('.hsec').forEach(p => p.classList.toggle('lit', p.dataset.e === right));
      sc.textContent = score + ' of ' + tries + ' right first time';
      const why = { direct: 'Your heading lies within the 180° direct sector: cross the fix, turn ' + (T === 'R' ? 'right' : 'left') + ' onto the outbound leg and fly the pattern.',
        teardrop: 'Teardrop (offset): cross the fix, turn onto a heading 30° off the outbound track on the holding side, fly 1 minute, then turn ' + (T === 'R' ? 'right' : 'left') + ' to intercept the inbound track.',
        parallel: 'Parallel: cross the fix, turn onto the outbound heading on the non-holding side for 1 minute, then turn ' + (T === 'R' ? 'left' : 'right') + ' (towards the holding side) back to the fix.' }[right];
      ctx.info((k === right ? '✓ ' : '✗ ') + right[0].toUpperCase() + right.slice(1) + ' entry', why, null, { icon: 'rotate', tone: k === right ? 'good' : 'bad' });
      fly(right);
    }
    st.append(el('div', { class: 'holdgrid' }, el('div', { class: 'holdfig' }, svg), el('div', { class: 'holdside' }, ro,
      el('label', { class: 'hslide' }, el('small', null, 'Change your heading'), slider),
      el('div', { class: 'kicker', style: { margin: '14px 0 8px' } }, 'Which entry?'), ans, sc,
      el('div', { class: 'row', style: { marginTop: '14px' } },
        el('button', { class: 'btn', type: 'button', onclick: () => { HDG = Math.round(Math.random() * 71) * 5; fresh(false); } }, icon('shuffle'), 'New arrival'),
        el('button', { class: 'btn ghost', type: 'button', onclick: () => { HDG = Math.round(Math.random() * 71) * 5; fresh(true); } }, icon('refresh'), 'New hold')))));
    fresh(false);
  };

  /* =====================================================================
     plan: concentric rings seen from above. d.center{label, sub}, d.rings[{label, sub, r, tip, quote, hue}]
     listed from the outside in; r is optional (real radius for proportional rings).
     ===================================================================== */
  R.plan = (d, st, ctx) => {
    const S = 480, c = S / 2, rings = d.rings, n = rings.length;
    const maxR = Math.max(...rings.map(r => r.r || 0)) || 0;
    const rad2 = (r, i) => maxR && r.r ? 30 + (r.r / maxR) * (c - 40) : (c - 10) - i * ((c - 60) / Math.max(1, n));
    const svg = sv('svg', { viewBox: `0 0 ${S} ${S}`, class: 'fig plansvg', role: 'img', 'aria-label': d.alt || plain(d.ask || 'Rings') });
    const list = el('div', { class: 'planlist' });
    const items = rings.map((r, i) => {
      const R0 = rad2(r, i), next = rings[i + 1] ? rad2(rings[i + 1], i + 1) : (d.center ? 26 : 0);
      const h = r.hue != null ? r.hue : ctx.hueStart + i;
      const g = sv('g', { class: 'pring', onclick: () => pick(i) },
        sv('circle', { cx: c, cy: c, r: R0, style: `fill:var(--h${((h % 6) + 6) % 6});stroke:var(--h${((h % 6) + 6) % 6}i)`, 'stroke-width': 1.5, 'stroke-dasharray': r.dash ? '6 5' : null }),
        sv('text', { x: c, y: c - (R0 + next) / 2 + 5, 'text-anchor': 'middle', class: 'plab', style: `fill:var(--h${((h % 6) + 6) % 6}i)` }, r.short || r.label),
        r.dim ? sv('text', { x: c + R0 - 6, y: c + 4, 'text-anchor': 'end', class: 'pdim' }, r.dim) : null);
      svg.append(g);
      const li = el('button', { type: 'button', class: 'pli ' + hue(h), onclick: () => pick(i) }, el('i'), el('span', null, el('b', null, r.label), r.sub ? el('small', null, r.sub) : null));
      list.append(li);
      return { g, li };
    });
    if (d.center) svg.append(sv('g', { class: 'pring', onclick: () => ctx.info(d.center.label, d.center.tip || d.center.sub || '', d.center.quote, { icon: 'target' }) },
      sv('circle', { cx: c, cy: c, r: 24, style: 'fill:var(--ink)' }), sv('text', { x: c, y: c + 4, 'text-anchor': 'middle', class: 'pcen' }, d.center.label)));
    function pick(i) {
      items.forEach((x, j) => { x.g.classList.toggle('on', i === j); x.li.classList.toggle('on', i === j); });
      const r = rings[i]; ctx.info(r.label + (r.sub ? ' · ' + r.sub : ''), r.tip || '', r.quote, { icon: 'target' });
    }
    st.append(el('div', { class: 'plangrid' }, el('div', null, svg), list));
    ctx.info(d.infoTitle || 'Tap a ring', d.infoText || 'Each ring is one layer, from the outside in.', null, { icon: 'target' });
  };

  /* =====================================================================
     explore: tabs of small toys. Tabs may name a lesson type (type) or an only70-style kind:
     dial | wheel | board | shelf. Old data keeps working.
     ===================================================================== */
  R.explore = (d, st, ctx) => {
    const tabs = el('div', { class: 'tabs xtabs' });
    const body = el('div');
    const btns = d.tabs.map((t, i) => { const b = el('button', { type: 'button', onclick: () => pick(i) }, t.icon ? icon(t.icon) : null, t.label); tabs.append(b); return b; });
    function pick(i) {
      btns.forEach((b, j) => b.classList.toggle('on', i === j));
      body.replaceChildren();
      const t = d.tabs[i];
      if (t.title) body.append(el('h4', { class: 'xtitle' }, t.title));
      if (t.intro) body.append(el('p', { class: 'lead', style: { marginTop: t.title ? '2px' : 0, marginBottom: '14px' } }, rich(t.intro)));
      const inner = el('div'); body.append(inner);
      const f = t.kind ? X[t.kind] : R[t.type];
      try { f(t, inner, ctx); } catch (e) { console.error(e); inner.append(el('p', { class: 'hint' }, 'This part could not be drawn.')); }
    }
    if (d.intro) st.append(el('p', { class: 'lead', style: { marginTop: 0, marginBottom: '14px' } }, rich(d.intro)));
    st.append(tabs, body); pick(0);
  };
  const X = (G.X = {});
  /* dial: drag a value along a scale; coloured bands say what applies */
  X.dial = (t, st, ctx) => {
    const min = t.min || 0, max = t.max, step = t.step || 1;
    let v = t.start != null ? t.start : min;
    const pct = x => ((x - min) / (max - min)) * 100;
    const big = el('b', { class: 'dv' }), badge = el('span', { class: 'dbadge' }), sub = el('small', { class: 'hint' });
    const bar = el('div', { class: 'dbar' });
    const bandEls = (t.bands || []).map((b, i) => { const e = el('div', { class: 'dband ' + hue(b.hue != null ? b.hue : ctx.hueStart + i), style: { left: pct(b.from) + '%', width: (pct(b.to) - pct(b.from)) + '%' } }); bar.append(e); return e; });
    (t.ticks || []).forEach(x => bar.append(el('span', { class: 'dtick', style: { left: pct(x) + '%' } }, el('i'), el('em', null, String(x)))));
    const needle = el('div', { class: 'dneedle' }); bar.append(needle);
    const rng = el('input', { type: 'range', min, max, step, value: v, 'aria-label': t.title || 'Value', oninput: e => set(+e.target.value) });
    const chips = el('div', { class: 'row dchips' }, (t.bands || []).map((b, i) => el('button', { type: 'button', class: 'dchip2 ' + hue(b.hue != null ? b.hue : ctx.hueStart + i), onclick: () => set(Math.round(((b.from + b.to) / 2) / step) * step) }, el('b', null, b.label), b.sub ? el('small', null, b.sub) : null)));
    const fmt = x => (t.fmt ? t.fmt.replace('{v}', x) : x.toLocaleString('en-IN') + (t.plus && x >= max ? '+' : '') + ' ' + (t.unit || ''));
    function set(x) {
      v = Math.max(min, Math.min(max, x)); rng.value = v;
      needle.style.left = pct(v) + '%'; big.textContent = fmt(v);
      const bi = (t.bands || []).findIndex((b, i, a) => v >= b.from && (v < b.to || (i === a.length - 1 && v <= b.to)));
      bandEls.forEach((e, i) => e.classList.toggle('on', i === bi)); chips.querySelectorAll('button').forEach((e, i) => e.classList.toggle('on', i === bi));
      const b = t.bands[bi];
      badge.textContent = b ? b.label : ''; badge.className = 'dbadge ' + (b ? hue(b.hue != null ? b.hue : ctx.hueStart + bi) : '');
      sub.textContent = b && b.sub ? b.sub : '';
      if (b) ctx.info(b.label, b.tip || b.sub || '', b.quote, { icon: t.itemIcon || 'ruler' });
    }
    st.append(el('div', { class: 'dhead' }, big, badge), sub, el('div', { class: 'dpanel' }, bar), rng,
      t.ends ? el('div', { class: 'dends' }, el('span', null, t.ends[0]), el('span', null, t.ends[1])) : null, chips);
    set(v);
  };
  /* wheel: spin to land on one item at a time until all are found */
  X.wheel = (t, st, ctx) => {
    const n = t.items.length, S = 360, c = S / 2, r = 160;
    const found = new Set(); let rot = 0, spinning = false;
    const g = sv('g', { class: 'wrot' });
    const svg = sv('svg', { viewBox: `0 0 ${S} ${S + 26}`, class: 'fig wheelsvg', role: 'img', 'aria-label': t.alt || 'A wheel of ' + n + ' segments' }, sv('g', { transform: 'translate(0 26)' }, g), sv('path', { d: `M${c - 13},2 L${c + 13},2 L${c},30 Z`, class: 'wptr' }));
    const segs = t.items.map((it, i) => {
      const a0 = rad(i * 360 / n), a1 = rad((i + 1) * 360 / n), am = (a0 + a1) / 2;
      const p = sv('path', { d: `M${c},${c} L${c + r * Math.sin(a0)},${c - r * Math.cos(a0)} A${r},${r} 0 ${360 / n > 180 ? 1 : 0} 1 ${c + r * Math.sin(a1)},${c - r * Math.cos(a1)} Z`, class: 'wseg ' + (i % 2 ? 'b' : 'a') });
      const tx = sv('text', { x: c + r * .68 * Math.sin(am), y: c - r * .68 * Math.cos(am) + 8, 'text-anchor': 'middle', class: 'wk' }, it.k || String(i + 1));
      const sg = sv('g', { class: 'wsg', onclick: () => reveal(i) }, p, tx); g.append(sg);
      return { sg, p };
    });
    g.append(sv('circle', { cx: c, cy: c, r: 38, class: 'whub' }));
    const hub = sv('text', { x: c, y: c + 6, 'text-anchor': 'middle', class: 'whubt' }, (t.spin || 'Spin').toUpperCase());
    g.append(hub);
    const list = el('div', { class: 'wlist' });
    const cnt = el('span', { class: 'hint' });
    function reveal(i) {
      found.add(i); const it = t.items[i];
      segs[i].p.classList.add('got'); segs[i].p.style.fill = `var(--h${(ctx.hueStart + i) % 6})`;
      segs.forEach((s, j) => s.sg.classList.toggle('on', j === i));
      list.replaceChildren(...t.items.map((x, j) => found.has(j) ? el('button', { type: 'button', class: 'wli ' + hue(ctx.hueStart + j) + (j === i ? ' on' : ''), onclick: () => reveal(j) }, el('b', null, x.k || j + 1), x.label) : null));
      cnt.textContent = found.size + ' of ' + n + ' found' + (found.size === n ? ' · all done!' : '');
      ctx.info((it.k ? it.k + '. ' : '') + it.label, it.tip || '', it.quote, { icon: t.itemIcon || 'compass' });
    }
    function spin() {
      if (spinning) return;
      const left = t.items.map((_, i) => i).filter(i => !found.has(i));
      const pickI = left.length ? left[Math.floor(Math.random() * left.length)] : Math.floor(Math.random() * n);
      const target = 360 - (pickI + .5) * 360 / n;
      rot = rot - (rot % 360) + 720 + target; spinning = true;
      g.style.transition = reduced() ? 'none' : 'transform 1.6s cubic-bezier(.2,.8,.2,1)'; g.style.transform = `rotate(${rot}deg)`;
      setTimeout(() => { spinning = false; reveal(pickI); }, reduced() ? 0 : 1650);
    }
    hub.addEventListener('click', e => { e.stopPropagation(); spin(); });
    g.querySelector('.whub').addEventListener('click', e => { e.stopPropagation(); spin(); });
    g.style.transformOrigin = `${c}px ${c}px`;
    st.append(el('div', { class: 'wheelgrid' }, el('div', { class: 'wheelbox' }, svg, el('div', { class: 'row', style: { justifyContent: 'center' } }, el('button', { class: 'btn dark', type: 'button', onclick: spin }, icon('rotate'), t.spin || 'Spin'), cnt)), list));
    cnt.textContent = '0 of ' + n + ' found';
    ctx.info('Spin the wheel', 'Each spin lands on one you have not found yet. Or tap any segment.', null, { icon: 'compass' });
  };
  /* board: an airport departures board; tap a row */
  X.board = (t, st, ctx) => {
    const cols = t.columns || [];
    const head = el('div', { class: 'bdrow bdh' }, cols.map(c => el('span', null, c)), t.rows.some(r => r.tag) ? el('span', null, '') : null);
    const rows = t.rows.map((r, i) => {
      const cells = r.cells || [r.city, r.region];
      const b = el('button', { type: 'button', class: 'bdrow', style: { '--i': i }, onclick: () => { rows.forEach(x => x.classList.remove('on')); b.classList.add('on'); ctx.info(plain(cells[0]), r.tip || cells.slice(1).join(' · '), r.quote, { icon: t.itemIcon || 'globe' }); } },
        cells.map(c => el('span', null, c)), r.tag ? el('em', null, r.tag) : t.rows.some(x => x.tag) ? el('em', { class: 'none' }) : null);
      return b;
    });
    st.append(el('div', { class: 'board', style: { '--cols': cols.length + (t.rows.some(r => r.tag) ? 1 : 0) } }, el('div', { class: 'bdtitle' }, el('i'), t.board || 'Board'), head, rows));
    ctx.info('Tap a row', 'Each row opens a one-line explanation.', null, { icon: t.itemIcon || 'globe' });
  };
  /* shelf: books from thick (binding) to thin (guidance); drag the slider or tap a book */
  X.shelf = (t, st, ctx) => {
    const n = t.items.length;
    const shelf = el('div', { class: 'shelf' });
    const books = t.items.map((it, i) => { const w = Math.round(64 - (i * 40) / Math.max(1, n - 1)); const b = el('button', { type: 'button', class: 'book ' + hue(ctx.hueStart + i), style: { width: w + 'px' }, onclick: () => set(i) }, el('span', null, it.label)); shelf.append(b); return b; });
    const rng = el('input', { type: 'range', min: 0, max: n - 1, step: 1, value: 0, 'aria-label': 'Book', oninput: e => set(+e.target.value) });
    const card = el('div', { class: 'shcard' });
    function set(i) {
      rng.value = i; books.forEach((b, j) => b.classList.toggle('on', i === j));
      const it = t.items[i];
      card.replaceChildren(el('b', null, it.label), it.sub ? el('small', null, it.sub) : null, it.scope ? el('span', { class: 'chip ' + hue(ctx.hueStart + i) }, it.scope) : null);
      ctx.info(it.label, it.tip || '', it.quote, { icon: 'book' });
    }
    st.append(el('div', { class: 'shelfbox' }, shelf, el('div', { class: 'shboard' })), rng, t.ends ? el('div', { class: 'dends' }, el('span', null, t.ends[0]), el('span', null, t.ends[1])) : null, card);
    set(0);
  };
})();
