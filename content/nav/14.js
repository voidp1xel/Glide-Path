module.exports = {
  n: 14, title: 'Mass and Balance', tag: 'Mass terms · CG · limits · traffic-load sums · Indian rules', icon: 'weight', hue: 5, partOfBook: 'General Navigation',
  big: 'How an aeroplane\'s mass builds up from basic empty to ramp mass, how the CG is found and why its position matters, the structural and performance limits, the traffic-load calculation, and the Indian weighing and load-sheet rules.',
  purpose: 'Every paper has a traffic-load or CG sum and several definition questions (DOM, ZFM, useful load, MZFM, re-weighing intervals, standard passenger masses).',
  lessons: [
    { id: 'stack', type: 'svg', fig: 'mass-stack', icon: 'layers', ask: 'How the masses build up', dgca: true,
      takeaway: 'BEM + crew/catering = DOM; + traffic load = ZFM; + take-off fuel = TOM; + taxi fuel = ramp mass. Useful load = traffic load + usable fuel.' },
    { id: 'limit', type: 'sequence', icon: 'list', ask: 'Finding the maximum traffic load', dgca: true,
      takeaway: 'Allowed TOM = lowest of: regulated TOM, regulated landing mass + trip fuel, MZFM + take-off fuel. Traffic load = allowed TOM − DOM − take-off fuel.',
      steps: [{ label: 'Regulated TOM', sub: 'lower of structural and performance' }, { label: 'RLM + trip fuel' }, { label: 'MZFM + take-off fuel' }, { label: 'Take the lowest', sub: '= allowed TOM' }, { label: '− DOM − take-off fuel', sub: '= max traffic load' }] },
    { id: 'cg', type: 'pairs', icon: 'scale', ask: 'Forward or aft CG?', dgca: true,
      pairs: [
        { a: { label: 'Forward CG', body: 'More **stable**, heavy elevator, larger tail download → more drag, **higher stall speed**, less range.' }, b: { label: 'Aft CG', body: '**Less stable**, light controls, rotates quickly; stall/spin recovery harder; lower stall speed.' }, rule: 'Neutral stability: CG at the aerodynamic centre.' },
        { a: { label: 'Zero fuel mass', body: 'DOM + **traffic load**.' }, b: { label: 'Useful load', body: 'Traffic load + **usable fuel** = TOM − DOM.' }, rule: 'ZFM and DOM differ by the traffic load.' },
      ] },
    { id: 'cgcalc', type: 'formulas', icon: 'calc', ask: 'CG calculators', dgca: true,
      items: [
        { name: 'CG position', eq: 'CG = Σ moments ÷ Σ masses', ex: 'Nose 1000 lb at −25, mains 4000 lb at +35 → +23 in.', calc: { inputs: [{ k: 'a', label: 'Mass 1', v: 1000 }, { k: 'x', label: 'Arm 1', v: -25 }, { k: 'b', label: 'Mass 2', v: 4000 }, { k: 'y', label: 'Arm 2', v: 35 }], f: '((a*x+b*y)/(a+b)).toFixed(2)', unit: '' } },
        { name: 'Mass to shift', eq: 'm = total mass × CG change ÷ distance moved', ex: '7500 kg, 1 station, 120 apart → 62.5 kg.', calc: { inputs: [{ k: 'M', label: 'Total mass', v: 7500 }, { k: 'd', label: 'CG change', v: 1 }, { k: 'D', label: 'Distance moved', v: 120 }], f: '(M*d/D).toFixed(1)', unit: '' } },
      ] },
    { id: 'india', type: 'numbers', icon: 'flag', ask: 'Indian rules and standard masses', dgca: true, revise: true,
      items: [{ k: 'Crew', v: '85 kg', note: '75 + 10' }, { k: 'Adult passenger', v: '75 kg' }, { k: 'Child 2–12', v: '35 kg' }, { k: 'Infant < 2', v: '10 kg' }, { k: 'Re-weigh > 2000 kg', v: 'every 5 years' }, { k: 'Re-weigh < 2000 kg', v: 'only after major repair/mod' }, { k: 'Load sheet kept', v: '≥ 4 months' }, { k: 'Weight schedule approved by', v: 'Regional Airworthiness Office' }] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [{ q: 'The DOM excludes:', options: ['usable fuel and traffic load', 'crew', 'potable water'], answer: 0 }, { q: 'A forward CG gives:', options: ['lower stall speed', 'higher stall speed', 'no change'], answer: 1 }] },
  ],
};
