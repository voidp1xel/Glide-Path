/* How DGCA asks: the CPL ground-exam format, the 2026 calendar (official DGCA programme), how the book questions are
   phrased (counted from this site's banks), the traps from every chapter, and exam-day technique. */
window.STATIC = {
  on: 'guide', href: 'guide.html', icon: 'target', hue: 'h5', chip: 'DGCA CPL ground exams',
  title: 'How DGCA asks',
  big: 'The papers, the rules that are certain, the 2026 exam calendar, how the questions are actually phrased, and the traps every chapter keeps setting.',
  blocks: [
    { heading: 'The rules', id: 'rules', sub: 'what is certain, and what to confirm on your admit card' },
    { type: 'numbers', icon: 'hash', ask: 'Numbers that decide your result',
      takeaway: 'Each paper is passed on its own at 70%, with no negative marking, so never leave a question blank. A pass stays valid for five years.',
      items: [
        { k: 'Pass mark', v: '70%', note: 'per paper, no aggregate' },
        { k: 'Negative marking', v: 'None', note: 'answer every question' },
        { k: 'Score shown as', v: '/ 100', note: 'e.g. "74/100" on DGCA result sheets' },
        { k: 'Format', v: 'Online MCQ', note: 'computer-based, at DGCA centres' },
        { k: 'Regular sessions', v: '4 / year', note: '2026: Mar, Jun, Sep, Dec' },
        { k: 'On-demand (OLOD)', v: '8 / year', note: 'higher fee, limited seats' },
        { k: 'Validity of a pass', v: '5 years', note: 'reported by training guides' },
        { k: 'Retake', v: 'Failed only', note: 're-sit just the failed paper; passes are kept' },
      ] },
    { html: '<blockquote><strong>Question count and duration:</strong> guides disagree. Most report <b>Meteorology and Air Regulations ≈ 50 questions in about 2 h</b> and <b>Air Navigation ≈ 100 questions in about 3 h</b>, while others give 100 questions for every paper. DGCA sets these per session: <b>the numbers on your admit card and the Pariksha notice board are the ones to trust</b>. The mock exams on this site use 50 / 2 h (Met, Regs) and 100 / 3 h (Nav).</blockquote>' },
    { type: 'matrix', icon: 'list', ask: 'The CPL papers', id: 'papers', revise: false,
      corner: 'Paper', cols: ['What it covers', 'On this site'],
      rows: [
        { label: 'Air Navigation', cells: ['General navigation, maps and charts, time, compasses, instruments, radio aids, flight planning', { v: 'R.K. Bali (in progress)', key: true }] },
        { label: 'Aviation Meteorology', cells: ['Atmosphere to forecasts: everything in I.C. Joshi, incl. METAR/TAF codes and Indian climatology', { v: 'Complete', key: true }] },
        { label: 'Air Regulations', cells: ['ICAO annexes, Aircraft Act/Rules, CARs, rules of the air, ATS, airspace, licensing, human factors', 'R.K. Bali (coming)'] },
        { label: 'Technical General', cells: ['Aerodynamics, engines, systems, instruments, performance: common to all types', 'Aviator\'s Handbook (coming)'] },
        { label: 'Technical Specific', cells: ['The aircraft type you train on (e.g. C172 / DA40 / PA-34)', 'Use your flying school\'s POH'] },
        { label: 'RTR (A)', cells: ['Radio telephony: written plus a practical; recently moved under DGCA', 'Not covered yet'] },
      ] },
    { type: 'pairs', icon: 'target', ask: 'What each paper leans on',
      lead: 'From Cdr Thomas Tom (Aviator\'s Handbook, Appendix A), a DGCA designated examiner.',
      pairs: [
        { a: { label: 'Air Navigation', body: 'Expect **many numerical questions**: practise computations (wind triangle, 1-in-60, PNR/PET, time, convergency) until they are quick.' }, b: { label: 'Technical General', body: 'A huge syllabus. Most questions come from **aerodynamics, engines, propeller theory, piston/propeller performance and airframe**; some from electrics and hydraulics; a few on high-speed flight.' }, rule: 'Numbers decide Navigation; breadth decides Technical General.' },
        { a: { label: 'Technical Specific', body: 'The type you trained on: systems, limitations and performance from its flight manual.' }, b: { label: 'Meteorology & Regulations', body: 'Mostly recall: definitions, values, codes and rules. The Flight bag and flashcards are built for exactly this.' }, rule: '' },
      ] },
    { heading: 'How the questions are phrased', id: 'styles', sub: 'counted from every end-of-chapter question on this site' },
  ],
  after(w) {
    const { el, icon, rich, url } = G;
    const GD = window.GUIDE || {};
    const STY = {
      concept: ['Straight concept', 'Which one is right: the core fact, asked directly.', 'h0'],
      numeric: ['Number / value', 'A figure, range, height or unit is the answer. Learn the Flight bag cold.', 'h4'],
      fill: ['Fill in the blank', 'A sentence from the book with a gap: the exact book wording matters.', 'h3'],
      definition: ['Definition / name', '"…is called", "…known as": the term itself.', 'h1'],
      code: ['Code / abbreviation', 'Decode a METAR, TAF or figure group, or expand an abbreviation.', 'h2'],
      cause: ['Cause and effect', '"…due to", "…results in": the mechanism.', 'h5'],
      tf: ['True / false', 'A statement to judge.', 'h0'],
      not: ['"NOT" / "except"', 'Spot the odd one out. Read the stem twice: the trap is the negative.', 'h5'],
    };
    const tabs = el('div', { class: 'subjtabs' }), box = el('div');
    const ids = Object.keys(GD); let cur = ids[0];
    function draw() {
      tabs.replaceChildren(...ids.map(id => el('button', { class: id === cur ? 'on' : '', onclick: () => { cur = id; draw(); } }, GD[id].name, el('small', null, GD[id].n + ' questions'))));
      const g = GD[cur]; if (!g) return;
      const order = Object.keys(g.styles).sort((a, b) => g.styles[b] - g.styles[a]);
      const max = g.styles[order[0]] || 1;
      const st = el('div', { class: 'stage' });
      st.append(el('div', { class: 'scale' }, order.map((k, i) => el('div', { class: 'bar ' + STY[k][2], title: STY[k][1] },
        el('b', null, STY[k][0]), el('div', null, el('div', { class: 'fill', style: { width: Math.max(3, g.styles[k] / max * 100) + '%' } })),
        el('span', null, Math.round(g.styles[k] / g.n * 100) + '%')))));
      const ex = el('div', { class: 'gd-ex' }, order.filter(k => g.ex[k]).slice(0, 6).map(k => {
        const e = g.ex[k];
        return el('div', { class: 'gd-q ' + STY[k][2] }, el('small', null, STY[k][0] + ' · Ch ' + e.ch), el('p', null, e.q),
          el('ol', { type: 'a' }, (e.o || []).map((o, j) => el('li', { class: j === e.a ? 'ans' : '' }, o))), el('em', null, STY[k][1]));
      }));
      box.replaceChildren(st, el('h3', { class: 'gd-h' }, 'One real example of each style'), ex);
    }
    w.append(el('section', { class: 'lesson h0' }, tabs, box)); draw();

    /* calendar */
    const SESS = [
      ['OLOD 1', '2026-01-21', '2026-01-23'], ['OLOD 2', '2026-02-04', '2026-02-06'], ['Regular 1', '2026-03-10', '2026-03-14'], ['OLOD 3', '2026-04-22', '2026-04-24'],
      ['OLOD 4', '2026-05-20', '2026-05-22'], ['Regular 2', '2026-06-16', '2026-06-20'], ['OLOD 5', '2026-07-15', '2026-07-17'], ['OLOD 6', '2026-08-19', '2026-08-21'],
      ['Regular 3', '2026-09-22', '2026-09-26'], ['OLOD 7', '2026-10-28', '2026-10-30'], ['OLOD 8', '2026-11-18', '2026-11-20'], ['Regular 4', '2026-12-15', '2026-12-19'],
    ];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const D = s => new Date(s + 'T00:00:00');
    const fmt = s => D(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const next = SESS.find(x => D(x[2]) >= today);
    w.append(el('div', { class: 'sechead', id: 'calendar' }, el('h2', null, '2026 exam calendar'), el('span', { class: 'hint' }, 'from the DGCA Programme of Examinations 2026 (dates are tentative; check Pariksha before applying)')));
    w.append(el('section', { class: 'lesson h4' },
      next ? el('div', { class: 'gd-next' }, el('span', { class: 'ic' }, icon('calendar')), el('div', null, el('small', null, 'Next session'), el('b', null, `${next[0]} · ${fmt(next[1])}–${fmt(next[2])}`),
        el('span', null, `${Math.max(0, Math.round((D(next[1]) - today) / 864e5))} days away`))) : el('p', { class: 'hint' }, 'The 2026 sessions are over; the 2027 programme is published on Pariksha around December.'),
      el('div', { class: 'gd-cal' }, SESS.map(x => {
        const past = D(x[2]) < today, isNext = next && x === next;
        return el('div', { class: 'gd-s' + (x[0].startsWith('Regular') ? ' reg' : '') + (past ? ' past' : '') + (isNext ? ' next' : '') }, el('b', null, x[0]), el('span', null, fmt(x[1]) + '–' + fmt(x[2])));
      })),
      el('p', { class: 'hint', style: { marginTop: '12px' } }, 'Regular sessions cost less and cover all papers; OLOD (online on-demand) sessions fill in between at a higher fee with limited seats. Apply on the Pariksha portal after your eGCA profile and computer number are in place.')));

    /* traps */
    w.append(el('div', { class: 'sechead', id: 'traps' }, el('h2', null, 'The traps, chapter by chapter'), el('span', { class: 'hint' }, 'from the "Exam traps" at the end of each chapter\'s notes')));
    const tt = el('div', { class: 'subjtabs' }), tbox = el('div', { class: 'gd-traps' });
    let tc = ids[0];
    function drawT() {
      tt.replaceChildren(...ids.map(id => el('button', { class: id === tc ? 'on' : '', onclick: () => { tc = id; drawT(); } }, GD[id].name, el('small', null, GD[id].traps.length + ' chapters'))));
      tbox.replaceChildren(...GD[tc].traps.map(t => el('details', { class: 'gd-trap' }, el('summary', null, el('span', { class: 'n' }, String(t.n).padStart(2, '0')), t.title, el('span', { class: 'c' }, (t.html.match(/<li/g) || []).length + ' traps')),
        el('div', { class: 'notes', html: t.html }), el('a', { class: 'pill', href: url(t.href) }, 'Open chapter', icon('right')))));
    }
    w.append(tt, tbox); drawT();

    /* technique */
    w.append(el('div', { class: 'sechead', id: 'technique' }, el('h2', null, 'Exam-day technique')));
    const sec = el('section', { class: 'lesson h1' }); const st = el('div', { class: 'stage' }); sec.append(st); w.append(sec);
    G.R.bullets({ groups: [
      { title: 'Before', icon: 'calendar', points: ['Do two full timed mocks on this site in the last week: aim for 85%+, not 70%', 'Revise the Flight bag the night before: numbers decide a third of the paper', 'Carry the admit card, ID; reach the centre early'] },
      { title: 'First pass', icon: 'clock', points: ['Answer what you know at once; mark anything that needs working', 'Read every stem twice when it contains NOT, EXCEPT, INCORRECT', 'Watch units: kt vs km/h, ft vs m, °C vs K, true vs magnetic'] },
      { title: 'Second pass', icon: 'check', points: ['Work the marked questions; eliminate options that are out of range', 'No negative marking: never leave a blank, make your best guess', 'Change an answer only for a clear reason, not a feeling'] },
    ] }, st, { hueStart: 0, info: () => {} });

  },
};
