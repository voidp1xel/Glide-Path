/* Mind maps: each subject as one picture, then every chapter's map. Data: window.MINDMAPS (built from the chapters' mindmap lessons). */
window.STATIC = {
  on: 'mindmaps', href: 'mindmaps.html', icon: 'brain', hue: 'h3', chip: 'Revision',
  title: 'Mind maps',
  big: 'Each subject as one picture, then every chapter on a single page. Use them for a fast recap: say each branch out loud before you look at its leaves.',
  blocks: [],
  after(w) {
    const { el, icon, S, url } = G;
    const MM = window.MINDMAPS || [];
    const subs = [...new Map(MM.map(m => [m.sub, m.subName])).entries()];
    if (!subs.length) { w.append(el('p', { class: 'hint' }, 'No mind maps yet.')); return; }
    let cur = (location.hash.slice(1) && subs.some(s => s[0] === location.hash.slice(1))) ? location.hash.slice(1) : (S.pref('mm_sub') || subs[0][0]);
    if (!subs.some(s => s[0] === cur)) cur = subs[0][0];

    const tabs = el('div', { class: 'subjtabs' });
    const overview = el('section', { class: 'lesson h3', id: 'overview' });
    const grid = el('div', { class: 'mm-grid' });
    w.append(tabs, overview, el('div', { class: 'sechead', id: 'chapters' }, el('h2', null, 'Chapter by chapter'), el('span', { class: 'hint' }, 'Tap a chapter to open its map full size.')), grid);

    function stageFor(sec, lead) {
      const info = el('div', { class: 'infobar', hidden: true });
      const ctx = { hueStart: 0, info: (t, x) => { info.hidden = false; info.replaceChildren(el('span', { class: 'ic' }, icon('search')), el('div', null, el('b', null, t), x ? el('p', null, G.rich(x)) : null)); } };
      const st = el('div', { class: 'stage' });
      sec.append(st, info);
      return [st, ctx];
    }
    function open(m, list) {
      let i = list.indexOf(m);
      const body = el('div');
      const prev = el('button', { class: 'pill', onclick: () => go(-1) }, '← Previous');
      const next = el('button', { class: 'pill', onclick: () => go(1) }, 'Next →');
      const link = el('a', { class: 'pill ink' }, 'Open chapter', icon('right'));
      const md = G.modal({ title: '', tools: [prev, next, link], body });
      md.dlg.classList.add('mm-modal');
      function draw() {
        const x = list[i];
        md.setTitle(`${x.n}. ${x.ch}`);
        md.setCount(`${i + 1} of ${list.length}`);
        link.href = url(x.href + '#' + x.id);
        prev.disabled = i === 0; next.disabled = i === list.length - 1;
        body.replaceChildren();
        const [st, ctx] = stageFor(body);
        G.R.mindmap({ root: x.root, chapterHref: x.href }, st, ctx);
      }
      function go(d) { i = Math.max(0, Math.min(list.length - 1, i + d)); draw(); }
      md.dlg.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });
      draw();
    }
    function draw() {
      tabs.replaceChildren(...subs.map(([id, name]) => el('button', { class: id === cur ? 'on' : '', onclick: () => { cur = id; S.pref('mm_sub', id); history.replaceState(null, '', '#' + id); draw(); } }, name, el('small', null, MM.filter(m => m.sub === id).length + ' maps'))));
      const list = MM.filter(m => m.sub === cur);
      const name = (subs.find(s => s[0] === cur) || [])[1];
      // subject overview: chapters as branches, their main branches as leaves
      overview.replaceChildren(el('div', { class: 'lhead' }, el('div', { class: 'ltile' }, icon('brain')), el('div', null, el('h3', null, name + ' on one page'), el('p', { class: 'lead' }, 'Every chapter at a glance. Tap a chapter to open its map; in a map, tap any bubble for a detailed explanation.'))));
      const [st, ctx] = stageFor(overview);
      ctx.explain = node => { const m = list.find(x => `${x.n}. ${x.ch}` === node.label); if (m) open(m, list); };
      G.R.mindmap({ root: { label: name, children: list.map(m => ({ label: `${m.n}. ${m.ch}`, tip: 'Covers: ' + (m.root.children || []).map(c => c.label).join(', ') + '.' })) } }, st, ctx);
      grid.replaceChildren(...list.map((m, k) => el('button', { class: 'mm-card h' + ((m.hue ?? k) % 6), onclick: () => open(m, list) },
        el('div', { class: 'top2' }, el('span', { class: 'num' }, String(m.n).padStart(2, '0')), el('span', { class: 'ico' }, icon(m.icon || 'brain'))),
        el('b', null, m.ch),
        el('div', { class: 'mm-branches' }, (m.root.children || []).slice(0, 6).map(c => el('span', null, c.label))),
        el('span', { class: 'mm-open' }, 'Open map', icon('right')))));
    }
    draw();
  },
};
