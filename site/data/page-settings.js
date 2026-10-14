/* Settings: appearance, study preferences, profile and your saved data. Everything is stored on this device (and synced when signed in). */
window.STATIC = {
  on: 'settings', href: 'settings.html', icon: 'sliders', hue: 'h0', chip: 'Settings',
  title: 'Settings',
  big: 'Make the site comfortable to study on, and manage your saved progress.',
  blocks: [],
  after(w) {
    const { el, S, toast, url } = G;
    const KEY = 'glidepath-v1';
    const group = (title, rows) => w.append(el('section', { class: 'set-group' }, el('h2', null, title), el('div', { class: 'set-rows' }, rows)));
    const row = (label, sub, control) => el('div', { class: 'set-row' }, el('div', null, el('b', null, label), sub ? el('small', null, sub) : null), control);
    const seg = (opts, cur, onpick) => { const box = el('div', { class: 'seg' }); const draw = c => box.replaceChildren(...opts.map(([v, t]) => el('button', { class: String(v) === String(c) ? 'on' : '', onclick: () => { onpick(v); draw(v); } }, t))); draw(cur); return box; };
    const toggle = (on, onchange) => { const b = el('button', { class: 'set-tg' + (on ? ' on' : ''), role: 'switch', 'aria-checked': String(!!on) }, el('i')); b.onclick = () => { on = !on; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); onchange(on); }; return b; };

    group('Appearance', [
      row('Theme', 'Light or dark', seg([['light', 'Light'], ['dark', 'Dark']], S.pref('theme') || 'light', v => G.setTheme(v))),
      row('Text size', 'Scales the whole site', seg([[0.9, 'Small'], [1, 'Normal'], [1.1, 'Large'], [1.2, 'Larger']], S.pref('textsize') || 1, v => { S.pref('textsize', v); G.applyPrefs(); })),
      row('Reduce motion', 'Turns off animations and smooth scrolling', toggle(!!S.pref('reducemotion'), v => { S.pref('reducemotion', v); G.applyPrefs(); })),
    ]);
    group('Studying', [
      row('Default chapter track', 'Core & Revision hides the ◆ Exam-Ready lessons', seg([['core', 'Core & Revision'], ['exam', '◆ Exam-Ready']], S.pref('track') || 'core', v => S.pref('track', v))),
      row('"You stopped here" banner', 'Offer to jump back to where you left a chapter', toggle(S.pref('resume') !== false, v => S.pref('resume', v))),
    ]);
    const name = el('input', { class: 'set-in', type: 'text', maxlength: 30, placeholder: 'Your name', value: S.pref('name') || '' });
    name.addEventListener('change', () => { S.pref('name', name.value.trim() || null); toast('Saved'); });
    group('Profile', [
      row('Display name', 'Shown in the profile menu', name),
      row('Account', G.sync && G.sync.user ? 'Signed in as ' + G.sync.user.email : 'Sign in to sync progress between devices', el('a', { class: 'btn', href: url('signin.html') }, G.sync && G.sync.user ? 'Manage' : 'Sign in')),
    ]);
    const file = el('input', { type: 'file', accept: 'application/json', hidden: true });
    file.addEventListener('change', () => {
      const f = file.files[0]; if (!f) return;
      f.text().then(t => { const d = JSON.parse(t); if (!d || typeof d !== 'object') throw 0;
        if (!confirm('Replace the progress on this device with the file\'s data?')) return;
        localStorage.setItem(KEY, JSON.stringify(d)); toast('Imported. Reloading…'); setTimeout(() => location.reload(), 600); })
        .catch(() => toast('That file is not a Glidepath backup'));
    });
    group('Your data', [
      row('Export progress', 'Download answers, history, plans and settings as a backup file', el('button', { class: 'btn', onclick: () => {
        S.saveNow(); const blob = new Blob([localStorage.getItem(KEY) || '{}'], { type: 'application/json' });
        const a = el('a', { href: URL.createObjectURL(blob), download: 'glidepath-backup-' + new Date().toISOString().slice(0, 10) + '.json' }); document.body.append(a); a.click(); a.remove();
      } }, 'Export')),
      row('Import progress', 'Restore from a backup file', el('div', null, el('button', { class: 'btn', onclick: () => file.click() }, 'Import'), file)),
      row('Reset everything', 'Deletes all progress on this device. Export first.', el('button', { class: 'btn danger', onclick: () => {
        if (!confirm('Delete all your progress on this device?')) return;
        if (!confirm('Are you sure? This cannot be undone.')) return;
        localStorage.removeItem(KEY); toast('Reset. Reloading…'); setTimeout(() => location.reload(), 600);
      } }, 'Reset')),
    ]);
  },
};
