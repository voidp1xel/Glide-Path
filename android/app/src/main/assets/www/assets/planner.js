/* Glidepath personal planner: timeline tasks, weight log, lab tracker, cadet-programme tracker. All saved in localStorage (S.state.plan). */
(function () {
  'use strict';
  const { el, sv, rich, icon, S, toast } = G;
  const P = () => { const s = S.state; s.plan = s.plan || {}; const p = s.plan; p.done = p.done || {}; p.dates = p.dates || {}; p.notes = p.notes || {}; p.custom = p.custom || []; p.weights = p.weights || []; p.labs = p.labs || []; p.cpp = p.cpp || null; return p; };
  const today = () => new Date().toISOString().slice(0, 10);
  const fmt = d => d ? new Date(d + 'T00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const daysTo = d => Math.ceil((new Date(d + 'T00:00') - new Date(today() + 'T00:00')) / 864e5);
  const pl = G.planner = {};

  /* ---------- countdown cards ---------- */
  pl.countdowns = (box, items) => {
    const g = el('div', { class: 'score' });
    items.forEach((it, i) => {
      const d = daysTo(it.date);
      g.append(el('div', { class: 'h' + (it.hue ?? i) }, el('b', null, d >= 0 ? d : '✓'), el('span', null, d >= 0 ? 'days to ' + it.label : it.label + ' (passed)'), el('div', { class: 'hint' }, fmt(it.date))));
    });
    box.append(g);
  };

  /* ---------- timeline with tickable, re-datable tasks ---------- */
  pl.timeline = (box, phases) => {
    const p = P();
    const wrap = el('div', { class: 'tlwrap' });
    const prog = el('div', { class: 'tlprog' });
    box.append(prog, wrap);
    function draw() {
      wrap.replaceChildren();
      let all = 0, done = 0, nextTask = null;
      phases.forEach((ph, pi) => {
        const tasks = ph.tasks.concat(p.custom.filter(c => c.phase === ph.id));
        const nd = tasks.filter(t => p.done[t.id]).length; all += tasks.length; done += nd;
        const card = el('section', { class: 'phase h' + (ph.hue ?? pi) },
          el('div', { class: 'phhead' }, el('span', { class: 'phn' }, pi + 1), el('div', null, el('h3', null, ph.title), el('div', { class: 'hint' }, ph.when + (ph.sub ? ' · ' + ph.sub : ''))), el('span', { class: 'phcount' }, nd + '/' + tasks.length)));
        if (ph.why) card.append(el('p', { class: 'phwhy' }, rich(ph.why)));
        const ul = el('ul', { class: 'tasks' });
        tasks.slice().sort((a, b) => ((p.dates[a.id] || a.due || '9') > (p.dates[b.id] || b.due || '9') ? 1 : -1)).forEach(t => {
          const due = p.dates[t.id] || t.due || '';
          const isDone = !!p.done[t.id];
          const late = !isDone && due && daysTo(due) < 0;
          if (!isDone && due && (!nextTask || due < (p.dates[nextTask.id] || nextTask.due))) nextTask = t;
          const cb = el('input', { type: 'checkbox', checked: isDone, onchange: () => { if (cb.checked) p.done[t.id] = today(); else delete p.done[t.id]; S.save(); draw(); } });
          const date = el('input', { type: 'date', value: due, class: 'tdate', onchange: e => { p.dates[t.id] = e.target.value; S.save(); draw(); } });
          const li = el('li', { class: (isDone ? 'done ' : '') + (late ? 'late' : '') },
            el('label', { class: 'tmain' }, cb, el('span', null, el('b', null, t.title), t.detail ? el('small', null, rich(t.detail)) : null, isDone ? el('small', { class: 'okline' }, '✓ done ' + fmt(p.done[t.id])) : late ? el('small', { class: 'lateline' }, 'overdue by ' + (-daysTo(due)) + ' days') : due ? el('small', { class: 'dueline' }, daysTo(due) + ' days left') : null)),
            el('div', { class: 'tside' }, date, t.custom ? el('button', { class: 'pill', title: 'Delete', onclick: () => { p.custom = p.custom.filter(c => c.id !== t.id); S.save(); draw(); } }, icon('x')) : null));
          ul.append(li);
        });
        card.append(ul);
        const ti = el('input', { placeholder: 'Add your own task to this phase…' }); const td = el('input', { type: 'date' });
        card.append(el('div', { class: 'addtask' }, ti, td, el('button', { class: 'btn ghost', onclick: () => { if (!ti.value.trim()) return; p.custom.push({ id: 'c' + Date.now(), phase: ph.id, title: ti.value.trim(), due: td.value, custom: true }); S.save(); draw(); } }, icon('check'), 'Add')));
        wrap.append(card);
      });
      prog.replaceChildren(el('div', { class: 'tlbar' }, el('i', { style: { width: (all ? done / all * 100 : 0) + '%' } })), el('div', { class: 'row' }, el('b', null, done + ' of ' + all + ' steps done'), el('span', { class: 'spacer' }), nextTask ? el('span', { class: 'hint' }, 'Next due: ', el('b', null, nextTask.title), ' · ' + fmt(p.dates[nextTask.id] || nextTask.due)) : null));
    }
    draw();
  };

  /* ---------- weight log ---------- */
  pl.weight = (box, cfg) => {
    const p = P();
    const h = cfg.height / 100;
    const am = el('input', { type: 'number', step: '0.1', placeholder: 'morning kg' });
    const pm = el('input', { type: 'number', step: '0.1', placeholder: 'night kg (optional)' });
    const d = el('input', { type: 'date', value: today() });
    const chart = el('div'); const stats = el('div', { class: 'score' }); const list = el('div');
    box.append(el('div', { class: 'addtask' }, d, am, pm, el('button', { class: 'btn dark', onclick: () => { const v = parseFloat(am.value); if (!v) { toast('Enter the morning weight'); return; } p.weights = p.weights.filter(w => w.d !== d.value); p.weights.push({ d: d.value, am: v, pm: parseFloat(pm.value) || null }); p.weights.sort((a, b) => a.d > b.d ? 1 : -1); S.save(); am.value = pm.value = ''; draw(); } }, icon('check'), 'Log')), stats, chart, list);
    function draw() {
      const W = p.weights.length ? p.weights : [{ d: cfg.startDate, am: cfg.start, seed: true }];
      const last = W[W.length - 1]; const bmi = last.am / (h * h);
      const avg7 = W.slice(-7).reduce((a, w) => a + w.am, 0) / Math.min(7, W.length);
      const toGo = last.am - cfg.goal;
      const days = daysTo(cfg.goalDate);
      stats.replaceChildren(
        el('div', { class: 'h0' }, el('b', null, last.am.toFixed(1)), 'kg latest (morning)'),
        el('div', { class: bmi < 25 ? 'h1' : 'h4' }, el('b', null, bmi.toFixed(1)), 'BMI · target < 25'),
        el('div', { class: 'h3' }, el('b', null, avg7.toFixed(1)), '7-entry average'),
        el('div', { class: toGo <= 0 ? 'h1' : 'h5' }, el('b', null, toGo > 0 ? '−' + toGo.toFixed(1) : '✓'), toGo > 0 ? 'kg to goal ' + cfg.goal + ' kg · ' + (days > 0 ? (toGo / (days / 7)).toFixed(2) + ' kg/week needed' : 'goal date passed') : 'goal reached'));
      // chart
      const pts = W.map(w => [new Date(w.d).getTime(), w.am]);
      const t0 = Math.min(pts[0][0], new Date(cfg.startDate).getTime()), t1 = Math.max(new Date(cfg.goalDate).getTime(), pts[pts.length - 1][0]);
      const y0 = Math.min(cfg.goal - 1, ...pts.map(q => q[1])) - .5, y1 = Math.max(cfg.start + 1, ...pts.map(q => q[1])) + .5;
      const X = t => 50 + (t - t0) / (t1 - t0) * 580, Y = v => 200 - (v - y0) / (y1 - y0) * 170;
      const bmiKg = 25 * h * h;
      const s = sv('svg', { viewBox: '0 0 650 230', class: 'fig' },
        sv('rect', { x: 50, y: Y(bmiKg), width: 580, height: 200 - Y(bmiKg), fill: 'var(--h1)', opacity: .5 }),
        sv('text', { x: 56, y: 196, class: 'sm' }, 'green zone: BMI < 25 (below ' + bmiKg.toFixed(1) + ' kg)'),
        sv('line', { x1: X(new Date(cfg.startDate).getTime()), y1: Y(cfg.start), x2: X(new Date(cfg.goalDate).getTime()), y2: Y(cfg.goal), stroke: 'var(--wire)', 'stroke-width': 2, 'stroke-dasharray': '6 5' }),
        sv('text', { x: X(new Date(cfg.goalDate).getTime()) - 4, y: Y(cfg.goal) - 8, 'text-anchor': 'end', class: 'sm' }, 'plan: ' + cfg.goal + ' kg by ' + fmt(cfg.goalDate)),
        sv('path', { d: pts.map((q, i) => (i ? 'L' : 'M') + X(q[0]) + ',' + Y(q[1])).join(' '), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 3 }),
        ...pts.map(q => sv('circle', { cx: X(q[0]), cy: Y(q[1]), r: 4, fill: 'var(--accent)' })),
        ...[Math.ceil(y0), Math.round((y0 + y1) / 2), Math.floor(y1)].map(v => sv('text', { x: 44, y: Y(v) + 4, 'text-anchor': 'end', class: 'sm' }, v)));
      chart.replaceChildren(s);
      list.replaceChildren(p.weights.length ? el('details', { class: 'fold' }, el('summary', null, 'All entries (' + p.weights.length + ')'), el('div', null, el('table', { class: 'vtable' }, el('tbody', null, p.weights.slice().reverse().map(w => el('tr', null, el('td', null, fmt(w.d)), el('td', { class: 'v' }, w.am + ' kg'), el('td', { class: 'c' }, w.pm ? 'night ' + w.pm : ''), el('td', null, el('button', { class: 'pill', onclick: () => { p.weights = p.weights.filter(x => x !== w); S.save(); draw(); } }, icon('x'))))))))) : el('p', { class: 'hint' }, 'No entries yet: the chart starts from your stated ' + cfg.start + ' kg. Weigh yourself after waking and the toilet, before food or water, same scale.'));
    }
    draw();
  };

  /* ---------- lab results tracker ---------- */
  pl.labs = (box, cfg) => {
    const p = P();
    if (!p.labs.length) p.labs = cfg.seed.map(r => Object.assign({}, r));
    const body = el('div'); box.append(body);
    function status(m, v) { if (v == null || v === '') return ''; if (m.max != null && v > m.max) return 'bad'; if (m.min != null && v < m.min) return 'bad'; return 'ok'; }
    function draw() {
      const dates = p.labs.map(r => r.date);
      const t = el('table', { class: 'vtable labt' });
      t.append(el('thead', null, el('tr', null, el('th', null, 'Test'), el('th', null, 'Target'), ...p.labs.map(r => el('th', null, fmt(r.date), el('div', { class: 'qsrc' }, r.lab || ''))))));
      const tb = el('tbody');
      cfg.markers.forEach(m => tb.append(el('tr', null, el('td', null, el('b', null, m.name), m.unit ? el('span', { class: 'qsrc' }, ' ' + m.unit) : null), el('td', { class: 'c' }, m.target),
        ...p.labs.map(r => { const v = r[m.k]; return el('td', { class: 'v lab-' + status(m, v) }, v == null ? '—' : String(v)); }))));
      t.append(tb);
      const form = el('div', { class: 'labform' });
      const inputs = {};
      const dIn = el('input', { type: 'date', value: today() }); const lIn = el('input', { placeholder: 'Lab name' });
      form.append(el('label', null, 'Date', dIn), el('label', null, 'Lab', lIn));
      cfg.markers.forEach(m => { const i = el('input', { type: 'number', step: 'any', placeholder: m.unit || '' }); inputs[m.k] = i; form.append(el('label', null, m.name, i)); });
      body.replaceChildren(el('div', { class: 'scrollx' }, t), el('p', { class: 'hint' }, 'Red = outside target. Green = on target.'),
        el('details', { class: 'fold' }, el('summary', null, 'Add a new report'), el('div', null, form, el('button', { class: 'btn dark', style: { marginTop: '10px' }, onclick: () => { const r = { date: dIn.value, lab: lIn.value }; let any = false; cfg.markers.forEach(m => { const v = parseFloat(inputs[m.k].value); if (!isNaN(v)) { r[m.k] = v; any = true; } }); if (!any) { toast('Enter at least one value'); return; } p.labs.push(r); p.labs.sort((a, b) => a.date > b.date ? 1 : -1); S.save(); draw(); toast('Report saved'); } }, icon('check'), 'Save report'))));
    }
    draw();
  };

  /* ---------- cadet programme tracker ---------- */
  pl.cpp = (box, cfg) => {
    const p = P();
    if (!p.cpp) p.cpp = cfg.seed.map(x => Object.assign({ status: 'watching', applied: '', notes: '' }, x));
    const STATUS = ['watching', 'applied', 'test cleared', 'interview', 'selected', 'rejected'];
    const body = el('div'); box.append(body);
    function draw() {
      const grid = el('div', { class: 'cppgrid' });
      p.cpp.forEach(c => {
        const sel = el('select', { onchange: e => { c.status = e.target.value; S.save(); draw(); } }, STATUS.map(s => el('option', { value: s, selected: c.status === s }, s)));
        const ap = el('input', { type: 'date', value: c.applied, onchange: e => { c.applied = e.target.value; S.save(); } });
        const nt = el('textarea', { rows: 2, placeholder: 'Notes: dates, login, results…', onchange: e => { c.notes = e.target.value; S.save(); } }); nt.value = c.notes;
        grid.append(el('div', { class: 'cppcard st-' + c.status.replace(' ', '-') }, el('div', { class: 'row' }, el('b', null, c.name), el('span', { class: 'spacer' }), el('span', { class: 'badge' }, c.status)),
          c.info ? el('p', { class: 'hint', style: { margin: '6px 0' } }, rich(c.info)) : null,
          el('div', { class: 'cppf' }, el('label', null, 'Status', sel), el('label', null, 'Applied on', ap)), nt,
          c.custom ? el('button', { class: 'pill', onclick: () => { p.cpp = p.cpp.filter(x => x !== c); S.save(); draw(); } }, icon('x'), 'Remove') : null));
      });
      const nn = el('input', { placeholder: 'Add another programme / flying school…' });
      body.replaceChildren(grid, el('div', { class: 'addtask' }, nn, el('button', { class: 'btn ghost', onclick: () => { if (!nn.value.trim()) return; p.cpp.push({ name: nn.value.trim(), status: 'watching', applied: '', notes: '', custom: true }); S.save(); draw(); } }, icon('check'), 'Add')));
    }
    draw();
  };

  /* ---------- daily routine checklist (resets each day) ---------- */
  pl.daily = (box, items) => {
    const p = P(); p.daily = p.daily || {};
    const key = today(); p.daily[key] = p.daily[key] || [];
    const ul = el('ul', { class: 'tasks' });
    const streak = () => { let n = 0; for (let i = 1; i < 60; i++) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10); if ((p.daily[d] || []).length >= Math.ceil(items.length * 0.7)) n++; else break; } return n; };
    const head = el('div', { class: 'row' });
    function draw() {
      ul.replaceChildren(...items.map(it => { const on = p.daily[key].includes(it.id); const cb = el('input', { type: 'checkbox', checked: on, onchange: () => { if (cb.checked) p.daily[key].push(it.id); else p.daily[key] = p.daily[key].filter(x => x !== it.id); S.save(); draw(); } }); return el('li', { class: on ? 'done' : '' }, el('label', { class: 'tmain' }, cb, el('span', null, el('b', null, it.time + ' · ' + it.title), it.detail ? el('small', null, rich(it.detail)) : null))); }));
      head.replaceChildren(el('b', null, 'Today: ' + p.daily[key].length + ' / ' + items.length), el('span', { class: 'spacer' }), el('span', { class: 'hint' }, '🔥 ' + streak() + '-day streak (≥70% ticked)'));
    }
    box.append(head, ul); draw();
  };
})();
