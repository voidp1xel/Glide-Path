module.exports = {
  n: 28, title: 'Met Documentation and Briefing', tag: 'Briefing · flight documents · SIGWX', icon: 'book', hue: 5,
  big: 'What met information crews and operators get, how and when briefing is given, what goes into flight documentation (T-3, T-4, charts), and how national SIGWX charts are made.',
  purpose: 'Short factual questions: 3 h briefing, FL100/FL150 for low-level briefing, T-3 vs T-4, heights in FL vs above aerodrome, who compiles SIGWX.',
  lessons: [
    { id: 'map', type: 'mindmap', short: 'Mind map', icon: 'brain', ask: 'The whole chapter on one page',
      root: { label: 'Documentation', children: [
        { label: 'Briefing', children: [{ label: '3 h before ETD' }, { label: 'Oral if no notice' }, { label: 'LL: up to FL100 / FL150 hills' }] },
        { label: 'Forms', children: [{ label: 'T-3 tabular ≤ 500 NM' }, { label: 'T-4 cross-section > 500 NM' }] },
        { label: 'Charts', children: [{ label: 'Intl: WAFC SIGWX FL250–630' }, { label: 'National SIGWX + WAFC winds' }, { label: 'LL 2000/5000/10 000 ft' }] },
        { label: 'National SIGWX', children: [{ label: 'Chennai compiles' }, { label: '0 °C on medium chart' }, { label: '4/day, +9 h, valid 24 h' }] },
        { label: 'Heights', children: [{ label: 'En route: FL' }, { label: 'Aerodrome: above elevation' }] },
      ] } },
    { id: 'forms', type: 'pairs', icon: 'list', ask: 'T-3 or T-4?', dgca: true,
      pairs: [
        { a: { label: 'Met T-3', body: '**Tabular** flight forecast for flights **up to 500 NM**; heights in ft AMSL.' }, b: { label: 'Met T-4', body: '**Cross-section** route forecast for flights **beyond 500 NM**; clouds drawn; heights in flight levels.' }, rule: 'Three is less: T-3 for shorter flights.' },
        { a: { label: 'En-route heights', body: 'Upper winds, turbulence, cloud base/top: **flight levels**.' }, b: { label: 'Aerodrome heights', body: 'Cloud base and top: **above aerodrome elevation**.' }, rule: '' },
        { a: { label: 'High-level significant weather', body: 'TS, CB, squall line, hail, mod/sev turbulence, icing, FZ precip, widespread DS/SS, marked mountain waves.' }, b: { label: 'Low-level adds', body: 'Fog, precipitation and anything reducing visibility **below 5000 m**.' }, rule: '' },
      ] },
    { id: 'sigwx', type: 'numbers', icon: 'map', ask: 'National SIGWX numbers', revise: true, dgca: true,
      items: [{ k: 'Prepared by', v: 'all 4 MWOs', note: 'compiled at Chennai' }, { k: 'Medium level', v: 'FL100–250', note: 'with 0 °C isotherm' }, { k: 'High level', v: 'FL250–630' }, { k: 'Issued', v: '4 × a day', note: '00, 06, 12, 18 UTC data' }, { k: 'Issued after data time', v: '9 h' }, { k: 'Valid', v: '24 h' }, { k: 'TC shown if', v: '≥ 34 kt' }, { k: 'Briefing', v: '3 h before departure' }, { k: 'Notice for documentation', v: '3 h AMO · 12 h AMS' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [
        { q: 'Met T-4 is used for flights:', options: ['Up to 500 NM', 'Beyond 500 NM', 'Only below FL100'], answer: 1 },
        { q: 'The freezing level appears on the:', options: ['High-level SIGWX', 'Medium-level SIGWX', 'TAF'], answer: 1 },
      ] },
  ],
};
