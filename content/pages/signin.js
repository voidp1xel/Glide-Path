/* Sign in: Google sign-in via Firebase (assets/sync.js). Works once assets/firebase-config.js has a project config. */
window.STATIC = {
  on: 'signin', href: 'signin.html', icon: 'user', hue: 'h1', chip: 'Account',
  title: 'Sign in',
  big: 'Sign in to keep your progress, history and plans in sync across your laptop and phone.',
  blocks: [],
  after(w) {
    const { el, url } = G;
    const card = el('section', { class: 'signin-card' }); w.append(card);
    const configured = !!window.GLIDEPATH_FIREBASE;
    function draw() {
      const s = G.sync; const u = s && s.user;
      if (u) {
        card.replaceChildren(el('h2', null, 'Signed in'), el('p', null, u.displayName ? u.displayName + ' · ' : '', u.email || ''),
          el('p', { class: 'hint' }, 'Sync status: ' + (s.status || '…')),
          el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: () => s.signIn() }, 'Sign out'), el('a', { class: 'btn ghost', href: url('settings.html') }, 'Settings')));
        return;
      }
      card.replaceChildren(
        el('h2', null, 'Welcome back'),
        el('p', { class: 'hint' }, 'Your progress is always saved on this device. Signing in adds a copy in the cloud and keeps devices in step.'),
        el('button', { class: 'btn dark signin-g', disabled: configured && s ? null : true, onclick: () => s && s.signIn() },
          el('span', { class: 'g', html: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/></svg>' }),
          'Continue with Google'),
        configured ? (s ? null : el('p', { class: 'hint' }, 'Connecting…')) :
          el('div', { class: 'signin-note' }, el('b', null, 'Sign-in is not switched on yet'),
            el('p', null, 'It needs a free Firebase project: create one, add a Web app, enable Google sign-in and Firestore, then paste the config into assets/firebase-config.js. Until then everything works offline on this device.')));
    }
    draw();
    /* sync.js loads as a module after this page; redraw when it is ready */
    let n = 0; const t = setInterval(() => { if (G.sync || ++n > 20) { clearInterval(t); draw(); } }, 250);
  },
};
