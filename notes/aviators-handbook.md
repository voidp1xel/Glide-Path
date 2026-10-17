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

---

## 2. Airflow, Lift and Drag

### Subsonic airflow over an aerofoil (2-11)
- The flow pattern round an aircraft depends only on its **shape, attitude and Reynolds number** (size, viscosity, density, speed). Static and dynamic pressure vary through the flow but **total pressure stays constant**.
- **Leading-edge stagnation point**: where part of the flow is brought to **complete rest**. Velocity **zero**, positive pressure **maximum**; total pressure = static pressure, dynamic pressure zero. The flow divides here into top and bottom streams.
- Beyond the stagnation point the flow **speeds up and its pressure falls**; at the **point of maximum camber** on the top surface speed is **highest and pressure lowest**; after that speed falls and pressure rises back to free-stream values.
- **Upwash**: air approaching the wing rises towards the low pressure above it. **Downwash**: behind the wing the flow is turned down and then returns to its original direction.
- **Boundary layer (BL)**: the layer next to the surface where flow speed is **less than 99% of free-stream** speed. Typically **2 mm thick at the LE, 20 mm at the TE**. Its behaviour is set by surface condition and RN.
- The BL does **not** contribute to lift at normal angles of attack, but has a profound effect at high AoA: on **stalling characteristics, CLmax, form drag and high-speed characteristics**.
- A very thin **sub-laminar layer** continues below the turbulent layer and lowers skin friction.

| Laminar boundary layer | Turbulent boundary layer |
|---|---|
| Before the transition point | After the transition point |
| Smooth, steady, **thin** | Unsteady, **thick** |
| **Low** skin-friction drag | **High** skin-friction drag |
| Moderate velocity gradient | High velocity gradient |
| Low energy exchange | High energy exchange |

- Because of its **higher kinetic energy** the turbulent layer **resists separation** in an adverse pressure gradient, so it is preferable to the laminar layer despite its higher skin friction.
- Ice accumulates on the leading edge (laminar region) but breaks off more easily in the turbulent region.

### Transition, separation and the creation of lift (2-12)
- **Transition point**: where the laminar layer becomes turbulent; on a curved aerofoil usually at the **point of minimum pressure (maximum camber)**. It moves **forward** with a **rougher surface** and **higher speed**; forward movement increases skin friction.
- **Adverse pressure gradient**: behind the transition point velocity falls and pressure rises; this leads to separation and adds to form drag.
- **Trailing-edge stagnation point**: skin friction and the adverse gradient take energy out of the BL; if it runs out of kinetic energy it stops near the TE. **Separation point**: where the upper BL leaves the surface — whenever it lacks the energy to face the adverse gradient.
- How lift builds with AoA (typical cambered section):
  - **−4° (zero-lift AoA)**: pressure drop on top equals that below: no lift.
  - **0°**: flow over the top accelerates, static pressure on top falls well below that underneath; the **LE stagnation point moves from the upper to the lower surface** as AoA increases.
  - **4° (best L/D)**: suction on top increases and the **suction peak moves forward**.
  - **8°**: suction peaks further forward.
  - **16°+**: transition and **separation points move forward**, the adverse gradient steepens, the flow can no longer follow the top contour and the low-pressure area **collapses: the stall**.

### Lift (2-13)
- Lift is the component of the total reaction **perpendicular to the flight path**: **L = CL × ½ρV² × S** (CL = pressure distribution; ½ρV² = dynamic pressure; S = wing area).
- Aerodynamic efficiency at an AoA = **L/D**. At normal AoA CL is always much greater than CD. **Best L/D ≈ 4° AoA** — but that is neither the CLmax nor the minimum-CD angle. Most lift comes from the **upper surface**.
- **V in the lift and drag equations is TAS**; density is what makes lift possible (none in a vacuum). Climbing, keep the **same IAS** (TAS rises) to keep the same lift. At **40,000 ft ρ ≈ ¼** → TAS **2×** for the same IAS.
- At one altitude, **double the speed → CL (AoA) must fall to ¼** for the same lift.
- At the **same IAS**, a density change has **no effect** on lift or drag. At the **same TAS**, lower density = less lift and less drag. Higher IAS = more lift but also more parasite drag. The **minimum flying IAS is set by CLmax**.

### Lift curves and factors affecting CL (2-13 to 2-14)
- CL rises with AoA up to CLmax. A **symmetric** aerofoil gives **CL = 0 at 0° AoA**; a **positive-camber** curve cuts the AoA axis **left of the origin** (lift at 0°; zero-lift AoA negative).
- Factors affecting lift: **AoA, shape and planform, surface condition, viscosity (RN), speed of sound** (all via CL); **density, velocity** (dynamic pressure); **wing area**.
- **AoA**: as it rises the BL loses energy to friction and the separation point moves forward, until CL falls.
- **Camber up**: curve moves **up and left**, **CLmax higher**, stalling AoA lower, **stall speed lower**.
- **Aspect ratio**: lower AR → stronger tip vortices and induced downwash → lower effective AoA → lower CL at a given AoA. Higher AR: steeper curve, slightly higher CLmax, **lower stalling AoA**. An infinite wing has no induced downwash.
- **Sweepback**: same area but lower effective aspect ratio, so it behaves like a low-AR wing: **stalling AoA higher, CLmax lower, stall speed higher**. Above about 45° sweep this is mainly from early upper-surface separation.
- **Leading-edge radius**: **small radius → abrupt stall**; **large radius → well-rounded CL curve, gentle stall**.
- **Surface condition**: LE roughness has a considerable effect on CL; roughness **aft of about 20% chord has no effect** on CL.
- **Reynolds number**: higher RN → earlier transition → more energetic turbulent layer → delayed separation → **more lift, higher stalling AoA**.
- **Leading-edge vortex ("bubble")**: on sharp-LE wings the laminar layer separates at the nose and a stationary vortex forms beneath it; good design (swept and delta wings) uses it to raise CL at the same AoA; the flow may re-attach downstream as a turbulent layer.

### Parasite drag (2-15)
- **Drag**: the sum of aerodynamic forces **parallel and opposite** to the direction of flight; two families — **parasite** and **induced**.
- **Parasite (zero-lift) drag**: **Dp = ½ρV² CDp S**. At the zero-lift AoA only parasite drag exists.
  - **Skin-friction drag**: viscosity in the boundary layer; more surface area → more friction drag.
  - **Form (pressure) drag**: difference between the high pressure at the front and the low pressure behind. **Profile drag = skin friction + form drag.** **Streamlining** raises the fineness ratio and eases curvature → smaller adverse gradient → less form drag.
  - **Interference drag**: the whole aircraft has **more** parasite drag than the sum of its parts — boundary layers thicken and mix at wing–fuselage and wing–engine junctions; wake turbulence adds a further pressure difference.
  - **Increments**: with more lift the transition point moves forward and the adverse gradient grows; interference drag grows; changing AoA changes the frontal area.
- Factors: **Dp ∝ EAS²** (2× speed → 4× q → **4× parasite drag**); **weight has no effect**; **configuration** (gear, flaps) can raise it by up to **80%**; **contamination** (ice) raises it; at **constant TAS** climbing lowers q and Dp; at **constant IAS** it stays the same.

### Induced drag and tip vortices (2-16)
- **Induced (lift-dependent) drag**: an unwanted by-product of lift, from the **wingtip vortices** and the **induced downwash** they cause. Lift itself reduces the lift finally obtained; restoring it needs more AoA, which adds more drag.
- **Di = ½ρV² CDi S; CDi = CL² ÷ (πAe)** (A = aspect ratio; e = efficiency factor, **1 for an elliptical wing**).
- **Wingtip vortex**: the pressure difference equalises round the finite tip — air flows **outward underneath, round the tip, inward on top**; where the streams meet at the trailing edge vortices form, small at the root and **largest at the tip**. Energy for the vortex comes out of the main flow.
- Vortex strength: **slow, heavy, clean, high AoA** = strongest (low IAS → high AoA → large pressure difference → more spanwise flow). Every aircraft, helicopters included, leaves one.
- Wake vortices **sink about 1000 ft** and trail up to **9 nm** behind; below **1000 ft AGL** they drift outward along the ground up to about **2 wingspans**; a crosswind can carry them onto a parallel runway.
- **Induced downwash** tilts the local airflow down, so the lift vector **tilts rearward**; its rearward component is induced drag. It **lowers the effective AoA** and overall lift, and reduces the AoA of the **tailplane** (less tail lift, less longitudinal stability).

### Factors affecting induced drag (2-17)
- **Lift**: Di and CDi ∝ **CL²**. At the high AoA of take-off induced drag can be up to **¾ of total drag**. Higher wing loading → more induced drag.
- **Weight**: for a given EAS induced drag ∝ W² (CL ∝ W); a heavier aircraft has more.
- **Speed**: **Di ∝ 1/EAS²** — **2× EAS → ¼ Di**; **CDi ∝ 1/EAS⁴** — 2× EAS → **1/16 CDi** (q 4×, so CL to ¼, CL² to 1/16).
- **Aspect ratio**: Di ∝ 1/AR — **doubling AR halves Di**; infinite AR → zero Di.
- **Planform**: maximum where the vortices are (tips); **elliptical wing = minimum**; **more sweep → more Di**; taper plus washout reduces it.
- **Altitude**: climbing at constant TAS → IAS falls → AoA rises → Di rises; at **constant IAS, Di is constant**.
- Reduction: **high AR, less sweep**; tip design — **tip fence, canted, raked tip, winglet, tip sail, spiroid, blended wing**; stop spanwise BL flow with **BL fences, vortilons, pylons**.

### Factors affecting CD (2-17)
- **AoA**: at low AoA drag is mostly parasite. **Shape**: thin, low-camber high-speed sections have the lowest CD; low-drag sections put **maximum thickness 40–50% aft of the LE** to keep laminar flow over more of the wing. **Rough LE**: immediate transition, more skin friction.
- **RN up**: more of the BL turbulent, separation moves aft (less form drag) but more friction; for the whole aircraft **total drag falls as RN rises**.

### Total drag and the speeds it defines (2-18)
- The total-drag curve holds for one aircraft, one weight, level flight. **Total drag is minimum where parasite drag = induced drag.** Low IAS: induced dominates; high IAS: parasite dominates.
- **VMD** (minimum drag, ≈ **4° AoA**, best L/D): where the two curves cross. Best for **R-A-G-E**: **R**ange (props), **A**ngle of climb, **G**lide range, **E**ndurance (jets).
- **VMP = 0.76 VMD** (minimum power = drag × speed): **best endurance for props** and **minimum sink / glide endurance** (props and jets). Found where the smallest drag × speed box touches the curve.
- **1.32 VMD** (best EAS/drag; tangent from the origin): **best range for jets**.
- **Weight up**: more CL and drag; **VMD and VMP increase**. **Flaps, gear, airbrakes, damage**: more drag and **VMD decreases**. Same IAS at any altitude → same drag. **AoA**: drag grows faster above about **8°**; a sudden rise at the stall.

### L/D ratio and ground effect (2-19)
- Greatest lift about **16° AoA**; least drag about **−2°**; both have poor CL/CD. **4° gives the best CL/CD** (CL **12 to 25 times** CD); beyond 4° CD grows faster than CL.
- **Ground effect**: within about **½ wingspan** of the ground vortices are squeezed, upwash and downwash weaken and **effective AoA rises**, so **CDi falls**.
- **Entering ground effect**: the same lift needs **less AoA**; **induced drag falls** → slower deceleration → **longer float**; less downwash on the tailplane → **nose-down pitch**; local pressure at the static ports rises → **ASI and altimeter under-read**.
- A high AoA on short finals is increased further in ground effect and can stall the aircraft — especially high-AR or swept wings.

### Exam traps
- Stagnation point: **V = 0, maximum pressure**, total = static.
- Boundary layer = flow **< 99%** of free stream; **2 mm at LE, 20 mm at TE**. Turbulent layer: **more friction but resists separation**.
- Transition moves **forward** with roughness and speed.
- Positive camber lift curve cuts the axis **left of the origin**; symmetric through the origin.
- Sweepback: **higher stall AoA, lower CLmax**. Small LE radius: **abrupt** stall. Roughness aft of **20% chord**: no effect on CL.
- **V in L = CL ½ρV²S is TAS.** Same IAS → same lift and drag at any height. 2× speed → CL to **¼**.
- **Profile drag = skin friction + form**. Parasite ∝ **V²**, weight-independent; induced ∝ **1/V²**, ∝ **CL²**, ∝ **1/AR**.
- Strongest wake: **heavy, clean, slow**. Vortices sink ~**1000 ft**, last up to **9 nm**.
- VMD at **Dp = Di**, ≈ 4° AoA, best L/D; **VMP = 0.76 VMD**; **1.32 VMD** = jet range. More weight → VMD **up**; flaps/gear → VMD **down**.
- Ground effect within **½ span**: less induced drag, float, **nose-down**, ASI/altimeter **under-read**.

---

## 3. Stalls, Spins and Upsets

### What a stall is (2-20)
- A stall is **boundary-layer separation** caused by too little kinetic energy in the flow against a high **adverse pressure gradient**. As AoA rises the separation point moves forward; at the **CLmax angle** it is near the leading edge, and any further increase breaks the flow down.
- In the stall the **CP of a normal (straight) wing moves back**; on a **swept wing the CP stays forward**.
- To pick up a dropped wing at the stall the book says: **small aircraft — use rudder**; swept-wing aircraft — aileron (per type procedure).
- **Critical angle of attack**: the AoA at which the flow over the wing breaks down. An aircraft **always stalls at the same critical AoA**, whatever its speed or attitude. Not all lift is lost there — just not enough to support the aircraft.
- **Aerodynamic symptom**: **buffet** — separated turbulent air striking the **tailplane**; the amount depends on where the tail sits in the wake. **Trailing-edge flaps** may reduce the buffet (more downwash over the tail).

### Stall behaviour and how designers tame it (2-20)
- Behaviour depends on **LE curvature, thickness/chord ratio, camber, position of maximum thickness and camber**. A **sharp LE, a thin wing and an aft maximum thickness** give a more **abrupt** stall.
- For favourable stall characteristics:
  - **Larger LE radius, more camber, more thickness/chord**.
  - **Planform**: a rectangular wing stalls **at the root first** — good.
  - **Washout** (less incidence at the tip): the root stalls first and the outboard **ailerons stay effective**.
  - **Change of section**: more thickness and camber near the LE.
  - **LE slots, boundary-layer blowing**: re-energise the BL.
  - **Root spoilers / stall strips** on the inboard LE: force the root to stall first.
  - **Vortex generators**: small vortices mix fast outer air into the slow BL.
  - **Boundary-layer suction**: removes the slow BL from the top surface.
- **Certification requirements**: no abnormal pitch-up; roll and yaw obtainable with **un-reversed** controls; positive longitudinal control retained; stall-induced roll **not more than 20°**; stall warning at least **5 kt or 5% CAS** above the stall.

### Basic stalling speed and what changes it (2-21)
- **Basic stalling speed (VsB)**: the speed below which a **clean** aircraft, at a **stated weight**, with **engines throttled back**, can no longer maintain **straight and level** flight. From L = CL½ρV²S: **Vs = √(W ÷ (CLmax ½ρS))**.
- **Weight**: Vs ∝ √W — **20% more weight → about 10% higher Vs**. Weight does **not** change the stalling AoA.
- **Load factor**: **Vs × √n** — a **4 g** pull doubles the stall speed.
- **Bank**: **Vs × √(1/cos φ)**: **30° ×1.07, 45° ×1.2, 60° ×1.4, 75° ×2**.
- **Configuration**: high-lift devices raise CLmax → **flaps lower Vs**. **Forward sweep** raises Vs.
- **CG forward** → more tail down-force → **higher Vs**. **Landing gear down** → higher Vs (book: extra tail down-force).
- **Power on** → **lower Vs** (thrust has a vertical component at the high nose attitude; the wings carry less). **Propeller slipstream** over the wing adds lift → lower Vs.
- **Altitude**: the aircraft stalls at the **same IAS** at any height (density alone), so **stalling TAS increases**.
- **Compressibility**: higher altitude → higher Mach number → lower CLmax → **higher IAS stall speed**; constant at first, rising markedly **above about 20,000 ft**.
- **Contamination**: lower stalling AoA and CLmax. **Ice/snow: Vs +30%, lift −30%, drag +40%. Frost: Vs +15%.** Rain: Vs up (extra water weight).

### Types of stall (2-22)
- **Deep (super) stall**: on a swept wing the CP stays forward at the stall and the nose pitches up; with a **high T-tail** the mainplane's turbulent wake blankets the tail and the **elevator becomes ineffective**, holding the aircraft stalled; the high rate of descent raises the AoA further and recovery may be **impossible**. Causes: **swept wing + T-tail**. Cure: a **stick pusher** pushes the stick forward before the stall.
- **Shock stall**: sudden drop in CL at about **M 0.82** from boundary-layer separation behind the upper-surface shockwave; can occur at **low AoA/high speed** or high AoA/lower Mach; severe **buffet that can damage the tail**.
- **Super stall (low-AR deltas)**: stalling AoA up to **40°**; by then the drag is so high that the flight path tilts down with the nose high — high rate of descent, loss of stability and control.
- **Stall recovery**: **lower the nose** (reduce AoA), **full thrust**, then stabilise altitude and control once out of the stall.

