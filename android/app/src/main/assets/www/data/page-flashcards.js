/* Flashcards with spaced repetition (Leitner boxes). Decks come from the Flight bag (values, formulas, revision tables)
   and from questions answered wrongly. Progress is stored in state.cards { id: { b, due, n, t } }. */
window.STATIC = {
  on: 'flashcards', href: 'flashcards.html', icon: 'layers', hue: 'h1', chip: 'Active recall',
  title: 'Flashcards',
  big: 'Every value, formula and table fact from the books as a card. Say the answer, flip, and rate yourself: cards you know come back in days, cards you miss come back today.',
  blocks: [],
  after(w) {
    const { el, icon, S, url, toast } = G;
    const st = S.state; st.cards = st.cards || {};
    const DAY = 864e5, GAPS = [0, 1, 2, 4, 8, 16, 32, 64]; // days per box
    const strip = h => String(h == null ? '' : h).replace(/<[^>]+>/g, '').replace(/\*\*/g, '').trim();
    const hid = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return 'c' + (h >>> 0).toString(36); };

    /* ---- build the cards ---- */
    const decks = []; // { id, sub, title, kind, cards: [] }
    for (const sub of (window.REVISE || { subjects: [] }).subjects) {
      const subName = ((window.SITE || {}).subjects || []).find(s => s.id === sub.id)?.name || sub.short;
      for (const sec of sub.sections) {
        const cards = [];
        for (const r of sec.rows || []) if (r.k && r.v) cards.push({ f: strip(r.k), b: strip(r.v), n: strip(r.n), kind: 'Value' });
        for (const f of sec.formulas || []) if (f.name && f.eq) cards.push({ f: strip(f.name), b: f.eq, n: strip(f.note), kind: 'Formula', html: true });
        for (const t of sec.tables || []) for (const row of t.rows || []) (row.cells || []).forEach((c, j) => {
          const v = strip(typeof c === 'object' ? c.v : c); const col = (t.cols || [])[j];
          if (v && v !== '—' && row.label && col) cards.push({ f: `${strip(row.label)} → ${strip(col)}`, b: v, n: strip(t.ask || t.title), kind: 'Table' });
        });
        cards.forEach(c => { c.id = hid(sub.id + '|' + c.f + '|' + c.b); c.src = sec.title; c.href = sec.href; });
        if (cards.length) decks.push({ id: sub.id + ':' + sec.title, sub: sub.id, subName, title: sec.title, href: sec.href, hue: sec.hue, cards });
      }
    }
    const all = new Map(); decks.forEach(d => d.cards.forEach(c => all.set(c.id, c)));
    const now = () => Date.now();
    const rec = id => st.cards[id];
    const isDue = c => { const r = rec(c.id); return !r || r.due <= now(); };
    const isNew = c => !rec(c.id);
    const learned = c => { const r = rec(c.id); return r && r.b >= 3; };

    /* ---- UI ---- */
    const top = el('div', { class: 'fc-top' }); const body = el('div');
    w.append(top, body);
    const subs = [...new Map(decks.map(d => [d.sub, d.subName])).entries()];
    let curSub = S.pref('fc_sub') || (subs[0] || [])[0];

    function stats(list) { return { due: list.filter(c => isDue(c) && !isNew(c)).length, fresh: list.filter(isNew).length, learned: list.filter(learned).length, total: list.length }; }
    function home() {
      const allCards = [...all.values()], s = stats(allCards);
      top.replaceChildren(el('div', { class: 'fc-sum' },
        el('div', null, el('b', null, s.due), el('span', null, 'due for review')), el('div', null, el('b', null, s.fresh), el('span', null, 'new cards')),
        el('div', null, el('b', null, s.learned), el('span', null, 'well learned')), el('div', null, el('b', null, s.total), el('span', null, 'cards in total')),
        el('button', { class: 'btn dark', onclick: () => study('Today\'s review', allCards, 40) }, icon('play'), s.due ? `Review ${Math.min(40, s.due + Math.min(10, s.fresh))} now` : 'Learn 20 new cards'),
        el('button', { class: 'btn', onclick: mistakes }, icon('alert'), 'My mistakes')));
      const tabs = el('div', { class: 'subjtabs' }, subs.map(([id, n]) => el('button', { class: id === curSub ? 'on' : '', onclick: () => { curSub = id; S.pref('fc_sub', id); home(); } }, n, el('small', null, decks.filter(d => d.sub === id).reduce((a, d) => a + d.cards.length, 0) + ' cards'))));
      const grid = el('div', { class: 'fc-decks' }, decks.filter(d => d.sub === curSub).map((d, i) => {
        const x = stats(d.cards), pct = Math.round(x.learned / x.total * 100);
        return el('button', { class: 'fc-deck h' + ((d.hue ?? i) % 6), onclick: () => study(d.title, d.cards) },
          el('b', null, d.title), el('span', null, `${x.total} cards · ${x.due ? x.due + ' due' : x.fresh ? x.fresh + ' new' : 'all caught up'}`),
          el('div', { class: 'fc-bar' }, el('i', { style: { width: pct + '%' } })), el('small', null, pct + '% learned'));
      }));
      body.replaceChildren(tabs, grid, el('p', { class: 'hint', style: { marginTop: '14px' } }, 'Rate honestly: Again = blank or wrong, Hard = slow or partly right, Good = right, Easy = instant. Keys: Space to flip, 1–4 to rate.'));
    }

    async function mistakes() {
      const wrong = Object.entries(st.qa || {}).filter(([, r]) => r && r.ok === false).map(([k]) => k);
      if (!wrong.length) { toast('No wrong answers yet: practise a chapter bank first'); return; }
      const banks = [...new Set(wrong.map(k => k.split('#')[0]))];
      toast('Loading your mistakes…');
      await Promise.all(banks.map(b => (window.QB && window.QB[b]) ? null : G.loadScript(url('data/qb/' + b + '.js')).catch(() => null)));
      const cards = [];
      for (const k of wrong) { const [b, n] = k.split('#'); const q = window.QB && window.QB[b] && window.QB[b].qs.find(x => String(x.n) === n); if (!q) continue;
        cards.push({ id: 'q:' + k, f: q.q, opts: q.o, b: `(${'abcd'[q.a]}) ${q.o[q.a]}`, n: q.ex ? strip(q.ex) : '', kind: 'Question', src: window.QB[b].title }); }
      cards.forEach(c => all.set(c.id, c));
      study('My mistakes', cards, 50, true);
    }

    function study(title, pool, max = 30, keepAll) {
      const due = pool.filter(c => isDue(c) && !isNew(c)).sort((a, b) => rec(a.id).due - rec(b.id).due);
      const fresh = pool.filter(isNew);
      let q = keepAll ? pool.slice() : due.concat(fresh.slice(0, Math.max(10, max - due.length))).slice(0, max);
      if (!q.length) { toast('Nothing due here. Come back later or pick another deck.'); return; }
      let i = 0, flipped = false; const done = { again: 0, hard: 0, good: 0, easy: 0 };
      const card = el('div', { class: 'fc-card' }), bar = el('div', { class: 'fc-prog' }, el('i')), grade = el('div', { class: 'fc-grade' });
      const head = el('div', { class: 'fc-head' }, el('button', { class: 'pill', onclick: () => { document.removeEventListener('keydown', key); home(); } }, '← Decks'), el('b', null, title), el('span', { class: 'hint' }));
      top.replaceChildren(); body.replaceChildren(head, bar, card, grade);
      function show() {
        if (i >= q.length) return finish();
        const c = q[i]; flipped = false;
        head.lastChild.textContent = `${i + 1} / ${q.length}`; bar.firstChild.style.width = (i / q.length * 100) + '%';
        const back = el('div', { class: 'fc-face fc-back' }, el('small', null, c.kind), el('div', { class: 'fc-restate' }, c.f), c.html ? el('div', { class: 'fc-ans', html: c.b }) : el('div', { class: 'fc-ans' }, c.b), c.n ? el('p', null, c.n) : null, c.src ? el('em', null, c.src) : null);
        const front = el('div', { class: 'fc-face fc-front' }, el('small', null, [c.kind, c.src, isNew(c) ? 'new' : ''].filter(Boolean).join(' · ')), el('div', { class: 'fc-q' }, c.f),
          c.opts ? el('ol', { type: 'a' }, c.opts.map(o => el('li', null, o))) : null, el('span', { class: 'fc-tap' }, 'Say it, then tap to flip'));
        card.className = 'fc-card'; card.replaceChildren(el('div', { class: 'fc-inner' }, front, back)); card.onclick = flip;
        grade.replaceChildren(el('button', { class: 'btn dark', onclick: flip }, 'Show answer'));
      }
      function flip() {
        if (flipped) return; flipped = true; card.classList.add('flipped');
        const c = q[i], r = rec(c.id) || { b: 0 };
        const lab = (b) => { const d = GAPS[Math.min(b, GAPS.length - 1)]; return d < 1 ? 'today' : d === 1 ? '1 day' : d + ' days'; };
        grade.replaceChildren(...[['again', 'Again', 1, '10 min'], ['hard', 'Hard', 2, lab(Math.max(1, r.b))], ['good', 'Good', 3, lab(r.b + 1)], ['easy', 'Easy', 4, lab(r.b + 2)]]
          .map(([k, t, n, when]) => el('button', { class: 'fc-g ' + k, onclick: e => { e.stopPropagation(); rate(k); } }, el('b', null, t), el('small', null, when), el('kbd', null, n))));
      }
      function rate(k) {
        const c = q[i], r = rec(c.id) || { b: 0, n: 0 };
        const b = k === 'again' ? 0 : k === 'hard' ? Math.max(1, r.b) : k === 'good' ? r.b + 1 : r.b + 2;
        const due = k === 'again' ? now() + 10 * 60e3 : now() + GAPS[Math.min(b, GAPS.length - 1)] * DAY;
        st.cards[c.id] = { b, due, n: (r.n || 0) + 1, t: now() }; S.save(); done[k]++;
        if (k === 'again') q.push(c); // see it again this session
        i++; show();
      }
      function finish() {
        document.removeEventListener('keydown', key);
        bar.firstChild.style.width = '100%';
        const tot = done.again + done.hard + done.good + done.easy;
        card.className = 'fc-card done'; card.onclick = null;
        card.replaceChildren(el('div', { class: 'fc-done' }, el('div', { class: 'fc-big' }, '✓'), el('b', null, 'Session done'),
          el('p', null, `${tot} reviews · ${done.good + done.easy} right first time · ${done.again} to repeat later`)));
        grade.replaceChildren(el('button', { class: 'btn dark', onclick: home }, 'Back to decks'));
        S.visit({ href: 'flashcards.html', title: 'Flashcards', sub: title + ' · ' + tot + ' reviews', kind: 'flashcards' });
      }
      function key(e) {
        if (e.target.matches('input,textarea')) return;
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
        else if (flipped && '1234'.includes(e.key)) rate(['again', 'hard', 'good', 'easy'][+e.key - 1]);
      }
      document.addEventListener('keydown', key);
      show();
    }
    home();
  },
};
