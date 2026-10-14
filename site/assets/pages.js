/* Glidepath pages: home, chapter, practice, revise (flight bag), history, guide. Boot picks one by window.PAGE / CHAPTER. */
(function () {
  'use strict';
  const { el, rich, icon, S, toast, url, topbar, footer, readbar, fmtAgo, fmtTime, dayKey, chapterMeta, allChapters, $, $$ } = G;
  const HUES = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5'];
  const hue = i => HUES[((i % 6) + 6) % 6];

  /* ================= chapter ================= */
  function chapter(c, app) {
    const meta = chapterMeta(c.id) || {};
    const sub = meta.subject || { name: '', id: '' };
    const s = S.state;
    let track = S.pref('track') || 'core';
    document.title = c.title + ' · ' + (sub.short || sub.name) + ' ' + c.n + ' · Glidepath';
    const body = document.body;
    body.prepend(topbar({ burger: true, back: { href: url('index.html#' + sub.id), label: sub.name || 'All chapters' } }));
    const side = el('aside', { class: 'side' });
    const main = el('main', { class: 'main' });
    app.append(el('div', { class: 'chap' }, side, main));

    /* hero */
    const hu = hue(c.hue ?? meta.hue ?? 0);
    main.append(el('section', { class: 'hero ' + hu },
      el('div', null,
        el('div', { class: 'chips' }, el('span', { class: 'chip ' + hu }, icon(c.icon || 'book'), (sub.short || sub.name) + ' · Chapter ' + String(c.n).padStart(2, '0')),
          c.tag ? el('span', { class: 'chip h4' }, c.tag) : null, el('span', { class: 'chip h1', id: 'trackchip' }, '')),
        el('h1', null, c.title), el('p', { class: 'big' }, rich(c.big))),
      orb(c.icon, hu)));

    /* resume banner */
    const pos = s.pos['ch:' + c.id];
    if (pos && !location.hash && pos !== 'top' && S.pref('resume') !== false) {
      const L0 = c.lessons.find(l => l.id === pos);
      if (L0) main.append(el('a', { class: 'resume', href: '#' + pos, style: { marginTop: '18px' } }, el('span', { class: 'ic' }, icon('history')), el('span', null, el('small', null, 'You stopped here last time'), el('b', null, L0.ask || L0.short)), el('span', { class: 'go' }, 'Jump →')));
    }

    if (c.purpose) main.append(el('div', { class: 'purpose' }, el('b', null, 'Why it matters for DGCA: '), rich(c.purpose)));
    /* the chapter in one minute: numbered cards from the lessons' one-line answers (only70 layout) */
    const plain = t => String(t || '').replace(/\*\*|==|`/g, '').replace(/(^|\s)\*(\S.*?)\*/g, '$1$2').trim();
    const minute = (c.minute && c.minute.length ? c.minute : c.lessons.filter(l => l.tier !== 'exam' && l.takeaway).map(l => l.takeaway)).slice(0, 6);
    if (minute.length) main.append(el('section', { class: 'minute1', id: 'minute' },
      el('div', { class: 'kicker' }, 'The chapter in one minute'),
      el('div', { class: 'mgrid' }, minute.map((t, i) => el('div', { class: 'mcard ' + hue((c.hue || 0) + i) }, el('b', null, i + 1), el('p', null, plain(t)))))));

    /* lessons */
    const lessons = c.lessons.slice();
    if (c.notesHtml) lessons.push({ id: 'points', type: 'facts', short: 'Every fact, drawn out', icon: 'grid', ask: 'Every fact from the book, drawn out', lead: 'Nothing left out: each section of the chapter as cards. Terms in colour, numbers in blue, cause → effect as arrows, tables as tables.', part: 'Every fact from the book' });
    if (c.bank) lessons.push({ id: 'test', type: 'qbank', bank: c.bank, short: 'Test yourself', icon: 'check', ask: 'Test yourself: the book\'s question bank', lead: c.bankLead || 'Every end-of-chapter question from the book, with the book\'s answer key. Your answers are saved.', part: 'Test yourself' });

    const toc = el('ul', { class: 'toc' });
    const trackBox = el('div', { class: 'track' });
    side.append(trackBox, el('ul', { class: 'toc' }, minute.length ? el('li', null, el('a', { href: '#minute' }, el('span', { class: 'n' }, '•'), 'In one minute')) : null), toc);
    const nCore = lessons.filter(l => l.tier !== 'exam').length;
    const tb = (k, lab, n) => el('button', { class: (track === k ? 'on ' : '') + (k === 'exam' ? 'exam' : ''), onclick: () => setTrack(k) }, lab, el('small', null, n + ' lessons'));
    function setTrack(k, fromNav) { track = k; S.pref('track', k); trackBox.replaceChildren(tb('core', 'Core & Revision', nCore), tb('exam', '◆ Exam-Ready', lessons.length)); applyTrack(); if (!fromNav) window.dispatchEvent(new CustomEvent('gp-track', { detail: k })); }
    window.addEventListener('gp-track', e => { if (e.detail !== track) setTrack(e.detail, true); });

    let lastPart = null, partN = 0, num = 0;
    const secs = [];
    lessons.forEach((d, idx) => {
      if (d.part && d.part !== lastPart) {
        lastPart = d.part; partN++;
        const pd = el('div', { class: 'partdiv', 'data-part': partN }, el('small', null, 'PART ' + partN), el('h2', null, d.part));
        main.append(pd); d._partEl = pd;
        toc.append(el('li', { class: 'part', 'data-part': partN }, el('span', null, 'P' + partN), d.part));
      }
      const h = hue(d.hue ?? ((c.hue || 0) + idx));
      const info = el('div', { class: 'infobar', hidden: true });
      const ctx = { hue: h, hueStart: (c.hue || 0) + idx, info: (t, x, q) => { info.hidden = false; info.replaceChildren(el('span', { class: 'ic' }, icon('search')), el('div', null, el('b', null, t), x ? el('p', null, rich(x)) : null, q ? el('blockquote', null, rich(q)) : null)); } };
      const stage = el('div', { class: 'stage' });
      const sec = el('section', { class: 'lesson ' + h + (d.tier === 'exam' ? ' examtier' : ''), id: d.id },
        el('div', { class: 'lhead' }, el('div', { class: 'ltile' }, icon(d.icon || 'spark')),
          el('div', null, el('h3', null, d.ask || d.short, d.tier === 'exam' ? el('span', { class: 'badge exam' }, '◆ Exam') : null, d.dgca ? el('span', { class: 'badge dgca' }, 'DGCA favourite') : null),
            d.lead ? el('p', { class: 'lead' }, rich(d.lead)) : null)),
        (d.takeaway || d.hook) ? el('div', { class: 'answerrow' },
          d.takeaway ? el('div', { class: 'takeaway' }, icon('spark'), rich(d.takeaway)) : el('div'),
          d.hook ? el('div', { class: 'hook' }, el('small', null, 'Memory hook'), rich(d.hook)) : null) : null,
        stage, info);
      if (d.type === 'notes') { stage.classList.add('notes'); stage.innerHTML = c.notesHtml; }
      else if (d.type === 'facts') { stage.classList.add('factstage'); stage.append(factsBoard(c.notesHtml)); }
      else {
        try { G.R[d.type](d, stage, ctx); }
        catch (e) { console.error(d.id, e); stage.append(el('p', { class: 'hint' }, 'This diagram could not be drawn.')); }
      }
      if (d.after) sec.append(el('div', { class: 'purpose', style: { marginTop: '12px' } }, rich(d.after)));
      main.append(sec);
      if (d.type !== 'notes' && d.type !== 'qbank') num++;
      const done = (s.seen[c.id] || []).includes(d.id);
      const li = el('li', { class: d.tier === 'exam' ? 'exam-only' : '' }, el('a', { href: '#' + d.id, 'data-id': d.id, onclick: () => body.classList.remove('toc-open') }, el('span', { class: 'n' }, String(idx + 1).padStart(2, '0')), d.short || d.ask, el('span', { class: 'ck' }, done ? '✓' : '')));
      toc.append(li);
      secs.push({ d, sec, li });
    });
    function applyTrack() {
      body.classList.toggle('exam-track', track === 'exam');
      $('#trackchip').textContent = track === 'exam' ? '◆ Exam-Ready track' : 'Core & Revision track';
      secs.forEach(x => { const hide = track === 'core' && x.d.tier === 'exam'; x.sec.hidden = hide; x.li.hidden = hide; });
    }
    setTrack(track);

    /* prev / next */
    const all = allChapters(); const k = all.findIndex(x => x.id === c.id);
    const prev = all[k - 1], next = all[k + 1];
    main.append(el('div', { class: 'nextcard' },
      prev ? el('a', { class: 'prev', href: url(prev.href) }, el('small', null, '← Previous'), el('b', null, prev.subject.short + ' ' + prev.n + '. ' + prev.title)) : null,
      next ? el('a', { href: url(next.href) }, el('small', null, 'Next →'), el('b', null, next.subject.short + ' ' + next.n + '. ' + next.title)) : null));
    /* my notes for this chapter: floating button + slide-in panel */
    s.notes = s.notes || {};
    const nb = el('button', { class: 'notebtn', title: 'My notes for this chapter' }, icon('pen'), el('span', null, 'Notes'));
    const nta = el('textarea', { class: 'notes-ta', placeholder: 'Your own notes, mnemonics, doubts for this chapter…' }); nta.value = (s.notes[c.id] || {}).text || '';
    const saved = el('small', { class: 'hint' }, '');
    const panel = el('aside', { class: 'notepanel', hidden: true }, el('div', { class: 'np-head' }, el('b', null, 'My notes · ' + c.title), el('button', { class: 'hw-x', onclick: () => { panel.hidden = true; } }, '✕')), nta, el('div', { class: 'np-foot' }, saved, el('a', { href: url('notes.html') }, 'All my notes →')));
    let nt = null;
    nta.addEventListener('input', () => { clearTimeout(nt); saved.textContent = 'Saving…'; nt = setTimeout(() => { const v = nta.value.trim(); if (v) s.notes[c.id] = { text: nta.value, t: Date.now(), title: c.title, sub: sub.short || sub.name, href: location.pathname.split('/').slice(-2).join('/') }; else delete s.notes[c.id]; S.save(); saved.textContent = 'Saved'; nb.classList.toggle('has', !!v); }, 500); });
    nb.classList.toggle('has', !!nta.value.trim());
    nb.onclick = () => { panel.hidden = !panel.hidden; if (!panel.hidden) nta.focus(); };
    body.append(nb, panel);
    body.append(footer());
    readbar();

    /* history + progress: which lesson is on screen */
    const here = location.pathname.split('/').slice(-2).join('/');
    S.visit({ href: here, title: c.title, sub: 'Chapter ' + c.n, subj: sub.id, ch: c.id, kind: 'chapter' });
    let cur = null;
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id; if (cur === id) return; cur = id;
        $$('.toc a.on').forEach(a => a.classList.remove('on'));
        const a = $('.toc a[data-id="' + id + '"]'); if (a) { a.classList.add('on'); a.scrollIntoView({ block: 'nearest' }); }
        const d = lessons.find(l => l.id === id);
        s.pos['ch:' + c.id] = id; S.seen(c.id, id);
        S.visit({ href: here + '#' + id, title: c.title, sub: d ? (d.ask || d.short) : '', subj: sub.id, ch: c.id, kind: 'chapter' });
        if (a && !a.querySelector('.ck').textContent) a.querySelector('.ck').textContent = '✓';
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(x => io.observe(x.sec));
    if (location.hash) { const jump = () => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView({ behavior: 'instant', block: 'start' }); };
      setTimeout(jump, 60); setTimeout(jump, 600); window.addEventListener('load', () => setTimeout(jump, 50), { once: true }); }
  }

  /* ---- every fact, drawn out: turns the book notes into section cards, term tiles, number badges and arrow chains.
     Pure re-layout of the same HTML: no sentence is dropped. ---- */
  function factsBoard(html) {
    const src = document.createElement('div'); src.innerHTML = html;
    const board = el('div', { class: 'facts' });
    const NUM = /\d/;
    let card = null, grid = null, nums = null, k = 0;
    const newCard = (title, id) => {
      const hu = hue(k++);
      grid = el('div', { class: 'ftiles' }); nums = el('div', { class: 'fnums' });
      card = el('section', { class: 'fcard2 ' + hu, id: id || null }, el('header', null, el('span', { class: 'fno' }, String(k).padStart(2, '0')), el('h4', null, title)), nums, grid);
      board.append(card);
    };
    const markNums = node => node.querySelectorAll('strong').forEach(b => { if (NUM.test(b.textContent) && b.textContent.length < 40) b.classList.add('n'); });
    const collectNums = node => node.querySelectorAll('strong.n').forEach(b => { if (nums.children.length < 8 && !nums.textContent.includes(b.textContent)) nums.append(el('span', null, b.textContent)); });
    const arrowChain = li => { /* "A → B → C" with short steps becomes a flow strip */
      if (li.querySelector('ul,table')) return null;
      const txt = li.innerHTML; const parts = txt.split(/\s*→\s*/);
      if (parts.length < 3 || /;/.test(li.textContent) || parts.some(p => p.replace(/<[^>]+>/g, '').length > 70 || !p.trim())) return null;
      const box = el('div', { class: 'fflow' });
      parts.forEach((p, i) => { if (i) box.append(el('span', { class: 'arr' }, '→')); box.append(el('span', { class: 'step', html: p })); });
      return box;
    };
    const tile = li => {
      markNums(li);
      const flow = arrowChain(li);
      if (flow) return el('div', { class: 'ftile flowtile' }, flow);
      const t = el('div', { class: 'ftile' });
      const first = li.firstChild;
      /* leading <strong>Term</strong> followed by = : — becomes the tile's heading chip */
      if (first && first.nodeType === 1 && first.tagName === 'STRONG' && !first.classList.contains('n')) {
        const after = first.nextSibling; const m = after && after.nodeType === 3 && after.textContent.match(/^\s*(=|:|—|–)\s*/);
        if (m) { t.append(el('div', { class: 'fterm' }, first.textContent)); after.textContent = after.textContent.slice(m[0].length); first.remove(); }
      } else if (first && first.nodeType === 3) {
        const m = first.textContent.match(/^([^:=.;,()]{2,38}?)\s*(?::|=)\s+/);
        if (m) { t.append(el('div', { class: 'fterm' }, m[1])); first.textContent = first.textContent.slice(m[0].length); }
      }
      const body = el('div', { class: 'fbody' }); while (li.firstChild) body.append(li.firstChild);
      body.querySelectorAll(':scope > ul').forEach(u => { u.classList.add('fsub'); });
      t.append(body); return t;
    };
    [...src.children].forEach(n => {
      const tag = n.tagName;
      if (tag === 'H3' || tag === 'H2') { newCard(n.textContent, n.id); return; }
      if (!card) newCard('Overview');
      if (tag === 'HR') return;
      if (tag === 'H4') { grid.append(el('div', { class: 'fsubhead' }, n.textContent)); return; }
      if (tag === 'UL' || tag === 'OL') { [...n.children].forEach(li => { const t = tile(li); grid.append(t); }); collectNums(grid); return; }
      if (tag === 'TABLE') { markNums(n); n.classList.add('ftable'); grid.append(el('div', { class: 'ftile wide scrollx' }, n)); return; }
      if (tag === 'BLOCKQUOTE') { grid.append(el('div', { class: 'ftile wide quote' }, ...n.childNodes)); return; }
      markNums(n); grid.append(el('div', { class: 'ftile wide' }, n));
    });
    board.querySelectorAll('.fnums:empty').forEach(x => x.remove());
    board.querySelectorAll('.fnums').forEach(x => x.prepend(el('small', null, 'Numbers')));
    return board;
  }

  /* ---- mind-map bubble → detailed explanation from the chapter's own notes and lessons ---- */
  const STOP = new Set('the and for with from that this are was its into than then over under also only each per what which when where how why does into about more less very most their there these those your you not but can may will all any one two'.split(' '));
  const words = t => String(t || '').toLowerCase().replace(/[^a-z0-9°%.+-]+/g, ' ').split(' ').filter(w => w.length > 2 && !STOP.has(w) || /\d/.test(w) && w.length > 0);
  const chCache = {};
  function loadChapter(href) {
    if (!href) return Promise.resolve(window.CHAPTER);
    const id = href.split('/').pop().replace('.html', '');
    if (window.CHAPTER && window.CHAPTER.id === id) return Promise.resolve(window.CHAPTER);
    if (chCache[id]) return chCache[id];
    return (chCache[id] = fetch(url('data/ch/' + id + '.js')).then(r => r.text()).then(src => { const w = {}; new Function('window', src)(w); return w.CHAPTER; }));
  }
  G.explainNode = function (n, path, href) {
    loadChapter(href).then(c => {
      if (!c) return;
      const chHref = href || (location.pathname.split('/').slice(-2).join('/'));
      const strong = words(n.label), weak = words((path || []).slice(1).join(' '));
      const score = t => { const T = ' ' + String(t).toLowerCase().replace(/[^a-z0-9°%.+-]+/g, ' ') + ' '; let sc = 0; strong.forEach(w => { if (T.includes(' ' + w) || T.includes(w + ' ')) sc += 3; }); weak.forEach(w => { if (T.includes(' ' + w)) sc += 2; }); return sc; };
      /* book notes: score sections by heading, bullets by text */
      const src = document.createElement('div'); src.innerHTML = c.notesHtml || '';
      const secs = []; let curSec = null;
      [...src.children].forEach(x => { if (x.tagName === 'H3') { curSec = { h: x, items: [] }; secs.push(curSec); } else if (curSec) curSec.items.push(x); });
      const picked = new Map();
      let best = 0; const cand = [];
      secs.forEach(sec => {
        const hs = score(sec.h.textContent);
        sec.items.forEach(blk => {
          const lis = blk.tagName === 'UL' || blk.tagName === 'OL' ? [...blk.children] : [blk];
          lis.forEach(li => { const own = score(li.textContent); const sc = own + hs; if (own > 0 || hs >= 3) cand.push({ sec, li, sc }); best = Math.max(best, sc); });
        });
      });
      cand.filter(x => x.sc >= Math.max(3, best * 0.7)).sort((a, b) => b.sc - a.sc).slice(0, 12).forEach(x => { if (!picked.has(x.sec)) picked.set(x.sec, []); picked.get(x.sec).push(x.li); });
      let html = '';
      for (const [sec, items] of picked) {
        html += `<h3 id="${sec.h.id}">${sec.h.innerHTML}</h3>`;
        const lis = items.filter(x => x.tagName === 'LI'), other = items.filter(x => x.tagName !== 'LI');
        if (lis.length) html += '<ul>' + lis.map(li => li.outerHTML).join('') + '</ul>';
        other.forEach(o => { html += o.outerHTML; });
      }
      /* lessons that teach it */
      const lsc = c.lessons.filter(l => l.takeaway).map(l => [l, score((l.ask || '') + ' ' + (l.short || '') + ' ' + l.takeaway)]); const lbest = Math.max(0, ...lsc.map(x => x[1]));
      const ls = lsc.filter(x => x[1] >= Math.max(3, lbest * 0.7)).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0]);
      const body = el('div', { class: 'xn-body' });
      if (n.tip) body.append(el('div', { class: 'xn-tip' }, el('small', null, 'On the map'), el('p', null, rich(n.tip))));
      if (ls.length) body.append(el('div', { class: 'xn-ls' }, el('small', null, 'In one line'), ls.map(l => el('a', { class: 'xn-l', href: url(chHref + '#' + l.id) }, el('b', null, l.ask || l.short), el('span', null, rich(l.takeaway)), l.hook ? el('em', null, 'Hook: ', rich(l.hook)) : null))));
      if (html) { body.append(el('small', { class: 'xn-h' }, 'From the book')); body.append(factsBoard(html)); }
      if (!html && !ls.length && !n.tip) body.append(el('p', { class: 'hint' }, 'This bubble is a heading on the map. Open the chapter for the full section.'));
      const firstSec = [...picked.keys()][0];
      const go = el('a', { class: 'pill ink', href: url(chHref + (firstSec && firstSec.h.id ? '#' + firstSec.h.id : ls[0] ? '#' + ls[0].id : '')) }, 'Open in chapter', icon('right'));
      if (G.modal) { const md = G.modal({ title: n.label, tools: [el('span', { class: 'hint' }, (path || []).concat(n.label).join(' › ')), go], body }); md.dlg.classList.add('xn-modal'); }
    });
  };

  function orb(ic, hu) {
    const o = el('div', { class: 'orb ' + hu }, el('div', { class: 'disc' }, icon(ic || 'book')));
    o.append(G.sv('svg', { class: 'path', viewBox: '0 0 200 200' }, G.sv('path', { d: 'M10 170 C 40 120, 120 160, 150 90 S 180 30, 186 22', fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2, 'stroke-dasharray': '3 7', 'stroke-linecap': 'round' }), G.sv('circle', { cx: 10, cy: 170, r: 4, fill: 'var(--ink)' })));
    o.append(el('div', { class: 'plane' }, icon('plane')));
    return o;
  }

  /* ================= home ================= */
  function home(app) {
    const site = window.SITE; const s = S.state;
    document.body.prepend(topbar({ on: 'home' }));
    const w = el('div', { class: 'wrap' }); app.append(w);
    const sbox = searchBox();
    w.append(el('section', { class: 'homehero h0' },
      el('div', null, el('h1', null, 'DGCA CPL, made visual'),
        el('p', null, 'Meteorology, Air Navigation and Air Regulations from your four textbooks, drawn as diagrams, flowcharts, mind maps and games, with every end-of-chapter question to test yourself.'), sbox),
      orb('plane', 'h0')));
    if (s.last) {
      const L = s.last;
      w.append(el('a', { class: 'resume', href: url(L.href) }, el('span', { class: 'ic' }, icon('history')),
        el('span', null, el('small', null, 'Continue where you left off · ' + fmtAgo(L.t)), el('b', null, L.title), L.sub ? el('small', null, L.sub) : null), el('span', { class: 'go' }, 'Resume →')));
    }
    /* quick tiles */
    const tot = site.subjects.reduce((a, x) => a + x.chapters.reduce((b, c) => b + (c.qn || 0), 0), 0);
    const tried = Object.keys(s.qa).length;
    const tools = [el('div', { class: 'sechead' }, el('h2', null, 'Study tools')),
      el('div', { class: 'tiles' },
        tile('h1', 'check', 'Practice & mock exams', tried + ' of ' + tot + ' questions tried. Chapter banks, sample papers, timed DGCA-style tests.', 'practice.html'),
        tile('h4', 'star', 'Flight bag', 'Every value, formula and table on one page, for the last look before the exam.', 'revise.html'),
        tile('h3', 'brain', 'Mind maps', 'Each subject as one picture. Tap to drill down.', 'mindmaps.html'),
        tile('h1', 'layers', 'Flashcards', 'Every value, formula and table fact as a card, with spaced review so you remember it on exam day.', 'flashcards.html'),
        tile('h0', 'gauge', 'Dashboard', 'Streak, accuracy, weak chapters and how ready you are for each paper.', 'dashboard.html'),
        tile('h2', 'calc', 'Calculators & decoders', 'ISA, altimetry, wind triangle, 1-in-60, PNR/PET, METAR & TAF decoder.', 'tools.html'),
        tile('h5', 'target', 'How DGCA asks', 'Exam pattern, weightage and the traps that keep showing up.', 'guide.html'),
        tile('h0', 'history', 'History', 'Where you were, what you did, how long you studied.', 'history.html'),
        tile('h4', 'target', 'ADAPT & cadet selection', 'Timed test centre (cognitive, maths, physics, English, multitasking, personality) + interview and GD practice.', 'adapt.html'),
        tile('h1', 'route', 'My path', 'Medicals → cadet programmes → DGCA exams: your timeline, trackers and the plan to show your parents.', 'path.html'),
        tile('h5', 'heart', 'Health plan', 'Fit by December: meals, supplement timings, training, daily checklist.', 'health.html'))];
    /* subject tabs */
    const tabs = el('div', { class: 'subjtabs' });
    const grid = el('div');
    let cur = location.hash.slice(1) || S.pref('subject') || site.subjects[0].id;
    function draw() {
      tabs.replaceChildren(...site.subjects.map(x => el('button', { class: x.id === cur ? 'on' : '', onclick: () => { cur = x.id; S.pref('subject', cur); history.replaceState(null, '', '#' + cur); draw(); } }, x.name, el('small', null, x.chapters.length + ' chapters · ' + x.book))));
      const sub = site.subjects.find(x => x.id === cur) || site.subjects[0];
      grid.replaceChildren();
      let lastPart = null; let g = null;
      sub.chapters.forEach((c, i) => {
        if (c.part !== lastPart || !g) { lastPart = c.part; if (c.part) grid.append(el('div', { class: 'kicker' }, c.part)); g = el('div', { class: 'grid' }); grid.append(g); }
        const seen = (s.seen[c.id] || []).length; const pct = c.ln ? Math.min(100, Math.round((seen / c.ln) * 100)) : 0;
        const qt = c.qn ? Object.keys(s.qa).filter(k => k.startsWith(c.bank + '#')).length : 0;
        g.append(el('a', { class: 'card ' + hue(c.hue ?? i), href: url(c.href) },
          el('div', { class: 'top2' }, el('span', { class: 'num' }, String(c.n).padStart(2, '0')), el('span', { class: 'ico' }, icon(c.icon || 'book'))),
          el('h3', null, c.title), el('p', null, c.big),
          el('div', { class: 'foot' }, el('span', null, c.ln + ' lessons' + (c.qn ? ' · ' + qt + '/' + c.qn + ' Qs' : '')), el('span', { class: 'bar' }, el('i', { style: { width: pct + '%' } })), el('span', { class: 'arrow' }, icon('right')))));
      });
    }
    /* only70 order: hero → chapters; the extra tools follow */
    w.append(el('div', { class: 'sechead', id: 'chapters' }, el('h2', null, 'Chapters')), tabs, grid, ...tools);
    draw();
    document.body.append(footer());
    S.visit({ href: 'index.html', title: 'Home', sub: '', kind: 'home' });
    s.last = s.hist.find(h => h.kind === 'chapter') || s.last; S.save();
  }
  function tile(h, ic, t, x, href) { return el('a', { class: 'tile ' + h, href: url(href) }, el('span', { class: 'ic' }, icon(ic)), el('span', null, el('b', null, t), el('small', null, x))); }

  /* search over window.SEARCH */
  function searchBox() {
    const inp = el('input', { type: 'search', placeholder: 'Find a topic: tropopause, QNH, PNR, VMC minima…', 'aria-label': 'Search' });
    const res = el('div', { class: 'results' });
    let sel = 0, hits = [];
    if (/^#q=/.test(location.hash)) setTimeout(() => { inp.value = decodeURIComponent(location.hash.slice(3)); inp.dispatchEvent(new Event('input')); inp.focus(); }, 60); // from the 404 page
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      if (q.length < 2) { res.classList.remove('show'); return; }
      const terms = q.split(/\s+/);
      hits = (window.SEARCH || []).map(e => { const hay = (e.t + ' ' + e.s + ' ' + (e.k || '')).toLowerCase(); let sc = 0; for (const t of terms) { if (!hay.includes(t)) return null; sc += e.t.toLowerCase().includes(t) ? 3 : 1; } return [sc, e]; }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, 30).map(x => x[1]);
      sel = 0; res.replaceChildren(...hits.map((h, i) => el('a', { href: url(h.h), class: i === 0 ? 'sel' : '' }, rich(h.t), el('small', null, h.s))));
      if (!hits.length) res.replaceChildren(el('a', null, 'No match', el('small', null, 'Try another word')));
      res.classList.add('show');
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length; $$('a', res).forEach((a, i) => a.classList.toggle('sel', i === sel)); }
      if (e.key === 'Enter' && hits[sel]) location.href = url(hits[sel].h);
      if (e.key === 'Escape') res.classList.remove('show');
    });
    document.addEventListener('click', e => { if (!res.contains(e.target) && e.target !== inp) res.classList.remove('show'); });
    document.addEventListener('keydown', e => { if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); inp.focus(); } });
    return el('div', { class: 'search' }, icon('search'), inp, res);
  }
  G.searchBox = searchBox;

  /* ================= practice ================= */
  async function practice(app) {
    const site = window.SITE; const s = S.state;
    document.body.prepend(topbar({ on: 'practice' }));
    const w = el('div', { class: 'wrap' }); app.append(w);
    w.append(el('section', { class: 'hero h1' }, el('div', null, el('div', { class: 'chips' }, el('span', { class: 'chip h1' }, icon('check'), 'Question banks')),
      el('h1', null, 'Practice & mock exams'), el('p', { class: 'big' }, 'Chapter banks straight from the books, the books\' sample papers, and timed tests in the DGCA format: 70% to pass, no negative marking.')), orb('check', 'h1')));
    const tabs = el('div', { class: 'subjtabs' }); const box = el('div'); const run = el('div', { id: 'run' });
    w.append(tabs, box, run);
    let cur = new URLSearchParams(location.search).get('s') || S.pref('subject') || site.subjects[0].id;
    async function draw() {
      tabs.replaceChildren(...site.subjects.filter(x => x.banks && x.banks.length).map(x => el('button', { class: x.id === cur ? 'on' : '', onclick: () => { cur = x.id; draw(); } }, x.name, el('small', null, x.qn + ' questions'))));
      const sub = site.subjects.find(x => x.id === cur);
      box.replaceChildren(el('p', { class: 'hint' }, 'Loading question banks…'));
      await Promise.all(sub.banks.map(b => (window.QB || {})[b.id] ? null : G.loadScript(url('data/qb/' + b.id + '.js')).catch(() => null)));
      const banks = sub.banks.map(b => window.QB && window.QB[b.id]).filter(Boolean);
      const allQ = banks.flatMap(b => b.qs.map(q => Object.assign({ bank: b.id, src: b.src }, q)));
      const done = allQ.filter(q => s.qa[G.qid(q)]); const right = done.filter(q => s.qa[G.qid(q)].ok);
      const wrong = allQ.filter(q => { const r = s.qa[G.qid(q)]; return r && !r.ok; });
      const marked = allQ.filter(q => s.marks[G.qid(q)]);
      const now = Date.now(), DAY = 864e5;
      const dueAt = r => r.due || (r.t || 0) + (r.ok ? 3 : 1) * DAY; /* answers saved before spaced review existed */
      const due = allQ.filter(q => { const r = s.qa[G.qid(q)]; return r && dueAt(r) <= now; }).sort((a, b) => dueAt(s.qa[G.qid(a)]) - dueAt(s.qa[G.qid(b)]));
      const lucky = allQ.filter(q => { const r = s.qa[G.qid(q)]; return r && r.ok && r.guess; });
      box.replaceChildren(
        el('div', { class: 'score' }, el('div', { class: 'h0' }, el('b', null, allQ.length), 'questions'), el('div', { class: 'h1' }, el('b', null, done.length), 'tried'),
          el('div', { class: 'h4' }, el('b', null, done.length ? Math.round(right.length / done.length * 100) + '%' : '–'), 'accuracy'), el('div', { class: 'h5' }, el('b', null, wrong.length), 'to fix')),
        el('div', { class: 'sechead' }, el('h2', null, 'Timed tests')),
        el('div', { class: 'tiles' },
          testTile('h2', 'timer', 'DGCA-style mock', (sub.exam?.n || 50) + ' questions · ' + (sub.exam?.min || 120) + ' min · random from every chapter', () => start(pickN(allQ, sub.exam?.n || 50), { exam: true, minutes: sub.exam?.min || 120, title: sub.name + ' mock' })),
          testTile('h3', 'zap', 'Quick 20', '20 random questions · 25 min', () => start(pickN(allQ, 20), { exam: true, minutes: 25, title: 'Quick 20' })),
          testTile('h1', 'refresh', 'Due for review', due.length + ' question' + (due.length === 1 ? '' : 's') + ' due today (spaced repetition: 1 → 3 → 7 → 21 → 60 days)', () => start(due.slice(0, 40), { title: 'Due for review' })),
          testTile('h4', 'help', 'Lucky guesses', lucky.length + ' right answers you marked as guesses', () => start(lucky, { title: 'Lucky guesses' })),
          testTile('h5', 'alert', 'Fix my mistakes', wrong.length + ' questions you got wrong last time', () => start(wrong.slice().sort(() => Math.random() - .5), { title: 'Mistakes' })),
          testTile('h4', 'bookmark', 'Bookmarked', marked.length + ' saved questions', () => start(marked, { title: 'Bookmarks' })),
          testTile('h0', 'shuffle', 'Weak-spot drill', 'Not-yet-tried and wrong questions first, 30 at a time', () => start(allQ.filter(q => !s.qa[G.qid(q)] || !s.qa[G.qid(q)].ok).sort(() => Math.random() - .5).slice(0, 30), { title: 'Weak spots' }))),
        el('div', { class: 'sechead' }, el('h2', null, 'By chapter and paper')),
        el('div', { class: 'scrollx' }, el('table', { class: 'vtable' }, el('tbody', null, sub.banks.map(b => {
          const B = window.QB && window.QB[b.id]; if (!B) return null;
          const n = B.qs.length; const t = B.qs.filter(q => s.qa[b.id + '#' + q.n]).length; const r = B.qs.filter(q => (s.qa[b.id + '#' + q.n] || {}).ok).length;
          return el('tr', null, el('td', null, el('b', null, B.title), el('div', { class: 'qsrc' }, B.src)), el('td', { class: 'c' }, n + ' Qs'), el('td', { class: 'c' }, t + ' tried · ' + (t ? Math.round(r / t * 100) : 0) + '%'),
            el('td', null, el('div', { class: 'row' }, el('button', { class: 'btn ghost', onclick: () => start(B.qs.map(q => Object.assign({ bank: B.id, src: B.src }, q)), { title: B.title, bank: B.id }) }, 'Practise'),
              el('button', { class: 'btn ghost', onclick: () => start(B.qs.map(q => Object.assign({ bank: B.id, src: B.src }, q)), { exam: true, minutes: Math.max(10, Math.round(n * 1.4)), title: B.title + ' (timed)' }) }, icon('timer'), 'Timed'))));
        })))));
      run.replaceChildren();
    }
    function testTile(h, ic, t, x, fn) { return el('button', { class: 'tile ' + h, style: { border: 0, textAlign: 'left' }, onclick: fn }, el('span', { class: 'ic' }, icon(ic)), el('span', null, el('b', null, t), el('small', null, x))); }
    function pickN(a, n) { return a.slice().sort(() => Math.random() - .5).slice(0, n); }
    function start(qs, o) {
      if (!qs.length) { toast('Nothing to practise here yet'); return; }
      qs.forEach(q => delete q._picked);
      const st = el('div', { class: 'stage' });
      run.replaceChildren(el('div', { class: 'sechead' }, el('h2', null, o.title), el('button', { class: 'btn ghost', onclick: () => { run.replaceChildren(); draw(); } }, icon('x'), 'Close')), st);
      G.qengine(st, { qs, bank: o.bank || null, exam: o.exam, minutes: o.minutes, showFilters: !!o.bank, title: o.title, onFinish: r => { s.exams.unshift({ t: Date.now(), title: o.title, subj: cur, ...r }); S.save(); } });
      S.visit({ href: 'practice.html?s=' + cur, title: 'Practice: ' + o.title, sub: qs.length + ' questions', kind: 'practice' });
      run.scrollIntoView();
    }
    draw();
    document.body.append(footer());
  }

  /* ================= revise (flight bag) ================= */
  function revise(app) {
    const R = window.REVISE; const s = S.state;
    document.body.prepend(topbar({ on: 'revise' }));
    const w = el('div', { class: 'wrap' }); app.append(w);
    w.append(el('section', { class: 'hero h4' }, el('div', null, el('div', { class: 'chips' }, el('span', { class: 'chip h4' }, icon('star'), 'One-stop revision')),
      el('h1', null, 'The flight bag'), el('p', { class: 'big' }, 'Every number, formula, code and table from all chapters on one page. Filter, search, or print it for the night before.')), orb('star', 'h4')));
    const q = el('input', { type: 'search', placeholder: 'Filter: lapse rate, 1 in 60, VMC…' });
    const seg = el('div', { class: 'seg' });
    let subj = 'all';
    const body = el('div');
    w.append(el('div', { class: 'revtools' }, q, seg, el('button', { class: 'btn ghost', onclick: () => window.print() }, icon('file'), 'Print')), body);
    function draw() {
      seg.replaceChildren(...[['all', 'All']].concat(R.subjects.map(x => [x.id, x.short])).map(([k, l]) => el('button', { class: subj === k ? 'on' : '', onclick: () => { subj = k; draw(); } }, l)));
      const f = q.value.trim().toLowerCase();
      body.replaceChildren();
      R.subjects.filter(x => subj === 'all' || subj === x.id).forEach(sub => {
        sub.sections.forEach(sec => {
          const rows = sec.rows.filter(r => !f || (r.k + ' ' + r.v + ' ' + (r.n || '')).toLowerCase().includes(f));
          const formulas = (sec.formulas || []).filter(r => !f || (r.name + ' ' + r.eq + ' ' + (r.note || '')).toLowerCase().includes(f));
          const tables = (sec.tables || []).filter(t => !f || JSON.stringify(t).toLowerCase().includes(f));
          if (!rows.length && !formulas.length && !tables.length) return;
          const box = el('section', { class: 'revsec' }, el('h2', null, el('span', { class: 'chip ' + hue(sec.hue || 0) }, sub.short), sec.title, sec.href ? el('a', { href: url(sec.href), class: 'hint', style: { fontSize: '13px' } }, 'open chapter →') : null));
          if (formulas.length) { const g = el('div', { class: 'fgrid', style: { marginBottom: '12px' } }); formulas.forEach((fm, i) => { const c = el('div', { class: 'fcard ' + hue(i) }, el('h5', null, fm.name), el('div', { class: 'eq', html: fm.eq }), fm.note ? el('p', null, rich(fm.note)) : null); if (fm.calc) c.append(G.calcBox(fm.calc)); g.append(c); }); box.append(g); }
          if (rows.length) box.append(el('div', { class: 'scrollx' }, el('table', { class: 'vtable' }, el('tbody', null, rows.map(r => el('tr', null, el('td', null, rich(r.k)), el('td', { class: 'v' }, rich(r.v)), el('td', { class: 'hint' }, rich(r.n || ''))))))));
          tables.forEach(t => { const m = el('div', { class: 'stage', style: { marginTop: '12px' } }); G.R.matrix(t, m, { info: () => {}, hueStart: 0 }); box.append(el('div', { class: 'kicker', style: { margin: '14px 0 6px' } }, t.title || ''), m); });
          body.append(box);
        });
      });
      if (!body.children.length) body.append(el('p', { class: 'hint' }, 'Nothing matches “' + f + '”.'));
    }
    q.addEventListener('input', draw); draw();
    S.visit({ href: 'revise.html', title: 'Flight bag', sub: 'Revision hub', kind: 'revise' });
    document.body.append(footer());
  }

  /* ================= history ================= */
  function historyPage(app) {
    const s = S.state;
    document.body.prepend(topbar({ on: 'history' }));
    const w = el('div', { class: 'wrap' }); app.append(w);
    w.append(el('section', { class: 'hero h0' }, el('div', null, el('div', { class: 'chips' }, el('span', { class: 'chip h0' }, icon('history'), 'Your study log')),
      el('h1', null, 'Where you left off'), el('p', { class: 'big' }, 'Every chapter and lesson you opened, the tests you took, and how much you studied each day. Saved in this browser only.')), orb('history', 'h0')));
    const lastCh = s.hist.find(h => h.kind === 'chapter');
    if (lastCh) w.append(el('a', { class: 'resume', href: url(lastCh.href) }, el('span', { class: 'ic' }, icon('play')), el('span', null, el('small', null, 'Last lesson · ' + fmtAgo(lastCh.t)), el('b', null, lastCh.title), el('small', null, lastCh.sub)), el('span', { class: 'go' }, 'Resume →')));
    /* heatmap: last 30 days */
    const heat = el('div', { class: 'heat' }); let total = 0, qs = 0;
    for (let i = 29; i >= 0; i--) { const d = dayKey(Date.now() - i * 864e5); const m = (s.days[d] || 0) / 60; total += m; qs += s.days['q' + d] || 0; heat.append(el('i', { class: m > 60 ? 'l3' : m > 20 ? 'l2' : m > 0 ? 'l1' : '', title: d + ': ' + Math.round(m) + ' min' })); }
    const chs = Object.keys(s.seen).length; const lessons = Object.values(s.seen).reduce((a, x) => a + x.length, 0);
    w.append(el('div', { class: 'sechead' }, el('h2', null, 'Last 30 days')),
      el('div', { class: 'score' }, el('div', { class: 'h1' }, el('b', null, Math.round(total / 60 * 10) / 10 + ' h'), 'studied'), el('div', { class: 'h0' }, el('b', null, qs), 'questions answered'),
        el('div', { class: 'h3' }, el('b', null, lessons), 'lessons seen in ' + chs + ' chapters'), el('div', { class: 'h4' }, el('b', null, s.exams.length), 'tests taken')),
      heat, el('p', { class: 'hint' }, 'Each square is one day (oldest on the left). Darker = longer.'));
    if (s.exams.length) w.append(el('div', { class: 'sechead' }, el('h2', null, 'Tests')), el('table', { class: 'vtable' }, el('tbody', null, s.exams.slice(0, 30).map(x => el('tr', null, el('td', { class: 'c' }, new Date(x.t).toLocaleString()), el('td', null, x.title), el('td', { class: 'v' }, x.pc + '%'), el('td', null, x.pass ? '✓ pass' : '✗'))))));
    /* timeline grouped by day */
    w.append(el('div', { class: 'sechead' }, el('h2', null, 'Timeline'), el('span', { class: 'spacer' }), el('button', { class: 'btn ghost', onclick: () => { if (confirm('Clear the visit timeline? Your answers and progress stay.')) { s.hist = []; S.saveNow(); location.reload(); } } }, 'Clear timeline')));
    let day = null; let ul = null;
    s.hist.slice(0, 250).forEach(h => {
      const d = new Date(h.t).toDateString();
      if (d !== day) { day = d; w.append(el('div', { class: 'dayhead' }, d === new Date().toDateString() ? 'Today' : d)); ul = el('ul', { class: 'hist' }); w.append(ul); }
      ul.append(el('li', null, el('span', { class: 't' }, fmtTime(h.t)), el('span', null, el('a', { href: url(h.href) }, h.title), h.sub ? el('small', null, h.sub) : null)));
    });
    if (!s.hist.length) w.append(el('p', { class: 'hint' }, 'Nothing yet. Open a chapter and it will show up here.'));
    document.body.append(footer());
  }

  /* ================= generic static page (guide, mindmaps, tools) ================= */
  function staticPage(app, P) {
    document.body.prepend(topbar({ on: P.on }));
    const w = el('div', { class: 'wrap' }); app.append(w);
    w.append(el('section', { class: 'hero ' + (P.hue || 'h0') }, el('div', null, el('div', { class: 'chips' }, el('span', { class: 'chip ' + (P.hue || 'h0') }, icon(P.icon || 'book'), P.chip || '')),
      el('h1', null, P.title), el('p', { class: 'big' }, rich(P.big))), orb(P.icon, P.hue || 'h0')));
    (P.blocks || []).forEach((d, idx) => {
      if (d.heading) { w.append(el('div', { class: 'sechead', id: d.id || null }, el('h2', null, d.heading), d.sub ? el('span', { class: 'hint' }, d.sub) : null)); return; }
      if (d.html) { const x = el('div', { class: 'notes' }); x.innerHTML = d.html; w.append(x); return; }
      const h = hue(d.hue ?? idx);
      const info = el('div', { class: 'infobar', hidden: true });
      const ctx = { hueStart: idx, info: (t, x, q) => { info.hidden = false; info.replaceChildren(el('span', { class: 'ic' }, icon('search')), el('div', null, el('b', null, t), x ? el('p', null, rich(x)) : null, q ? el('blockquote', null, rich(q)) : null)); } };
      const stage = el('div', { class: 'stage' });
      w.append(el('section', { class: 'lesson ' + h, id: d.id || null }, d.ask ? el('div', { class: 'lhead' }, el('div', { class: 'ltile' }, icon(d.icon || 'spark')), el('div', null, el('h3', null, d.ask), d.lead ? el('p', { class: 'lead' }, rich(d.lead)) : null)) : null,
        (d.takeaway || d.hook) ? el('div', { class: 'answerrow' }, d.takeaway ? el('div', { class: 'takeaway' }, icon('spark'), rich(d.takeaway)) : el('div'), d.hook ? el('div', { class: 'hook' }, el('small', null, 'Memory hook'), rich(d.hook)) : null) : null,
        stage, info));
      try { G.R[d.type](d, stage, ctx); } catch (e) { console.error(e); stage.append(el('p', { class: 'hint' }, 'This part could not be drawn.')); }
    });
    if (P.after) P.after(w);
    S.visit({ href: P.href, title: P.title, sub: P.chip || '', kind: P.on || 'page' });
    document.body.append(footer());
  }

  /* ================= boot ================= */
  function boot() {
    const app = document.getElementById('app');
    if (!app) return;
    app.className = 'site';
    try {
      if (window.CHAPTER) chapter(window.CHAPTER, app);
      else if (window.PAGE === 'home') home(app);
      else if (window.PAGE === 'practice') practice(app);
      else if (window.PAGE === 'revise') revise(app);
      else if (window.PAGE === 'history') historyPage(app);
      else if (window.STATIC) staticPage(app, window.STATIC);
    } catch (e) { console.error(e); app.append(el('p', { class: 'hint' }, 'Something went wrong drawing this page: ' + e.message)); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
