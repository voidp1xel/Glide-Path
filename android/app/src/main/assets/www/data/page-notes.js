/* My notes: everything written in the chapter notes panels, in one place. */
window.STATIC = {
  on: 'notes', href: 'notes.html', icon: 'pen', hue: 'h4', chip: 'Your notes',
  title: 'My notes',
  big: 'Every note you have written on a chapter. Open a chapter and tap Notes (bottom left) to add more.',
  blocks: [],
  after(w) {
    const { el, S, url, fmtAgo } = G;
    const s = S.state; s.notes = s.notes || {};
    const q = el('input', { class: 'tj-q', type: 'search', placeholder: 'Search your notes…' });
    const list = el('div', { class: 'nt-list' });
    w.append(el('div', { class: 'tj-bar' }, q), list);
    function draw() {
      const t = q.value.trim().toLowerCase();
      const items = Object.entries(s.notes).filter(([, n]) => n && n.text && (!t || n.text.toLowerCase().includes(t) || (n.title || '').toLowerCase().includes(t))).sort((a, b) => b[1].t - a[1].t);
      list.replaceChildren(...(items.length ? items.map(([id, n]) => el('section', { class: 'nt-card' },
        el('div', { class: 'nt-h' }, el('a', { href: url(n.href || ('chapters/' + id + '.html')) }, el('b', null, n.title || id), el('small', null, (n.sub || '') + (fmtAgo ? ' · ' + fmtAgo(n.t) : ''))),
          el('button', { class: 'btn ghost', onclick: () => { if (confirm('Delete this note?')) { delete s.notes[id]; S.save(); draw(); } } }, 'Delete')),
        el('pre', { class: 'nt-body' }, n.text))) : [el('p', { class: 'hint' }, t ? 'No notes match.' : 'No notes yet. Open any chapter and tap the Notes button at the bottom left.')]));
    }
    q.addEventListener('input', draw); draw();
  },
};
