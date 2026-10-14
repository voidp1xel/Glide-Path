/* ADAPT & cadet selection practice. Engine: assets/adapt.js; banks: assets/adapt-bank.js + adapt-bank2.js (loaded in after()). */
window.STATIC = {
  on: 'adapt', href: 'adapt.html', icon: 'target', hue: 'h4', chip: 'Cadet selection',
  title: 'ADAPT & cadet selection',
  big: 'Timed tests, interview questions and GD topics. Pick one and start.',
  blocks: [
    { html: '<p><a class="btn" href="adapt-guide.html">Guide: selection stages, test formats, test day, STAR & GD scoring →</a></p>' },
    { heading: 'Tests', id: 'centre', sub: 'full-screen, timed, one question at a time, no going back, no calculator' },
    { html: '<div id="ad-dash"><p class="hint">Loading…</p></div>' },
    { heading: 'Interview questions', id: 'interview', sub: 'answer out loud against the 90 s timer, then check the key points' },
    { html: '<div id="ad-iv"><p class="hint">Loading…</p></div>' },
    { heading: 'Group discussion topics', id: 'gd', sub: '2 min to think, 10 min to discuss' },
    { html: '<div id="ad-gd"><p class="hint">Loading…</p></div>' },
  ],
  after() {
    const r = document.documentElement.dataset.root || '.';
    G.loadScript(r + '/assets/adapt-bank.js').then(() => G.loadScript(r + '/assets/adapt-bank2.js')).then(() => G.loadScript(r + '/assets/adapt.js')).then(() => {
      const put = (id, node) => { const x = document.getElementById(id); if (x) x.replaceWith(node); };
      put('ad-dash', G.adapt.dash());
      put('ad-iv', G.adapt.interviewBlock());
      put('ad-gd', G.adapt.gdBlock());
    }).catch(e => { console.error(e); G.toast('Could not load the ADAPT tools'); });
  },
};
