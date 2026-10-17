/* ADAPT prep: expanded interview bank (≈390), GD topics (≈70). Replaces B.interview / B.gd from adapt-bank.js.
   Row: [question, source, look-for]. Source codes resolve via SRC; '' = standard competency/technical question. */
(function () {
  'use strict';
  const B = window.ADAPT_BANK;
  const OLD_IV = B.interview || [], OLD_GD = B.gd || []; /* first-edition banks: merged back in below so nothing is lost */
  const SRC = {
    ap: 'Airship Aviation (IndiGo/Air India reported)', dc: 'DGCA Classes / cadetpilotprogram.com (IndiGo PI)', rp: 'RotatePilot cadet interview guide',
    ga: 'Garuda Aviation (IndiGo PI)', pp: 'Poetic Pilot Academy (IndiGo PI)', qu: 'Quora candidate (FTA–IndiGo)', ig: 'PPRuNe candidate (IGRUA interview)',
    rg: 'Runway Girl Network (Air India psychologist round, 2015)', ge: 'coaching site (Air India psychologist round)', ar: 'Aviator Room',
  };
  B.SRC = SRC;
  const C = {};
  const add = (cat, look, rows) => { C[cat] = { look, rows }; };

  add('About you & motivation', 'Specific, honest, consistent with your CV. 60–90 s. Link every answer back to the qualities of a good pilot.', [
    ['Tell us about yourself.', 'pp', 'Present → path to aviation → what you have done about it → why now. Not a life story.'],
    ['Why do you want to become a pilot?', 'dc', 'A real origin + what attracts you to the JOB (responsibility, teamwork, precision, lifelong learning) + proof you tested the idea. Avoid only "I love flying" (ge).'],
    ['Why do you want to become a pilot with IndiGo / Air India / Akasa?', 'dc', 'Two researched reasons specific to that airline + how they match you.'],
    ['Why should we choose you for the cadet programme?', 'dc', '3 qualities with one piece of evidence each; end with commitment.'],
    ['Where do you see yourself in five years?', 'dc', 'Line FO on type, reliable, clean training record; 10 years: command upgrade, maybe training roles.'],
    ['Where do you see yourself in ten years?', '', 'Command, mentoring juniors, staying with the airline.'],
    ['What are your strengths?', 'ga', 'Two or three, each with a short real example relevant to flying.'],
    ['What are your weaknesses?', 'ga', 'A real, manageable weakness + what you do about it + progress. Not a disguised strength.'],
    ['What do you understand about the responsibilities of a pilot?', 'ga', 'Safety of passengers/crew/aircraft, following SOPs, decision-making, crew leadership, fitness for duty, lifelong learning.'],
    ['What are the key qualities of a successful pilot?', 'dc', 'ICAO core competencies: procedures, communication, flight-path management (auto & manual), leadership & teamwork, problem solving & decision-making, situational awareness, workload management, knowledge.'],
    ['Describe yourself in three words.', '', 'Three words + a one-line example for each.'],
    ['What would your friends say about you? Your parents?', '', 'Consistent with your personality profile; honest.'],
    ['You are in B.Tech CSE at IIIT Hyderabad. Why leave engineering for flying?', '', 'Show this is a deliberate choice; CS is an asset (systems, automation, logic); you have a plan B — that is maturity, not lack of commitment.'],
    ['If you get selected, will you leave your degree midway? How do your parents feel about that?', '', 'Clear answer, family discussed, why it is a considered decision.'],
    ['Do you have any prior flight training or flying experience?', 'ga', 'Honest. If none: what you have done (simulator, reading, DGCA papers, talking to pilots).'],
    ['What have you done so far to prepare for this career?', '', 'Medicals, DGCA subjects, reading, sims, fitness — concrete actions.'],
    ['Which DGCA papers have you cleared? How did you prepare?', '', 'Honest status; disciplined study method.'],
    ['How did you handle a failure in your DGCA ground classes / exams?', 'ap', 'Ownership, analysis, change of method, result.'],
    ['What are your hobbies? Do you play any sport?', 'ig', 'Real hobbies; link team sport to teamwork, individual sport to discipline.'],
    ['What do you do in your free time?', 'ig', 'Balanced life; stress management.'],
    ['Tell us about your schooling and your 10+2 marks in Physics, Maths and English.', '', 'Know your marks; explain any weak subject.'],
    ['Who is your role model and why?', '', 'A real person + specific quality you have adopted.'],
    ['What was the moment you decided to become a pilot?', '', 'Short vivid story.'],
    ['What will you do if you are not selected today?', '', 'Debrief, improve, reapply (FTA rules allow a 2nd attempt after a cooling period), continue DGCA exams and degree.'],
    ['What is your backup plan if you lose your medical?', '', 'Loss-of-licence insurance, degree, aviation-adjacent careers. Shows realism.'],
    ['How do you keep yourself fit?', '', 'Routine, diet, sleep, improvements; you know fitness is licence-critical.'],
    ['What does success mean to you?', '', 'Process-based (doing the job well, being trusted) not only salary/status.'],
    ['What motivates you?', '', 'Mastery, responsibility, team achievement.'],
    ['What is the biggest sacrifice you have made for your goals?', '', 'Real and proportionate.'],
    ['Are you comfortable relocating anywhere in India or abroad for training and base?', '', 'Yes, with understanding of what that involves.'],
    ['How will you fund the programme?', '', 'Family + loan plan discussed; understand cost (~₹1 crore) and bond.'],
    ['What do you know about the bond / service agreement?', '', 'You accept it as the airline\'s return on training investment.'],
    ['Have you applied to other cadet programmes? Why?', '', 'Honest; you want to fly for a scheduled airline; this is your first choice because…'],
    ['Pilots spend long hours away from home and work nights. How will you cope?', '', 'Realistic; routines, family support, fatigue management.'],
    ['What is the difference between a career and a job?', '', 'Long-term growth, identity, continuous learning.'],
  ]);

  add('Airline & programme knowledge', 'Researched, current, specific. Check the airline\'s website/press releases the week of your interview: CEO, fleet, recent orders, new routes, bases.', [
    ['What do you know about IndiGo?', 'ga', 'India\'s largest airline by market share; low-cost model: single type family (A320neo/A321neo) + ATR 72 regional; on-time focus; huge aircraft orders; growing international network.'],
    ['What do you know about IndiGo and its fleet?', 'ga', 'A320neo family core, ATR 72-600 for regional, widebodies in its plan (A350-900 order). Verify current numbers.'],
    ['What do you know about the IndiGo Cadet Pilot Programme?', 'dc', 'Partner FTOs, ~2 years, ground school → flying → A320 type rating → line as FO; conditional offer; bond; financing.'],
    ['Why IndiGo over our competitors?', 'ap', 'Two concrete reasons (structure, growth, safety/on-time culture, single fleet = deep expertise) + your fit.'],
    ['What is IndiGo\'s business model and why does it work?', '', 'LCC: high utilisation, single type, direct sales, quick turnarounds, cost discipline.'],
    ['What do you know about Air India today?', '', 'Tata ownership since 2022; merger with Vistara (2024); large Airbus + Boeing order (2023); fleet refurbishment; long-haul network.'],
    ['Why Air India?', '', 'Long-haul & widebody future, flag carrier transformation, diverse fleet — plus your reason.'],
    ['What do you know about the Air India Flying Training Academy / cadet programme?', '', 'Airline-run academy for ab-initio cadets; Air India\'s official page lists a psychologist round + technical/HR round.'],
    ['What do you know about Akasa Air?', '', 'Launched 2022; all Boeing 737 MAX fleet; SkyCadet programme; official process lists interview, psychological assessment & drug test, sim evaluation, recruitment-team session.'],
    ['Name the aircraft types we operate.', '', 'Know them by heart for the airline you are interviewing with.'],
    ['Who is our CEO? Who founded the airline?', '', 'Check current leadership on the official site.'],
    ['What is our main hub / which bases do we have?', '', 'Know the main hubs and the newest bases.'],
    ['What was our most recent major announcement?', '', 'Read the press releases page.'],
    ['What is our on-time performance compared with others?', '', 'DGCA publishes monthly OTP data; know roughly where the airline stands.'],
    ['How many aircraft do we have on order?', '', 'Know the headline order (e.g. IndiGo\'s 500 A320neo-family order, 2023; Air India\'s 470-aircraft order, 2023).'],
    ['What do you know about the A320neo? What does "neo" stand for?', '', 'New Engine Option: CFM LEAP-1A or PW1100G GTF; ~15–20% lower fuel burn; sharklets.'],
    ['What do you know about the Boeing 737 MAX?', '', 'LEAP-1B engines, split-tip winglets; grounded 2019–20 after MCAS accidents; re-certified with changes.'],
    ['What is the difference between Airbus and Boeing design philosophy?', '', 'Airbus: fly-by-wire with flight-envelope protections, sidestick, non-moving thrust levers in auto-thrust. Boeing: control yoke, pilot has final authority, back-driven controls.'],
    ['What is a low-cost carrier versus a full-service carrier?', '', 'Unbundled fares, single class, single type vs bundled service, lounges, mixed fleet, connections.'],
    ['What is the difference between a dry lease and a wet lease?', 'ap', 'Dry: aircraft only. Wet (ACMI): aircraft + crew + maintenance + insurance.'],
    ['What is a damp lease?', '', 'Aircraft with partial crew (often cockpit crew) — between wet and dry.'],
    ['What is a codeshare and an interline agreement?', '', 'Codeshare: airline sells seats under its code on a partner flight. Interline: one ticket/baggage through on separate airlines.'],
    ['What is an alliance? Is any Indian airline in one?', '', 'Star Alliance / oneworld / SkyTeam; Air India is in Star Alliance.'],
    ['What is UDAN?', '', 'Regional connectivity scheme (Ude Desh ka Aam Nagrik): viability-gap funding & capped fares on regional routes.'],
    ['What is "Digi Yatra"?', '', 'Facial-recognition paperless boarding at Indian airports.'],
    ['What are the stages of the programme after selection?', '', 'Medical/contract → ground school → flying (CPL) → type rating → line training as FO.'],
    ['How long until you would fly as a first officer?', '', 'Roughly 2 years of training + line training.'],
    ['What do you think the airline expects from a cadet?', '', 'Discipline, punctuality, study ethic, honesty, teamwork, representing the brand.'],
    ['Have you flown with us? What did you notice?', '', 'An observation about operations/crew professionalism, not seat comfort.'],
    ['What would you improve about our airline?', '', 'Constructive, modest, one idea; never trash the airline.'],
  ]);

  add('Behavioural (STAR)', 'STAR: Situation & Task briefly (20%), Action — what YOU did (60%), Result + learning (20%). Have 8–10 stories that each cover several competencies.', [
    ['Describe a challenging situation you faced and how you overcame it.', 'dc', ''],
    ['Tell me about a time you made a mistake.', 'rp', 'Ownership, honest reporting, fix, prevention.'],
    ['Describe a conflict with a team member or supervisor.', 'rp', 'Stay factual, listen, resolve, preserve relationship.'],
    ['When have you gone above and beyond?', 'rp', 'Initiative with good judgement.'],
    ['Tell me about a time you faced a conflict.', 'ap', ''],
    ['Tell us about a difficult decision you made under pressure.', 'ge', 'Options considered, risk weighed, decision, review.'],
    ['Give an example of teamwork from your own life.', 'pp', ''],
    ['Give an example of leadership from your own life.', 'pp', ''],
    ['Tell me about a time you had to explain something complex to someone who did not understand it.', '', 'Communication: check understanding, adapt.'],
    ['Describe a time a message you gave was misunderstood. What did you do?', '', 'Closed-loop communication.'],
    ['Tell me about a time you had to deliver unwelcome news.', '', 'Honest, timely, respectful.'],
    ['Tell me about a time you had to speak up to make sure your concern was heard.', '', 'Assertiveness.'],
    ['Describe how you adjust your communication style for different people.', '', ''],
    ['Tell me about a time you asked a question to clarify an instruction.', '', 'Clarifying rather than assuming.'],
    ['Describe a time you received difficult feedback and how you responded.', '', 'Openness, action taken.'],
    ['Tell me about a time you led a team through a challenging task.', '', ''],
    ['Describe a time you had to take charge in an unexpected situation.', '', ''],
    ['How did you motivate a team that was struggling?', '', ''],
    ['Tell me about a time you delegated effectively.', '', 'Matched tasks to strengths, followed up.'],
    ['Describe a decision you made that others disagreed with.', '', 'Listened, explained reasoning, stayed open.'],
    ['Tell me about a time you had to hold a peer accountable.', '', ''],
    ['Describe a leadership role you took without being formally given it.', '', ''],
    ['Tell me about a time you disagreed with someone senior.', '', 'Respectful assertiveness, facts, outcome.'],
    ['Tell me about a time you supported a teammate who was overloaded.', '', ''],
    ['Describe working with someone whose style was very different from yours.', '', ''],
    ['Tell me about a time you admitted a mistake to your team.', '', ''],
    ['Give an example of when you welcomed input that changed your plan.', '', ''],
    ['Tell me about a time a team member did not follow procedure. How did you respond?', '', ''],
    ['Tell me about a time you made a quick decision with incomplete information.', '', ''],
    ['Describe the most difficult decision you have made.', '', ''],
    ['Tell me about a time you reversed a decision after new information came in.', '', 'Avoiding plan-continuation bias.'],
    ['Describe a time you used a structured method to solve a problem.', '', 'e.g. define → options → choose → act → review (similar to FORDEC/DODAR).'],
    ['Give an example of when you said no to a request.', '', ''],
    ['Tell me about a judgement call that was later questioned.', '', ''],
    ['Describe a situation where you had to balance competing priorities.', '', ''],
    ['Tell me about a time you noticed a small detail others had missed.', '', 'Situational awareness.'],
    ['Describe a time you anticipated a problem before it occurred.', '', ''],
    ['Tell me about a time you recognised your own fatigue or distraction.', '', 'Self-awareness; what you did about it.'],
    ['Tell me about a time a checklist or procedure helped you catch an error.', '', ''],
    ['Tell me about a time you were overloaded. How did you prioritise?', '', 'Workload management.'],
    ['Describe how you handle several urgent tasks at once.', '', ''],
    ['Give an example of when you asked for help before becoming overwhelmed.', '', ''],
    ['Describe how you organise your preparation for a demanding exam.', '', ''],
    ['Tell me about a time you had to re-plan because of unexpected changes.', '', ''],
    ['Tell me about a time you were tempted to cut a corner. What did you do?', '', 'Integrity.'],
    ['Describe a situation where you reported a problem or safety concern.', '', ''],
    ['Give an example of when you followed a rule that was inconvenient.', '', ''],
    ['Tell me about a time you were honest about an error nobody else noticed.', '', ''],
    ['Tell me about a time you failed at something important. What did you learn?', '', ''],
    ['Give an example of recovering from a setback.', '', ''],
    ['Tell me about a time you had to adapt to a major change.', '', ''],
    ['Tell me about a time you were unsuccessful in a test. What did you change?', '', ''],
    ['Tell me about a time you had to learn something difficult quickly.', '', 'Trainability.'],
    ['Describe a time you helped someone under stress.', '', 'Empathy.'],
    ['Tell me about a time you worked with people from a different background or culture.', '', ''],
    ['Describe a time you had to meet a tight deadline with limited resources.', '', ''],
    ['Tell me about a project you are proud of.', '', ''],
    ['Tell me about a time you had to persuade others.', '', ''],
    ['Describe a time you stayed calm when others panicked.', '', ''],
    ['Tell us about a time you handled a mid-air diversion. (asked of experienced candidates — cadets: adapt to any unplanned change)', 'ap', ''],
  ]);

  add('Psychologist round & self-reflection', 'Consistency with your personality questionnaire, self-awareness, emotional stability. Answer honestly; the psychologist probes contradictions.', [
    ['How do you handle stress and pressure?', 'dc', 'Concrete techniques (planning, breathing, breaking tasks down, exercise) + an example.'],
    ['How do you handle anger? What if your co-pilot is hostile towards you?', 'ge', 'Recognise it, pause, stay professional, address the issue later in private, keep flying the aircraft.'],
    ['What is the difference between knowledge and wisdom?', 'ge', 'Knowledge = facts; wisdom = applying them with judgement and experience.'],
    ['How would you handle an unruly passenger? (asked by the psychologist)', 'rg', 'Cabin crew lead; captain\'s authority; priority is flying the aircraft; follow procedure.'],
    ['What makes you angry?', '', 'Honest, mild example; how you manage it.'],
    ['When did you last cry / feel very low? What did you do?', '', 'Honest, healthy coping.'],
    ['What are you afraid of?', '', 'Honest; how you manage it.'],
    ['How do you react when someone criticises you unfairly?', '', ''],
    ['How do you deal with failure?', '', ''],
    ['What do you do when you disagree with a rule?', '', 'Follow it, raise concern through proper channels.'],
    ['Do you prefer working alone or in a team?', '', 'Both, but flying is a team job.'],
    ['Are you a leader or a follower?', '', 'Both, depending on role; good followership matters in a two-crew cockpit.'],
    ['What kind of people do you find difficult to work with?', '', 'Describe behaviour, not people; how you still work with them.'],
    ['Tell me about your family. Who are you closest to?', '', 'Support system.'],
    ['How do you handle loneliness when away from home?', '', ''],
    ['How do you sleep? How many hours?', '', 'Healthy routine.'],
    ['Do you drink alcohol or smoke? How often?', '', 'Honest; awareness of rules (pre-flight BA test, no alcohol 12 h before duty per DGCA CAR).'],
    ['Have you ever taken medication for anxiety or depression?', '', 'Answer truthfully; mental health declarations matter — lying is worse than the history.'],
    ['How do you make important decisions?', '', 'Gather info, options, consult, decide, review.'],
    ['What would you change about yourself?', '', ''],
    ['What is your biggest regret?', '', ''],
    ['Describe your personality in a sentence.', '', 'Consistent with the APQ.'],
    ['How do you relax?', '', ''],
    ['What do you think about risk-taking?', '', 'Calculated, managed risk; no thrill-seeking.'],
    ['Have you ever broken a rule? Why?', '', 'Honest small example + learning.'],
    ['What would you do if a friend asked you to cover for him/her?', '', 'Refuse politely; integrity.'],
    ['How do you cope with boredom on long, routine tasks?', '', 'Vigilance strategies; relevance to cruise flight.'],
    ['What is your attitude towards authority?', '', 'Respect + willingness to speak up on safety.'],
    ['How would you feel if a younger colleague became your captain first?', '', 'Professional, no ego.'],
    ['Why might someone NOT want to work with you?', '', 'Self-awareness.'],
  ]);

  add('Situational & CRM', 'Safety first, then: aviate–navigate–communicate; graded assertiveness (Probe–Alert–Challenge–Emergency); use all resources; follow SOP; report honestly.', [
    ['What would you do if your captain smells of alcohol?', 'ap', 'Don\'t operate; speak privately; involve company per policy; safety over loyalty.'],
    ['Your captain is about to make a decision you believe is unsafe. What do you do?', '', 'PACE: probe, alert with facts, challenge with proposed action, take action only if imminent danger per SOP.'],
    ['How should a junior first officer correct a senior captain\'s error?', 'ap', 'Authority gradient: name, observation, concern, proposed solution, agreement.'],
    ['You are the captain. Your first officer suggests a different descent profile. How do you respond?', 'rp', 'Listen, evaluate on merit, decide, explain — encourage input.'],
    ['A cabin crew member reports a burning smell you can\'t smell in the cockpit. What do you do?', 'rp', 'Take it seriously, gather info, smoke/fumes checklist, prepare to divert.'],
    ['You discover an uncompleted maintenance write-up 20 minutes before departure. What do you do?', 'rp', 'Do not depart until resolved/deferred legally (MEL) by engineering.'],
    ['A senior captain asks you to file a false report. How do you respond?', 'rp', 'Refuse; integrity; escalate if needed.'],
    ['An aircraft has a medical emergency but the nearest airport is below weather limits. What do you do?', 'ap', 'Aviate first; consult (MedLink/doctor on board), evaluate alternates above minima, fuel, inform ATC, decide; don\'t bust minima.'],
    ['How would you handle a medical emergency on a 14-hour flight to New York?', 'ap', 'Cabin crew + doctor on board, ground medical support, diversion options (ETOPS alternates), fuel/weight.'],
    ['Safety vs commercials: a costly diversion or a marginal-weather landing?', 'ap', 'Safety: divert. Company policy supports safe decisions.'],
    ['Your left engine fails on take-off at 500 ft. What is your first action?', 'rp', 'Fly the aircraft: maintain control and V2–V2+, then identify, memory items/checklist per SOP.'],
    ['Engine fire vs engine failure — how do you respond to each?', 'rp', 'Fire: fire drill (thrust lever idle, fuel off, fire handle, agent). Failure: control, identify, secure, relight considerations.'],
    ['You suspect a hydraulic leak in cruise. Walk me through it.', 'rp', 'Confirm via indications, ECAM/QRH, plan for degraded controls/gear, divert as needed.'],
    ['Destination forecast to go below minimums in two hours. What is your contingency?', 'rp', 'Extra fuel, alternates, hold options, earlier departure or delay.'],
    ['ATC reports windshear on final. What do you do?', 'rp', 'Go around / windshear escape manoeuvre: max thrust, pitch per procedure, don\'t change configuration.'],
    ['You are expecting icing en route. What do you check before flight?', 'rp', 'Forecasts (SIGMET, freezing level), anti-ice systems, alternate levels/routes.'],
    ['You are running late for your duty because of traffic. What do you do?', '', 'Inform crew scheduling early.'],
    ['You feel unwell before a flight. What do you do?', '', 'IMSAFE; report unfit — never operate.'],
    ['You didn\'t sleep well and feel fatigued before reporting. What do you do?', '', 'Fatigue report; fatigue risk management; just culture.'],
    ['How do you manage fatigue during long duty periods?', 'ap', 'Pre-duty rest, hydration, light meals, controlled rest where permitted, monitoring each other, reporting.'],
    ['You realise you made an error that nobody noticed. What do you do?', '', 'Report it (just culture / voluntary reporting).'],
    ['A passenger becomes unruly. How should the flight crew respond?', '', 'Cabin crew lead; captain decides; cockpit door stays locked; divert if needed; police on arrival.'],
    ['A passenger says there is a bomb on board. What do you do?', '', 'Treat seriously; security procedures; ATC; divert/land as advised.'],
    ['Bird strike on take-off roll above V1. What do you do?', '', 'Continue take-off (above V1); handle failures airborne.'],
    ['Bird strike below V1 with engine indications abnormal.', '', 'Reject per SOP if below V1 and malfunction.'],
    ['You are on approach and not stabilised at 1,000 ft. What do you do?', '', 'Go around.'],
    ['Explain the stabilised approach criteria.', 'ap', 'On profile/track, speed within limits, sink rate ≤ ~1,000 fpm, landing configuration, checklists done, power appropriate — by 1,000 ft IMC / 500 ft VMC (company SOP).'],
    ['The captain is incapacitated. What do you do?', '', 'Take control, autopilot, declare emergency, get cabin crew help, land at nearest suitable.'],
    ['You and the captain disagree about fuel. Who decides?', '', 'Captain decides, but you voice your concern clearly; extra fuel is usually the safe choice.'],
    ['ATC gives you an instruction you think is wrong. What do you do?', '', 'Query it; "unable" if unsafe.'],
    ['You lose radio contact. What do you do?', '', 'Squawk 7600, follow lost-comm procedures.'],
    ['A cabin crew member is rude to a passenger. What would you do as captain?', '', 'Address it privately and professionally.'],
    ['Your colleague is going through a divorce and looks distracted. What do you do?', '', 'Support, suggest peer support programme, safety concern if unfit.'],
    ['You are offered a bribe to "lose" a document. What do you do?', '', 'Refuse, report.'],
    ['A fellow cadet is about to fail a phase. What do you do?', '', 'Help study within rules.'],
    ['Your batchmate asks you to share answers in a test. What do you do?', '', 'Refuse.'],
    ['What would you do if you saw a colleague taking a photo in the cockpit during a critical phase?', '', 'Sterile cockpit; speak up.'],
    ['How would you make passengers feel safe during severe turbulence?', '', 'Seat-belt sign, PA, cabin crew seated, ATC for smoother level.'],
    ['A delayed flight\'s passengers are angry. What do you do?', '', 'Timely, honest PA; coordinate with ground staff.'],
    ['What is CRM?', '', 'Crew Resource Management: using all resources — people, information, equipment — for safe, efficient flight.'],
    ['What is Threat and Error Management?', '', 'Anticipate threats, detect and trap errors, manage undesired aircraft states.'],
    ['What is "just culture"?', '', 'Honest errors are not punished so people report them; recklessness and wilful violations are.'],
    ['What is the sterile cockpit rule?', '', 'No non-essential talk/activity during critical phases (below 10,000 ft).'],
    ['What is situational awareness?', '', 'Perceiving what is happening, understanding it, and projecting what will happen next.'],
    ['What is "automation complacency"?', '', 'Over-trusting automation and reducing monitoring.'],
  ]);

  add('Technical: aerodynamics', 'Reported tech questions are school-physics level for cadets (Quora: lift, drag, engines). Explain simply and correctly; say "I don\'t know" rather than guess.', [
    ['How does an aircraft fly? How is lift generated?', 'qu', 'Wing deflects air down & creates lower pressure above (Bernoulli + Newton). L = ½ρV²SCL.'],
    ['What are the four forces? How do they balance in straight and level flight?', '', 'Lift = weight, thrust = drag.'],
    ['What are the types of drag?', 'qu', 'Parasite (form, skin friction, interference) — increases with V²; induced — decreases with speed. Total drag minimum at Vmd.'],
    ['What causes a wing to stall?', 'dc', 'Exceeding the critical angle of attack (~15–16°): flow separates.'],
    ['Can an aircraft stall at any speed?', '', 'Yes — stall depends on angle of attack, not speed.'],
    ['Why does stall speed increase in a turn?', '', 'Load factor n = 1/cos(bank); Vs increases with √n (60° bank → ×1.41).'],
    ['What is angle of attack vs angle of incidence?', '', 'AoA: chord vs relative airflow. Incidence: chord vs aircraft longitudinal axis (fixed).'],
    ['Explain the "Law of Continuity".', 'ap', 'Mass flow constant in a streamtube: A₁V₁ = A₂V₂ (incompressible) → speed rises where area narrows (venturi).'],
    ['What is Bernoulli\'s theorem?', '', 'In steady flow, static + dynamic pressure = constant.'],
    ['What are flaps and slats for?', '', 'Flaps raise CL (camber/area) → lower stall speed; slats delay separation → higher critical AoA.'],
    ['What is the purpose of winglets / sharklets?', '', 'Reduce wingtip vortices → less induced drag → fuel saving.'],
    ['What are wingtip vortices and wake turbulence?', '', 'High-pressure air below spills to low pressure above at tips; strongest heavy, clean, slow.'],
    ['What is ground effect?', '', 'Within ~one wingspan of the ground: reduced downwash → less induced drag → floating.'],
    ['What is a deep stall and why is it dangerous for T-tail aircraft?', 'ap', 'Wing wake blankets the T-tail at high AoA → elevator ineffective → unrecoverable.'],
    ['What is Dutch roll?', '', 'Coupled yaw–roll oscillation; worse with sweep; yaw damper suppresses it.'],
    ['Why are airliner wings swept?', '', 'Reduces effective Mach normal to leading edge → delays critical Mach.'],
    ['What is critical Mach number?', '', 'Free-stream Mach at which local flow somewhere first reaches Mach 1.'],
    ['What is "coffin corner"?', '', 'At high altitude, stall speed and Mach buffet speed converge — narrow margin.'],
    ['What is Mach tuck?', '', 'Nose-down pitch at high Mach as centre of pressure moves aft / shock-induced separation.'],
    ['What is dihedral and what does it do?', '', 'Upward wing angle → lateral (roll) stability.'],
    ['What is longitudinal stability? What affects it?', '', 'Pitch stability; CG position vs neutral point; tailplane.'],
    ['What happens if the CG is too far aft? Too far forward?', '', 'Aft: less stable, easier stall/spin. Forward: more stable, heavier controls, higher stall speed, more fuel.'],
    ['What are primary and secondary flight controls?', '', 'Primary: ailerons, elevator, rudder. Secondary: flaps, slats, spoilers, trim.'],
    ['What is adverse yaw?', '', 'Down-going aileron produces more induced drag → yaw away from turn; corrected by rudder/differential ailerons.'],
    ['What are spoilers / speed brakes used for?', '', 'Roll assist, descent, lift dumping on landing.'],
    ['What is trim?', '', 'Relieves control pressure to hold an attitude.'],
    ['What is a spin? How do you recover?', '', 'Autorotation after stall with yaw; PARE: power idle, ailerons neutral, rudder opposite, elevator forward.'],
    ['What is load factor?', '', 'Lift/weight (g).'],
    ['What is Vmca?', '', 'Minimum control speed with critical engine inoperative (airborne).'],
    ['What is the critical engine?', '', 'Engine whose failure most adversely affects performance/handling (P-factor on props).'],
    ['What is induced drag? Why is it highest at low speed?', '', 'Drag from lift production / downwash; high AoA at low speed.'],
    ['What is aspect ratio? Why do gliders have high aspect ratio?', '', 'Span²/area; high AR = less induced drag.'],
    ['Why do aircraft take off into wind?', '', 'Lower groundspeed for same airspeed → shorter run, better control.'],
    ['How does density altitude at Leh affect your take-off roll?', 'ap', 'High elevation + temperature → low density → less lift & thrust → longer roll, poorer climb.'],
    ['What is a "high, hot and humid" airfield problem?', '', 'All three reduce density → performance penalty.'],
  ]);

  add('Technical: engines & systems', 'Basic principles, not type-specific detail (unless you have trained on a type).', [
    ['How does a jet engine work?', 'qu', 'Intake → compressor → combustion → turbine → exhaust (suck, squeeze, bang, blow); Newton\'s third law.'],
    ['What is a turbofan and what is bypass ratio?', '', 'Fan air bypassing the core / core air; high BPR (A320neo ~11–12:1) = efficient, quiet.'],
    ['Turbojet vs turbofan vs turboprop?', '', 'Turboprop: turbine drives propeller via gearbox — efficient at low speed (ATR).'],
    ['How does a piston engine work?', '', 'Four strokes: intake, compression, power, exhaust.'],
    ['What is carburettor icing? When is it most likely?', '', 'Fuel evaporation + venturi cooling → ice even at +20 °C+ with high humidity.'],
    ['What is an APU?', '', 'Auxiliary power unit: small gas turbine for electrics and bleed air on ground/backup.'],
    ['What is bleed air used for?', '', 'Pressurisation, air conditioning, anti-ice, engine start (not on 787).'],
    ['Why are aircraft pressurised? What is cabin altitude?', '', 'Hypoxia; cabin kept ≤ 8,000 ft equivalent.'],
    ['What happens in a rapid decompression?', '', 'Oxygen masks on, emergency descent to 10,000 ft / MSA.'],
    ['What is fly-by-wire?', '', 'Electrical signals from controls to computers to actuators; envelope protections (Airbus).'],
    ['How many hydraulic systems does an A320 have?', '', 'Three: green, blue, yellow.'],
    ['Why do aircraft have multiple redundant systems?', '', 'No single failure should cause loss of control.'],
    ['What is anti-icing vs de-icing?', '', 'Prevent formation vs remove formed ice.'],
    ['What is reverse thrust?', '', 'Redirects fan/exhaust forward to decelerate on ground.'],
    ['What is an EGT and why monitor it?', '', 'Exhaust gas temperature — engine health / overtemp.'],
    ['What are N1 and N2?', '', 'Low- and high-pressure spool speeds (%).'],
    ['What is a compressor stall / surge?', '', 'Airflow breakdown in compressor — bangs, EGT rise.'],
    ['Describe the fuel system of an aircraft you know.', 'ap', 'Tanks, pumps, crossfeed, engine feed — as applicable.'],
    ['What are the basic flight instruments (six-pack)?', '', 'ASI, attitude, altimeter, turn coordinator, heading indicator, VSI.'],
    ['Which instruments use the pitot-static system?', '', 'ASI (pitot + static), altimeter and VSI (static).'],
    ['What happens to the ASI if the pitot tube is blocked (drain open)?', '', 'Reads zero/decreases.'],
    ['What happens to the altimeter if the static port is blocked?', '', 'Freezes at the altitude of blockage.'],
    ['What is a gyroscope? Name its two properties.', '', 'Rigidity in space and precession.'],
    ['What is a TCAS?', '', 'Traffic collision avoidance: TA and RA; always follow RA.'],
    ['What is GPWS / EGPWS?', '', 'Ground proximity warning; enhanced adds terrain database look-ahead.'],
  ]);

  add('Technical: meteorology', 'Use correct terms; tie to operations (hazard → what the pilot does).', [
    ['What is the ISA at mean sea level?', '', '15 °C, 1013.25 hPa, 1.225 kg/m³; lapse 1.98 °C/1,000 ft to 11 km (36,090 ft), then −56.5 °C.'],
    ['What is the pressure gradient force?', 'dc', 'Force from high to low pressure, proportional to isobar spacing.'],
    ['How does RVR work? RVR vs visibility?', 'dc', 'Transmissometer/forward-scatter along the runway, distance a pilot can see runway lights/markings; visibility is general met visibility.'],
    ['How do you read a SIGMET for severe turbulence?', 'ap', 'Phenomenon (SEV TURB), FIR, time, area, levels, movement, intensity change.'],
    ['What is a METAR? A TAF?', '', 'METAR: actual weather report (half-hourly/hourly). TAF: aerodrome forecast.'],
    ['What is QNH, QFE and QNE?', '', 'QNH: altimeter reads elevation; QFE: reads zero at aerodrome; QNE/1013.25: flight levels.'],
    ['What is transition altitude and transition level?', '', 'Below TA use QNH; at/above TL use 1013.25; India TA mostly 4,000 ft (varies).'],
    ['"High to low, look out below." Explain.', '', 'Flying to lower pressure/colder air without resetting → altimeter over-reads → you\'re lower than indicated.'],
    ['What is a thunderstorm and why do pilots avoid it?', '', 'CB: turbulence, hail, icing, lightning, microburst/windshear; avoid by 20 NM.'],
    ['What are the stages of a thunderstorm?', '', 'Cumulus (updrafts), mature (up+down, rain, most severe), dissipating (downdrafts).'],
    ['What is a microburst?', '', 'Intense localised downdraft, < 4 km, spreading out → headwind then tailwind on approach.'],
    ['What is windshear?', '', 'Sudden change in wind speed/direction over short distance.'],
    ['What is clear air turbulence?', '', 'Turbulence in clear air, often near jet streams.'],
    ['What is a jet stream? Where are they over India?', '', 'Narrow fast wind band near tropopause; subtropical westerly jet in winter, tropical easterly jet in monsoon.'],
    ['What are the types of fog? Which affects north India in winter?', '', 'Radiation, advection, steam, frontal, upslope; radiation fog in IGP winter.'],
    ['What is icing? Types?', '', 'Rime, clear, mixed; hoar frost; carburettor.'],
    ['What is a western disturbance?', '', 'Extratropical low from the west bringing winter rain/snow and fog to north India.'],
    ['How does the monsoon work?', '', 'Seasonal wind reversal from land–sea heating difference; SW monsoon June–Sept.'],
    ['What is a tropical cyclone? Where do they form near India?', '', 'Warm-core low with winds ≥ 34 kt; Bay of Bengal & Arabian Sea, pre/post-monsoon.'],
    ['What is the dew point? What does a small temperature–dew point spread mean?', '', 'Temperature at which air saturates; small spread → fog/cloud likely.'],
    ['What is an inversion?', '', 'Temperature rising with height; traps smog/fog; stable.'],
    ['Why does air cool as it rises?', '', 'Adiabatic expansion: DALR 3 °C/1,000 ft, SALR ~1.5 °C/1,000 ft.'],
    ['What is a front? Warm vs cold front weather?', '', 'Boundary of air masses; cold front: CB, showers, gusty; warm: layered cloud, steady rain.'],
    ['What is a sea breeze?', '', 'Day: land heats faster → onshore wind.'],
    ['What is the tropopause and why is it higher at the equator?', '', 'Top of troposphere; ~16–18 km equator, ~8 km poles — strong convection/heating.'],
  ]);

  add('Technical: navigation & instruments', 'Definitions + one operational line.', [
    ['Explain PNR vs ETP.', 'ap', 'Point of No Return: furthest point you can go and still return with fuel. ETP: point where time to continue = time to return.'],
    ['What is the 1-in-60 rule?', '', '1 NM off track after 60 NM ≈ 1°. Track error = off-track × 60 / distance.'],
    ['Difference between true, magnetic and compass heading?', '', 'Variation (true→magnetic), deviation (magnetic→compass).'],
    ['What is heading vs track vs course?', '', 'Heading: nose direction; track: path over ground; course: intended.'],
    ['What is drift?', '', 'Angle between heading and track due to wind.'],
    ['What is IAS, CAS, EAS, TAS and ground speed?', '', 'Each correction step; TAS > IAS at altitude; GS = TAS ± wind.'],
    ['Why does TAS increase with altitude for the same IAS?', '', 'Lower density.'],
    ['What is a great circle and a rhumb line?', '', 'Shortest path vs constant track.'],
    ['What is a nautical mile?', '', '1 minute of latitude ≈ 1,852 m.'],
    ['What is an ILS? Its components?', '', 'Localizer (lateral), glideslope (vertical, ~3°), markers/DME.'],
    ['What is a VOR?', '', 'VHF omnidirectional range, 108–117.95 MHz, radials.'],
    ['What is an NDB / ADF?', '', 'LF/MF beacon; ADF points to it.'],
    ['What is DME?', '', 'Distance measuring equipment — slant range.'],
    ['What is GNSS / GPS? What is GAGAN?', '', 'Satellite navigation; GAGAN = India\'s SBAS augmentation.'],
    ['What is RNAV / PBN?', '', 'Area navigation; performance-based navigation specs (RNAV/RNP).'],
    ['What is an inertial reference system?', '', 'Gyros + accelerometers; self-contained.'],
    ['What is a transponder? Codes 7500, 7600, 7700?', '', 'Hijack, radio failure, emergency.'],
    ['What is radar vectoring?', '', 'ATC headings to guide aircraft.'],
    ['How many time zones does India have? What is UTC?', '', 'One: IST = UTC + 5:30. Aviation uses UTC (Z).'],
    ['What is decision altitude vs minimum descent altitude?', '', 'DA: precision approach (decide at). MDA: non-precision (don\'t descend below).'],
    ['What is a holding pattern?', '', 'Racetrack, standard right turns, 1-minute legs below FL140.'],
    ['What is the semicircular / cruising level rule?', '', 'Eastbound (000–179) odd levels, westbound even (as per ICAO table, RVSM).'],
    ['What is RVSM?', '', '1,000 ft vertical separation FL290–FL410.'],
    ['What is ETOPS / EDTO?', '', 'Twin-engine operations beyond 60 min from an adequate alternate.'],
    ['Read me the time 14:30 IST in UTC.', '', '09:00 UTC.'],
  ]);

  add('Technical: regulations, ATC & human factors', 'Know the basics of DGCA/ICAO and human performance.', [
    ['What do you know about aviation regulations?', 'dc', 'ICAO (Chicago Convention 1944, Annexes) → DGCA (Aircraft Act 1934, Aircraft Rules 1937, CARs).'],
    ['What is ICAO? How many annexes?', '', 'UN body, 1944 Chicago Convention, 19 Annexes.'],
    ['What is DGCA? BCAS? AAIB? AAI?', '', 'Regulator; security regulator; accident investigation; airports/ATC provider.'],
    ['What are the freedoms of the air?', '', '1st overfly, 2nd technical stop, 3rd–4th carry to/from home, 5th beyond… (9 in total).'],
    ['What is FDTL?', '', 'Flight Duty Time Limitations (DGCA CAR) — revised norms raised weekly rest to 48 h and tightened night duty.'],
    ['What are the classes of airspace?', '', 'ICAO classes A–G (A most controlled, G uncontrolled); AIP India ENR 1.4 lists the classes India uses — check it.'],
    ['What are VFR and IFR? VMC minima?', '', 'Visual vs instrument flight rules; VMC e.g. 5 km vis, 1,500 m horizontal / 1,000 ft vertical from cloud (class-dependent).'],
    ['What licences exist? SPL, PPL, CPL, ATPL?', '', 'Student, private, commercial, airline transport.'],
    ['What are the CPL requirements in India?', '', '200 h total (incl. PIC, cross-country, night, instrument), Class 1 medical, DGCA exams, RTR.'],
    ['What is RTR (A)?', '', 'Radio Telephony Restricted (Aeronautical) licence — WPC/DGCA.'],
    ['What is a type rating?', '', 'Endorsement to fly a specific type (A320, 737).'],
    ['What is hypoxia? Its types?', '', 'Oxygen deficiency: hypoxic, hypaemic (anaemic), stagnant, histotoxic.'],
    ['What is spatial disorientation? Name an illusion.', '', 'Leans, somatogravic, black-hole approach, etc.'],
    ['What is IMSAFE?', '', 'Illness, Medication, Stress, Alcohol, Fatigue, Eating/Emotion.'],
    ['What is the SHELL model?', '', 'Software, Hardware, Environment, Liveware–Liveware interactions.'],
    ['What is the Swiss cheese model?', '', 'Reason: accidents when holes in multiple defences line up.'],
    ['What is DODAR / FORDEC?', '', 'Decision-making models: Diagnose, Options, Decide, Assign, Review.'],
    ['What is the phonetic alphabet? Spell your name.', '', 'Alfa, Bravo, Charlie…'],
    ['What does "Mayday" vs "Pan-Pan" mean?', '', 'Distress (grave, imminent danger) vs urgency.'],
    ['What is a NOTAM?', '', 'Notice to Airmen: temporary info on facilities/hazards.'],
    ['What is the AIP?', '', 'Aeronautical Information Publication (AIP India).'],
    ['What is a CVR and an FDR?', '', 'Cockpit voice and flight data recorders ("black boxes").'],
    ['What is an incident vs an accident vs a serious incident?', '', 'ICAO Annex 13 definitions.'],
    ['What is the role of the PIC?', '', 'Final authority & responsibility for the aircraft\'s operation and safety.'],
    ['What is the breath-alcohol test rule for crew in India?', '', 'Pre-flight BA test; any positive is a violation; no alcohol within 12 h before duty (DGCA CAR).'],
  ]);

  add('School physics & maths (asked aloud)', 'Panels sometimes test 10+2 basics orally; written tests (FTA: English/Physics/Maths, 70% to pass Stage 1) cover more.', [
    ['State Newton\'s three laws with aviation examples.', '', 'Inertia (steady cruise), F = ma (take-off acceleration), action–reaction (thrust).'],
    ['What is the difference between mass and weight?', '', 'Mass kg (constant); weight N = mg.'],
    ['What is the difference between speed and velocity?', '', 'Scalar vs vector.'],
    ['What is centripetal force? Apply it to a turning aircraft.', '', 'Horizontal lift component provides it.'],
    ['What is momentum? Is it conserved?', '', 'p = mv; conserved without external force.'],
    ['What is the difference between heat and temperature?', '', 'Energy vs average kinetic energy measure.'],
    ['State Boyle\'s and Charles\'s laws.', '', 'PV = const (T const); V/T = const (P const, kelvin).'],
    ['Why is the sky blue?', '', 'Rayleigh scattering of short wavelengths.'],
    ['What is Ohm\'s law?', '', 'V = IR.'],
    ['AC vs DC? Which do aircraft use?', '', 'Both: 115 V 400 Hz AC, 28 V DC.'],
    ['Why 400 Hz on aircraft?', '', 'Smaller, lighter transformers/motors.'],
    ['What is a vector? Resolve a 20 kt wind at 30° to the runway.', '', 'Crosswind 20 sin30 = 10 kt, headwind 20 cos30 ≈ 17 kt.'],
    ['What is the speed of sound at sea level ISA? What does it depend on?', '', '≈ 661 kt / 340 m/s; temperature only.'],
    ['What is pressure? Units?', '', 'Force/area; Pa, hPa, inHg.'],
    ['Why does a balloon rise?', '', 'Buoyancy: displaced air weighs more.'],
    ['What is terminal velocity?', '', 'Drag = weight.'],
    ['What is the value of g? Does it change?', '', '9.81 m/s²; slightly with latitude/altitude.'],
    ['sin 30°, cos 60°, tan 45°?', '', '0.5, 0.5, 1.'],
    ['A car travels 150 km in 2.5 h. Average speed?', '', '60 km/h.'],
    ['Convert 250 knots to km/h.', '', '≈ 463 km/h.'],
  ]);

  add('Industry & current affairs', 'Balanced, factual, non-speculative. Verified Oct 2026 — re-check news in the week before your interview.', [
    ['What are the challenges facing the aviation industry today?', 'dc', 'Pilot/engineer shortage, aircraft & engine delivery delays, airport capacity, fuel/forex costs, safety oversight, FDTL, SAF/climate.'],
    ['What do you think about the revised FDTL rules?', '', 'Weekly rest raised to 48 h, night duty limits tightened; IndiGo\'s Dec 2025 disruption showed thin crew buffers; safety case is strong.'],
    ['What happened in IndiGo\'s December 2025 scheduling crisis?', '', 'Mass cancellations amid crew shortfall after new FDTL norms; DGCA temporarily relaxed a weekly-rest clause and set a recovery deadline (Feb 2026).'],
    ['SpiceJet Q400 pilots refused to fly in October 2026. What does this tell you?', '', 'Reported 12–13 Oct 2026: ~40 Q400 pilots over unpaid salaries; ALPA India backed them; DGCA scrutiny. Financial health affects safety culture.'],
    ['Will automation or AI replace pilots?', 'ar', 'Not soon: certification, liability, cybersecurity, public trust; job will shift toward monitoring/decision-making.'],
    ['Is over-reliance on the FMS eroding basic flying skills?', 'ap', 'Evidence of skill decay; airlines encourage manual flying; UPRT training.'],
    ['What is sustainable aviation fuel? India\'s targets?', '', 'Drop-in fuel from waste/biomass; indicative blending 1% (2027), 2% (2028), 5% (2030) for international flights.'],
    ['What is CORSIA?', '', 'ICAO carbon offsetting scheme for international aviation.'],
    ['Why does India have a high share of women pilots?', '', '~15% vs ~5% globally; airline policies, family support, role models.'],
    ['India needs ~30,000 new pilots in the next decade. How should it train them?', '', 'More FTOs in India (new slots tendered), simulators, instructor pipeline, DGCA oversight.'],
    ['What do you know about Navi Mumbai and Noida (Jewar) airports?', '', 'NMIA: commercial ops 25 Dec 2025, international July 2026. Noida: ops from 15 June 2026.'],
    ['What lessons should the industry take from recent accidents?', '', 'Respect the investigation (AAIB); don\'t speculate (AI171 final report pending); just culture, data, training.'],
    ['What did the DGCA do after the January 2026 Baramati Learjet crash?', '', 'Grounded four Learjets of operator VSR Ventures (25 Feb 2026) over airworthiness oversight concerns. Know facts, don\'t speculate on cause.'],
    ['Should India have a third major full-service airline?', '', 'Market concentration (IndiGo + Air India group) vs history of airline failures (Kingfisher, Jet, Go First).'],
    ['Why have so many Indian airlines failed?', '', 'High fuel taxes (ATF under state VAT), rupee costs, price wars, debt, engine groundings (Go First – P&W).'],
    ['What is the effect of Pratt & Whitney GTF engine issues on Indian airlines?', '', 'Powder-metal defect inspections grounded many A320neo aircraft (IndiGo, Go First) 2023–25 → capacity loss, wet leases.'],
    ['Is India\'s duopoly good for passengers?', '', 'Efficiency vs pricing power.'],
    ['Should ATF be brought under GST?', '', 'Would cut costs (fuel ~40% of costs); revenue concerns of states.'],
    ['What is the role of MRO in India\'s growth?', '', 'Most heavy maintenance done abroad; domestic MRO saves forex, jobs.'],
    ['How do aircraft and engine delivery delays affect airlines?', '', 'Capacity constraints, older aircraft kept longer, leases, pilots idle.'],
    ['What are drones / eVTOL air taxis and how will they affect airspace?', '', 'Liberalised drone rules; UAM trials; integration and safety.'],
    ['What is the pilot-to-aircraft ratio problem?', '', 'India ~14 pilots per aircraft vs ~18–20 globally (parliamentary panel) → thin buffers.'],
    ['Should cockpit video recorders be mandatory?', '', 'Investigation benefit vs privacy and misuse.'],
    ['What is single-pilot operation and would you support it?', '', 'Studied for cruise; safety, incapacitation, workload concerns.'],
    ['How does weather (fog, monsoon) affect Indian airline operations?', '', 'Winter fog in north (CAT IIIB-trained crew), monsoon thunderstorms, cyclones.'],
    ['What do you know about the Indian Air Force / defence aviation contributions?', '', 'Optional general knowledge; be factual.'],
    ['Name three recent aviation developments in India.', '', 'Pick from: new airports, aircraft orders, FDTL, SAF, FTO expansion, Air India–Vistara merger.'],
    ['What are the pros and cons of airline consolidation (Air India–Vistara)?', '', 'Scale, network vs competition, culture merger.'],
    ['What is the impact of airspace closures (e.g. Pakistan airspace) on Indian carriers?', '', 'Longer routes, more fuel, crew duty, fares.'],
    ['What is the future of Indian aviation in 10 years?', '', 'Third-largest market, hub ambitions, widebody growth, infrastructure.'],
  ]);

  add('Questions to ask the panel', 'Ask one or two genuine questions at the end. Avoid salary/holiday questions (rp).', [
    ['What qualities do your most successful cadets share?', 'rp', ''],
    ['How are mentors assigned during training?', 'rp', ''],
    ['What is the biggest challenge new cadets face in their first year?', 'rp', ''],
    ['How does the airline support cadets who struggle in a training phase?', 'rp', ''],
    ['What does a typical first year as a line first officer look like?', '', ''],
    ['What do you enjoy most about working here?', '', ''],
  ]);

  /* flatten into B.interview: {c, q, src, look, tip} */
  B.interview = [];
  for (const [cat, d] of Object.entries(C)) for (const [q, s, look] of d.rows) B.interview.push({ c: cat, q, src: s ? 'reported: ' + SRC[s] : 'standard', look: look || d.look, catLook: d.look });
  /* merge back every first-edition question not already present (same wording) */
  const norm = t => t.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  const have = new Set(B.interview.map(x => norm(x.q)));
  const techCat = q => /QNH|QFE|RVR|visibility|seasons|weather/i.test(q) ? 'Technical: meteorology'
    : /jet|turbofan|engine|pressuris/i.test(q) ? 'Technical: engines & systems'
    : /Newton/i.test(q) ? 'School physics & maths (asked aloud)' : 'Technical: aerodynamics';
  const CAT = { 'You & motivation': 'About you & motivation', 'Airline & programme': 'Airline & programme knowledge', 'Behavioural (STAR)': 'Behavioural (STAR)', 'Situational & CRM': 'Situational & CRM', 'Industry & current affairs': 'Industry & current affairs' };
  OLD_IV.forEach(o => { if (have.has(norm(o.q))) return; const c = o.c === 'Technical basics' ? techCat(o.q) : (CAT[o.c] || o.c);
    B.interview.push({ c, q: o.q, src: /reported/.test(o.src) ? 'reported (candidate/coaching reports)' : 'standard', look: [o.look, o.tip ? 'Outline: ' + o.tip : ''].filter(Boolean).join(' '), catLook: C[c] ? C[c].look : '' }); have.add(norm(o.q)); });
  const order = Object.keys(C); B.interview.sort((a, b) => order.indexOf(a.c) - order.indexOf(b.c));
  B.interviewCats = Object.fromEntries(Object.entries(C).map(([k, v]) => [k, v.look]));

  /* ---------------- GD topics ---------------- */
  // [title, kind, points-for, points-against, close, facts?, src?]
  const G = [
    // aviation opinion
    ['Automation vs human skill: are pilots becoming system managers?', 'Aviation', 'Automation reduces workload and many errors; precise, fuel-efficient flight', 'Skill decay; automation surprises; humans needed for novel failures', 'Automation as a tool + mandatory manual-flying and UPRT practice', ['Airlines now encourage manual flying in suitable conditions.'], 'ap'],
    ['Will AI replace pilots?', 'Aviation', 'AI monitors systems, predicts maintenance, reduces workload', 'Certification, liability, cyber risk, public trust, novel situations', 'AI will change the job before it replaces it', [], 'ar'],
    ['Procedure vs judgement: should pilots always follow the checklist?', 'Aviation', 'SOPs capture lessons written in blood; predictability in a crew', 'No checklist covers everything (e.g. Hudson river ditching)', 'Follow SOP by default; judgement when SOP doesn\'t fit, with crew consensus', [], 'ar'],
    ['Safety vs on-time performance', 'Aviation', 'OTP is a competitive edge, customers value it', 'Time pressure drives errors; "get-there-itis"', 'Safety is non-negotiable; good planning gives both', [], 'ar'],
    ['The authority gradient: how should a junior FO correct a senior captain?', 'Aviation', 'Hierarchy aids clear command', 'Steep gradient silences juniors (Tenerife, KLM)', 'Flat-enough gradient: CRM, graded assertiveness', [], 'ap'],
    ['Safety vs commercials: costly diversion or marginal-weather landing?', 'Aviation', 'Commercial costs are real', 'Accidents cost far more; legal & moral duty', 'Policy must back crews who divert', [], 'ap'],
    ['Fatigue management vs airline productivity', 'Aviation', 'Rostering efficiency keeps fares low', 'Fatigue is a proven accident factor', 'FRMS, realistic buffers, honest reporting', ['Revised FDTL: weekly rest raised to 48 h; night-duty limits tightened.'], 'ar'],
    ['Is aviation\'s carbon footprint justified?', 'Aviation', 'Connectivity, economy, tourism; ~2–3% of global CO₂', 'Fastest-growing emissions; few alternatives soon', 'SAF, new fleets, operational efficiency, offsets (CORSIA)', [], 'ar'],
    ['Sustainability vs profitability', 'Aviation', 'New fleets save fuel and money', 'SAF costs 2–5× jet fuel; price-sensitive Indian market', 'Phased mandates with incentives and domestic feedstock', ['India\'s indicative SAF blending: 1% 2027, 2% 2028, 5% 2030 (international flights).'], 'ap'],
    ['Work–life balance in a 24/7 industry', 'Aviation', 'Rested crews are safer and stay longer', 'Short-term capacity loss', 'Plan crew buffers; respect rest rules', ['IndiGo Dec 2025 disruption followed new FDTL norms; DGCA temporarily relaxed a weekly-rest clause.'], 'ap'],
    ['Single-pilot cockpits: the future?', 'Aviation', 'Cost savings; technology is improving', 'Incapacitation, workload, cross-checking lost', 'Not for passenger airlines in the foreseeable future', [], ''],
    ['Should cockpit video recorders be mandatory?', 'Aviation', 'Better investigations', 'Privacy, misuse, pilot resistance', 'Only with strict legal protection', [], ''],
    ['Do low fares compromise safety?', 'Aviation', 'Same DGCA rules for all; efficiency ≠ cutting safety', 'Pressure on schedules and pay', 'Regulation + safety culture', [], ''],
    ['Should pilots be allowed to talk to the media after incidents?', 'Aviation', 'Transparency', 'Speculation, legal issues', 'Official channels and investigation first', [], ''],
    ['Social media and aviation safety', 'Aviation', 'Rapid info, accountability', 'Misinformation after accidents', 'Wait for official reports', [], ''],
    ['Should mental-health issues ground pilots?', 'Aviation', 'Safety of passengers', 'Fear of grounding hides problems', 'Confidential peer support + fair return-to-fly pathways', [], ''],
    ['Is a degree necessary to become a pilot?', 'Aviation', 'Plan B, broader thinking', 'Cost/time; flying skill is separate', 'Useful but not essential', [], ''],
    ['Should flying training be subsidised for meritorious students?', 'Aviation', 'Widens talent pool', 'Huge cost; private benefit', 'Merit-cum-means scholarships with service bonds', [], ''],
    ['Should cadet programmes cost ₹1 crore? Is the bond fair?', 'Aviation', 'Includes type rating + job pathway', 'Excludes poorer talent; limits mobility', 'Scholarships / income-share models', [], ''],
    ['Women in the cockpit: what India can teach the world', 'Aviation', 'Role models, policies, family support', 'Still few in command/leadership', 'Mentoring, childcare-friendly rosters', ['~15% of Indian pilots are women vs ~5% globally.'], ''],
    ['Drones and air taxis: opportunity or airspace risk?', 'Aviation', 'Logistics, agriculture, emergency use', 'Integration, privacy, security', 'Digital airspace management, geofencing', [], ''],
    ['Should mobile phones be allowed in flight?', 'Aviation', 'Connectivity', 'Cabin disturbance, interference concerns', 'Data-only Wi-Fi', [], ''],
    ['Bigger seats or cheaper fares?', 'Aviation', 'Passenger comfort and health', 'Price-sensitive market', 'Choice via fare families', [], ''],
    ['Should airlines charge for checked baggage and seat selection?', 'Aviation', 'Lower base fare', 'Hidden costs', 'Transparent pricing', [], ''],
    ['High-speed rail vs short-haul flights', 'Aviation', 'Rail: lower emissions, city-centre', 'Huge capital costs; flights faster long-haul', 'Complementary networks', [], ''],
    ['Should older aircraft be retired faster?', 'Aviation', 'Fuel efficiency, reliability', 'Cost; age isn\'t safety if maintained', 'Maintenance quality matters more than age', [], ''],
    // India / policy / current
    ['India needs 30,000 pilots: quantity or quality?', 'India & policy', 'Domestic FTOs cut cost and foreign dependence', 'Instructor shortage, weather, airspace limits', 'Scale with strict DGCA oversight and simulators', ['Government projections: 30,000+ pilots over the next decade; new FTO slots tendered in 2026.'], ''],
    ['Is India ready to be a global aviation hub?', 'India & policy', 'Geography, market size, huge orders', 'Widebody shortage, slots, MRO & talent gaps', 'Long-haul fleets + hub airports + workforce', ['IndiGo ordered 500 A320neo-family aircraft (2023); Air India 470 aircraft (2023).'], ''],
    ['Duopoly in Indian aviation: good or bad?', 'India & policy', 'Financially stable airlines', 'Pricing power, fewer choices', 'Encourage new entrants and regional airlines', [], ''],
    ['Why do Indian airlines keep failing?', 'India & policy', '—', 'High ATF taxes, price wars, debt, engine groundings', 'Policy stability + cost discipline', ['Kingfisher (2012), Jet Airways (2019), Go First (2023) ceased operations.'], ''],
    ['Should ATF come under GST?', 'India & policy', 'Lower costs and fares', 'State revenue loss', 'Phased inclusion', [], ''],
    ['UDAN: has regional connectivity worked?', 'India & policy', 'New airports & routes, tier-2/3 access', 'Many routes closed after subsidies ended', 'Demand-led route selection', [], ''],
    ['New airports (Navi Mumbai, Noida) vs expanding old ones', 'India & policy', 'Relieves saturated metros', 'Distance, connectivity', 'Metro/rail links, incentives', ['NMIA opened 25 Dec 2025 (international July 2026); Noida opened 15 June 2026.'], ''],
    ['Privatisation of airports: good for passengers?', 'India & policy', 'Better infrastructure', 'Higher user charges', 'Strong regulator (AERA)', [], ''],
    ['Should the government regulate airfares?', 'India & policy', 'Prevents surge pricing in crises', 'Market distortion', 'Caps only in emergencies', [], ''],
    ['Airline salaries delayed: what should the regulator do?', 'India & policy', 'Financial stress hurts safety', 'Regulator isn\'t an employer', 'Financial-health oversight', ['Oct 2026: ~40 SpiceJet Q400 pilots refused to fly over unpaid salaries; ALPA India backed them; DGCA scrutiny.'], ''],
    ['Should India build its own commercial aircraft?', 'India & policy', 'Strategic autonomy, jobs', 'Huge cost & risk', 'Start with regional aircraft & components', [], ''],
    ['MRO in India: why does most heavy maintenance happen abroad?', 'India & policy', 'Policy fixes can bring it home', 'Taxes, scale, skills', 'Tax parity and training', [], ''],
    ['Airline consolidation (Air India–Vistara merger): win or loss?', 'India & policy', 'Scale, network', 'Less competition, culture clash', 'Depends on execution', [], ''],
    ['Should aviation be treated as an essential service?', 'India & policy', 'Connectivity, economy', 'Not a necessity for most', 'Essential for remote regions', [], ''],
    // scenario / task
    ['Fog season mass-delay crisis: how should an airline handle stranded passengers?', 'Scenario', 'Proactive rescheduling, CAT-III crew planning', '—', 'Communicate early, rebook, care for passengers', [], 'ar'],
    ['Create an airline for India: fleet, routes, model', 'Scenario', '—', '—', 'Defend choices together (LCC vs FSC, fleet type, hubs)', [], 'ar'],
    ['Design a regional route network for the North-East', 'Scenario', '—', '—', 'Prioritise routes; terrain, weather, ATR vs jets', [], 'ar'],
    ['Ranking task: your aircraft ditched near an island — rank 10 items for survival', 'Scenario', '—', '—', 'Group reaches consensus; reasoning matters more than the "right" order', [], ''],
    ['A medical emergency on board, nearest airport below minima — group decides', 'Scenario', '—', '—', 'Options, risks, consensus', [], 'ap'],
    ['Engine failure on a long over-water flight — plan the response as a crew', 'Scenario', '—', '—', 'Aviate, navigate, communicate; diversion', [], 'ap'],
    ['Your airline must cut costs by 10% without touching safety — how?', 'Scenario', '—', '—', 'Fuel efficiency, utilisation, digital sales', [], ''],
    ['Plan a disaster-relief airlift after a cyclone', 'Scenario', '—', '—', 'Priorities, logistics, airports', [], ''],
    ['Improve passenger experience during long delays', 'Scenario', '—', '—', 'Information, care, compensation', [], ''],
    ['Reduce runway incursions at a busy Indian airport', 'Scenario', '—', '—', 'Training, signage, tech (stop bars), procedures', [], ''],
    // abstract
    ['"A chain is only as strong as its weakest link"', 'Abstract', 'Teams, safety systems', '—', 'Swiss cheese model: strengthen every layer', [], 'ar'],
    ['"Red"', 'Abstract', 'Danger, warnings, stop', 'Passion, energy, red-eye flights', 'Any angle; structure matters', [], ''],
    ['"Zero"', 'Abstract', 'Zero accidents, zero emissions goals', 'Zero tolerance can kill reporting culture', 'Creative, structured thinking', [], ''],
    ['"The sky is not the limit"', 'Abstract', 'Space, ambition', 'Limits keep us safe (operating envelope)', '', [], ''],
    ['"Speed vs accuracy"', 'Abstract', 'Speed matters in emergencies', 'Errors from rushing', 'Accurate first, then fast', [], ''],
    ['"Silence"', 'Abstract', 'Listening, sterile cockpit', 'Silence when you should speak up kills', '', [], ''],
    ['"Checklist"', 'Abstract', 'Discipline, memory aid', 'Can become mindless', '', [], ''],
    ['"Leaders are born, not made"', 'Abstract', 'Traits', 'Command courses, CRM show it is learned', 'Mostly made', [], ''],
    ['"Experience is the best teacher"', 'Abstract', 'Real learning', 'Learning from others\' mistakes is cheaper', 'Use reports and sims', [], ''],
    ['"Rules are meant to be broken"', 'Abstract', 'Innovation', 'In aviation, rules save lives', 'Change rules through proper channels', [], ''],
    // general
    ['Is social media doing more harm than good to youth?', 'General', 'Connection, learning', 'Addiction, misinformation', 'Responsible use', [], ''],
    ['Work from home vs office', 'General', 'Flexibility', 'Collaboration loss', 'Hybrid', [], ''],
    ['Should voting be compulsory?', 'General', 'Participation', 'Freedom of choice', '', [], ''],
    ['Electric vehicles: is India ready?', 'General', 'Pollution, oil imports', 'Charging, grid, cost', 'Phased adoption', [], ''],
    ['AI in education: boon or bane?', 'General', 'Personalised learning', 'Over-dependence, cheating', 'Guided use', [], ''],
    ['Brain drain: should India worry?', 'General', 'Remittances, global network', 'Talent loss', 'Create opportunities at home', [], ''],
    ['Is competitive-exam culture good for India?', 'General', 'Merit, fairness', 'Stress, rote learning', 'Reform evaluation', [], ''],
    ['Climate change: individual vs government responsibility', 'General', 'Individual choices add up', 'Systemic change needs policy', 'Both', [], ''],
    ['Startups vs stable jobs for graduates', 'General', 'Innovation, ownership', 'Risk, stability', 'Depends on stage of life', [], ''],
    ['Sports should be compulsory in schools', 'General', 'Fitness, teamwork', 'Academic load', 'Yes, with flexibility', [], ''],
  ];
  B.sources.push(
    ['Flight Training Adelaide — IndiGo Program FAQ (stages, 70% written cut-off, attempt rules)', 'https://www.flyfta.com/wp-content/uploads/2022/11/ADM-F.149-IndiGo-Program-Frequently-Asked-Questions_V1.9_Oct-22.pdf', 'official'],
    ['Air India — Pilot careers (psychologist round + technical/HR round)', 'https://pilotcareers.airindia.com/content/cadetpilot/in/en/pilot-careers.html', 'official'],
    ['Akasa Air — Pilot careers (interview, psychological assessment, sim evaluation)', 'https://www.akasaair.com/careers-at-akasa-air/pilots-careers-at-akasa-air', 'official'],
    ['RotatePilot — Airline cadet interview questions', 'https://rotatepilot.com/answer/airline-cadet-interview-questions', 'provider'],
    ['Garuda Aviation — IndiGo cadet selection guide', 'https://garudaaviation.in/blog/indigo-cadet-pilot-selection-guide', 'provider'],
    ['Poetic Pilot Academy — IndiGo (Chimes) cadet programme', 'https://poeticpilotacademy.com/blog/indigo-chimes-cadet-pilot-program', 'provider'],
    ['Aviator Room — Airline GD topics for pilots', 'https://www.aviatorroom.com/gd-topics', 'provider'],
    ['Airship Aviation — GD for pilots (CRM)', 'https://www.airshipaviation.com/blog/how-to-clear-airline-group-discussion-gd-for-pilots-crm-leadership-situational-awareness-explained/', 'provider'],
    ['Quora — FTA/IndiGo interview (candidate answers)', 'https://www.quora.com/What-questions-are-asked-in-the-FTAs-interview-for-the-IndiGo-Cadet-Pilot-Program', 'candidates'],
    ['PPRuNe — Interview for CPL at IGRUA (candidate, 2011)', 'https://www.pprune.org/interviews-jobs-sponsorship/458050-interview-cpl-igrua.html', 'candidate'],
    ['Runway Girl Network — Air India psychometric interviews (2015)', 'https://runwaygirlnetwork.com/2015/06/air-indias-new-psychometric-tests-criticized-by-would-be-pilots', 'candidates'],
    ['Business Today — SpiceJet Q400 pilots refuse to fly (13 Oct 2026)', 'https://businesstoday.in/latest/corporate/story/spicejet-q400-pilots-refuse-to-fly-over-unpaid-salaries-alpa-backs-move-report-561179-2026-10-13', 'news'],
    ['Wikipedia — 2025 IndiGo scheduling crisis', 'https://en.wikipedia.org/wiki/2025_IndiGo_scheduling_crisis', 'news'],
  );
  B.gd = G.map(([t, kind, f, a, close, facts, s]) => ({ t, kind, src: s ? 'reported: ' + SRC[s] : 'typical topic', for: f === '—' ? [] : f.split('; ').length > 1 ? f.split('; ') : [f], against: a === '—' ? [] : [a], close, facts: facts || [] }));
  const haveG = new Set(B.gd.map(g => norm(g.t)));
  const gkind = t => /abstract/i.test(t) ? 'Abstract' : /India|airports|30,000|profitable/i.test(t) ? 'India & policy' : 'Aviation';
  OLD_GD.forEach(o => { if (haveG.has(norm(o.t.replace(/^Abstract topic: /, '')))) return; B.gd.push({ t: o.t.replace(/^Abstract topic: /, ''), kind: gkind(o.t), src: /reported/.test(o.src) ? 'reported (prep-site GD topic)' : 'typical topic', for: o.for || [], against: o.against || [], close: o.close || '', facts: o.facts || [] }); haveG.add(norm(o.t)); });
  const korder = ['Aviation', 'India & policy', 'Scenario', 'Abstract', 'General']; B.gd.sort((a, b) => korder.indexOf(a.kind) - korder.indexOf(b.kind));
})();

