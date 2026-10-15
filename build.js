#!/usr/bin/env node
/* Glidepath build: content/*.js + notes/*.md + qb/*.json  ->  site/ (static, works from file:// or any static server).
   Run:  node build.js */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const SITE = path.join(ROOT, 'site');
const VER = Date.now().toString(36);

const SUBJECTS = [
  { id: 'met', name: 'Meteorology', short: 'Met', book: 'I.C. Joshi', notes: 'notes/meteorology.md', exam: { n: 50, min: 120 } },
  { id: 'nav', name: 'Air Navigation', short: 'Nav', book: 'R.K. Bali', notes: 'notes/air-navigation.md', exam: { n: 100, min: 180 } },
  { id: 'reg', name: 'Air Regulations & Human Factors', short: 'Reg', book: 'R.K. Bali', notes: 'notes/air-regulations-human-factors.md', exam: { n: 50, min: 120 } },
  { id: 'hb', name: "Aviator's Handbook", short: 'Handbook', book: 'Thomas Tom', notes: 'notes/aviators-handbook.md', exam: { n: 50, min: 90 } },
];

const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = p => fs.existsSync(path.join(ROOT, p));
const write = (p, s) => { const f = path.join(SITE, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const js = o => JSON.stringify(o).replace(/<\/script/gi, '<\\/script').replace(/[\u2028\u2029]/g, ' ');
const pad = n => String(n).padStart(2, '0');
const strip = s => String(s || '').replace(/\*\*|==|`/g, '');

/* ---------------- tiny markdown -> html (headings, lists, tables, quotes, code, emphasis) ---------------- */
function inline(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/(^|[\s(])\*(?!\s)([^*]+?)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
function md(src) {
  const lines = src.replace(/\r/g, '').split('\n');
  let out = [], i = 0;
  const listStack = [];
  const closeLists = (to = 0) => { while (listStack.length > to) out.push('</' + listStack.pop().t + '>'); };
  while (i < lines.length) {
    let l = lines[i];
    if (/^```/.test(l)) { closeLists(); const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i++; out.push('<pre><code>' + buf.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</code></pre>'); continue; }
    if (/^\s*$/.test(l)) { closeLists(); i++; continue; }
    let m;
    if ((m = l.match(/^(#{1,6})\s+(.*)$/))) { closeLists(); const n = m[1].length; const id = m[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); out.push(`<h${n} id="n-${id}">${inline(m[2])}</h${n}>`); i++; continue; }
    if (/^\|/.test(l)) {
      closeLists(); const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = r => r.replace(/^\||\|\s*$/g, '').split('|').map(c => c.trim());
      let h = '<table>'; let body = rows;
      if (rows.length > 1 && /^\|?\s*:?-{2,}/.test(rows[1])) { h += '<thead><tr>' + cells(rows[0]).map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead>'; body = rows.slice(2); }
      h += '<tbody>' + body.map(r => '<tr>' + cells(r).map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
      out.push(h); continue;
    }
    if (/^>\s?/.test(l)) { closeLists(); const buf = []; while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, '')); out.push('<blockquote>' + md(buf.join('\n')) + '</blockquote>'); continue; }
    if ((m = l.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/))) {
      const ind = m[1].replace(/\t/g, '    ').length; const t = /\d/.test(m[2]) ? 'ol' : 'ul'; const lvl = Math.floor(ind / 2) + 1;
      while (listStack.length > lvl) out.push('</' + listStack.pop().t + '>');
      if (listStack.length < lvl) { out.push('<' + t + '>'); listStack.push({ t }); }
      out.push('<li>' + inline(m[3]) + '</li>'); i++; continue;
    }
    if (/^---+\s*$/.test(l)) { closeLists(); out.push('<hr>'); i++; continue; }
    closeLists(); const buf = [l]; i++;
    while (i < lines.length && lines[i].trim() && !/^(#|\||>|```|\s*([-*+]|\d+[.)])\s)/.test(lines[i])) buf.push(lines[i++]);
    out.push('<p>' + inline(buf.join(' ')) + '</p>');
  }
  closeLists();
  return out.join('\n');
}

/* split a book's notes into chapters: headings "## <key>. Title" where key matches chapter.notesKey or n */
function notesByChapter(file) {
  if (!exists(file)) return {};
  const src = read(file);
  const parts = {}; let cur = null, buf = [];
  for (const line of src.split('\n')) {
    const m = line.match(/^## (?:Chapter\s+)?([A-Z]?\d+[A-Z]?)[.:]\s/i);
    if (m) { if (cur) parts[cur] = buf.join('\n'); cur = m[1].toUpperCase(); buf = []; continue; }
    if (/^# /.test(line)) { if (cur) parts[cur] = buf.join('\n'); cur = null; buf = []; continue; }
    if (cur) buf.push(line);
  }
  if (cur) parts[cur] = buf.join('\n');
  return parts;
}

/* ---------------- page shell ---------------- */
function shell({ title, desc, root, scripts, pre }) {
  const r = root;
  return `<!doctype html>
<html lang="en" data-root="${r}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${(desc || '').replace(/"/g, '&quot;')}">
<meta name="theme-color" content="#FBFAF7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111318" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${r}/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..700&family=IBM+Plex+Mono:wght@500;600;700&display=swap">
<link rel="stylesheet" href="${r}/assets/app.css?v=${VER}">
<link rel="stylesheet" href="${r}/assets/motion.css?v=${VER}">
<link rel="stylesheet" href="${r}/assets/polish.css?v=${VER}">
<link rel="stylesheet" href="${r}/assets/content.css?v=${VER}">
<link rel="stylesheet" href="${r}/assets/lessons2.css?v=${VER}">
<link rel="manifest" href="${r}/manifest.webmanifest">
<link rel="apple-touch-icon" href="${r}/assets/apple-touch-icon.png">
<meta property="og:title" content="${title}">
<meta property="og:image" content="${r}/assets/icon-512.png">
<script>try{var t=JSON.parse(localStorage.getItem('glidepath-v1')||'{}').pref_theme;if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body>
<main id="app"></main>
<noscript><p style="padding:24px">This site needs JavaScript to draw its diagrams.</p></noscript>
${pre || ''}
${scripts.map(s => `<script src="${s.startsWith('http') ? s : r + '/' + s}${s.endsWith('.js') && !s.includes('data/qb/') ? '?v=' + VER : ''}"></script>`).join('\n')}
<script src="${r}/assets/core.js?v=${VER}"></script>
<script src="${r}/assets/figs.js?v=${VER}"></script>
${fs.readdirSync(path.join(SITE, 'assets')).filter(f => /^figs-.+\.js$/.test(f)).map(f => `<script src="${r}/assets/${f}?v=${VER}"></script>`).join('\n')}
<script src="${r}/assets/lessons.js?v=${VER}"></script>
<script src="${r}/assets/lessons2.js?v=${VER}"></script>
<script src="${r}/assets/tools.js?v=${VER}"></script>
<script src="${r}/assets/planner.js?v=${VER}"></script>
<script src="${r}/assets/pages.js?v=${VER}"></script>
<script src="${r}/assets/motion.js?v=${VER}"></script>
<script src="${r}/assets/content.js?v=${VER}"></script>
<script src="${r}/assets/firebase-config.js?v=${VER}"></script>
<script type="module" src="${r}/assets/sync.js?v=${VER}"></script>
<script>if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('${r}/sw.js').catch(function(){})</script>
</body>
</html>
`;
}

/* ---------------- build ---------------- */
const site = { subjects: [] };
const search = [];
const glossary = [];
const revise = { subjects: [] };
const mindmaps = []; // every chapter's mind map, for mindmaps.html
const guide = {}; // per subject: exam traps from the notes + question-style counts from the banks
function qStyle(q) {
  const t = q.q || '', o = (q.o || []).join(' | ');
  if (/^(true|false)$/i.test((q.o || [])[0] || '')) return 'tf';
  if (/\bnot\b|\bexcept\b|incorrect|\bfalse\b|wrong/i.test(t)) return 'not';
  if (/METAR|SPECI|TAF|ROFOR|ARFOR|SIGMET|\bcode\b|abbreviat|stands for|indicat(es|or)|decode|[A-Z]{4}\s\d{4}/.test(t)) return 'code';
  if ((q.o || []).filter(x => /\d/.test(x)).length >= Math.max(2, (q.o || []).length - 1)) return 'numeric';
  if (/is called|are called|known as|is termed|termed as|defined as|refers to|\bmeans\b|is the name/i.test(t)) return 'definition';
  if (/due to|because|caused|cause|reason|results? in|leads to|why/i.test(t)) return 'cause';
  if (/…|\.\.\.|_{3,}/.test(t)) return 'fill';
  return 'concept';
}

for (const S of SUBJECTS) {
  const dir = path.join(ROOT, 'content', S.id);
  if (!fs.existsSync(dir)) continue;
  const notes = notesByChapter(S.notes);
  const files = fs.readdirSync(dir).filter(f => /^\d.*\.js$/.test(f)).sort();
  const sub = { id: S.id, name: S.name, short: S.short, book: S.book, exam: S.exam, chapters: [], banks: [], qn: 0 };
  const rsub = { id: S.id, short: S.short, sections: [] };
  for (const f of files) {
    delete require.cache[path.join(dir, f)];
    const c = require(path.join(dir, f));
    const key = c.key || f.replace(/\.js$/, '');
    c.id = S.id + '-' + key;
    const nk = String(c.notesKey || c.n).toUpperCase();
    if (notes[nk]) c.notesHtml = md(notes[nk]);
    /* glossary: every "**Term** = …" / "**Term**: …" definition in the notes, with the section it sits in */
    if (c.notesHtml) {
      const hrefG = 'chapters/' + c.id + '.html';
      let secId = '', secT = '';
      const plainG = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
      for (const m of c.notesHtml.matchAll(/<h3 id="([^"]+)">([\s\S]*?)<\/h3>|<li>\s*<strong>([^<]{2,60})<\/strong>\s*(=|:|—|–)\s*([\s\S]*?)<\/li>/g)) {
        if (m[1]) { secId = m[1]; secT = plainG(m[2]); continue; }
        const term = plainG(m[3]), def = plainG(m[5].replace(/<ul>[\s\S]*$/, ''));
        if (!def || def.length < 4 || /^\d/.test(term)) continue;
        glossary.push({ t: term, d: def.length > 420 ? def.slice(0, 417) + '…' : def, s: S.short + ' ' + c.n, ch: c.title, sec: secT, h: hrefG + '#' + secId });
      }
    }
    // question bank (one or more)
    const banks = [].concat(c.banks || (exists('qb/' + c.id + '.json') ? [c.id] : []));
    let qn = 0;
    for (const b of banks) {
      if (!exists('qb/' + b + '.json')) { console.warn('missing bank', b); continue; }
      const B = JSON.parse(read('qb/' + b + '.json'));
      B.id = b;
      write('data/qb/' + b + '.js', `(window.QB=window.QB||{})[${JSON.stringify(b)}]=${js(B)};`);
      qn += B.qs.length;
      sub.banks.push({ id: b, n: B.qs.length });
    }
    if (banks.length) c.bank = banks;
    { // guide data
      const g = (guide[S.id] = guide[S.id] || { name: S.name, traps: [], styles: {}, n: 0, ex: {} });
      const m = (c.notesHtml || '').match(/<h3[^>]*>\s*Exam traps\s*<\/h3>\s*(<ul>[\s\S]*?<\/ul>)/i);
      if (m) g.traps.push({ n: c.n, title: c.title, href: 'chapters/' + c.id + '.html', html: m[1] });
      for (const b of banks) if (exists('qb/' + b + '.json')) for (const q of JSON.parse(read('qb/' + b + '.json')).qs) {
        const k = qStyle(q); g.styles[k] = (g.styles[k] || 0) + 1; g.n++;
        if (!g.ex[k] || (q.q.length < g.ex[k].q.length && q.q.length > 30)) g.ex[k] = { q: q.q, o: q.o, a: q.a, ch: c.n };
      }
    }
    const href = 'chapters/' + c.id + '.html';
    const lessonsN = c.lessons.length + (banks.length ? 1 : 0);
    sub.chapters.push({ id: c.id, n: c.n, title: c.title, big: strip(c.big), icon: c.icon, hue: c.hue, href, ln: lessonsN, qn, bank: banks[0], part: c.partOfBook || '' });
    sub.qn += qn;
    write('data/ch/' + c.id + '.js', 'window.CHAPTER=' + js(c) + ';');
    write(href, shell({
      title: `${c.title} · ${S.short} ${c.n} · Glidepath`, desc: strip(c.big), root: '..',
      scripts: ['data/site.js', 'data/ch/' + c.id + '.js', ...banks.map(b => 'data/qb/' + b + '.js')],
    }));
    // search entries
    search.push({ t: `${S.short} ${c.n}. ${c.title}`, s: strip(c.big), h: href, k: (c.tag || '') + ' ' + (c.keys || '') });
    for (const l of c.lessons) if (l.type === 'mindmap' && l.root) mindmaps.push({ sub: S.id, subName: S.name || S.short, n: c.n, ch: c.title, hue: c.hue, icon: c.icon, href, id: l.id, root: l.root });
    for (const l of c.lessons) {
      search.push({ t: strip(l.ask || l.short), s: `${S.short} ${c.n} · ${c.title}`, h: href + '#' + l.id, k: strip(l.takeaway) + ' ' + strip(l.short) + ' ' + strip(l.hook) });
      if (l.type === 'numbers') for (const it of l.items) search.push({ t: strip(it.k) + ': ' + strip(it.v), s: `${S.short} ${c.n} · numbers`, h: href + '#' + l.id, k: strip(it.note) });
      if (l.type === 'formulas') for (const it of l.items) search.push({ t: strip(it.name), s: `${S.short} ${c.n} · formula`, h: href + '#' + l.id, k: strip(it.note) });
    }
    if (c.notesHtml) for (const m of c.notesHtml.matchAll(/<h[34] id="([^"]+)">(.*?)<\/h[34]>/g)) search.push({ t: m[2].replace(/<[^>]+>/g, ''), s: `${S.short} ${c.n} · notes`, h: href + '#points', k: '' });
    // revision section
    const sec = { title: `${c.n}. ${c.title}`, href, hue: c.hue || 0, rows: [], formulas: [], tables: [] };
    for (const l of c.lessons) {
      if (l.type === 'numbers') for (const it of l.items) sec.rows.push({ k: it.k, v: it.v, n: it.note || '' });
      if (l.type === 'formulas') for (const it of l.items) sec.formulas.push(it);
      if (l.type === 'matrix' && l.revise) sec.tables.push(Object.assign({ title: strip(l.ask) }, l));
    }
    for (const r of c.revise || []) sec.rows.push(r);
    if (sec.rows.length || sec.formulas.length || sec.tables.length) rsub.sections.push(sec);
  }
  // extra banks (sample papers, misc questions) listed in content/<sid>/banks.json
  if (fs.existsSync(path.join(dir, 'banks.json'))) {
    for (const b of JSON.parse(fs.readFileSync(path.join(dir, 'banks.json'), 'utf8'))) {
      if (!exists('qb/' + b + '.json')) continue;
      const B = JSON.parse(read('qb/' + b + '.json')); B.id = b;
      write('data/qb/' + b + '.js', `(window.QB=window.QB||{})[${JSON.stringify(b)}]=${js(B)};`);
      sub.banks.push({ id: b, n: B.qs.length }); sub.qn += B.qs.length;
    }
  }
  if (sub.chapters.length) { site.subjects.push(sub); revise.subjects.push(rsub); }
}

write('data/site.js', 'window.SITE=' + js(site) + ';');
write('data/search.js', 'window.SEARCH=' + js(search) + ';');
glossary.sort((a, b) => a.t.localeCompare(b.t, 'en', { sensitivity: 'base' }));
write('data/glossary.js', 'window.GLOSSARY=' + js(glossary) + ';');
write('data/revise.js', 'window.REVISE=' + js(revise) + ';');
write('data/mindmaps.js', 'window.MINDMAPS=' + js(mindmaps) + ';');
write('data/guide.js', 'window.GUIDE=' + js(guide) + ';');

/* top-level pages */
const pages = [
  { f: 'index.html', title: 'Glidepath · DGCA CPL, made visual', pre: '<script>window.PAGE="home"</script>', scripts: ['data/site.js', 'data/search.js'] },
  { f: 'practice.html', title: 'Practice & mock exams · Glidepath', pre: '<script>window.PAGE="practice"</script>', scripts: ['data/site.js'] },
  { f: 'revise.html', title: 'Flight bag · Glidepath', pre: '<script>window.PAGE="revise"</script>', scripts: ['data/site.js', 'data/revise.js'] },
  { f: 'history.html', title: 'History · Glidepath', pre: '<script>window.PAGE="history"</script>', scripts: ['data/site.js'] },
];
for (const p of fs.readdirSync(path.join(ROOT, 'content', 'pages')).filter(f => f.endsWith('.js'))) {
  const name = p.replace(/\.js$/, '');
  fs.copyFileSync(path.join(ROOT, 'content', 'pages', p), path.join(SITE, 'data', 'page-' + p));
  const TITLES = { path: 'My path', health: 'Health plan', guide: 'How DGCA asks', tools: 'Tools', mindmaps: 'Mind maps', 404: 'Page not found', flashcards: 'Flashcards', dashboard: 'Dashboard', adapt: 'ADAPT & cadet selection', 'adapt-guide': 'ADAPT guide', sources: 'Sources', settings: 'Settings', signin: 'Sign in', glossary: 'Glossary', notes: 'My notes' };
  const extra = { guide: ['data/guide.js'], mindmaps: ['data/mindmaps.js'], flashcards: ['data/revise.js'], dashboard: ['data/revise.js'] }[name] || [];
  pages.push({ f: name + '.html', title: (TITLES[name] || name) + ' · Glidepath', scripts: ['data/site.js', ...extra, 'data/page-' + p] });
}
for (const p of pages) write(p.f, shell({ title: p.title, root: p.f === '404.html' ? '' : '.', pre: p.pre, scripts: p.scripts }));

const qtotal = site.subjects.reduce((a, s) => a + s.qn, 0);
console.log(`built ${site.subjects.map(s => s.short + ':' + s.chapters.length + 'ch/' + s.qn + 'q').join('  ')}  total ${qtotal} questions, ${search.length} search entries`);