### Autorotation (2-22)
- If a wing drops at the stall, the **down-going wing meets the air at a higher AoA** than the rising wing. Beyond the stall more AoA means **less lift and more drag**, so the down-going wing loses lift (rolls further) and gains drag (yaws to the same side): **roll and yaw towards the low wing → spin**.
- Hence **do not use aileron** to lift a dropped wing at the stall (it raises that wing's AoA further); use **rudder**.

### Tip stall and pitch-up (2-23)
- Wings are designed to stall **progressively root to tip**. **Swept and highly tapered** wings (good for high speed) tend to **tip-stall**: the BL flows outward and thickens at the tips, separates, and tip CL falls suddenly.
- Tip stall is bad: **ailerons lose effectiveness**, one tip stalling first gives a **large roll**, and it can cause **pitch-up**. The root must stall first to give **tail buffet** warning.
- **Pitch-up** (swept wing at tip-stall AoA) snowballs, from:
  - **CP movement**: tip lift is lost (tips are aft on a swept wing) → **CP moves forward** → shorter CP–CG arm → more nose-up.
  - **Downwash change**: lift concentrated inboard → **more downwash over the tailplane** → less tail effectiveness → more pitch-up. Reduced by placing the tail in line with or below the wing.
  - **Wash-out from flexure**: swept tips twist nose-down under load, losing tip lift.
- Cures: **BL fences** (stop spanwise flow), **vortex generators**, **LE extensions (saw-tooth)**, **vortilons** and engine **pylons** under the LE.

### Spin (2-24)
- A spin needs a **stall plus sideslip/yaw**: **a stall must come first**. Both wings are stalled, one more than the other; that wing drops and the nose yaws towards it.
- The aircraft descends along a **helix**: **helix angle tan θ = p ÷ c** (p = height lost per turn, c = radius). High rate of rotation about the vertical **spin axis**. **Wing tilt angle**: positive with the **outer wing up**.
- In a spin **lift ≈ centripetal force (W V² / g R)** and **drag ≈ weight**.
- **Nose raised (higher AoA)**: vertical rate of descent **less** (more CD), spin radius **less** (less CL), spin rate **faster**.
- **Steady erect spin**: oscillatory at first; after about **2 turns** inertial and aerodynamic moments balance and it settles with a steady rate of descent.
- **Inverted spin**: roll and yaw are in **opposite senses**; same flight path and moments otherwise. It responds **better to anti-spin rudder** because the rudder is not shielded by the tailplane. Recovery as for a normal spin.

### Moments in a spin (2-25 to 2-26)
- Axes: **roll L** (longitudinal axis, angular velocity p), **pitch M** (lateral, q), **yaw N** (vertical, r). Right roll, right yaw and pitch-up positive.
- **Aerodynamic rolling moments — pro-spin**: sideslip with dihedral effect (relative air from the outer-wing side); **auto-rotative rolling** (damping in roll reverses above the stall); **outer wing faster** and at a more favourable CL; **in-spin aileron**.
- **Aerodynamic pitching moments — anti-spin**: positive longitudinal stability (nose-down); damping in pitch; **down elevator**.
- **Aerodynamic yawing moments — anti-spin**: fin and rudder behind the CG (directional stability), damping in yaw, **out-spin rudder** (in-spin rudder is pro-spin; vertical surfaces **ahead** of the CG are pro-spin).
- **Inertial moments** (A, B, C = moments of inertia about the lateral, longitudinal and normal axes; C largest): **roll L = (B − C) q r → anti-spin**; **pitch M = (C − A) p r → pro-spin (nose-up, flattening)**; **yaw N = (A − B) p q → pro or anti depending on mass distribution** (book: B/A > 1 anti, < 1 pro).

| Moment | Aerodynamic | Inertial |
|---|---|---|
| Roll | **Pro**-spin | Anti-spin |
| Pitch | **Anti**-spin | **Pro**-spin |
| Yaw | **Anti**-spin | Pro or anti (mass distribution) |

### Spin recovery (2-26)
- Aim: stop the rotation by cutting pro-spin rolling moment and adding anti-spin yawing moment. Standard sequence:
  1. **Throttle closed; ailerons neutral.**
  2. **Full opposite rudder** — anti-spin moment and stops the sideslip; the rudder is **not stalled**.
  3. **Pause** — the rudder is initially shielded by the descending tailplane's wake.
  4. **Stick progressively and centrally forward** to unstall the wings. The **spin may tighten** at first: less pitch rate q reduces the anti-spin inertial moments in roll and yaw.
  5. Rotation stops as the wings unstall; centralise and recover from the dive.

### UPRT — upset prevention and recovery (2-26)
- A transport-aircraft **upset**: **pitch > 25° nose-up, > 10° nose-down, bank > 45°**, or within these but at an airspeed inappropriate for the conditions. Not necessarily a stall/spin; includes gross over- and under-speed. Prevention and recognition matter as much as recovery.
- Recovery: check **bank and pitch on the ADI**; cross-check **ASI/VSI/altimeter**. **Nose low**: speed probably rising, altitude falling, VSI descent. **Nose high**: speed falling, altitude rising, VSI climb.
- Then: assess the **energy state**; **disconnect autopilot and autothrottle**; **retract speed brakes**; apply flight and engine control inputs per the manufacturer and operator.

### Exam traps
- Stall = **critical AoA**, same at every speed, weight and attitude; buffet comes from wake on the **tailplane**.
- Vs ∝ **√W** (20% heavier → 10% faster); ∝ **√n** (4 g → 2×); bank **60° → ×1.4**, 45° → ×1.2, 30° → ×1.07.
- Flaps, power on, slipstream → **lower** Vs; CG forward, ice, compressibility, forward sweep → **higher** Vs.
- Same **IAS** stall at all heights (density only) — stalling **TAS** rises; compressibility raises it above ~20,000 ft.
- Ice/snow **+30% Vs**, −30% lift, +40% drag; frost **+15%**.
- Deep stall = **swept wing + T-tail** → stick pusher. Shock stall ≈ **M 0.82**. Delta super-stall ≈ **40°** AoA.
- Autorotation: **down-going wing at higher AoA** → less lift, more drag. Don't use aileron at the stall.
- Swept-wing tip stall → **CP forward → pitch-up**; fences, vortilons, saw-tooth, VGs.
- Spin: aerodynamic **roll pro**, pitch and yaw anti; inertial **pitch pro**. Recovery: throttle closed, ailerons neutral, **full opposite rudder, pause, stick forward** — spin may tighten first.
- UPRT: **> 25° up, > 10° down, > 45° bank**.

---

## 4. Aerofoils, Wing Planforms and High-Lift Devices

### Requirements of an ideal aerofoil (2-27)
- **High CLmax** — low landing speed.
- **Low CDmin** over a **range** of AoA — high flight speeds.
- **Good L/D** — efficiency, load-carrying, low fuel burn. **High maximum CL³ᐟ²/CD ratio** (book: CL/CD) — less power required, more endurance.
- **Small, stable CP movement** — the largest wing loads lie along the line of CP travel, so small travel saves structural weight.
- Aerofoil performance depends on **thickness, roughness, camber and LE shape**.
- **Laminar-flow aerofoils**: thinner, for higher speed; **thickest at about 50% chord** (conventional **25–30%**); transition is delayed so drag falls considerably.

| Aerofoil | Used on | Camber | Leading edge / thickness | Max thickness |
|---|---|---|---|---|
| **High lift** | gliders, sailplanes | **deep** | rounded, thick | 25–30% |
| **General purpose** | transports, bombers | deep | lower t/c | 25–30% |
| **High speed** | fighters | **low** (or symmetric bi-convex/wedge) | **sharp LE**, even lower t/c | **≈ 50%** |

- A **reflex trailing edge** gives less CP movement and good stability (low lift, more drag). A **symmetric** section has **no CP movement**. **GA(W)-1** (rearward camber): good lift, low drag, good stall.

### Wing planforms (2-28)
- **Elliptical**: **least induced drag**; constant CL (≈ 1.0) root to tip — every section gives the same lift. Cons: hard to build, **no stall warning**, ailerons lose effect at the stall (whole span stalls together).
- **Rectangular**: low CL at the tip, high at the root → **strong root-stall tendency**, **ailerons stay effective**; but poor aerodynamic and structural efficiency.
- **Tapered**: taper sets spanwise lift distribution. **Moderate taper (0.5)** ≈ elliptical behaviour. **High taper (0.25)**: highest CL near the tip → **tip-stall** tendency. **Pointed tip (taper 0)**: tip always stalled — no practical subsonic use.
- **Swept back**: like **reducing aspect ratio**; improves high-speed characteristics; good in **turbulence** (gentle lift-curve slope, so gusts change wing loading less).
  - **Lift**: only the normal component **V cos Λ** makes lift (V sin Λ flows spanwise) → **CL and CLmax lower** (early upper-surface separation).
  - **Drag**: needs more AoA for the same lift → more downwash and **induced drag**. On approach raising the nose adds far more drag than lift → **high rate of descent**; some types add high-drag devices to bring VMD closer to the approach speed.
  - **Stalling**: the BL flows **spanwise**, pools and thickens at the tips → **tip stall**; a **ram's-horn vortex** forms at the tip (LE separation + spanwise flow + tip flow).
  - **Disadvantages**: longer take-off/landing run and higher speeds, prone to **tip stall, super stall, pitch-up and Mach tuck**, less trailing-edge space for controls, **lower CLmax, higher stall speed**.

### Other wing designs (2-29)
- **Crescent wing** (e.g. Victor): root thickest and most swept; sweep and t/c fall towards the tip; outboard almost unswept → BL does not flow out to the tips. Less peak drag rise, less tip stalling, higher drag-rise Mach number.
- **Tail-less delta** (e.g. Mirage 2000, Tejas): no separate tailplane; raising the TE (elevon) gives a TE down-force and **increases wing AoA**; raised TE reduces effective camber → **CLmax lower**. Low AR → **high stalling AoA**, higher still as the TE is used as an elevator.
- **Slender delta** (Concorde): **low drag at supersonic speed** (low AR); sharp LE separates at low AoA into a controlled **LE vortex** with a low-pressure core → up to **30% more CL** (vortex lift). LE separation moves the **CP back to about mid-chord (≤ 50%)** → better longitudinal stability.
- **Forward sweep** (X-29): good subsonic/transonic; under flexural load **effective AoA rises towards the tip** (opposite to sweepback) → needs **aero-elastic tailoring** or the wing may fail. The ram's-horn vortex flows **tip → root**, so **tip stall is reduced and ailerons stay effective**; the **root stalls first**, blanketing a conventional tail → **canards** are used.
- **Canards** (control surfaces ahead of the main plane): **less trim drag**; controls are ahead of mainplane shockwaves; with aft CG/rear engines the long arm lets a **small canard** trim; stay effective at high AoA when a tail would be in the wake. **Disadvantages**: a conventional aircraft's wing stalls before its tail, keeping control; with a canard, **wing stalls first → stability lost; canard stalls first → control lost**; canard downwash interferes with the wing.

### Effect of aspect ratio (2-30)
- **CDi ∝ 1/AR** — minimum induced drag needs maximum AR. Lower AR needs more AoA for the same lift.
- **High AR** (transports, gliders): good lift at low speed; but long wings → **more weight, less stiffness** — not for high-speed aircraft.
- **Low AR** (combat): low-drag sections for transonic/supersonic flight, **higher roll rates**, **high stalling AoA**. But **more induced drag and downwash** (high AoA needed), **high drag at low speed**; over-rotation on take-off may leave it unable to fly out of ground effect; longer take-off; steep turns at low speed raise drag and stall speed; raising the nose below the glide path or flaring from a steep slow approach raises induced drag sharply → high ROD / rapid speed loss.

### Lift augmentation (2-31)
- Purpose: **raise CLmax** so take-off and landing speeds are lower.
- **LE devices**: LE flaps, **slats**, **Krueger flaps**. **TE devices**: **plain, split, slotted, Fowler, Zap, double-slotted** flaps.
- **Slats**: raise **CLmax by up to 70%** and **increase the stalling AoA**. Fitted along the LE (often full span); unlike flaps they **do not increase camber**; the **slot** acts as a venturi and **energises the BL**, flattening the suction peak at high AoA. Extended manually or automatically at a set AoA; useful only at high AoA (high drag otherwise). On landing they give a **nose-high attitude** (poorer view).
- **Krueger flap**: hinged out from the **LE underside**; **increases camber, forms no slot**.
- **TE flaps** — extending them:
  - **Lower** take-off, landing and **stalling speeds**; shorter landing distance; less range; more power needed.
  - **Increase camber** (Fowler also **area**) → **higher CLmax**; **zero-lift AoA more negative**.
  - **Reduce the stalling AoA** (TE flaps; LE flaps/slats **raise** it) — separation comes earlier.
  - **Worsen L/D** — **flaps up always gives the best L/D**; of the flap settings, the take-off setting is best. **Max climb angle and max glide distance fall**; glide steeper. Zero flap gives the **best climb angle**.
  - **Take-off run**: flaps lower the lift-off speed (shorter) but cut acceleration (longer); up to the **optimum setting** the speed effect wins and TORR falls; beyond it TORR rises.
  - First few degrees add mostly **CLmax**; last few degrees mostly **drag**.
  - **CP moves back** → **nose-down moment**, though the aircraft balloons (climbs) as lift rises. More **downwash on the tailplane**.
  - **Do not move the aerodynamic centre**. Sweepback **reduces TE-flap effectiveness**. May increase or decrease tip-stall tendency.
- CLmax ranking (book's graph, highest first): **Fowler > slotted > plain + slat > split > plain > basic + slat > basic aerofoil**.

### Exam traps
- Laminar-flow section: max thickness **≈ 50%** chord vs **25–30%** conventional.
- High-speed aerofoil: **low camber, sharp LE**, max thickness ~50%. Symmetric: **no CP movement**.
- Elliptical: least induced drag but **no stall warning**. Rectangular: **root** stalls first. High taper/pointed/swept: **tip** stall.
- Sweep: lift from **V cos Λ**; lower CLmax, higher stall speed, tip stall, pitch-up, Mach tuck; good in turbulence.
- Forward sweep: tip → root vortex, **root stalls first**, needs **aero-elastic tailoring** and canards.
- Slender delta vortex lift: **+30% CL**, CP to **≈ 50%**.
- Canard: wing stalls first → **stability** lost; canard first → **control** lost.
- **CDi ∝ 1/AR**; low AR → high stalling AoA, high roll rate.
- Slats: CLmax **+70%**, **raise** stalling AoA, **no camber change**. Krueger: camber, **no slot**. TE flaps: **lower** stalling AoA, **nose-down** pitch, **worse L/D**, AC unchanged.

---

## 5. Stability

### Stability and static stability (2-32)
- **Stability**: the tendency of an aircraft to return to steady flight after a disturbance, **without pilot input**. **Equilibrium (trim)**: all forces and moments sum to zero. The CG is placed for the best balance of stability and control: **more stability = less manoeuvrability**.
- **Static stability**: only the **initial tendency** after a disturbance (e.g. a gust).
  - **Positive**: returns towards equilibrium. **Neutral**: stays where it was put. **Negative (unstable)**: keeps diverging.
- Most aircraft: **positive static stability in pitch and yaw, neutral in roll**.

| Stability | About axis | Motion | Main surface | Control |
|---|---|---|---|---|
| **Longitudinal** | lateral (pitch) axis | pitch | **tailplane** | elevator |
| **Directional** | vertical (normal) axis | yaw | **fin** (vertical stabiliser) | rudder |
| **Lateral** | longitudinal (roll) axis | roll | **wings** | ailerons |

### Longitudinal static stability (2-32 to 2-33)
- Wing and tail moments are taken about the CG, with lift acting at each surface's **aerodynamic centre**. An up-gust raises AoA on both: the wing AC is **ahead** of the CG (nose-up moment), the tail AC far **behind** (nose-down moment). If the **tail moment arm is long enough** the nose-down moment wins: **positive longitudinal stability**. Net moment = (tail lift × tail arm) − (wing lift × wing arm).
- **CG forward → more stable** (longer tail arm). **CG aft → less stable**; where the two moments are equal the aircraft is **neutral**; further aft it is **unstable** (and over-responsive to controls).
- **Forward CG limit**: maximum stick forces, minimum manoeuvrability (set by maximum permissible stability). **Aft CG limit**: minimum stick forces, maximum manoeuvrability (minimum permissible stability); the aircraft tends to neutral there.
- **Neutral point**: the CG position at which the aircraft is **neutrally stable** — the reference for longitudinal static stability. CG behind it → unstable; the CG is never allowed to reach it.
- **Static margin**: the distance between the **aft CG limit and the neutral point**.
- Contributions:
  - **Tailplane** — the greatest stabilising influence; depends on tail **area, planform and moment arm**. Elevator position does **not** change the tail's contribution. Reduced by **wing downwash** on the tail and **lower dynamic pressure** at the tail.
  - **Longitudinal dihedral**: the tailplane is set at a **smaller incidence than the wing** — needed for positive stability.
  - **CG aft → less stability.**
  - **Wing camber has no effect**; pitching moment about the wing AC is always negative (nose-down). Wing AC ahead of CG is destabilising.
  - **Power**: thrust line **below the CG** (nose-up moment) and propwash/jet downwash on the tail **reduce** stability — most at **high power, low speed**; propeller aircraft lose more with thrust changes.
  - **High-lift devices**: more downwash and less dynamic pressure at the tail → **less stability** (neutral point may move forward) — stability is **weakest on approach and landing**.
  - **Fuselage and nacelles**: destabilising.

### Manoeuvre stability (2-34)
- **Static stability** deals with AoA disturbances at constant load factor (n = 1); **manoeuvre stability** with changes of AoA and **load factor at constant speed** — the elevator must let the pilot hold a manoeuvre.
- Pitching up, the aircraft rotates about the CG and the tail moves down → **extra tail AoA** (pitch damping) opposing the rotation → adds stability.
- High static stability → high manoeuvre stability. **At a given EAS, higher altitude → less manoeuvre stability** (less damping in thin air).
- **Manoeuvre point**: CG position at which wing and tail moments balance in a manoeuvre; because of the extra tail effectiveness it lies **behind the neutral point**.

### Dynamic stability (2-34)
- **Dynamic stability**: the motion **over time** after the disturbance. **Positive**: oscillations die out. **Neutral**: steady oscillation. **Negative**: oscillations grow.
- **Positive static stability can go with positive, neutral or negative dynamic stability; negative static stability always means negative dynamic stability.**
- Higher altitude → less **aerodynamic damping** (thin air).
- **Short-period oscillation**: rapid, with large changes of **AoA and load factor** while speed and height stay almost constant; restored by static stability; hard for the pilot to control — control inputs may reinforce it (**PIO**); cured by **pitch dampers**.
- **Long-period oscillation (phugoid)**: slow oscillation in **pitch, height and speed** at a nearly **constant AoA** — an exchange of potential and kinetic energy; **easily controlled** by the pilot.

### Directional stability (2-35)
- **Weathercock** tendency to keep pointing into the relative airflow (yaw). **Fin** = main contributor.
- **Sideslip angle β**: between the centreline and the relative airflow; positive with the airflow **from the right**. Airflow from the left pushes the fin (behind the CG) so the nose yaws **into** the airflow. Yawing with rudder sets up an opposing sideslip → **damping in yaw**.
- **Fin**: effective at **small** yaw angles, less at large ones. **Dorsal/ventral fins**: overcome the fuselage's destabilising effect; **effective at large** sideslip. **Dorsal fin** adds both directional **and lateral** stability; **ventral fin** adds directional but **reduces lateral** stability — so dorsal fins are preferred.
- **Wings**: negligible. **Fuselage**: side force acts through its AC **ahead of the CG** → **destabilising**. **CG position**: negligible effect (its range is set by longitudinal stability).

### Lateral stability (2-36)
- Restoring roll after a sideslip. **Aerodynamic damping in roll**: the down-going wing gains AoA and lift, the up-going wing loses it — this **opposes the rate of roll** but cannot level the wings (neutral). A wing drop that rolls further = negative.
- **Dihedral effect**: in a sideslip the wing on the side of the slip meets the air at more AoA, gains lift and rolls the aircraft away from the slip → **stabilising**. **Anhedral** reduces it.
- **Wing position**: **high wing** — crossflow round the fuselage blows **up** onto the leading wing (more AoA) → **stabilising**. **Low wing** — blows **down** (less AoA) → destabilising.
- **Sweepback**: the leading wing presents a smaller effective sweep (more V cos Λ) → more lift → **more lateral stability**; **10° sweepback ≈ 1° dihedral**. A swept **high** wing may be over-stable, so **anhedral** is used. **Forward sweep reduces** dihedral effect.
- **Fin** (above the CG): sideslip side force rolls the aircraft away → stabilising. **Ventral fin** (below CG) → destabilising.
- **Flaps** reduce lateral stability (centre of lift moves inboard).

### Coupled directional and lateral stability (2-37)
- **Directional divergence**: a small sideslip grows until the aircraft is broadside on — from **too little directional stability**.
- **Spiral divergence**: **directional stability > lateral stability**. In a sideslip the strong fin yaws the nose into it, weak lateral stability lags; the faster outer wing adds bank — a slowly tightening spiral dive; usually controllable by the pilot.
- **Dutch roll**: **directional stability < lateral stability**. Sideslip right → right wing gains AoA and is lifted strongly → its extra induced drag yaws the aircraft right → oscillating roll-and-yaw. **More dangerous than spiral divergence.** Prevented by **yaw dampers**; without one, correct with **ailerons, not rudder**.

### Exam traps
- Longitudinal stability is about the **lateral axis** (tailplane); lateral stability about the **longitudinal axis** (wings); directional about the **vertical axis** (fin).
- CG forward = more stable, heavier controls; CG aft = less stable, lighter. **Static margin = aft CG limit to neutral point.**
- Tailplane incidence **less** than wing incidence (longitudinal dihedral). Wing camber: **no effect** on longitudinal stability. Flaps and high power reduce it.
- Negative static stability ⇒ **always** negative dynamic stability.
- **Phugoid**: speed and height change at ~constant AoA, easy to control. **Short period**: AoA and g change, hard to control, PIO.
- Ventral fin: + directional, **− lateral**; dorsal fin: + both. Fuselage: directionally **destabilising**.
- High wing, dihedral, sweepback, fin: **+ lateral**; low wing, anhedral, ventral fin, flaps: **−**. **10° sweep ≈ 1° dihedral.**
- Spiral = directional **>** lateral; Dutch roll = lateral **>** directional → yaw damper, correct with ailerons.

---

## 6. Flight Controls, Tabs and Balancing

### Primary controls (2-38)
- **Ailerons** (on the main plane): lateral control — a rolling moment. Stick right → **right aileron up**, left aileron down.
  - As the aircraft rolls, **damping in roll** grows with roll rate (down-going wing gains AoA, up-going loses it) until it balances the aileron moment: a **steady rate of roll**. So **ailerons are a rate control**.
  - **Shorter span → less damping → faster roll rate.** Climbing at constant IAS → less damping (thin air) → **faster roll rate**.
  - A **down-going aileron lowers that wing section's stalling angle** (more camber).
  - **Aileron droop**: on the ground, controls neutral, ailerons hang slightly below the wing line; in flight the upper-surface suction lifts them into line. Some types droop both ailerons with the flaps to add flap area.
- **Elevators** (on the tailplane): longitudinal control. Stick back → **elevator up** → tail down-force → nose up. As AoA rises the down-force falls (pitch damping) until a new equilibrium; the aircraft holds that attitude while the elevator is held → **elevator is a displacement control**.
- **Rudder** (on the fin): directional control. Right rudder → yaw right → sideslip with airflow from the left → fin side force opposing (damping in yaw); a fixed rudder angle gives a **fixed yaw displacement** → **rudder is a displacement control**.
  - **Fin stall**: in a large sideslip the fin can stall; a **dorsal fin** lowers its aspect ratio and raises its stalling angle.
- **Spoilers**: flat plates on the **upper wing surface** that **increase drag and reduce lift**. Used **differentially** for roll (and to avoid adverse yaw); together on both wings as **airbrakes** (and lift dumpers).

### Secondary effects (2-39)
- **Roll due to yaw**: right rudder → yaw right → **left (outer) wing faster** → more lift → **roll right**, the same way as the yaw. Greatest at **low speed, high AoA**.
- **Adverse aileron yaw (yaw due to roll)**: rolling right, the **down-going left aileron** adds lift **and induced drag** on the left wing → the nose **yaws left, away from the turn**.
- Cures:
  - **Differential ailerons**: the **up-going aileron moves through a larger angle** than the down-going one → more drag on the up side, less on the down side.
  - **Frise ailerons**: asymmetric LE; the **up-going aileron's nose protrudes below the wing** → extra drag on that side; the down-going aileron's nose stays shrouded.
  - **Aileron–rudder interconnect**: rudder moves automatically with aileron.
  - **Roll spoilers**: raised on the **down-going wing** (adds drag on the same side as the turn).
- **Combined surfaces**: **tailerons** (all-moving tailplane halves: together for pitch, differentially for roll); **elevons** (delta-wing TE: together for pitch, separately for roll); **ruddervators** (V-tail: together for pitch, separately for yaw); **flaperons** (flaps + ailerons, where TE length is short).

### Aerodynamic balance (2-40)
- Control hinge moments depend on **surface area, moment arm, deflection and IAS** (dynamic pressure). On large fast aircraft they would be too heavy → **powered / fly-by-wire controls** or **aerodynamic balancing** (tabs, horns, inset hinges).
- **Balance tab**: on the control's TE, geared to move **opposite** to the surface; **reduces stick force** but **reduces control effectiveness**. Not pilot-operated: pilot moves surface, surface moves tab.
- **Anti-balance tab**: moves the **same way** as the surface; **increases stick force** (more feel) and **effectiveness**.
- **Servo tab**: the pilot moves **only the tab**; its aerodynamic force moves the surface (opposite direction). Sometimes also a trim tab; can act as emergency control if hydraulics fail or the elevator jams (works in the opposite sense). **Poor at low IAS** (deflections above ~20° ineffective).
- **Spring tab**: a servo tab with a spring — at **low speed** the spring is not compressed and the pilot moves the surface directly; at **high speed** dynamic pressure holds the surface, the spring compresses and the tab helps. Tab movement ∝ stick force.
- **Trim tab**: adjustable from the cockpit (trim wheel/switch); moved **opposite** to the surface until its moment balances the hinge moment → **zero stick force**. Aircraft is trimmed when it holds attitude and speed hands-off; **re-trim after any change of speed, power or CG**.
- **Fixed tabs**: ground-adjustable, usually on ailerons and rudder.

| Tab | Operated by | Moves relative to surface | Stick force | Effectiveness |
|---|---|---|---|---|
| Balance | control surface | **opposite** | less | reduced |
| Anti-balance | control surface | **same** | **more** | **increased** |
| Servo | pilot | opposite | less | reduced |
| Trim | trim control | opposite | **zeroed** | reduced |
| Spring | pilot (at high speed) | opposite at high speed | less at high speed | reduced at high speed |

### Hinges, horns and mass balance (2-41)
- **Inset hinge**: hinge line moved back into the surface → shorter arm from the surface's CP → **less hinge moment and stick force**, **no loss of effectiveness**. Limited to **20–25% of the control chord** so the CP never gets ahead of the hinge.
- **Overbalance**: CP ahead of the hinge → controls get **lighter as deflection increases** (dangerous).
- **Internal balance**: a balance panel/tongue inside the wing, sealed, ahead of the hinge; pressure difference on it helps move the surface.
- **Horn balance**: part of the surface **ahead of the hinge** at its tip (a horn); like an inset hinge; mainly on **rudders**; can also carry the mass balance.
- **Variable-incidence tailplane**: the whole tailplane moves to trim; less trim drag (streamlined), full elevator range kept, elevator stays neutral; good over a wide speed and CG range.
- **Mass balance**: a weight **ahead of the hinge line** brings the control surface's **CG to (or ahead of) the hinge** → prevents **control-surface flutter**.

### Exam traps
- **Ailerons = rate control**; elevator and rudder = **displacement** controls.
- Adverse yaw: nose yaws **away** from the roll — from **induced drag of the down-going aileron**. Differential: **up aileron moves more**. Frise: up-aileron's **nose drops into the airflow**.
- Roll due to yaw is in the **same direction** as the yaw.
- Balance tab: **opposite**, lighter, less effective. Anti-balance: **same**, heavier, more effective. Servo tab moved by the pilot; spring tab fixes the servo tab's low-speed weakness.
- Trim tab moves **opposite** to the control surface; re-trim after speed, power or CG change.
- Inset hinge ≤ **20–25%** of chord; CP ahead of hinge = **overbalance**.
- **Mass balance prevents flutter**, not stick force.

---

## 7. Flight Mechanics: Level Flight, Climb, Glide, Turn, Range and Endurance

### Level flight (2-42)
- **Lift** acts through the CP, at 90° to the flight path; **drag** through the CP, parallel to and opposing the flight path; **weight** through the CG, vertically down; **thrust** along the thrust line.
- Unaccelerated level flight: **Thrust = Drag, Lift = Weight**. More thrust → the aircraft accelerates until drag again equals thrust at a higher speed.
- CP moves forward with AoA; CG moves with fuel burn and configuration. Typically **CP ahead of CG at low speed (nose-up)**, **behind it at high speed (nose-down)**. The tailplane supplies the up- or down-force to balance this → **trim drag**.
- **Slowing down**: reduce power and raise AoA to hold lift; as AoA rises the CP moves forward, reducing the nose-down moment, so a little **forward stick** is needed again to settle.
- **Speed ↓ → CL (AoA) ↑**. At constant weight the **EAS–AoA relationship does not change with altitude**. As **weight falls** (fuel burn), lift must fall: **at the same AoA, speed must fall**.

### Steady climb (2-43)
- **Lift < weight** (lift supports only **W cos θ**, less as the climb steepens); **thrust > drag** (also balances the backward component **W sin θ**). In a vertical climb no lift — thrust carries the whole weight.
- **sin θ = (T − D) ÷ W** — **angle of climb depends on excess thrust**. Best angle at **Vx**.
  - Piston (propeller) aircraft: Vx is low — close to the **safe unstick speed**. **Jet**: Vx = **VMD** (jet thrust roughly constant with speed, so excess thrust is greatest where drag is least).
- **ROC = V sin θ = (T − D) V ÷ W = excess power ÷ weight** — **rate of climb depends on excess power**. Best rate at **Vy**.
- Power required in a constant-EAS climb = **D × V** (level flight) **+ W × Vc** (to climb) **+ (W/g) × V × a** (to accelerate, as TAS rises with height).
- **Wind**: headwind → **steeper climb gradient over the ground** (less ground distance); **no effect on rate of climb**.
- **Weight, altitude or temperature ↑** → angle of climb ↓, ROC ↓ (Vy rises in TAS). **Flaps** → more drag → lower angle, ROC and gradient.
- **Climb gradient = ROC ÷ ground speed.**
- **Power available vs required**: the biggest vertical gap = best climb speed. Jets have a wide band of speeds with excess power; the curve crossings mark the minimum and maximum level-flight speeds at that power. Power required (drag × TAS) **rises with altitude** at constant EAS (TAS rises), and **best ROC speed falls** with altitude.

### Cruise climb and step climb (2-44)
- **Cruise climb**: as fuel burns the drag curve drops, so best TAS/drag would need a lower speed; instead the aircraft **climbs slowly at constant TAS** (book: 1.19 VMD, IAS falling) — until about **M 0.8**, after which it holds altitude and lets TAS fall. Efficient but impractical in busy airspace.
- **Step climb**: fly **2000 ft above** the optimum altitude, hold it until the optimum is 2000 ft above you, then climb **4000 ft**; repeat, staying within 2000 ft of optimum — about **99% of cruise-climb efficiency**.

### Descent and glide (2-45)
- **Steady descent**: lift < weight (W cos θ); **thrust < drag** (W sin θ helps). Vertical descent: weight does all the work.
- **Glide**: only **lift, drag and weight**; the weight component along the path balances drag. **Glide angle: tan θ = D ÷ L** (cot θ = L/D) — smallest at **maximum L/D**.
- **Gliding for range — VMD** (best L/D) for jets and props. Faster or slower → steeper glide, less range.
  - **Headwind**: less range (higher best-range glide speed); **tailwind**: more range. **Wind has no effect on ROD.**
  - **Weight**: L/D is **independent of weight** — a heavier glider at its (higher) VMD has the **same glide angle and range**, but **higher speed and ROD**.
  - **Flaps, gear**: worse L/D, less range. **Altitude**: no effect on glide angle/range (if VMD is flown), but **higher ROD** at height (higher TAS).
- **Gliding for endurance — VMP** (minimum power = minimum sink) for jets and props. **ROD = V sin θ = D V ÷ W**: least where **D × V is least** → VMP. Raising or lowering the nose from VMP increases ROD. **Wind: no effect** on ROD or endurance. **More weight → less endurance**.

### Steady turn (2-46)
- In a bank the lift's **horizontal component** supplies the **centripetal force**; its vertical component must still equal the weight, so **AoA (lift) must increase**: **L = W ÷ cos φ**.
- **Load factor n = 1 ÷ cos φ** — depends on **bank angle only** (60° → 2 g); rises ever faster with bank.
- **Radius r = V² ÷ (g tan φ)**; **rate ω = g tan φ ÷ V**. **Radius ∝ TAS²**, **rate ∝ 1/TAS**: **double the speed → 4× radius, ½ the rate**. (Book's rule of thumb: bank for a rate-1 turn ≈ IAS/10 + 7.)
- At the same TAS and bank, **radius is independent of weight and configuration**.
- Minimum radius and maximum rate both need **CLmax**. **r = 2W ÷ (CLmax ρ S g sin φ)** → small radius needs **high CLmax and bank, low wing loading, high density (sea level)**. **ω ∝ CL ρ V S sin φ ÷ W** → high CL, speed and bank, low wing loading, sea level.
- **Altitude** ↑ → **larger minimum radius** (lower CLmax and thrust in thin air). **Thrust vectoring** (Su-30, MiG-29 OVT) adds to the lift → tighter turns.
- **Flaps**: raise CLmax and lower Vs → smaller radius possible, provided the **flap limit speed** is respected and there is **enough thrust** for the extra drag.

### Cruise, range and endurance (2-48)
- **LRC (long-range cruise)**: about **4% faster** than the still-air best-range speed for **99% of the range**.
- **Best range**: **props — VMD**; **jets — 1.32 VMD** at constant altitude; **1.19 VMD** in a cruise climb.
- **SAR (specific air range)** = air distance per unit of fuel = TAS ÷ fuel flow. Best SAR at the altitude where ~90% RPM gives 1.32 VMD without accelerating. **SAR = (1 ÷ SFC) × (TAS ÷ D)** — larger with more TAS/drag, less with more **weight** and more **SFC**.
- **GFC (gross fuel consumption)**: fuel per unit time. **SFC (specific fuel consumption)**: fuel per unit time **per unit thrust** (or power).
- **5% more weight → about 4.5% more fuel consumption.**
- **Little "m"** = cruising IAS ÷ VMD. Theoretically best range is at the highest altitude where m = 1 (IAS = VMD at Mcrit); in practice cruise lower so IAS and m rise to **1.19 (cruise climb)** or **1.32 (constant altitude)**.
- **Best endurance**: **props — VMP**; **jets — VMD**. Specific endurance = 1 ÷ (SFC × drag) → needs **max L/D, minimum weight, least fuel flow**.

| Speed | Props | Jets |
|---|---|---|
| **VMP** (0.76 VMD) | **endurance**; min-sink glide | min-sink glide |
| **VMD** | **range**; angle of climb (≈ Vx); glide range | **endurance**; **Vx**; glide range |
| **1.32 VMD** | — | **range** (constant altitude) |
| **1.19 VMD** | — | range in cruise climb |

### Summary of effects (2-47)
| Increase in… | Climb angle | Climb rate | Glide range | Glide endurance | Turn radius | Turn rate |
|---|---|---|---|---|---|---|
| **Headwind** | **up** (over ground) | no change | **down** | no change | — | — |
| **Weight** | down | down | **no change** (at VMD) | down | no change* | no change* |
| **Altitude** | down | down | no change | down (higher ROD) | up | down |
| **Temperature** | down | down | — | — | — | — |
| **Flaps** | down | down | down | down | down (if thrust allows) | up |
*at the same TAS and bank.

### Exam traps
- Climb: **lift < weight**, thrust > drag. **Angle ← excess thrust (Vx); rate ← excess power (Vy).** Jet Vx = **VMD**.
- **Wind never changes ROC or ROD** — only gradients and ground distances.
- Glide range: **VMD**, independent of **weight** (heavier = faster, same distance). Glide endurance: **VMP**.
- Turn: **n = 1/cos φ** (60° = 2 g); **r ∝ V²**, **rate ∝ 1/V**; radius independent of weight at same TAS/bank.
- Min radius/max rate: **CLmax, low wing loading, sea level**.
- Range: props **VMD**, jets **1.32 VMD** (1.19 in cruise climb). Endurance: props **VMP**, jets **VMD**. LRC: **+4% speed, 99% range**.
- Step climb: **±2000 ft** of optimum, **4000 ft** steps, **99%** of cruise-climb efficiency.

---

## 8. High-Speed Flight, the Manoeuvre Envelope and Aeroelasticity

### Mach number and speed regimes (2-49)
- Air is compressible; **Mach number** measures how close the aircraft is to the speed of its own pressure (sound) waves. Approaching them, the waves pile up ahead and disturb the flow → more drag.
- **Speed of sound depends only on temperature**: LSS = **39 √T(K)** kt. Higher altitude → colder → lower LSS. **Climbing at constant TAS → Mach rises; at constant IAS → Mach rises faster** (TAS also rises).
- **Free-stream Mach (MFS)**: aircraft speed ÷ LSS — what the Machmeter shows. **Local Mach (ML)**: differs over the airframe; at a given MFS it is **highest at the point of maximum camber**.
- **MMO**: maximum operating Mach number; **Mcrit lies above it**.
- **Mcrit (critical Mach number)**: the free-stream Mach number at which the local flow **first reaches M 1.0** somewhere on the aircraft. Beyond it shockwaves form: **CL falls, drag and temperature rise**. **Higher AoA → lower Mcrit**; so **more weight → lower Mcrit** (more AoA).
- **Mdet (detachment Mach number)**: above it the bow shock moves very little with speed — the **upper limit of the transonic** region.

| Regime | Mach |
|---|---|
| Low subsonic | **0 – 0.4** (incompressible) |
| High subsonic | **0.4 – 0.75** (Mcrit) |
| **Transonic** | **0.75 (Mcrit) – 1.2** |
| Supersonic | **1.2 – 5** |
| Hypersonic | **5 – 10** |

### What happens as Mach number rises (2-50)
- **Below Mcrit (0.4–0.75)**: pressure waves build up ahead, density rises; upwash becomes very steep; **CL rises steadily**; CP ≈ **30% chord**.
- **At Mcrit (book example M 0.81)**: flow over the top at maximum camber reaches M 1 → a **normal shockwave on the upper surface** (none underneath yet, flow still subsonic there). **CL maximum**; CP moves back a little.
- **Beyond Mcrit (≈ M 0.89)**: the upper shock moves **aft** towards the TE; a **lower-surface shock** forms; separation behind the upper shock gives **negative lift aft** → a **sudden drop in CL** (shock stall); CD keeps rising; CP **forward**.
- **≈ M 0.98**: both shocks reach the **trailing edge**; the suction is restored and **CL recovers**; CD still rising; CP moves **back** again.
- **Above M 1.0**: a **bow shockwave** forms ahead of the aircraft (distance depends on speed, size, air temperature) and moves closer as speed rises. **No upwash or downwash** in supersonic flow.
- **≈ M 1.4**: the bow wave **attaches to the LE**; CL falls (top and bottom pressures similar); **CD falls for the first time**; **CP settles at about 50% chord**.

### Shockwaves (2-51)
- **Normal shock**: at right angles to the flow; **no change of direction**; flow behind is **always subsonic**; greatest compression and **loss of total pressure** (kinetic energy turned to heat).
- **Oblique shock**: inclined; the flow **changes direction**; behind it the flow may be **subsonic or supersonic**; less energy loss.
- **Expansion wave**: the opposite — flow turns gradually, **speeds up**; pressure, density and temperature fall; **no energy loss**.

| Across the wave | Normal shock | Oblique shock | Expansion |
|---|---|---|---|
| Velocity | falls to **subsonic** | falls, may stay supersonic | **rises** |
| Static pressure, density, temperature | **rise** | rise | **fall** |
| Total pressure (energy) | **large loss** | smaller loss | no loss |

- **Ducts**: subsonic flow **speeds up in a convergent** duct and slows in a divergent one; **supersonic flow speeds up in a divergent** duct and slows in a convergent one (beyond M 1 the air expands into the extra area, density and pressure fall and Mach rises).

### Effects of shockwaves (2-52)
- **Lift**: **CLmax and stalling AoA are reduced** compared with incompressible flow.
- **Drag** rises sharply from Mcrit:
  - **Wave (energy) drag**: temperature rise behind the shock = energy lost; the more **oblique** the shock, the less loss. Reduced by **vortex generators, area rule, thin wings, sharp leading edges**.
  - **Interference drag** between parts at different local Mach numbers.
  - **Shock-induced BL separation** (drag falls again once shocks reach the TE).
  - **Trim drag**: beyond M 1 the **CP moves back** → **nose-down moment = Mach tuck (tuck-under)**, worsened by less downwash at the tail; the dive increases speed further. Insignificant subsonic, critical supersonic. Reduced by a **Mach trimmer**, less CP travel, **aft CG**, **canards**.
- **Controls in the transonic range**: a down-going control surface accelerates the flow (lowers local Mcrit), puts a shock **ahead of itself**, and separates the BL → less effectiveness. **Control buzz**: a shock near the hinge → rapid oscillation of the controls. Cures: **vortex generators** (re-attach flow behind the shock), **all-moving tailplane**, **roll-control spoilers**.

### Designs for high-speed flight (2-53 to 2-54)
- **Mach trim**: automatically adds nose-up trim at high Mach to cancel **Mach tuck** and keep the stick-force gradient; operates only at high Mach.
- **Area rule**: much of the transonic drag rise is **interference drag**; make the **total cross-sectional area** change smoothly along the aircraft → **"waist" (coke-bottle) the fuselage** where the wings and tail join.
- **Thin wings**: higher Mcrit (less flow acceleration), less wave drag. But **less lift**, higher take-off/landing speeds and distances, aeroelastic problems, little fuel space, LE separation and abrupt stall.
- **Sweepback**: raises Mcrit (only **V cos Λ** acts across the LE). Drawbacks: tip stall, pitch-up, super stall, Mach tuck, higher take-off/landing speeds, less TE space.
- **Canards**: longer moment arm, **less trim drag**, no **control buzz**.
- **Supercritical aerofoil**: **blunt nose, thick, flat upper surface, S-shaped camber line** (cambered aft). Flow does not accelerate as much on the flat top → shock **delayed to a higher Mach** and **weaker** → more even loading; thickness gives strength, payload and fuel. But **lower CLmax** at low speed → needs more high-lift devices.
- **Compression lift / wave rider** (beyond **M 3**, e.g. X-51): a large underbody shapes the shockwaves so the high pressure beneath adds lift.
- **Tip droop** (XB-70 Valkyrie, up to **65°**): moves the CP forward and adds vertical area (directional stability) at supersonic speed.
- **Tail-less delta**: counters sweepback's drawbacks; large area and chord → strength, **less wave drag, lower wing loading, less tip stall**. But more skin-friction and form drag (large chord); tips must lie **within the Mach cone**; needs long intakes and jet pipes.
- **Variable geometry** (F-14): swept is better up to ~M 1.2, but above ~M 1.2 the LE shock lies along the chord of a swept wing and drag rises — then a straighter wing is better. A **glove** keeps CP movement small.
- **Vortex lift**: on a delta at subsonic speed a root-originating LE vortex is held over the wing; its low-pressure core adds lift and delays separation.

### Transonic and supersonic stability (2-55)
- **Longitudinal: increases** with Mach — CP moves back to ~50% (longer CP–CG arm, more nose-down), and less downwash at the tail.
- **Lateral: decreases** — at Mcrit one wing may drop (uneven shocks), gaining lift and a stronger shock, and drop further; dihedral and sweepback effects become unhelpful.
- **Directional: decreases** — the fin loses effectiveness; in a sideslip the stronger shock on the windward side yaws the aircraft away; worse with aft CG/rear engines.
- **Inertia cross-coupling**: **yaw divergence** — good longitudinal but poor directional stability; pulling up during a fast roll, high **pitch-plane inertia** yaws the aircraft further. **Pitch divergence** — good directional but poor longitudinal stability; high **yaw-plane inertia** drives the nose down during combined roll and yaw. Avoid by minimum inclination of the inertia axis, **more directional stability** and **roll-rate limits**.

### Manoeuvre envelope (2-56)
- A graph (load factor against EAS) of the aircraft's operating limits — for design requirements and to show performance.
- **CLmax boundary**: curved lines (top and bottom) — maximum lift/load factor at each EAS. Pulling beyond it **stalls** the aircraft but does **not overstress** it. Where it meets **n = 1** is the **basic stalling speed**.
- **g limits**: maximum positive and negative load factors, with a further **50% safety margin** before permanent deformation (beyond it, failure). **Heavier → lower allowable g** (the structure carries g × weight).
- **Maximum EAS (VD/VNE line)**: exceed it and risk panel loss, **aileron reversal, divergence, flutter**; usually a **5–10% caution margin**.
- Lines are redrawn for higher altitudes (compressibility lowers CLmax). Extra **rolling-g limits**; **buffet corners** cut where high g and high weight combine.
- From the envelope: available load factor at any height and speed, basic and actual stall speeds, compressibility Mach, max load factor, max EAS/VNE.

### Aeroelastic problems (2-57)
- **Aileron reversal**: ailerons near the tips on a **flexible wing**; at high IAS a down-going aileron **twists the wing nose-down**, so the tip loses more lift than the aileron adds → roll the **opposite** way. Most likely with **fully powered controls**. Cures: **inboard ailerons** (or spoilers) at high speed, **stiffer wings**.
- **Divergence**: low torsional stiffness and the **CP ahead of the flexural axis** → lift twists the wing nose-up → more AoA → CP further forward → twist increases **until the wing breaks**. Nothing to do with control movement. Cures: **stiffer wing** (heavier), **mass balance** — engines mounted **ahead of and below** the wing — and shorter chord.
- **Flutter**: aerodynamic forces (gust, control input) couple with the **natural vibration** of the structure → rapid, growing oscillation and catastrophic failure. Caused by structural flexibility and high aerodynamic and inertial forces.
  - **Control-surface flutter**: control oscillation coupled with wing/tail bending and twisting — develops when the **control's CG is behind its hinge**.
  - **Torsional aileron flutter**: aileron down → wing twists, TE rises, lags, reverses… Cures: **mass-balance** the ailerons; **irreversible (powered) controls**.
  - **Flexural aileron flutter**: the wing **flaps** up and down (bending) instead of twisting. Cures: **mass balance**, **stiffer wings**.

### Exam traps
- LSS depends **only on temperature** (39√T). Constant-TAS climb → Mach **up**.
- **Mcrit**: first local **M 1.0**; more AoA/weight → **lower** Mcrit. Transonic **Mcrit–1.2**; hypersonic > 5.
- First shock forms on the **upper surface**; shock stall from separation behind it; CP at **≈ 50%** supersonic.
- Normal shock: no direction change, **subsonic** behind, big energy loss. Oblique: direction changes, may stay supersonic. Expansion: speeds up, no loss.
- Supersonic flow **accelerates in a divergent** duct.
- **Mach tuck** = CP back → nose-down → Mach trimmer. **Area rule** = waisted fuselage against interference/wave drag.
- Supercritical aerofoil: **flat top, blunt nose, aft camber**; weaker, later shock; lower low-speed CLmax.
- At high Mach: longitudinal stability **up**, lateral and directional **down**.
- Envelope: CLmax line = stall not overstress; **50%** structural margin; heavier → **lower g** allowed.
- **Aileron reversal** (wing twist, cure inboard ailerons); **divergence** (CP ahead of flexural axis, no control input); **flutter** (control CG behind hinge → **mass balance**).

---

## 9. Propellers

### Pitch and angles (2-58)
- **Blade angle (pitch)**: between the **blade chord and the plane of rotation**. Typical ranges: **feathered 85–90°**, in-flight (coarse) **20–35°**, flight idle (fine) **10–12°**, start locks **1–2°**, ground idle **0°**, **reverse −2° to −8°**.
- **Geometric pitch**: distance the propeller would advance in one revolution if it moved through the air at its blade angle like a screw in wood.
- **Effective pitch**: the distance it actually advances in one revolution. **Slip = geometric − effective pitch**; zero slip would be 100% efficiency.
- **Geometric mean pitch (GMP)**: advance per revolution when the blade **AoA is zero** (still some thrust from camber).
- **Experimental mean pitch (EMP)**: advance per revolution when producing **no thrust** (AoA below zero); **EMP is always greater than GMP**.
- **Helix angle**: between the **plane of rotation** and the **path of effective pitch** (each blade section follows a helix).
- **Blade angle of attack**: between the **chord and the relative airflow** (set by rotation + forward speed). **Blade angle = helix angle + AoA.**
- **Blade twist**: sections near the tip travel further per revolution, so the **blade angle is reduced towards the tip** to keep a constant geometric pitch and even thrust along the blade.
- **Torque**: the equal and opposite reaction to turning the propeller — a rolling moment about the longitudinal axis.
- **Propeller efficiency = thrust horsepower ÷ shaft horsepower** (THP/SHP).

### Fixed, variable and constant-speed propellers (2-59)
- **Fixed pitch**: AoA **rises when RPM rises or forward speed falls**; the blade angle is chosen for one condition (typically cruise). In a glide, higher windmilling RPM → more drag → less glide range.
- **Variable pitch**: a fixed fine blade at high speed (or a coarse one at low speed) works at a poor AoA and L/D, so pitch is varied: **fine pitch for take-off and initial acceleration**, **coarse pitch for high speed** (blade angle increases with airspeed), **reverse pitch** for reverse thrust on the landing roll. In a glide, **coarsening** reduces RPM and drag → more glide range.
- **Constant-speed unit (CSU)**: the pilot sets RPM; the CSU (flyweight governor) varies the blade angle between the fine and coarse stops to hold it. **Overspeed → blade angle increased** (more torque absorbed); **as TAS rises the blade angle rises** and the AoA stays roughly constant.

### Forces on a blade (2-59)
- **Centrifugal force**: stretches the blade outwards. **Torque bending force**: bends it against the direction of rotation. **Thrust bending force**: bends it **forward**.
- **Centrifugal twisting moment (CTM)**: centrifugal force on the LE and TE masses turns the blade about its pitch-change axis towards **fine pitch**.
- **Aerodynamic twisting moment (ATM)**: the blade CP lies **ahead of the pitch-change axis**, so lift turns the blade towards **coarse pitch**; more AoA → CP further forward → more ATM.
- **ATM > CTM in normal operation**. When **windmilling**, ATM reverses and **adds to CTM** (both towards fine).
- **Thrust**: the blade's total reaction is roughly at right angles to the chord; its forward component is **thrust**, its component in the plane of rotation is **rotational drag (torque)** — so a propeller is never 100% efficient.
- A **windmilling propeller** produces **more drag than a stopped (feathered) one**.

### Power absorption and solidity (2-60)
- The propeller must absorb all the engine's power, but **supersonic tips** greatly cut efficiency — limiting diameter, RPM and TAS.
- To absorb more power: **more blades** (higher **solidity**, though beyond about **6 blades** efficiency falls), **higher RPM** (tips below M 1), **wider chord**, **contra-rotating propellers**.
- **Solidity** at radius r = total blade chord ÷ circumference = **n c ÷ 2πr**.

### Propeller effects on the aircraft (2-60) — clockwise propeller seen from behind
- **Torque reaction**: the airframe is pushed **anticlockwise** → on take-off **more load on the left wheel**; in flight a tendency to **roll left**. Worst at **low speed, high power**. Cured by contra-rotating propellers.
- **Gyroscopic precession**: only when the aircraft **pitches or yaws**; worst at low speed, high power. Tail-wheel aircraft raising the tail on take-off → **yaw left**. In flight (book): a **left yaw → pitch up**, a **pitch up → yaw right**. Cured by contra-rotation.
- **Spiral slipstream**: the corkscrewing slipstream strikes the fin from the left → **yaw left** (and a roll right). Reduced by contra-rotation, a **fixed rudder tab**, a thrust line angled slightly right, or an **offset fin**.
- **Asymmetric blade effect (P-factor)**: at high AoA (take-off, slow flight) the **down-going blade** meets the air at a larger AoA and gives more thrust than the up-going blade → **yaw left**. Worst at low speed, high power, high AoA.

### Exam traps
- Blade angle: chord ↔ **plane of rotation**; AoA: chord ↔ **relative airflow**; helix angle: plane of rotation ↔ **effective path**.
- **Slip = geometric − effective pitch**. **EMP > GMP.**
- Blade angle **decreases towards the tip** (twist).
- Fine for take-off; coarse for cruise; CSU increases blade angle as TAS rises. Overspeed → **coarsen**.
- **CTM → fine; ATM → coarse**; ATM > CTM normally; windmilling ATM **adds** to CTM.
- Windmilling prop: **more drag** than feathered/stopped.
- Efficiency = **THP ÷ SHP**; > 6 blades → efficiency falls; tips must stay subsonic.
- Clockwise prop: torque → **roll left, left wheel loaded**; slipstream and P-factor → **yaw left**; tail-up → yaw left.

---

## 10. Airframe Structures, Hydraulics and Pneumatics

### Terms and loads (3-3)
- **Aircraft**: any device intended for flight in the air (gliders, aeroplanes, helicopters, balloons). **Aerofoil**: a structure made to produce lift by moving through air (wings, rotor blades, propellers). **Fuselage**: the body holding crew, cargo, passengers.
- **Stress** = force ÷ area. **Strain** = change in size ÷ original size (**no units**). **Stiffness (rigidity)** = stress ÷ strain (**Young's modulus**).
- **Elastic limit**: beyond it the body takes a **permanent set** and does not return to shape.
- **Tension** (stretches; load to pull apart ÷ area, psi), **compression** (crushes/shortens), **shear** (one layer sliding over another — rivets, bolts, screws).
- **Bending** = compression on top + tension underneath. **Torsion** = twisting (e.g. propeller drive). **Torsional strength** resists twisting.

### Load limits and design philosophies (3-3)
| Load | Value | Requirement |
|---|---|---|
| **Design limit load (DLL)** | max load expected in service | — |
| **Proof load** | **DLL × 1.125** | **no permanent deformation**; systems work normally |
| **Design ultimate load (DUL)** | **DLL × 1.5** | may deform but must **not collapse** |
| **Ultimate stress** | — | load at which the structure collapses |

- **Safe-life**: designed to last a fixed number of hours/cycles, then replaced; a crack means retirement. Inefficient (deterioration is hard to predict).
- **Fail-safe** (damage-tolerant): keeps adequate strength until the next planned inspection — **redundant load paths, crack-arrest features**; needs periodic inspections.

### Metal fatigue (3-4)
- Repeated loads **below the ultimate stress** cause cumulative damage and failure at a stress below the calculated ultimate — **fatigue**. Cracks start at **surface discontinuities** (rivet/screw holes, joints, sharp corners).
- An airliner's fatigue life is based on its **pressurisation cycles**, not landings. Composites are not fatigue-prone below about **80% of ultimate stress**.
- **Miner's rule**: cumulative damage from loads of different sizes: **n₁/N₁ + n₂/N₂ + … = 1 at failure** (n = cycles applied, N = cycles to failure at that stress, from the **S–N curve**). E.g. 80% of ultimate fails after ~**100** cycles; 20% needs ~**10 million**.
- Reduce fatigue: fewer roller landings, avoid turbulence, carry only the fuel needed, avoid tight high-g turns and close formation.
- **Stages**: crack **initiation** (joints, holes, corners) → **moderation** (corrosion worsens it) → **growth** (beyond about **1 mm** it depends mainly on stress level) → **final fracture** at the critical crack length.

### Airframe construction (3-5)
- **Wings**: **biplane** (old, < 200 kt), **braced** (external struts, e.g. Cessna), **cantilever** (internal spars carry all loads — all modern aircraft; mono-spar or multi-spar).
- **Spar**: main **spanwise** member — bending and torsion loads. **Stringers**: spanwise stiffeners of the skin (stop buckling). **Ribs**: chordwise members holding the shape and supporting the skin. **Torsion box**: front spar + rear spar + skins + ribs + stringers — resists bending and twisting (often the fuel tank).
- **Fuselage**: **truss** (welded tubes in triangles — light, unpressurised aircraft); **monocoque** (the **skin carries all loads**, light frames only — cannot tolerate dents); **semi-monocoque** (skin reinforced by longerons, stringers and frames — sturdier; standard).
- **Longeron**: main fore–aft member. **Stringer**: lighter longitudinal member. **Frames/formers**: circumferential; they resist **hoop stress**. **Bulkheads**: transverse walls.

### Hydraulics — principles (3-6)
- Used to move large, remote components: **undercarriage, flaps, brakes**, flying controls. Hydraulic fluid compresses only about **1%** (air in a pneumatic system ~99%).
- Wrong fluid → leaks, blocked filters, overheating, corrosion. **Milky fluid = aeration** — investigate.
- **Pressure = force ÷ area**; **force = pressure × area**. **Pascal's law**: pressure applied to a confined fluid is transmitted **equally in all directions**. **Bramah's press**: a small piston area under load generates high pressure; a large area under that pressure gives a large force (1 N on 1 cm² → 50 N on 50 cm²).
- **Open system**: simple, small aircraft; the engine-driven pump circulates fluid continuously; **one service at a time**.
- **Closed system — constant delivery**: pump output ∝ RPM whether needed or not; an **automatic cut-out valve** returns fluid to the reservoir at full pressure; an **accumulator** boosts pressure when low.
- **Closed system — constant pressure (variable volume)**: the pump varies its delivery to hold pressure; needs a pressure switch but **no accumulator**.
- **Advantages**: transmits high forces, rapid precise response, good power/weight, simple, reliable, **self-lubricating**. **Disadvantages**: contamination, heat and aeration; hazardous fluid; leaks; **heavier than pneumatics**.

### Hydraulic components (3-7)
- **Reservoir**: **pressurised to prevent cavitation** (and foaming); allows for leaks and thermal expansion. A **stack pipe** keeps a reserve: normal services draw from the stack pipe, the **emergency** service from the **bottom** of the reservoir.
- **Pump**; **actuators (jacks)**; **heat exchanger** (cools the fluid); **filters** in pressure and return lines with a differential-pressure "clogged" indicator.
- **Accumulator**: **stores fluid under pressure, damps pressure surges, allows thermal expansion, provides emergency pressure**.
- Valves: **shuttle valve** (book: lets fluid reach either side of a piston so it can move both ways; generally it selects between normal and alternate supply); **restrictor** (controls the rate of movement of a service); **automatic cut-out** (offloads the pump at full pressure); **non-return** (one-way); **pressure relief** (prevents overload).
- **Hydraulic fuse**: limits fluid loss if a line bursts (fitted upstream of non-essential services). **Hydraulic lock**: trapped fluid holds a piston stationary.
- **Ideal fluid**: incompressible, good lubricant, right viscosity, **high boiling point**, **non-flammable**, chemically inert, low evaporation, no sludge/foam, non-corrosive, cheap. **Synthetic fluid is blue; mineral fluid is red** (book).

### Pneumatic system (3-8)
- Works like hydraulics but with **air**, usually **bleed air** from the engine compressor. **LP and HP bleed ports**: the **HP valve opens at low RPM** when LP air is insufficient and **closes at high RPM**. Protected by **overheat and over-pressure** sensors.
- Uses: **air conditioning, pressurisation, wing and engine anti-icing, engine starting, thrust-reverser actuation, cargo heating, water-tank and hydraulic-reservoir pressurisation, LE/TE flap drive**.
- Parts: **compressor**, **ground charging valve**, **anti-freeze** (methanol vapour lowers the freezing point of moisture), **oil/water trap** at the **lowest point** with a drain at its bottom, **pressure relief valve**, **pressure regulating valve** (unloads the compressor at system pressure), **storage cylinder**. Used air is vented overboard (open loop).
- **Advantages**: non-flammable, light, air freely available, minor leaks harmless, no return lines/filtration needs. **Disadvantages**: **not precise or rapid**, **low working pressure**, **cannot handle high power** (air is compressible).

### Exam traps
- **Proof = 1.125 × DLL** (no permanent set); **ultimate = 1.5 × DLL** (no collapse).
- Strain has **no units**; stiffness = stress/strain.
- **Fail-safe** = redundant load paths + inspections; **safe-life** = fixed life then replace.
- Airliner fatigue counts **pressurisation cycles**. **Miner's rule: Σ n/N = 1**. Crack growth stage begins at ~**1 mm**.
- Spar = main spanwise; ribs = shape; stringers = stiffen skin; frames = hoop stress. **Monocoque: skin takes all loads.**
- Accumulator: store, damp, expand, emergency. Reservoir pressurised against **cavitation**. Emergency supply from the **reservoir bottom** (below the stack pipe).
- Constant-pressure pump: **no accumulator needed**. Open system: **one service at a time**.
- Fluid colours: **mineral red**, synthetic **blue**. Milky = air in it.
- Pneumatics: HP bleed at **low RPM**; water trap at the **lowest point**; methanol anti-freeze.

---

## 11. Landing Gear, Brakes, Tyres and Powered Controls

### Landing gear design and layout (3-9)
- Design depends on **role** (e.g. STOL), **runway length and type**, **cruise speed** (fixed gear = drag; retractable = weight), and **landing speed/weight** (strength).
- **Single main** (U-2): one main gear plus a small tail wheel on the centreline — simple, light, low drag.
- **Tail-dragger** (Dakota): mains **ahead of the CG**, tail wheel behind; simple, low drag, wing already at high AoA on the take-off roll; but **directional control problems** on take-off/landing and **poor forward view**.
- **Bicycle** (Sea Harrier): two mains on the centreline fore and aft of the CG plus **wing-tip outriggers**; for slim fuselages; light, low drag, tricky landings.
- **Tricycle**: the modern standard; the main gear carries about **90%** of the weight.
- **Quadricycle** (B-52): four mains like a car; floor close to the ground, but **sensitive to crosswind/roll** on take-off and landing.
- **Multi-bogie** (e.g. B-737 and larger): several wheels per leg — **safety if a tyre bursts**, spreads load; heavier aircraft have more bogies.
- **Retractable** gear folds into the airframe (hydraulically); the tail wheel, being low-drag, usually is not retracted. **Fixed** gear: stronger, simpler, lighter, but drag. Fixed types: **split axle**, **tripod** (legs spread to absorb load), **spring leaf** (chrome-vanadium/spring steel strap — simple, low maintenance), **single shock strut**.

### Shock absorbers (3-10)
- Damp landing and taxi shocks; designed **never to reach full extension or compression** in normal use (a bottomed strut becomes rigid and passes the impact into the structure). **Nose gear** often has a **two-stage** absorber.
- **Oleo-pneumatic**: **gas (air/nitrogen) absorbs the shock; oil through a restricting orifice/clack valve damps the rebound** (controls extension). In the static condition the weight is held by gas and oil pressure.
- **Oil-in-compression**: oil forced through damping orifices; above a set pressure a valve opens to a reserve chamber — soft for small loads, firm for hard landings.

### Brakes (3-11)
- **Drum brakes**: pads pressed against the drum. Drawbacks: vibration if the drum distorts, **water reduces effectiveness**, poor heat dissipation (small area), thermal expansion → more pedal travel, **grabbing** from rust.
- **Disc brakes**: more contact area, better heat dissipation; single or multiple discs and callipers. **Brake fade**: efficiency falls when **too hot**. **Brake drag**: wrongly adjusted or air in the system.
- **Anti-skid**: maximum braking without locking. Senses rapid wheel deceleration (flywheel inertia or electrical sensors) and **releases pressure** at the onset of a skid, then reapplies — **brake modulation**. Electrical systems improve braking ~**15%**. Usually **inoperative below ~20 kt**.
  - **Advantages**: shortest landing distance, less tyre wear, **touchdown protection** (no braking until the wheels spin up), **skid prevention**, **locked-wheel protection**.
- **Autobrakes**: automatic braking on landing and RTO; on landing applies the selected deceleration when thrust levers are closed (book: < 85 kt for maximum); **disengage below 20 kt**, on anti-skid failure, or if thrust levers are advanced (go-around) or the pilot brakes.

### Tyres (3-12)
- Inflated with **nitrogen**. Reduce wear by taxiing below **22 kt (40 km/h)**. **Scrubbing**: turning tighter than the minimum radius. Tyre pressure can rise ~**10%** when hot after taxi.
- **Over-inflation → centre wear**; **under-inflation → shoulder wear**, overheating, a major cause of **tyre failure**.
- **Tubeless tyres**: hold pressure longer, no rapid loss on puncture, more impact-resistant, **~7.5% lighter**, **no creep damage**.
- Pressures: **low 25–35, medium 35–70, high 70–90, extra-high > 90 psi**.
- Markings: **ply rating** = strength (not number of plies); **speed rating** = max ground speed (kt); **red dot/triangle = lightest point** (align with valve); **green/grey dots = vent holes**.
- **Creep**: the tyre slowly rotates on the rim — can tear a tube's valve; most likely on **new tyres** or with **low pressure**; checked by **paint marks** on tyre and rim; tubeless tyres are not affected.
- **Fusible plugs** in the wheel melt after heavy braking and **deflate the tyre in a controlled way** (no blow-out).
- Wheels: aluminium or magnesium alloy.

### Nose-wheel control and shimmy (3-13)
- **Castoring** (free to turn with differential braking/aerodynamic forces); **centering** mechanism before retraction; **steering** by hydraulics or tiller.
- **Shimmy**: rapid side-to-side oscillation of the nose wheel from sidewall flexibility; also a sign of a **broken torque link**. Reduced by **twin nose wheels** or **Marstrand (twin-contact) tyres**; shimmy dampers.

### Aquaplaning (3-13)
- The tyre rides on a water film instead of the runway. Hydrodynamic pressure rises with the **square of speed**; when it equals tyre pressure the tyre lifts. Once started it can persist to a **much lower speed**. Anti-skid helps.
- **Dynamic** (standing water lifts the tyre), **viscous** (thin film on a smooth/rubbered surface), **reverted rubber** (a locked wheel's heat melts rubber and makes steam).
- **Higher tyre pressure → higher aquaplaning speed**; deeper water, worn tread, higher speed → more risk; new deep tread less.
- **Minimum aquaplaning speed ≈ 9 √P (psi) kt** (rotating tyre, take-off); about **7.7 √P** for a non-rotating tyre on landing (book). (34 √P with P in kg/cm².)
- Braking coefficient: **> 0.40 good**; 0.39–0.36 medium–good; 0.35–0.30 medium; 0.29–0.26 medium–poor; **≤ 0.25 poor**.

### Flight-control systems (3-14)
- **Manual**: cables and pulleys. **Primary stops** set the range; **secondary stops** back them up; **fairleads** guide cables clear of structure; **tension** gives positive action both ways, removes backlash, and is **temperature-compensated**. Inspect tension, locking, range, temperature compensation — always a **duplicate inspection** by another person. Cables are light, strong, damage-tolerant, compact.
- **Aerodynamically assisted**: tabs and balances (chapter 6).
- **Power-assisted**: hydraulics supply **part** of the force; the pilot keeps **natural feel (∝ IAS²)**; the controls remain **reversible**.
- **Fully powered / fly-by-wire**: hydraulics supply **all** the force; transducers send stick movement as electrical signals to computers. Air loads cannot move the stick — **irreversible** — so **artificial feel** is needed. Typical Airbus-type set: **2 ELAC** (elevator/aileron computers), **3 SEC** (spoiler/elevator), **2 FAC** (rudder/yaw damping).

### Powered-control components and requirements (3-15)
- **Hydraulic actuator** moves the surface. **Artificial feel units**: **spring feel** (simple, not speed-related — pilot could overstress at high speed); **Q-feel** (pitot and static pressure on a piston → feel ∝ dynamic pressure); **hydraulic Q-feel** (smaller; Mach-compensated); **electric Q-feel**; **g-feel** (bob-weights/springs — feel ∝ g, independent of speed; fighters; suffers inertia/turbulence errors).
- Requirements: adequate **performance** (else **jack stall** — actuators cannot overcome air loads), **feedback** (compare commanded and actual deflection; synthesised Q-feel; stall warning/stick shaker), **accuracy, stability, irreversibility** (no buffet or flutter fed back), **sensitivity**.
- **Take-off configuration warning** (thrust levers to take-off power) if: **stabiliser trim outside the take-off band**, **flaps/slats not in take-off position**, **speed brake not down**, **doors not locked**, **controls locked**.

### Exam traps
- Tricycle mains carry **~90%**. Tail-dragger mains **ahead of CG** → ground-loop risk. Quadricycle: crosswind-sensitive.
- Oleo: **gas absorbs, oil damps**. Never fully extended or compressed in use.
- Anti-skid off below **~20 kt**; electrical gives ~**15%** better braking; touchdown and locked-wheel protection.
- Over-inflation wears the **centre**; under-inflation the **shoulders** (main cause of failure). **Red dot = light spot.** Ply rating = **strength**.
- Tubeless: ~**7.5%** lighter, **no creep**. Fusible plugs: **controlled deflation** after hot brakes.
- Shimmy → **broken torque link**; twin nose wheels/Marstrand tyres.
- Aquaplaning ≈ **9√P** kt; higher pressure → higher aquaplaning speed; persists to lower speed once started.
- Power-assisted = **reversible**, natural feel; fully powered = **irreversible**, needs **artificial feel** (Q-feel ∝ ½ρV²). **Jack stall**: actuator can't beat air loads.

---

## 12. Air Conditioning, Pressurisation and Ice Protection

### Air conditioning (3-16)
- Regulates **temperature 18–24 °C**, **humidity ~30%**, **quantity ~10 cu ft/min per crew member**, **quality — CO no more than 1 : 20,000**.
- Parts: **bleed air (HP/LP valves)**, **temperature control unit**, **heat exchanger** (pre-cools bleed air with ram air), **water separator**, **cold air unit (compressor + turbine)**, distribution ducting, **ram-air valves** (fresh air direct from outside), **humidifier** (at high altitude air is very dry).
- **Turbo-compressor** (older; when HP bleed is not available): LP bleed is ram-air pre-cooled, **compressed** by a compressor (driven by the cold-air-unit turbine), cooled again, then **expanded through the turbine**, which extracts work → temperature drops. Water separator, then temperature control valve mixes hot and cold air.
- **Bootstrap / brake turbine** (HP bleed available): pre-cooled HP air expands through the turbine; a compressor on the same shaft acts as a **brake** on the turbine. Lighter, better mass flow, but **cannot cool on the ground** (needs ram air).
- **Turbo-fan**: refinement — the turbine drives a **fan** that draws cooling air through the heat exchanger, so it **works on the ground** too.
- Principle: **air cools when it does work expanding through a turbine**.

### Pressurisation (3-17)
- Airframe fatigue life is set by the number of **pressurisation cycles**. Airflow: about **1.5 kg/min per passenger** (50% fresh, 50% recirculated); a fighter cockpit about 5 kg/min (80% to the pilot, 20% demisting).
- **Pressurised**: cockpit, cabin, forward and aft cargo holds. **Unpressurised**: radome, nose and main gear bays, centre-section torque box, tail cone.
- Schedules: **hyperbaric** (sea-level cabin to the ceiling); **isobaric** (holds **8000 ft** cabin — airliners); **hypobaric** (holds ~**25,000 ft** — fighters, to limit the effects of rapid decompression after damage).
- Cockpit instruments: **cabin altimeter, cabin VSI (rate of climb), cabin differential-pressure gauge**.
- **Max cabin altitude 8000 ft** (best compromise with hoop stress); max cabin rate of change **1500 ft/min** (normally 300–500 fpm); **aural and visual warning above 10,000 ft cabin altitude**. Higher cabin altitude → less differential.
- Control: **constant mass flow in, vary the outflow**. **Outflow valve**: closing it raises the differential; has a **thrust-recovery nozzle**.
- **Safety (outward) relief valve**: opens if the positive differential exceeds its maximum (the scan reads "+25 psi", which looks garbled — airliner maximum differentials are typically around 8–9 psi). **Inward relief (negative pressure) valve**: opens at about **−0.5 to −1 psi** (cabin lower than outside, e.g. fast descent). Valves duplicated and fitted **above the flotation line**.
- **Dump valve**: manual, emergency depressurisation. **Blow-out valve/panels**: between cabin and cargo, preventing a big pressure difference (e.g. cargo door loss). **Ditching cocks**: close the outflow valves for ditching.
- Operation: on the taxi **GROUND/FLIGHT → FLIGHT**: **pre-pressurise to ~0.1 psi** (no surge at rotation, no fume ingress). Climb: cabin climbs in proportion (300–500 fpm). Cruise: constant differential, **inflow = outflow**, outflow valve partly open; small altitude changes (±500 ft) ignored. Descent: cabin descends similarly; **~0.1 psi at touchdown**; on the ground the outflow valve opens fully.

### Ice and rain protection (3-18)
- Required for any aircraft expected to fly in icing. **Frost** alone can stop an aircraft getting airborne or stall it just after take-off (lower CL).
- **Anti-icing**: **prevents** ice forming (heat or fluid). **De-icing**: lets ice build, then **removes** it (heat, fluid or mechanically).
- **Ground de-icing**: **Type II fluid** is thicker than Type I and stays on longer (holdover); fluid heated (book: ~60 °C). APU may run but **bleed air OFF** (fumes).
- **Ice detectors**: **accretion** types — **Teddington** (visible probe), **Smith's** (holes in a tube blocked by ice → pressure change); **mechanical** — **Napier** (motor-driven blade; more torque needed as ice builds), **Rosemount** (**vibrating rod** — frequency falls as ice accretes).
- **Pneumatic boots** (wing LE): rubber boots inflated/deflated cyclically by bleed air to **crack ice off**; held flat by **vacuum/venturi suction** when off. A **de-icing** system.
- **Propeller electrical de-icing**: elements on the **inner third** of the blades; high current, so a **timer** cycles the propellers one at a time; use only with **propellers turning**.
- **Fluid de-icing** (TKS-type): fluid lowers the freezing point; LE panels, **slinger ring** for propellers; works best at **low speed**.
- **Hot bleed air** (or hot oil): **anti-icing** of engine intakes, wing LE, slats.
- **Windscreen**: **electric heating** of a conductive inner layer — heated gradually (no thermal shock), keeps the glass **elastic and impact-resistant** (bird strike).

### Exam traps
- Cabin temperature **18–24 °C**, humidity **30%**, CO ≤ **1:20,000**.
- **Air cools by expanding through a turbine doing work.** Bootstrap (brake turbine) **can't cool on the ground**; turbo-fan can.
- Isobaric **8000 ft** (airliners); hypobaric **25,000 ft** (fighters). Warning at **10,000 ft** cabin. Max cabin rate **1500 fpm**.
- Pressurisation: **constant inflow, variable outflow**; outflow valve closes → differential up.
- Inward relief at **−0.5 to −1 psi**; valves above the **flotation line**; pre-pressurise **0.1 psi**.
- **Anti-ice prevents; de-ice removes.** Boots = de-ice; hot bleed = anti-ice. Rosemount = vibrating rod.
- Prop de-ice: **inner third**, timer cycling, only with props turning.

---

## 13. Composites, Fuel, Fuel Systems and Emergency Equipment

### Composite materials (3-19)
- A composite = **fibre** in a **matrix (resin)**; the matrix binds the fibres and **transfers the loads onto them**. Saves weight, adds strength; properties **differ with direction** (anisotropic).
- Fibre orientation: **unidirectional, multidirectional, woven, braided, stitched**. **Balanced laminate**: same fibre orientation in each layer. **Symmetrical laminate**: the upper half of the lay-up mirrors the lower half.
- Types: **fibre** (e.g. GRP — glass, carbon, boron fibres in resin), **laminar** (layers, e.g. plywood), **particulate** (particles in a matrix, e.g. concrete), **hybrid**.
- **Advantages**: weight saving, **corrosion resistance**, durable, good friction/wear, dent resistance, **low thermal expansion**, **directional (aero-elastic) tailoring**. **Disadvantages**: **absorb moisture**, **poorer lightning resistance**, thermal fatigue, **lower impact resistance**, **higher cost**.
- **Aero-elastic tailoring**: choose the fibre angle in each ply so the structure twists the way you want under load — cures **divergence** of forward-swept wings, reduces CP movement and flutter.

### Fuel (3-20)
- Changing fuel type changes the engine's **specific-gravity setting** (fuel-flow adjustment). **Boiling point falls with altitude**.
- **Compensated capacitance gauges** read correct **mass** whatever the density; capacitance gauges also compensate for attitude.
- **Waxing**: heavy hydrocarbons solidify at low temperature. **Vapour lock**: fuel boils at altitude (lower boiling point) and vapour blocks the lines. **Foggy/cloudy fuel = water contamination.**
- **Octane rating**: resistance to **detonation**. Reference fuels: **iso-octane = 100** (no detonation tendency), **normal heptane = 0** (detonates readily). Rating 95 = behaves like 95% iso-octane + 5% heptane.
- **Ideal fuel**: flows in all conditions, low fire hazard, **high calorific value**, burns completely, low sulphur, easy starting, non-corrosive, lubricates.
- **Additives**: **FSII** (fuel-system icing inhibitor), **HITEC** (lubricity), **static dissipators**, corrosion and **fungal/microbial** inhibitors.

| Fuel | Colour / type | Key figures |
|---|---|---|
| **MOGAS** | motor petrol | very volatile — carburettor icing, vapour lock |
| **AVGAS 80** | **red** | anti-knock 80 |
| **AVGAS 100** | **green** | anti-knock 100 |
| **AVGAS 100LL** | **blue** (low lead) | — |
| **Jet A-1 (AVTUR)** | **clear/straw** kerosene | SG **0.8** at 15 °C; flash point **38 °C**; freezing (wax) **−47/−50 °C** (book −50) |
| **Jet A** | kerosene | wax point **−40 °C** |
| **Jet B (AVTAG)** | wide-cut (kerosene + gasoline) | SG **0.77**; flash **−20 °C**; wax **−60 °C** |

### Aircraft fuel system (3-21)
- From the tanks to the **engine HP fuel pump**. **Tanks**: internal (rigid or flexible bag, often in the wings) or external (pylon/drop tanks).
- **Vent system**: relieves expansion and keeps tanks at atmospheric pressure — at least **2% of tank volume** as expansion space.
- **Booster pumps**: **centrifugal LP pumps** at the **bottom** of the tanks (submerged — cooled by fuel); feed the engines and jettison; **prevent vapour lock and HP-pump cavitation**.
- **Feeder/collector tanks** (gravity feed), **cross-feed** (any tank to any engine), **LP shut-off valve** at the **firewall**, **baffles** (stop fuel surging), quantity transmitters, drains (water sampling on the ground), relief valves, filters.
- **Fuel jettison (dump)**: after dumping the aircraft must still be able to **climb to 10,000 ft and fly 45 min** (book).

### Emergency equipment (3-22)
| Item | Requirement (book) |
|---|---|
| First-aid kits | 1 for 0–99 pax, +1 per further 100 |
| Megaphones (loud hailers) | 1 for 61–99 pax; 2 for > 99 |
| Torches | at each floor-level exit and crew station; LED flashes every 4 s |
| Life jackets | for everyone beyond **50 nm** from land |
| Life rafts | beyond **120 min or 400 nm** from land |
| Survival kit | remote areas (polar, desert) |
| Break-in markings | aircraft **> 3600 kg** AUW |
| Emergency lighting | > 9 pax; ≥ **30 min** from the essential bus |
| Crash axe | AUW > 5700 kg or > 9 pax; +1 aft if > 200 pax |
| ELT | 1; **2 if > 19 pax**, one automatic; works **48 h** |
| Cabin fire extinguishers | 7–30 pax: 1; 31–60: 2; 61–200: 3; 201–300: 4; 301–400: 5; 401–500: 6 … plus ≥ 1 on the flight deck |

- Engine fire extinguishant: **Freon** (halon family). **Nomex gloves** carried. Toilet bin extinguishers fire automatically on heat.
- **Oxygen**: **normal (diluter-demand)** mode — oxygen/air ratio rises with altitude, **100% by 34,000 ft**; **emergency** mode — 100% under positive pressure regardless of altitude. **Pressure-demand** (crew, regulator) vs **continuous-flow** (passengers, no regulator). Masks drop automatically above **14,000 ft cabin**. **Chemical generators ~15 min.** Portable bottles charged to **1800 psi**, ~15 min. Leak test with **acid-free soap and distilled water**; thread lubrication with **graphite** (never oil/grease near oxygen).
- **Smoke detectors** (toilets, cargo, avionics bays): light obscuration, light refraction/scatter, **ionisation**, semiconductor resistance change.
- **Fire detectors**: **melting link** (old), **differential expansion**, **continuous loop** (a conductor whose resistance falls as it heats — **negative temperature coefficient** — so current rises and triggers the warning).

### Exam traps
- Matrix transfers load to the fibres. Composites: **moisture, lightning, impact** weaknesses; aero-elastic tailoring cures **divergence**.
- Octane: **iso-octane 100, heptane 0**.
- Colours: **AVGAS 80 red, 100 green, 100LL blue, Jet A-1 clear/straw**.
- Jet A-1: SG **0.8**, flash **38 °C**, wax ≈ **−47/−50 °C**; Jet B wide-cut: flash **−20 °C**.
- Vapour lock worsens with **altitude** (lower boiling point); booster pumps prevent it.
- Vent space **2%**; LP cock at the **firewall**; baffles stop surge.
- Life jackets **50 nm**; rafts **120 min/400 nm**; ELT **2 if > 19 pax**; emergency lights **30 min**.
- Oxygen masks drop at **14,000 ft**; diluter-demand gives **100% at 34,000 ft**; no oil or grease on oxygen fittings.

---

## 14. Piston Engines

### Parts and definitions (4-3)
- **Cylinder** (aluminium alloy; combustion up to ~2000 °C), **cylinder head** (valves, spark plugs), **piston** (passes the combustion force to the crankshaft), **piston rings** (gas seal), **connecting rod** (turns reciprocating into rotary motion), **crankshaft**, **crankcase** (holds oil in a wet-sump engine), **inlet/exhaust valves**, **spark plugs**, **camshaft** (opens/closes the valves at the right time).
- **TDC/BDC**: top/bottom dead centre. **Stroke**: TDC to BDC. **Bore**: cylinder internal diameter.
- **Swept volume**: between TDC and BDC. **Clearance volume**: above the piston at TDC. **Total volume** = swept + clearance.
- **Compression ratio = (swept + clearance) ÷ clearance volume**.
- **Charge**: the air–fuel mixture drawn in. **CHT**: temperature of the hottest cylinder head. **MAP**: manifold absolute pressure.
- **Rated power**: continuous power. **Rated altitude**: highest altitude at which sea-level power can be kept.
- **IHP** (indicated, inside the cylinder) = **P L A N n ÷ 33,000** (P mean effective pressure psi, L stroke ft, A piston area in², N power strokes/min, n cylinders). **BHP = IHP − friction**. **THP = BHP × propeller efficiency**.
- **Mechanical efficiency = BHP ÷ IHP**. **Volumetric efficiency** = actual charge ÷ theoretical charge (swept volume at ambient) × 100. **Thermal efficiency** = useful work ÷ heat in fuel × 100.
- A piston engine is only about **28% efficient**: ~**40%** of the energy leaves in the exhaust, ~**32%** as engine heat.

### Petrol vs diesel; two- vs four-stroke (4-4)
- **Petrol (Otto) cycle**: compression ratio limited to about **10 : 1** (beyond that the hot charge self-ignites → detonation). Spark at TDC; combustion so fast that pressure peaks before the piston moves: **constant-volume cycle**. **MPFI** (multi-point fuel injection) compresses only air and injects petrol — no carburettor, still a spark plug.
- **Diesel cycle**: no carburettor or spark plug — only **air** is compressed (no detonation risk) to about **22 : 1**; fuel injected at TDC ignites from the heat of compression; burns as the piston descends: **constant-pressure cycle**. More thermally efficient but **heavier**, needs a bigger starter, more vibration — hence rarely used in aviation. **CRDI** = common-rail injection.
- **Two-stroke**: one power stroke per crank revolution (360°); intake during compression, exhaust during power; simple and powerful for its size but **poorer efficiency, vibration, noise** — not used in aviation.
- **Four-stroke**: one power stroke per **two revolutions (720°)**; three strokes absorb power, one delivers it.

### The four strokes (4-5)
- **Intake**: piston descends, charge drawn in. **Compression**: pressure and temperature rise. **Combustion**: spark (slightly **before TDC**) → pressure peak at constant volume. **Power (expansion)**: gas pushes the piston; pressure and temperature fall; exhaust valve opens near the end. **Exhaust**: spent gas expelled.
- **Ineffective crank angle**: near TDC and BDC the piston barely moves — used for valve timing.
- **Valve timing**: valves open and close away from TDC/BDC to use gas momentum. **Valve lead** (inlet opens **before TDC**), **valve lag** (inlet closes **after BDC** — the moving charge keeps filling the cylinder), exhaust opens **before BDC** and closes **after TDC**. **Valve overlap**: around TDC **both valves open**; the departing exhaust helps draw in fresh charge → **higher volumetric efficiency**. Ignition is advanced so the pressure peak falls early in the power stroke.

### Cooling (4-6)
- **Too hot**: pre-ignition, knocking, structural failure. **Too cold**: more friction (poor lubrication), lower thermal efficiency.
- **Air-cooled** (fins + ram air, baffles): depends on fin area, airflow and air temperature. **Liquid-cooled**: coolant through cylinder jackets to a radiator; faster flight, better cooling.

### Supercharging and turbocharging (4-6)
- A **normally aspirated** engine loses power with height (density at **30,000 ft ≈ ⅓**, at **40,000 ft ≈ ¼** of sea level). A super- or turbocharger **compresses the intake air** → raises the service ceiling and high-altitude power.
- **Supercharger**: driven by the **crankshaft** (gears). **Turbocharger**: driven by an **exhaust-gas turbine**.
- **Diffuser** after the impeller: velocity ↓, pressure ↑. **Intercooler** before the inlet: cools the compressed air → denser charge, **less detonation risk**.
- **Waste gate**: controls how much exhaust drives the turbo turbine. **Fully open** for a sea-level take-off (exhaust bypasses the turbine), closed progressively as altitude increases to hold manifold pressure.
- **Boost**: inlet manifold pressure relative to sea-level pressure. **Full-throttle height**: highest altitude at which a given boost can be held at a given RPM.

| Supercharger | Turbocharger |
|---|---|
| driven by the **crankshaft** | driven by **exhaust gas** |
| compressor only | compressor + turbine |
| between carburettor and engine — compresses **mixture** | before the carburettor — compresses **air** |
| speed set by engine RPM | speed set by **waste-gate** position |

### Mixture and carburettor (4-7)
- Air : fuel by weight — **rich ≈ 8 : 1**, **chemically correct ≈ 15 : 1**, **lean ≈ 20 : 1**.
- **Rich**: more fuel burnt, **less endurance**, **cooler CHT**, **less detonation** — **take-off and climb**. **Lean**: **more endurance**, hotter CHT, less power, **more detonation risk** — **cruise**.
- **Carburettor**: a **float chamber** holds fuel at constant pressure; the **venturi** low pressure draws and atomises fuel according to airflow set by the **throttle (butterfly) valve**.
- **Carburettor icing**: fuel evaporation plus the venturi pressure drop can cool the air at the throttle by up to **22 °C**; possible with OAT between **+30 °C and −10 °C**, and at low power (glide). Signs: **fixed-pitch prop — RPM drop**; **constant-speed prop — MAP drop, RPM unchanged**. Use carburettor heat. A **fuel-injected** engine has no carburettor ice.

### Ignition (4-7)
- **Dual ignition** (two plugs per cylinder, two magnetos): redundancy and better burning. Ignition is **advanced as RPM rises**. Long low-RPM running fouls plugs with carbon.
- **Magneto**: a self-contained engine-driven generator producing the high voltage for the plugs (book: ~22,000 V) — **independent of the aircraft battery**, stronger spark at high RPM. The ignition switch is in the **primary circuit** (switch OFF grounds the primary).
- **Magneto check**: switch off one magneto at a time — **RPM should drop slightly but the engine keep running**.

### Detonation and pre-ignition (4-8)
- **Detonation (knocking)**: the remaining charge **explodes** instead of burning smoothly after ignition. Causes: **lean mixture**, **high charge temperature**, wrong ignition timing, **low-octane fuel**, high RPM/high combustion pressure, cylinder design. Effects: piston-crown damage, overheating, power loss. **Tetra-ethyl lead** suppresses it.
- **Pre-ignition**: the charge ignites **before the spark**, from **hot spots or glowing carbon**.
- Cylinder layouts: **inline, opposed, V, W, radial**. Power strokes are staggered for smoothness: a 4-cylinder firing order **1-3-4-2**.
- Limitations: low power especially at height, ~28% efficiency, speed limited by propeller tip speed.

### Exam traps
- **CR = (swept + clearance) ÷ clearance.** Petrol ~**10:1**, diesel ~**22:1**.
- Otto = **constant volume**; diesel and gas turbine = **constant pressure**.
- Four-stroke: **720°** per cycle; two-stroke 360°.
- BHP = IHP − friction; THP = BHP × η(prop). Piston engine ≈ **28%** efficient.
- **Valve overlap** around TDC, both open → better volumetric efficiency.
- Turbo: exhaust-driven, **waste gate open at sea level**, closes with height. Intercooler reduces detonation.
- Rich **8:1** (cool, take-off), lean **20:1** (hot, cruise, detonation risk); correct **15:1**.
- Carb ice: up to **22 °C** drop; **+30 to −10 °C**; fixed pitch → RPM drop; CSU → **MAP** drop.
- Magneto is **independent of the battery**; mag check: small drop, engine keeps running.
- Detonation = explosion after the spark (lean, hot, low octane); **pre-ignition = before the spark** (hot spots).

---

## 15. Gas Turbine Theory, Turbojets, Turbofans and Turboprops

### Gas turbine principles (4-9)
- A **heat engine** using air as the working fluid to produce thrust by **Newton's third law**. Same four processes as a piston engine — induction, compression, combustion, exhaust — but **continuous and simultaneous**, with combustion at **constant pressure**: the **Brayton (constant-pressure) cycle**.
- Advantages over piston engines: handles **far more air and energy**, **rotary and smooth**, **continuous power** (no idle strokes).
- **Ideal cycle**: 1–2 frictionless **adiabatic compression**; 2–3 **constant-pressure heating**; 3–4 adiabatic **expansion**; 4–1 constant-pressure heat rejection.
- **Actual (Brayton) cycle**: compression and expansion **with friction**; combustion with some **pressure loss**. Work from the turbine is less and work absorbed by the compressor more, so actual efficiency is only about **50% of the ideal**.
- Raising the **compressor delivery pressure and temperature** raises cycle efficiency — limited by **turbine entry temperature** and turbine materials. More entropy → less energy extractable. Cycle efficiency = heat converted to work ÷ heat supplied (area of the cycle on P–V/T–S diagrams = net work).

### Pressure, temperature and velocity through the engine (4-10)
- **Highest pressure: compressor outlet / combustion-chamber inlet.** **Highest temperature: combustion-chamber outlet** — the **nozzle guide vanes** ahead of the turbine are the **hottest part**. Velocity is raised again in the exhaust nozzle.
- **EPR (engine pressure ratio) = LP turbine outlet (exhaust) pressure ÷ LP compressor inlet pressure** — a thrust indication. **EGT** measured at the **LP turbine outlet**.
- **Bleed air ON → EGT up, EPR down** (less air for the same fuel/thrust).

### Turbojet (4-11)
- Invented by **Sir Frank Whittle** (RAF, 1930). Gives a **large acceleration to a small mass of air**.
- Thrust comes from pressure and momentum changes in the gas; the excess of forward over rearward forces on the components is the **rated thrust**.
- **Momentum thrust = ṁ (Vj − Va)**; **pressure thrust = A (Pj − P₀)** when the nozzle is **choked**; **total thrust = ṁ (Vj − Va) + A (Pj − P₀)**.
- **Thrust is greatest at the start of the take-off run** and falls as speed rises (Vj − Va shrinks) — then **recovers above ~500 kt** through **ram compression** (more mass flow).
- **Altitude**: lower density and pressure → less thrust, partly offset by lower temperature; above the tropopause (constant temperature) thrust falls faster. **Temperature up → density down → thrust down.** Piston engines are more affected by density than jets.
- **Afterburning** (reheat) adds fuel to the exhaust → more jet velocity; large thrust gain (book: up to ~80%) at very high fuel flow.
- **Efficiencies**: **thermal** = KE added to the gas ÷ fuel energy; **propulsive** = useful work on the aircraft (thrust × Va) ÷ KE added = **2Va ÷ (Vj + Va)**; **overall = thermal × propulsive**.
- **Flat rating**: on cold days the engine could make too much thrust and overstress the compressor, so thrust is capped up to a set temperature — longer engine life.

### Turbofan (bypass engine) (4-12)
- A **fan** ahead of the compressor moves a large mass of air at **lower speed** round the core (bypass); only the core flow is burnt. Most of the thrust comes from the **bypass air**, which also cools and quietens the exhaust.
- **Bypass ratio = cold (bypass) mass flow ÷ hot (core) mass flow**. **Low bypass < 1.5** (bypass air rejoins the core exhaust); **high bypass > 1.5** (fan air exhausts separately).
- **Thrust = ṁ_fan (V_fan − Va) + ṁ_core (V_core − Va).**
- **Why more efficient**: KE lost in the exhaust is ½ ṁ (Vj − Va)²; for the same thrust, **more mass at lower jet velocity wastes less energy** → higher propulsive efficiency at no extra fuel.
- **Advantages**: better take-off thrust and **SFC**, better efficiency at lower speeds (but big frontal area adds drag at high speed), thrust falls less quickly with speed than a turboprop's, **20–25% (dB) quieter**, debris tends to be flung into the **bypass duct** (less core FOD damage).

### Turboprop and turboshaft (4-13)
- The turbine extracts most of the energy to **drive a propeller** through a **reduction gearbox**; little residual jet thrust. **Small acceleration to a large mass of air.** More efficient than jets **below about 350 kt** and at low altitude.
- **Maximum thrust when stationary**; as speed rises propeller AoA and thrust fall; propeller tips approaching M 1 limit speed.
- **Turboshaft**: all useful energy to a shaft (helicopters, hovercraft, APUs), negligible jet thrust, any mounting orientation.
- **ESHP (equivalent shaft horsepower) = SHP + jet-thrust equivalent.** Good power/weight and fatigue life.
- **Speed**: more ram → more mass flow → better SFC, but propeller efficiency falls above ~350 kt. **Altitude**: less density → less SHP and thrust, slightly offset by colder air.
- **Direct-drive (fixed-shaft)**: the same turbine drives compressor and propeller (via reduction gear). **Free turbine**: the gas generator feeds a **separate power turbine** on the propeller shaft — **easy starting** (no propeller drag on the starter), each shaft runs at its best speed; most turboshafts. **Compound**: two-spool, propeller on the **LP spool**.

### Turboprop control (4-14)
- Turboprops run at **high, nearly constant RPM** for efficiency.
- **Integrated RPM and fuel control** (compound engines): the power lever raises RPM and fuel together; the CSU absorbs the power with pitch.
- **Alpha mode** (direct fuel control; free-turbine engines): **power lever sets fuel flow**; the **CSU holds RPM** by changing blade angle — normal flight.
- **Beta mode** (direct blade-angle control; ground/taxi, reverse): **power lever sets blade angle**; the governor adjusts **fuel** to hold RPM.
- **Synchronising**: all propellers at exactly the same RPM — removes beat noise. **Synchrophasing**: also holds a set **phase angle** between adjacent propellers' blades (sensed by pick-ups) — further cuts noise and vibration.
- **Propulsive efficiency by speed**: turboprop best up to ~**350 kt**, then high-bypass turbofan, low-bypass, and the pure turbojet at the highest speeds.

### Exam traps
- Gas turbine = **Brayton, constant pressure**; actual ≈ **50%** of ideal efficiency.
- **Highest pressure: combustion inlet; highest temperature: combustion outlet; hottest part: NGVs.** EGT at **LP turbine outlet**. Bleed on → EGT ↑, EPR ↓.
- Thrust = **ṁ(Vj − Va) + A(Pj − P₀)**; maximum at the **start of the take-off roll**; recovers above ~500 kt (ram).
- Propulsive efficiency = **2Va ÷ (Vj + Va)** → large mass, low velocity is efficient.
- Bypass ratio = **bypass ÷ core**; low < 1.5, high > 1.5. Turbofan: quieter by 20–25%, better SFC.
- Turboprop best below **350 kt**; max thrust **stationary**. Free turbine: **easy start**.
- **Alpha: lever → fuel, CSU → RPM. Beta: lever → blade angle, governor → fuel.**
- Synchronise = same RPM; **synchrophase** = same RPM **plus** set blade phase.

---

## 16. Intakes, Compressors, Combustion Chambers and Turbines

### Intakes (4-15)
- An ideal intake supplies the **right amount of air at the right speed** at every Mach number, altitude and throttle setting; distributes it **evenly** over the compressor face; has **low external drag**; and has **minimum pressure loss** (losses come from flow separation at the walls and duct friction). It also gives initial compression by **ram effect**.
- **Ram effect**: thrust ∝ mass of air, so raising intake pressure raises thrust. Ram compression grows with speed; at **M 1** it roughly equals the compressor's, above M 1 it exceeds it.
- **Ram-pressure recovery**: on the ground the fast intake flow makes intake pressure **below ambient**; as the aircraft accelerates ram raises it; the point where intake pressure = ambient is ram-pressure recovery.
- **Subsonic (pitot) intake**: a **divergent duct** slows the air and raises static pressure; **thick, rounded lips** stop separation.
  - **Critical** (A₀/A₁ = 1): intake delivers exactly what the engine wants — should occur at **cruise**.
  - **Sub-critical** (A₀/A₁ < 1): engine wants less → **spillage** at the lip, extra drag (high speed, low RPM).
  - **Super-critical** (A₀/A₁ > 1): engine wants more → suction, **separation and air starvation** (low speed, high RPM — take-off); cured by **auxiliary intake doors**.
- **Supersonic intakes** must work subsonic, transonic and supersonic and deliver about **M 0.5** at the compressor face with little loss — by a series of shocks: **oblique shocks (small losses)** then a final **normal shock (large loss)**.
  - Critical: shock on the lip. Sub-critical: shock pushed forward, spillage; severe → **intake buzz** (shock rapidly swallowed and expelled). Super-critical: normal shock **inside** the intake — no shock drag, some instability; preferred to sub-critical.
- **Intake designs**: **pitot** (simple, single normal shock at the lip; good to ~M 1.5, poor above M 2); **side intakes** (two intakes; fuselage boundary layer must be removed by a **diverter**, **fence** or **bleed slots** or the compressor may stall); **divided intake** (two inlets feeding one engine; yaw starves one side); **external-compression** — **2-shock** (one oblique + one normal), **3-shock** (two oblique + one normal), **isentropic** (many oblique via a curved ramp + one normal); **variable-geometry** (ramps keep the shock on the lip at every Mach); **variable-position** intakes for high-AoA fighters.
- **Intake pressure effectiveness** = total pressure at the engine face ÷ free-stream pressure (always < 1). **Capture area ratio** = A₀ ÷ intake entry area.

### Compressors (4-18)
- Raise air velocity in a **rotor (impeller)**, then **diffuse** it to static pressure in a **stator (diffuser)**: roughly **50% of the pressure rise in each**. **One stage = one rotor + one stator.**
- Across a **stator**: velocity ↓, pressure ↑, temperature ↑. A greater pressure rise is obtained from **cold air**.
- Blades are **twisted** root to tip for constant AoA and fitted slightly loose (expansion). Impeller tip speed kept below ~**500 m/s**. Tip shrouds reduce vibration.
- An uncompensated engine's **idle RPM rises with temperature**.
- **Centrifugal**: air leaves **at 90°** to the inlet, into a diffuser; about **4 : 1 (book 4–4.5 : 1) per stage**; more than **two stages** is inefficient. Efficient over a range, **simple, cheap, robust against FOD, compact**, rarely stalls — but big frontal area for the flow.
- **Axial**: air flows **parallel** to the axis through many stages; rotors add kinetic energy, stators diffuse and guide; **IGVs** feed the first rotor, **OGVs** straighten flow into the combustor. About **1.2 : 1 per stage** (more → separation); overall ratio is the **product** of stage ratios. **Annulus area shrinks** towards the back to keep axial velocity constant as density rises.
- **Multi-spool**: LP and HP compressors on concentric shafts, each driven by its own turbine — better matching. Typical overall ratio **single spool ~10 : 1, multi-spool ~25 : 1**.
- **Compressor air also** starts engines, pressurises the cabin and fuel tanks, de-ices, drives thrust reversers and instruments, cools turbines/NGVs/discs, and seals bearings.

| | Axial | Centrifugal |
|---|---|---|
| Parts | rotor + stator | impeller + diffuser |
| Flow per frontal area | **more** | less |
| Efficiency | 80–90% | 75–90% |
| Pressure ratio | 10 : 1 single spool, 25 : 1 multi | ≈ 4.5 : 1 |
| FOD resistance | **poor** | **good** |
| Stall/surge | **more prone** | less prone |

### Compressor stall and surge (4-20)
- **Stall**: the blade AoA exceeds critical and flow separates — like a wing. At constant RPM, **less mass flow → lower axial velocity → higher blade AoA**. A stall cell may rotate, spread or die out.
- **Signs**: rapid **rise in JPT/EGT**, **RPM drop**, rumbling, bangs, vibration.
- **Causes**: **distorted intake flow** (bird strike, crosswind, ice), **abrupt manoeuvres**, damaged blades, **ingesting another aircraft's exhaust**, **too much fuel on rapid acceleration**, **too lean on rapid deceleration**.
- **Surge**: **all stages stall** — complete flow breakdown, **loud bangs**, possibly flow reversal. Slamming the throttle open without adequate acceleration control can cause it. Action: **close the throttle slowly**, unload the aircraft, then reopen slowly.
- **Compressor map**: **design point** (best efficiency), **operating line**, **surge line** (stall points), **surge margin** between them (small on efficient high-ratio engines; the "knee").
- **Prevention**: **variable inlet guide vanes** and **variable stator vanes** (match blade AoA to RPM/temperature), **acceleration control** in the fuel system, **bleed valves** mid-compressor (dump air at off-design speeds), **multi-spool** design, **variable-area nozzle** with afterburning.
- Ideal compressor: good SFC, **high mass flow**, **high pressure ratio**, **stable** everywhere.

### Combustion chambers (4-22)
- **≈ 15 : 1 air/fuel** gives the most heat. **Flame speed only ~2–4 m/s**, while the air moves ~10× faster → **swirl vanes** and recirculation shelter the flame. Combustion is "constant pressure" but loses **3–8%** pressure.
- **Air split**: **primary ~20%** (burnt with the fuel), **secondary ~20%** (via swirl vanes, anchors the flame), **tertiary/dilution ~60%** (cools the walls and dilutes the gas to an acceptable **turbine entry temperature**).
- **Igniters** for starting; **drain valves** remove unburnt fuel after a false start (held shut by chamber pressure).
- **Types**: **multiple (can)** — separate chambers with interconnectors; **cannular (tubo-annular)** — separate flame tubes in one common casing; **annular** — one ring-shaped chamber: **shorter (book: 75% less length)**, less cooling air (~15% less), better combustion and less pollution, structural, even gas distribution, light — but harder to develop and maintain, uneven thermal stress.
- **Stability**: weak and rich extinction limits; **flame-out** most likely at **high airflow, low fuel** (idle descent) or on water ingestion; a **relight envelope** gives speed/altitude limits for an air start.
- **Burners**: **atomisers** (spray of 20–200 µm droplets) — **simplex** (one orifice; flow ∝ √Δp, poor range), **duplex** (two orifices: small for low flow, large added at high flow), **spill** (excess fuel spilled back, good atomisation at all flows), **Lubbock** (piston uncovers more holes — may stick), **airspray** (mixes primary air with fuel, less carbon/smoke). **Vaporisers**: fuel and primary air heated in a tube before burning — wide operating range, low smoke, independent of fuel pressure, but need **separate starting sprayers**.
- **Ideal chamber**: reliable; high heat release in a small space; **high combustion efficiency** (complete burning → CO₂, not CO); stable flame; **even TET distribution** (no hot spots); **minimum carbon** (coking, smoke); **minimum pressure loss** (hot loss from heat addition, cold loss from friction/mixing — some turbulence is needed).

### Turbines (4-25)
- Convert gas **pressure and kinetic energy into shaft work** to drive the compressor (LP turbine → LP compressor, HP turbine → HP compressor). High centrifugal stress. Stage diameter **increases rearwards** as the gas expands.
- Through a turbine: **pressure and temperature fall**; velocity rises in the NGVs then falls in the rotor. **TET up to ~1700 °C**, about **200 °C drop per stage**.
- Blades are **twisted** (equal work along the length), fixed by a loose **fir-tree root** that tightens under centrifugal force; **shrouds** reduce tip leakage and add stiffness.
- **NGVs (nozzle guide vanes)**: one stage = NGV + rotor; **convergent** aerofoil passages turn **pressure into velocity** and direct it onto the blades; they run **choked** and see the hottest, most uneven gas.
- **Impulse turbine**: NGVs accelerate the gas, the blades only **turn** it (water-wheel, Newton's 2nd law) — starters, APUs. **Reaction turbine**: the blade passages are **convergent** too, so the gas accelerates through them and the reaction turns the rotor (Newton's 3rd law). Practical blades are **impulse at the root, reaction at the tip**.
- **Installations**: single-spool, multi-spool, direct-coupled (shaft drives a propeller), **free turbine** (not connected to a compressor — turboshafts).
- **Creep**: permanent stretching under heat and tension. **Primary** (fast but slowing), **secondary** (steady), **tertiary** (accelerating → fracture). A little is allowed for tip clearance.
- **Blade cooling**: **convection** (air through internal passages) and **film** (a layer of air over the surface — more effective, costly, used at LE/TE). **Disc cooling** with HP compressor air; seals pressurised against hot-gas leakage.
- **Faults**: loss of tip clearance (heat, creep, bearing wear), buckling/cracking from hot spots, FOD from combustor debris; **blade containment** is essential.
- Ideal blades: strong, **creep- and thermal-shock-resistant**, corrosion-resistant, light, cheap, tolerant of high RPM and TET.

### Exam traps
- Subsonic intake = **divergent** duct; **super-critical** = starving (take-off), **sub-critical** = spilling. Ram recovery = intake pressure back to ambient.
- Supersonic intake: oblique shocks then **one normal shock**; delivers ~**M 0.5**; **intake buzz** = shock swallowed/expelled.
- Side intakes need **BL diverters**.
- Compressor stage = rotor + stator; ~50/50 pressure rise; stator: V ↓, P ↑, T ↑.
- Centrifugal **≈ 4:1/stage**, FOD-tolerant; axial **1.2:1/stage**, annulus narrows rearwards; ratio = **product** of stages.
- **Stall: low axial velocity → high blade AoA.** Surge = all stages; signs **EGT ↑, RPM ↓, bangs**. Cures: VIGVs, VSVs, bleed valves, multi-spool, acceleration control.
- Air split **20/20/60**; flame speed **2–4 m/s**; annular chamber shortest.
- Duplex burner: two orifices; vaporisers need starting sprayers.
- NGVs: convergent, **pressure → velocity**, choked, hottest. **Impulse root, reaction tip.** TET ≈ **1700 °C**.
- Creep: primary, secondary (steady), tertiary (fracture). Film cooling beats convection.

---

## 17. Exhaust, Reverse Thrust, Afterburning and Engine Systems

### Exhaust system (4-27)
- Directs the gas out at the right velocity and direction; in a turboprop it also sets turbine back-pressure. Exhaust gas **550–850 °C**; with afterburning up to ~**1500 °C**.
- **Exhaust cone**: forms a **divergent** passage behind the turbine (slows the gas, cuts losses) and shields the rear of the turbine disc. **Jet pipe**: carries gas to the nozzle (bypass air mixes here in mixed-flow fans); heat-resistant, **double-walled** and air-cooled.
- **Convergent nozzle**: accelerates the gas up to **M 1** — then it is **choked** (mass flow cannot rise further; pressure waves can no longer pass upstream). The gas leaves above ambient pressure → **under-expansion loss** (though the pressure difference gives pressure thrust). Hotter gas (reheat) raises the local speed of sound and so the jet velocity.
- **Convergent–divergent (con-di) nozzle**: the divergent part expands the gas to ambient and **supersonic** velocity → more momentum thrust; works best at one pressure ratio (rockets); off-design it **over-expands** and shocks form inside — hence **variable-geometry nozzles**.
- **Variable nozzle types**: **ejector** (fixed primary with a secondary shroud fed by secondary air; old, heavy), **plug** (moving plug; no reheat), **advanced variable** (titanium petals).
- **Uses of variable nozzles**: **afterburning** (opened when reheat lights, else back-pressure → surge), **surge control**, **noise reduction** (smaller area on approach slows the fan), **taxi** (open → less thrust), **thrust vectoring** (book: up to ~20°) for short take-off, tight turns, high-AoA manoeuvring.
- **Noise**: turbojet — jet velocity; turbofan — the **fan/LP compressor**.

### Thrust reversers (4-29)
- Requirements: adequate reverse thrust; no effect on normal running; **no re-ingestion** of debris or hot gas; no heating/vibration of the airframe; no fire hazard; light and simple; **inadvertent deployment impossible**; failures must not deploy it; fail-safe.
- **Clamshell doors**: inside the jet pipe; rotate to block it and divert gas forward through cascades. **Bucket (target) type**: buckets behind the nozzle swing into the jet (pneumatic actuation). **Cold-stream reverser**: on high-bypass engines blocks and turns the **fan air** (most of the thrust). **Reverse-pitch propellers** (turboprops; can even taxi backwards).

### Thrust augmentation (4-30)
- **Afterburning (reheat)**: thrust = ṁ(Vj − Va); the nozzle chokes at M 1, but burning extra fuel in the jet pipe **raises the gas temperature, the local speed of sound and so Vj**. Used for take-off and combat; selected at **100% RPM**. **SFC rises sharply** (higher Vj, lower propulsive efficiency) — but at about **M 2.5** reheat becomes efficient.
- Reheat raises jet-pipe pressure; to stop the operating point moving towards **surge** the **nozzle area is increased** as fuel is added. Either the pilot's lever schedules nozzle area and fuel follows (fast), or fuel is added and a **pressure-ratio control unit** opens the nozzle (slow but efficient).
- **Reheat ignition**: **catalytic** (fuel sprayed on a platinum/rhodium element — reliable, slow), **hot-streak** (an extra burst of fuel in one combustor sends a flame streak into the jet pipe — no turbine overheating), **spark** (less reliable).
- **Turbofan reheat** is more effective (oxygen-rich bypass air): up to ~**50%** thrust gain. Gas-generator, mixed-stream or separate hot/cold stream reheat.
- **Water (water–methanol) injection**: restores thrust lost on hot/high days (up to ~**30%**). Pure water (no scaling); **methanol** is anti-freeze and its burning replaces heat. **Compressor-inlet** injection cools the air (→ higher pressure ratio and mass flow, up to ~25%); **combustion-chamber** injection raises mass flow through the turbine.

### APU and starting (4-32)
- **APU**: small gas turbine, usually in the **tail**, **started from the battery**, usually a free turbine. Provides **ground air-conditioning, engine-start air, ground electrical power**, **emergency electrical and hydraulic power in flight**. Its generator **cannot be paralleled** with other sources — it feeds a busbar only when no other source does.
- **High-energy ignition (~12 J)**: starting and relighting. **Low-energy ignition (~6 J)**: continuous ignition in heavy precipitation/icing to prevent flame-out.
- **Hot start**: **EGT exceeds the limit** — too much fuel (residual fuel, **tailwind**, hot restart). Even **1 °C** over the limit → engine inspection.
- **Hung start**: lights up but **does not reach self-sustaining RPM** — weak **starter or low battery** (not igniters). **High EGT, low RPM**.
- **Wet start**: fuel flows, RPM reaches starter maximum but **no light-up (EGT does not rise)** — **igniter fault**; do a **dry motoring** run to clear fuel before the next attempt.

### Engine fuel system (4-33)
- **HP pump** (pressure for the burners), **fuel-flow meter** (between HP cock and nozzles), **FCU** (meters fuel), **temperature and power limiters** (stop over-temperature and over-stressing at high speed, low altitude), combustion-chamber **drain valves** (after a wet start; held shut by chamber pressure).
- **Acceleration control**: **OSG (overspeed governor)** bleeds fuel back at maximum RPM; **BPCU (barometric pressure control unit)** reduces fuel as altitude rises (less air); **MBPU (minimum burner pressure unit)** keeps a minimum fuel pressure so closing the throttle at height cannot blow the flame out (so **idle RPM rises with altitude**).
- Requirements: hold the selected RPM; **no flame-out** on acceleration (rich, surge, overheat) or deceleration (lean); raise idle RPM with altitude; easy starting; safe when overloaded.
- **Open-loop** (no feedback) vs **closed-loop** (error-corrected). **Pressure-controlled** (pump pressure set by ambient conditions) vs **flow-controlled** (throttle sets flow; longer life).

### Lubrication (4-34)
- Lubricates, **cools** and **cleans**; oil may also drive propeller pitch change and torque indication. **Synthetic oil** (better at high temperature). Jets consume oil, so it is **topped up**, not changed. Bearing seals pressurised with compressor air.
- **Oil pressure** measured **after the pump**; **oil temperature** downstream of the **cooler** (high temperature → blocked cooler or low quantity).
- **Expendable** (oil burnt; missiles), **wet sump** (oil in the crankcase — poor cooling, limited supply, problems in manoeuvres/inverted flight), **dry sump** (separate tank, cooler — aviation standard).
- Dry-sump parts: **tank**, **pressure pump**, **scavenge pumps** (return oil to the tank — larger capacity than the pressure pump), **fuel-cooled oil cooler** (heats fuel, cools oil), **magnetic chip detectors** (warn of bearing failure), filters, **centrifugal breather**, gauges. **Pressure-relief** systems (constant pressure) vs **full-flow** systems.

### FADEC (4-35)
- **Full Authority Digital Engine Control**: replaces the hydro-mechanical FCU; **two channels** for redundancy, each with built-in test; the healthier channel controls and swaps automatically on a fault. **No manual override** — if FADEC fails completely the engine runs down/fails safe.
- Inputs: thrust-lever angle, altitude, Mach, ambient and inlet temperature, EGT, bleed demand.
- Functions: fuel metering and power management, **overspeed protection**, stall/surge protection (bleed valves, variable stators), **active clearance control**, automatic start/relight, reverser, autothrust, indications, data recording.
- Advantages: precise fuel control, efficiency, longer engine life, fault tolerance, automatic emergency response, less workload.

### Rockets and other engines (4-36 to 4-38)
- **Solid rockets**: propellant (fuel + oxidiser) in the chamber, no pumps or moving parts. Thrust ∝ **burning surface area**: **neutral** (constant area), **progressive** (area grows), **regressive** (area shrinks). **End burning** — low thrust, case overheats, CG moves; **internal (radial) burning** — high thrust, case protected, CG constant.
- **Liquid rockets**: fuel and oxidiser in separate tanks; **mono-propellant** (one substance, e.g. hydrogen peroxide) or **bi-propellant**; **cryogenic** — LOX −183 °C (book −172 °C) and LH₂ −252 °C. Can be **stopped, restarted, throttled**; propellant cools the nozzle; complex and costly. **Conical** nozzles (simple, separation risk) vs **bell** nozzles (uniform flow, costly).
- **Ramjet**: a duct with no compressor or turbine — compression entirely by **ram**; needs forward speed (works from ~M 1, efficient from **M 2**; ram compression **7 : 1 at M 2, 28 : 1 at M 3, 70 : 1 at M 4**); above about **M 5** dissociation of air limits it. No moving parts; thrust falls with altitude; launched by another engine (missiles), or as a **turbo-ramjet**.
- **Scramjet**: combustion in **supersonic** flow to avoid dissociation; **hydrogen** fuel; useful up to about **M 24** (book).
- **Pulse-jet**: intermittent flow through spring **inlet valves**; thrust at **zero speed**, simple, cheap, high thrust/weight — but **very noisy**, < 500 kt, poor economy and high-altitude performance.
- **V/STOL**: static thrust must exceed **weight + 20%**, centred on the CG. Methods: **vectored thrust**, remote lift fans, **tilt-rotor**, **tilt-wing**, compound. Control in the hover by **puffer jets** (reaction control), differential throttling or thrust spoiling.

### Exam traps
- Convergent nozzle **chokes at M 1**; con-di nozzle gives **supersonic** exhaust; variable nozzle **opens** with reheat to prevent surge.
- Turbofan noise from the **fan**; turbojet from jet velocity.
- Cold-stream reverser = **fan air**. Reversers: no inadvertent deployment, no re-ingestion.
- Reheat at **100% RPM**; SFC ↑ (efficient only near M 2.5); turbofan reheat ~50%; water–methanol up to ~30%.
- APU: battery-started, **not paralleled**. High-energy ignition **12 J** (start/relight); low-energy **6 J** (continuous).
- **Hot start** = EGT over limit (tailwind, residual fuel); **hung** = no self-sustaining RPM (starter/battery); **wet** = no light-up (igniter) → dry motor.
- **OSG** = overspeed; **BPCU** = less fuel with altitude; **MBPU** = minimum burner pressure, idle RPM rises with height.
- Oil pressure **after the pump**; temperature after the **cooler**; scavenge pumps return oil; **chip detectors** warn of bearing wear. Aviation = **dry sump**.
- FADEC: **two channels, no manual override**.
- Ramjet: no compressor/turbine, **needs speed**, efficient ~M 2, limit ~M 5; scramjet = supersonic combustion, hydrogen. Pulse-jet: thrust at zero speed, noisy.

---

## 18. Electrical Principles, Magnetism and Batteries

### Basic terms (5-3)
- **Valence shell**: outermost electron shell. **Conductor**: has free valence electrons that move easily from atom to atom. **Insulator**: electrons tightly bound — high resistance (glass). **Semiconductor**: in between (transistors, diodes).
- Ways of producing electricity: **thermocouple** (heat at a junction of two different metals), **photo-electric** (light → electrons, e.g. zinc in UV), **friction** (static), **piezo-electric** (pressure on a crystal → charge; AC on quartz → vibration), **chemical** (batteries), **magnetism** (generators).
- **Charge (Q)**: coulomb. **Current (I)**: ampere = **1 coulomb per second**; conventional current flows **opposite to electron flow**; measured by an **ammeter**. **EMF / potential difference (V)**: volt — the electrical "pressure" that drives current; measured by a **voltmeter**.
- **Power (W) = V × I**. **Energy** = power × time (watt-hours).

### Resistance, inductance, capacitance (5-4)
- **Resistance (Ω)**: opposition to current; 1 V drives 1 A through 1 Ω. **Conductance** = 1/R. **Series: R = R₁ + R₂; parallel: 1/R = 1/R₁ + 1/R₂** (two 20 Ω in parallel = 10 Ω).
- **Inductor (coil, choke)**: stores energy in a **magnetic field**; passes DC freely, opposes AC (**inductive reactance**); **current lags voltage by 90°**. **Inductance** in **henry** — opposition to a change of current.
- **Capacitor**: two plates and a dielectric; stores an **electric field**; **blocks DC**, passes AC with **capacitive reactance**; **current leads voltage by 90°**. **Capacitance** in **farad** — depends on the **dielectric, plate area and plate spacing**. **Parallel: C = C₁ + C₂; series: 1/C = 1/C₁ + 1/C₂** (opposite to resistors).
- **Reactance**: AC-only, **frequency-dependent** opposition from L or C. **Impedance (Z)**: total opposition in an AC circuit (resistance + reactances, combined vectorially).
- **Resonance**: X_L rises and X_C falls with frequency; at the **resonant frequency** they are equal and cancel.

### Laws (5-5)
- **Ohm's law: I = V ÷ R** (at constant temperature; resistance of a conductor rises with temperature).
- **Kirchhoff**: (1) current into a junction = current out; (2) around a loop, sum of EMFs = sum of I × R drops.
- **Faraday**: a changing flux induces an EMF proportional to the **rate of change of flux**. **Lenz**: the induced current opposes the change that caused it (**back EMF**).
- **Fleming's right-hand rule — generators** (thuMb Motion, First finger Field, seCond finger Current). **Left-hand rule — motors** (same fingers; thumb gives the motion).
- **Right-hand grip rule**: fingers curl with the current in a solenoid → **thumb points to its north pole**. **Corkscrew rule**: current along the screw's travel → flux in its direction of rotation.
- **Electromagnetic induction**: an EMF is induced when a conductor and a magnetic field move relative to each other — the basis of all generators. Increase it by **faster cutting (speed)**, **stronger field (flux density)**, **more turns**.
- **Self-induction**: a coil opposes changes in its own current. **Mutual induction**: changing flux in one coil induces current in a nearby coil (transformers).

### Devices (5-6)
- **Solenoid/relay**: a coil's magnetic field pulls contacts closed (a relay = remote switch); stronger with **more turns, more current, soft-iron core**.
- **AC**: polarity and direction keep reversing; from generators; easily transformed. **DC**: one direction; from batteries or rectified generators.
- **Generator** (motion → electricity), **alternator** (generator of AC), **rectifier** (AC → DC), **motor** (electricity → motion), **oscillator** (DC → AC signal), **magnetron** (vacuum tube making **microwaves** — radar), **diode** (one-way: nil resistance forward, infinite reverse), **triode** (valve: anode, cathode, control grid), **transistor** (semiconductor amplifier/switch).

### Magnetism (5-7)
- Flux lines leave the **north** pole and enter the **south**; continuous, never cross. Both poles equally strong. **Like poles repel, unlike attract.** A freely suspended magnet aligns N–S.
- **Temporary magnet**: **soft iron** — easily magnetised and demagnetised. **Permanent magnet**: **hard steel alloy** — hard to magnetise, keeps it.
- **Permeability**: how easily flux concentrates through a material. **Saturation**: can accept no more magnetisation. **Retentivity**: magnetism left after the field is removed.
- Magnetism induced by: **hammering/vibrating ferrous metal in a magnetic field** (the main cause of **aircraft magnetism** — construction and service), stroking with a magnet, placing it in a solenoid, aligning it with a field.
- Demagnetise by **shock** (struck while lying **across** the earth's field), **heat** (above ~**900 °C** — the Curie region), or **alternating current**.

### Cells and batteries (5-8)
- **Cell**: chemical → electrical energy. **Standard cell** ~1.08 V. **Primary cell**: not rechargeable (dry cell, **1.5 V**). **Secondary cell**: rechargeable (**lead-acid 2 V**).
- **Battery** = several cells. Electrons flow **− to +** externally; conventional current + to −.
- **Capacity (Ah)**: 80 Ah = 8 A for 10 h or 80 A for 1 h. **Series: voltages add, Ah same. Parallel: voltage same, Ah add.**
- **Capacity test every 3 months** — at least **80%** of rated capacity. Voltage is checked **on load**. **Battery master OFF** isolates it from the busbar; with the generator on line the battery is in parallel (being charged).
- **Lead-acid**: sulphuric-acid electrolyte; capacity set by plate area.
- **Nickel-cadmium**: **1.2 V per cell**; **potassium-hydroxide** electrolyte; holds a **constant voltage until almost flat**; **thermal runaway** (low thermal capacity — can overheat/explode on heavy charging or repeated starts).
- **Lithium-ion**: **3.6 V per cell**; higher energy density, less maintenance.

| | Ni-Cd | Li-ion | Lead-acid |
|---|---|---|---|
| Electrolyte | **potassium hydroxide** | lithium salt | **sulphuric acid** |
| Positive | nickel oxide | lithium metal oxide | lead peroxide |
| Negative | cadmium | graphite | spongy lead |
| Cell voltage | 1.2 V | 3.6 V | 2 V |

### Exam traps
- **Inductor: current lags voltage 90° (CIVIL: in a Capacitor I leads V, V leads I in an inductor L).** Inductor passes DC; capacitor blocks DC.
- X_L **rises** with frequency, X_C **falls**; equal at resonance. Capacitors add in **parallel**, resistors in **series**.
- Right-hand rule = **generator**; left-hand = **motor**.
- Induced EMF grows with **speed, flux, turns**. Lenz → back EMF.
- Soft iron = temporary; hard steel = permanent. Aircraft magnetism from **hammering/vibration in the earth's field**.
- **Series cells: volts add; parallel: Ah add.** Ni-Cd 1.2 V, KOH, **thermal runaway**; lead-acid 2 V, H₂SO₄. Capacity check **3-monthly, ≥ 80%**.

---

## 19. AC and DC Machines and Aircraft Power Systems

### Alternating current (5-9)
- **Cycle** = one complete wave (1 cycle per second = **1 Hz**); one cycle = **360°** of phase. **Amplitude** = peak value. **Frequency** = cycles per second. **Period** = 1 ÷ frequency.
- **RMS (effective) value** = the DC value with the same heating effect = **peak × 0.707** (peak ÷ √2).
- **Frequency = (poles ÷ 2) × RPM ÷ 60**: an 8-pole alternator at 6000 RPM → **400 Hz** (the aircraft standard).
- **Why AC**: simpler, robust and reliable generators; better power/weight; **less cable weight** at high voltage; **transformers** change voltage efficiently; any DC from a **TRU**; simple efficient **3-phase motors**; **no commutator problems** (especially at altitude).
- **Power factor = real (true) power ÷ apparent power** (= cos φ). **Real power = V × I × PF**. In a purely resistive circuit V and I are in phase, PF = 1; with V and I 90° apart true power = 0.
- **Resistive circuit**: V and I **in phase**. **Inductive circuit**: **current lags** by 90°; **X_L = 2πfL** (rises with frequency). **Capacitive circuit**: **current leads** by 90°; **X_C = 1 ÷ (2πfC)** (falls with frequency). **Resonant circuit**: X_L = X_C.

### AC generators and alternators (5-11)
- **Generator**: armature **rotates** in a **stationary** field, output via **slip rings**. **Alternator**: armature (output windings) **stationary**, field **rotates** — output from the stator, no heavy-current sliding contacts.
- Aircraft use **alternators**: better power/weight, good output at low RPM, no commutator. Typical **200 V (115 V phase), 3-phase, 400 Hz**, externally excited; **voltage regulated by varying the rotating field current**.

| Generator (DC) | Alternator |
|---|---|
| rotating armature | **stationary armature** |
| stationary field | **rotating field** |
| AC → DC by **commutator** | AC → DC by **rectifier** |
| **arcing** at commutator | no arcing |

- **3-phase alternator**: three windings **120°** apart. Better power/weight, compact, lighter cables, easier to parallel, can feed single- and 3-phase loads. **Star**: line current = phase current; **line voltage = √3 (1.73) × phase voltage** (used in aircraft). **Delta**: line voltage = phase voltage; line current = 1.73 × phase current.

### AC motors (5-12)
- A rotating field set up by the stator turns the rotor; simpler and more reliable than DC motors; good for constant speed.
- **Synchronous motor**: an alternator run as a motor; rotor DC-excited, locks to the rotating field — **speed fixed by supply frequency**: **RPM = 120 f ÷ poles** (4-pole at 400 Hz = 12,000 RPM; the scan's "1200" is a slip). **Not self-starting** (needs an induction winding). Used in **RPM indicators**. Reverse two phases → reverses; lose one phase → runs at reduced speed and will not restart.
- **Induction (asynchronous) motor**: 3-phase stator field **induces** current in a **squirrel-cage rotor**; never reaches synchronous speed — the difference is **slip** (~**5%**). Simple, cheap, common.

### DC generators (5-13)
- A DC generator is an AC generator with a **split-ring commutator** in place of slip rings: the connections reverse every 180°, giving DC. **Commutator ripple** is reduced by **more armature coils**. Alternators use **rectifier diodes** instead.
- **Armature reaction**: load current in the armature distorts the main field and shifts the **neutral plane** in the direction of rotation; **interpoles** correct it.
- **Field coil**: electromagnet whose current sets the output voltage whatever the speed. **Voltage regulator**: variable resistance **in series with the field**, holding **14 V / 28 V** for **12 V / 24 V** batteries.
- **Reverse-current (cut-out) relay**: closes only when generator voltage exceeds battery voltage (e.g. **26 V** in a 28 V system) so the **battery cannot drive current back into the generator**. **Over-voltage protection** (e.g. > 16.5 V in a 14 V system).
- **Externally excited** (battery supplies the field — no residual magnetism) vs **self-excited** (residual magnetism starts it): **series-wound** (field in series with the load — voltage varies with load; not used for supply); **shunt-wound** (field parallel to armature — many turns, small current, **nearly constant voltage**; voltage regulator in series with the shunt field); **compound** (series + shunt — compensates the shunt's drop under load).

### DC motors and actuators (5-15)
- Same construction as a generator; **left-hand rule**. **Back EMF** (Lenz) opposes the supply and rises with speed; the difference lets current flow.
- **Series-wound motor**: heavy load → slows → less back EMF → more current → **high torque**; light load → races — **high starting torque, never start or run without load** (overspeed). Used in **starters and actuators** (landing gear).
- **Shunt-wound motor**: field current independent of load; speed drops only ~10% from no-load to full-load → **near-constant speed**; may start unloaded (fans, pumps).
- **Starter-generator**: compound machine — motor for starting, generator when running; poor output at low RPM, so used on **turbine engines**.
- **Actuators**: small reversible motors with gearboxes; **limit micro-switches** stop travel, **electromagnetic brakes** prevent over-run, **clutches** prevent overload. **Rotary** (valves) and **linear** (flaps, gear).

### Transformers and inverters (5-17)
- **Transformer**: two coils on a laminated iron core; AC in the primary sets up alternating flux that induces EMF in the secondary. **Turns ratio N₂/N₁ = E₂/E₁**: > 1 **step-up**, < 1 **step-down**. Power out ≈ power in (so current changes inversely). Output 180° out of phase. **AC only.** **Auto-transformer**: one winding shared, tapped.
- **Inverter**: **DC → AC**. **Rotary** (DC motor driving an alternator) or **static** (solid-state oscillator, transistors, transformer). **TRU** (transformer-rectifier unit): AC → DC.

### Aircraft power distribution (5-18)
- **Two-wire (dipole)**: separate return wire — for **non-conductive (composite) airframes**. **Single-pole (earth return)**: the **metal airframe is the negative return** — most common; a short circuit is a supply wire touching structure.
- **Voltmeter**: **high resistance, in parallel**. **Ammeter**: **low resistance, in series** (a **shunt** extends its range). Twin: an ammeter per generator, one switchable voltmeter.
- **Busbars** collect and distribute power: **essential** (safety-critical), **non-essential**, **hot/battery bus** (always live from the battery), **synchronising bus** (paralleled AC needs matched **frequency, phase and voltage**). **Split-bus AC**: generators not paralleled — no synchronising needed; buses can be tied if one fails; with **both** lost, non-essential loads go and a **static inverter** feeds essential AC.
- **Bonding**: strips joining all metal parts at the **same potential** → no static sparks, a good return path, less radio interference. **Static dischargers (wicks)** on **trailing edges** bleed charge to the air; conductive tyres discharge it on landing. **Screening/suppression**: stops interference from ignition systems, DC generators and slip rings.

### Switches and protection (5-19)
- Switches: toggle, lit push-button, **guarded**, **micro-switches** (doors, gear position), **bimetallic/thermal** (fire detection), **proximity** (capacitive — fuel; magnetic — gear-tooth RPM).
- **Fuse**: low-melting element **in series**, rated in amps; blows **before full fault current**; must be replaced. **Current limiter**: high-melting slow fuse. **HRC** (high-rupture-capacity) fuses for heavy circuits.
- **Circuit breaker**: **in series**; opens at fault current; **resettable**; also used as a switch/isolator. **Trip-free**: cannot be held in while the fault persists. **Non-trip-free**: can be held in (circuit made) during a fault. **Reverse-current CB** protects against reverse current.
- **Resistor colour code** (black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9; gold ±5%, silver ±10%): "Bad Beer Rots Our Young Guts But Vodka Goes Well".

### Computers (5-20)
- **Input/output devices**; **CPU** = **ALU** (binary arithmetic and logic), **registers** (temporary store), **control unit** (clock, sequencing).
- **ROM** (read-only, non-erasable), **PROM** (user-programmable once), **EPROM** (UV-erasable), **EEPROM** (electrically erasable), **RAM** (read/write; **volatile** loses data without power; **non-volatile** keeps it).
- **Positive logic**: 1 = +5 V, 0 = 0 V; **negative logic**: the reverse. **Hexadecimal** = base 16 (0–9, A–F); **octal** = base 8.

### Exam traps
- **RMS = 0.707 × peak.** **f = (poles/2) × RPM/60** → 8 poles × 6000 RPM = **400 Hz**.
- **PF = true ÷ apparent power**; resistive PF = 1.
- **X_L = 2πfL ↑ with f; X_C = 1/(2πfC) ↓ with f.**
- **Alternator: rotating field, stationary armature**; regulate by **field current**; aircraft **115/200 V, 3-phase, 400 Hz**. Star: V_line = **1.73 V_phase**.
- Synchronous motor: speed set by **frequency**, not self-starting, used in **tachometers**. Induction motor: **slip** ~5%.
- **Commutator** turns AC to DC in a DC generator; **interpoles** fix armature reaction; **reverse-current relay** stops the battery motoring the generator.
- **Series motor: high torque, overspeeds unloaded** (starters, actuators); **shunt motor: constant speed**.
- Transformer: AC only; turns ratio = voltage ratio. **Inverter DC → AC; TRU AC → DC.**
- **Voltmeter parallel/high R; ammeter series/low R.** Single-pole = airframe return.
- AC paralleling needs **frequency, phase, voltage** matched; split bus doesn't.
- **Trip-free CB cannot be held in on a fault.** Fuse and CB both **in series**.
- **Bonding = equal potential**; static wicks on **trailing edges**.

---

## 20. Pitot-Static Instruments: Altimeter, VSI, ASI and Machmeter

### Pitot-static system (6-3)
- **Pitot tube**: faces into the airflow (mouth parallel to the flow in normal attitude), **outside the boundary layer**; **heated** and has **drain holes**. Senses **total (pitot) pressure = dynamic (½ρV²) + static**.
- **Static vent**: flush with the skin, **at right angles** to the flow — must sense **only static pressure**. Usually **two vents, one each side, interconnected** to cancel sideslip/yaw errors; an **alternate static** source inside the aircraft for blockage.
- **ASI and Machmeter** take pitot **and** static; **altimeter and VSI** take **static only**.
- **Position (pressure) error**: the static vent doesn't see true static pressure because of the airflow around it — depends on **vent position, AoA, speed, configuration (gear/flaps), sideslip, shockwaves**; larger in **ground effect**. Minimised by design and vent location; tabulated as a correction (IAS → CAS).

| Fault | ASI / Machmeter | VSI | Altimeter |
|---|---|---|---|
| **Pitot blocked** (drain also blocked) | level: frozen; **climb: over-reads**, **descent: under-reads** (acts like an altimeter) | no effect | no effect |
| **Pitot leak** | **under-reads** | no effect | no effect |
| **Static blocked** | level: correct; **climb: under-reads**, **descent: over-reads** | **reads zero** | **frozen** |
| **Static leak** into a pressurised cabin | under-reads | shows cabin rate | shows **cabin altitude** (under-reads) |

(Rows follow the physics: with static trapped high in a climb, pitot − static is too small, so the ASI under-reads; with pitot trapped, falling static in a climb makes pitot − static grow. The scanned table appears to have the two ASI blockage rows the other way round.)

### Altimeter (6-4)
- An aneroid barometer calibrated in **ISA**: a sealed, **partly evacuated corrugated capsule** (stack) held open by a leaf spring, in a case fed with **static** pressure; capsule movement drives the pointers through linkages. A **bimetallic** element compensates for case temperature.
- **Sub-scale (Kollsman window)**: **QNH** → altitude (elevation on the ground); **1013 (QNE standard)** → pressure altitude / flight level. All aircraft on the same setting are separated vertically even if the readings are not true altitude.
- Pre-flight: with QNH set, reading within the permitted tolerance of aerodrome elevation (book: ±75 ft DGCA); instrument error at sea level should be < ±30 ft. Sensitivity falls above ~60,000 ft.
- **Sensitive altimeter**: two or more capsules — more accurate. **Servo-assisted altimeter**: servo drive instead of linkages — **lag almost eliminated**, more accurate.
- **Cross-hatched flag**: visible below 10,000 ft (three-pointer instrument).

### Altimeter errors (6-5)
- **Lag**: capsule/linkage response delay — **under-reads in a climb, over-reads in a descent** (servo altimeters cure it).
- **Instrument error**: manufacturing tolerances, imperfect elasticity (hysteresis).
- **Position/pressure error**: dynamic pressure interference at the vent; manoeuvre-induced error.
- **Temperature error**: in air **colder than ISA** the pressure levels are closer together, so the altimeter **over-reads** (aircraft lower than indicated) — zero at the datum, growing with height. "**High to low (temperature), look out below.**" **Cold-temperature correction**: add about **4% per 10 °C** below ISA (book) to minimum altitudes.
- **Barometric error**: actual pressure differs from the setting. Flying from **high to low pressure** without resetting → **over-reads** (aircraft lower than indicated). Low pressure also forms in the **lee of hills**.
- **Pressure altitude**: reading with 1013 set. **Density altitude** (performance only): **DA = PA ± 118 × ISA deviation (°C)**. **True altitude** ≈ PA + 4 ft per °C ISA deviation per 1000 ft (≈ 1% per 2.5 °C). At ISA, PA = DA = TA.
- Example: FL180, ISA −10 °C → 18,000 + (18 × 4 × −10) = **17,280 ft** true altitude (720 ft lower).

### VSI (6-6)
- A capsule fed with **direct static**, inside a case fed with static through a **calibrated leak (metering unit)**; in a climb or descent the case pressure **lags**, and the difference shows as rate of climb/descent.
- The **capillary + orifice** metering unit compensates for **altitude and temperature** (laminar flow through the capillary, turbulent through the orifice — opposite responses).
- Errors: **static blocked → reads zero**; pitot faults no effect; lag, instrument and position errors. **Transonic jump**: shows a false climb as shocks pass the static vents.
- **IVSI (instantaneous VSI)**: an **inertial dashpot/accelerometer** gives an immediate reading, then the metering unit takes over — **removes lag**; but can show errors in **steep turns (> 40° bank)** and can be over-sensitive in turbulence.

### ASI (6-7)
- Measures **dynamic pressure = pitot − static**: pitot into a capsule, static into the case. Dynamic pressure ∝ V², so the scale is calibrated to give **evenly spaced** speed marks. The pitot head can be anywhere in the flow, but the **static** must be true. **Servo ASI**: electrical, more accurate.
- **Errors**: blockage/leak (table above), lag, instrument, position; **density error** (calibrated at ISA sea-level density — at altitude the ASI under-reads TAS; correcting EAS for density gives TAS); **compressibility error** (at high speed/altitude the air compresses in the pitot → **ASI over-reads**; correcting CAS gives EAS).

| ASI marking | Meaning |
|---|---|
| **White arc** | **VS0** (bottom) to **VFE** (top) — flap operating range |
| **Green arc** | **VS1** (bottom) to **VNO** (top) — normal operating range |
| **Yellow arc** | **VNO to VNE** — caution, smooth air only |
| **Red line** | **VNE** — never exceed |
| **Blue line** | **VYSE** — best rate of climb, one engine inoperative (twins) |

### Machmeter (6-8)
- Speed of sound depends only on **temperature** (**661 kt** at ISA sea level; none at absolute zero). Climbing at constant TAS, Mach rises; at constant IAS, Mach rises faster.
- Shows **(P − S) ÷ S** (dynamic ÷ static pressure): an **airspeed capsule** and an **altitude capsule** combined through a **ratio arm (ranging arm)**. For the same IAS, a higher Mach is shown at higher altitude.
- **No density or temperature error** (they cancel in the ratio). Blockage errors as for the ASI; lag, instrument and position errors.
- **Why Mach at height**: LSS falls with altitude, so at constant TAS Mach rises towards Mcrit; and the ASI is less reliable up high. Aircraft are limited by **VMO (IAS) low down** and **MMO (Mach) high up** — the changeover altitude is where the two limits meet.

### Exam traps
- Pitot = total pressure; static vent **perpendicular**; ASI/Mach use both; altimeter/VSI **static only**.
- **Static blocked: altimeter freezes, VSI zero, ASI under-reads in a climb.** **Pitot blocked (drain too): ASI over-reads in a climb** (acts as an altimeter).
- Alternate static in a pressurised cabin → altimeter shows **cabin altitude**.
- Altimeter lag: **under-reads in a climb**. Colder than ISA or high → low pressure: **over-reads** (dangerous). Cold correction ≈ **4% per 10 °C**.
- **DA = PA ± 118 × ΔISA**; TA ≈ **4 ft/°C/1000 ft**.
- VSI = direct static vs **metered (leaking) static**; IVSI removes **lag**.
- ASI compressibility: **over-reads** at high speed. **White arc VS0–VFE, green VS1–VNO, yellow VNO–VNE, red VNE, blue VYSE.**
- Machmeter has **no temperature/density error**; works on **(P − S)/S**.

---

## 21. Compasses and Gyroscopic Instruments

### Direct-reading magnetic compass (6-9)
- Requirements: **aperiodic (deadbeat)** — the card settles quickly without oscillating; **sensitive** to the **horizontal component (H)** of the earth's field; **horizontal** — unaffected by the vertical component (**dip, Z**) (achieved by a pendulous, low-CG magnet system). Accuracy: direct-reading **±10°**, remote-indicating **±1°** (book).
- Compass liquid: **low expansion, low freezing point, high boiling point, low viscosity, transparent, non-corrosive**.
- **Acceleration error** (from magnet inertia + dip): on **east/west headings**, **accelerating** shows an apparent turn **towards the nearer pole**, **decelerating** towards the **equator** (northern hemisphere: **ANDS — Accelerate North, Decelerate South**). Maximum near the poles, **zero at the magnetic equator** and on **N/S headings**.
- **Turning error**: in a turn the magnet assembly swings outward and dip twists it. **Turning through the nearer pole (north in NH) the compass under-reads/lags; through the equator (south in NH) it over-reads/leads** (**UNOS — Undershoot North, Overshoot South**). Maximum at high latitudes, zero at the magnetic equator and when **passing through E/W**. **Liquid swirl** adds to it turning through north, reduces it through south (NH).
- Limitations: affected by aircraft magnetism, no remote outputs, turning and acceleration errors, **sluggish at high latitudes** (small H).

### Aircraft magnetism and compass swing (6-10)
- **Deviation** is caused by aircraft magnetism. **Hard iron**: permanent, independent of heading (varies with magnetic latitude). **Soft iron**: induced by the earth's H and Z — **varies with heading**.
- **Compass swing** after: **compass component change**, **large change of operating latitude**, periodic inspection, **lightning strike**, **long storage on one heading**, major modifications/electrical changes.
- Readings on the cardinal and quadrantal headings are compared with a datum compass:
  - **Coefficient A** = mean deviation of all eight headings — **lubber-line misalignment/compass defects**; corrected by **rotating the compass (lubber line)**.
  - **Coefficient B = (dev E − dev W) ÷ 2** — fore-and-aft magnetism; varies as **sin heading**; **max on E/W, zero on N/S**; corrected on an **easterly** heading (micro-adjusting magnets).
  - **Coefficient C = (dev N − dev S) ÷ 2** — athwartships magnetism; varies as **cos heading**; **max on N/S, zero on E/W**; corrected on a **northerly** heading.
  - **Deviation on any heading = A + B sin θ + C cos θ**; residuals go on a **deviation card**.

### Gyro-magnetic (remote-indicating) compass (6-11)
- Combines a **directional gyro** (short-term rigidity — no turning/acceleration errors) with a **flux valve** (long-term magnetic reference — no drift); a **slaving (precession) torque motor** keeps the gyro aligned with the detected field. Parts: **flux valve (detector)**, **error (slaving) amplifier**, **precession motor**, horizontal gyro, indicator (RMI/HSI).
- **Flux valve principle**: induced voltage in a coil depends on the **cosine** of the angle between coil and field. Problems: (a) a steady field induces nothing → solved by **exciting** the soft-iron (permalloy) legs with **400 Hz AC**, so the earth's field shows up as a **second-harmonic (800 Hz)** output; (b) heading ambiguity and (c) weakening H at high latitude → solved by a **three-legged** flux valve (vector sum gives direction regardless of magnitude).
- **Construction**: pendulous detector in the **wing tip or tail** (away from aircraft magnetism) on a **Hooke's joint** — free about **±25° in pitch and roll** but **not in azimuth**. Slaving ~**3°/min** (faster at start-up). Step, linear and step-linear slaving functions (book: step-linear max ~2°/min).
- **Advantages**: no drift or manual synchronising, no turning errors, **DG mode near the poles**, multiple outputs, true heading by setting variation. **Disadvantages**: heavier, costlier, needs electrical power, complex.
- **Errors**: **detector tilt** (turns, acceleration, **Coriolis**, vehicle-movement/rhumb-line turning), **northern instability** (oscillation at high speed near the magnetic poles), hang-off (wander), gimbal error, transmission error.

### Gyroscopes (6-13)
- **Rigidity**: a spinning rotor holds its plane of rotation in inertial space; more rigid with **higher RPM** and **greater moment of inertia** (heavy rim, large radius).
- **Precession**: a torque applied at right angles to the spin axis acts **90° on in the direction of rotation**; continues while the torque is applied; **rate ∝ torque ÷ (moment of inertia × RPM)**.
- **Topple**: spin-axis movement in the **vertical** plane. **Drift**: in the **horizontal** plane. **Wander** = any change of axis over time: **real wander** (imperfections, friction — causes drift and topple), **apparent wander** (earth's rotation, **15.04°/h**; a horizontal-axis gyro drifts at **15 sin lat °/h** — max at the poles, and topples most at the equator), **transport wander** (moving across meridians: rate = **E/W groundspeed × tan lat ÷ 60** °/h; none flying N/S along a meridian).
- **Displacement gyros** (two gimbals, **2 degrees of freedom**): **space gyro** (free, no correction), **tied gyro** (held by an external reference — DG tied to a flux valve), **earth gyro** (tied by **gravity** — artificial horizon). **Rate gyro**: **1 degree of freedom**, measures rate (turn indicator).

| Instrument | Gyro | Axis | Freedom | Book RPM | Mnemonic |
|---|---|---|---|---|---|
| **Directional gyro** | tied | **horizontal** | **2** | 12,000 | **DHAT2** |
| **Turn & slip** | **rate** | **horizontal** | **1** | 4,500 | **THAR1** |
| **Artificial horizon** | **earth** | **vertical** | **2** | 22,500 (elec) / 15,000 (air) | **AVE2** |

### Directional gyro (6-14)
- Uses **rigidity** for direction and precession for control; no magnetic element (no turning/acceleration errors) but must be **synchronised with the compass** regularly. Driven by air jets (vacuum) or electrically. **Caging knob**: re-erects, cages before aerobatics, synchronises. **Latitude nut** on the inner gimbal corrects apparent drift (15 sin lat). Modern DGs: up to 85° pitch/roll limits.
- **Errors**: **gimbal error** (gimbals no longer aligned with aircraft axes in pitch + roll; worst on **inter-cardinal** headings) — **gimbal lock** if two gimbals align; **cross-coupling** in 90° bank; real and apparent wander; low RPM → less rigidity.

### Turn and slip indicator (6-15)
- **Rate gyro**, horizontal spin axis, one degree of freedom, works by **(secondary) precession**: yaw precesses the gimbal about the fore–aft axis against a **calibrated spring**; the tilt where spring force balances precession shows the **rate of turn**. No erection system needed.
- **Rate 1 = 3°/s** (360° in 2 min); rate 2 = 6°/s. **Bank for rate 1 ≈ TAS/10 + 7** (book shows IAS/10 + 7).
- **Slip ball**: a ball in a curved liquid-filled tube shows the balance of gravity and centrifugal force. **Skid** — ball **outward** (too much rudder/yaw into the turn); **slip** — ball **inward** (too much bank). "Step on the ball."
- **Errors**: **low RPM → under-reads** (less precession); **non-linear spring**; **pitching (looping) error** — pitching while turning **over-reads**.

### Artificial horizon (attitude indicator) (6-16)
- **Earth gyro**, **vertical** spin axis, two degrees of freedom, **rigidity** gives pitch and roll; roll 360°, pitch ~85°. Pitch via a guide pin moving the horizon bar; roll on the bank scale.
- **Erection**: air-driven — pendulous vanes; electric — **mercury levelling switches** and **torque motors** (the roll switch drives the pitch torque motor and vice versa, through precession).
- **Acceleration error** (air-driven, bottom-heavy rotor): on **acceleration** shows **false climb and bank to the left**; on **deceleration** false descent and bank to the right; disappears after ~twice the acceleration time. Electric AHs largely avoid it: faster rotor, less bottom-heavy, **pitch erection cut-out above ~0.18 g**, **roll cut-out above ~10° bank**.
- **Turning (erection) error**: centrifugal force displaces the levelling switch during turns, precessing the rotor. Cures: **erection cut-out above 10° bank**, pitch-bank compensation, **inclining the spin axis ~1.6–2.5°**.

### Exam traps
- Compass needs **H**, must ignore **Z (dip)**; deadbeat. Acceleration error **zero on N/S**; turning error **zero through E/W**; both zero at the magnetic equator.
- **ANDS** (accelerate → north in NH) and **UNOS** (turning through north under-reads/lags).
- **B = (E − W)/2, max E/W, corrected on east; C = (N − S)/2, max N/S, corrected on north; A = mean of eight, lubber line.**
- Flux valve: **400 Hz in, 800 Hz out**; **3 legs**; Hooke's joint, free in pitch/roll, fixed in azimuth; in the **wing tip/tail**.
- Rigidity ↑ with **RPM and moment of inertia**; precession rate ∝ torque ÷ (I × ω), 90° on in the direction of spin.
- Drift = horizontal plane; topple = vertical plane. Apparent drift **15 sin lat °/h**; transport **(E/W GS × tan lat)/60**.
- **DHAT2, THAR1, AVE2.** TSI: rate 1 = **3°/s**; low RPM → under-reads.
- Ball **out = skid**, ball **in = slip**.
- Air-driven AH on acceleration: **false climb + left bank**. Erection cut-out above **10° bank**.

---

## 22. Radio Altimeter, Air Data Computer, Alerting and Engine Instruments

### Radio altimeter (6-18)
- Shows **height above the ground directly below**. An **FMCW (frequency-modulated continuous-wave) radar** at **4300 MHz (4200–4400 MHz, SHF)**. Being continuous-wave it needs **separate transmit and receive aerials**.
- Range typically **0–2500 ft**; accuracy **±3% or ±1 ft** (whichever is greater, book). Calibrated to show the height of the **lowest wheels** (allowing for **residual height** — aerial height and cable length).
- **Principle**: the transmitted frequency sweeps at a known rate; by the time the echo returns the transmitter has moved on, so the **frequency difference** gives the **time delay** and hence height. Beam about **30° fore–aft, 60° sideways** (to allow for bank).
- Errors: **fixed** (transmitter frequency), **mushing** (aerials not in one plane in climb/descent), installation (residual height).
- **Advantages**: true height above ground, **no QNH** needed, no pitot-static errors, couples to **autoland**. **Limitations**: **no vertical separation** between aircraft and **no warning of terrain ahead**.

### Air data computer (6-19)
- Converts **pitot pressure, static pressure, total air temperature (TAT)** (and weight-on-wheels) into electrical outputs: **altitude, IAS/CAS, Mach, TAS, SAT, vertical speed** — for the displays, transponder (Mode C/S), FDR, cabin pressurisation, autopilot (altitude/speed/Mach hold, gain scheduling) and autothrottle. Can switch between sources if one blocks.
- **Advantages**: **less lag**, **position error corrected**, **compressibility corrected**, one source for many users.

### Alerting systems (6-20)
- **Altitude alert**: approaching the selected altitude — at **900 ft to go** a white box appears around it on the PFD, which disappears within **300 ft**. **Deviating more than ±300 ft** from the selected altitude: **master caution + aural**, EICAS "**ALTITUDE ALERT**", box turns amber. Inhibited on the **glideslope** or with **gear and flaps down**. Mandatory for turbine aircraft and turboprops > 5700 kg or > 9 passengers (book).
- **Overspeed warning**: approaching **VMO/MMO** — master warning + aural (clacker), EICAS "OVERSPEED".
- **Stall warning**: at **5 kt or 5%** above stall speed (whichever is more); visual, aural, **stick shaker**. Inputs: **AoA**, **flap/slat position**, **gear position**, airspeed.
- **AoA sensors**: **slotted probe** (pressure difference between slots turns a paddle) or **vane** (weathervane aligned with the local flow).

### Engine instruments (6-21 to 6-23)
- **Temperature**: **expansion** types (solids/liquids). **Thermocouples** (**Seebeck effect**: two dissimilar metals joined; heating the hot junction produces an EMF — **no external power needed**): **surface-contact** (CHT, hottest cylinder), **immersion** (EGT/JPT at the **LP turbine outlet**; **rapid-response** for slow gas, **stagnation** type for fast gas); the cold junction is kept stable. **Resistance thermometers** (resistance changes with temperature, **Wheatstone bridge**) — **oil temperature**, OAT; need power. **Radiation pyrometer**: senses the turbine blades' radiation without contact; prone to **sooting**, accurate only near calibration.
- **Pressure**: **capsule** (very low pressures), **bellows** (medium — intake, fuel), **Bourdon tube** (high — oil, hydraulics). **MAP** gauge reads absolute manifold pressure (piston). **EPR** = turbine discharge ÷ compressor inlet pressure (jet).
- **RPM**: **mechanical tachometer** — a rotating magnet drags an **eddy-current drag cup** against a hairspring; **needs no electrics** (works in total electrical failure); low-RPM engines. **Electrical tacho-generator** — engine-driven generator drives a **synchronous motor** and drag cup in the indicator; high RPM. **Tacho probe** — a **phonic wheel's** teeth vary the field in a pick-up; no moving parts, many outputs, needs power.
- **Fuel quantity**: **float** (simple, errs in manoeuvres); **capacitance** — two concentric tubes, fuel/air as dielectric; less fuel → less capacitance; **attitude-compensated**; **compensated capacitance** also corrects for temperature/density → reads **mass**.
- **Torque**: power = torque × RPM. **Electrical** (phase difference between toothed wheels on inner and outer shafts as the shaft twists). **Oil (hydraulic)**: a **helical gear** tries to move axially in proportion to torque; oil pressure on a piston resists it — that pressure is the torque reading.
- **Vibration**: accelerometers; frequency ∝ RPM, **amplitude ∝ damage**; shown as amplitude at a given frequency.

### Exam traps
- RA: **FMCW, 4300 MHz**, two aerials, 0–2500 ft, **frequency difference ∝ height**; no use for separation or terrain ahead.
- ADC inputs **pitot, static, TAT**; reduces lag, corrects position and compressibility errors.
- Altitude alert: **900 ft** box, **±300 ft** deviation alert; inhibited on glideslope/gear down.
- Stall warning **5 kt / 5%**; inputs AoA, flaps/slats, gear, speed.
- Thermocouple = **Seebeck**, self-powered (CHT, EGT); resistance bulb = Wheatstone bridge (oil temp).
- Bourdon tube = **high** pressure; capsule = low.
- Mechanical (drag-cup) tacho needs **no power**; tacho probe needs power.
- Capacitance gauge: fuel is the dielectric; compensated → **mass**.
- Oil torque meter = **helical gear + oil pressure**.

---

## 23. INS, Ring-Laser Gyros, Autopilot, EFIS and FMS

### Inertial navigation (6-24)
- **IRU**: **3 gyros** (or RLGs) and **3 accelerometers** (N–S, E–W, vertical); typically **three IRUs** for redundancy. Self-contained.
- Needs its **initial position** entered while **stationary on the ground**; then computes position from accelerations. Supplies attitude, heading, accelerations and rates to the FMS. **Drift**: accuracy degrades with time. Switched off and on in flight → **ATT mode only** (attitude and heading).
- **Gimballed INS** (older): platform held level and north-aligned mechanically by gyros. **Strap-down IRS** (modern): **RLGs fixed to the airframe**, platform stabilised **mathematically**.
- **Principle**: Newton's laws — acceleration measured on each axis, **integrated once for velocity (groundspeed)** and **again for distance**. Needs **TAS** (from the ADC) to compute **wind**; may take pressure altitude for height. The platform corrections cover manoeuvres, transport wander, earth rate, Coriolis.
- **Alignment (gyro-compassing)**: warm-up (**3–4 min**); coarse levelling and alignment (to ~±1°); **gyro-compassing** — accelerometers find the **gravity vertical**, a gyro senses **earth rate (15.04°/h)** to find **true north and latitude** (successive approximation; about **10 min at the equator**, longer towards the poles — book ~15 min typical; entering latitude speeds it). **Longitude must be entered** (or taken from the stored shutdown position). Faster **reference alignment**: transfer from another gyro, synchro memory, HUD/threshold position.
- **Modes**: OFF, **STBY** (power, enter position), **ALIGN** (must be **stationary**), **NAV** (select **before moving**), **ATT**.
- **Advantages**: accurate, **autonomous, passive (no emissions)**, all-weather, worldwide.

### INS errors (6-26)
- **Real drift** from imperfections — integrated into position error (book: up to ~**2 nm/h**); reduced by GPS updating. **Apparent/transport wander** from meridian convergence. **Coriolis** and **earth rotation** — predictable, compensated.
- **Schuler loop**: an accelerating platform tilts and senses part of gravity; **Schuler tuning** (84.4-minute period) makes the error oscillate — **maximum at 42.2 min, back to zero at 84.4 min**.
- **Bounded errors** (oscillate, Schuler-limited): platform tilt, **accelerometer bias**, first-stage integrator errors. **Unbounded errors** (grow with time): **initial azimuth misalignment**, **azimuth gyro wander**, levelling gyro topple, second-stage integrator errors.
- **Kalman filter**: blends INS (good short-term, drifts long-term) with external fixes (GPS, DME/DME, VOR/DME — good long-term) using their known error characteristics to give the **best hybrid position**.

### Ring-laser gyro (6-27)
- **Sagnac effect**: two laser beams travel **in opposite directions** round a closed path (3+ mirrors) in a **helium–neon** cavity. Stationary → same frequency; rotating → the path lengthens for one beam and shortens for the other → **frequency difference ∝ rotation rate** (Δf = 4AΩ/λL). Lasers: monochromatic, coherent, directional. **Fibre-optic gyro**: coiled fibre instead of mirrors.
- **Errors**: thermal (path expansion), **null shift** (output with no rotation), scale factor, accuracy ∝ path length, **lock-in** at very low rotation rates (beams lock together) — cured by a **dither** motor.
- **Advantages**: **fast start-up (< 10 min)**, **no moving parts**, little maintenance, reliable, **insensitive to g**, low drift, digital output.

### Autopilot and autoland (6-28)
- Guidance: speed, altitude, heading, VOR/LOC tracking; stabilisation: pitch, wings level, **yaw damping**. **Auto-trim in pitch only**. Engaged with no mode → basic stabilisation.
- Overhead a VOR (**cone of confusion**) it holds the last heading; after the last waypoint it reverts to heading mode. Changing the altimeter sub-scale in altitude hold does **not** change the held altitude. A **synchronisation** unit prevents engagement when unserviceable and stops snatching on disconnect. **Go-around**: autothrottle to **TOGA**, pitch ~**15°** up; gear raised manually. Single-pilot night IFR needs at least heading and altitude hold.
- **Yaw damper**: senses yaw rate and applies opposite rudder ∝ rate — **prevents Dutch roll**.
- **Autothrottle**: thrust to hold the speed/Mach or thrust the autopilot demands (take-off/climb power, cruise speed).
- **Semi-autoland**: autopilot to **DH**, then manual landing. **Autoland**: coupled ILS + flare + rollout. **Cat IIIA**: autoland completed at the start of the landing roll; **Cat IIIB**: includes **roll-out**, pilot disconnects at the end.
- **Fail-passive** (2 autopilots): a failure causes no significant out-of-trim or path deviation, but **the autoland is abandoned** (pilot lands). **Fail-operational** (3+): after a failure below alert height the landing **continues automatically** (then fail-passive).
- **Autoland sequence** (book): **2500 ft** RA active; **1500 ft** LOC and GS captured, other autopilots engaged, flare armed; **330 ft** stabiliser trims nose-up; **50 ft** GS disconnected, **flare** (ROD to ~2 ft/s), autothrottle retards; **~5 ft** flare ends, touchdown, **roll-out**; elevator holds nose down; reversers; autopilot on until the pilot disconnects.

### EFIS (6-29)
- **EADI/PFD** (attitude from IRS, flight-director commands, autopilot/autothrottle modes, LOC/GS, groundspeed, heading, radio altitude/DH) and **EHSI/ND** (heading — **magnetic between 73°N and 65°S**, true beyond; VOR/ILS, NAV, **MAP** and **PLAN** modes, full or 70° arc; nav-aids, airports, route, waypoints, **weather radar, TCAS**). Inputs from IRS, FMC, VOR/ILS/ADF, TCAS, radar.
- **Colours**: **white** — present data, scales; **green** — engaged modes, selected data; **magenta** — active route, FD commands, pointers; **cyan** — non-active/secondary data, sky; **yellow/amber** — **cautions**; **red** — **warnings**, heaviest precipitation.

### ECAM and EICAS (6-30)
- **ECAM (Airbus)** — basic: two side-by-side displays (left: messages, right: diagrams), no engine data. **Advanced**: upper display **primary engine data + warnings/cautions with actions in blue (turn green when done)**; lower display **secondary engine/system pages**. Modes: normal, advisory, failure (automatic), manual.
- **EICAS (Boeing)**: upper display **primary engine data (N1, EGT, EPR)** plus **warnings (red, with aural)** and **cautions (amber)** top left; lower display secondary engine/system data. One display fails → its data **compacted** onto the other (or moved to an EFIS screen); both fail → standby engine display. Modes: **operational, status, maintenance (ground only)**.

### FMS (6-31)
- **FMC + 2 CDUs** + navigation and performance databases. **Dual** mode (independent FMCs compared) or **single** (one takes over). Functions: flight planning, **position determination**, guidance (LNAV/VNAV to the autopilot/autothrottle), performance. Accuracy (book) ~0.05 nm/h.
- **Navigation database**: routes, SIDs, STARs, aerodromes, nav-aids — **no RT frequencies**; valid **28 days (AIRAC)**; updated **only on the ground**. Performance database: optimum levels and speeds.
- Start-up pages: **IDENT → POS INIT** (UTC, IRS position) **→ RTE → PERF INIT** (weight, fuel, cruise level, **cost index**) → CLB, CRZ, DES.
- **LNAV**: flies **great circles** between waypoints; position from IRS blended with GPS or radio — **DME/DME** best among radio fixes; DMEs used within ~**25 nm** (book). **VNAV**: vertical profile; **cost index 0 = minimum fuel (max range) economy**; "UNABLE NEXT ALT" if a constraint can't be met; cruise at econ speed to **TOD**. On a non-precision approach never descend below MDA even if the FMC path continues.

### Exam traps
- IRU = **3 gyros + 3 accelerometers**; integrate **twice** (acceleration → velocity → distance); needs **TAS** for wind.
- Align **stationary**; gyro-compassing finds **latitude and true north** but **not longitude**; quicker at the equator. NAV before moving; off/on in flight → **ATT only**.
- **Schuler period 84.4 min**, max error at **42.2 min**. Initial azimuth misalignment is **unbounded**; accelerometer bias **bounded**. **Kalman filter** blends sources.
- RLG = **Sagnac**, counter-rotating beams, frequency difference; **lock-in** cured by **dither**; < 10 min alignment.
- Yaw damper prevents **Dutch roll**; auto-trim **pitch only**. **Fail-passive**: no autoland after failure; **fail-operational**: lands anyway.
- EFIS colours: **magenta active route**, cyan inactive, amber caution, red warning, green engaged.
- Nav database **28 days**, no frequencies; **DME/DME** best radio fix; **cost index 0 = max range/min fuel**.

---

## 24. Radio Waves, Propagation and Communications

### Radio waves (7-3)
- AC in a wire produces an alternating magnetic field and so an **electromagnetic (EM) wave**: electric and magnetic fields **at right angles** to each other and to the direction of travel. In one medium they travel in **straight lines at the speed of light**; entering a denser medium they **slow and bend towards it** (refraction).
- **Square law**: to **double the range**, transmitter power must be **×4**.
- **Cycle** (1 per second = 1 Hz), **amplitude** (peak), **wavelength λ** (distance per cycle), **frequency f** (cycles per second). **c = f × λ** (c = 3 × 10⁸ m/s): 121.5 MHz → λ ≈ **2.47 m**.

| Band | Frequency | Wavelength |
|---|---|---|
| VLF | 3–30 kHz | 100–10 km |
| LF | 30–300 kHz | 10–1 km |
| MF | 300 kHz–3 MHz | 1 km–100 m |
| HF | 3–30 MHz | 100–10 m |
| VHF | 30–300 MHz | 10–1 m |
| UHF | 300 MHz–3 GHz | 1 m–10 cm |
| SHF | 3–30 GHz | 10–1 cm |
| EHF | 30–300 GHz | 1 cm–1 mm |

- **Typical aviation frequencies**: NDB/ADF **190–1750 kHz**; HF comm **2–25 MHz**; **marker beacons 75 MHz**; **localiser 108–112 MHz** (odd tenths); **VOR 108–118 MHz**; VHF comm **118–137 MHz**; **glideslope 329.15–335 MHz**; **DME 962–1213 MHz**; **SSR 1030 / 1090 MHz**; **GPS L1 1575.42 MHz**; **radio altimeter 4200–4400 MHz**; **MLS 5030–5090 MHz**; **weather radar 9375 MHz**; Satcom ~1.5–1.6 GHz down to aircraft.
- **Polarisation**: the plane of the **electric field**. Vertical polarisation needs a vertical aerial. **Circular** polarisation: the field rotates — reduces rain clutter on weather radar; aerial orientation not critical.
- **Polar diagram**: line joining points of equal signal strength. **Phase difference**: angular difference between two signals of the **same frequency**.
- **Refraction**: change of speed/direction between media — **less at higher frequency**. **Diffraction**: bending round obstacles — **less at higher frequency**. **Fading**: skywave signal varying through multipath or ionospheric changes — worst at **dawn and dusk**.
- **Attenuation** (loss of strength with distance) increases with **frequency** (VLF travels furthest), **absorption** (air, water vapour, dust), **depth of penetration**, **land** more than **sea**; **vertical polarisation** least.

### Propagation (7-5)
- **Surface wave** (ground wave): about **20 kHz–50 MHz**, follows the earth's curvature by **diffraction**; **lower frequency and higher power → longer range**.
- **Space wave**: **direct** (line of sight — VHF/UHF; refraction adds about **7%** to geometric range) and **ground-reflected**.
- **Super-refraction (ducting)**: VHF bent down, range up to **+40%** — with a **temperature inversion**, **high pressure/subsidence**, **high humidity** near the surface. **Sub-refraction** (rarer) cuts range by up to **20%**.
- **Sky wave** (HF, **2–30 MHz**): refracted back from **ionospheric layers** formed by solar UV — **D** (50–100 km), **E** (100–150 km), **F1/F2** (200–250+ km). Ionisation peaks about **1400 local**.
- **At night** the D layer vanishes, E rises, F1 and F2 merge — layers are **higher**, so skip distance grows: **use lower frequencies at night** ("half the day frequency").
- **Higher frequency → larger critical angle, longer skip distance, larger dead space**.
- **Critical angle**: smallest angle (from the vertical) at which the wave returns; less escapes to space. **Skip distance**: transmitter to first sky-wave return; max ≈ **1.43 √h** nm (book). **Dead space**: between the end of the ground wave and the first sky wave.

### Modulation (7-6)
- **Modulation**: putting information onto a carrier. **AM**: amplitude varies, frequency constant. **FM**: frequency varies, amplitude constant — clearer, less static, but shorter range and wider bandwidth; unsuitable below VHF. **Pulse modulation**: short bursts (radar, data). **Phase modulation**: phase varied (digital — MLS, GPS).

| | AM | FM |
|---|---|---|
| Power needed | more | less |
| Range | **longer** | shorter |
| Quality | static | **clearer** |
| Bandwidth | **less** | more |

- **Sidebands**: modulating a 900 kHz carrier with 1 kHz gives 899 kHz (LSB) and 901 kHz (USB); the **sidebands carry the information**; bandwidth here 2 kHz.
- **DSB** (double sideband, A3E): carrier + both sidebands — **all VHF/UHF voice**. **SSB** (single sideband, **J3E**): carrier and one sideband removed, restored at the receiver by a **BFO** — **HF**. SSB: better signal-to-noise, **half the bandwidth (twice the channels)**, much **less power**, less fading.

### Communications (7-7)
- **LF/VLF**: very long range (LF ~2000 km, VLF 5000–20,000 km) but heavy **static**, high power, large aerials (≥ ½ λ).
- **HF (SSB)**: **2–25 MHz**, sky wave → long range; less static than LF; used for **oceanic** voice and **HF datalink (USB)**. Higher frequency → more skip; lower frequencies at night. **MUF** — highest usable frequency between two points; **optimum working frequency ≈ 0.85 MUF**. Range depends on frequency, time of day, season, location, **11-year sunspot cycle**, ionospheric disturbances (sporadic E).
- **SELCAL**: ground station sends a **4-letter code** that sounds a chime, so the crew need not keep a listening watch on HF. Letters **A–S, excluding I, N, O**; letters 1–2 and 3–4 each in **ascending order** within the pair (e.g. CD-AM valid).
- **VHF**: **117.975–137 MHz**, **8.33 kHz** channel spacing, **AM (A3E, DSB)**, **line of sight**, vertically polarised. **Range (nm) ≈ 1.23 (√h_tx + √h_rx)** (heights in ft). Affected by heights, obstacles, power, multipath fading.
- **UHF**: 225–400 MHz (military), line of sight, little affected by static/weather.
- **Satcom**: **INMARSAT** — **4 geostationary satellites** (~35,800 km) cover about **80°N–80°S** (not the poles).
- **Simplex** (one at a time), **duplex** (both at once), **semi-duplex**.
- **Transmitter**: microphone → speech processor → pre-amplifier → **RF (crystal) oscillator** → modulator/mixer → power amplifier. **Superheterodyne receiver**: incoming RF mixed with a **local oscillator** to a fixed **intermediate frequency (IF)**, amplified, filtered, demodulated. Receiver qualities: **selectivity, sensitivity, fidelity**.
- **BFO (beat frequency oscillator)**: mixes a near-frequency signal with the received carrier to give an audible **beat** — needed for unmodulated Morse (A1A) and to restore the carrier on SSB.
- **Aerials**: length **½ λ or ¼ λ**. **Dipole** (mainly electric field), **loop** (mainly magnetic), **Yagi-Uda** (driven element + shorter directors + longer reflector → directional, high gain). **Gain** in decibels: **dB = 10 log (power ratio)** (100× = 20 dB).
- **Emission designators**: 1st symbol modulation (**N** none, **A** AM DSB, **J** SSB suppressed carrier, **F** FM, **P** pulse); 2nd nature of signal (**0** none, **1** keyed digital without sub-carrier, **2** keyed with sub-carrier, **3** analogue, **8**/**9** composite); 3rd information (**N** none, **A** telegraphy, **E** telephony, **W** combination). E.g. **VHF voice A3E**, **HF J3E**, **NDB N0N A1A / A2A**, **VOR A9W**, **DME P0N**, ILS A8W.

### VDF (7-10)
- **VHF direction finding**: the **ground station** measures the bearing of the aircraft's transmission and gives **QDM** (magnetic heading to steer to the station, nil wind) or **QTE** (true bearing from the station).
- **Accuracy classes**: **A ±2°, B ±5°, C ±10°, D worse than C** (book also pairs ±5/20/50 nm for position).
- Range as for VHF; accuracy affected by **site/propagation errors** (reflections), **aircraft attitude** (best straight and level — vertical polarisation), **cone of confusion overhead**, simultaneous transmissions.
- **VDF approach** (pilot works out headings) vs **QGH** (controller gives headings and descent).

### Exam traps
- **c = fλ**; 121.5 MHz ≈ 2.47 m. Double range → **4× power**.
- Polarisation = plane of the **electric** field. Higher frequency → **less** refraction, diffraction; **more** attenuation.
- Surface wave up to ~50 MHz, better at **low frequency**. VHF range ≈ **1.23 (√h₁ + √h₂)** nm; refraction +7%; ducting up to +40% (inversion, high pressure, moist surface).
- Sky wave **2–30 MHz**; at night layers rise → **lower frequency**. Higher frequency → longer skip and dead space.
- AM: longer range, narrower band; FM: clearer. **VHF voice A3E (DSB); HF J3E (SSB)**; SSB needs a **BFO**.
- HF working frequency ≈ **0.85 MUF**. SELCAL **4 letters A–S, no I/N/O**.
- VHF comm **117.975–137 MHz, 8.33 kHz**. INMARSAT 4 satellites, **80°N–80°S**.
- Superhet: mix with **local oscillator** → **IF**. Yagi: reflector longer, directors shorter.
- VDF classes **A ±2°, B ±5°, C ±10°**; QDM vs QTE.

---

## 25. NDB and ADF, VOR and DME

### NDB (7-11)
- The ground transmitter for the ADF: **vertically polarised AM**, all directions, **LF/MF 190–1750 kHz** (NDBs actually 190–450 kHz, clear of the old 500 kHz distress frequency; the ADF also tunes broadcast stations). Bearings within the **DOC** (promulgated **for day only**) should be within the stated tolerance (the scan reads "45°", probably ±5°).
- **N0N A1A**: unmodulated carrier, identified by **interrupting (keying) the carrier** — needs a **BFO** to hear the ident. **N0N A2A**: identified by a **1020 Hz tone** amplitude-modulated on — **no BFO** needed for the ident (only for tuning), wider bandwidth.
- **Locator** (at the outer/middle marker, low power, ~**25 nm**, A2A), **homing/holding** (~**50 nm**), **en-route** (~**200 nm**), **marine** (coastal).
- **Range ≈ 2√P (nm) over land, 3√P over sea** (P in watts): 1600 W over sea → 120 nm. Range improves with power (×4 for 2× range), lower frequency, sea paths; reduced by mountains.

### ADF (7-12)
- Gives a **direct relative bearing** of the NDB (unlike VOR, whose radial is encoded at the transmitter).
- **Loop aerial**: the voltage depends on the **phase difference** between the arms — **maximum** when the loop's plane is **in line** with the signal, **zero (null)** when it is **across** it → a **figure-of-eight** polar diagram with **180° ambiguity**.
- **Sense aerial**: omnidirectional (circular polar diagram); added to the loop it forms a **cardioid** with a **single null** → ambiguity resolved. Modern ADFs use **fixed crossed coils (goniometer)** instead of a rotating loop.
- NDBs don't use HF because sky waves would also arrive at the horizontal parts of the loop and give erratic bearings.

### ADF errors (7-13)
- **Beyond DOC** / **station interference** (crowded LF/MF bands).
- **Precipitation static**: the needle **wanders**; **thunderstorms**: the needle **points towards the lightning/CB**.
- **Mountain effect**: reflections and diffraction at low level — fly higher.
- **Night effect**: at night **sky waves** arrive along with the surface wave and **blur the null** — errors up to **30°** beyond about 70–100 nm, worst at **dusk and dawn**.
- **Coastal refraction**: crossing from land to sea at an angle, the surface wave speeds up and **bends away from the normal**, so the bearing is wrong — **no error when it crosses the coast at 90°**; use NDBs near the coast, take bearings at right angles to the coast, fly higher.
- **Dip (bank) error**: in a bank the loop is tilted — only when not level.
- **Quadrantal error**: the airframe distorts the field; maximum at relative bearings **045°, 135°, 225°, 315°**.
- **Loop misalignment**: error equal to the misalignment.
- **No failure warning** — unlike VOR, a faulty ADF gives no flag.

### VOR (7-14)
- **Bearing by phase comparison**. Frequencies **108.0–111.95 MHz (even tenths; odd tenths are ILS)** and **112.0–117.95 MHz**; **horizontally polarised**; VHF so **no static or night effect**. **3-letter Morse ident** at least every 10 s (may carry voice ATIS).
- **Reference signal**: **30 Hz FM** on a **9960 Hz sub-carrier**, the same phase in all directions (circular polar diagram).
- **Variable signal**: a figure-of-eight pattern **rotated electronically 30 times a second** → **30 Hz AM** whose phase depends on the direction (together a rotating **limaçon**). The two are **in phase on magnetic north**; the **phase difference = the radial** (e.g. 227° → radial 227).
- The aircraft receiver does not measure a bearing like an ADF — it decodes the phase that was set at the transmitter.
- **C-VOR**: conventional. **D-VOR (Doppler)**: the reference is **30 Hz AM** and the variable is **FM** made by the Doppler effect of a rotating aerial — **far less site error**, no change to airborne equipment. **T-VOR**: terminal, low power (~50 W), < 50 nm. **B-VOR**: broadcast (voice). **VOT**: test VOR (often 108.0 MHz) radiating **000° everywhere** — the receiver should show **radial 360 (from)/RMI bearing 180°**; ground test tolerance **±4°**.
- **Cone of confusion**: overhead, no usable signal — ICAO: at least 40° from the horizon; in practice up to ~80°.
- **Advantages**: easy left/right CDI indications, **failure flag**, small aerial, no static/night effect, paired DME.

### VOR accuracy, range and monitoring (7-15 to 7-16)
- Errors: **beacon alignment** (site monitor), **site error** (terrain/obstacles round the beacon, ±2°; **D-VOR** reduces it), **propagation** (±1°), **interference** (DOC), **airborne equipment** (±3°).
- Ground transmission within **±3° (95%)**; total with the receiver within **±5° (95%)**. Receiver checks: **airborne checkpoint ±6°**, **ground checkpoint or VOT ±4°**.
- Range = line of sight: **1.23 (√h_tx + √h_rx)** nm, e.g. aircraft 2500 ft, beacon 196 ft → **79 nm**. En-route VOR ~200 W ≈ 200 nm. **DOC promulgated for day and night**.
- **Monitor** switches the VOR off (or to standby) if bearing shifts by **1°** (book), signal falls by **15%**, or the monitor fails.
- **HSI/CDI**: **OBS** selects the course; CDI full-scale **±10°** (5 dots, **2° per dot**); **TO/FROM** flag; warning flag for aircraft equipment, station or indicator failure, or weak signal.
- **TACAN**: military UHF **pulse** system giving bearing and distance (not civil-VOR compatible). **VORTAC**: VOR + TACAN co-located — VOR azimuth, TACAN azimuth and TACAN (DME) distance.

### DME (7-17)
- **Secondary radar**: the aircraft **interrogator** sends **pulse pairs**; the ground **transponder** replies **63 MHz** away after a fixed **50 µs** delay; the aircraft recognises its own random pulse spacing and measures the time → **slant range**.
- **962–1213 MHz (UHF)**, 1 MHz spacing, **252 channels (126 interrogation + 126 reply)**; paired with VOR/ILS frequencies. Co-located with a VOR within **100 ft** in a TMA, **2000 ft** elsewhere (book).
- **Search** mode: **150 pulse pairs/s** for 100 s, then 60; **tracking**: **25 pp/s**.
- **Beacon saturation**: designed for about **100 aircraft** (~27 pp/s each → ~**2700 pp/s**, which it transmits continuously as "squitter"); above that it **reduces receiver gain** and answers only the **strongest (nearest)** 100.
- **Accuracy ±0.25 nm or ±1.25% of range** (whichever greater). Shows **slant range** — overhead it shows **height** (≈ 1 nm per 6000 ft); groundspeed/time only correct when flying **directly to or from** the station. Not affected by rain (UHF). Allows DME arcs and fixes.

### Exam traps
- NDB: **vertically polarised**, LF/MF; A1A needs a **BFO**, A2A ident is a **1020 Hz tone**. Range ≈ **2√P land, 3√P sea**. DOC **day only**.
- ADF: loop = **figure-of-eight**, sense aerial = **circle**, together a **cardioid** (one null).
- Night effect up to **30°**, worst dawn/dusk; **quadrantal error at 45° relative bearings**; coastal refraction least at **90°**; thunderstorm needle points at the **CB**; **no failure warning**.
- VOR: **30 Hz reference FM on 9960 Hz** + **30 Hz variable AM**; in phase at **magnetic north**; phase difference = radial. **Horizontally polarised.** D-VOR swaps AM/FM and cuts **site error**.
- VOT: needle reads **180° (radial 360 from)**; tolerance ±4° ground, ±6° airborne. VOR system ±5°.
- CDI ±10° full scale, **2°/dot**. VOR range = **1.23 (√h₁ + √h₂)**.
- DME: **UHF 962–1213 MHz, reply ±63 MHz, 50 µs delay**, **slant range**, ~**100 aircraft**, ±0.25 nm/1.25%.

---

## 26. ILS, MLS, Radar and SSR

### ILS (7-18)
- **Approach guidance by lobe comparison** (difference in depth of modulation, DDM). Ident: **4 letters beginning with "I"**. Only one runway direction's ILS on at a time. **Glideslope u/s → becomes a non-precision (LOC) approach; localiser u/s → no ILS approach.**
- **Localiser**: aerial array about **1000 ft beyond the upwind end**; two overlapping lobes on the centreline — **90 Hz on the left, 150 Hz on the right** (as seen on approach). Zero DDM = on centreline; left of centreline you receive more 90 Hz. **108.1–111.95 MHz, odd tenths** (40 channels). Coverage **±10° to 25 nm**, **±35° to 17 nm** (reduced coverage 18/10 nm). **Full-scale deflection** set to **±700 ft at the threshold**. **Back course**: lobes also radiate backwards — use only if a procedure is published; indications are **reversed**.
- **Glidepath**: aerial about **1000 ft in from the threshold, ~120 m to the side**; **90 Hz above, 150 Hz below**; **329.15–335.0 MHz** (UHF), paired with the localiser. Coverage **±8° in azimuth to 10 nm**, vertically **0.45θ to 1.75θ** (3° path → 1.35°–5.25°). Normally **3°**, crossing the **threshold at ~50 ft**.
- **Marker beacons** (**75 MHz**, ~3 W, fan-shaped vertical beams): **Outer** — **blue**, **dashes (400 Hz)**, **3.5–6 nm** (≈ FAF); **Middle** — **amber**, **dot-dash (1300 Hz)**, ~**3000–4000 ft** (≈ Cat I DH, 200 ft); **Inner** — **white**, **dots (3000 Hz)**, **1000–1500 ft** (≈ Cat II DH, 100 ft). Often replaced by **ILS/DME**, which reads zero at the threshold.
- **Monitoring**: switched off within **10 s (Cat I)** / **2 s (Cat II/III)** if the localiser shifts **35/25/20 ft** (Cat I/II/III), the glide angle changes by **0.075θ**, or power falls **50%** (book). A degraded Cat III ILS may still serve Cat II/I.
- **False glideslopes**: repeated lobes at multiples of the angle — the first at about **6° (2θ)**, with **reversed sense** at some. **Always intercept the glideslope from below.**
- Errors: atmospheric refraction, **heavy rain/snow**, **scalloping** (reflections → rapid needle fluctuations), **FM broadcast interference**, false glidepaths, vehicles/aircraft in the **critical** and **sensitive areas**. ILS **critical area**: no vehicles/aircraft when the arriving aircraft is inside the FAF and weather is below ~800 ft/2 nm (book); **sensitive area**: movement controlled; aircraft hold at **ILS holding points**.
- **Rules of thumb**: height on the glidepath ≈ **distance (nm) × angle × 100 ft** (3° → **300 ft per nm**); **ROD ≈ GS (kt) × 5** on a 3° path (GS/60 × angle × 100); 3° = **5.2%** gradient.

### MLS (7-20)
- **5030–5090 MHz (SHF), 200 channels**; **time-referenced scanning beams** — "to" and "fro" sweeps; the time between them gives the angle. One frequency, **time-shared** between azimuth, elevation, back azimuth, flare and data.
- **Azimuth ±40° to 20 nm**, elevation **0.9°–15°** up to 20,000 ft; back azimuth ±20°, 10 nm; precision DME (~100 ft).
- **Advantages**: wide coverage — **curved and segmented approaches**, selectable glide angles; less siting/multipath trouble (hilly terrain); no back-course problem; 200 channels; built-in DME; ILS-like display.

### Primary radar (7-21)
- **Reflected energy** on the same frequency; **echo principle for range**, **searchlight principle for bearing**; one shared aerial.
- **Pulse width**: duration of the pulse (at half strength). **Beam width**: angle within which power is > half the peak. **PRF**: pulses per second; **PRI = 1 ÷ PRF**.
- **Maximum unambiguous range = c × PRI ÷ 2** (PRI 1246 µs → 187 km); higher PRF → **shorter** max range. **Minimum range ≈ c × pulse width ÷ 2** (shorter pulse → shorter minimum). Echo after 500 µs → 75 km.
- Range also depends on **power (double range needs 16× power)**, target radar cross-section, heights (line of sight), wavelength/attenuation, refraction.
- **Range resolution** ↑ with **shorter pulses**; **bearing resolution** ↑ with **narrower beams** (bigger aerial, shorter wavelength). FMCW radar has no minimum range.
- Wavelengths: terminal surveillance **10/23/50 cm**, aerodrome surveillance **3 or 10 cm**, **PAR 3 cm**.

### Doppler radar (7-22)
- **Doppler shift**: frequency change from relative motion; for a radar beam going out and back **f_D = 2V cos θ ÷ λ** (θ = beam depression). Doppler navigators (**8.8 or 13.3 GHz**) give **groundspeed and drift** to ~0.3%; best depression angle about **67°**.
- Systems: single beam, **2-beam**, **3-beam (λ-Janus/T-Janus)**, **4-beam X-Janus** (most accurate; Janus = beams fore and aft, cancelling pitch error).
- **Advantages**: self-contained, accurate, worldwide, no warm-up. **Disadvantages**: can be jammed/intercepted; needs position updates (it gives velocity, not position).
- **Errors**: **height hole** (echo returns while transmitting — vary PRF), **sea bias** (smooth sea reflects energy away → **groundspeed under-reads 2–3%**), **sea movement** (currents/tides, up to 7–8 kt), **pitch/flight-path and roll** errors (stabilised aerials, Janus), aerial misalignment, computational (arc length with height).
- **Pulse-Doppler radar**: pulse radar that also measures Doppler; **high PRF for velocity, low PRF for range** (ambiguity trade-off). **SAR** (synthetic aperture): uses aircraft motion to simulate a long aerial → high-resolution sideways mapping, even at night. **Phased array (ESA)**: many fixed elements, beam steered by **phase shifts** (passive — one transmitter; active — each element transmits); fast steering, graceful degradation, multi-mode; distorts beyond ~60°.

### Weather radar (7-25)
- **Pulse-Doppler**, searchlight/echo; scans **±60° in azimuth**, ±15° tilt; stabilised to ±25° pitch / ±40° roll; **pencil beam 3–5°** for weather; **cosecant (fan) beam** for **ground mapping** (power rises with range so near and far ground show evenly).
- **9375 MHz (≈ 3 cm)** is optimum — it reflects strongly from **large drops and wet hail** in convective cloud (longer wavelengths miss turbulence, shorter ones give clutter from small droplets).
- **Gain**: normally **auto (STC/swept gain)**; manual gain to find the **strongest cells** by slowly reducing it, or to boost weak returns at 70–120 nm.
- **Predictive windshear**: Doppler detection of microburst outflow; auto-active **below ~2300 ft** even with radar off/standby; scans ±90°, processes ±45°; **advisory/caution/warning** as the event gets closer (book: 5, 3, 1.5 nm). Cannot see dust storms, lightning or **CAT** (no drops).
- **Display**: **black** — none/very light; **green** — light (0.7–4 mm/h); **yellow/amber** — medium (4–12 mm/h); **red** — heavy (> 12 mm/h); **magenta** — turbulence/extreme. Most turbulence where colour **gradients are steepest**; **hooks, fingers, U-shapes, scalloped edges** → hail/tornado; **radar shadow** behind heavy cells.
- **Cloud-top height** ≈ **(tilt − ½ beam width) × range (nm) × 100 ft** above the aircraft. **Beam width ≈ 70 λ ÷ D** (3 cm, 45 cm dish → 4.7°).

### SSR (7-27)
- Secondary radar: ground **interrogates on 1030 MHz**, the aircraft **transponder replies on 1090 MHz**; needs a cooperating transponder (operate it always; **IDENT only when asked**).
- **Interrogation**: P1 and P3 from the directional aerial; P2 from an omni aerial 2 µs after P1 for **side-lobe suppression** (reply only if P1 > P2 — prevents **ghosting**).
- **Reply**: framing pulses **F1 and F2 20.3 µs apart** with **12 information pulses → 4096 codes (digits 0–7 only)**; **SPI** pulse (IDENT) 4.35 µs after F2, for ~20 s.
- **Modes** (P1–P3 spacing): **A 8 µs (identity)**, **C 21 µs (pressure altitude in 100 ft)**, B 17 µs, **S** (selective address — **24-bit address, ~16 million codes**, **25 ft** altitude, datalink; no garbling/fruiting; backward compatible).
- **Advantages**: independent of target size, **long range on low power (~250 nm)**, extra data, no weather/ground clutter. **Disadvantages**: only 4096 codes (A/C), aircraft without transponders invisible.
- **Errors**: **garbling** (two replies overlapping — aircraft within **1.7 nm** in range on a similar bearing), **fruiting** (replies triggered by another interrogator), **ghosting** (side-lobe replies).
- **Codes**: **7500 unlawful interference**, **7600 radio failure**, **7700 emergency**; **2000** entering radar cover without a code; **7000** VFR conspicuity; **7004** aerobatics/display; **0033** paradropping; **0000** (book) transponder fault.

### Exam traps
- Localiser **90 Hz left/150 Hz right**, glidepath **90 Hz above/150 Hz below**. LOC odd-tenth 108.1–111.95 MHz; GP 329–335 MHz (UHF).
- Coverage: LOC **±10° 25 nm, ±35° 17 nm**; GP **±8°, 10 nm, 0.45θ–1.75θ**. Full scale ±700 ft at threshold. TCH ≈ **50 ft**.
- Markers **75 MHz**: **outer blue dashes 400 Hz**, **middle amber dot-dash 1300 Hz**, **inner white dots 3000 Hz**.
- False glideslope ~**6°** → intercept **from below**. 3° path: **300 ft/nm**, ROD ≈ **5 × GS**.
- MLS **5 GHz, 200 channels, ±40°, curved approaches**.
- Primary radar: **max range ↑ as PRF ↓**; min range ↓ with shorter pulse; range resolution = pulse width; bearing resolution = beam width; 2× range = **16× power**.
- Doppler groundspeed and drift; **sea bias under-reads**; Janus cancels pitch error.
- Weather radar **9375 MHz (3 cm)**; red = heavy; **magenta = turbulence**; steepest gradient = worst; cosecant beam for mapping; can't see CAT.
- SSR **1030 up / 1090 down**; **4096 codes**; mode C **100 ft**, mode S **25 ft**; garbling **1.7 nm**; **7500/7600/7700**.

---

## 27. GNSS, GPWS, ACAS, ADS and Datalink

### GNSS (7-29)
- Systems: **GPS/NAVSTAR (USA, datum WGS-84)**, **Galileo (Europe, ETRS89)**, **GLONASS (Russia, PZ-90)**.
- **Space segment**: **24 satellites** (21 + 3 spares) in **6 orbital planes at 55°**, **20,180 km** high, **12-hour** orbits; each carries **atomic clocks**.
- **Control segment**: **master control station at Colorado Springs** (backup Onizuka); **5 monitor stations** (Colorado Springs, Ascension, Diego Garcia, Kwajalein, Hawaii) track satellites and upload **ephemeris and clock corrections**.
- **User segment**: sequential, multiplex, or **multi-channel** receivers (track several satellites at once — preferred for aviation). **PPS** (P-code, military, ~16 m; selective availability) and **SPS** (C/A code, civil — about **13 m horizontal, 22 m vertical, 95%**).
- **Principle**: satellites broadcast **position, time (PVT), ephemeris and almanac** on **L1 1575.42 MHz**. The receiver measures **pseudo-ranges** (timing with its imprecise clock). With **4 satellites** it solves **4 equations for x, y, z and the receiver clock error**. A full almanac download takes about **12.5 min**. Best geometry: one satellite overhead and three spread round the horizon (~120° apart).

### Integrity and augmentation (7-30)
- **RAIM (ABAS)**: the receiver checks its own integrity — needs **5 satellites** (or **4 + baro-aiding**). **Predictive RAIM** forecasts availability. **FDE (fault detection and exclusion)** also removes a bad satellite — needs **6** (or 5 + baro); essential for PBN.
- **GBAS (LAAS)**: a surveyed ground station at the airport computes corrections and sends them by **VHF datalink** — **~1 m**, supports **precision approaches** (GLS, Cat I and beyond); ILS-like display; serves 26–48 aircraft.
- **SBAS (WAAS)**: ground monitors → master station → **geostationary satellite** → aircraft: ~1 m lateral, 1.5 m vertical. **GAGAN (India)**, **EGNOS (Europe)**, **MSAS (Japan)**, WAAS (USA). (The book classes SBAS approaches as non-precision/APV.)

### GPS errors (7-31)
- **Selective availability**: deliberate civil degradation — **switched off 1 May 2000**.
- **Ephemeris** (orbit) error; **satellite clock** error (~1.5 m); **ionospheric** delay — the **largest** error (~5 m), least with the satellite overhead (dual-frequency receivers remove it); **tropospheric** (~0.5 m); **multipath** (reflected signals; special aerials); **GDOP** — poor satellite geometry magnifies errors (up to ~20 m); receiver noise (~0.3 m); solar disturbances.

### GPWS and EGPWS (7-32)
- **GPWS**: visual/aural warnings of terrain **below** the aircraft; inputs **radio altimeter, barometric altitude/ADC, ILS glideslope**, configuration. Mandatory above **5700 kg or > 9 passengers** (book). Works roughly **50–2450 ft AGL**.
- **On a warning**: wings level, **maximum power**, climb at **best angle (Vx)** — unless in VMC with the cause positively identified.
- **EGPWS** adds **GPS position + a terrain database** to look **ahead**: **TAD (terrain awareness display)** — terrain coloured relative to aircraft altitude (**red** > 2000 ft above, **yellow** around the aircraft's level, **green** below, black well below), auto pop-up at 10 nm range; **TCF (terrain clearance floor)** — protects against premature descent near runways regardless of configuration. RA failed → basic GPWS and TCF lost, TAD remains; no terrain data → basic GPWS only.

| Mode | Hazard | Alerts |
|---|---|---|
| **1** | **Excessive sink rate** | "SINK RATE", "WHOOP WHOOP PULL UP" |
| **2** | **Excessive terrain closure rate** | "TERRAIN TERRAIN", "PULL UP" |
| **3** | **Altitude loss after take-off/go-around** (50–700 ft, ~10% loss) | "DON'T SINK" |
| **4A/4B** | **Unsafe terrain clearance, gear/flaps not down** (< 200 ft RA) | "TOO LOW GEAR", "TOO LOW FLAPS", "TOO LOW TERRAIN" |
| **5** | **Below glideslope** (gear down, < 1000 ft; 1.3 dot soft, 2.5 dot loud) | "GLIDESLOPE" |
| **6** | **Minimums / altitude call-outs; bank angle** | "MINIMUMS", "BANK ANGLE" |
| **7** | **Windshear** (reactive; predictive via radar) | "WINDSHEAR" |

### ACAS / TCAS (7-34)
- Gives **TA (traffic advisory)** and **RA (resolution advisory)** from the replies of other aircraft's transponders — independent of ATC. **If an RA conflicts with ATC, follow the RA.** Mandatory in **RVSM** airspace. Priority (book): **stall > windshear > GPWS > ACAS > ATC**; during a GPWS warning ACAS drops to TA only.
- **TCAS I**: TAs only (~40 nm). **TCAS II**: TAs + **vertical RAs**, coordinated between aircraft (one climbs, the other descends); version 7.1 adds **RA reversals** and "LEVEL OFF". **TCAS III** (horizontal RAs) was abandoned.
- Works on **1030/1090 MHz** in air-to-air SSR mode; range from reply time, altitude from mode C/S reports, bearing from directional aerials; protected volume depends on speed and altitude. Only sees **transponding** aircraft; **mode A only → TA without altitude**; mode C → TA and RA; mode S both → coordinated RAs.
- **Display**: **other traffic** — hollow cyan diamond; **proximate** (within **6 nm, ±1200 ft**) — **solid cyan diamond**; **TA** — **solid amber/yellow circle**, "TRAFFIC, TRAFFIC", ~**20–48 s** from CPA — **no manoeuvre on a TA**; **RA** — **solid red square**, ~**15–35 s** from CPA. ± sign and number = relative altitude in hundreds of feet; arrow = climbing/descending > 500 fpm.
- **Preventive RA** ("MONITOR VERTICAL SPEED") vs **corrective RA** ("CLIMB", "DESCEND", "LEVEL OFF"). Respond to the first RA within **5 s** (0.25 g), to later RAs within **2–3 s** (0.5 g); usually only 300–500 ft of deviation.
- Inhibitions (book): no TA/RA below ~400–600 ft; **no RAs below ~900–1100 ft**; no descend RAs below ~1000–1200 ft; no climb RAs with gear and flaps down or at the ceiling; on the ground TA only.

### ADS, ACARS, CPDLC and others (7-36 to 7-39)
- **ADS-B (broadcast)**: aircraft broadcasts its GPS position, velocity and identity about every second — **ADS-B out**; reception — **ADS-B in**. On **1090 MHz extended squitter** or **978 MHz UAT**. Not for collision avoidance manoeuvres; non-equipped aircraft invisible.
- **ADS-C (contract)**: reports sent to a ground unit under agreed contracts — **periodic**, **demand**, **event** (waypoint change, level-range deviation, lateral deviation, vertical-rate change); up to 5 ground systems; pilot can switch it off. Oceanic surveillance.
- **ADS-R**: ground rebroadcast between the two ADS-B frequencies.
- **ACARS**: older text datalink (VHF or satellite) — ATC, **AOC (operational)** and **AAC (administrative)** messages.
- **CPDLC**: two-way **controller–pilot datalink** replacing voice for routine messages; pilot logs on via the FMS; **keep a voice listening watch**; revert to voice if unclear; with ADS-C, **ADS is the primary surveillance and CPDLC the primary communication**. India (book): log on **20 min before Delhi FIR**, **10 min before oceanic** FIRs.
- **TIS-B** (ground-broadcast traffic from SSR/ADS-B; advisory, 3–13 s delay), **FIS-B** (weather/aeronautical data on 978 MHz), **TLS** (transponder landing system — ground interrogates the transponder and radiates ILS-type guidance for one aircraft), **FANS** (CNS/ATM: **ADS + CPDLC + RNP/GPS**; FANS-1 Boeing, FANS-A Airbus).
- Legacy hyperbolic systems: **LORAN-C** (100 kHz), **Decca** (VLF/LF), **Omega** (VLF, global) — all shut down.

### Exam traps
- GPS: **24 satellites, 6 planes, 55°, 20,180 km, 12 h**; master control **Colorado Springs**; **L1 1575.42 MHz**; **4 satellites** for 3-D fix + clock. Datum **WGS-84**.
- RAIM **5** (or 4 + baro); FDE **6** (or 5 + baro). GBAS = airport, VHF, precision; SBAS = geostationary (GAGAN in India).
- Biggest GPS error: **ionospheric**. SA off since **2000**.
- GPWS modes: **1 sink rate, 2 terrain closure, 3 loss after take-off, 4 too low gear/flaps, 5 below glideslope, 6 call-outs/bank, 7 windshear**. EGPWS adds **look-ahead (TAD, TCF)**.
- GPWS action: wings level, **full power**, climb at **Vx**.
- TCAS II: **vertical RAs only**; follow RA over ATC; TA = **no manoeuvre**; RA response **5 s**. Symbols: hollow cyan (other), solid cyan (proximate 6 nm/1200 ft), **amber circle TA**, **red square RA**.
- ADS-B broadcast (1090 ES / 978 UAT); ADS-C contract (periodic, demand, event). CPDLC: keep voice watch.

---

## 28. Mass and Balance, and Declared Distances

### Mass terms (9-3)
- **Basic empty mass (BEM)**: airframe, engines, fixed equipment, **unusable fuel and fluids**, emergency oxygen and equipment (from the manufacturer/weighing).
- **Dry operating mass (DOM)** = BEM + **variable load**: **crew and their baggage**, catering, removable passenger-service equipment, potable water, lavatory chemicals — everything except usable fuel and traffic load.
- **Traffic load (TL)**: passengers, baggage, cargo (including non-revenue load). **Useful load** = traffic load + usable fuel.
- **Operating mass (OM)** = DOM + take-off fuel. **Zero fuel mass (ZFM)** = DOM + traffic load. **Take-off mass (TOM)** = DOM + TL + take-off fuel (= ZFM + fuel). **Landing mass (LM)** = TOM − trip fuel.
- **Structural limits** (manufacturer): **MZFM**, **max structural taxi (ramp) mass**, **MSTOM**, **MSLM**.
- **Performance limits** (operator, per aerodrome/obstacles/conditions): **PLTOM**, **PLLM**. **Regulated** TOM/LM = the **lower** of structural and performance limits.
- **Maximum traffic load** = the lowest of: **MZFM − DOM**; **RTOM − DOM − take-off fuel**; **RLM − DOM − fuel remaining at landing**.
- **Maximum take-off mass** = the lowest of: **MZFM + take-off fuel**; **RTOM**; **RLM + trip fuel**.
- **Standard masses** (book): flight crew **85 kg**, cabin crew **75 kg**; passenger standard masses depend on seating capacity (male, female, child 35 kg, infant 10 kg; include ~6 kg hand baggage).

### Documentation and weighing (9-4)
- **Mass and balance documentation** before every flight, **accepted and signed by the commander**; a **last-minute-change** procedure is required. Contents: registration/type, flight number/date, commander and preparer, **DOM and its CG**, take-off fuel, trip fuel, consumables, load components (passengers, baggage, freight, ballast), **TOM, LM, ZFM**, load distribution, CG positions, limiting masses and CG.
- **Weigh the aircraft**: on entry into service; **every 4 years**; after modifications; when the **DOM changes by > 0.5% of MLM** or the **DOM CG shifts by > 0.5% of MAC**.
- **Fleet masses**: weigh a sample; fleet weighing every **9 years**; an aircraft outside fleet tolerance is weighed individually.

### Centre of gravity (9-5)
- The point through which the whole weight acts; the aircraft rotates about it. Lies on the longitudinal axis but **need not be within the airframe**. Moves with fuel burn, passengers etc.; limits set by the manufacturer, kept by the operator.
- **CG position = total moment ÷ total mass**. **Moment = mass × arm**; **datum** chosen by the manufacturer; arms **aft of the datum positive, forward negative**.
- **CG as % MAC = (datum-to-CG − datum-to-MAC leading edge) ÷ MAC length × 100**. MAC = chord through the centroid of the wing area — the reference for stability.

| | CG forward | CG aft |
|---|---|---|
| Stability | **more** | less (neutral at the limit) |
| Stick forces | **heavier** | lighter |
| Manoeuvrability | less | **more** |
| Tail down-force, trim drag | **more** | less |
| Stall speed, VR, V2, VREF | **higher** | lower |
| Fuel consumption, range | more fuel, **less range** | less fuel, more range |
| Climb gradient | less | more |

- **Increasing mass**: higher **V1, VR, V2, VMD, VREF**; longer **TORR, TODR, ASDR, LDR**; more gear/brake and **wing-root** stress; more drag and fuel; **lower ceiling, climb gradient and ROC**, higher ROD; less range and endurance; less manoeuvrability. **No effect on VMCG/VMCA**.

### Declared distances (9-6)
- **TORA**: runway available for the take-off ground run. **TODA = TORA + clearway**. **ASDA = TORA + stopway**. **LDA**: runway available for the landing run.
- **Stopway**: beyond the TORA, **same width**, able to support an aircraft in an abandoned take-off (book: ≥ 30% of runway strength). **Clearway**: area (ground or water) beyond the TORA over which the initial climb to screen height may be made — **at most half the TORA**; width 150 m widening to 180 m (book); nothing projecting above a **1.25%** plane.
- **Obstacle clearance plane**: rises at **1.2%** from the runway (width per book).
- **Screen height**: take-off **35 ft** (class A) / **50 ft** (class B); landing **50 ft** for all.
- Wind: use **not more than 50% of the headwind** and **not less than 150% of the tailwind**.
- **TORR** = greater of (a) one engine failing at V1: brake release to the **midpoint between lift-off and 35 ft**; (b) **115%** of the all-engines distance to that midpoint.
- **TODR** = greater of (a) engine failure at V1: brake release to **35 ft at V2**; (b) **115%** of the all-engines distance to 35 ft.
- **ASDR**: accelerate on all engines to V1 (engine failure recognised), then stop **without reverse thrust**, gear down.
- **LDR**: from **50 ft at VREF** to a stop (≤ 5% approach gradient), dry level runway, ISA. Regulatory factors (book): **jets ÷ 0.6 (× 1.67)**, **turboprops ÷ 0.7 (× 1.43)** (also for diversions), **wet runway +15%** (jets × 1.92). **+10% per 1% downslope**; no credit for upslope.
- Landing distance increases with **altitude (low density), downslope, wet/contaminated runway** (wet ×1.4, standing water ×2.3, ice ×3.5–4.5), **tailwind**, poor braking, **10% high approach speed → +20% LDR**, **50 ft high over the threshold → about +1000 ft**, SOP slips (spoilers not armed), malfunctions, **more mass**.
- **Rules of thumb**: **10% more TOM → +21% take-off distance** (and ~5% higher take-off speed; 21% more mass → +10% speed); **tailwind 10% of take-off speed → +21% distance**; headwind 10% → −19%; landing: 10% more mass → +10% distance; **10% more landing speed → +20%** distance. Take-off performance uses **actual** temperature, landing uses **forecast**.
- **Runway alignment allowance**: distance used lining up — subtract from TODA/TORA (measured to the **main wheels**) and more from ASDA (to the **nose wheel**).

### Exam traps
- **DOM = BEM + crew, catering, water…** (no usable fuel, no TL). **ZFM = DOM + TL**; **TOM = ZFM + fuel**; LM = TOM − trip fuel.
- MTOM = lowest of **MZFM + fuel, RTOM, RLM + trip fuel**. Max TL = lowest of **MZFM − DOM, RTOM − DOM − fuel, RLM − DOM − remaining fuel**.
- Crew standard masses **85/75 kg**. Weigh every **4 years**; fleet **9 years**; reweigh if DOM changes **0.5% MLM** or CG **0.5% MAC**.
- **CG = Σ moments ÷ Σ mass**; **%MAC** formula. Forward CG: more stable, heavier controls, higher Vs, **less range**; aft CG: opposite.
- **TODA = TORA + clearway; ASDA = TORA + stopway.** Clearway ≤ **½ TORA**.
- Screen height **35 ft** (A take-off), **50 ft** landing. Wind factors **50% head / 150% tail**.
- TORR/TODR factor **1.15** (all engines). LDR jets **× 1.67**, props **× 1.43**, wet **+15%**.
- **10% mass → 21% take-off distance; 10% landing speed → 20% LDR.**

---

## 29. V-Speeds and Aircraft Performance

### Take-off V-speeds (9-9 to 9-10)
- Flight-manual speeds are IAS; published V-speeds are **CAS** (VA is EAS — chapter 1).
- **VMCG** (minimum control speed, ground): lowest CAS on the take-off run at which, if the critical engine suddenly fails, directional control can be kept **with rudder alone** (≤ 150 lb force, no nose-wheel steering), deviating **≤ 30 ft** from the centreline; max take-off thrust on the live engine, max weight, take-off configuration, 7 kt crosswind from the dead-engine side (book).
- **VMCA** (minimum control speed, air): lowest CAS at which control can be kept after sudden critical-engine failure with **≤ 5° bank towards the live engine**, heading change ≤ 20°, rudder ≤ 150 lb; out of ground effect, **aft CG**, live engine at max thrust, dead engine windmilling; **VMCA ≤ 1.2 Vs**. Never lift off below VMCA (plus margin).
- **V1 (decision speed)**: the CAS by which the decision to continue or stop is made: with the critical engine failed, the aircraft can **continue and reach V2 by 35 ft within TODA**, or **stop within ASDA**. **VMCG ≤ V1 ≤ VR**, and **V1 ≤ VMBE**. Higher V1 → longer ASDR, shorter TODR, better obstacle clearance. V1 rises with mass and falls with more flap/tailwind (book); depends on runway length/condition, thrust, braking.
- **VR**: rotation speed so that V2 is reached by 35 ft: **VR ≥ V1, ≥ 1.05 VMCA, ≥ 1.1 Vs**. **VMU**: minimum unstick speed. **VLOF**: lift-off speed — **≤ tyre limiting speed**.
- **V2 (take-off safety speed)** at **35 ft**: **≥ 1.2 Vs (VSR) and ≥ 1.1 VMCA**; allows 15° bank manoeuvring with stall margin and control after engine failure. Rises with mass, falls with more flap, rises with forward CG.
- **Vx** (best angle) and **Vy** (best rate): **Vx = VMD for jets**, slightly below VMP for props; **Vx < Vy** except at the **absolute ceiling where Vx = Vy**; with altitude Vx stays roughly constant (EAS) and Vy falls; gear/flaps lower both. **VXSE/VYSE**: one engine inoperative (VYSE = blue line).
- **VSR**: stall reference speed (class A not below 1 g stall or stick-pusher speed + 2 kt/2%). **Stall warning** at least **5 kt or 5%** above the stall (book also 3 kt/3% above VSR).
- **VAPP** = **VREF + ½ steady headwind + full gust**, max +20 kt (book; or + ⅓ headwind, max 15 kt). **VREF (threshold speed at 50 ft) = 1.3 Vs** (landing configuration) — rises with mass and forward CG, falls with flap.
- **V1 range**: **V1MIN** (lowest from which the take-off can be continued), **V1MAX** (highest from which the stop fits ASDA), **V1 balanced** (ASD = accelerate-go distance). **V3 = V2 + 10 kt** (all engines), **V4** by 400 ft.

### Other speeds (9-11 to 9-13)
- **VA (design manoeuvring)**: max speed for **full abrupt control deflection** — above it a full deflection could overstress; below it the wing stalls first. **Falls as weight falls** (20% more weight → 10% higher VA). **VB**: turbulence penetration (withstands 66 ft/s gusts). **VC**: design cruise (50 ft/s gusts). **VD**: design dive (25 ft/s gusts). **VNO**: max structural cruise — top of the **green arc** (35 kt gust, book). **VNE**: red line, ~0.9 VD. **VFE**: top of white arc. **VLO/VLE**: gear operating/extended. **VMO/MMO**: max operating limits. **VMBE**: max brake-energy speed. **VS0** (bottom of white arc, landing configuration, max mass, forward CG) and **VS1** (bottom of green arc). **VBR/VBG** best range/glide (max L/D); best endurance ~0.75 VBR; VMD (minimum sink) ~0.9 VBG; **VSSE**, **VTOSS**, **VAT** (≈ 1.3 VS0), **VAT max = VAT0 + 15 kt**.

### Performance definitions and classes (9-14)
- **Gross performance**: average fleet performance with average piloting — used for certification. **Net performance** = gross **reduced by a safety margin** (variations in technique, ageing, environment) — used for **obstacle clearance**. **Demonstrated** performance: flight tests. **Operational**: flight manual, more conservative.
- **Gross height** (for pressure-altitude and flap-retraction heights) vs **net height** (obstacle clearance).
- **Service ceiling**: ROC falls to **100 fpm (piston) / 500 fpm (jet)**. **Absolute ceiling**: ROC = 0. **Aerodynamic ceiling (coffin corner)**: stall speed and Mcrit (buffet) coincide.
- **Class A**: multi-engine **turbojets**, and turboprops **> 5700 kg or > 9 passengers** — must not need a forced landing after any engine failure. **Class B**: props **≤ 5700 kg and ≤ 9 seats**. **Class C**: piston aircraft > 5700 kg or > 9 seats.

### Take-off limits (9-15 to 9-17)
- **Max TOW** = lowest of: MZFW + fuel; **structural MTOW**; **performance-limited TOW** (lowest of **field-length**, **climb (WAT)** and **obstacle** limits); structural MLW + burn-off; performance-limited landing weight (+ burn-off); **tyre-speed limit**; **brake-energy limit**.
- **Field-length limit**: more TODA/ASDA → more weight. Raised by **more flap** (lower speeds), **downslope**, **headwind**; reduced by **high PA/temperature**, **anti-skid inoperative**, **wet/contaminated runway**, low-pressure tyres.
- **Climb limit (WAT — weight, altitude, temperature)**: the second-segment gradient (**2.4% for twins**) is usually critical. Gradient = (T − D) ÷ W. Reduced by **high PA/temperature** and **more flap**; improved by less flap and higher V2/Vs (up to best L/D).
- **Flap choice**: more flap → higher field-length limit but lower climb limit; **long runway → less flap**, **short runway → more flap**.
- **Improved climb (increased V2)**: if climb-limited but runway to spare, use a higher V2/Vs ratio and the surplus runway to raise the climb-limited weight; watch the **tyre-speed** limit; not on wet/contaminated runways.
- **Obstacle limit**: net take-off flight path must clear obstacles by **35 ft** (50 ft if banked > 15°) or by a lateral margin; **headwind helps** (steeper flight path).
- **Tyre-speed limit** falls with high PA/OAT and tailwind (higher groundspeed). **Brake-energy limit (VMBE)** falls with high OAT/PA, tailwind, downslope; rises with flap.
- **Balanced field**: V1 chosen so that **ASDR = TODR** (stopway = clearway, or neither) — the **minimum runway for a given weight**. Raising V1 lengthens ASDR and shortens TODR. Before V1 the take-off cannot be continued; after V1 it cannot be abandoned.

### Take-off flight path (9-19)
- **Take-off path**: brake release to **1500 ft**; **take-off flight path**: 35 ft to 1500 ft. **Net flight path** = gross gradient minus **0.8% (2 engines), 0.9% (3), 1.0% (4)**; must clear obstacles by **35 ft**.

| Segment | Configuration | Min gross gradient (2 / 3 / 4 engines) |
|---|---|---|
| **1st** (35 ft → gear up) | take-off flap, gear retracting, V2 | **positive** / 0.3% / 0.5% |
| **2nd** (gear up → 400 ft) | take-off flap, gear up, V2, take-off thrust | **2.4%** / 2.7% / 3.0% — usually limiting |
| **3rd** (acceleration at ≥ 400 ft) | flaps retracting, accelerating | — |
| **4th** (→ 1500 ft) | clean, max continuous thrust, VYSE/final speed | **1.2%** / 1.5% / 1.7% |

- Bank limited to **15°** below 400 ft (book: 25° above 400 ft).

### En-route, approach and landing (9-20 to 9-21)
- **En-route** (class A: 1500 ft above take-off to 1500 ft above landing surface). **Net en-route path** = gross minus **1.1% (2 engines), 1.4% (3), 1.6% (4)**; clear terrain within **5 nm** by **1000 ft** (climb and cruise over plains) or **2000 ft** (mountains, descent) (book). Positive gradient required 1500 ft above the landing aerodrome.
- **Drift-down**: after an engine failure at cruise the aircraft cannot hold level; descend at the **best L/D (drift-down) speed** to the **gross level-off altitude**, where one-engine thrust equals drag. Wind doesn't change the rate of descent but changes the **distance** (headwind less, tailwind more).
- **Go-around gradients**: **approach climb** (one engine out, approach flap, gear up, ≤ 1.5 Vs) **2.1% (2 engines)**, 2.4% (3), 2.7% (4); **landing climb** (all engines, landing configuration, gear down, ≤ 1.3 Vs) **3.2%**; all-engine missed approach 2.5% (book).
- **Max landing weight** = lowest of structural MLW and performance-limited LW (field length, **landing/approach climb**, go-around obstacle clearance).

### Manoeuvre margins and coffin corner (9-22)
- **Pre-stall (low-speed) buffet** rises with **weight, bank, forward CG, altitude, load factor**; falls with flap. **Shock-induced (high-speed) buffet** at about Mcrit; MMO chosen with a margin.
- High altitude: cruise only where there is a **buffet margin for at least 1.3 g** (about **40° bank**) between low-speed and high-speed buffet.
- **Coffin corner (aerodynamic ceiling)**: as altitude rises the stall **TAS** rises (constant IAS) while the Mach limit (Mcrit) TAS falls; where they meet the aircraft cannot fly higher.

### Exam traps
- **VMCG ≤ V1 ≤ VR**; V1 ≤ VMBE. **VR ≥ 1.05 VMCA, 1.1 Vs**. **V2 ≥ 1.2 Vs and 1.1 VMCA**. VREF = **1.3 Vs**.
- VMCA: **≤ 5° bank towards the live engine**, aft CG. VMCG: rudder only, 30 ft deviation.
- **Vx = Vy at the absolute ceiling.** Service ceiling **100 fpm piston / 500 fpm jet**.
- Gross = fleet average (certification); **net = gross − margin** (obstacles).
- Class A = **all multi-jets** + turboprops > 5700 kg/9 pax.
- More flap: **field limit up, climb limit down**. Hot/high: both down. **2nd segment 2.4%** (twin) is critical. Net take-off path −0.8% (twin), clear by **35 ft**.
- **Balanced field: ASDR = TODR**; higher V1 → ASDR up, TODR down.
- En-route net −1.1% (twin); obstacles **1000/2000 ft**. Drift-down at best L/D; wind changes distance not rate.
- Approach climb **2.1%** (OEI, twin), landing climb **3.2%** (AEO).
- Coffin corner: stall TAS meets Mcrit; 1.3 g buffet margin.

---

## 30. Human Performance: Body, Senses and Mind

### Brain, circulation and breathing (11-3)
- The brain is **2% of body weight** but uses **20% of its energy**; it handles **one conscious decision at a time**; about **70% of information** arrives through the **eyes**.
- **Visual constancy**: recognising familiar objects in unfamiliar conditions. **Expectancy (perceptual set)**: we tend to perceive what we expect. **Top-down** processing uses prior knowledge; **bottom-up** builds the picture from sensory data.
- **Westbound** long flights are easier to adapt to than **eastbound**.
- **Circulation**: resting heart rate ~**72/min**; heart pumps ~**5 litres/min**; normal BP **120/80**. **24 h** rest after giving blood.
- **Gas laws**: **Henry** — gas dissolved in a liquid ∝ the pressure of that gas above it (decompression sickness). **Dalton** — total pressure = sum of partial pressures (hypoxia).
- **Lung volumes**: **tidal ~500 ml**; inspiratory reserve ~3000 ml; expiratory reserve ~1100 ml; **residual ~1200 ml**. Breathing rate ~**16/min**. Women ~25% less lung volume. **Breathing rate is controlled by blood CO₂**.
- **Carbon monoxide**: odourless; haemoglobin binds CO **~250 times** more readily than O₂ → anaemic hypoxia; early sign **headache/tightness across the forehead** (heater or exhaust leaks).
- **Vibration**: **1–4 Hz** breathing interference; 4–10 Hz chest/abdominal pain; 8–12 Hz backache; 10–20 Hz headache, eyestrain, muscle tension.
- ~**73%** of accidents attributed to **human factors**. Body temperature **max ~1700, min ~0500**. Skipping breakfast → **hypoglycaemia**. **BMI = weight (kg) ÷ height² (m²)**: < 25 healthy, 25–30 overweight, > 30 obese.

### Arousal, memory, leadership, decisions (11-4)
- **Arousal**: performance is best at **moderate** arousal; too low or too high (anxiety) degrades it.
- **Sensory stores**: **iconic** (visual, ~**1 s**), **echoic** (auditory, ~**2–8 s**). **Short-term (working) memory**: ~**10–20 s**, **7 ± 2 items**, easily interrupted — improved by **chunking**, association, mnemonics. **Long-term**: **semantic** (knowledge), **episodic** (events), **motor/procedural** (skills).
- **Cockpit gradient / leadership** (concern for People vs Goal): **P+ G+ ideal** (balances task and crew); **P+ G− too democratic**; **P− G+ too autocratic** (crew won't speak up); **P− G− laissez-faire**.
- **Maslow's hierarchy**: physiological → safety → belonging/love → esteem → **self-actualisation**.
- **Decision levels (Rasmussen)**: **skill-based** (automatic), **rule-based** (recognise situation, apply procedure), **knowledge-based** (novel problem: analyse, evaluate options).

### Stress (11-5)
- **Stress is cumulative**; a **stressor** is anything that causes it. Too little → slackness; too much → breakdown; **optimum** stress → best performance. **Psychosomatic** illness: physical illness from psychological causes.
- Types: **physiological/environmental** (heat, noise, hunger, fatigue, emergencies), **cognitive** (unfamiliar problems), **personal/domestic**, **imaginary** (anxiety), **organisational**.
- Coping: **action coping** (deal with the stressor), **cognitive coping** (reappraise, positive attitude), **symptom-directed coping** (drugs, smoking, chocolate — undesirable). Experience, knowledge and **CRM** (sharing workload) reduce stress.

### Sleep (11-5)
- **Circadian rhythm**: free-running cycle ~**25 h**. **One sleep cycle ~90 min** (4 stages + REM).
- **Sleep credit**: **+2 per hour asleep, −1 per hour awake**; max credit **16 (8 h sleep)**; credit/debt carries forward.
- **REM** (paradoxical) sleep — active brain, eye movements, **dreams**, 4–5 times a night. **Stage 1** light (first ~10 min), **stage 2** (~20 min), **stages 3–4** slow-wave deep sleep.

### The eye (11-6)
- **Sclera** (white), **cornea** (clear front), **iris** (controls light), **pupil**, **lens**, **retina**, **fovea** (central vision, cones only), **choroid** (blood supply).
- **Cones**: **day/colour (photopic)** vision, concentrated at the **fovea**, one neuron each — sharp acuity. **Rods**: **night (scotopic)** and **peripheral** vision, densest about **10° from the fovea**, many per neuron — sensitive but blurred; no colour. **Mesopic**: both (dusk).
- **Dark adaptation**: rods take about **30 minutes**. **Night blind spot** at the fovea — look **off-centre** at night. Night vision is impaired by **hypoxia** (night vision suffers first), **alcohol, smoking, vitamin A deficiency, hypoglycaemia**; carbohydrates before a night flight help.
- **Central vision** ("what": identification, ~30° cone) vs **peripheral** ("where": orientation — lost in cloud/night → disorientation; then use the instruments).
- Defects: **myopia** (short sight, long eyeball — **concave** lens), **hypermetropia** (long sight — **convex** lens), **presbyopia** (age, lens loses flexibility). Colour blindness: ~7% of men, 0.1% of women.

### The ear (11-7)
- Hearing **20–20,000 Hz**. **Outer ear** (pinna, canal) → **eardrum** → **middle ear** (air-filled; **ossicles** malleus, incus, stapes; **Eustachian tube** equalises pressure) → **inner ear** (fluid-filled; **cochlea** for hearing; **vestibular apparatus** for balance).
- **Semicircular canals** (three, at **90°**): sense **angular acceleration** — fluid moves the hair cells; threshold about **2°/s** (book), so slow changes go unnoticed (a root of disorientation). **Otoliths**: sense **linear acceleration and gravity** (head tilt). (The scan attributes linear sensing to the ossicles; physiologically it is the otolith organs of the inner ear.)
- **Barotrauma**: **otitic** (ear — worst in **descent** when the Eustachian tube won't open; never fly with a cold) and **sinus**.
- Hearing loss: **presbycusis** (age), **noise-induced** (prolonged > **90 dB**; 120 dB discomfort, **140 dB pain**, > 160 dB eardrum rupture), **conductive** (outer/middle ear) vs **sensorineural** (inner ear/nerve).

### Acceleration (11-8)
- Effect depends on **magnitude, duration, direction, rate of onset, and the area of the body**.
- Tolerances (book): **Gx** (fore–aft) ~3.5 g in flight, ~45 g impact; **Gy** (sideways) 6–9 g / 25 g impact; **+Gz** (head-to-foot) **4.5–6 g for 5 s, ~8 g with a g-suit**. Tolerance depends more on **height (heart–brain distance)** and fitness than strength or sex.
- Reduced tolerance: heat, hypoglycaemia/empty stomach, **hypoxia, hyperventilation**, illness, fatigue, lack of recent practice, fear, **−g before +g (push-pull)**.
- Protection against +Gz: crouching, **straining (tensing abdominal muscles)**, shouting, raised legs, **g-suit**.
- **+Gz** pools blood in the legs → **grey-out → tunnel vision → black-out → G-LOC**. **−Gz** pools blood in the head → **red-out**. **No protection against −Gz.**

### Exam traps
- Brain **2% weight, 20% energy**; **70%** information visual; **73%** accidents human factors.
- **Henry** (dissolved gas) → DCS; **Dalton** (partial pressures) → hypoxia. Breathing driven by **CO₂**. CO: **250×**, headache.
- Memory: iconic **1 s**, echoic **2–8 s**, STM **7 ± 2**, 10–20 s.
- Ideal leader **P+ G+**; autocratic **P− G+**.
- Sleep: cycle **90 min**, credit **+2/−1**, max **16**; circadian **25 h**; REM = dreams.
- **Cones: colour, day, fovea; rods: night, periphery, 30 min adaptation.** Hypoxia hits night vision first. Myopia → concave lens.
- **Semicircular canals: angular; otoliths: linear.** Threshold ~2°/s. Barotrauma worst in **descent**.
- Noise damage > **90 dB**; pain **140 dB**.
- +Gz: grey-out → black-out; **−Gz: red-out, no protection**. +Gz tolerance ~4.5–6 g, 8 g with suit.

---

## 31. Disorientation, Illusions, Decompression and Hypoxia

### Spatial disorientation (11-9)
- The pilot cannot correctly perceive the aircraft's attitude. In good visibility eyes and vestibular organs agree; with poor visual cues the brain relies on the (fallible) **vestibular** system.
- **Orientation triad**: **eyes (~90% of cues** — central vision "what", peripheral "where"), **vestibular organs** (semicircular canals angular, otoliths linear), **proprioceptive "seat-of-the-pants"** receptors in skin, muscles, joints.
- **Predisposing factors**: inexperience, fatigue, emotional state, weather, time of day, alcohol, medication, illness, insomnia, **high g**, glare, **hypoxia**, anxiety, emergencies, phase of flight, **unnecessary head movements**.
- **Type 1 — unrecognised** (pilot unaware — most dangerous); **Type 2 — recognised** (aware, corrects using instruments); **Type 3 — incapacitating** (aware but unable to recover, e.g. "giant hand").
- **Remedy**: currency, minimise predisposing factors, **trust the instruments**, tell the co-pilot and hand over, inform ATC, use the autopilot, fly **straight and level for at least 60 s**, control breathing.

### Vestibular (gyral) illusions (11-10)
- **Somatogyral**: in a sustained turn the canal fluid catches up (~**20 s**) and the turn is no longer felt; on rolling out the pilot feels a turn the **other way**. **Oculogyral**: the visual counterpart — objects appear to move.
- **Coriolis illusion**: **moving the head** in a sustained turn stimulates another canal → violent tumbling sensation — the most disorienting.
- **The leans**: a roll below the threshold (~2°/s) goes unnoticed; correcting it briskly is felt, so in level flight the pilot **feels banked the other way** and leans.
- **Graveyard spin**: after spin recovery the pilot feels spinning the other way and re-enters the original spin.
- **Graveyard spiral** (more common): in a prolonged turn the sensation fades; rolling level feels like a bank the other way, so the pilot re-banks; the aircraft loses height, the pilot pulls back and **tightens the spiral**.

### Otolith (acceleration) illusions (11-11)
- **Somatogravic**: **linear acceleration feels like pitch-up** (take-off, go-around at night → pilot pushes forward — dangerous); **deceleration feels like pitch-down**. **Oculogravic**: the visual version — instruments/lights seem to rise.

### Visual illusions (11-11 to 11-12)
- **Runway slope**: **up-sloping runway → feel high → fly a low (shallow) approach**; **down-sloping → feel low → steep (high) approach**.
- **Runway width**: **narrow → feel high → low approach, flare late/low**; **wide → feel low → high approach, flare early/high**.
- **Black-hole approach**: night approach over dark featureless terrain to a lit runway — the pilot keeps a constant visual angle and flies an arc **below the glidepath**, dangerously low.
- **Parallax**, **perspective**; **empty-field myopia** (nothing to focus on — eyes focus 1–2 m ahead; over sea/desert/haze); **autokinesis** (a fixed light in the dark appears to move); **white-out** (snow, no depth cues); **aerial perspective** (fog/haze: objects seem farther); **haze/rain on the windscreen → feel high → low approach** (book); poor visibility → steep approach; inverted sky/ground brightness; **false horizon** (sloping cloud tops, lights).

### Decompression sickness (11-13)
- Dissolved **nitrogen** comes out as bubbles when ambient pressure falls (**Henry's law**). Likely **above ~30,000 ft** with more than ~10 min exposure; unlikely with cabin altitude below 25,000 ft (book). On decompression: **oxygen mask on, descend below 10,000 ft**.
- **Diving**: no flying for **12 h** after scuba diving with compressed air, **24 h** if deeper than **30 ft (10 m)** (book).
- Symptoms: **bends** (joint pain), **creeps** (skin itching/tingling), **chokes** (lungs), CNS effects/hallucinations, visual effects, collapse.
- Predisposing: **rate of ascent, altitude and time there, cold, obesity, age, susceptibility, poor fitness, recent diving**. Prevention: pressurisation, less time at altitude, **pre-breathing 100% O₂ (denitrogenation)**.
- **Rapid decompression**: **misting** (fog in the cabin), sudden **cold**, objects sucked out, flying debris; time of useful consciousness drastically reduced.

### Hypoxia (11-14)
- Insufficient oxygen reaching the tissues. Smokers (CO on haemoglobin) are affected about **4000–5000 ft lower**. If unsure whether it is hypoxia or hyperventilation **at altitude, treat as hypoxia**; below 10,000 ft assume hyperventilation. Hypoxic unconsciousness can kill; hyperventilation unconsciousness is recovered from.
- **Oxygen requirements** (book): supplementary O₂ from about **12,000 ft (4 km)**; **100% O₂ from ~34,000 ft**; **pressure breathing from ~41,000 ft**; **ebullism (body fluids boil) ~63,000 ft (Armstrong line)**; sealed cabin/suit above ~75,000 ft.
- **Hypoxic hypoxia**: low partial pressure of O₂ at altitude — the **commonest** for pilots. **Anaemic**: blood can't carry O₂ (anaemia, blood loss, **CO poisoning**, some drugs). **Stagnant**: poor circulation (cold, **high g**). **Histotoxic**: cells can't use O₂ (**alcohol, narcotics, cyanide**).
- **Stages**: **indifferent** (to 10,000 ft — no noticeable effect, book), **compensatory** (10,000–15,000 ft — breathing and heart rate rise), **disturbance** (15,000–20,000 ft), **critical** (> 20,000 ft — rapid incapacitation, unconsciousness).
- Affected by **rate of ascent, time at altitude, temperature, fitness, smoking, alcohol, illness, emotional state**.
- **Symptoms** (no reliable warning; individual): awareness of breathing, **euphoria** or depression, fatigue, **dimming of vision (night vision first)**, impaired hearing/touch, emotional outbursts, **impaired memory, judgement and self-criticism**, fixed ideas, slow reactions, cyanosis.
- Prevention: serviceable oxygen equipment, enough oxygen, mask checks, fitness.

| Altitude | Time of useful consciousness (book) |
|---|---|
| 20,000 ft | ~**10 min** |
| 25,000 ft | ~**3 min** |
| 27,000 ft | ~1.5 min |
| 30,000 ft | ~**70 s** |

### Hyperventilation (11-16)
- **Over-breathing** washes out **CO₂** → blood becomes **alkaline** → arteries constrict → less blood and oxygen to the brain. May cause unconsciousness, but **breathing then returns to normal and the person recovers**.
- Causes: **fear, anxiety, apprehension**, hypoxia, pressure breathing, over-exertion, temperature extremes.
- Symptoms: dizziness, light-headedness, **tingling/numbness (lips, fingers)**, muscle spasms, cold clammy skin, impaired judgement — very like hypoxia.
- Treatment: **slow, controlled breathing** (talk/hum, rebreathe); at altitude assume hypoxia and **use oxygen**.

### Exam traps
- **Eyes give ~90% of orientation.** **Type 1 (unrecognised)** disorientation is the worst. Remedy: trust instruments, 60 s straight and level.
- **Coriolis** = head movement in a turn; **leans** = sub-threshold roll; **somatogravic** = acceleration feels like **pitch-up** (night go-around danger).
- Up-slope or narrow runway → **feel high → fly low**; down-slope or wide → feel low → fly high. **Black hole → below the glidepath.**
- Autokinesis = fixed light seems to move; empty-field myopia focuses 1–2 m.
- DCS: **nitrogen**, above ~**25,000–30,000 ft**; bends/creeps/chokes; no flying **12 h** after diving (**24 h** if > 30 ft).
- Hypoxia types: **hypoxic** (altitude), **anaemic** (CO), **stagnant** (g, cold), **histotoxic** (alcohol). Stages: indifferent **10,000**, compensatory **15,000**, disturbance **20,000**, critical.
- TUC: **20,000 ft ~10 min, 25,000 ft ~3 min, 30,000 ft ~1 min**.
- Hyperventilation = **CO₂ washed out**, tingling; recover by slow breathing; **if in doubt at altitude, it's hypoxia**.
