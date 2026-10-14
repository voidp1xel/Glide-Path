# The Aviator's Handbook (Cdr Thomas Tom, 2nd ed. 2022): notes in points

Written for the DGCA CPL **Technical General** paper first (Parts 2–7, 9, 11), since the other papers have their own books on this site. Page references are the book's own (e.g. 2-3 = Part 2, page 3). Where the scan or the book's shorthand was ambiguous, the physics has been checked and stated plainly.

---

## 1. Aerodynamics Basics: Terms, Airspeeds and How Lift Is Made

### Physical terms (2-3)
- **Density**: mass per unit volume (kg/m³). **Pressure**: force per unit area (N/m²).
- **Adiabatic change**: no heat exchanged with the surroundings. **Isothermal change**: at constant temperature.
- **Vector**: magnitude and direction. **Scalar**: magnitude only.
- **Mass**: quantity of matter in a body. **Weight** (newtons) = mass × g: the force pulling it towards the earth's centre. M = W / g.
- **Momentum** = mass × velocity (kg m/s): the tendency to keep moving once moving.
- **Inertia**: reluctance of a body to change its state of rest or motion. Depends on **mass**, not velocity; applies to bodies at rest and in motion; it is **not** the same as momentum.
- **Force** (N) = mass × acceleration: changes a body's momentum or state of rest/uniform motion. Example: a 60,000 kg aircraft needs F = m × g = 60,000 × 9.81 = **588,600 N** of lift in level flight.
- **Work** (J) = force × displacement. No movement, no work. Moving 10 kg or 100 kg through 10 m with 100 N is the same work.
- **Power** (W = J/s) = work ÷ time. Example: 5000 N moving a mass 1000 m in 2 min → 5000 × 1000 ÷ 120 = **4167 W**.
- **Energy** (J): capacity to do work. **Kinetic energy** = ½ m v² (from v² = 2as and KE = F × s). **Potential energy** = m g h.

### Laws (2-4)
- **Newton's laws**: (1) a body stays at rest or in uniform straight-line motion unless a force acts; (2) rate of change of momentum ∝ applied force, in the force's direction; (3) action and reaction are equal and opposite.
- **Equations of motion**: v = u + at; s = ut + ½at²; v² = u² + 2as; s = ½(u + v) t.
- **Friction**: static (limiting) friction acts before movement starts; sliding (kinetic) friction is **less** than static.
- **Fluid pressure at rest**: acts equally in all directions; acts at right angles to any surface it touches; increases with depth.
- **Gas laws**: **Boyle** — constant temperature: P ∝ 1/V (PV = constant). **Charles** — constant pressure: V ∝ T (volume changes by 1/273 of its 0 °C value per °C). **Gay-Lussac** — constant volume: P ∝ T. **Avogadro** — more gas, more volume (V/n = constant). Combined: **PV = nRT**.
- **Circular motion**: angular velocity ω = v / r; centripetal acceleration = v² / r; **centripetal force = m v² / r = W v² / (g r)**. **Moment of inertia** I = Σ m r². **Angular momentum** = I ω.

### Density and pressures (2-5)
- With height, pressure falls (density falls) but temperature also falls (density rises); the pressure effect wins, so **density falls with height**, though the **rate** of fall slows. **Humidity up → density down.**
- **Static pressure (S)**: the weight of the air acting on every surface; higher at lower altitude.
- **Dynamic pressure = ½ ρ V²**: the kinetic energy of moving air turned into pressure when brought to rest in a pitot tube. **Double the speed → 4× the dynamic pressure.**
- **ASI principle**: pitot (total) pressure = ½ ρ V² + S; ASI measures **total − static = dynamic pressure**. By Bernoulli the total pressure in a streamline flow is the same everywhere, so the pitot head can sit anywhere in the flow; the **static source** must sense true ambient pressure.
- As density falls with height, the mass of air flowing over the wing falls, so **TAS must rise** to keep the same lift.

### Airspeeds (2-5)
- All **V-speeds are CAS** except **VA (manoeuvring) which is EAS**; speeds in the flight manual are **IAS**.
- **IAS**: what the ASI shows (dynamic pressure). → **CAS** (= RAS): IAS corrected for **position/instrument error**. → **EAS**: CAS corrected for **compressibility** — the true measure of dynamic pressure, so handling depends on EAS. → **TAS**: EAS corrected for **density**: **TAS = EAS ÷ √(ρ/ρ₀)**.
- At ISA sea level IAS = TAS. Climbing at constant IAS, **TAS rises**. At 40,000 ft density is about **¼** of sea level, so TAS is about **2× EAS**.
- **Mach number = TAS ÷ local speed of sound (LSS)**; **LSS = 39 √T(K)** kt (≈ **661 kt / 340 m/s** at sea level). Height up → temperature down → LSS down, so at constant TAS **Mach number rises with height**.