/* ---------------- more English items ---------------- */
(function () {
  'use strict';
  const B = window.ADAPT_BANK;
  const E = (q, o, a, t, ex) => B.english.push({ q, o, a, t, ex });
  E('Choose the correct word: The aircraft ___ been refuelled before the crew arrived.', ['has', 'had', 'have', 'having'], 1, 'grammar', 'Past perfect for the earlier of two past actions.');
  E('Choose the correct word: If the visibility ___ below 800 m, we will hold.', ['drops', 'will drop', 'dropped', 'would drop'], 0, 'grammar', 'First conditional: if + present, will + verb.');
  E('Choose the correct word: Neither of the engines ___ showing any fault.', ['are', 'is', 'were', 'have'], 1, 'grammar', '"Neither of" takes a singular verb.');
  E('Choose the correct word: The checklist must be completed ___ take-off.', ['prior', 'prior to', 'previous', 'before of'], 1, 'preposition');
  E('Choose the correct word: We were cleared ___ the ILS approach for runway 27.', ['to', 'for', 'at', 'on'], 1, 'preposition');
  E('Choose the correct word: She is good ___ mental arithmetic.', ['in', 'at', 'on', 'with'], 1, 'preposition');
  E('Choose the correct word: The flight was diverted ___ Hyderabad.', ['at', 'to', 'in', 'into'], 1, 'preposition');
  E('Choose the correct word: He insisted ___ checking the fuel himself.', ['for', 'on', 'to', 'at'], 1, 'preposition');
  E('Choose the correct word: The captain has ___ experience than the first officer.', ['more', 'most', 'much', 'many'], 0, 'grammar');
  E('Choose the correct word: There are ___ passengers on this flight than usual.', ['less', 'fewer', 'little', 'least'], 1, 'grammar');
  E('Choose the correct word: Each of the students ___ given a headset.', ['were', 'was', 'are', 'have been'], 1, 'grammar');
  E('Choose the correct word: By next June I ___ my CPL.', ['will complete', 'will have completed', 'complete', 'completed'], 1, 'grammar', 'Future perfect for completion before a future time.');
  E('Choose the correct word: The weather, as well as the traffic, ___ causing delays.', ['are', 'is', 'were', 'have'], 1, 'grammar');
  E('Choose the correct word: The pilot, ___ had flown for 20 years, stayed calm.', ['which', 'who', 'whom', 'whose'], 1, 'grammar');
  E('Choose the correct word: The runway ___ lights failed was closed.', ['who', 'which', 'whose', 'that'], 2, 'grammar');
  E('Choose the correct word: I would rather you ___ the briefing now.', ['start', 'started', 'will start', 'starting'], 1, 'grammar');
  E('Choose the correct word: Hardly ___ landed when the storm began.', ['we had', 'had we', 'we have', 'have we'], 1, 'grammar', 'Inversion after "hardly".');
  E('Choose the correct word: The instructor made the student ___ the procedure.', ['to repeat', 'repeat', 'repeating', 'repeated'], 1, 'grammar');
  E('Choose the correct word: It\'s time we ___ for the airport.', ['leave', 'left', 'will leave', 'leaving'], 1, 'grammar');
  E('Choose the word closest in meaning to CONTINGENCY.', ['Certainty', 'Possible future event planned for', 'Delay', 'Contract'], 1, 'vocabulary');
  E('Choose the word closest in meaning to PRECAUTION.', ['A step taken in advance to prevent harm', 'A mistake', 'A punishment', 'A reward'], 0, 'vocabulary');
  E('Choose the word closest in meaning to DILIGENT.', ['Lazy', 'Hard-working and careful', 'Clever', 'Fast'], 1, 'vocabulary');
  E('Choose the word closest in meaning to OBSOLETE.', ['Modern', 'Out of date', 'Expensive', 'Broken'], 1, 'vocabulary');
  E('Choose the word closest in meaning to ABORT.', ['Begin', 'Stop before completion', 'Repeat', 'Delay'], 1, 'vocabulary');
  E('Choose the word closest in meaning to RESILIENT.', ['Fragile', 'Able to recover quickly', 'Stubborn', 'Quiet'], 1, 'vocabulary');
  E('Choose the word closest in meaning to CONCUR.', ['Disagree', 'Agree', 'Compete', 'Conquer'], 1, 'vocabulary');
  E('Choose the word closest in meaning to NEGLIGENT.', ['Careless', 'Careful', 'Small', 'Absent'], 0, 'vocabulary');
  E('Choose the word closest in meaning to ROUTINE.', ['Unusual', 'Regular procedure', 'Dangerous', 'Route'], 1, 'vocabulary');
  E('Choose the word closest in meaning to ANTICIPATE.', ['Expect and prepare for', 'Forget', 'Avoid', 'Celebrate'], 0, 'vocabulary');
  E('Choose the word closest in meaning to FEASIBLE.', ['Impossible', 'Possible and practical', 'Expensive', 'Visible'], 1, 'vocabulary');
  E('Choose the word closest in meaning to TURBULENT.', ['Calm', 'Violently disturbed', 'Cold', 'Slow'], 1, 'vocabulary');
  E('Choose the word closest in meaning to ACCURATE.', ['Precise', 'Rough', 'Late', 'Careless'], 0, 'vocabulary');
  E('Choose the word closest in meaning to CONSPICUOUS.', ['Hidden', 'Clearly visible', 'Suspicious', 'Ordinary'], 1, 'vocabulary');
  E('Choose the OPPOSITE of EXPAND.', ['Grow', 'Contract', 'Extend', 'Spread'], 1, 'vocabulary');
  E('Choose the OPPOSITE of ACCEPT.', ['Receive', 'Reject', 'Allow', 'Approve'], 1, 'vocabulary');
  E('Choose the OPPOSITE of TRANSPARENT.', ['Clear', 'Opaque', 'Thin', 'Bright'], 1, 'vocabulary');
  E('Choose the OPPOSITE of MINIMUM.', ['Least', 'Maximum', 'Average', 'Small'], 1, 'vocabulary');
  E('Choose the OPPOSITE of VOLUNTARY.', ['Optional', 'Compulsory', 'Free', 'Willing'], 1, 'vocabulary');
  E('Choose the OPPOSITE of SCARCE.', ['Rare', 'Plentiful', 'Little', 'Short'], 1, 'vocabulary');
  E('Choose the correctly spelt word.', ['Recieve', 'Receive', 'Receeve', 'Receve'], 1, 'spelling');
  E('Choose the correctly spelt word.', ['Seperate', 'Separate', 'Seperete', 'Separete'], 1, 'spelling');
  E('Choose the correctly spelt word.', ['Definately', 'Definitely', 'Definitly', 'Defenitely'], 1, 'spelling');
  E('Choose the correctly spelt word.', ['Embarrass', 'Embarass', 'Embaras', 'Emberrass'], 0, 'spelling');
  E('Choose the correctly spelt word.', ['Lieutenant', 'Leiutenant', 'Lieutenent', 'Lutenant'], 0, 'spelling');
  E('Choose the correctly spelt word.', ['Aeroplane', 'Areoplane', 'Aeroplain', 'Aerroplane'], 0, 'spelling');
  E('Identify the error: "The number of (A) / delayed flights (B) / have increased (C) / this winter (D)."', ['A', 'B', 'C', 'D'], 2, 'error', '"The number of" is singular: "has increased".');
  E('Identify the error: "She is one of the pilots (A) / who has (B) / flown (C) / the A350 (D)."', ['A', 'B', 'C', 'D'], 1, 'error', '"Who" refers to "pilots": "who have".');
  E('Identify the error: "Despite of (A) / the heavy rain, (B) / the flight (C) / departed on time (D)."', ['A', 'B', 'C', 'D'], 0, 'error', '"Despite" or "In spite of".');
  E('Identify the error: "If I was (A) / the captain, (B) / I would have (C) / diverted earlier (D)."', ['A', 'B', 'C', 'D'], 0, 'error', 'Subjunctive "If I were" (and here "had been" for past).');
  E('Identify the error: "The crew (A) / were told (B) / to report at (C) / 0600 hours sharp (D)."', ['A', 'B', 'C', 'No error'], 3, 'error', 'Collective noun as individuals: "were" is acceptable.');
  E('Identify the error: "He explained me (A) / the procedure (B) / for engine start (C) / in detail (D)."', ['A', 'B', 'C', 'D'], 0, 'error', '"Explained the procedure to me".');
  E('Choose the meaning of "to be on the same page".', ['To read together', 'To share the same understanding', 'To be equal in rank', 'To agree to everything'], 1, 'idiom');
  E('Choose the meaning of "a close call".', ['A phone call', 'A narrow escape from danger', 'A quick decision', 'A loud noise'], 1, 'idiom');
  E('Choose the meaning of "to learn the ropes".', ['To learn how a job is done', 'To tie knots', 'To climb', 'To make mistakes'], 0, 'idiom');
  E('Choose the meaning of "by the book".', ['Strictly following the rules', 'Read aloud', 'Quickly', 'Without care'], 0, 'idiom');
  E('Choose the meaning of "to break the ice".', ['To cause trouble', 'To start a conversation in a tense situation', 'To de-ice wings', 'To end a relationship'], 1, 'idiom');
  E('Choose the meaning of "under the weather".', ['Feeling unwell', 'Flying below cloud', 'In danger', 'Very busy'], 0, 'idiom');
  E('Choose the meaning of "to touch base".', ['To land', 'To make brief contact', 'To finish', 'To start a game'], 1, 'idiom');
  E('Put in order: (P) to the gate (Q) after landing (R) taxied (S) the aircraft. Correct order:', ['S R P Q', 'Q S R P', 'S Q R P', 'Both A and B are correct'], 3, 'order', '"The aircraft taxied to the gate after landing" / "After landing the aircraft taxied to the gate".');
  E('Choose the passive form: "ATC cleared the flight for take-off."', ['The flight cleared ATC for take-off.', 'The flight was cleared for take-off by ATC.', 'The flight has cleared for take-off.', 'ATC was cleared for take-off.'], 1, 'grammar');
  E('Choose the reported form: She asked, "Have you checked the NOTAMs?"', ['She asked if I had checked the NOTAMs.', 'She asked have I checked the NOTAMs.', 'She asked did I check the NOTAMs.', 'She asked that I checked the NOTAMs.'], 0, 'grammar');
  E('Read: "Pilots must report any medication they take, because even common drugs such as antihistamines can cause drowsiness." Which is supported?', ['Antihistamines are banned for pilots', 'Some common drugs can affect alertness', 'Pilots cannot take any medication', 'Drowsiness is caused only by fatigue'], 1, 'comprehension');
  E('Read: "The runway was resurfaced overnight; until markings are repainted, aircraft may only use it in daylight." When can aircraft use the runway?', ['Any time', 'Only at night', 'Only in daylight until markings are repainted', 'Not until next week'], 2, 'comprehension');
  E('Read: "Although the crew followed every procedure, the investigation found the procedure itself was flawed." The writer implies:', ['The crew were careless', 'The procedure needed changing', 'No investigation was done', 'The aircraft was faulty'], 1, 'comprehension');
  E('Read: "Fuel is ordered on the basis of the flight plan, plus contingency, alternate and final reserve fuel." Which is NOT mentioned?', ['Contingency fuel', 'Alternate fuel', 'Taxi fuel', 'Final reserve fuel'], 2, 'comprehension');
})();

