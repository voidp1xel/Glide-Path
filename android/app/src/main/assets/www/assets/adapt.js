/* ADAPT prep engine: exam-style test centre, item generators, FAST multitask sim, ball game,
   personality practice, SJT, interview and GD practice. Needs core.js and adapt-bank.js. */
(function () {
  'use strict';
  const { el, sv, icon, S, toast } = G;
  const B = window.ADAPT_BANK;

  /* ---------- small utils ---------- */
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString('en-US');
  const mmss = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const hdg = h => String(((Math.round(h) % 360) + 360) % 360 || 360).padStart(3, '0');
  function store() { const s = S.state; s.adapt = s.adapt || {}; const a = s.adapt; a.runs = a.runs || []; a.iv = a.iv || {}; a.gd = a.gd || {}; return a; }
  function saveRun(r) { const a = store(); r.t = Date.now(); a.runs.unshift(r); if (a.runs.length > 300) a.runs.length = 300; S.save(); S.saveNow(); }
  const runsOf = id => store().runs.filter(r => r.test === id);

  /* numeric options: correct + plausible wrong answers, 4 unique, shuffled */
  function numItem(q, ans, wrong, unit, ex, extra) {
    const f = typeof unit === 'function' ? unit : v => fmt(v) + (unit ? ' ' + unit : '');
    const seen = new Set(), list = [];
    const push = v => { if (v == null || !isFinite(v) || (v !== ans && Math.abs(v) < 0.01)) return; const k = f(v); if (seen.has(k)) return; seen.add(k); list.push(v); };
    push(ans); wrong.forEach(push);
    let guard = 0;
    while (list.length < 4 && guard++ < 50) { const k = 1 + (Math.random() < .5 ? -1 : 1) * (0.08 + Math.random() * 0.3); push(Number.isInteger(ans) ? Math.round(ans * k) : Math.round(ans * k * 10) / 10); }
    const o = shuffle(list.slice(0, 4));
    return Object.assign({ q, o: o.map(f), a: o.indexOf(ans), ex }, extra || {});
  }
  function strItem(q, right, wrong, ex, extra) { const o = shuffle([right, ...[...new Set(wrong)].filter(w => w !== right).slice(0, 3)]); return Object.assign({ q, o, a: o.indexOf(right), ex }, extra || {}); }

  function reshuffle(x) { const idx = shuffle(x.o.map((_, i) => i)); const keep = /^(A|B|C|D)$/.test(x.o[0]) || /(\(A\)|order:)/.test(x.q); if (keep) return Object.assign({}, x); return Object.assign({}, x, { o: idx.map(i => x.o[i]), a: idx.indexOf(x.a) }); }

  /* =====================================================================
     ITEM GENERATORS
     ===================================================================== */
  const GEN = {};

  /* ---- numerical (cognitive) ---- */
  GEN.numerical = () => pick([
    () => { const seats = pick([150, 168, 180, 186, 232]); const p = pick([65, 72, 75, 80, 85, 90, 95]); const occ = Math.round(seats * p / 100); const lf = Math.round(occ / seats * 1000) / 10; return numItem(`An aircraft has ${seats} seats and ${occ} passengers. What is the load factor (to the nearest 0.1%)?`, lf, [Math.round((seats - occ) / seats * 1000) / 10, Math.round(occ / seats * 100) + 3, Math.round(seats / occ * 1000) / 10], v => v + '%', `${occ} ÷ ${seats} × 100`); },
    () => { const gs = pick([180, 210, 240, 270, 300, 360, 420, 450]); const m = pick([20, 40, 50, 70, 80, 100, 110]); const d = gs * m / 60; return numItem(`Ground speed ${gs} kt. Distance flown in ${m} minutes?`, d, [gs * m / 100, gs / m * 60, d + 10], 'NM', `${gs} × ${m}/60`); },
    () => { const d = pick([210, 280, 350, 420, 525, 630]); const tm = pick([75, 90, 105, 135, 150]); const gs = Math.round(d / (tm / 60)); return numItem(`An aircraft covers ${d} NM in ${Math.floor(tm / 60)} h ${tm % 60} min. What is its ground speed?`, gs, [Math.round(d / (tm / 100)), Math.round(d / Math.floor(tm / 60)), gs + 20], 'kt', `${d} ÷ ${tm / 60} h`); },
    () => {
      const rows = [['A', pick([2200, 2400, 2500]), pick([1.5, 2, 2.5])], ['B', pick([2600, 2800, 3000]), pick([1.25, 1.75, 3])], ['C', pick([3200, 3400, 3600]), pick([0.75, 1.5, 2.25])]];
      const tbl = () => el('table', { class: 'matrix ad-tbl' }, el('tr', null, el('th', null, 'Aircraft'), el('th', null, 'Fuel burn (kg/h)'), el('th', null, 'Sector time (h)')), rows.map(r => el('tr', null, r.map(c => el('td', null, String(c))))));
      const kind = rnd(0, 1);
      if (kind === 0) { const r = pick(rows); const ans = r[1] * r[2]; return numItem('Using the table, how much fuel does aircraft ' + r[0] + ' burn on its sector?', ans, [r[1] * (r[2] + 0.5), r[1] / r[2], ans + 250], 'kg', `${r[1]} × ${r[2]}`, { pre: tbl }); }
      const tot = rows.reduce((s, r) => s + r[1] * r[2], 0); return numItem('Using the table, what is the total fuel burned by all three aircraft?', tot, [tot + 600, rows.reduce((s, r) => s + r[1], 0) * 2, tot - 450], 'kg', 'Sum of burn × time for each row', { pre: tbl });
    },
    () => { const p = pick([10, 12, 15, 20, 25, 30]); const old = pick([80, 90, 96, 120, 140, 160]) * 1000; const up = Math.random() < .5; const ans = old * (1 + (up ? p : -p) / 100); return numItem(`Monthly fuel spend was ₹${fmt(old)}. It ${up ? 'rises' : 'falls'} by ${p}%. New spend?`, ans, [old * (1 + (up ? -p : p) / 100), old + (up ? 1 : -1) * p * 100, old * p / 100], v => '₹' + fmt(v), `${old} × ${(1 + (up ? p : -p) / 100).toFixed(2)}`); },
    () => { const a = rnd(3, 9), b = rnd(2, 7); const tot = (a + b) * rnd(4, 12); if (a === b) return GEN.numerical(); return numItem(`₹${fmt(tot * 1000)} is shared between two crews in the ratio ${a}:${b}. The larger share is:`, tot * 1000 * Math.max(a, b) / (a + b), [tot * 1000 / 2, tot * 1000 * Math.min(a, b) / (a + b), tot * 1000 * Math.max(a, b) / (a + b) + 2000], v => '₹' + fmt(v), 'Divide the total by (a+b), multiply by the larger part'); },
    () => { const s = pick([[2, 6, 12, 20, 30], [3, 7, 15, 31, 63], [1, 4, 9, 16, 25], [2, 5, 11, 23, 47], [81, 27, 9, 3, 1], [5, 10, 20, 40, 80], [1, 1, 2, 3, 5], [4, 7, 12, 19, 28]]); const nx = { '2,6,12,20,30': 42, '3,7,15,31,63': 127, '1,4,9,16,25': 36, '2,5,11,23,47': 95, '81,27,9,3,1': 1 / 3, '5,10,20,40,80': 160, '1,1,2,3,5': 8, '4,7,12,19,28': 39 }[s.join()]; return numItem(`What comes next? ${s.join(', ')}, ?`, nx, [nx + 2, nx - 3, nx * 2], v => (v === 1 / 3 ? '1/3' : Number.isInteger(v) ? String(v) : (Math.round(v * 100) / 100).toString()), 'Look at the differences or ratios between terms.'); },
  ])();

  /* ---- working memory: memorise, then answer ---- */
  GEN.memory = () => pick([
    () => { let sq; do { sq = Array.from({ length: 4 }, () => rnd(0, 7)).join(''); } while (new Set(sq).size < 3); const h = rnd(1, 35) * 10; const fl = rnd(8, 39) * 10; const dir = pick(['left', 'right']);
      const msg = `Climb FL${fl}, turn ${dir} heading ${hdg(h)}, squawk ${sq}`;
      const ask = rnd(0, 2);
      if (ask === 0) { const w = [sq.slice(0, 2) + sq[3] + sq[2], sq[0] + String((+sq[1] + 1) % 8) + sq.slice(2), sq.split('').reverse().join('')]; return strItem('What was the squawk code?', sq, w, msg, { memo: msg, ms: 4000 }); }
      if (ask === 1) return strItem('What heading were you given?', hdg(h), [hdg(h + 30), hdg(h - 20), hdg(360 - h)], msg, { memo: msg, ms: 4000 });
      return strItem('What flight level and turn direction were you given?', `FL${fl}, ${dir}`, [`FL${fl}, ${dir === 'left' ? 'right' : 'left'}`, `FL${fl + 20}, ${dir}`, `FL${fl - 10}, ${dir === 'left' ? 'right' : 'left'}`], msg, { memo: msg, ms: 4000 }); },
    () => { const pool = 'BCDFGHJKLMNPRSTVWXZ23456789'; const n = rnd(6, 7); const seq = shuffle(pool.split('')).slice(0, n); const k = rnd(2, n - 1);
      const ord = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'][k - 1];
      const others = shuffle(seq.filter((_, i) => i !== k - 1)).slice(0, 3);
      return strItem(`What was the ${ord} character?`, seq[k - 1], others, seq.join(' '), { memo: seq.join('  '), ms: 3500 }); },
    () => { const nums = Array.from({ length: 5 }, () => rnd(1, 9)); const sum = nums.reduce((a, b) => a + b, 0); return numItem('What was the sum of the numbers shown?', sum, [sum + 1, sum - 2, sum + 3], '', nums.join(' + '), { memo: nums.join('   '), ms: 3500 }); },
    () => { const pool = ['DELHI', 'MUMBAI', 'PUNE', 'GOA', 'LEH', 'PATNA', 'SURAT', 'BHOPAL', 'KOCHI', 'AGRA', 'SHIMLA', 'RANCHI']; const sh = shuffle(pool); const shown = sh.slice(0, 5); const notShown = sh[5];
      return strItem('Which of these was NOT in the list?', notShown, shuffle(shown).slice(0, 3), shown.join(', '), { memo: shown.join(' · '), ms: 4000 }); },
  ])();

  /* ---- perceptual speed & accuracy ---- */
  GEN.perceptual = () => {
    const L = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    const code = () => 'VT-' + Array.from({ length: 3 }, () => pick(L.split(''))).join('') + ' ' + rnd(1000, 9999);
    const mutate = c => { const i = pick([3, 4, 5, 7, 8, 9, 10]); const ch = c[i]; let r = /\d/.test(ch) ? String((+ch + rnd(1, 8)) % 10) : pick(L.split('').filter(x => x !== ch)); return c.slice(0, i) + r + c.slice(i + 1); };
    if (Math.random() < .6) {
      const n = 5; const same = rnd(0, 5); const idx = shuffle([0, 1, 2, 3, 4]).slice(0, same);
      const rows = Array.from({ length: n }, (_, i) => { const a = code(); return [a, idx.includes(i) ? a : mutate(a)]; });
      const tbl = () => el('div', { class: 'ad-pairs' }, rows.map(([a, b]) => el('div', null, el('code', null, a), el('code', null, b))));
      return numItem('How many of these pairs are EXACTLY identical?', same, [same + 1, same - 1, same + 2, same - 2].filter(v => v >= 0 && v <= 5), '', 'Compare character by character, left to right.', { pre: tbl });
    }
    const target = code(); const set = new Set([target]); let g = 0; while (set.size < 4 && g++ < 40) set.add(mutate(target)); const list = shuffle([...set]);
    return { q: () => el('div', null, 'Which option is identical to ', el('code', { class: 'ad-big' }, target), ' ?'), o: list, a: list.indexOf(target), ex: 'Only one option matches every character.' };
  };

  /* ---- spatial ---- */
  function polyomino() {
    for (let t = 0; t < 200; t++) {
      let cells = [[0, 0]]; while (cells.length < 6) { const [x, y] = pick(cells); const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]); const c = [x + dx, y + dy]; if (!cells.some(k => k[0] === c[0] && k[1] === c[1])) cells.push(c); }
      const norm = cs => { const mx = Math.min(...cs.map(c => c[0])), my = Math.min(...cs.map(c => c[1])); return cs.map(c => [c[0] - mx, c[1] - my]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
      const key = cs => JSON.stringify(norm(cs));
      const rot = (cs, k) => { let r = cs; for (let i = 0; i < k; i++) r = r.map(([x, y]) => [y, -x]); return norm(r); };
      const mir = cs => norm(cs.map(([x, y]) => [-x, y]));
      const rots = [0, 1, 2, 3].map(k => key(rot(cells, k)));
      if (new Set(rots).size < 4) continue;
      const mk = [0, 1, 2, 3].map(k => key(rot(mir(cells), k)));
      if (mk.some(m => rots.includes(m))) continue;
      return { base: norm(cells), rot, mir };
    }
  }
  const shapeSvg = (cs, s = 18) => () => { const w = Math.max(...cs.map(c => c[0])) + 1, h = Math.max(...cs.map(c => c[1])) + 1; return sv('svg', { viewBox: `-2 -2 ${w * s + 4} ${h * s + 4}`, width: w * s + 4, height: h * s + 4, class: 'ad-shape' }, cs.map(([x, y]) => sv('rect', { x: x * s, y: y * s, width: s, height: s, rx: 2 }))); };
  GEN.spatial = () => pick([
    () => { const P = polyomino(); const k = rnd(1, 3); const right = P.rot(P.base, k); const ks = shuffle([0, 1, 2, 3]).slice(0, 3); const wrong = ks.map(j => P.rot(P.mir(P.base), j));
      const o = shuffle([right, ...wrong]); return { q: () => el('div', null, el('p', null, 'Which option is the shape below ROTATED (not flipped)?'), shapeSvg(P.base, 22)()), o: o.map(c => shapeSvg(c)), a: o.indexOf(right), ex: 'The other three are mirror images.' }; },
    () => { const h0 = rnd(1, 36) * 10; const t1 = rnd(3, 18) * 10, t2 = rnd(3, 27) * 10; const d1 = pick(['right', 'left']), d2 = d1 === 'right' ? 'left' : 'right';
      const f = h0 + (d1 === 'right' ? t1 : -t1) + (d2 === 'right' ? t2 : -t2);
      return strItem(`Heading ${hdg(h0)}. Turn ${d1} ${t1}°, then ${d2} ${t2}°. New heading?`, hdg(f), [hdg(h0 + (d1 === 'right' ? -t1 : t1) + (d2 === 'right' ? -t2 : t2)), hdg(f + 180), hdg(f + 20)], 'Right adds, left subtracts; wrap through 360.'); },
    () => { const H = ['north', 'east', 'south', 'west']; const R = ['ahead', 'on your right', 'behind you', 'on your left']; const h = rnd(0, 3), r = rnd(0, 3), n = (h + rnd(1, 3)) % 4; const abs = (h + r) % 4; const nr = (abs - n + 4) % 4;
      return strItem(`You are heading ${H[h]}. A mountain is ${R[r]}. You turn to head ${H[n]}. Where is the mountain now?`, R[nr], R.filter((_, i) => i !== nr), `The mountain is to the ${H[abs]}; facing ${H[n]}, that is ${R[nr]}.`); },
  ])();

  /* ---- abstract ---- */
  const figSvg = f => () => { const n = f.n, r = 20, pts = Array.from({ length: n }, (_, i) => { const a = (f.rot + i * 360 / n - 90) * Math.PI / 180; return (30 + r * Math.cos(a)).toFixed(1) + ',' + (28 + r * Math.sin(a)).toFixed(1); }).join(' ');
    return sv('svg', { viewBox: '0 0 60 66', width: 60, height: 66, class: 'ad-fig' }, sv('polygon', { points: pts, class: f.fill ? 'fl' : '' }), Array.from({ length: f.d }, (_, i) => sv('circle', { cx: 30 + (i - (f.d - 1) / 2) * 9, cy: 61, r: 3 }))); };
  GEN.abstract = () => {
    if (Math.random() < .3) {
      const s = pick([['A', 'C', 'F', 'J', 'O', 'U'], ['Z', 'X', 'U', 'Q', 'L', 'F'], ['A', 'Z', 'B', 'Y', 'C', 'X'], ['C', 'F', 'I', 'L', 'O', 'R'], ['B', 'E', 'D', 'G', 'F', 'I'], ['A', 'B', 'D', 'G', 'K', 'P']]);
      return strItem(`What comes next? ${s.slice(0, 5).join(', ')}, ?`, s[5], shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(x => x !== s[5] && !s.includes(x))).slice(0, 3), 'Look at the gaps between letter positions.');
    }
    const attrs = shuffle(['n', 'rot', 'fill', 'd']).slice(0, 2);
    const st = { n: rnd(3, 4), rot: pick([0, 15, 30]), fill: Math.random() < .5, d: rnd(0, 1) };
    const step = { n: 1, rot: pick([30, 45]), fill: 1, d: 1 };
    const at = i => { const f = Object.assign({}, st); attrs.forEach(a => { if (a === 'fill') f.fill = (i % 2 === 0) ? st.fill : !st.fill; else if (a === 'n') f.n = st.n + i; else if (a === 'd') f.d = (st.d + i) % 4; else f.rot = st.rot + i * step.rot; }); return f; };
    const seq = [0, 1, 2, 3].map(at), ans = at(4);
    const variants = [Object.assign({}, ans, { n: ans.n + 1 }), Object.assign({}, ans, { fill: !ans.fill }), Object.assign({}, ans, { d: (ans.d + 1) % 4 }), Object.assign({}, ans, { n: Math.max(3, ans.n - 1) }), Object.assign({}, ans, { d: (ans.d + 3) % 4 })];
    const k = f => [f.n, f.rot % (360 / f.n), f.fill, f.d].join();
    const seen = new Set([k(ans)]); const wrong = [];
    variants.forEach(v => { if (wrong.length < 3 && !seen.has(k(v))) { seen.add(k(v)); wrong.push(v); } });
    const o = shuffle([ans, ...wrong]);
    return { q: () => el('div', null, el('p', null, 'Which figure comes next in the sequence?'), el('div', { class: 'ad-seq' }, seq.map(f => figSvg(f)()), el('span', { class: 'ad-qm' }, '?'))), o: o.map(f => figSvg(f)), a: o.indexOf(ans), ex: 'Changing: ' + attrs.map(a => ({ n: 'number of sides', rot: 'rotation', fill: 'shading (alternates)', d: 'number of dots' }[a])).join(' and ') + '.' };
  };

  /* ---- verbal ---- */
  GEN.verbal = () => {
    if (Math.random() < .25) { const e = pick(B.english.filter(x => x.t === 'vocabulary')); return Object.assign(reshuffle(e), { key: e.q }); }
    const p = pick(B.verbal); const [s, k] = pick(p.s); const o = ['True', 'False', 'Cannot say'];
    return { key: p.p, q: () => el('div', null, el('blockquote', { class: 'ad-pass' }, p.p), el('p', null, el('b', null, 'Statement: '), s)), o, a: { T: 0, F: 1, C: 2 }[k], ex: 'True = follows from the passage. False = contradicts it. Cannot say = the passage does not tell you, even if it sounds likely.' };
  };

  /* ---- progressive maths (levels 1-5) ---- */
  const MATH = {
    1: [
      () => { const a = rnd(13, 49), b = rnd(3, 9); return numItem(`${a} × ${b} = ?`, a * b, [a * b + 10, a * (b + 1), a * b - 9]); },
      () => { const p = pick([10, 15, 20, 25, 30, 40, 60, 75]), n = rnd(4, 30) * 20; return numItem(`${p}% of ${n} = ?`, n * p / 100, [n * p / 1000, n - n * p / 100, n * p / 50]); },
      () => { const b = rnd(3, 12), q = rnd(6, 25); return numItem(`${b * q} ÷ ${b} = ?`, q, [q + 1, q - 1, q * 2]); },
      () => { const a = rnd(2, 9) / 10, b = rnd(12, 90); return numItem(`${a} × ${b} = ?`, Math.round(a * b * 10) / 10, [Math.round(a * b * 100) / 10, Math.round(a * b) / 10, Math.round((a + .1) * b * 10) / 10]); },
      () => { const a = rnd(120, 980), b = rnd(110, 890); return numItem(`${a} + ${b} − 99 = ?`, a + b - 99, [a + b - 101, a + b - 89, a + b + 99]); },
    ],
    2: [
      () => { const old = rnd(20, 80) * 10, p = pick([5, 10, 12, 15, 20, 25]), up = Math.random() < .5; const ans = old * (1 + (up ? p : -p) / 100); return numItem(`A value of ${old} ${up ? 'increases' : 'decreases'} by ${p}%. New value?`, ans, [old + (up ? p : -p), old * (1 + (up ? -p : p) / 100), old * p / 100]); },
      () => { const n = rnd(5, 40) * 10; return numItem(`${n} nautical miles is approximately how many kilometres? (1 NM = 1.852 km)`, Math.round(n * 1.852), [Math.round(n * 1.609), Math.round(n / 1.852), Math.round(n * 1.852) + 20], 'km'); },
      () => { const ft = rnd(5, 40) * 1000; return numItem(`${fmt(ft)} ft is approximately how many metres? (1 ft = 0.3048 m)`, Math.round(ft * 0.3048), [Math.round(ft / 0.3048), Math.round(ft * 0.3048 / 10), Math.round(ft * 0.33)], 'm'); },
      () => { const gs = rnd(12, 48) * 10, t = pick([15, 20, 30, 40, 45, 90]); return numItem(`At ${gs} kt, how far do you travel in ${t} minutes?`, gs * t / 60, [gs * t / 100, gs * 60 / t, gs * t / 60 + 15], 'NM'); },
      () => { const d = pick([[1, 2, 1, 3], [3, 4, 1, 6], [2, 3, 1, 4], [1, 4, 2, 5], [3, 5, 1, 2]]); const [a, b, c, e] = d; let n = a * e + c * b, m = b * e; const g = (x, y) => y ? g(y, x % y) : x; const k = g(n, m); n /= k; m /= k;
        return strItem(`${a}/${b} + ${c}/${e} = ?`, `${n}/${m}`, [`${a + c}/${b + e}`, `${a * c}/${b * e}`, `${n + 1}/${m}`], 'Common denominator, then simplify.'); },
    ],
    3: [
      () => { const a = rnd(2, 9), x = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15]), b = rnd(-20, 20) || 7; const c = a * x + b; return numItem(`Solve: ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}`, x, [(c + b) / a, x + 1, -x].map(v => Math.round(v * 10) / 10), v => 'x = ' + v, `x = (${c} ${b < 0 ? '+' : '−'} ${Math.abs(b)}) ÷ ${a}`); },
      () => { const f = pick([['v = u + at. Make t the subject.', 't = (v − u)/a', ['t = (v + u)/a', 't = a/(v − u)', 't = v − u − a']], ['KE = ½mv². Make v the subject.', 'v = √(2KE/m)', ['v = 2KE/m', 'v = √(KE/2m)', 'v = (2KE)²/m']], ['P = F/A. Make A the subject.', 'A = F/P', ['A = P/F', 'A = PF', 'A = F − P']], ['s = d/t. Make t the subject.', 't = d/s', ['t = s/d', 't = ds', 't = d − s']], ['V = IR. Make R the subject.', 'R = V/I', ['R = I/V', 'R = VI', 'R = V − I']]]); return strItem(f[0], f[1], f[2], 'Do the same operation to both sides.'); },
      () => { const gs = pick([120, 180, 240, 300, 360, 420, 480]), t = rnd(4, 20) * 2; const d = gs * t / 60; return numItem(`Ground speed ${gs} kt, ${d} NM to go. Time to destination?`, t, [t + 5, t - 4, Math.round(d / gs * 100)], 'min', `${d} ÷ ${gs} × 60`); },
      () => { const r = rnd(20, 40) * 100, t = pick([1.25, 1.5, 1.75, 2.25, 2.5, 3.25]); const h = Math.floor(t), m = Math.round((t - h) * 60); return numItem(`Fuel flow ${fmt(r)} kg/h. Fuel used in ${h} h ${m} min?`, r * t, [r * (h + m / 100), r * h, r * t + 500], 'kg'); },
      () => { const n = Array.from({ length: 5 }, () => rnd(10, 60)); const s = n.reduce((a, b) => a + b, 0); const extra = 5 - (s % 5); n[0] += extra % 5; const avg = n.reduce((a, b) => a + b, 0) / 5; return numItem(`Mean of ${n.join(', ')}?`, avg, [avg + 2, avg - 3, avg + 5]); },
    ],
    4: [
      () => { const x = rnd(1, 9), y = rnd(1, 9), a1 = rnd(1, 4), b1 = rnd(1, 4), a2 = rnd(1, 4), b2 = -rnd(1, 4); const c1 = n => (n === 1 ? '' : n); return numItem(`${c1(a1)}x + ${c1(b1)}y = ${a1 * x + b1 * y}\n${c1(a2)}x − ${c1(-b2)}y = ${a2 * x + b2 * y}\nFind x.`, x, [y, x + 1, x - 2].filter(v => v !== x || true), v => 'x = ' + v, 'Eliminate y: multiply to match the y coefficients, then add.'); },
      () => { let r1, r2; do { r1 = rnd(-6, 8); r2 = rnd(-6, 8); } while (!r1 || !r2 || Math.abs(r1) === Math.abs(r2)); const s = r1 + r2, p = r1 * r2; const t = `x² ${s > 0 ? '−' : '+'} ${Math.abs(s) === 1 ? '' : Math.abs(s)}x ${p >= 0 ? '+' : '−'} ${Math.abs(p)} = 0`; const z = v => (v < 0 ? '−' + -v : v);
        return strItem('Solve ' + t, `x = ${z(r1)} or x = ${z(r2)}`, [`x = ${z(-r1)} or x = ${z(-r2)}`, `x = ${z(r1)} or x = ${z(-r2)}`, `x = ${z(s)} or x = ${z(p)}`], 'Factorise: two numbers that multiply to the constant and add to minus the x-coefficient.'); },
      () => { const t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10]]); const k = rnd(1, 3); const [a, b, c] = t.map(v => v * k); return numItem(`A right-angled triangle has hypotenuse ${c} and one side ${a}. The other side is:`, b, [c - a, Math.round(Math.sqrt(c * c + a * a)), b + k], '', `√(${c}² − ${a}²)`); },
      () => { const f = pick([['sin 30°', '0.5', ['0.866', '1', '0.707']], ['cos 60°', '0.5', ['0.866', '0', '1']], ['tan 45°', '1', ['0.5', '0.707', '√3']], ['sin 90°', '1', ['0', '0.5', 'undefined']], ['cos 0°', '1', ['0', '0.5', '−1']], ['sin 60°', '≈ 0.866', ['0.5', '≈ 0.707', '1']], ['tan 60°', '≈ 1.73', ['≈ 0.577', '1', '0.5']]]); return strItem(`${f[0]} = ?`, f[1], f[2], 'Learn the 30-45-60 table.'); },
      () => { const a = rnd(2, 6), b = rnd(2, 6); const f = pick([[`2^${a} × 2^${b} = 2^?`, a + b, [a * b, a - b, a + b + 1]], [`(x^${a})^${b} = x^?`, a * b, [a + b, a * b + 1, a]], [`10^${a + b} ÷ 10^${b} = 10^?`, a, [a + 2 * b, b, a + b]]]); return numItem(f[0], f[1], f[2]); },
    ],
    5: [
      () => { const tas = pick([200, 240, 300, 360, 420, 480]), hw = pick([20, 30, 40, 60]); const gs = tas - hw; const t = pick([1, 1.5, 2, 2.5]); const d = gs * t; const f = v => { const m = Math.round(v * 60), h = Math.floor(m / 60), r = m % 60; return (h ? h + ' h' : '') + (h && r ? ' ' : '') + (r ? r + ' min' : ''); }; return numItem(`TAS ${tas} kt with a ${hw} kt headwind. Time to fly ${d} NM?`, t, [d / tas, d / (tas + hw), t + .25], f, `GS = ${tas} − ${hw} = ${gs} kt; ${d} ÷ ${gs}`); },
      () => { const d1 = pick([30, 40, 60]), off = pick([2, 3, 4, 5]), d2 = pick([30, 60, 90, 120]); const te = off / d1 * 60, ca = off / d2 * 60; return numItem(`1-in-60 rule: after ${d1} NM you are ${off} NM off track, with ${d2} NM still to go. Total heading change to reach the destination?`, Math.round((te + ca) * 10) / 10, [Math.round(te * 10) / 10, Math.round(ca * 10) / 10, Math.round((te * 2) * 10) / 10], '°', `Track error ${te.toFixed(1)}° + closing angle ${ca.toFixed(1)}°`); },
      () => { const w = rnd(4, 12), k = pick([2, 3, 4, 5]); const L = w + k; return numItem(`A rectangle's length is ${k} m more than its width. Its area is ${w * L} m². Width?`, w, [L, w + 1, Math.round(Math.sqrt(w * L))], 'm', `w² + ${k}w − ${w * L} = 0`); },
      () => { const fl = pick([250, 290, 330, 370]) * 100, to = pick([2000, 3000, 5000]), rod = pick([1500, 2000, 2500]); return numItem(`Descend from FL${fl / 100} to ${fmt(to)} ft at ${fmt(rod)} ft/min. Time needed?`, (fl - to) / rod, [fl / rod, (fl - to) / rod + 2, (fl + to) / rod].map(v => Math.round(v * 10) / 10), 'min'); },
      () => { const gs = pick([120, 130, 140, 150, 160]); return numItem(`On a 3° glidepath, rate of descent ≈ GS × 5. Ground speed ${gs} kt gives about:`, gs * 5, [gs * 3, gs * 10, gs * 6], 'ft/min'); },
      () => { const p = pick([10, 20, 25]); const ans = Math.round((1 + p / 100) * (1 - p / 100) * 10000) / 100 - 100; return numItem(`A price rises ${p}% and then falls ${p}%. Overall change?`, ans, [0, -p / 2, p / 10], v => (v > 0 ? '+' : '') + v + '%', `(1+${p / 100})(1−${p / 100}) = ${(1 - (p / 100) ** 2).toFixed(4)}`); },
    ],
  };
  const PHYS = {
    1: [
      () => { const m = rnd(2, 20) * 50, a = rnd(1, 6); return numItem(`F = ma. Force to accelerate ${m} kg at ${a} m/s²?`, m * a, [m / a, m + a, m * a * 10], 'N'); },
      () => { const m = rnd(3, 90); return numItem(`Weight of a ${m} kg mass (g = 10 m/s²)?`, m * 10, [m, m / 10, m * 9.8 * 10], 'N'); },
      () => { const m = rnd(2, 12) * 100, v = pick([0.5, 2, 4, 5]); return numItem(`Density of a ${m} kg object of volume ${v} m³?`, m / v, [m * v, v / m, m / v / 2], 'kg/m³'); },
      () => { const F = rnd(2, 30) * 100, A = pick([0.5, 2, 4, 5, 10]); return numItem(`Pressure from ${fmt(F)} N on ${A} m²?`, F / A, [F * A, F / A * 10, F / A / 10], 'Pa'); },
    ],
    2: [
      () => { const u = rnd(0, 20), a = rnd(1, 5), t = rnd(2, 10); return numItem(`v = u + at. u = ${u} m/s, a = ${a} m/s², t = ${t} s. v = ?`, u + a * t, [u * a * t, a * t, u + a + t], 'm/s'); },
      () => { const m = rnd(2, 10), v = rnd(2, 10); return numItem(`KE = ½mv². m = ${m} kg, v = ${v} m/s. KE = ?`, m * v * v / 2, [m * v / 2, m * v * v, m * v], 'J'); },
      () => { const m = rnd(2, 20), h = rnd(2, 30); return numItem(`PE = mgh. m = ${m} kg, h = ${h} m, g = 10 m/s². PE = ?`, m * h * 10, [m * h, m * 10 + h, m * h * 100], 'J'); },
      () => { const I = rnd(2, 8), R = rnd(2, 12); return numItem(`V = IR. I = ${I} A, R = ${R} Ω. V = ?`, I * R, [I / R, R / I, I + R].map(v => Math.round(v * 100) / 100), 'V'); },
      () => { const f = rnd(2, 9) * 100, l = pick([0.5, 1.5, 2, 0.25]); return numItem(`v = fλ. f = ${f} Hz, λ = ${l} m. v = ?`, f * l, [f / l, l / f * 1000, f + l], 'm/s'); },
      () => { const p = rnd(1, 4) * 100, v = rnd(2, 8), k = pick([2, 4]); return numItem(`Boyle's law: ${v} L of gas at ${p} kPa is compressed to ${v / k} L (same temperature). New pressure?`, p * k, [p / k, p + k, p * k * 2], 'kPa'); },
    ],
    3: [
      () => { const u = rnd(0, 10), a = rnd(2, 6), t = rnd(2, 8); return numItem(`s = ut + ½at². u = ${u} m/s, a = ${a} m/s², t = ${t} s. s = ?`, u * t + a * t * t / 2, [u * t + a * t, u * t + a * t * t, (u + a) * t], 'm'); },
      () => { const W = rnd(2, 12) * 1000, t = pick([4, 5, 8, 10, 20]); return numItem(`${fmt(W)} J of work done in ${t} s. Power?`, W / t, [W * t, W / t / 1000, t / W], 'W'); },
      () => { const V = pick([12, 24, 28, 115, 230]), I = rnd(2, 10); return numItem(`P = IV. ${I} A at ${V} V. Power?`, I * V, [V / I, I + V, I * V * 2].map(v => Math.round(v * 10) / 10), 'W'); },
      () => { const r = [rnd(2, 12), rnd(2, 12), rnd(2, 12)]; const s = r[0] + r[1] + r[2]; return numItem(`Resistors of ${r.join(' Ω, ')} Ω in SERIES. Total resistance?`, s, [Math.round(1 / (1 / r[0] + 1 / r[1] + 1 / r[2]) * 100) / 100, s / 3, r[0] * r[1] * r[2]], 'Ω'); },
      () => { const F1 = rnd(2, 10) * 10, d1 = rnd(1, 6), d2 = pick([1, 2, 3, 4]); return numItem(`A ${F1} N load sits ${d1} m from a pivot. What force ${d2} m on the other side balances it?`, F1 * d1 / d2, [F1 * d2 / d1, F1, F1 * d1 * d2].map(v => Math.round(v * 10) / 10), 'N', 'Moments: F₁d₁ = F₂d₂'); },
      () => { const m1 = rnd(1, 5) * 1000, v1 = rnd(2, 10), m2 = rnd(1, 5) * 1000; const v = m1 * v1 / (m1 + m2); return numItem(`A ${m1} kg trolley at ${v1} m/s couples to a stationary ${m2} kg trolley. Common speed?`, Math.round(v * 100) / 100, [v1, Math.round(v1 / 2 * 100) / 100, Math.round(m1 * v1 / m2 * 100) / 100, Math.round(v * 1.5 * 100) / 100, Math.round((v + v1) * 100) / 100], 'm/s', 'Momentum conserved: m₁v₁ = (m₁+m₂)v'); },
    ],
    4: [
      () => { const p = pick([[6, 3, 2], [12, 6, 4], [4, 4, 2], [20, 5, 4], [10, 15, 6], [12, 4, 3]]); return numItem(`${p[0]} Ω and ${p[1]} Ω in PARALLEL. Combined resistance?`, p[2], [p[0] + p[1], (p[0] + p[1]) / 2, Math.abs(p[0] - p[1])].filter(v => v !== p[2]), 'Ω', '1/R = 1/R₁ + 1/R₂'); },
      () => { const u = pick([20, 30, 40, 50, 60]), a = pick([2, 4, 5]); return numItem(`A vehicle at ${u} m/s brakes at ${a} m/s². Stopping distance? (v² = u² + 2as)`, u * u / (2 * a), [u * u / a, u / a, u * u / (4 * a)], 'm'); },
      () => { const h = pick([2, 5, 10, 20]), r = pick([1000, 1025]); return numItem(`Pressure due to ${h} m of liquid of density ${r} kg/m³ (g = 10)?`, r * 10 * h, [r * h, r * 10 / h, r * 10 * h / 1000], 'Pa', 'p = ρgh'); },
      () => { const I = rnd(2, 6), R = rnd(2, 10); return numItem(`Power dissipated by ${I} A through ${R} Ω?`, I * I * R, [I * R, I * R * R, I * I / R].map(v => Math.round(v * 10) / 10), 'W', 'P = I²R'); },
      () => { const inn = rnd(4, 10) * 100, eff = pick([20, 25, 40, 60, 75, 80]); return numItem(`An engine takes in ${inn} J and is ${eff}% efficient. Useful output?`, inn * eff / 100, [inn * (100 - eff) / 100, inn / eff, inn * eff / 10], 'J'); },
    ],
    5: [
      () => { const T1 = pick([27, 7, 127]), V1 = pick([2, 3, 4]); const k = pick([2]); const T2K = (T1 + 273) * k; return numItem(`Charles's law: ${V1} L of gas at ${T1}°C is heated at constant pressure until its volume doubles. New temperature?`, T2K - 273, [T1 * 2, T2K, T1 + 273].map(v => Math.round(v)), '°C', 'Use kelvin: V/T constant'); },
      () => { const m = rnd(1, 4) * 500, v = pick([10, 20, 30]), r = pick([50, 100, 200]); return numItem(`Centripetal force on ${m} kg moving at ${v} m/s in a circle of radius ${r} m?`, m * v * v / r, [m * v / r, m * v * v, m * r / v], 'N', 'F = mv²/r'); },
      () => { const h = pick([5, 20, 45, 80, 125]); return numItem(`An object falls ${h} m from rest (g = 10, no air resistance). Impact speed?`, Math.sqrt(2 * 10 * h), [2 * 10 * h, 10 * h / 2, Math.sqrt(10 * h)].map(v => Math.round(v * 10) / 10), 'm/s', 'mgh = ½mv² → v = √(2gh)'); },
      () => { const k = pick([2, 3]); return numItem(`Lift ∝ V². If airspeed is multiplied by ${k} (all else equal), lift is multiplied by:`, k * k, [k, 2 * k, k * k * k], '×'); },
      () => { const u = pick([10, 20, 30]); return numItem(`A ball is thrown straight up at ${u} m/s (g = 10). Time to reach the top?`, u / 10, [u / 5, u * 10, u / 20], 's'); },
    ],
  };
  GEN.maths = lvl => pick(MATH[lvl])();
  GEN.physics = (lvl, used) => {
    const pool = B.physicsConcept.map((x, i) => [x, i]).filter(([x, i]) => x.lvl <= lvl && x.lvl >= lvl - 1 && !used.has('c' + i));
    if (pool.length && Math.random() < .35) { const [x, i] = pick(pool); used.add('c' + i); return reshuffle(x); }
    return pick(PHYS[lvl])();
  };

  /* =====================================================================
     TEST DEFINITIONS
     ===================================================================== */
  const SEC = { verbal: 'Verbal', numerical: 'Numerical', memory: 'Working memory', perceptual: 'Perceptual speed & accuracy', spatial: 'Spatial', abstract: 'Abstract' };
  const TESTS = {
    cr: { name: 'Cognitive Reasoning', minutes: 30, n: 36, kind: 'fixed', icon: 'brain',
      brief: ['36 questions in 30 minutes, six elements: verbal, numerical, working memory, perceptual speed & accuracy, spatial and abstract reasoning. Items are mixed.', 'One question at a time. You cannot go back.', 'Scored on accuracy AND speed: the real test reports both. Average 50 s per question.', 'No calculator. Use scrap paper if you like (the real test allows rough paper at most centres; check your invitation).', 'Working-memory items show something for a few seconds, then hide it before the question appears.'],
      build() { const order = shuffle(Object.keys(SEC).flatMap(k => Array(6).fill(k))); const seen = new Set(); return order.map(k => { let it, g = 0; do { it = GEN[k](); } while (seen.has(it.key || it.q) && g++ < 15); seen.add(it.key || it.q); return Object.assign(it, { sec: k }); }); } },
    maths: { name: 'Progressive Mathematics', minutes: 30, n: 20, kind: 'adaptive', icon: 'calc', gen: lvl => GEN.maths(lvl),
      brief: ['20 questions, 30 minutes. Difficulty adapts: a right answer moves you up a level, a wrong one moves you down (5 levels).', 'Topics reported by candidates: mental arithmetic, percentages, fractions, unit conversions, speed-distance-time, algebra, rearranging formulae, simultaneous and quadratic equations, basic trigonometry.', 'No calculator.', 'Score weights harder questions more. Aim to reach and hold level 4–5.'] },
    physics: { name: 'Progressive Physics', minutes: 25, n: 20, kind: 'adaptive', icon: 'spark', gen: (lvl, used) => GEN.physics(lvl, used),
      brief: ['20 questions, 25 minutes, adaptive across 5 levels (school physics, roughly Class 10–12).', 'Mechanics (F = ma, SUVAT, energy, momentum, moments), pressure and gases, electricity (Ohm\'s law, series/parallel, power), waves.', 'Formulae are usually given in the question; you must apply them quickly. No calculator.'] },
    eng: { name: 'English', minutes: 20, n: 25, kind: 'fixed', icon: 'book',
      brief: ['25 questions, 20 minutes: grammar, prepositions, vocabulary, spelling, error spotting, idioms, sentence order and short comprehension.', 'IndiGo route via FTA: Stage 1 is three written tests (English, Physics, Maths); 70%+ is needed to move on to the aptitude test (FTA FAQ).'],
      build() { return shuffle(B.english).slice(0, 25).map(x => Object.assign(reshuffle(x), { sec: x.t })); } },
  };

  /* =====================================================================
     EXAM SHELL (full-screen test-centre overlay)
     ===================================================================== */
  let overlay = null, keyH = null;
  function openShell(title) {
    closeShell();
    overlay = el('div', { class: 'ad-exam', role: 'dialog', 'aria-label': title });
    const timer = el('span', { class: 'ad-timer' }, '');
    const count = el('span', { class: 'ad-count' }, '');
    const quit = el('button', { class: 'ad-quit', onclick: () => { if (confirm('Leave this test? Progress in this attempt will be lost.')) closeShell(); } }, 'Exit');
    const bar = el('div', { class: 'ad-bar' }, el('span', { class: 'ad-brand' }, 'ADAPT · practice centre'), el('b', null, title), el('span', { class: 'spacer' }), count, timer, quit);
    const prog = el('div', { class: 'ad-prog' }, el('i'));
    const body = el('div', { class: 'ad-body' });
    overlay.append(bar, prog, body);
    document.body.append(overlay); document.body.classList.add('ad-lock');
    return { body, timer, count, prog: prog.firstChild, quit };
  }
  function closeShell() {
    if (keyH) { window.removeEventListener('keydown', keyH, true); keyH = null; }
    if (overlay) { overlay.dispatchEvent(new Event('closing')); overlay.remove(); overlay = null; }
    document.body.classList.remove('ad-lock');
    try { speechSynthesis.cancel(); } catch (e) { }
    if (G.adapt._refresh) G.adapt._refresh();
  }
  function onKeys(fn) { if (keyH) window.removeEventListener('keydown', keyH, true); keyH = fn; window.addEventListener('keydown', keyH, true); }
  const node = x => (typeof x === 'function' ? x() : x);

  function briefing(sh, T, start) {
    sh.body.replaceChildren(el('div', { class: 'ad-brief' },
      el('h2', null, T.name), el('p', { class: 'ad-sub' }, `${T.n} questions · ${T.minutes} minutes`),
      el('ul', null, T.brief.map(b => el('li', null, b))),
      el('p', { class: 'hint' }, 'Keys: 1–4 (or A–D) choose an option, Enter confirms. The timer starts when you press Start.'),
      el('button', { class: 'btn dark', onclick: start }, 'Start test')));
  }

  function runTest(id) {
    const T = TESTS[id]; const sh = openShell(T.name);
    briefing(sh, T, () => {
      const items = T.kind === 'fixed' ? T.build() : [];
      const used = new Set(); let lvl = 1; const log = [];
      const t0 = performance.now(), limit = T.minutes * 60;
      let i = 0, done = false, picked = null, qStart = 0, memoT = null;
      const tick = setInterval(() => { const left = limit - (performance.now() - t0) / 1000; sh.timer.textContent = mmss(left); sh.timer.classList.toggle('low', left < 120); if (left <= 0) finish(true); }, 250);
      overlay.addEventListener('closing', () => { clearInterval(tick); clearTimeout(memoT); });
      function current() { if (T.kind === 'fixed') return items[i]; if (!items[i]) { let it, g = 0; do { it = T.gen(lvl, used); } while (used.has(it.q) && g++ < 20); used.add(typeof it.q === 'string' ? it.q : Math.random()); it.lvl = lvl; it.sec = 'L' + lvl; items[i] = it; } return items[i]; }
      function show() {
        if (i >= T.n) return finish(false);
        const it = current(); picked = null;
        sh.count.textContent = `Question ${i + 1} of ${T.n}`; sh.prog.style.width = (i / T.n * 100) + '%';
        if (it.memo && !it._shown) {
          it._shown = true;
          sh.body.replaceChildren(el('div', { class: 'ad-q' }, el('p', { class: 'ad-sub' }, 'Memorise this. It will disappear.'), el('div', { class: 'ad-memo' }, it.memo)));
          onKeys(e => { if (['Enter', ' '].includes(e.key)) e.preventDefault(); });
          memoT = setTimeout(show, it.ms || 3500); return;
        }
        qStart = performance.now();
        const btns = it.o.map((o, k) => el('button', { class: 'opt', onclick: () => choose(k) }, el('span', { class: 'L' }, 'ABCDE'[k]), el('span', null, node(o))));
        const next = el('button', { class: 'btn dark', disabled: true, onclick: confirm1 }, i + 1 === T.n ? 'Finish' : 'Confirm & next');
        function choose(k) { picked = k; btns.forEach((b, j) => b.classList.toggle('picked', j === k)); next.disabled = false; }
        function confirm1() {
          if (picked == null) return;
          const ok = picked === it.a; const dt = (performance.now() - qStart) / 1000;
          log.push({ sec: it.sec, lvl: it.lvl, ok, dt, picked });
          if (T.kind === 'adaptive') lvl = Math.max(1, Math.min(5, lvl + (ok ? 1 : -1)));
          i++; show();
        }
        sh.body.replaceChildren(el('div', { class: 'ad-q' },
          T.kind === 'adaptive' ? el('div', { class: 'qmeta' }, el('span', { class: 'chip h4' }, 'Level ' + it.lvl)) : null,
          it.pre ? el('div', { class: 'ad-pre' }, node(it.pre)) : null,
          el('div', { class: 'qtext' }, node(it.q)), el('div', { class: 'opts' }, btns), el('div', { class: 'qnav' }, next)));
        onKeys(e => { const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0 && k < btns.length && e.key.length === 1) { e.preventDefault(); choose(k); } else if (e.key === 'Enter') { e.preventDefault(); confirm1(); } });
      }
      function finish(timeUp) {
        if (done) return; done = true; clearInterval(tick); clearTimeout(memoT);
        const used_s = Math.min(limit, (performance.now() - t0) / 1000);
        const correct = log.filter(x => x.ok).length, att = log.length;
        const r = { test: id, name: T.name, n: T.n, correct, att, secs: Math.round(used_s), acc: att ? correct / att : 0, score: correct / T.n };
        if (T.kind === 'adaptive') { r.maxLvl = Math.max(0, ...log.map(x => x.lvl)); r.pts = log.reduce((s, x) => s + (x.ok ? x.lvl : 0), 0); r.score = r.pts / (T.n * 5); r.endLvl = lvl; }
        const bySec = {}; log.forEach(x => { const b = (bySec[x.sec] = bySec[x.sec] || { n: 0, ok: 0, dt: 0 }); b.n++; if (x.ok) b.ok++; b.dt += x.dt; });
        r.bySec = bySec; saveRun(r);
        report(sh, T, r, items, log, timeUp);
      }
      show();
    });
  }

  function band(score) { return score >= .8 ? ['g', 'Strong'] : score >= .6 ? ['a', 'Borderline'] : ['r', 'Needs work']; }
  function report(sh, T, r, items, log, timeUp) {
    onKeys(() => { });
    sh.count.textContent = 'Report'; sh.prog.style.width = '100%'; sh.timer.textContent = '';
    const [bc, bl] = band(r.score);
    const prev = runsOf(r.test).slice(1, 6);
    const secRows = Object.entries(r.bySec).sort().map(([k, b]) => { const [c] = band(b.ok / b.n); return el('tr', null, el('td', null, SEC[k] || (k[0] === 'L' ? 'Level ' + k.slice(1) : k)), el('td', null, `${b.ok}/${b.n}`), el('td', null, (b.dt / b.n).toFixed(1) + ' s'), el('td', null, el('span', { class: 'ad-band ' + c }, Math.round(b.ok / b.n * 100) + '%'))); });
    const review = el('div', { class: 'ad-review', hidden: true }, items.slice(0, log.length).map((it, k) => el('div', { class: 'ad-ritem ' + (log[k].ok ? 'ok' : 'bad') },
      el('div', { class: 'qmeta' }, el('b', null, 'Q' + (k + 1)), el('span', null, SEC[it.sec] || it.sec), el('span', null, log[k].dt.toFixed(1) + ' s'), el('span', null, log[k].ok ? '✓ correct' : '✗ wrong')),
      it.pre ? node(it.pre) : null, el('div', { class: 'ad-rq' }, node(it.q)),
      el('div', { class: 'ad-ropts' }, it.o.map((o, j) => el('span', { class: (j === it.a ? 'ok' : j === log[k].picked ? 'bad' : '') }, 'ABCDE'[j] + '. ', node(o)))),
      it.ex ? el('p', { class: 'hint' }, it.ex) : null)));
    sh.body.replaceChildren(el('div', { class: 'ad-brief' },
      el('h2', null, T.name + ': your report'), timeUp ? el('p', { class: 'ad-sub warn' }, 'Time ran out.') : null,
      el('div', { class: 'ad-kpis' },
        el('div', null, el('small', null, 'Overall'), el('b', { class: 'ad-band ' + bc }, bl)),
        el('div', null, el('small', null, 'Correct'), el('b', null, `${r.correct} / ${r.n}`)),
        el('div', null, el('small', null, 'Accuracy (of attempted)'), el('b', null, Math.round(r.acc * 100) + '%')),
        el('div', null, el('small', null, 'Time used'), el('b', null, mmss(r.secs))),
        r.maxLvl ? el('div', null, el('small', null, 'Highest level'), el('b', null, r.maxLvl + ' / 5')) : null),
      el('table', { class: 'matrix' }, el('tr', null, el('th', null, 'Section'), el('th', null, 'Score'), el('th', null, 'Avg time'), el('th', null, 'Band')), secRows),
      prev.length ? el('p', { class: 'hint' }, 'Previous attempts: ' + prev.map(p => Math.round(p.score * 100) + '%').join(' · ')) : null,
      el('p', { class: 'hint' }, 'Bands are this site\'s own guide (green ≥ 80%, amber 60–79%, red < 60%). Real ADAPT results compare you with a norm group of pilot applicants, which is not public.'),
      el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: () => { review.hidden = !review.hidden; } }, 'Review answers'), el('button', { class: 'btn', onclick: () => runTest(r.test) }, 'New attempt'), el('button', { class: 'btn dark', onclick: closeShell }, 'Close')),
      review));
  }

  /* =====================================================================
     FAST-style multitask simulator
     ===================================================================== */
  const NATO = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'niner'];
  const sayNum = s => String(s).split('').map(d => NATO[+d]).join(' ');
  function speak(text, onend) {
    try { if (!('speechSynthesis' in window)) throw 0; const u = new SpeechSynthesisUtterance(text); u.rate = 1.05; u.lang = 'en-GB'; u.onend = onend; u.onerror = onend; speechSynthesis.speak(u); return true; } catch (e) { setTimeout(onend, 2500); return false; }
  }
  function runFast(mode) {
    const sh = openShell('Multitasking (FAST-style)');
    const own = { pre: 'Indigo', num: String(rnd(2, 8)) + String(rnd(1, 9)) };
    const phaseLen = mode === 'full' ? 225 : 45;
    sh.body.replaceChildren(el('div', { class: 'ad-brief' },
      el('h2', null, 'Multitasking simulator'), el('p', { class: 'ad-sub' }, `4 phases × ${phaseLen} s · tasks are added each phase and speed up`),
      el('ol', null,
        el('li', null, el('b', null, 'Tracking (all phases): '), 'keep the mouse cross-hair inside the moving circle.'),
        el('li', null, el('b', null, 'Gauges (from phase 2): '), 'when a needle enters the red zone, press its key: A, S or D.'),
        el('li', null, el('b', null, 'Arithmetic (from phase 3): '), 'type the answer with the number keys and press Enter.'),
        el('li', null, el('b', null, 'Radio (phase 4): '), `your callsign is `, el('b', null, `${own.pre} ${own.num}`), '. Only when YOU are called, press ← or → for the turn direction you were given. Ignore other callsigns.')),
      el('p', { class: 'hint' }, 'Modelled on Symbiotics\' published description of FAST: about 15 minutes, keyboard + mouse + audio, an increasing number of overlapping tasks, taken twice so improvement can be measured. The real tasks are not public; this trains the same skills. Turn your sound on.'),
      el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: () => speak(`${own.pre} ${sayNum(own.num)}, turn left heading ${sayNum('270')}`, () => { }) }, 'Test sound'), el('button', { class: 'btn dark', onclick: go }, 'Start'))));
    function go() {
      const W = 960, H = 560;
      const cv = el('canvas', { width: W, height: H, class: 'ad-canvas' });
      const status = el('p', { class: 'hint ad-status' }, '');
      sh.body.replaceChildren(el('div', { class: 'ad-simwrap' }, cv, status));
      const ctx = cv.getContext('2d'); const css = getComputedStyle(document.documentElement);
      const col = n => css.getPropertyValue(n).trim() || '#888';
      let mouse = { x: 320, y: 220 };
      cv.addEventListener('mousemove', e => { const b = cv.getBoundingClientRect(); mouse = { x: (e.clientX - b.left) * W / b.width, y: (e.clientY - b.top) * H / b.height }; });
      const ph = [Math.random() * 6, Math.random() * 6, Math.random() * 6, Math.random() * 6];
      const st = { trackIn: 0, trackT: 0, dist: 0, g: { hit: 0, miss: 0, fa: 0, rt: [] }, ar: { ok: 0, bad: 0, miss: 0 }, au: { hit: 0, wrong: 0, miss: 0, fa: 0, n: 0 } };
      const gauges = [0, 1, 2].map(() => ({ v: Math.random() * .4, rate: .04 + Math.random() * .05, red: 0 }));
      let arith = null, input = '', arT = 0, flash = null;
      let radio = null, nextRadio = 4;
      const start = performance.now(); let last = start; let raf;
      const phaseOf = t => Math.min(4, 1 + Math.floor(t / phaseLen));
      function newArith(t) { const op = pick(['+', '−', '×']); let a, b, ans; if (op === '×') { a = rnd(3, 12); b = rnd(3, 9); ans = a * b; } else if (op === '+') { a = rnd(12, 89); b = rnd(11, 59); ans = a + b; } else { a = rnd(40, 99); b = rnd(11, 39); ans = a - b; } arith = { s: `${a} ${op} ${b} =`, ans, t0: t }; input = ''; }
      function newRadio(t) {
        const mine = Math.random() < .45; const dir = pick(['left', 'right']); const h = rnd(1, 36) * 10;
        let cs; if (mine) cs = own; else cs = pick([{ pre: own.pre, num: own.num.split('').reverse().join('') === own.num ? String((+own.num + 1) % 100).padStart(2, '0') : own.num.split('').reverse().join('') }, { pre: 'Air India', num: own.num }, { pre: 'Akasa', num: own.num }, { pre: own.pre, num: String((+own.num + 10) % 100).padStart(2, '0') }]);
        radio = { mine, dir, t0: t, open: false, done: false }; st.au.n++;
        const txt = `${cs.pre} ${sayNum(cs.num)}, turn ${dir} heading ${sayNum(hdg(h))}`;
        const me = radio; const openIt = () => { if (radio === me && !me.open) { me.open = true; me.tOpen = (performance.now() - start) / 1000; } };
        const ok = speak(txt, openIt); setTimeout(openIt, 6000); /* fallback if the browser never reports speech end */
        if (!ok) flash = { text: '📻 ' + `${cs.pre} ${cs.num}, turn ${dir} ${hdg(h)}`, until: t + 3 };
      }
      function key(e) {
        const t = (performance.now() - start) / 1000, p = phaseOf(t);
        const gi = 'asd'.indexOf(e.key.toLowerCase());
        if (gi >= 0 && e.key.length === 1 && p >= 2) { e.preventDefault(); const g = gauges[gi]; if (g.v > .8) { st.g.hit++; st.g.rt.push(t - g.red); g.v = .1 + Math.random() * .2; } else st.g.fa++; return; }
        if (/^[0-9]$/.test(e.key) && p >= 3 && arith) { e.preventDefault(); if (input.length < 4) input += e.key; return; }
        if (e.key === 'Backspace' && arith) { e.preventDefault(); input = input.slice(0, -1); return; }
        if (e.key === 'Enter' && arith && input) { e.preventDefault(); if (+input === arith.ans) st.ar.ok++; else st.ar.bad++; arith = null; arT = t + 1; return; }
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && p >= 4) {
          e.preventDefault(); const d = e.key === 'ArrowLeft' ? 'left' : 'right';
          if (radio && !radio.done) { radio.done = true; if (radio.mine) { if (d === radio.dir) st.au.hit++; else st.au.wrong++; } else st.au.fa++; }
          else st.au.fa++;
        }
      }
      onKeys(key);
      overlay.addEventListener('closing', () => cancelAnimationFrame(raf));
      function frame(now) {
        const dt = Math.min(.05, (now - last) / 1000); last = now; const t = (now - start) / 1000; const p = phaseOf(t);
        if (t >= phaseLen * 4) return end();
        const spd = 1 + (p - 1) * .22;
        const tx = 320 + 230 * Math.sin(.37 * spd * t + ph[0]) * .7 + 60 * Math.sin(1.1 * spd * t + ph[1]);
        const ty = 210 + 150 * Math.sin(.29 * spd * t + ph[2]) * .75 + 45 * Math.sin(.93 * spd * t + ph[3]);
        const R = 30, d = Math.hypot(mouse.x - tx, mouse.y - ty);
        st.trackT += dt; st.dist += d * dt; if (d < R) st.trackIn += dt;
        if (p >= 2) gauges.forEach(g => { const was = g.v > .8; g.v += (g.rate * spd + (Math.random() - .5) * .08) * dt; g.v = Math.max(0, g.v); if (!was && g.v > .8) g.red = t; if (g.v >= 1) { st.g.miss++; g.v = .15; } });
        if (p >= 3) { if (!arith && t >= arT) newArith(t); if (arith && t - arith.t0 > 10) { st.ar.miss++; arith = null; arT = t + 1; } }
        if (p >= 4) {
          if (!radio && t >= nextRadio) newRadio(t);
          if (radio && radio.open && (t - radio.tOpen > 5 || radio.done)) { if (!radio.done && radio.mine) st.au.miss++; radio = null; nextRadio = t + 3 + Math.random() * 4; }
          if (nextRadio < phaseLen * 3) nextRadio = phaseLen * 3 + 2;
        }
        /* draw */
        ctx.fillStyle = col('--panel'); ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = col('--line'); ctx.lineWidth = 2; ctx.strokeRect(10, 10, 620, 410);
        ctx.fillStyle = col('--wash'); ctx.fillRect(11, 11, 618, 408);
        ctx.beginPath(); ctx.arc(tx, ty, R, 0, 7); ctx.fillStyle = d < R ? col('--ok-bg') : col('--warn-bg'); ctx.fill(); ctx.strokeStyle = d < R ? col('--ok') : col('--warn'); ctx.lineWidth = 3; ctx.stroke();
        ctx.strokeStyle = col('--ink'); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mouse.x - 12, mouse.y); ctx.lineTo(mouse.x + 12, mouse.y); ctx.moveTo(mouse.x, mouse.y - 12); ctx.lineTo(mouse.x, mouse.y + 12); ctx.stroke();
        ['A', 'S', 'D'].forEach((k, i) => {
          const x = 670 + i * 95, y = 30, h = 340, g = gauges[i];
          ctx.globalAlpha = p >= 2 ? 1 : .25;
          ctx.fillStyle = col('--wash'); ctx.fillRect(x, y, 50, h); ctx.fillStyle = col('--warn-bg'); ctx.fillRect(x, y, 50, h * .2);
          ctx.strokeStyle = col('--line'); ctx.strokeRect(x, y, 50, h);
          const ny = y + h * (1 - Math.min(1, g.v)); ctx.fillStyle = g.v > .8 ? col('--warn') : col('--ink'); ctx.fillRect(x - 6, ny - 3, 62, 6);
          ctx.fillStyle = col('--ink'); ctx.font = '800 20px system-ui'; ctx.textAlign = 'center'; ctx.fillText(k, x + 25, y + h + 30);
          ctx.globalAlpha = 1;
        });
        ctx.globalAlpha = p >= 3 ? 1 : .25; ctx.strokeStyle = col('--line'); ctx.strokeRect(10, 440, 620, 100);
        ctx.fillStyle = col('--ink'); ctx.font = '800 34px system-ui'; ctx.textAlign = 'left';
        if (arith) { ctx.fillText(arith.s + ' ' + input + (Math.floor(t * 2) % 2 ? '_' : ''), 40, 502); ctx.fillStyle = col('--muted'); ctx.fillRect(40, 520, 560 * Math.max(0, 1 - (t - arith.t0) / 10), 5); }
        else if (p < 3) { ctx.font = '600 16px system-ui'; ctx.fillText('Arithmetic starts in phase 3', 40, 497); }
        ctx.globalAlpha = 1;
        ctx.fillStyle = col('--ink'); ctx.font = '700 15px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(`Phase ${p} / 4`, 660, 455); ctx.fillText(`Callsign: ${own.pre} ${own.num}`, 660, 480);
        ctx.fillStyle = p >= 4 ? (radio ? col('--accent') : col('--muted')) : col('--faint'); ctx.fillText(p >= 4 ? (radio ? (radio.open ? '📻 respond now?' : '📻 transmitting…') : '📻 listening') : 'Radio starts in phase 4', 660, 505);
        if (flash && t < flash.until) { ctx.fillStyle = col('--ink'); ctx.font = '700 14px system-ui'; ctx.fillText(flash.text, 660, 530); }
        sh.timer.textContent = mmss(phaseLen * 4 - t); sh.count.textContent = 'Phase ' + p; sh.prog.style.width = (t / (phaseLen * 4) * 100) + '%';
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      function end() {
        try { speechSynthesis.cancel(); } catch (e) { }
        const tr = st.trackIn / st.trackT;
        const gN = st.g.hit + st.g.miss; const gs = gN ? Math.max(0, (st.g.hit - st.g.fa * .5) / gN) : 0;
        const aN = st.ar.ok + st.ar.bad + st.ar.miss; const as = aN ? st.ar.ok / aN : 0;
        const rN = st.au.hit + st.au.wrong + st.au.miss; const rs = rN ? Math.max(0, (st.au.hit - st.au.fa * .5) / rN) : 0;
        const score = tr * .3 + gs * .25 + as * .2 + rs * .25;
        const prev = runsOf('fast').filter(r => r.mode === mode)[0];
        const r = { test: 'fast', name: 'Multitasking', mode, score, tr, gs, as, rs, rt: st.g.rt.length ? st.g.rt.reduce((a, b) => a + b, 0) / st.g.rt.length : null, detail: st };
        saveRun(r); onKeys(() => { });
        const row = (n, v, s) => el('tr', null, el('td', null, n), el('td', null, s), el('td', null, el('span', { class: 'ad-band ' + band(v)[0] }, Math.round(v * 100) + '%')));
        sh.body.replaceChildren(el('div', { class: 'ad-brief' }, el('h2', null, 'Multitasking: your report'),
          el('div', { class: 'ad-kpis' }, el('div', null, el('small', null, 'Composite'), el('b', { class: 'ad-band ' + band(score)[0] }, Math.round(score * 100))),
            prev ? el('div', null, el('small', null, 'vs previous attempt'), el('b', null, (score >= prev.score ? '+' : '') + Math.round((score - prev.score) * 100))) : null),
          el('table', { class: 'matrix' }, el('tr', null, el('th', null, 'Task'), el('th', null, 'Detail'), el('th', null, 'Score')),
            row('Tracking', tr, `inside the circle ${Math.round(tr * 100)}% of the time · mean error ${Math.round(st.dist / st.trackT)} px`),
            row('Gauges', gs, `${st.g.hit} caught, ${st.g.miss} missed, ${st.g.fa} false presses${r.rt ? ' · mean reaction ' + r.rt.toFixed(1) + ' s' : ''}`),
            row('Arithmetic', as, `${st.ar.ok} right, ${st.ar.bad} wrong, ${st.ar.miss} timed out`),
            row('Radio', rs, `${st.au.hit} correct, ${st.au.wrong} wrong direction, ${st.au.miss} missed, ${st.au.fa} responded to someone else`)),
          el('p', { class: 'hint' }, 'What helps: keep tracking smooth (small mouse moves), glance at gauges on a rhythm instead of staring, answer sums in one go, and keep a "radio ear" open for your own callsign only. The real FAST is taken twice; the improvement from attempt 1 to 2 is part of what is measured.'),
          el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: () => runFast(mode) }, 'Try again'), el('button', { class: 'btn dark', onclick: closeShell }, 'Close'))));
      }
    }
  }

  /* =====================================================================
     Control & co-ordination ("ball game")
     ===================================================================== */
  function runBall() {
    const sh = openShell('Control & co-ordination');
    const DUR = 90;
    sh.body.replaceChildren(el('div', { class: 'ad-brief' }, el('h2', null, 'Ball control'), el('p', { class: 'ad-sub' }, `${DUR} seconds · two axes + pedals`),
      el('ul', null, el('li', null, 'A drifting force pushes the ball. Keep it inside the inner ring.'),
        el('li', null, 'Joystick: a gamepad if connected; otherwise the MOUSE acts as the stick: its distance from the centre cross is the stick deflection (it is not a pointer). Arrow keys also work.'),
        el('li', null, 'Pedals: keep the bottom marker centred with Z (left) and X (right), or the gamepad shoulder buttons.'),
        el('li', null, 'Small, early corrections beat big late ones. Over-controlling is the usual fault.')),
      el('p', { class: 'hint' }, 'Symbiotics\' ADAPT includes a joystick control and co-ordination task (the "ball game"). This is a mouse/keyboard approximation; at the centre you will use a real joystick and pedals.'),
      el('button', { class: 'btn dark', onclick: go }, 'Start')));
    function go() {
      const W = 720, H = 520; const cv = el('canvas', { width: W, height: H, class: 'ad-canvas' }); sh.body.replaceChildren(el('div', { class: 'ad-simwrap' }, cv));
      const ctx = cv.getContext('2d'); const css = getComputedStyle(document.documentElement); const col = n => css.getPropertyValue(n).trim();
      const C = { x: W / 2, y: 220 }; let mouse = { x: C.x, y: C.y }, keys = {};
      cv.addEventListener('mousemove', e => { const b = cv.getBoundingClientRect(); mouse = { x: (e.clientX - b.left) * W / b.width, y: (e.clientY - b.top) * H / b.height }; });
      onKeys(e => { if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'z', 'x', 'Z', 'X'].includes(e.key)) { e.preventDefault(); keys[e.key.toLowerCase()] = e.type === 'keydown'; } });
      const up = e => { keys[e.key.toLowerCase()] = false; }; window.addEventListener('keyup', up);
      const p = { x: C.x, y: C.y, vx: 0, vy: 0 }, ped = { x: 0, v: 0 }; const ph = Array.from({ length: 6 }, () => Math.random() * 6);
      let inIn = 0, inOut = 0, pedIn = 0, err = 0, T = 0; const start = performance.now(); let last = start, raf;
      overlay.addEventListener('closing', () => { cancelAnimationFrame(raf); window.removeEventListener('keyup', up); });
      function frame(now) {
        const dt = Math.min(.05, (now - last) / 1000); last = now; const t = (now - start) / 1000; if (t >= DUR) return end();
        const k = 1 + t / DUR * 1.2;
        const dx = (Math.sin(.7 * t + ph[0]) + .6 * Math.sin(1.9 * t + ph[1])) * 120 * k, dy = (Math.sin(.6 * t + ph[2]) + .6 * Math.sin(1.6 * t + ph[3])) * 120 * k;
        let sx = 0, sy = 0, pz = 0; const gp = navigator.getGamepads ? [...navigator.getGamepads()].find(g => g) : null;
        if (gp) { sx = gp.axes[0] || 0; sy = gp.axes[1] || 0; pz = (gp.buttons[5] && gp.buttons[5].pressed ? 1 : 0) - (gp.buttons[4] && gp.buttons[4].pressed ? 1 : 0); if (gp.axes.length > 2 && Math.abs(gp.axes[2]) > .1) pz = gp.axes[2]; }
        else { sx = Math.max(-1, Math.min(1, (mouse.x - C.x) / 150)); sy = Math.max(-1, Math.min(1, (mouse.y - C.y) / 150)); }
        if (keys.arrowleft) sx = -1; if (keys.arrowright) sx = 1; if (keys.arrowup) sy = -1; if (keys.arrowdown) sy = 1; if (keys.z) pz = -1; if (keys.x) pz = 1;
        p.vx += (dx + sx * 420 - p.vx * 1.6) * dt; p.vy += (dy + sy * 420 - p.vy * 1.6) * dt; p.x += p.vx * dt; p.y += p.vy * dt;
        p.x = Math.max(20, Math.min(W - 20, p.x)); p.y = Math.max(20, Math.min(420, p.y));
        ped.v += ((Math.sin(.5 * t + ph[4]) + .5 * Math.sin(1.4 * t + ph[5])) * 90 * k + pz * 260 - ped.v * 1.6) * dt; ped.x = Math.max(-300, Math.min(300, ped.x + ped.v * dt));
        const d = Math.hypot(p.x - C.x, p.y - C.y); T += dt; err += d * dt; if (d < 45) inIn += dt; if (d < 120) inOut += dt; if (Math.abs(ped.x) < 40) pedIn += dt;
        ctx.fillStyle = col('--panel'); ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = col('--line'); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(C.x, C.y, 120, 0, 7); ctx.stroke();
        ctx.fillStyle = col('--ok-bg'); ctx.beginPath(); ctx.arc(C.x, C.y, 45, 0, 7); ctx.fill(); ctx.strokeStyle = col('--ok'); ctx.stroke();
        ctx.strokeStyle = col('--faint'); ctx.beginPath(); ctx.moveTo(C.x - 10, C.y); ctx.lineTo(C.x + 10, C.y); ctx.moveTo(C.x, C.y - 10); ctx.lineTo(C.x, C.y + 10); ctx.stroke();
        ctx.fillStyle = d < 45 ? col('--ok') : d < 120 ? col('--num') : col('--warn'); ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, 7); ctx.fill();
        ctx.fillStyle = col('--wash'); ctx.fillRect(60, 455, W - 120, 30); ctx.fillStyle = col('--ok-bg'); ctx.fillRect(C.x - 40, 455, 80, 30);
        ctx.fillStyle = Math.abs(ped.x) < 40 ? col('--ok') : col('--warn'); ctx.fillRect(C.x + ped.x - 5, 450, 10, 40);
        ctx.fillStyle = col('--muted'); ctx.font = '600 13px system-ui'; ctx.textAlign = 'center'; ctx.fillText('pedals: Z ◀ ▶ X', C.x, 507);
        sh.timer.textContent = mmss(DUR - t); sh.prog.style.width = (t / DUR * 100) + '%';
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      function end() {
        window.removeEventListener('keyup', up); onKeys(() => { });
        const a = inIn / T, b = inOut / T, c = pedIn / T; const score = a * .45 + b * .25 + c * .3;
        const prev = runsOf('ball')[0];
        saveRun({ test: 'ball', name: 'Ball control', score, inner: a, outer: b, ped: c, err: err / T });
        sh.body.replaceChildren(el('div', { class: 'ad-brief' }, el('h2', null, 'Ball control: your report'),
          el('div', { class: 'ad-kpis' }, el('div', null, el('small', null, 'Composite'), el('b', { class: 'ad-band ' + band(score)[0] }, Math.round(score * 100))),
            el('div', null, el('small', null, 'Inner ring'), el('b', null, Math.round(a * 100) + '%')), el('div', null, el('small', null, 'Outer ring'), el('b', null, Math.round(b * 100) + '%')),
            el('div', null, el('small', null, 'Pedals centred'), el('b', null, Math.round(c * 100) + '%')), prev ? el('div', null, el('small', null, 'vs last'), el('b', null, (score >= prev.score ? '+' : '') + Math.round((score - prev.score) * 100))) : null),
          el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: runBall }, 'Try again'), el('button', { class: 'btn dark', onclick: closeShell }, 'Close'))));
      }
    }
  }

  /* =====================================================================
     Personality questionnaire practice (APQ-style)
     ===================================================================== */
  function runAPQ() {
    const sh = openShell('Personality questionnaire');
    const LK = ['Strongly disagree', 'Disagree', 'Neither', 'Agree', 'Strongly agree'];
    sh.body.replaceChildren(el('div', { class: 'ad-brief' }, el('h2', null, 'Personality questionnaire (practice)'), el('p', { class: 'ad-sub' }, `${B.apq.length} statements · untimed · about 10–15 minutes`),
      el('ul', null, el('li', null, 'The real ADAPT Personality Questionnaire has 275+ items, takes about an hour, is untimed and can be taken only once.'),
        el('li', null, 'Answer quickly, as you actually are at work or study, not as you wish you were. There are no right answers to single items.'),
        el('li', null, 'Some statements are re-worded repeats; inconsistent answers to them are what flags a profile as unreliable.'),
        el('li', null, 'A few items ("I have never…") check whether you are trying to look perfect. Nobody honestly agrees with all of them.')),
      el('p', { class: 'hint' }, 'Use this to get used to the format and to see your own tendencies. It is not a validated psychometric instrument and the scales below are this site\'s practice scales, not Symbiotics\' scales.'),
      el('p', { class: 'hint' }, 'Keys: 1–5 choose. Your answer moves you on immediately.'),
      el('button', { class: 'btn dark', onclick: go }, 'Start')));
    function go() {
      const order = shuffle(B.apq.map((_, i) => i)); const ans = {}; let k = 0; const t0 = performance.now();
      const tick = setInterval(() => { sh.timer.textContent = mmss((performance.now() - t0) / 1000); }, 500);
      overlay.addEventListener('closing', () => clearInterval(tick));
      function show() {
        if (k >= order.length) return end();
        const idx = order[k]; sh.count.textContent = `${k + 1} / ${order.length}`; sh.prog.style.width = (k / order.length * 100) + '%';
        const btns = LK.map((l, j) => el('button', { class: 'ad-lk', onclick: () => choose(j + 1) }, el('b', null, j + 1), el('span', null, l)));
        sh.body.replaceChildren(el('div', { class: 'ad-q' }, el('div', { class: 'qtext ad-stmt' }, B.apq[idx][0]), el('div', { class: 'ad-likert' }, btns),
          k ? el('button', { class: 'btn ghost', onclick: () => { k--; show(); } }, '← back') : null));
        function choose(v) { ans[idx] = v; k++; show(); }
        onKeys(e => { const v = '12345'.indexOf(e.key); if (v >= 0) { e.preventDefault(); choose(v + 1); } });
      }
      function end() {
        clearInterval(tick); onKeys(() => { });
        const keyed = i => { const [, , r] = B.apq[i]; return r ? 6 - ans[i] : ans[i]; };
        const sc = {}; B.apq.forEach(([, s], i) => { (sc[s] = sc[s] || []).push(keyed(i)); });
        const ten = a => Math.round(((a.reduce((x, y) => x + y, 0) / a.length) - 1) / 4 * 100) / 10;
        const res = {}; Object.keys(B.apqScales).forEach(s => res[s] = ten(sc[s]));
        const im = sc.IM.reduce((a, b) => a + b, 0) / sc.IM.length;
        const twin = B.apqTwins.map(([a, b]) => Math.abs(keyed(a) - keyed(b))); const incons = twin.filter(d => d >= 2).length;
        const vals = Object.values(ans); const ext = vals.filter(v => v === 1 || v === 5).length / vals.length; const mid = vals.filter(v => v === 3).length / vals.length;
        saveRun({ test: 'apq', name: 'Personality', res, im, incons, ext, mid, score: null });
        const flags = [];
        if (im >= 3.8) flags.push(['r', 'Impression management high', `You agreed strongly with statements almost nobody can honestly endorse (mean ${im.toFixed(1)}/5). Real questionnaires flag this as "faking good" and it can invalidate the profile. Answer honestly.`]);
        else flags.push(['g', 'Impression management normal', `Mean ${im.toFixed(1)}/5 on the "too good to be true" items.`]);
        flags.push(incons >= 2 ? ['r', 'Inconsistent answers', `${incons} of ${twin.length} re-worded pairs differed by 2+ points. Slow down and answer as you really are.`] : ['g', 'Consistent', `${twin.length - incons} of ${twin.length} re-worded pairs answered consistently.`]);
        if (ext > .65) flags.push(['a', 'Many extreme answers', `${Math.round(ext * 100)}% of answers were 1 or 5. Fine if true, but strong extremes everywhere can read as rigid.`]);
        if (mid > .35) flags.push(['a', 'Many neutral answers', `${Math.round(mid * 100)}% were "neither". Over-using the middle gives a flat, uninformative profile.`]);
        const bars = Object.entries(B.apqScales).map(([s, m]) => { const v = res[s]; const ok = v >= m.target[0] && v <= m.target[1];
          return el('div', { class: 'ad-scale' }, el('div', { class: 'ad-sn' }, el('b', null, m.name), el('small', null, m.why)),
            el('div', { class: 'ad-sbar' }, el('i', { class: 'tgt', style: { left: m.target[0] * 10 + '%', width: (m.target[1] - m.target[0]) * 10 + '%' } }), el('i', { class: 'val ' + (ok ? 'ok' : 'off'), style: { left: `calc(${v * 10}% - 7px)` } })),
            el('span', { class: 'ad-sv' }, v.toFixed(1))); });
        sh.count.textContent = 'Profile'; sh.prog.style.width = '100%';
        sh.body.replaceChildren(el('div', { class: 'ad-brief' }, el('h2', null, 'Your practice profile'),
          el('div', { class: 'ad-flags' }, flags.map(([c, t, x]) => el('div', { class: 'ad-flag ' + c }, el('b', null, t), el('p', null, x)))),
          el('h3', null, 'Scales (0–10)'), el('p', { class: 'hint' }, 'Shaded band = the range generally sought for airline pilots in published research on pilot personality (high emotional stability and conscientiousness, low impulsivity, cooperative but assertive). Outside the band is a prompt to reflect, not a fail.'),
          el('div', { class: 'ad-scales' }, bars),
          el('h3', null, 'How to use this honestly'),
          el('ul', null, el('li', null, 'Do not try to "game" the real questionnaire: consistency and impression-management checks, plus the interview that probes your profile, catch it.'),
            el('li', null, 'If a scale is outside the band, find real examples from your life that show the opposite, and build the habit (e.g. checklists for conscientiousness, sport or debate for assertiveness). Interviewers often ask about exactly these areas.'),
            el('li', null, 'Take it again in a few weeks and compare.')),
          el('div', { class: 'qnav' }, el('button', { class: 'btn dark', onclick: closeShell }, 'Close'))));
      }
      show();
    }
  }

  /* =====================================================================
     Situational judgement (best / worst)
     ===================================================================== */
  function runSJT() {
    const sh = openShell('Situational judgement');
    const items = shuffle(B.sjt).slice(0, 12); let i = 0, pts = 0; const log = [];
    function show() {
      if (i >= items.length) return end();
      const it = items[i]; let best = null, worst = null;
      sh.count.textContent = `${i + 1} / ${items.length}`; sh.prog.style.width = (i / items.length * 100) + '%';
      const rows = it.o.map((o, k) => el('div', { class: 'ad-sjrow' }, el('span', null, o),
        el('button', { class: 'ad-sb', 'data-k': k, 'data-t': 'b', onclick: () => set('b', k) }, 'Best'), el('button', { class: 'ad-sb', 'data-k': k, 'data-t': 'w', onclick: () => set('w', k) }, 'Worst')));
      const go = el('button', { class: 'btn dark', disabled: true, onclick: submit }, 'Confirm');
      const fb = el('div');
      function set(t, k) { if (t === 'b') { best = k; if (worst === k) worst = null; } else { worst = k; if (best === k) best = null; } rows.forEach((r, j) => { r.querySelector('[data-t=b]').classList.toggle('on', best === j); r.querySelector('[data-t=w]').classList.toggle('on', worst === j); }); go.disabled = best == null || worst == null; }
      function submit() {
        const p = (best === it.best ? 1 : 0) + (worst === it.worst ? 1 : 0); pts += p; log.push(p);
        rows.forEach((r, j) => { r.classList.toggle('ok', j === it.best); r.classList.toggle('bad', j === it.worst); r.querySelectorAll('button').forEach(b => b.disabled = true); });
        go.remove(); fb.replaceChildren(el('div', { class: 'why' }, el('b', null, p === 2 ? 'Both right' : p === 1 ? 'One of two' : 'Neither matched'), it.ex), el('div', { class: 'qnav' }, el('button', { class: 'btn dark', onclick: () => { i++; show(); } }, 'Next')));
      }
      sh.body.replaceChildren(el('div', { class: 'ad-q' }, el('div', { class: 'qtext' }, it.s), el('p', { class: 'hint' }, 'Pick the BEST and the WORST response.'), el('div', { class: 'ad-sj' }, rows), el('div', { class: 'qnav' }, go), fb));
    }
    function end() { const score = pts / (items.length * 2); saveRun({ test: 'sjt', name: 'Judgement', score, pts });
      sh.body.replaceChildren(el('div', { class: 'ad-brief' }, el('h2', null, 'Judgement: ' + pts + ' / ' + items.length * 2), el('p', null, 'These scenarios test CRM values: speak up with facts, follow procedures, report your own errors, include the team, and put safety above schedule or ego. Interviewers and GD assessors look for the same things.'), el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: runSJT }, 'Again'), el('button', { class: 'btn dark', onclick: closeShell }, 'Close')))); }
    show();
  }

  /* =====================================================================
     Interview practice
     ===================================================================== */
  function interviewBlock() {
    const a = store();
    const cats = ['All', ...new Set(B.interview.map(x => x.c))];
    let cat = 'All', cur = null, rec = null, chunks = [], stream = null, tmr = null;
    const box = el('div', { class: 'ad-iv' });
    const seg = el('select', { class: 'ad-sel', 'aria-label': 'Category', onchange: e => { cat = e.target.value; cur = null; draw(); } }, cats.map(c => el('option', { value: c }, c === 'All' ? `All categories (${B.interview.length})` : `${c} (${B.interview.filter(x => x.c === c).length})`)));
    const rnd1 = el('button', { class: 'btn dark', onclick: () => next() }, 'Random question');
    const card = el('div', { class: 'ad-ivcard' });
    const list = el('div', { class: 'ad-ivlist' });
    function next() { const pool = B.interview.filter(x => cat === 'All' || x.c === cat); const fresh = pool.filter(x => !a.iv[x.q]); cur = pick(fresh.length ? fresh : pool); drawCard(); }
    function stopRec() { try { rec && rec.state !== 'inactive' && rec.stop(); } catch (e) { } if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; }
    function drawCard() {
      clearInterval(tmr); stopRec();
      if (!cur) { next(); return; }
      const t = el('b', { class: 'ad-ivt' }, '1:30'); let left = 90;
      const reveal = el('div', { hidden: true }, el('div', { class: 'why' }, el('b', null, 'Key points'), cur.look, cur.catLook && cur.catLook !== cur.look ? el('p', { class: 'hint' }, cur.catLook) : null, cur.tip ? el('p', null, el('b', null, 'Outline: '), cur.tip) : null));
      const audio = el('div');
      const recBtn = el('button', { class: 'btn', onclick: async () => {
        if (rec && rec.state === 'recording') { stopRec(); recBtn.textContent = 'Record again'; return; }
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); rec = new MediaRecorder(stream); chunks = []; rec.ondataavailable = e => chunks.push(e.data);
          rec.onstop = () => { const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })); audio.replaceChildren(el('audio', { controls: true, src: url }), el('p', { class: 'hint' }, 'Recording stays in this tab only; nothing is uploaded or saved.')); };
          rec.start(); recBtn.textContent = '■ Stop recording'; } catch (e) { toast('Microphone not available'); }
      } }, '● Record my answer');
      const rate = ['Structure (STAR / clear points)', 'Specific personal example', 'Relevance to flying / the airline', 'Delivery (calm, concise, eye contact)'];
      const vals = {};
      const rateEl = el('div', { class: 'ad-rate' }, rate.map(r => el('div', null, el('span', null, r), el('span', { class: 'ad-stars' }, [1, 2, 3, 4, 5].map(n => el('button', { onclick: e => { vals[r] = n; e.currentTarget.parentNode.querySelectorAll('button').forEach((b, j) => b.classList.toggle('on', j < n)); } }, '★'))))));
      const save = el('button', { class: 'btn dark', onclick: () => { const v = Object.values(vals); a.iv[cur.q] = { t: Date.now(), avg: v.length ? v.reduce((x, y) => x + y, 0) / v.length : null, n: ((a.iv[cur.q] || {}).n || 0) + 1 }; S.save(); toast('Saved'); drawList(); next(); } }, 'Save & next');
      card.replaceChildren(el('div', { class: 'qmeta' }, el('span', { class: 'chip h3' }, cur.c), el('span', { class: 'ad-srcl' + (/^reported/.test(cur.src) ? ' rep' : '') }, /^reported/.test(cur.src) ? cur.src : 'standard question for this category')),
        el('div', { class: 'qtext' }, cur.q),
        el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: () => { clearInterval(tmr); left = 90; tmr = setInterval(() => { left--; t.textContent = mmss(left); t.classList.toggle('low', left <= 15); if (left <= 0) { clearInterval(tmr); toast('Time: wrap up in one sentence'); } }, 1000); } }, '▶ 90 s answer timer'), t, recBtn, el('button', { class: 'btn ghost', onclick: () => { reveal.hidden = false; } }, 'Show key points')),
        audio, reveal, el('p', { class: 'hint' }, 'Rate yourself honestly after answering out loud:'), rateEl,
        el('div', { class: 'qnav' }, save, el('button', { class: 'btn ghost', onclick: next }, 'Skip')));
    }
    function drawList() {
      const done = B.interview.filter(x => a.iv[x.q]).length;
      list.replaceChildren(el('div', { class: 'viewall' },
        el('p', { class: 'hint' }, `Practised ${done} of ${B.interview.length} questions.`),
        el('button', { class: 'btn', onclick: openAll }, icon('list'), `View all questions (${B.interview.length})`)));
    }
    /* every question in a pop-up: filter, search, tap one to practise it */
    function openAll() {
      let fcat = cat, term = '';
      const search = el('input', { type: 'search', placeholder: 'Search questions…', 'aria-label': 'Search questions' });
      const csel = el('select', { 'aria-label': 'Category' }, cats.map(c => el('option', { value: c, selected: c === fcat }, c === 'All' ? `All categories` : c)));
      const m = G.modal({ title: 'All interview questions', count: B.interview.length, tools: [search, csel] });
      function fill() {
        const t = term.trim().toLowerCase();
        const pool = B.interview.filter(x => (fcat === 'All' || x.c === fcat) && (!t || x.q.toLowerCase().includes(t)));
        m.setCount(pool.length);
        const groups = {}; pool.forEach(x => (groups[x.c] = groups[x.c] || []).push(x));
        let n = 0;
        m.body.replaceChildren(...(pool.length ? Object.keys(groups).flatMap(g => [el('div', { class: 'gpm-group' }, `${g} · ${groups[g].length}`),
          ...groups[g].map(x => { n++; const r = a.iv[x.q]; return el('button', { class: 'gpm-item' + (r ? ' done' : ''), onclick: () => { cur = x; drawCard(); m.close(); } },
            el('span', { class: 'n' }, r ? '✓' : String(n)), el('span', { class: 'tx' }, x.q), r && r.avg ? el('span', { class: 'st' }, r.avg.toFixed(1) + '★') : null); })])
          : [el('p', { class: 'gpm-empty' }, 'No questions match.')]));
      }
      search.addEventListener('input', () => { term = search.value; fill(); });
      csel.addEventListener('change', () => { fcat = csel.value; fill(); });
      fill();
    }
    function draw() { drawCard(); drawList(); }
    box.append(el('div', { class: 'qb-top' }, seg, rnd1), card, list); draw();
    return box;
  }

  /* =====================================================================
     Group discussion practice
     ===================================================================== */
  function gdBlock() {
    const a = store(); let cur = null, tmr = null;
    const box = el('div', { class: 'ad-gd' }); const card = el('div', { class: 'ad-ivcard' }); const list = el('div', { class: 'ad-ivlist' });
    const BEH = ['Opened or added a new direction', 'Used a fact or number', 'Built on someone else\'s point by name', 'Invited a quieter member in', 'Disagreed politely with a reason', 'Summarised the discussion', 'Kept to time / helped reach a conclusion', 'Did NOT interrupt or raise my voice'];
    function run(sec, lab, t, after) { clearInterval(tmr); let left = sec; t.textContent = lab + ' ' + mmss(left); tmr = setInterval(() => { left--; t.textContent = lab + ' ' + mmss(left); t.classList.toggle('low', left <= 30); if (left <= 0) { clearInterval(tmr); toast(lab + ' over'); after && after(); } }, 1000); }
    function drawCard() {
      clearInterval(tmr);
      if (!cur) { card.replaceChildren(el('p', { class: 'hint' }, 'Draw a topic. Real GDs usually give 1–2 minutes to think and 10–15 minutes to discuss in a group of 6–10, often with no moderator.'), el('button', { class: 'btn dark', onclick: () => { cur = pickG(); drawCard(); } }, 'Draw a topic')); return; }
      const g = cur; const t = el('b', { class: 'ad-ivt' }, '');
      const notes = el('textarea', { class: 'ad-notes', placeholder: 'Your points: opening line, 2–3 arguments with a fact each, a counter-point, a closing summary…' }); notes.value = (a.gd[g.t] || {}).notes || '';
      notes.addEventListener('input', () => { a.gd[g.t] = Object.assign(a.gd[g.t] || {}, { notes: notes.value }); S.save(); });
      const reveal = el('div', { hidden: true }, el('div', { class: 'ad-gdgrid' },
        g.facts.length ? el('div', null, el('b', null, 'Facts you can quote'), el('ul', null, g.facts.map(f => el('li', null, f)))) : null,
        g.for.length ? el('div', null, el('b', null, 'Points for'), el('ul', null, g.for.map(f => el('li', null, f)))) : null, g.against.length ? el('div', null, el('b', null, 'Points against'), el('ul', null, g.against.map(f => el('li', null, f)))) : null,
        g.close ? el('div', null, el('b', null, 'A balanced close'), el('p', null, g.close)) : null));
      const checks = el('div', { class: 'ad-checks' }, BEH.map(b => el('label', null, el('input', { type: 'checkbox' }), ' ', b)));
      card.replaceChildren(el('div', { class: 'qmeta' }, el('span', { class: 'chip h2' }, g.kind), el('span', { class: 'ad-srcl' + (/^reported/.test(g.src) ? ' rep' : '') }, g.src)), el('div', { class: 'qtext' }, g.t),
        el('div', { class: 'qnav' }, el('button', { class: 'btn', onclick: () => run(120, 'Think', t) }, '▶ 2 min to think'), el('button', { class: 'btn', onclick: () => run(600, 'Discuss', t) }, '▶ 10 min discussion'), el('button', { class: 'btn', onclick: () => run(60, 'Opening', t) }, '▶ 1 min solo opening'), t),
        notes, el('button', { class: 'btn ghost', onclick: () => { reveal.hidden = !reveal.hidden; } }, 'Show facts & both sides'), reveal,
        el('p', { class: 'hint' }, 'After practising (with friends, or speaking your part alone), tick what you actually did:'), checks,
        el('div', { class: 'qnav' }, el('button', { class: 'btn dark', onclick: () => { const n = checks.querySelectorAll('input:checked').length; a.gd[g.t] = Object.assign(a.gd[g.t] || {}, { t: Date.now(), n }); S.save(); toast(`Saved: ${n}/${BEH.length} behaviours`); drawList(); cur = pickG(); drawCard(); } }, 'Save & next topic'), el('button', { class: 'btn ghost', onclick: () => { cur = pickG(); drawCard(); } }, 'Another topic')));
    }
    let kind = 'All'; const kinds = ['All', ...new Set(B.gd.map(g => g.kind))];
    const ksel = el('select', { class: 'ad-sel', 'aria-label': 'Topic type', onchange: e => { kind = e.target.value; drawList(); } }, kinds.map(k => el('option', { value: k }, k === 'All' ? `All topics (${B.gd.length})` : `${k} (${B.gd.filter(g => g.kind === k).length})`)));
    const pickG = () => pick(B.gd.filter(g => kind === 'All' || g.kind === kind));
    function drawList() {
      const done = B.gd.filter(g => a.gd[g.t] && a.gd[g.t].t).length;
      list.replaceChildren(el('div', { class: 'viewall' },
        el('p', { class: 'hint' }, `Practised ${done} of ${B.gd.length} topics.`),
        el('button', { class: 'btn', onclick: openAll }, icon('list'), `View all topics (${B.gd.length})`)));
    }
    function openAll() {
      let fk = kind, term = '';
      const search = el('input', { type: 'search', placeholder: 'Search topics…', 'aria-label': 'Search topics' });
      const sel = el('select', { 'aria-label': 'Topic type' }, kinds.map(k => el('option', { value: k, selected: k === fk }, k === 'All' ? 'All topic types' : k)));
      const m = G.modal({ title: 'All GD topics', count: B.gd.length, tools: [search, sel] });
      function fill() {
        const t = term.trim().toLowerCase();
        const pool = B.gd.filter(g => (fk === 'All' || g.kind === fk) && (!t || g.t.toLowerCase().includes(t)));
        m.setCount(pool.length);
        const groups = {}; pool.forEach(g => (groups[g.kind] = groups[g.kind] || []).push(g));
        let n = 0;
        m.body.replaceChildren(...(pool.length ? Object.keys(groups).flatMap(k => [el('div', { class: 'gpm-group' }, `${k} · ${groups[k].length}`),
          ...groups[k].map(g => { n++; const r = a.gd[g.t]; const did = r && r.t; return el('button', { class: 'gpm-item' + (did ? ' done' : ''), onclick: () => { cur = g; drawCard(); m.close(); } },
            el('span', { class: 'n' }, did ? '✓' : String(n)), el('span', { class: 'tx' }, g.t), r && r.n != null ? el('span', { class: 'st' }, `${r.n}/8`) : null); })])
          : [el('p', { class: 'gpm-empty' }, 'No topics match.')]));
      }
      search.addEventListener('input', () => { term = search.value; fill(); });
      sel.addEventListener('change', () => { fk = sel.value; fill(); });
      fill();
    }
    box.append(el('div', { class: 'qb-top' }, ksel, el('button', { class: 'btn dark', onclick: () => { cur = pickG(); drawCard(); } }, 'Random topic')), card, list); cur = pickG(); drawCard(); drawList(); return box;
  }

  /* =====================================================================
     Dashboard (test cards) + mount
     ===================================================================== */
  const CARDS = [
    { id: 'cr', name: 'Cognitive Reasoning', sub: '36 Q · 30 min · 6 elements', run: () => runTest('cr'), hue: 'h1', ic: 'brain' },
    { id: 'maths', name: 'Progressive Maths', sub: '20 Q · 30 min · adaptive', run: () => runTest('maths'), hue: 'h0', ic: 'calc' },
    { id: 'physics', name: 'Progressive Physics', sub: '20 Q · 25 min · adaptive', run: () => runTest('physics'), hue: 'h2', ic: 'spark' },
    { id: 'eng', name: 'English', sub: '25 Q · 20 min', run: () => runTest('eng'), hue: 'h3', ic: 'book' },
    { id: 'fast', name: 'Multitasking (FAST-style)', sub: 'tracking + gauges + sums + radio', run: () => runFast('short'), alt: ['Full 15 min', () => runFast('full')], hue: 'h4', ic: 'target' },
    { id: 'ball', name: 'Ball control', sub: 'joystick-style · 90 s', run: runBall, hue: 'h5', ic: 'pulse' },
    { id: 'apq', name: 'Personality questionnaire', sub: `${B.apq.length} items · untimed`, run: runAPQ, hue: 'h1', ic: 'heart' },
    { id: 'sjt', name: 'Situational judgement', sub: '12 CRM scenarios', run: runSJT, hue: 'h2', ic: 'check' },
  ];
  function dash() {
    const wrap = el('div', { class: 'ad-dash' });
    function draw() {
      wrap.replaceChildren(...CARDS.map(c => { const rs = runsOf(c.id); const last = rs[0]; const best = rs.filter(r => r.score != null).reduce((m, r) => Math.max(m, r.score), -1);
        return el('div', { class: 'ad-card ' + c.hue }, el('div', { class: 'ad-ch' }, el('span', { class: 'ltile' }, icon(c.ic)), el('div', null, el('b', null, c.name), el('small', null, c.sub))),
          el('div', { class: 'ad-cs' }, rs.length ? [el('span', null, `${rs.length} attempt${rs.length > 1 ? 's' : ''}`), last.score != null ? el('span', null, 'last ', el('b', null, Math.round(last.score * 100) + '%')) : el('span', null, 'last ', G.fmtAgo ? G.fmtAgo(last.t) : ''), best >= 0 ? el('span', null, 'best ', el('b', null, Math.round(best * 100) + '%')) : null] : el('span', null, 'not tried yet')),
          el('div', { class: 'qnav' }, el('button', { class: 'btn dark', onclick: c.run }, rs.length ? 'Start again' : 'Start'), c.alt ? el('button', { class: 'btn ghost', onclick: c.alt[1] }, c.alt[0]) : null)); }));
    }
    G.adapt._refresh = draw; draw(); return wrap;
  }

  G.adapt = { dash, interviewBlock, gdBlock, runTest, runFast, runBall, runAPQ, runSJT, GEN, _refresh: null };
})();
