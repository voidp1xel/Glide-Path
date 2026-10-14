/* Shown by the host for any missing URL (served from the site root, so links are root-absolute). */
window.STATIC = {
  on: '', href: '404.html', icon: 'compass', hue: 'h2', chip: 'Off track',
  title: 'This page isn\'t on the chart',
  big: 'The link may be old, or the chapter not written yet. Search for the topic, or pick up where you left off.',
  blocks: [],
  after(w) {
    const { el, icon, S } = G;
    const s = S.state, last = (s.hist || []).find(h => h.kind === 'chapter') || null;
    const go = (h, ic, t, x) => el('a', { class: 'tile h0', href: '/' + h }, el('span', { class: 'ic' }, icon(ic)), el('span', null, el('b', null, t), el('small', null, x)));
    const q = el('input', { type: 'search', placeholder: 'Search topics, e.g. tropopause, QNH, PNR…', 'aria-label': 'Search' });
    q.addEventListener('keydown', e => { if (e.key === 'Enter' && q.value.trim()) location.href = '/index.html#q=' + encodeURIComponent(q.value.trim()); });
    w.append(el('div', { class: 'nf-search' }, icon('search'), q),
      el('div', { class: 'tiles', style: { marginTop: '18px' } },
        last ? go(last.href, 'history', 'Resume: ' + last.title, 'Where you left off') : null,
        go('index.html#chapters', 'book', 'All chapters', 'Meteorology, Navigation and more'),
        go('practice.html', 'check', 'Practice', 'Question banks and mock exams'),
        go('dashboard.html', 'gauge', 'Dashboard', 'Your progress')));
  },
};
