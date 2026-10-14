/* Study dashboard: streak, activity heatmap, accuracy per subject/chapter, weak spots, exam readiness, flashcards due.
   Everything is computed from the saved state (days, qa, seen, exams, cards); nothing new is recorded here. */
window.STATIC = {
  on: 'dashboard', href: 'dashboard.html', icon: 'gauge', hue: 'h0', chip: 'Your progress',
  title: 'Dashboard',
  big: 'Where you stand for each DGCA paper: how much you have covered, how accurate you are, which chapters need work, and how consistently you study.',
  blocks: [],
  after(w) {
    const { el, icon, S, url, dayKey } = G;
    const s = S.state, SITE = window.SITE || { subjects: [] };
    const DAY = 864e5, today = new Date(); today.setHours(0, 0, 0, 0);
    const key = d => dayKey(d.getTime());
    const secs = d => s.days[key(d)] || 0, qs = d => s.days['q' + key(d)] || 0;
    const active = d => secs(d) >= 120 || qs(d) > 0;

    /* streak */
    let streak = 0; for (let d = new Date(today); ; d = new Date(d - DAY)) { if (active(d)) streak++; else if (+d !== +today) break; if (streak > 3650) break; }
    let best = 0, run = 0; const first = Object.keys(s.days).filter(k => /^\d{4}-/.test(k)).sort()[0];
    if (first) for (let d = new Date(first + 'T00:00:00'); d <= today; d = new Date(+d + DAY)) { run = active(d) ? run + 1 : 0; best = Math.max(best, run); }
    let wk = 0, wq = 0; for (let i = 0; i < 7; i++) { const d = new Date(today - i * DAY); wk += secs(d); wq += qs(d); }
    const hm = x => x >= 3600 ? Math.floor(x / 3600) + ' h ' + Math.round(x % 3600 / 60) + ' m' : Math.round(x / 60) + ' min';

    /* per-chapter accuracy and coverage */
    const subs = SITE.subjects.map(sub => {
      const chs = sub.chapters.map(c => {
        const pre = (c.bank || c.id) + '#';
        const recs = Object.entries(s.qa).filter(([k]) => k.startsWith(pre)).map(([, r]) => r);
        const tried = recs.length, right = recs.filter(r => r.ok).length;
        const seen = (s.seen[c.id] || []).length;
        return { ...c, tried, right, acc: tried ? right / tried : null, cover: c.ln ? Math.min(1, seen / c.ln) : 0, qcover: c.qn ? tried / c.qn : 0 };
      });
      const tried = chs.reduce((a, c) => a + c.tried, 0), right = chs.reduce((a, c) => a + c.right, 0), qn = chs.reduce((a, c) => a + (c.qn || 0), 0);
      const cover = chs.length ? chs.reduce((a, c) => a + c.cover, 0) / chs.length : 0;
      const acc = tried ? right / tried : 0, qcover = qn ? tried / qn : 0;
      const exams = (s.exams || []).filter(x => x.subj === sub.id);
      // readiness: accuracy matters most, but only counts as far as you have actually practised
      const ready = Math.round(100 * (0.25 * cover + 0.25 * qcover + 0.5 * acc * Math.min(1, qcover * 2)));
      return { ...sub, chs, tried, right, qn, acc, cover, qcover, ready, lastExam: exams[0] };
    });

    /* ---- top numbers ---- */
    const cards = s.cards || {}, dueCards = Object.values(cards).filter(r => r.due <= Date.now()).length;
    const totalTried = subs.reduce((a, x) => a + x.tried, 0), totalRight = subs.reduce((a, x) => a + x.right, 0);
    w.append(el('div', { class: 'db-top' },
      tile('zap', 'h4', streak + (streak === 1 ? ' day' : ' days'), 'study streak', best > streak ? 'best ' + best : streak ? 'keep it going' : 'study today to start one'),
      tile('clock', 'h0', hm(wk), 'studied this week', wq + ' questions answered'),
      tile('check', 'h1', totalTried ? Math.round(totalRight / totalTried * 100) + '%' : '—', 'overall accuracy', totalTried + ' questions tried'),
      el('a', { class: 'db-tile h3', href: url('flashcards.html') }, el('span', { class: 'ic' }, icon('layers')), el('b', null, dueCards), el('span', null, 'flashcards due'), el('small', null, (n => n + (n === 1 ? ' card' : ' cards') + ' started →')(Object.keys(cards).length)))));
    function tile(ic, h, big, lab, sub) { return el('div', { class: 'db-tile ' + h }, el('span', { class: 'ic' }, icon(ic)), el('b', null, big), el('span', null, lab), el('small', null, sub)); }

    /* ---- heatmap: last 20 weeks ---- */
    const weeks = 26, start = new Date(today - ((weeks - 1) * 7 + today.getDay()) * DAY);
    const cells = [];
    for (let d = new Date(start); d <= today; d = new Date(+d + DAY)) {
      const m = secs(d) / 60, lvl = !active(d) ? 0 : m < 20 ? 1 : m < 45 ? 2 : m < 90 ? 3 : 4;
      cells.push(el('i', { class: 'l' + lvl, style: { gridRow: d.getDay() + 1 }, title: `${d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}: ${Math.round(m)} min, ${qs(d)} questions` }));
    }
    w.append(el('div', { class: 'sechead' }, el('h2', null, 'Consistency'), el('span', { class: 'hint' }, 'every square is a day; darker = longer'),),
      el('section', { class: 'lesson h1' }, el('div', { class: 'stage' }, el('div', { class: 'db-heat' }, cells),
        el('div', { class: 'db-legend' }, 'Less', [0, 1, 2, 3, 4].map(l => el('i', { class: 'l' + l })), 'More'))));

    /* ---- readiness per paper ---- */
    w.append(el('div', { class: 'sechead', id: 'readiness' }, el('h2', null, 'Exam readiness'), el('span', { class: 'hint' }, 'coverage of lessons and questions, weighted by your accuracy; the pass mark is 70%')));
    w.append(el('div', { class: 'db-subs' }, subs.map(x => {
      const R = 54, C = 2 * Math.PI * R, pct = Math.min(100, x.ready);
      const ring = G.sv('svg', { viewBox: '0 0 140 140', class: 'db-ring' },
        G.sv('circle', { cx: 70, cy: 70, r: R, fill: 'none', stroke: 'var(--wash)', 'stroke-width': 14 }),
        G.sv('circle', { cx: 70, cy: 70, r: R, fill: 'none', stroke: pct >= 70 ? 'var(--ok)' : pct >= 40 ? 'var(--num)' : 'var(--warn)', 'stroke-width': 14, 'stroke-linecap': 'round', 'stroke-dasharray': `${C * pct / 100} ${C}`, transform: 'rotate(-90 70 70)', class: 'db-arc' }),
        G.sv('text', { x: 70, y: 76, 'text-anchor': 'middle', style: 'font:800 28px var(--head);fill:var(--ink)' }, pct + '%'));
      const msg = !x.tried ? 'Not started: open chapter 1 and do its question bank.' : x.acc < 0.7 ? `Accuracy ${Math.round(x.acc * 100)}% is under the 70% pass mark: redo your mistakes first.` : x.qcover < 0.5 ? 'Accuracy is good: now cover more of the question banks.' : 'On track: take a full timed mock.';
      return el('div', { class: 'db-sub' }, ring, el('div', null, el('b', null, x.name),
        el('div', { class: 'db-kv' }, kv('Lessons covered', Math.round(x.cover * 100) + '%'), kv('Questions tried', `${x.tried} / ${x.qn}`), kv('Accuracy', x.tried ? Math.round(x.acc * 100) + '%' : '—'), kv('Last mock', x.lastExam ? x.lastExam.pc + '% ' + (x.lastExam.pass ? '✓' : '✗') : 'none yet')),
        el('p', { class: 'hint' }, msg)));
    })));
    function kv(k, v) { return el('div', null, el('span', null, k), el('b', null, v)); }

    /* ---- weak spots ---- */
    const weak = subs.flatMap(x => x.chs.filter(c => c.tried >= 5 && c.acc < 0.8).map(c => ({ ...c, subShort: x.short }))).sort((a, b) => a.acc - b.acc).slice(0, 8);
    const untouched = subs.flatMap(x => x.chs.filter(c => !c.tried && c.qn).map(c => ({ ...c, subShort: x.short }))).slice(0, 6);
    w.append(el('div', { class: 'sechead' }, el('h2', null, 'Work on these next')));
    w.append(el('div', { class: 'db-two' },
      el('div', { class: 'db-list' }, el('h3', null, 'Weakest chapters'), weak.length ? weak.map(c => el('a', { href: url(c.href + '#test') }, el('span', { class: 'db-pc ' + (c.acc < 0.6 ? 'bad' : 'mid') }, Math.round(c.acc * 100) + '%'), el('span', null, `${c.subShort} ${c.n}. ${c.title}`), el('small', null, `${c.right}/${c.tried}`))) : el('p', { class: 'hint' }, 'Answer at least 5 questions in a chapter to see it here.')),
      el('div', { class: 'db-list' }, el('h3', null, 'Not practised yet'), untouched.length ? untouched.map(c => el('a', { href: url(c.href + '#test') }, el('span', { class: 'db-pc' }, c.qn + ' Q'), el('span', null, `${c.subShort} ${c.n}. ${c.title}`), el('small', null, 'start'))) : el('p', { class: 'hint' }, 'Every chapter bank has been started.'))));

    /* ---- per-chapter table ---- */
    w.append(el('div', { class: 'sechead' }, el('h2', null, 'Every chapter')));
    subs.forEach(x => w.append(el('details', { class: 'gd-trap' }, el('summary', null, x.name, el('span', { class: 'c' }, `${x.chs.length} chapters`)),
      el('div', { class: 'db-chs' }, x.chs.map(c => el('a', { href: url(c.href) }, el('span', { class: 'n' }, String(c.n).padStart(2, '0')), el('span', { class: 't' }, c.title),
        el('span', { class: 'db-mini', title: 'lessons seen' }, el('i', { style: { width: Math.round(c.cover * 100) + '%' } })),
        el('span', { class: 'a ' + (c.acc == null ? '' : c.acc >= 0.7 ? 'ok' : 'bad') }, c.acc == null ? '—' : Math.round(c.acc * 100) + '%')))))));
  },
};
