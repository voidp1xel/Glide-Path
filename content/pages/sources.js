/* Every source the site uses, in one place (linked from the footer on every page). */
window.STATIC = {
  on: 'sources', href: 'sources.html', icon: 'book', hue: 'h3', chip: 'Sources',
  title: 'Sources',
  big: 'Everything this site is built from, grouped by where it is used.',
  blocks: [],
  after(w) {
    const { el } = G;
    const group = (title, sub, items) => {
      w.append(el('div', { class: 'sechead' }, el('h2', null, title), sub ? el('span', { class: 'hint' }, sub) : null));
      w.append(el('ul', { class: 'srclist' }, items.map(([t, u, k]) => el('li', null, u ? el('a', { href: u, target: '_blank', rel: 'noopener' }, t) : el('span', null, t), k ? el('small', null, k) : null))));
    };
    group('Textbooks', 'chapters, notes, question banks, Flight bag', [
      ['I.C. Joshi, Aviation Meteorology (7th ed., 2023)', null, 'Meteorology'],
      ['R.K. Bali, Air Navigation (7th ed., 2025)', null, 'Air Navigation'],
      ['R.K. Bali, Air Regulations and Human Factors (17th ed., 2026)', null, 'Air Regulations'],
      ['Thomas Tom, The Aviator\'s Handbook (2nd ed., 2022)', null, 'Technical / general'],
    ]);
    group('DGCA exams', 'How DGCA asks', [
      ['DGCA Pariksha portal: Programme of Examinations 2026, result sheets', 'https://pariksha.dgca.gov.in', 'official'],
      ['The Pilot\'s Compass: DGCA passing marks', 'https://thepilotscompass.com/blog/dgca-passing-marks-2026', 'guide'],
      ['AviationGrade: DGCA CPL exam pattern', 'https://aviationgrade.in/guides/dgca-cpl-exam-pattern-2026', 'guide'],
    ]);
    group('Tools: formulas and standards', 'Calculators & decoders', [
      ['ICAO Doc 7488: Manual of the ICAO Standard Atmosphere', null, 'ISA values'],
      ['ICAO Annex 3 / WMO codes: METAR, SPECI and TAF formats', null, 'decoder'],
      ['R.K. Bali, Air Navigation: 1-in-60, PET/PNR, departure, convergency, time', null, 'navigation'],
      ['I.C. Joshi, Aviation Meteorology: altimetry, cloud base, lapse rates', null, 'meteorology'],
    ]);
    const adaptBox = el('div'); w.append(adaptBox);
    group('Design', null, [['only70.com: layout and interaction ideas', 'https://only70.com', 'inspiration']]);
    const r = document.documentElement.dataset.root || '.';
    G.loadScript(r + '/assets/adapt-bank.js').then(() => G.loadScript(r + '/assets/adapt-bank2.js')).then(() => {
      const kind = { official: 'official', FTO: 'training organisation', provider: 'prep provider', candidates: 'candidate reports', candidate: 'candidate account', news: 'news' };
      const S = window.ADAPT_BANK.sources;
      const holder = el('div');
      const sub = (title, note, list) => { holder.append(el('div', { class: 'sechead' }, el('h2', null, title), el('span', { class: 'hint' }, note))); holder.append(el('ul', { class: 'srclist' }, list.map(([t, u, k]) => el('li', null, el('a', { href: u, target: '_blank', rel: 'noopener' }, t), el('small', null, kind[k] || k))))); };
      sub('Cadet selection & ADAPT', 'ADAPT tests, interview and GD banks', S.filter(x => x[2] !== 'news'));
      sub('Current affairs', 'facts used in interview answers and GD topics (checked Oct 2026)', S.filter(x => x[2] === 'news'));
      holder.append(el('p', { class: 'hint' }, 'Real ADAPT question banks are proprietary, so the test items are original and built to the published formats. Interview questions and GD topics tagged "reported" come from the sources above.'));
      adaptBox.replaceWith(holder);
    });
  },
};
