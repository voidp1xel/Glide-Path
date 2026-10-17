/* Calculators & decoders (engine: assets/tools.js). */
window.STATIC = {
  on: 'tools', href: 'tools.html', icon: 'calc', hue: 'h2', chip: 'Tools',
  title: 'Calculators & decoders',
  big: 'Every exam calculation as a live tool with a picture: wind components, wind triangle, ISA and density altitude, altimetry, 1-in-60, PNR/PET, descent, time, convergency, turns, cloud base, units and a METAR/TAF decoder.',
  blocks: [],
  after(w) { G.tools.mount(w); },
};
