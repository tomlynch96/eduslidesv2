import type { Subject } from '../types';

export const physicsSubject: Subject = {
  id: 'physics',
  title: 'Physics',
  units: [
    {
      id: 'year-10',
      title: 'Year 10',
      topics: [
        {
          id: 'sp3',
          code: 'SP3',
          title: 'Conservation of Energy',
          lessons: [
            {
              id: 'sp3a',
              code: 'SP3a',
              title: 'Energy stores and transfers',
              objectives: [
                { id: 'sp3a-1', text: 'Analyse the changes involved in the way energy is stored when a system changes.' },
                { id: 'sp3a-2', text: 'Explain that where there are energy transfers in a closed system, there is no net change to the total energy.' },
                { id: 'sp3a-3', text: 'Draw and interpret diagrams to represent energy transfers (e.g. Sankey diagrams).' },
                { id: 'sp3a-4', text: 'State the energy stores and transfers.' },
                { id: 'sp3a-5', text: 'Describe what happens to wasted energy in energy transfers.' },
              ],
            },
            {
              id: 'sp3b',
              code: 'SP3b',
              title: 'Energy efficiency',
              objectives: [
                { id: 'sp3b-1', text: 'Explain that mechanical processes become wasteful when they cause a rise in temperature, dissipating energy in heating the surroundings.' },
                { id: 'sp3b-2', text: 'Explain ways of reducing unwanted energy transfer, including through lubrication and thermal insulation.' },
                { id: 'sp3b-3', text: 'Recall and use the efficiency equation: efficiency = useful energy transferred / total energy supplied.' },
                { id: 'sp3b-4', text: 'Explain how efficiency can be increased.' },
              ],
            },
            {
              id: 'sp3c',
              code: 'SP3c',
              title: 'Keeping warm',
              objectives: [
                { id: 'sp3c-1', text: 'Describe the effects of the thickness and thermal conductivity of the walls of a building on its rate of cooling.' },
                { id: 'sp3c-2', text: 'Describe the ways in which energy can be transferred by heating.' },
                { id: 'sp3c-3', text: 'Explain how different ways of reducing energy transfer by heating work.' },
              ],
            },
            {
              id: 'sp3d',
              code: 'SP3d',
              title: 'Stored energies',
              objectives: [
                { id: 'sp3d-1', text: 'Recall and use ΔGPE = m × g × Δh.' },
                { id: 'sp3d-2', text: 'Recall and use KE = ½ × m × v².' },
                { id: 'sp3d-3', text: 'Describe how different factors affect gravitational potential energy and kinetic energy.' },
              ],
            },
            {
              id: 'sp3ef',
              code: 'SP3e/f',
              title: 'Non-renewable and Renewable resources',
              objectives: [
                { id: 'sp3ef-1', text: 'Describe the main energy sources available for use on Earth.' },
                { id: 'sp3ef-2', text: 'Compare the ways in which both renewable and non-renewable sources are used.' },
                { id: 'sp3ef-3', text: 'Explain patterns and trends in the use of energy resources.' },
              ],
            },
            {
              id: 'sp3-test',
              code: 'SP3 Test',
              title: 'End of topic test',
              objectives: [{ id: 'sp3-test-1', text: 'To assess learning.' }],
            },
          ],
        },
        {
          id: 'sp4',
          code: 'SP4',
          title: 'Waves',
          lessons: [
            {
              id: 'sp4a',
              code: 'SP4a',
              title: 'Describing waves',
              objectives: [
                { id: 'sp4a-1', text: 'Recall that waves transfer energy and information without transferring matter.' },
                { id: 'sp4a-2', text: 'Define and use the terms frequency and wavelength as applied to waves.' },
                { id: 'sp4a-3', text: 'Use the terms amplitude, period and wave velocity as applied to waves.' },
                { id: 'sp4a-4', text: 'Describe the difference between longitudinal and transverse waves.' },
              ],
            },
            {
              id: 'sp4b',
              code: 'SP4b',
              title: 'Wave speeds',
              objectives: [
                { id: 'sp4b-1', text: 'Use v = x/t and v = f × λ for all waves.' },
              ],
            },
            {
              id: 'sp4b-practical',
              code: 'SP4b CP',
              title: 'Core Practical: Investigating waves',
              objectives: [
                { id: 'sp4b-cp-1', text: 'Describe how to measure the velocity of sound in air and ripples on water surfaces.' },
                { id: 'sp4b-cp-2', text: 'Investigate the suitability of equipment to measure speed, frequency, and wavelength of a wave.' },
              ],
            },
            {
              id: 'sp4d',
              code: 'SP4d',
              title: 'Waves crossing boundaries',
              objectives: [
                { id: 'sp4d-1', text: 'Describe the effects of reflection, refraction, transmission, and absorption of waves at material interfaces.' },
                { id: 'sp4d-2', text: 'Describe how changes in velocity, frequency, and wavelength during transmission are interrelated.' },
              ],
            },
            {
              id: 'sp4c-sp5a',
              code: 'SP4c/SP5a',
              title: 'Refraction & Ray diagrams',
              objectives: [
                { id: 'sp4c-1', text: 'Explain how waves will be refracted at a boundary in terms of change of direction and speed.' },
                { id: 'sp4c-2', text: 'Explain reflection, refraction, and total internal reflection using ray diagrams.' },
              ],
            },
            {
              id: 'sp5a-practical',
              code: 'SP5a CP',
              title: 'Core Practical: Investigating refraction',
              objectives: [
                { id: 'sp5a-cp-1', text: 'Investigate refraction in rectangular glass blocks.' },
              ],
            },
            {
              id: 'sp4e',
              code: 'SP4e',
              title: 'Ears and hearing',
              objectives: [
                { id: 'sp4e-1', text: 'Describe the processes which convert wave disturbances between sound waves and vibrations in solids.' },
                { id: 'sp4e-2', text: 'Explain why such processes only work over a limited frequency range.' },
              ],
            },
            {
              id: 'sp4f',
              code: 'SP4f',
              title: 'Ultrasound',
              objectives: [
                { id: 'sp4f-1', text: 'Calculate depth or distance from time and wave velocity.' },
                { id: 'sp4f-2', text: 'State that sound with frequencies greater than 20,000 Hz is known as ultrasound.' },
                { id: 'sp4f-3', text: 'Explain uses of ultrasound and infrasound, including Sonar and foetal scanning.' },
              ],
            },
            {
              id: 'sp4g',
              code: 'SP4g',
              title: 'Infrasound',
              objectives: [
                { id: 'sp4g-1', text: 'State that sound with frequencies less than 20 Hz is known as infrasound.' },
                { id: 'sp4g-2', text: 'Explain uses of infrasound, including exploration of the Earth\'s core.' },
              ],
            },
          ],
        },
        {
          id: 'sp5',
          code: 'SP5',
          title: 'Light and the Electromagnetic Spectrum',
          lessons: [
            {
              id: 'sp5b',
              code: 'SP5b',
              title: 'Colour',
              objectives: [
                { id: 'sp5b-1', text: 'Explain the difference between specular and diffuse reflection.' },
                { id: 'sp5b-2', text: 'Explain how colour of light is related to differential absorption at surfaces and transmission through filters.' },
              ],
            },
            {
              id: 'sp5c-1',
              code: 'SP5c (1)',
              title: 'Lenses Part 1',
              objectives: [
                { id: 'sp5c-1-1', text: 'Relate the power of a lens to its focal length and shape.' },
                { id: 'sp5c-1-2', text: 'Use ray diagrams to show refraction of light by converging and diverging lenses.' },
              ],
            },
            {
              id: 'sp5c-2',
              code: 'SP5c (2)',
              title: 'Lenses Part 2',
              objectives: [
                { id: 'sp5c-2-1', text: 'Explain the effects of different types of lens in producing real and virtual images.' },
              ],
            },
            {
              id: 'sp5d-sp5e',
              code: 'SP5d/e',
              title: 'Electromagnetic waves & The Spectrum',
              objectives: [
                { id: 'sp5d-1', text: 'State that all electromagnetic waves are transverse, travel at the same speed in a vacuum, and transfer energy.' },
                { id: 'sp5d-2', text: 'State the main groupings of the continuous EM spectrum.' },
                { id: 'sp5d-3', text: 'Describe the electromagnetic spectrum grouped in order of wavelength and frequency.' },
              ],
            },
            {
              id: 'sp5fhi',
              code: 'SP5f/h/i',
              title: 'Uses and Dangers',
              objectives: [
                { id: 'sp5fhi-1', text: 'Describe some uses of electromagnetic radiation.' },
                { id: 'sp5fhi-2', text: 'State that the potential danger associated with EM waves increases with increasing frequency.' },
                { id: 'sp5fhi-3', text: 'Describe the harmful effects of excessive exposure to electromagnetic radiation.' },
              ],
            },
            {
              id: 'sp5g',
              code: 'SP5g',
              title: 'Radiation and temperature',
              objectives: [
                { id: 'sp5g-1', text: 'Explain that all bodies emit radiation and that the intensity/wavelength distribution depends on temperature.' },
                { id: 'sp5g-2', text: 'Explain the balance between absorbed and radiated power for maintaining a constant temperature.' },
                { id: 'sp5g-3', text: 'Explain how the temperature of the Earth is affected by factors controlling the balance between incoming and emitted radiation.' },
              ],
            },
            {
              id: 'sp5-test',
              code: 'SP5 Test',
              title: 'End of topic test',
              objectives: [{ id: 'sp5-test-1', text: 'To assess learning.' }],
            },
          ],
        },
        {
          id: 'sp6',
          code: 'SP6',
          title: 'Radioactivity',
          lessons: [
            {
              id: 'sp6a',
              code: 'SP6a',
              title: 'Atomic models',
              objectives: [
                { id: 'sp6a-1', text: 'Describe an atom as a positively charged nucleus surrounded by negatively charged electrons.' },
                { id: 'sp6a-2', text: 'Recall the typical size (order of magnitude) of atoms and small molecules.' },
                { id: 'sp6a-3', text: 'Describe how and why the atomic model has changed over time, including the plum pudding model and Rutherford scattering.' },
              ],
            },
            {
              id: 'sp6b',
              code: 'SP6b',
              title: 'Inside atoms',
              objectives: [
                { id: 'sp6b-1', text: 'Describe the structure of nuclei of isotopes using atomic (proton) number and mass (nucleon) number.' },
                { id: 'sp6b-2', text: 'Recall relative masses and relative electric charges of protons, neutrons, electrons and positrons.' },
              ],
            },
            {
              id: 'sp6c',
              code: 'SP6c',
              title: 'Electrons and orbits',
              objectives: [
                { id: 'sp6c-1', text: 'Recall that electrons orbit the nucleus at different set distances.' },
                { id: 'sp6c-2', text: 'Explain that electrons change orbit when there is absorption or emission of electromagnetic radiation.' },
                { id: 'sp6c-3', text: 'Explain how atoms may form positive ions by losing outer electrons.' },
              ],
            },
            {
              id: 'sp6d',
              code: 'SP6d',
              title: 'Background radiation',
              objectives: [
                { id: 'sp6d-1', text: 'Explain what is meant by background radiation.' },
                { id: 'sp6d-2', text: 'Describe the origins of background radiation from Earth and space.' },
                { id: 'sp6d-3', text: 'Describe methods for measuring and detecting radioactivity.' },
              ],
            },
            {
              id: 'sp6e',
              code: 'SP6e',
              title: 'Types of radiation',
              objectives: [
                { id: 'sp6e-1', text: 'Recall that alpha, β⁻, β⁺, gamma rays and neutron radiation are emitted from unstable nuclei in a random process.' },
                { id: 'sp6e-2', text: 'Compare alpha, beta and gamma radiations in terms of their abilities to penetrate and ionise.' },
              ],
            },
            {
              id: 'sp6f',
              code: 'SP6f',
              title: 'Radioactive decay',
              objectives: [
                { id: 'sp6f-1', text: 'Describe the process of β⁻ decay (neutron becomes proton plus electron).' },
                { id: 'sp6f-2', text: 'Describe the process of β⁺ decay (proton becomes neutron plus positron).' },
                { id: 'sp6f-3', text: 'Explain the effects on atomic and mass numbers of radioactive decays.' },
                { id: 'sp6f-4', text: 'Use given data to balance nuclear equations.' },
              ],
            },
            {
              id: 'sp6g',
              code: 'SP6g',
              title: 'Half-life',
              objectives: [
                { id: 'sp6g-1', text: 'Explain the concept of half-life and how it relates to radioactive decay.' },
                { id: 'sp6g-2', text: 'Determine the half-life of a radioactive isotope from written questions and decay graphs.' },
              ],
            },
            {
              id: 'sp6h',
              code: 'SP6h',
              title: 'Uses of Radioactivity',
              objectives: [
                { id: 'sp6h-1', text: 'Describe the uses of radioactivity in industry and safety.' },
              ],
            },
            {
              id: 'sp6i',
              code: 'SP6i',
              title: 'Hazards and Safety',
              objectives: [
                { id: 'sp6i-1', text: 'Describe hazards associated with radioactivity.' },
                { id: 'sp6i-2', text: 'Discuss safety precautions for handling radioactive substances.' },
                { id: 'sp6i-3', text: 'Explain the differences between contamination and irradiation.' },
              ],
            },
            {
              id: 'sp6j',
              code: 'SP6j',
              title: 'Radioactivity in Medicine',
              objectives: [
                { id: 'sp6j-1', text: 'Explain how radioactivity is used in medicine for diagnosis and treatment.' },
                { id: 'sp6j-2', text: 'Describe diagnosing conditions using gamma rays and positrons (PET scans).' },
                { id: 'sp6j-3', text: 'Describe the use of radioactivity in treating cancer (radiotherapy).' },
              ],
            },
            {
              id: 'sp6k',
              code: 'SP6k',
              title: 'Nuclear Fission',
              objectives: [
                { id: 'sp6k-1', text: 'Explain the process of nuclear fission and how it generates energy.' },
                { id: 'sp6k-2', text: 'Describe the chain reaction in nuclear fission.' },
                { id: 'sp6k-3', text: 'Describe the structure and function of a nuclear reactor.' },
              ],
            },
            {
              id: 'sp6l',
              code: 'SP6l',
              title: 'Nuclear Fusion',
              objectives: [
                { id: 'sp6l-1', text: 'Explain the process of nuclear fusion.' },
                { id: 'sp6l-2', text: 'Discuss the benefits and problems associated with nuclear fusion.' },
              ],
            },
            {
              id: 'sp6-test',
              code: 'SP6 Test',
              title: 'End of Topic Test',
              objectives: [{ id: 'sp6-test-1', text: 'To assess learning.' }],
            },
          ],
        },
        {
          id: 'sp7',
          code: 'SP7',
          title: 'Astronomy',
          lessons: [
            {
              id: 'sp7-1',
              code: 'SP7 L1',
              title: 'The Solar System and Gravity',
              objectives: [
                { id: 'sp7-1-1', text: 'Describe the solar system, including planets, dwarf planets, comets, asteroids, and meteors.' },
                { id: 'sp7-1-2', text: 'Distinguish between the geocentric and heliocentric models of the solar system.' },
                { id: 'sp7-1-3', text: 'Describe orbits and how gravity acts as the centripetal force.' },
                { id: 'sp7-1-4', text: 'Explain how the force of gravity and the value of g vary with mass and distance.' },
              ],
            },
            {
              id: 'sp7-2',
              code: 'SP7 L2',
              title: 'Life Cycle of Stars',
              objectives: [
                { id: 'sp7-2-1', text: 'Describe the life cycle of a star for both low mass and high mass stars.' },
                { id: 'sp7-2-2', text: 'Explain how the balance between thermal expansion and gravity maintains a main sequence star.' },
                { id: 'sp7-2-3', text: 'Describe the sequence: Nebula → Protostar → Main Sequence → Red Giant/Supergiant → White Dwarf/Supernova → Neutron Star/Black Hole.' },
              ],
            },
            {
              id: 'sp7-3',
              code: 'SP7 L3',
              title: 'The Universe and Cosmology',
              objectives: [
                { id: 'sp7-3-1', text: 'Explain Redshift and how it provides evidence for the expansion of the universe.' },
                { id: 'sp7-3-2', text: 'Compare the Steady State and Big Bang theories.' },
                { id: 'sp7-3-3', text: 'Explain how CMBR provides evidence for the Big Bang theory.' },
              ],
            },
            {
              id: 'sp7-test',
              code: 'SP7 Test',
              title: 'End of Topic Test',
              objectives: [{ id: 'sp7-test-1', text: 'To assess learning.' }],
            },
          ],
        },
        {
          id: 'sp8',
          code: 'SP8',
          title: 'Work and Power',
          lessons: [
            {
              id: 'sp8-1',
              code: 'SP8 L1',
              title: 'Work Done',
              objectives: [
                { id: 'sp8-1-1', text: 'Recall and use Work done (J) = Force (N) × distance (m), E = F × d.' },
                { id: 'sp8-1-2', text: 'Explain that work done is equal to energy transferred.' },
              ],
            },
            {
              id: 'sp8-2',
              code: 'SP8 L2',
              title: 'Power',
              objectives: [
                { id: 'sp8-2-1', text: 'Define power as the rate at which energy is transferred.' },
                { id: 'sp8-2-2', text: 'Recall and use Power (W) = Work done (J) / time taken (s), P = E/t.' },
                { id: 'sp8-2-3', text: 'Recall that one watt is equal to one joule per second.' },
              ],
            },
          ],
        },
        {
          id: 'sp9',
          code: 'SP9',
          title: 'Forces and their Effects',
          lessons: [
            {
              id: 'sp9-1',
              code: 'SP9 L1',
              title: 'Types of Forces',
              objectives: [
                { id: 'sp9-1-1', text: 'Identify contact and non-contact forces.' },
                { id: 'sp9-1-2', text: 'Use free body diagrams and vector diagrams to represent forces.' },
                { id: 'sp9-1-3', text: 'Resolve forces and determine the resultant force.' },
              ],
            },
            {
              id: 'sp9-2',
              code: 'SP9 L2',
              title: 'Moments',
              objectives: [
                { id: 'sp9-2-1', text: 'Calculate the moment of a force: Moment (Nm) = Force (N) × distance (m).' },
                { id: 'sp9-2-2', text: 'Apply the Principle of Moments.' },
              ],
            },
            {
              id: 'sp9-3',
              code: 'SP9 L3',
              title: 'Levers and Gears',
              objectives: [
                { id: 'sp9-3-1', text: 'Explain how levers and gears transmit the rotational effects of forces.' },
                { id: 'sp9-3-2', text: 'Describe how gears can increase or decrease the moment or speed of rotation.' },
              ],
            },
            {
              id: 'sp9-test',
              code: 'SP9 Test',
              title: 'End of Topic Test',
              objectives: [{ id: 'sp9-test-1', text: 'To assess learning.' }],
            },
          ],
        },
        {
          id: 'sp10',
          code: 'SP10',
          title: 'Electricity and Circuits',
          lessons: [
            {
              id: 'sp10-1',
              code: 'SP10 L1',
              title: 'Current and Potential Difference',
              objectives: [
                { id: 'sp10-1-1', text: 'Draw and interpret basic circuit symbols.' },
                { id: 'sp10-1-2', text: 'Define current as the rate of flow of charge (I = Q/t).' },
                { id: 'sp10-1-3', text: 'Define potential difference as the energy transferred per unit charge (V = E/Q).' },
              ],
            },
            {
              id: 'sp10-2',
              code: 'SP10 L2',
              title: 'Resistance and Ohm\'s Law',
              objectives: [
                { id: 'sp10-2-1', text: 'Recall and use V = I × R.' },
                { id: 'sp10-2-2', text: 'Explain how resistance is caused by electron collisions with ions in the lattice.' },
              ],
            },
            {
              id: 'sp10-3',
              code: 'SP10 L3',
              title: 'Components and V-I Graphs',
              objectives: [
                { id: 'sp10-3-1', text: 'Investigate and describe V-I graphs for a resistor, filament lamp, and diode.' },
                { id: 'sp10-3-2', text: 'Describe the behaviour of Thermistors (TURD) and LDRs (LURD).' },
              ],
            },
            {
              id: 'sp10-4',
              code: 'SP10 L4',
              title: 'Series and Parallel Circuits',
              objectives: [
                { id: 'sp10-4-1', text: 'Explain the rules for current and potential difference in series circuits.' },
                { id: 'sp10-4-2', text: 'Explain the rules for current and potential difference in parallel circuits.' },
                { id: 'sp10-4-3', text: 'Calculate total resistance in series: R_T = R₁ + R₂ + ...' },
              ],
            },
            {
              id: 'sp10-5',
              code: 'SP10 L5',
              title: 'Electrical Energy and Power',
              objectives: [
                { id: 'sp10-5-1', text: 'Recall and use P = I × V, P = I² × R, E = V × I × t.' },
              ],
            },
            {
              id: 'sp10-6',
              code: 'SP10 L6',
              title: 'Mains Electricity and Safety',
              objectives: [
                { id: 'sp10-6-1', text: 'Describe the structure of the three-pin plug (Live - brown, Neutral - blue, Earth - green/yellow).' },
                { id: 'sp10-6-2', text: 'Explain the function of the fuse and circuit breaker in safety.' },
                { id: 'sp10-6-3', text: 'Distinguish between AC and DC.' },
              ],
            },
            {
              id: 'sp10-test',
              code: 'SP10 Test',
              title: 'End of Topic Test',
              objectives: [{ id: 'sp10-test-1', text: 'To assess learning.' }],
            },
          ],
        },
      ],
    },
  ],
};

export const allSubjects = [physicsSubject];