/* ---------------- more situational-judgement items ---------------- */
(function () {
  'use strict';
  const B = window.ADAPT_BANK;
  const J = (s, o, best, worst, ex) => B.sjt.push({ s, o, best, worst, ex });
  J('You are 10 minutes late to a group briefing because you misread the schedule.', ['Slip in quietly and say nothing.', 'Apologise briefly, take responsibility, catch up afterwards.', 'Blame the schedule.', 'Skip the briefing entirely.'], 1, 3, 'Ownership; don\'t disrupt; make up what you missed.');
  J('In a team exercise, the leader assigns you a task you think is pointless.', ['Refuse.', 'Ask briefly how it fits the plan, then do it well.', 'Do it badly to make a point.', 'Complain to others.'], 1, 2, 'Clarify, then commit — followership.');
  J('You notice a classmate copying during a mock exam.', ['Copy too.', 'Ignore it.', 'Speak to them afterwards and, if it continues, inform the instructor.', 'Shout it out during the exam.'], 2, 0, 'Integrity with tact.');
  J('You are given feedback that you talk too much in group discussions.', ['Stop speaking in GDs altogether.', 'Practise shorter points and inviting others; ask for feedback again.', 'Argue the feedback is wrong.', 'Ignore it.'], 1, 0, 'Adjust, not overcorrect.');
  J('Your simulator partner keeps making the same mistake and is getting frustrated.', ['Laugh it off.', 'Calmly suggest reviewing the procedure together after the session.', 'Report them as weak.', 'Take over all tasks yourself.'], 1, 0, 'Support a teammate.');
  J('You find a procedure in the manual that seems unsafe.', ['Ignore the manual and do it your way.', 'Follow it for now and raise the concern formally with the right person.', 'Tell other cadets to ignore it.', 'Post about it on social media.'], 1, 3, 'Change rules through proper channels.');
  J('Two group members strongly disagree and the discussion is stuck.', ['Pick the louder side.', 'Summarise both views, find common ground, propose a way to decide.', 'Change the topic.', 'Leave them to argue.'], 1, 3, 'Facilitation and consensus.');
  J('You are offered alcohol at a party the night before an early morning training flight.', ['Drink a little.', 'Decline; you have flying the next morning.', 'Drink and take a later slot without telling anyone.', 'Drink and sleep it off.'], 1, 2, 'Alcohol rules + honesty.');
  J('You receive a lower mark than a friend for similar work.', ['Ask the instructor what to improve.', 'Accuse the instructor of bias publicly.', 'Copy your friend next time.', 'Give up on the subject.'], 0, 1, 'Learning orientation.');
  J('During a GD, someone quotes a statistic you know is wrong.', ['Mock them.', 'Politely offer the correct figure and its source.', 'Say nothing.', 'Agree to avoid conflict.'], 1, 0, 'Accuracy with respect.');
  J('You realise mid-flight-planning that you used last week\'s weather.', ['Continue; it\'s probably similar.', 'Stop, get current weather, redo affected parts, tell your instructor.', 'Hide it.', 'Ask a friend to fix it.'], 1, 2, 'Correct and report.');
  J('A teammate takes credit for your idea in front of the assessor.', ['Argue loudly.', 'Build on the idea positively and clarify your contribution calmly later if needed.', 'Sulk for the rest of the exercise.', 'Sabotage their next idea.'], 1, 3, 'Professional composure.');
  J('You are struggling with a subject and the exam is in a week.', ['Panic and cram all night.', 'Make a focused plan, ask for help, prioritise weak areas, sleep.', 'Skip the exam.', 'Hope it goes well.'], 1, 2, 'Self-management.');
  J('Ground staff ask you to hurry boarding though a cabin check isn\'t finished (as crew).', ['Hurry.', 'Politely explain the check must finish first and give an estimated time.', 'Argue with them.', 'Skip the check.'], 1, 3, 'Safety over schedule, communicated well.');
  J('A quiet group member hasn\'t spoken in a 10-minute GD.', ['Ignore them; less competition.', 'Invite them: "We haven\'t heard from you — what do you think?"', 'Point out they are silent.', 'Speak for them.'], 1, 2, 'Inclusion without embarrassment.');
})();
