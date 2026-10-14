module.exports = {
  n: 11, title: 'DR Elements: Temperature and Airspeed', tag: 'SAT · TAT · ram rise · IAS→TAS · Mach', icon: 'thermo', hue: 1, partOfBook: 'General Navigation',
  big: 'Static and total air temperature, ram rise and recovery factor, the air data computer, the chain from IAS to TAS, Mach number and the speed of sound, and what happens to CAS, TAS and Mach when you climb or descend through different layers.',
  purpose: 'Formula questions (TAT/SAT, LSS, Mach, TAS) and lots of "what happens to X when climbing at constant Y" questions.',
  lessons: [
    { id: 'speeds-sim', type: 'sim', sim: 'speeds', icon: 'sliders', ask: 'Play with it: CAS, TAS and Mach in a climb', dgca: true,
      takeaway: 'Pick a layer and the speed you hold. The held speed is the vertical line; watch whether the other two lean right (increase) or left (decrease) as you climb.',
      hook: 'Climbing in ISA: Coffee, Tea or Me (C-T-M) from left to right.' },
    { id: 'tat', type: 'formulas', icon: 'calc', ask: 'Temperature and Mach formulas', dgca: true,
      items: [
        { name: 'SAT from TAT', eq: 'SAT = TAT ÷ (1 + 0.2 M²)   (kelvin)', ex: 'TAT −9 °C, M0.86 → −43 °C.', calc: { inputs: [{ k: 't', label: 'TAT (°C)', v: -9 }, { k: 'm', label: 'Mach', v: 0.86 }], f: '((t+273)/(1+0.2*m*m)-273).toFixed(1)', unit: '°C' } },
        { name: 'Ram rise', eq: 'rise ≈ (TAS / 87.1)²', ex: 'TAS 400 kt → ≈ 21 °C.', calc: { inputs: [{ k: 'v', label: 'TAS (kt)', v: 400 }], f: '(Math.pow(v/87.1,2)).toFixed(1)', unit: '°C' } },
        { name: 'Speed of sound', eq: 'LSS = 38.94 √T(K)', ex: '−56.5 °C → 573 kt.', calc: { inputs: [{ k: 't', label: 'SAT (°C)', v: -56.5 }], f: 'Math.round(38.94*Math.sqrt(t+273.15))', unit: 'kt' } },
        { name: 'TAS from Mach', eq: 'TAS = M × LSS', ex: 'M0.80 at −55 °C → 460 kt.', calc: { inputs: [{ k: 'm', label: 'Mach', v: 0.8 }, { k: 't', label: 'SAT (°C)', v: -55 }], f: 'Math.round(m*38.94*Math.sqrt(t+273.15))', unit: 'kt' } },
      ] },
    { id: 'chain', type: 'sequence', icon: 'gauge', ask: 'Correcting the airspeed', dgca: true,
      steps: [{ label: 'ASIR', sub: '+ instrument error' }, { label: 'IAS', sub: '+ position error' }, { label: 'CAS / RAS', sub: '+ compressibility' }, { label: 'EAS', sub: '+ density' }, { label: 'TAS', sub: '± wind' }, { label: 'GS' }] },
    { id: 'which', type: 'stamp', icon: 'check', ask: 'Increase, decrease or constant?', dgca: true,
      stamps: [{ id: 'u', label: 'Increases' }, { id: 'd', label: 'Decreases' }, { id: 'c', label: 'Constant' }],
      cases: [
        { text: 'Climbing at constant CAS in ISA: TAS?', answer: 'u' }, { text: 'Climbing at constant Mach in ISA: CAS?', answer: 'd' },
        { text: 'Isothermal layer at constant Mach: TAS?', answer: 'c' }, { text: 'Descending through an isothermal layer at constant CAS: TAS?', answer: 'd' },
        { text: 'Climbing through an inversion at constant TAS: Mach?', answer: 'd', why: 'Warmer air aloft: LSS rises.' },
      ] },
    { id: 'quiz', type: 'quiz', icon: 'check', ask: 'Quick check',
      questions: [{ q: 'TAT is always ___ than SAT, by an amount depending on:', options: ['warmer, TAS', 'colder, CAS', 'warmer, altitude'], answer: 0 }, { q: 'LSS depends only on:', options: ['Pressure', 'Temperature', 'Density'], answer: 1 }] },
  ],
};
