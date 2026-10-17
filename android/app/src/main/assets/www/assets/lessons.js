/* Glidepath lesson renderers. R[type](data, stage, ctx). ctx.info(title, text, quote) writes to the lesson's info bar. */
(function () {
  'use strict';
  const { el, sv, rich, icon, S, toast } = G;
  const R = (G.R = {});
  const HUES = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5'];
  const hue = i => HUES[((i % 6) + 6) % 6];
  const L = 'ABCDEFGH';

  /* figure resolver: "fig:name" uses FIG library; "<svg" raw markup; otherwise emoji/text */
  function visual(v, opts) {
    if (!v) return null;
    if (typeof v === 'function') return v(opts || {});
    if (typeof v === 'object' && v.fig) return G.fig(v.fig, v);
    if (typeof v === 'string' && v.startsWith('fig:')) return G.fig(v.slice(4), opts || {});
    if (typeof v === 'string' && v.trim().startsWith('<svg')) { const d = el('div'); d.innerHTML = v; return d.firstElementChild; }
    return el('span', null, v);
  }
  G.visual = visual;

  /* ---------- story ---------- */
  R.story = (d, st, ctx) => {
    let i = 0;
    const card = el('div', { class: 'card' });
    const count = el('span', { class: 'mono hint' });
    const prev = el('button', { class: 'btn ghost', onclick: () => go(i - 1) }, icon('left'), 'Back');
    const next = el('button', { class: 'btn dark', onclick: () => go(i + 1) }, 'Next', icon('right'));
    function go(n) {
      i = Math.max(0, Math.min(d.steps.length - 1, n));
      const s = d.steps[i];
      card.replaceChildren(
        el('div', { class: 'vis ' + hue(ctx.hueStart + i) }, visual(s.visual) || icon(s.icon || 'spark')),
        el('div', null, s.kicker ? el('div', { class: 'kick' }, s.kicker) : null, el('h4', null, s.title),
          [].concat(s.text || []).map(t => el('p', null, rich(t)))));
      count.textContent = (i + 1) + ' / ' + d.steps.length;
      prev.disabled = i === 0; next.disabled = i === d.steps.length - 1;
    }
    st.classList.add('story');
    st.append(card, el('div', { class: 'row', style: { marginTop: '16px' } }, prev, el('span', { class: 'spacer' }), count, el('span', { class: 'spacer' }), next));
    go(0);
  };

  /* ---------- tree (big picture) ---------- */
  R.tree = (d, st, ctx) => {
    const box = el('div', { class: 'tree' });
    const root = d.root;
    box.append(el('div', { class: 'rootpill' }, root.label, root.sub ? el('small', null, root.sub) : null));
    const fams = el('div', { class: 'fams', style: { gridTemplateColumns: `repeat(${root.children.length}, minmax(150px,1fr))` } });
    root.children.forEach((f, i) => {
      const col = el('div', { class: 'fam ' + (f.hue != null ? hue(f.hue) : hue(ctx.hueStart + i)) });
      col.append(el('div', { class: 'famhead' }, icon(f.icon || 'spark'), el('div', null, f.label, f.sub ? el('small', null, f.sub) : null)));
      (f.children || []).forEach(n => col.append(node(n)));
      fams.append(col);
    });
    function node(n) {
      const wrap = el('div');
      const kids = n.children && n.children.length ? el('div', { class: 'tkids', hidden: true }) : null;
      const b = el('button', { class: 'tnode', onclick: () => {
        st.querySelectorAll('.tnode.on').forEach(x => x.classList.remove('on')); b.classList.add('on');
        ctx.info(n.label, n.tip || n.sub || '', n.quote);
        if (kids) { kids.hidden = !kids.hidden; b.querySelector('.plus').textContent = kids.hidden ? '+' : '–'; }
      } }, n.label, n.sub ? el('small', null, n.sub) : null, kids ? el('span', { class: 'plus' }, '+') : null);
      wrap.append(b);
      if (kids) { n.children.forEach(k => kids.append(node(k))); wrap.append(kids); }
      return wrap;
    }
    box.append(fams);
    st.append(el('div', { class: 'scrollx' }, box));
    ctx.info('Tap any box', 'See what it means. Boxes with + open up further.');
  };

  /* ---------- mind map (two-sided, SVG) ---------- */
  R.mindmap = (d, st, ctx) => {
    const root = d.root;
    const kids = root.children || [];
    const leaves = n => (n.children && n.children.length) ? n.children.reduce((a, c) => a + leaves(c), 0) : 1;
    // measure real label widths (character-count guesses clipped long labels)
    const mctx = (R._mmc = R._mmc || document.createElement('canvas').getContext('2d'));
    const ff = getComputedStyle(document.body).fontFamily || 'sans-serif';
    const tw = (t, lvl) => { mctx.font = (lvl === 1 ? '800 13px ' : '600 11.5px ') + ff; return Math.ceil(mctx.measureText(t).width) + (lvl === 1 ? 26 : 22); };
    const right = [], left = []; let lr = 0, ll = 0;
    kids.forEach((k, i) => { k._hue = k.hue != null ? k.hue : i; if (lr <= ll) { right.push(k); lr += leaves(k); } else { left.push(k); ll += leaves(k); } });
    // widest node per depth per side
    const colw = { 1: [], '-1': [] };
    const measure = (n, lvl, side) => { const w = tw(n.label, lvl); colw[side][lvl] = Math.max(colw[side][lvl] || 0, w); (n.children || []).forEach(c => measure(c, lvl + 1, side)); };
    right.forEach(k => measure(k, 1, 1)); left.forEach(k => measure(k, 1, -1));
    const GAP = 46, ROWH = 32;
    mctx.font = '800 16px ' + ff; const cw = Math.max(120, Math.ceil(mctx.measureText(root.label).width) + 40);
    const span = side => colw[side].reduce((a, w) => a + (w || 0) + GAP, 0);
    const Lw = span(-1), Rw = span(1);
    const W = Lw + Rw + cw + 40, H = Math.max(lr, ll, 3) * ROWH + 30;
    const cx = Lw + cw / 2 + 20, cy = H / 2;
    const colX = (side, lvl) => { let x = cw / 2 + GAP; for (let i = 1; i < lvl; i++) x += (colw[side][i] || 0) + GAP; return cx + side * x; };
    const links = sv('g'), nodes = sv('g');
    function layout(n, lvl, side, y0, y1, h, px, py, path) {
      const y = (y0 + y1) / 2, w = tw(n.label, lvl);
      const x = colX(side, lvl), rx = side > 0 ? x : x - w;
      const ax = side > 0 ? rx : rx + w;
      const mx = (px + ax) / 2;
      links.append(sv('path', { d: `M${px},${py} C${mx},${py} ${mx},${y} ${ax},${y}`, fill: 'none', stroke: `var(--h${h % 6}i)`, 'stroke-width': lvl === 1 ? 3 : 1.8, opacity: lvl === 1 ? .75 : .5 }));
      const gg = sv('g', { class: 'mmn', onclick: () => ctx.explain ? ctx.explain(n, path) : G.explainNode ? G.explainNode(n, path, d.chapterHref) : ctx.info(n.label, n.tip || '', n.quote) });
      gg.append(sv('rect', { x: rx, y: y - 12.5, width: w, height: 25, rx: 12.5, fill: lvl === 1 ? `var(--h${h % 6})` : 'var(--panel)', stroke: `var(--h${h % 6}i)`, 'stroke-width': lvl === 1 ? 1.6 : 1 }));
      gg.append(sv('text', { x: rx + w / 2, y: y + 4.3, 'text-anchor': 'middle', 'font-size': lvl === 1 ? 13 : 11.5, 'font-weight': lvl === 1 ? 800 : 600, fill: lvl === 1 ? `var(--h${h % 6}i)` : 'var(--ink)' }, n.label));
      if (n.tip) gg.append(sv('circle', { cx: side > 0 ? rx + w - 1 : rx + 1, cy: y - 11, r: 3.5, fill: `var(--h${h % 6}i)` }));
      nodes.append(gg);
      let yy = y0; const ex = side > 0 ? rx + w : rx;
      (n.children || []).forEach(c => { const lv = leaves(c); layout(c, lvl + 1, side, yy, yy + lv * ROWH, h, ex, y, path.concat(n.label)); yy += lv * ROWH; });
    }
    const place = (list, side, total) => { let y = cy - (total * ROWH) / 2; list.forEach(k => { const lv = leaves(k); layout(k, 1, side, y, y + lv * ROWH, k._hue, cx + side * cw / 2, cy, [root.label]); y += lv * ROWH; }); };
    place(right, 1, lr); place(left, -1, ll);
    nodes.append(sv('g', null, sv('rect', { x: cx - cw / 2, y: cy - 22, width: cw, height: 44, rx: 22, fill: 'var(--ink)' }),
      sv('text', { x: cx, y: cy + 6, 'text-anchor': 'middle', fill: 'var(--paper)', 'font-size': 16, 'font-weight': 800, style: 'font-family:var(--head)' }, root.label)));
    const svg = sv('svg', { class: 'mm', viewBox: `0 0 ${W} ${H}`, style: `min-width:${Math.min(W, 1180)}px` }, links, nodes);
    st.append(el('div', { class: 'scrollx' }, svg));
    ctx.info('Mind map', 'The whole chapter on one page. Tap any bubble for a detailed explanation from the book. Swipe sideways on a phone.');
  };

  /* ---------- gallery: illustrated tiles; tap one for its full profile in a pop-up ----------
     d.items: [{ name, code, sub, fig, hue, rows: [[label, value], ...], hook, extra: true (beyond the book) }] */
  R.gallery = (d, st, ctx) => {
    const grid = el('div', { class: 'gal' });
    const open = (it, i) => {
      const body = el('div', { class: 'gal-pop' },
        el('div', { class: 'gal-big' }, G.fig(it.fig)),
        el('dl', { class: 'gal-rows' }, it.rows.map(([k, v]) => [el('dt', null, k), el('dd', null, rich(v))])),
        it.hook ? el('div', { class: 'gal-hook' }, el('small', null, 'Memory hook'), rich(it.hook)) : null,
        it.extra ? el('p', { class: 'hint' }, 'Includes detail from the WMO International Cloud Atlas, beyond the I.C. Joshi text.') : null);
      const prev = el('button', { class: 'pill', onclick: () => { md.close(); open(d.items[i - 1], i - 1); }, disabled: i === 0 ? true : null }, '← Prev');
      const next = el('button', { class: 'pill', onclick: () => { md.close(); open(d.items[i + 1], i + 1); }, disabled: i === d.items.length - 1 ? true : null }, 'Next →');
      const md = G.modal ? G.modal({ title: it.name + (it.code ? ' (' + it.code + ')' : ''), count: (i + 1) + ' of ' + d.items.length, tools: [prev, next], body }) : null;
      if (md) md.dlg.classList.add('gal-modal');
    };
    d.items.forEach((it, i) => grid.append(el('button', { class: 'gal-tile ' + hue(it.hue != null ? it.hue : ctx.hueStart + i), onclick: () => open(it, i) },
      el('div', { class: 'gal-pic' }, G.fig(it.fig)),
      el('div', { class: 'gal-cap' }, el('b', null, it.name, it.code ? el('span', null, ' ' + it.code) : null), it.sub ? el('small', null, it.sub) : null))));
    st.append(grid);
    ctx.info(d.infoTitle || 'Tap any picture', d.infoText || 'Each card opens a full profile with every detail. Use Prev / Next to flip through.');
  };

  /* ---------- flow (yes/no decision chart) ---------- */
  R.flow = (d, st, ctx) => {
    const box = el('div', { class: 'flow' });
    const restart = el('button', { class: 'btn', onclick: () => start() }, icon('refresh'), 'Start again');
    function start() { box.replaceChildren(); ask(d.start, 1); ctx.info('Start at the top', 'Answer each question. The path you take lights up.'); }
    function ask(id, k) {
      const n = d.nodes[id];
      if (!n) return;
      if (n.end || n.type === 'end') {
        box.append(el('div', { class: 'fend ' + (n.hue != null ? hue(n.hue) : 'h1') }, el('b', null, n.text), n.body ? rich(n.body) : null));
        ctx.info(n.text, n.body || '', n.quote); return;
      }
      const yn = el('div', { class: 'yn' });
      const q = el('div', { class: 'fq' }, el('span', { class: 'qm' }, '?'), rich(n.text), yn);
      const opts = n.options || [{ label: 'Yes', to: n.yes }, { label: 'No', to: n.no }];
      opts.forEach(o => yn.append(el('button', { onclick: e => {
        // drop anything after this question
        while (q.parentNode.nextSibling) q.parentNode.nextSibling.remove();
        yn.querySelectorAll('button').forEach(b => b.classList.remove('pick')); e.currentTarget.classList.add('pick');
        box.append(el('div', { class: 'fdown' }, el('span', null, o.label)));
        ask(o.to, k + 1);
        if (n.tip) ctx.info(n.text, n.tip);
      } }, o.label)));
      box.append(el('div', { class: 'fstep' }, q));
    }
    st.append(el('div', { class: 'row', style: { marginBottom: '16px' } }, restart, el('span', { class: 'hint' }, d.note || 'Follow the questions down.')), box);
    start();
  };

  /* ---------- sequence (route with a plane) ---------- */
  R.sequence = (d, st, ctx) => {
    const line = el('div', { class: 'seqline' });
    const plane = el('div', { class: 'seqplane' }, icon('plane'));
    plane.firstChild.style.transform = 'rotate(90deg)';
    const stops = d.steps.map((s, i) => {
      const b = el('button', { class: 'sstop', 'data-n': i + 1, onclick: () => pick(i) }, el('b', null, s.label), s.sub ? el('small', null, s.sub) : null);
      line.append(b); return b;
    });
    function pick(i) {
      stops.forEach((b, j) => b.classList.toggle('on', j === i));
      const b = stops[i]; plane.style.left = (b.offsetLeft + 6) + 'px';
      const s = d.steps[i]; ctx.info((i + 1) + '. ' + s.label, s.tip || s.sub || '', s.quote);
    }
    const wrap = el('div', { class: 'seq scrollx' }, el('div', { style: { position: 'relative', minWidth: (d.steps.length * 162) + 'px' } }, plane, line));
    const nav = el('div', { class: 'row', style: { marginTop: '14px' } },
      el('button', { class: 'btn', onclick: () => { let i = stops.findIndex(b => b.classList.contains('on')); pick(Math.min(stops.length - 1, i + 1)); } }, icon('play'), 'Next stop'),
      el('span', { class: 'hint' }, 'Or tap any stop.'));
    st.append(wrap, nav);
    requestAnimationFrame(() => pick(0));
  };

  /* ---------- layers (altitude stack) ---------- */
  R.layers = (d, st, ctx) => {
    const stack = el('div', { class: 'lstack' });
    const det = el('div', { class: 'ldetail' });
    if (d.ground) stack.append(el('div', { class: 'lground' }, d.ground));
    const bands = d.bands.map((b, i) => {
      const btn = el('button', { class: 'lband ' + (b.hue != null ? hue(b.hue) : hue(ctx.hueStart + i)), style: { height: (b.h || 56) + 'px' }, onclick: () => pick(i) },
        b.icon ? icon(b.icon) : null, el('div', null, el('b', null, b.label), b.sub ? el('small', null, ' · ' + b.sub) : null), b.alt ? el('span', { class: 'alt' }, b.alt) : null);
      stack.append(btn); return btn;
    });
    function pick(i) {
      bands.forEach((b, j) => b.classList.toggle('on', j === i));
      const b = d.bands[i];
      det.replaceChildren(el('div', { class: 'chips' }, el('span', { class: 'chip ' + hue(b.hue != null ? b.hue : ctx.hueStart + i) }, b.alt || 'Layer ' + (i + 1))),
        el('h4', null, b.label), b.tip ? el('p', { style: { margin: 0 } }, rich(b.tip)) : null,
        b.points ? el('ul', null, b.points.map(p => el('li', null, rich(p)))) : null);
    }
    st.append(el('div', { class: 'layers' }, stack, det));
    pick(d.start || 0);
  };

  /* ---------- matrix ---------- */
  R.matrix = (d, st, ctx) => {
    const t = el('table', { class: 'matrix' });
    t.append(el('thead', null, el('tr', null, el('th', null, d.corner || ''), d.cols.map(c => el('th', null, c)))));
    const tb = el('tbody');
    d.rows.forEach(r => {
      const tr = el('tr', null, el('th', null, rich(r.label)));
      r.cells.forEach((c, j) => {
        const o = typeof c === 'object' && c ? c : { v: c };
        tr.append(el('td', { class: (o.key ? 'key ' : '') + (o.tip ? 'tip' : ''), onclick: o.tip ? () => ctx.info(r.label + ' · ' + d.cols[j], o.tip) : null }, rich(o.v)));
      });
      tb.append(tr);
    });
    t.append(tb);
    st.append(el('div', { class: 'scrollx' }, t));
    if (d.rows.some(r => r.cells.some(c => c && c.tip))) ctx.info('Tap underlined cells', 'They open a one-line explanation.');
    else if (d.note) ctx.info('Read it like this', d.note);
  };

  /* ---------- decoder (code chips) ---------- */
  R.decoder = (d, st, ctx) => {
    const code = el('div', { class: 'dcode' });
    const list = el('div', { class: 'dlist' });
    const items = d.parts.map((p, i) => {
      const chip = el('button', { class: 'dchip' + (p.star ? ' star' : ''), onclick: () => pick(i) }, p.text);
      code.append(chip);
      const li = el('div', null, el('code', null, p.text), ' — ', el('b', null, p.label));
      list.append(li);
      return [chip, li];
    });
    function pick(i) { items.forEach(([c, l], j) => { c.classList.toggle('on', i === j); l.classList.toggle('on', i === j); }); const p = d.parts[i]; ctx.info(p.text + ' = ' + p.label, p.tip || ''); }
    st.append(d.title ? el('div', { class: 'kicker', style: { margin: '0 0 8px' } }, d.title) : null, code, el('details', { class: 'fold', style: { marginTop: '12px' } }, el('summary', null, 'Show every group decoded'), el('div', null, list)));
    ctx.info('Tap a group', 'Each chip is one group of the message. Tap it to decode.');
  };

  /* ---------- timeline / axis ---------- */
  R.timeline = (d, st, ctx) => {
    const min = d.min || 0, max = d.max;
    const pct = v => ((v - min) / (max - min)) * 100;
    const tl = el('div', { class: 'tl', style: { '--tlh': (d.height || 200) + 'px' } }, el('div', { class: 'axis' }));
    (d.ticks || []).forEach(t => tl.append(el('div', { class: 'tick', style: { left: pct(t) + '%' } }, t + (d.unit ? '' : ''))));
    /* shaded ranges under the axis (only70 timeline bands): {from, to, label, tip, h} */
    (d.bands || []).forEach((b, i) => tl.append(el('button', { type: 'button', class: 'tlband ' + hue(b.h != null ? b.h : b.hue != null ? b.hue : ctx.hueStart + i), style: { left: pct(b.from) + '%', width: (pct(b.to) - pct(b.from)) + '%' }, onclick: () => ctx.info(b.label, b.tip || '', b.quote) }, el('span', null, b.label))));
    const marks = d.marks.map((m, i) => {
      const mk = el('div', { class: 'mark ' + hue(m.hue != null ? m.hue : ctx.hueStart + i) + (pct(m.at) < 9 ? ' edge-l' : pct(m.at) > 91 ? ' edge-r' : ''), style: { left: pct(m.at) + '%' }, onclick: () => pick(i) },
        el('div', { class: 'lbl' }, m.label, el('small', null, m.atLabel || (m.at + (d.unit ? ' ' + d.unit : '')))), el('div', { class: 'stem', style: { height: (m.h || (20 + (i % 3) * 38)) + 'px' } }));
      tl.append(mk); return mk;
    });
    function pick(i) { marks.forEach((m, j) => m.classList.toggle('on', i === j)); const m = d.marks[i]; ctx.info(m.label + ' — ' + (m.atLabel || m.at + ' ' + (d.unit || '')), m.tip || '', m.quote); }
    st.append(el('div', { class: 'scrollx' }, tl), d.axisLabel ? el('div', { class: 'hint', style: { textAlign: 'center' } }, d.axisLabel) : null);
    ctx.info('Tap a marker', 'Each one sits at its real value on the axis.');
  };
  R.scale = (d, st, ctx) => {
    const max = d.max || Math.max(...d.bars.map(b => b.v));
    const box = el('div', { class: 'scale' });
    d.bars.forEach((b, i) => box.append(el('div', { class: 'bar ' + hue(b.hue != null ? b.hue : ctx.hueStart + i), onclick: () => ctx.info(b.label, b.tip || '') },
      el('b', null, b.label), el('div', null, el('div', { class: 'fill', style: { width: Math.max(2, (b.v / max) * 100) + '%' } })), el('span', null, b.show || b.v))));
    st.append(box);
    if (d.note) ctx.info('How to read it', d.note);
  };

  /* ---------- numbers to know ---------- */
  R.numbers = (d, st, ctx) => {
    const g = el('div', { class: 'nums' });
    d.items.forEach((n, i) => {
      const b = el('button', { class: 'numc ' + hue(n.hue != null ? n.hue : ctx.hueStart + i), onclick: () => { g.querySelectorAll('.on').forEach(x => x.classList.remove('on')); b.classList.add('on'); ctx.info(n.v + ' — ' + n.k, n.tip || n.note || '', n.quote); } },
        el('span', { class: 'v' }, n.v), el('span', { class: 'k' }, n.k), n.note ? el('span', { class: 'note' }, n.note) : null);
      g.append(b);
    });
    st.append(g);
    ctx.info('Cover and recall', 'Say the number before you look. Tap a card for context.');
  };

  /* ---------- pairs (don't mix up) ---------- */
  R.pairs = (d, st, ctx) => {
    d.pairs.forEach((p, i) => {
      st.append(el('div', { class: 'pair' },
        el('div', { class: 'two' },
          el('div', { class: hue(ctx.hueStart + i * 2), style: { background: 'var(--h)' } }, el('b', null, p.a.label), rich(p.a.body)),
          el('span', { class: 'vs' }, 'VS'),
          el('div', { class: hue(ctx.hueStart + i * 2 + 1), style: { background: 'var(--h)' } }, el('b', null, p.b.label), rich(p.b.body))),
        el('div', { class: 'rule' }, el('b', null, 'Tell apart:'), rich(p.rule))));
    });
  };

  /* ---------- tricks (flip cards) ---------- */
  R.tricks = (d, st, ctx) => {
    let order = d.cards.map((_, i) => i), i = 0; const shown = new Set();
    const card = el('div', { class: 'tcard' });
    const cnt = el('span', { class: 'mono hint' });
    function draw() {
      const c = d.cards[order[i]]; const open = shown.has(order[i]);
      card.className = 'tcard ' + hue(ctx.hueStart + order[i]);
      card.replaceChildren(el('div', { class: 'vis' }, visual(c.visual) || el('span', null, c.emoji || '✳︎')),
        el('div', { class: 'lab' }, d.cue || 'Memory trick'), el('div', { class: 'tr' }, rich('“' + c.trick + '”')),
        open ? el('div', { class: 'name' }, c.name) : el('div', null, el('button', { class: 'btn dark', onclick: () => { shown.add(order[i]); draw(); } }, 'Reveal')),
        open && c.tip ? el('div', { class: 'tip' }, rich(c.tip)) : null);
      cnt.textContent = shown.size + ' of ' + d.cards.length + ' revealed';
    }
    const grid = el('div', { class: 'tgrid' }, d.cards.map(c => el('div', null, el('b', null, c.name), rich(c.trick))));
    const all = el('details', { class: 'fold', style: { marginTop: '14px' } }, el('summary', null, 'All ' + d.cards.length + ' at a glance'), el('div', null, grid));
    st.append(el('div', { class: 'trick' }, card),
      el('div', { class: 'row', style: { marginTop: '14px' } },
        el('button', { class: 'btn ghost', onclick: () => { i = (i - 1 + order.length) % order.length; draw(); } }, icon('left'), 'Back'),
        el('span', { class: 'spacer' }), cnt, el('span', { class: 'spacer' }),
        el('button', { class: 'btn dark', onclick: () => { i = (i + 1) % order.length; draw(); } }, 'Next', icon('right'))),
      el('div', { class: 'row', style: { marginTop: '10px' } }, el('button', { class: 'btn ghost', onclick: () => { order.sort(() => Math.random() - .5); i = 0; draw(); } }, icon('shuffle'), 'Shuffle')), all);
    draw();
    ctx.info('Guess first', 'Read the trick, say the answer aloud, then tap Reveal.');
  };

  /* ---------- classify (sort into buckets) ---------- */
  R.classify = (d, st, ctx) => {
    let sel = null, done = 0;
    const pool = el('div', { class: 'pool' });
    const bks = el('div', { class: 'bks' });
    const items = d.items.map((it, i) => ({ ...it, i })).sort(() => Math.random() - .5);
    const map = {};
    d.buckets.forEach((b, i) => {
      const box = el('div', { class: 'bk ' + hue(b.hue != null ? b.hue : ctx.hueStart + i), onclick: () => drop(b.id) }, el('h5', null, b.label));
      map[b.id] = box; bks.append(box);
    });
    items.forEach(it => {
      const b = el('button', { class: 'item', onclick: () => { pool.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = { it, b }; Object.values(map).forEach(m => m.classList.add('ready')); } }, it.text);
      pool.append(b);
    });
    function drop(id) {
      if (!sel) return;
      const ok = sel.it.bucket === id;
      if (ok) { sel.b.remove(); map[id].append(el('span', { class: 'placed' }, '✓ ' + sel.it.text)); done++; ctx.info('Right: ' + sel.it.text, sel.it.why || ''); }
      else { const x = el('span', { class: 'placed bad' }, '✗ ' + sel.it.text); map[id].append(x); setTimeout(() => x.remove(), 900); ctx.info('Not that one', 'Try another box. ' + (d.hint || '')); }
      if (ok) { sel = null; Object.values(map).forEach(m => m.classList.remove('ready')); }
      if (done === items.length) ctx.info('All sorted!', d.takeaway || 'Every item is in its right box.');
    }
    st.append(el('div', { class: 'cls' }, el('div', { class: 'hint', style: { marginBottom: '8px' } }, 'Tap an item, then tap the box it belongs in.'), pool, bks),
      el('div', { class: 'row', style: { marginTop: '14px' } }, el('button', { class: 'btn ghost', onclick: () => { st.replaceChildren(); R.classify(d, st, ctx); } }, icon('refresh'), 'Reset')));
  };

  /* ---------- stamp (case game) ---------- */
  R.stamp = (d, st, ctx) => {
    let i = 0, score = 0;
    const dash = el('div', { class: 'progressdash' }, d.cases.map(() => el('i')));
    const caseBox = el('div', { class: 'stampcase' });
    const stamps = el('div', { class: 'stamps' });
    const btns = d.stamps.map(s => { const b = el('button', { class: 'stampb', onclick: () => press(s, b) }, s.label, s.sub ? el('small', null, s.sub) : null); stamps.append(b); return b; });
    function show() {
      btns.forEach(b => b.classList.remove('good', 'bad'));
      if (i >= d.cases.length) { caseBox.replaceChildren(el('span', { class: 'cn' }, 'Done'), el('div', null, 'You stamped ' + score + ' of ' + d.cases.length + ' right first time.'), el('div', { style: { marginTop: '10px' } }, el('button', { class: 'btn', onclick: () => { i = 0; score = 0; dash.querySelectorAll('i').forEach(x => x.className = ''); show(); } }, icon('refresh'), 'Play again'))); return; }
      caseBox.replaceChildren(el('span', { class: 'cn' }, 'Case ' + (i + 1)), el('div', null, rich(d.cases[i].text)));
      ctx.info('Case ' + (i + 1), d.prompt || d.ask2 || 'Which one applies? Press a stamp.');
    }
    let first = true;
    function press(s, b) {
      const c = d.cases[i]; if (!c) return;
      if (s.id === c.answer) {
        b.classList.add('good'); dash.children[i].className = first ? 'ok' : 'done'; if (first) score++;
        ctx.info('✓ ' + s.label, c.why || s.what || ''); first = true;
        setTimeout(() => { i++; show(); }, 1100);
      } else { b.classList.add('bad'); first = false; ctx.info('Not ' + s.label, c.hint || 'Look at the key word in the case.'); }
    }
    st.append(dash, caseBox, el('div', { class: 'kicker', style: { margin: '16px 0 0' } }, d.trayLabel || 'Press a stamp'), stamps);
    show();
  };

  /* ---------- svg figure with optional hotspots ---------- */
  R.svg = (d, st, ctx) => {
    const fig = d.fig ? G.fig(d.fig, d) : visual(d.svg, d);
    const box = el('div', { style: { position: 'relative' } }, fig);
    if (fig && fig.classList) fig.classList.add('fig');
    (d.spots || []).forEach((s, i) => {
      box.append(el('button', { class: 'btn', style: { position: 'absolute', left: s.x + '%', top: s.y + '%', transform: 'translate(-50%,-50%)', padding: '2px 9px', fontSize: '12px' }, onclick: () => ctx.info(s.label, s.tip || '') }, String(i + 1)));
    });
    st.append(el('div', { class: 'scrollx' }, box));
    if (d.caption) st.append(el('p', { class: 'figcap' }, rich(d.caption)));
    if (d.spots) ctx.info('Tap the numbers', 'Each pin explains one part of the drawing.');
    else if (d.note) ctx.info('Read the drawing', d.note);
  };
  R.fig = R.svg;

  /* ---------- explore (tabs of sub-lessons) ---------- */
  R.explore = (d, st, ctx) => {
    const tabs = el('div', { class: 'tabs' });
    const body = el('div');
    const btns = d.tabs.map((t, i) => { const b = el('button', { onclick: () => pick(i) }, t.label); tabs.append(b); return b; });
    function pick(i) {
      btns.forEach((b, j) => b.classList.toggle('on', i === j));
      body.replaceChildren();
      const t = d.tabs[i];
      if (t.intro) body.append(el('p', { class: 'lead', style: { marginTop: 0, marginBottom: '14px' } }, rich(t.intro)));
      const inner = el('div'); body.append(inner);
      try { R[t.type](t, inner, ctx); } catch (e) { console.error(e); inner.append(el('p', { class: 'hint' }, 'This part could not be drawn.')); }
    }
    st.append(tabs, body); pick(0);
  };

  /* ---------- cycle / stages ---------- */
  R.cycle = (d, st, ctx) => {
    const g = el('div', { class: 'cycle' });
    d.stages.forEach((s, i) => g.append(el('div', { class: 'cyc ' + hue(s.hue != null ? s.hue : ctx.hueStart + i) },
      s.visual ? el('div', { class: 'vis' }, visual(s.visual)) : null,
      el('div', { class: 'cyn' }, (d.numbered === false ? '' : 'STAGE ' + (i + 1)) + (s.time ? ' · ' + s.time : '')),
      el('h5', null, s.label), s.sub ? el('div', { class: 'hint', style: { marginBottom: '6px' } }, rich(s.sub)) : null,
      s.points ? el('ul', null, s.points.map(p => el('li', null, rich(p)))) : null)));
    st.append(g);
    if (d.note) ctx.info('Remember', d.note);
  };

  /* ---------- bullets (grouped key points) ---------- */
  R.bullets = (d, st, ctx) => {
    const g = el('div', { class: 'bul' });
    d.groups.forEach((b, i) => g.append(el('div', { class: 'b ' + hue(b.hue != null ? b.hue : ctx.hueStart + i) },
      el('h5', null, b.icon ? icon(b.icon) : null, b.title),
      b.text ? el('p', null, rich(b.text)) : null,
      b.points ? el('ul', null, b.points.map(p => el('li', null, rich(p)))) : null)));
    st.append(g);
    if (d.note) ctx.info('Exam note', d.note);
  };

  /* ---------- formulas with live calculators ---------- */
  R.formulas = (d, st, ctx) => {
    const g = el('div', { class: 'fgrid' });
    d.items.forEach((f, i) => {
      const card = el('div', { class: 'fcard ' + hue(f.hue != null ? f.hue : ctx.hueStart + i) }, el('h5', null, f.name), el('div', { class: 'eq', html: f.eq }),
        f.note ? el('p', null, rich(f.note)) : null, f.ex ? el('div', { class: 'ex' }, el('b', null, 'Example: '), rich(f.ex)) : null);
      if (f.calc) card.append(calcBox(f.calc));
      g.append(card);
    });
    st.append(g);
    ctx.info('Try the numbers', 'Cards with boxes are live: change any value and the answer updates.');
  };
  function calcBox(c) {
    const box = el('div', { class: 'calc' });
    const inputs = {};
    c.inputs.forEach(inp => {
      const i = el('input', { type: 'number', step: 'any', value: inp.v, oninput: run });
      inputs[inp.k] = i; box.append(el('label', null, inp.label, i));
    });
    const out = el('div', { class: 'out' }); box.append(out);
    const fn = new Function(...c.inputs.map(x => x.k), 'return (' + c.f + ');');
    function run() {
      try {
        const vals = c.inputs.map(x => parseFloat(inputs[x.k].value));
        let r = fn(...vals);
        out.textContent = (c.out || '= ') + (typeof r === 'number' ? (Math.round(r * 100) / 100) : r) + (c.unit ? ' ' + c.unit : '');
      } catch (e) { out.textContent = '—'; }
    }
    run(); return box;
  }
  G.calcBox = calcBox;

  /* ---------- simple x/y chart ---------- */
  R.chart = (d, st, ctx) => {
    const W = 640, H = d.height || 340, m = { l: 58, r: 24, t: 20, b: 46 };
    const xs = d.series.flatMap(s => s.pts.map(p => p[0])), ys = d.series.flatMap(s => s.pts.map(p => p[1]));
    const x0 = d.xmin ?? Math.min(...xs), x1 = d.xmax ?? Math.max(...xs), y0 = d.ymin ?? Math.min(...ys), y1 = d.ymax ?? Math.max(...ys);
    const X = v => m.l + ((v - x0) / (x1 - x0)) * (W - m.l - m.r), Y = v => H - m.b - ((v - y0) / (y1 - y0)) * (H - m.t - m.b);
    const svg = sv('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig' });
    (d.xticks || []).forEach(t => { svg.append(sv('line', { x1: X(t), x2: X(t), y1: m.t, y2: H - m.b, stroke: 'var(--line)' }), sv('text', { x: X(t), y: H - m.b + 18, 'text-anchor': 'middle', class: 'sm' }, t)); });
    (d.yticks || []).forEach(t => { svg.append(sv('line', { x1: m.l, x2: W - m.r, y1: Y(t), y2: Y(t), stroke: 'var(--line)' }), sv('text', { x: m.l - 8, y: Y(t) + 4, 'text-anchor': 'end', class: 'sm' }, t)); });
    svg.append(sv('line', { x1: m.l, x2: m.l, y1: m.t, y2: H - m.b, class: 'ln' }), sv('line', { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b, class: 'ln' }));
    if (d.xlab) svg.append(sv('text', { x: (m.l + W - m.r) / 2, y: H - 8, 'text-anchor': 'middle', class: 'lbl' }, d.xlab));
    if (d.ylab) svg.append(sv('text', { x: 14, y: (m.t + H - m.b) / 2, 'text-anchor': 'middle', class: 'lbl', transform: `rotate(-90 14 ${(m.t + H - m.b) / 2})` }, d.ylab));
    (d.bands || []).forEach(b => svg.append(sv('rect', { x: m.l, width: W - m.l - m.r, y: Y(b.to), height: Y(b.from) - Y(b.to), fill: `var(--h${b.hue || 0})`, opacity: .55 }), sv('text', { x: W - m.r - 6, y: Y(b.to) + 15, 'text-anchor': 'end', class: 'sm' }, b.label)));
    d.series.forEach((s, i) => {
      const col = s.color || `var(--h${(s.hue ?? i) % 6}i)`;
      svg.append(sv('path', { d: s.pts.map((p, j) => (j ? 'L' : 'M') + X(p[0]) + ',' + Y(p[1])).join(' '), fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-dasharray': s.dash ? '7 6' : null, class: s.dash ? null : 'anim-draw', pathLength: s.dash ? null : 1000 }));
      const lp = s.pts[s.labelAt ?? s.pts.length - 1];
      const nearR = X(lp[0]) > W - 120, ly = Y(lp[1]) - 8 < 16 ? Y(lp[1]) + 18 : Y(lp[1]) - 8; svg.append(sv('text', { x: X(lp[0]) + (nearR ? -6 : 6), y: ly, 'text-anchor': nearR ? 'end' : 'start', class: 'lbl', style: `fill:${col}` }, s.label));
      (s.dots || []).forEach(p => svg.append(sv('circle', { cx: X(p[0]), cy: Y(p[1]), r: 4.5, fill: col }), p[2] ? sv('text', { x: X(p[0]) + 8, y: Y(p[1]) + 4, class: 'sm' }, p[2]) : null));
    });
    st.append(el('div', { class: 'scrollx' }, el('div', { style: { minWidth: '520px' } }, svg)));
    if (d.caption) st.append(el('p', { class: 'figcap' }, rich(d.caption)));
    if (d.note) ctx.info('Read the graph', d.note);
  };

  /* ---------- short quiz (concept checks) ---------- */
  R.quiz = (d, st, ctx) => {
    const qs = d.questions.map((q, i) => ({ n: i + 1, q: q.q, o: q.options, a: q.answer, ex: q.why }));
    G.qengine(st, { qs, bank: null, mode: 'practice', compact: true, title: d.title });
  };

  /* ---------- full question bank for this chapter ---------- */
  R.qbank = (d, st, ctx) => {
    const ids = [].concat(d.bank);
    const banks = ids.map(id => (window.QB || {})[id]).filter(Boolean);
    if (!banks.length) { st.append(el('p', { class: 'hint' }, 'Question bank not loaded.')); return; }
    const qs = banks.flatMap(b => b.qs.map(q => Object.assign({ bank: b.id, src: b.src }, q)));
    G.qengine(st, { qs, bank: ids.join('+'), mode: 'practice', title: d.title, showFilters: true });
  };

  /* =========================================================
     Question engine: practice (instant feedback) or exam (timed, scored at the end)
     q: {n, q, o[], a (index), ex, bank, src}
     ========================================================= */
  G.qid = q => (q.bank || 'quiz') + '#' + q.n;
  G.qengine = function (st, cfg) {
    const s = S.state;
    let mode = cfg.mode || 'practice';
    let filter = 'all';
    let list = cfg.qs.slice();
    let i = 0;
    let picks = {}; // exam answers: index -> option
    let flags = new Set();
    let timer = null, endAt = 0, finished = false;
    const top = el('div', { class: 'qb-top' });
    const body = el('div', { class: 'qcard' });
    const gridBox = el('div');
    st.append(top, body, gridBox);

    function counts() {
      let a = 0, w = 0, c = 0;
      cfg.qs.forEach(q => { const r = s.qa[G.qid(q)]; if (r) { a++; if (r.ok) c++; else w++; } });
      return { a, w, c, t: cfg.qs.length };
    }
    function buildTop() {
      top.replaceChildren();
      if (cfg.compact) return;
      const ct = counts();
      if (cfg.showFilters) {
        const seg = el('div', { class: 'seg' });
        [['all', 'All ' + ct.t], ['new', 'Not tried ' + (ct.t - ct.a)], ['wrong', 'Got wrong ' + ct.w], ['marked', 'Bookmarked'], ['shuffle', 'Shuffle']].forEach(([k, lab]) => {
          seg.append(el('button', { class: filter === k ? 'on' : '', onclick: () => { filter = k; applyFilter(); } }, lab));
        });
        top.append(seg);
      }
      if (cfg.exam) top.append(el('span', { class: 'timer', id: 'qtimer' }, '--:--'));
      top.append(el('span', { class: 'spacer' }), el('span', { class: 'hint' }, ct.c + ' right · ' + ct.w + ' wrong of ' + ct.t));
    }
    function applyFilter() {
      list = cfg.qs.filter(q => {
        const r = s.qa[G.qid(q)];
        if (filter === 'new') return !r; if (filter === 'wrong') return r && !r.ok; if (filter === 'marked') return !!s.marks[G.qid(q)];
        return true;
      });
      if (filter === 'shuffle') list.sort(() => Math.random() - .5);
      // resume at first unanswered in "all"
      i = 0;
      if (filter === 'all' && cfg.bank && s.pos[cfg.bank] != null) i = Math.min(list.length - 1, s.pos[cfg.bank]);
      buildTop(); draw();
    }
    function draw() {
      body.replaceChildren();
      if (!list.length) { body.append(el('p', { class: 'hint' }, filter === 'wrong' ? 'Nothing here: no wrong answers yet.' : filter === 'marked' ? 'No bookmarked questions yet. Use ☆ on any question.' : 'No questions.')); gridBox.replaceChildren(); return; }
      if (finished) return result();
      const q = list[i]; const id = G.qid(q);
      if (cfg.bank && filter === 'all') { s.pos[cfg.bank] = i; S.save(); }
      const rec = s.qa[id];
      const marked = !!s.marks[id];
      const star = el('button', { class: 'pill flagbtn' + (marked ? ' on' : ''), onclick: () => { S.mark(id, !s.marks[id]); star.classList.toggle('on'); star.lastChild.textContent = s.marks[id] ? 'Bookmarked' : 'Bookmark'; } }, icon('bookmark'), el('span', null, marked ? 'Bookmarked' : 'Bookmark'));
      body.append(el('div', { class: 'qmeta' }, el('b', null, 'Question ' + (i + 1) + ' of ' + list.length),
        q.src ? el('span', { class: 'qsrc' }, q.src + ' · Q' + q.n) : null,
        rec && mode !== 'exam' ? el('span', { class: 'badge ' + (rec.ok ? '' : 'dgca') }, rec.ok ? 'last time ✓' : 'last time ✗') : null,
        el('span', { class: 'spacer' }), cfg.compact ? null : star));
      if (q.ctx) body.append(el('div', { class: 'why', style: { marginTop: 0, marginBottom: '10px' } }, rich(q.ctx)));
      body.append(el('div', { class: 'qtext' }, rich(q.q)));
      if (q.fig) body.append(el('div', { style: { margin: '0 0 12px' } }, G.visual(q.fig)));
      const opts = el('div', { class: 'opts' });
      const answered = mode === 'exam' ? null : (q._picked != null ? q._picked : null);
      q.o.forEach((o, j) => {
        const b = el('button', { class: 'opt', onclick: () => pick(j) }, el('span', { class: 'L' }, L[j]), el('span', null, rich(o)));
        if (mode === 'exam' && picks[i] === j) b.classList.add('picked');
        if (answered != null) { b.disabled = true; if (j === q.a) b.classList.add('ok'); else if (j === answered) b.classList.add('bad'); }
        opts.append(b);
      });
      if (mode !== 'exam' && answered == null && (cfg.bank !== null || q.bank)) {
        const g = el('button', { class: 'guessbtn' + (q._guess ? ' on' : ''), type: 'button', onclick: () => { q._guess = !q._guess; g.classList.toggle('on', q._guess); } }, q._guess ? '🤔 Guessing' : '🤔 I\'m guessing');
        g.addEventListener('click', () => { g.textContent = q._guess ? '🤔 Guessing' : '🤔 I\'m guessing'; });
        body.append(el('div', { class: 'guessrow' }, el('small', null, 'Not sure? Tap before answering so a lucky guess still comes back for review.'), g));
      }
      body.append(opts);
      if (answered != null) {
        const ok = answered === q.a;
        body.append(el('div', { class: 'why' }, el('b', null, ok ? (q._guess ? '✓ Correct, but a guess: it will come back soon' : '✓ Correct') : '✗ The answer is ' + L[q.a] + ': ' + stripMd(q.o[q.a])), q.ex ? rich(q.ex) : null));
      }
      const nav = el('div', { class: 'qnav' },
        el('button', { class: 'btn ghost', disabled: i === 0, onclick: () => { i--; draw(); } }, icon('left'), 'Previous'),
        el('button', { class: 'btn dark', disabled: i === list.length - 1 && mode !== 'exam', onclick: () => { if (i < list.length - 1) { i++; draw(); } else if (mode === 'exam') finish(); } }, i === list.length - 1 && mode === 'exam' ? 'Finish' : 'Next', icon('right')),
        mode === 'exam' ? el('button', { class: 'btn ghost', onclick: () => { flags.has(i) ? flags.delete(i) : flags.add(i); drawGrid(); } }, icon('flag'), 'Flag') : null,
        el('span', { class: 'spacer' }),
        mode === 'exam' ? el('button', { class: 'btn', onclick: finish }, icon('check'), 'Submit test') : null);
      body.append(nav);
      drawGrid();
      if (cfg.onDraw) cfg.onDraw(q);
    }
    function stripMd(t) { return String(t).replace(/\*\*|==|`/g, ''); }
    function pick(j) {
      const q = list[i];
      if (mode === 'exam') { picks[i] = j; draw(); return; }
      if (q._picked != null) return;
      q._picked = j;
      const ok = j === q.a;
      if (cfg.bank !== null || q.bank) S.answer(G.qid(q), j, ok, !!q._guess);
      draw(); buildTop();
    }
    function drawGrid() {
      if (cfg.compact && list.length > 12) { gridBox.replaceChildren(); return; }
      const g = el('div', { class: 'qgrid' });
      list.forEach((q, j) => {
        let c = '';
        if (mode === 'exam') c = picks[j] != null ? 'ans' : '';
        else if (q._picked != null) c = q._picked === q.a ? 'ok' : 'bad';
        else { const r = s.qa[G.qid(q)]; if (r && !cfg.compact) c = r.ok ? 'ok' : 'bad'; }
        g.append(el('button', { class: c + (j === i ? ' cur' : '') + (flags.has(j) ? ' flag' : ''), onclick: () => { i = j; draw(); }, title: 'Q' + (j + 1) }, j + 1));
      });
      gridBox.replaceChildren(list.length > 1 ? el('details', { class: 'fold', open: cfg.exam || list.length <= 60 }, el('summary', null, 'Question map'), el('div', null, g)) : null);
    }
    function finish() {
      if (mode !== 'exam' || finished) return;
      const left = list.length - Object.keys(picks).length;
      if (left && !confirm(left + ' question(s) unanswered. Submit anyway?')) return;
      finished = true; clearInterval(timer);
      list.forEach((q, j) => { if (picks[j] != null) S.answer(G.qid(q), picks[j], picks[j] === q.a); });
      result();
    }
    function result() {
      const right = list.filter((q, j) => picks[j] === q.a).length;
      const pc = Math.round((right / list.length) * 100);
      const pass = pc >= (cfg.pass || 70);
      if (cfg.onFinish) cfg.onFinish({ right, total: list.length, pc, pass });
      body.replaceChildren(
        el('h3', { style: { fontSize: '28px' } }, pass ? '✓ Pass' : '✗ Not yet', ' — ', pc + '%'),
        el('div', { class: 'score' },
          el('div', { class: 'h1' }, el('b', null, right), 'right'),
          el('div', { class: 'h5' }, el('b', null, list.length - right - list.filter((q, j) => picks[j] == null).length), 'wrong'),
          el('div', { class: 'h4' }, el('b', null, list.filter((q, j) => picks[j] == null).length), 'blank'),
          el('div', { class: 'h0' }, el('b', null, (cfg.pass || 70) + '%'), 'needed to pass')),
        el('p', { class: 'hint' }, 'DGCA has no negative marking: never leave a blank. Review every question below.'),
        el('div', null, list.map((q, j) => {
          const p = picks[j]; const ok = p === q.a;
          return el('details', { class: 'fold' }, el('summary', null, el('span', { class: 'badge ' + (ok ? '' : 'dgca') }, ok ? '✓' : p == null ? '–' : '✗'), ' Q' + (j + 1) + '. ' + stripMd(q.q).slice(0, 90)),
            el('div', null, el('p', null, rich(q.q)), el('ol', { type: 'A' }, q.o.map((o, k) => el('li', { style: { fontWeight: k === q.a ? 800 : 400, color: k === p && !ok ? 'var(--warn)' : null } }, rich(o), k === q.a ? ' ✓' : ''))),
              q.ex ? el('div', { class: 'why' }, rich(q.ex)) : null, q.src ? el('div', { class: 'qsrc' }, q.src + ' · Q' + q.n) : null));
        })));
      gridBox.replaceChildren();
    }
    if (cfg.exam) {
      mode = 'exam';
      endAt = Date.now() + cfg.minutes * 60e3;
      timer = setInterval(() => {
        const left = Math.max(0, endAt - Date.now()); const t = document.getElementById('qtimer');
        if (t) { t.textContent = String(Math.floor(left / 60e3)).padStart(2, '0') + ':' + String(Math.floor(left / 1e3) % 60).padStart(2, '0'); t.classList.toggle('low', left < 5 * 60e3); }
        if (!left) { finished = true; clearInterval(timer); list.forEach((q, j) => { if (picks[j] != null) S.answer(G.qid(q), picks[j], picks[j] === q.a); }); result(); }
      }, 500);
    }
    if (cfg.showFilters) applyFilter(); else { buildTop(); draw(); }
  };
  /* ---------- interactive simulations (registered in G.SIMS by assets/figs-sims.js) ---------- */
  R.sim = (d, st, ctx) => {
    const f = G.SIMS && G.SIMS[d.sim];
    if (!f) { st.append(el('p', { class: 'hint' }, '[simulation: ' + d.sim + ']')); return; }
    f(st, ctx, d);
  };
})();
