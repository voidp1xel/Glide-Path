/* My Path: personal aviation timeline. Rendered by pages.js (STATIC) + planner.js. */
window.STATIC = {
  on: 'path', href: 'path.html', icon: 'route', hue: 'h1', chip: 'My path to the flight deck',
  title: 'My path: college to cockpit',
  big: 'Where I am, what I do next, and when: medicals, cadet programmes and DGCA exams alongside B.Tech at IIIT Hyderabad. The top half is the big picture (good for explaining it at home); the bottom half is my working tracker.',
  blocks: [
    { heading: 'The plan in one picture', id: 'overview', sub: 'for explaining it at home' },
    { type: 'svg', fig: 'path-roadmap', icon: 'route', ask: 'The roadmap: October 2026 to the airline',
      lead: 'Five lanes running side by side. College continues the whole time; nothing here requires dropping out unless a cadet programme selects me.',
      takeaway: 'Get medically fit and clear Class 2 by December 2026, Class 1 by early 2027, then apply to every cadet intake while passing one DGCA exam each semester break. Either a cadet programme picks me up, or I graduate in 2029 with all exams done and go straight to flying school.',
      hook: 'Degree is the safety net; medicals are the gate; exams are the fuel.' },
    { type: 'svg', fig: 'path-flow', icon: 'help', ask: 'The route as a flowchart',
      lead: 'Every decision point and what happens on each answer.',
      takeaway: 'There is no dead end: if a cadet programme selects me I switch to full-time training; if not, I finish the degree with every DGCA exam already passed and start flying training immediately.' },
    { type: 'mindmap', icon: 'brain', ask: 'Everything it takes to become an airline pilot',
      root: { label: 'Airline pilot', children: [
        { label: 'Medicals', children: [{ label: 'Class 2 (entry)', tip: 'By a DGCA-empanelled doctor. Needed before flying training; most cadet programmes want it to apply.' }, { label: 'Class 1 (professional)', tip: 'At a DGCA-approved centre via eGCA. Needed before CPL issue and before cadet LOI/training.' }, { label: 'Fitness: BMI, lipids, eyes, colour vision' }] },
        { label: 'Paperwork', children: [{ label: 'DGCA Computer Number' }, { label: 'eGCA account' }, { label: '10th/12th marks (Physics, Maths)' }, { label: 'Passport, Aadhaar' }] },
        { label: 'Ground exams (DGCA)', children: [{ label: 'Meteorology' }, { label: 'Air Regulations' }, { label: 'Air Navigation' }, { label: 'Technical General & Specific' }, { label: 'RTR(A) radio licence' }, { label: '70% to pass · valid 5 years' }] },
        { label: 'Flying', children: [{ label: '200 h for CPL' }, { label: 'Instrument rating' }, { label: 'Multi-engine' }, { label: 'Type rating (A320 / 737)' }] },
        { label: 'Cadet programmes', children: [{ label: 'IndiGo' }, { label: 'Air India' }, { label: 'Akasa SkyCadet' }, { label: 'Tests: aptitude, English, psychometric, interview' }] },
        { label: 'Backup', children: [{ label: 'B.Tech CSE degree' }, { label: 'Exams already done by 2029' }] },
      ] } },
    { type: 'matrix', icon: 'scale', ask: 'Cadet programme vs self-funded route',
      lead: 'Approximate 2026 figures from published guides; airlines confirm exact fees after selection. Check the official pages before deciding.',
      corner: '', cols: ['Cadet programme (IndiGo / Air India / Akasa)', 'Self-funded CPL after college'],
      rows: [
        { label: 'Cost (approx.)', cells: ['≈ ₹0.9–1.3 crore incl. type rating (IndiGo published ≈ ₹1.04 crore)', '≈ ₹40–65 lakh CPL + ₹18–30 lakh type rating'] },
        { label: 'Duration', cells: ['≈ 2–3 years', '≈ 18–24 months CPL, then type rating'] },
        { label: 'Job', cells: [{ v: 'Conditional job offer (LOI) with that airline; bond 5–7 years', key: true }, 'Apply for jobs yourself after licence'] },
        { label: 'Selection', cells: ['Competitive tests + interview; many intakes a year', 'No selection to start; any DGCA flying school'] },
        { label: 'When for me', cells: ['Any intake after Class 1 (2027–29); would leave college', 'Straight after graduation (mid-2029)'] },
        { label: 'Risk', cells: ['Higher fee, but airline path fixed', 'Cheaper, but job market at the time decides'] },
      ] },
    { type: 'bullets', icon: 'shield', ask: 'Why this plan is safe',
      takeaway: 'College is never sacrificed for a gamble: I leave only with a cadet selection in hand. Medicals come first, so no money is spent before I know I am fit.',
      groups: [
        { title: 'Medical first', icon: 'heart', points: ['Class 2 and Class 1 before spending on training', 'If anything is wrong, we know early', 'Health targets are measurable (weight, blood tests)'] },
        { title: 'Degree continues', icon: 'book', points: ['B.Tech CSE finishes 2029 unless selected', 'Degree remains a career on its own', 'DGCA exam prep fits in semester breaks'] },
        { title: 'No time wasted', icon: 'clock', points: ['DGCA passes last 5 years', 'Exams done by graduation → straight to flying', 'Every cadet intake attempted from 2027'] },
      ] },

    { heading: 'My working tracker', id: 'tracker', sub: 'tick things off; dates are editable' },
  ],
  after(w) {
    const { el } = G;
    const sec = (id, title, sub) => { const s = el('section', { class: 'lesson', id }, el('div', { class: 'lhead' }, el('div', null, el('h3', null, title), sub ? el('p', { class: 'lead' }, sub) : null))); const st = el('div', { class: 'stage' }); s.append(st); w.append(s); return st; };
    G.planner.countdowns(sec('countdown', 'Countdown'), [
      { label: 'Class 2 medical target', date: '2026-12-15', hue: 5 },
      { label: 'Class 1 target', date: '2027-04-15', hue: 2 },
      { label: 'Meteorology exam window', date: '2027-06-15', hue: 3 },
      { label: 'Graduation', date: '2029-06-01', hue: 0 },
    ]);
    G.planner.timeline(sec('timeline', 'Timeline: what to do, and when', 'Tasks are sorted by date in each phase. Change a date to suit your semester; add your own tasks.'), PHASES);
    G.planner.weight(sec('weight', 'Weight log', 'Morning weight daily (or at least 3× a week). Goal: BMI under 25 well before the Class 2 medical.'), { height: 168.5, start: 73, startDate: '2026-10-13', goal: 69.5, goalDate: '2026-12-10' });
    G.planner.labs(sec('labs', 'Blood test tracker', 'Your two reports are pre-filled. Add each new report; the targets are general adult targets, your doctor sets yours.'), LABS);
    G.planner.cpp(sec('cpp', 'Cadet programme tracker', 'One card per programme. Keep dates, login IDs and results here.'), { seed: [
      { name: 'IndiGo Cadet Pilot Programme', info: 'Age ~18–32/35 · 10+2 PCM, ~51% in P, M, E · ADAPT assessment · Class 1 before training/LOI. Check goindigo.in careers.' },
      { name: 'Air India Cadet Pilot Programme', info: 'Age 18–30 · 10+2 with 60% overall and in P, M, E · Class 1 before flight training. Check airindia.com careers.' },
      { name: 'Akasa Air SkyCadet', info: 'Launched June 2026 · 18+ · 10+2 P, M, E · Class 2 to apply, Class 1 before LOI. Next intake: watch akasaair.com careers.' },
      { name: 'Others (SpiceJet, academies, airline FTO tie-ups)', info: 'Track any new announcement here.' },
    ] });
  },
};

