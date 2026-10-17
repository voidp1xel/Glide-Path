/* Glossary: every defined term in the book notes, A–Z, searchable, each linked to its section. Data: data/glossary.js (built from the notes). */
window.STATIC = {
  on: 'glossary', href: 'glossary.html', icon: 'book', hue: 'h2', chip: 'Glossary',
  title: 'Glossary',
  big: 'Every term the books define, in one place. Search, jump by letter, and tap a term to read it in its chapter.',
  blocks: [],
  after(w) {
    const { el, url, rich } = G;
    G.loadScript(url('data/glossary.js')).then(() => {
      const ALL = window.GLOSSARY || [];
      const subs = ['All', ...new Set(ALL.map(x => x.s.split(' ')[0]))];
      let sub = 'All';
      const q = el('input', { class: 'tj-q', type: 'search', placeholder: 'Search ' + ALL.length + ' terms… (e.g. QNH, inversion, PNR)' });
      const segs = el('div', { class: 'seg' });
      const letters = el('div', { class: 'gl-az' });
      const count = el('p', { class: 'hint' });
      const list = el('div', { class: 'gl-list' });
      w.append(el('div', { class: 'tj-bar' }, q, el('div', { class: 'gl-tools' }, segs, letters)), count, list);
      const first = t => { const c = t.replace(/^[^A-Za-z0-9]+/, '')[0] || '#'; return /[A-Za-z]/.test(c) ? c.toUpperCase() : '#'; };
      function draw() {
        const t = q.value.trim().toLowerCase();
        const rows = ALL.filter(x => (sub === 'All' || x.s.startsWith(sub)) && (!t || x.t.toLowerCase().includes(t) || x.d.toLowerCase().includes(t)));
        count.textContent = rows.length + ' term' + (rows.length === 1 ? '' : 's');
        const groups = new Map(); rows.forEach(x => { const L = first(x.t); if (!groups.has(L)) groups.set(L, []); groups.get(L).push(x); });
        letters.replaceChildren(...[...groups.keys()].map(L => el('button', { class: 'tj-chip', onclick: () => { const g = document.getElementById('gl-' + L); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, L)));
        list.replaceChildren(...[...groups].map(([L, xs]) => el('section', { class: 'gl-group', id: 'gl-' + L }, el('h2', null, L),
          el('dl', null, xs.map(x => [el('dt', null, el('a', { href: url(x.h) }, x.t)), el('dd', null, el('span', null, x.d), el('small', null, x.s + ' · ' + x.ch + (x.sec ? ' · ' + x.sec : '')))])))));
      }
      segs.replaceChildren(...subs.map(s => el('button', { class: s === sub ? 'on' : '', onclick: e => { sub = s; segs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.currentTarget)); draw(); } }, s === 'Nav' ? 'Navigation' : s === 'Met' ? 'Meteorology' : s)));
      q.addEventListener('input', draw);
      const pre = new URLSearchParams(location.search).get('q'); if (pre) q.value = pre;
      draw();
    });
  },
};
