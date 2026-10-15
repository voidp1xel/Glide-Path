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