const PHASES = [
  { id: 'p0', title: 'Paperwork & start', when: 'Oct–Nov 2026', hue: 0, why: 'Free, quick, and needed for everything later.', tasks: [
    { id: 'cn', title: 'Get DGCA Computer Number', detail: 'Auto-generated for many boards via DigiLocker on pariksha.dgca.gov.in / eGCA; otherwise apply with 10th & 12th documents.', due: '2026-11-15' },
    { id: 'egca', title: 'Create eGCA account', detail: 'Medical appointments (Class 1) and licence applications go through eGCA.', due: '2026-11-15' },
    { id: 'docs', title: 'Scan documents into one folder', detail: '10th, 12th mark sheets & certificates, Aadhaar, passport (apply if none), photos, college ID.', due: '2026-11-08' },
    { id: 'colour', title: 'Self-check colour vision (Ishihara) and eyesight', detail: 'Colour vision is a hard requirement. Know early. Get a proper eye test if anything is off.', due: '2026-10-31' },
    { id: 'parents', title: 'Talk to parents (use the roadmap above)', detail: 'Show the flowchart, the cost table and the safety-net plan.', due: '2026-11-25' },
  ] },
  { id: 'p1', title: 'Get fit for the Class 2', when: 'Oct–Dec 2026', hue: 5, why: 'Your bloods show **high triglycerides (300–356)**, **low HDL (~31–33)** and **very low vitamin B12 (<148)**, with BMI ≈ 26. All are fixable in 8–10 weeks. See the Health plan page.', tasks: [
    { id: 'doc1', title: 'See a physician with both reports', detail: 'B12 deficiency (treatment dose/route), triglycerides, and the full supplement list incl. the ayurvedic tablets and 60,000 IU vitamin D. Ask what to declare at the DGCA medical.', due: '2026-10-24' },
    { id: 'routine', title: 'Start the daily health routine', detail: 'Meal timings, mess plate rule, steps, workouts, supplement timings (Health plan).', due: '2026-10-15' },
    { id: 'w71', title: 'Weight under 71 kg (BMI < 25)', detail: 'Morning weight.', due: '2026-11-25' },
    { id: 'w695', title: 'Weight ~69.5 kg', detail: 'Buffer below BMI 25 for the medical day.', due: '2026-12-10' },
    { id: 'retest', title: 'Re-test: fasting lipid profile, B12, vitamin D, HbA1c', detail: '10–12 h fast. Compare with June & October.', due: '2026-12-01' },
    { id: 'emp', title: 'Pick a DGCA-empanelled Class 2 examiner & book', detail: 'List on the DGCA website (medical section). Book for the winter break.', due: '2026-11-20' },
    { id: 'c2', title: 'Class 2 medical examination', detail: 'Carry ID, reports, specs if any, list of medicines/supplements. Fast if asked. Sleep well the night before.', due: '2026-12-15' },
  ] },
  { id: 'p2', title: 'Class 1 medical', when: 'Jan–Apr 2027', hue: 2, why: 'Class 1 is what cadet programmes need before training/LOI and what a CPL needs.', tasks: [
    { id: 'c1apply', title: 'Apply for Class 1 appointment on eGCA', detail: 'Right after the Class 2 certificate. Choose a DGCA-approved centre; slots can take weeks.', due: '2027-01-10' },
    { id: 'c1prep', title: 'Prepare: ECG, eye, ENT/audiogram, X-ray, bloods as listed', detail: 'Follow the centre\'s list; keep lipids and weight on target.', due: '2027-02-15' },
    { id: 'c1', title: 'Class 1 medical examination', detail: 'Plan 1–3 days at the centre (may need to skip a few classes).', due: '2027-03-31' },
    { id: 'c1cert', title: 'Class 1 assessment received', detail: 'Save PDF; note expiry (renew yearly below 40).', due: '2027-04-30' },
  ] },
  { id: 'p3', title: 'Cadet programme applications', when: 'Apr 2027 → 2029', hue: 4, why: 'Apply to **every** opening once Class 1 is done. Selection = leave college and train full time.', tasks: [
    { id: 'apt', title: 'Start aptitude prep (maths, physics, reasoning, English)', detail: 'ADAPT / COMPASS-style tests: mental maths, spatial, multitasking, psychometric. 20 min/day.', due: '2027-01-15' },
    { id: 'alerts', title: 'Set alerts on airline careers pages', detail: 'IndiGo, Air India, Akasa + aviation news groups.', due: '2027-01-31' },
    { id: 'interview', title: 'Prepare HR/technical interview & group discussion', detail: 'Why pilot, why this airline, basic aviation knowledge (this site), current affairs.', due: '2027-05-31' },
    { id: 'firstapp', title: 'First cadet application submitted', due: '2027-05-31' },
    { id: 'finance', title: 'Discuss financing with parents (loan / savings)', detail: 'Programmes need fees in instalments; some have bank tie-ups.', due: '2027-04-30' },
  ] },
  { id: 'p4', title: 'DGCA ground exams (one per break)', when: 'Dec 2026 → mid-2029', hue: 3, why: 'Exams are held almost monthly on pariksha.dgca.gov.in. 70% to pass, no negative marking, valid 5 years from first pass — passing from mid-2027 stays valid till 2032.', tasks: [
    { id: 'met-s', title: 'Meteorology: study (this site + Joshi)', detail: '~5 months, 45 min/day in semester, more in breaks.', due: '2027-04-30' },
    { id: 'met-x', title: 'Meteorology exam', detail: 'Summer break 2027.', due: '2027-06-15' },
    { id: 'reg-s', title: 'Air Regulations & HF: study (Bali)', due: '2027-11-15' },
    { id: 'reg-x', title: 'Air Regulations exam', detail: 'Winter break 2027.', due: '2027-12-15' },
    { id: 'nav-s', title: 'Air Navigation: study (Bali + CRP-5 practice)', detail: 'The hardest paper: numericals daily.', due: '2028-05-15' },
    { id: 'nav-x', title: 'Air Navigation exam', detail: 'Summer break 2028.', due: '2028-06-15' },
    { id: 'tg-x', title: 'Technical General exam', detail: 'Winter break 2028 (Oxford / Aviator\'s Handbook).', due: '2028-12-15' },
    { id: 'rtr', title: 'RTR(A) and Technical Specific', detail: 'Usually with the flying school / aircraft type; RTR written + practical.', due: '2029-06-30' },
  ] },
  { id: 'p5', title: 'Graduate → flying', when: '2029 →', hue: 1, why: 'If no cadet selection by now, go straight to a DGCA flying school with all papers already passed.', tasks: [
    { id: 'fto', title: 'Shortlist flying schools (fleet, instructors, weather, cost, pass rates)', due: '2029-01-31' },
    { id: 'grad', title: 'Graduate B.Tech CSE', due: '2029-06-01' },
    { id: 'join', title: 'Join flying training (CPL ~200 h)', due: '2029-07-15' },
  ] },
];