### Streamline flow and lift theories (2-6 to 2-7)
- **Steady streamline flow**: properties may differ from point to point but stay constant in time at any point; streamlines follow the surface and never cross. **Unsteady flow** cannot be drawn as streamlines.
- **Equation of continuity** (mass flow constant): **ρ A V = constant**; for incompressible flow **A V = constant** — where streamlines converge (area down), speed rises. Air's compressibility is ignored **below about 0.4 Mach**.
- **Bernoulli's theorem**: in steady streamline flow of an ideal fluid, **pressure + kinetic + potential energy = constant**; for aircraft, **P + ½ ρ V² = constant**. Where flow speeds up, static pressure falls (total pressure unchanged).
- **Three ways of explaining lift**:
  1. **Pressure distribution** (continuity + Bernoulli): faster flow over the top → lower static pressure → lift.
  2. **Momentum (deflection) theory**: the wing deflects a stream of air; force = rate of change of momentum = mass flow × Δv (book's worked form F ≈ 1.4 ρ A V² for its vector example). The force grows with angle of attack and camber — how a windmill works.
  3. **Circulation (Magnus effect)**: a non-spinning cylinder has equal flow above and below — no lift. Spinning it speeds the flow on one side and slows it on the other, moving the stagnation points, so pressure is lower on the fast side → lift. A rough surface drags more air round → more circulation → more lift (golf ball dimples).
- **Cricket ball swing** (book's illustration of boundary layers): conventional swing — the seam makes one side turbulent, ball swings **towards the seam**; reverse swing — above ~90 mph (higher Reynolds number) both layers go turbulent earlier and the ball swings **away** from the seam; contrast swing — with both sides rough, reverse swing even below ~70 mph.

### Viscosity and Reynolds number (2-8)
- **Viscosity (μ)**: resistance to relative motion between adjacent fluid layers; for air **1.79 × 10⁻⁵ kg/m/s** at ISA MSL. In a **gas** it **rises with temperature** (more molecular collisions), so it falls with height to the tropopause and stays steady above. In a **liquid** it **falls with temperature**.
- **Kinematic viscosity (ν = μ/ρ)**: 1.46 × 10⁻⁵ m²/s at ISA MSL; density falls faster than μ, so ν **rises with height**, even in the stratosphere.
- **Reynolds number RN = ρ V l / μ**: ratio of inertial to viscous forces (dimensionless). A model and a full-size aircraft at the **same RN** behave the same aerodynamically.
- Low RN → laminar boundary layer → separates easily → more drag. High RN → earlier transition to turbulent → turbulent layer has more energy → **separation delayed** → less (form) drag.
- Near the leading edge RN is low (< 0.5 million) → laminar; further aft 1–5 million (transition); above ~10 million → turbulent.
- A separated laminar layer causes **more** drag than an attached turbulent layer, so turbulent is preferable for delaying separation.
- **Higher RN → higher CLmax, more lift, higher stalling angle.** **R_crit**: the RN at which the transition point jumps forward, giving a turbulent layer that delays separation.
- **Scale effect**: change of aerodynamic characteristics with RN. A 1/10 model has 1/10 the length, 1/100 the area and 1/1000 the mass; to match RN the "VL law" would need 10× the speed (a 400 km/h aircraft → 4000 km/h in the tunnel). Raising the tunnel air **density 25×** keeps RN the same at only 160 km/h.

### Definitions (2-9)
- **Aerofoil**: a shape that produces lift. **Chord line**: straight line from leading edge (LE) to trailing edge (TE); **chord**: its length. Root chord Cr, tip chord Ct, mean chord c̄. **Span** b: tip to tip. **Wing area** S = chord × span.
- **Taper ratio** = Ct / Cr. **Aspect ratio** = span / mean chord = **b² / S**.
- **Mean camber line**: line from LE to TE midway between the upper and lower surfaces; **max camber**: greatest distance between it and the chord line.
- **Angle of incidence**: between the chord line and the aircraft's longitudinal datum (fixed). **Angle of attack**: between the chord line and the **relative airflow** (varies).
- **Dihedral**: upward angle of the wing (book measures it along the quarter-chord line) relative to the lateral axis. **Sweepback**: angle between the quarter-chord line and a line perpendicular to the root chord (the lateral axis).
- **Wash-in**: twist that **increases** incidence towards the tip. **Wash-out**: twist that **decreases** incidence towards the tip.
- **Wing loading** = weight / wing area. **Load factor** = lift / weight.
- **Lift**: aerodynamic force at 90° to the relative airflow (flight path). **Total reaction (TR)**: resultant of all aerodynamic forces on the wing, acting through the centre of pressure; it resolves into lift and drag.
- **Mean aerodynamic chord (MAC)**: the chord through the centroid of the wing area; a rectangular wing of that chord would have the same pitching-moment characteristics.

### Centre of pressure and aerodynamic centre (2-10)
- **Centre of pressure (CP)**: the point through which the total reaction acts; its position depends on camber, CL and angle of attack. The book treats TR as roughly perpendicular to the chord.
- **Cambered aerofoil**: as AoA increases the suction peak grows and moves forward, TR grows and **CP moves forward** (nose-up, destabilising); CP is **furthest forward at CLmax**; at the stall TR drops and **CP moves back**. In normal use CP stays around **20–30% of chord**.
- **Symmetric aerofoil**: CP stays at about **25% chord** whatever the AoA.
- **Flat plate**: CP moves **back** as AoA increases (nose-down, stable).
- CP travel can be reduced by **less camber**, a **reflexed** (upturned) trailing edge (at a cost in lift), or a convex lower surface.
- **Aerodynamic centre (AC)**: the point about which the **pitching moment stays constant** with AoA; the point where all **changes** of lift effectively act. Below about 0.4 Mach it is at **25% chord** for any aerofoil, whatever its camber, thickness or AoA. Calculations use the fixed AC instead of the moving CP.

### Exam traps
- **Double the speed → 4× dynamic pressure** (and 4× lift/drag at the same AoA).
- **IAS → CAS (position) → EAS (compressibility) → TAS (density)**. All V-speeds CAS except **VA = EAS**.
- Constant IAS climb: TAS **up**; constant TAS climb: Mach **up**. LSS = **39√T** kt, 661 kt at MSL.
- Viscosity of air **rises** with temperature; of liquids **falls**. Kinematic viscosity rises with height.
- Higher RN: higher **CLmax and stalling angle**; turbulent layer resists separation.
- **AC fixed at 25%** chord (subsonic); **CP moves forward** with AoA on a cambered wing, fixed on a symmetric one, **backward** on a flat plate.
- Aspect ratio = **b²/S**; wash-out = less incidence at the tip.