const LABS = {
  markers: [
    { k: 'tg', name: 'Triglycerides', unit: 'mg/dL', target: '< 150', max: 150 },
    { k: 'hdl', name: 'HDL', unit: 'mg/dL', target: '> 40', min: 40 },
    { k: 'ldl', name: 'LDL', unit: 'mg/dL', target: '< 100', max: 100 },
    { k: 'tc', name: 'Total cholesterol', unit: 'mg/dL', target: '< 200', max: 200 },
    { k: 'vldl', name: 'VLDL', unit: 'mg/dL', target: '< 30', max: 30 },
    { k: 'nonhdl', name: 'Non-HDL', unit: 'mg/dL', target: '< 130', max: 130 },
    { k: 'b12', name: 'Vitamin B12', unit: 'pg/mL', target: '> 300 (ref 187–883)', min: 187 },
    { k: 'vitd', name: 'Vitamin D (25-OH)', unit: 'ng/mL', target: '30–60', min: 30, max: 100 },
    { k: 'glu', name: 'Fasting glucose', unit: 'mg/dL', target: '74–99', min: 74, max: 99 },
    { k: 'hba1c', name: 'HbA1c', unit: '%', target: '< 5.7', max: 5.7 },
    { k: 'ua', name: 'Uric acid', unit: 'mg/dL', target: '3.5–7.2', min: 3.5, max: 7.2 },
    { k: 'tsh', name: 'TSH', unit: 'µIU/mL', target: '0.7–6.4', min: 0.7, max: 6.4 },
    { k: 'hb', name: 'Haemoglobin', unit: 'g/dL', target: '13–17', min: 13, max: 17 },
    { k: 'wt', name: 'Weight on test day', unit: 'kg', target: '< 71', max: 71 },
  ],
  seed: [
    { date: '2026-06-29', lab: 'Lifecare Foundation', tg: 356, hdl: 32.8, ldl: 82, tc: 186, vldl: 71.2, nonhdl: 153.2, b12: 147, glu: 86, ua: 6.7, tsh: 2.1, hb: 15.3 },
    { date: '2026-10-07', lab: 'Dr Lal PathLabs', tg: 300, hdl: 30.5, ldl: 69.5, tc: 160, vldl: 60, nonhdl: 130, wt: 73 },
  ],
};
