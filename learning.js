/**
 * BOTANIQ - Botany Learning Pathways & ELI10 ("Explain Like I'm 10") Magical Mode
 */

window.Botaniq.Learning = {
  activeModule: 'foundation',
  userProgress: {
    foundation: false,
    biology: false,
    reproduction: false,
    ecology: false,
    advanced: false
  },
  eli10Mode: false, // Scientist vs. Explorer (ELI10) toggle

  // Structured content with normal scientific vs ELI10 modes
  pathways: {
    foundation: {
      title: "Foundation Botany 🌱",
      short: "What is a plant and how does it live?",
      topics: [
        {
          name: "1. The Anatomy of Green Life",
          scientist: "Plants are eukaryotic, multicellular organisms belonging to the kingdom Plantae. Morphologically, they are bifurcated into a root system (anchorage and water assimilation) and a shoot system (stems, leaves, vascular transport, and photosynthetic cells). Cell walls composed of cellulose afford structural rigidity.",
          eli10: "Think of a plant as a tiny green factory! The roots are like sticky straws sucking water from the soil. The stem is a superhighway elevator carrying supplies up, and the leaves are solar panels catching sunlight cookies to feed the plant."
        },
        {
          name: "2. The Secret World of Plant Cells",
          scientist: "Unlike animal cells, plant cells possess cellulose-rich cell walls, large central vacuoles containing cell sap for turgor pressure maintenance, and double-membrane organelles called chloroplasts containing light-absorbing pigments.",
          eli10: "If you looked at a leaf under a super-microscope, you'd see tiny green rooms built like LEGO bricks. Each room has a giant swimming pool in the middle to stay plump, and green solar batteries that make the leaf look green!"
        },
        {
          name: "3. Stomata: The Breathing Pores",
          scientist: "Stomata are microscopic pores found primarily on leaf surfaces, surrounded by guard cells that regulate gas exchange. They open during daylight to allow CO₂ intake for photosynthesis and close at night to minimize water loss through transpiration.",
          eli10: "Imagine tiny invisible doors all over a leaf that open and close! During the day, they open to let the plant breathe in air for making food. At night, they close tight like bedroom doors to keep water from escaping while the plant sleeps."
        }
      ],
      quiz: {
        question: "Which cell organelle makes plants green and traps solar energy?",
        options: [
          "Mitochondria",
          "Chloroplasts",
          "Cell Wall",
          "Vacuole"
        ],
        answer: 1 // Chloroplasts
      }
    },
    biology: {
      title: "Plant Biology & Transpiration ☀️",
      short: "Light, leaves, and vascular movement.",
      topics: [
        {
          name: "1. Photosynthesis: Baking Solar Bread",
          scientist: "Photosynthesis is the chemical process whereby light energy is converted into chemical energy (glucose) by chloroplasts: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Chlorophyll absorbs photons, stimulating water splitting and ATP/NADPH synthesis in the light reactions.",
          eli10: "Plants don't eat burgers; they bake their own food! They mix carbon dioxide (the air we breathe out) and water, then zap it with sunbeams like a magical microwave. The result? Sweet glucose sugar syrup and fresh clean air (oxygen) for us to breathe!"
        },
        {
          name: "2. Xylem and Phloem: The Fluid Elevators",
          scientist: "Xylem tissue consists of dead tracheids and vessel elements that transport water and dissolved minerals unidirectionally from roots to leaves via transpiration pull and capillary pressure. Phloem consists of sieve tubes and companion cells that transport synthesized organic sucrose bidirectionally.",
          eli10: "Plants have two sets of drinking straws inside their stems. The 'Xylem' straw sucks water straight up from the ground to the sky, and the 'Phloem' straw passes sweet leaf-juice up and down so the whole plant gets a taste of energy!"
        },
        {
          name: "3. Transpiration: The Water Elevator",
          scientist: "Transpiration is the evaporative loss of water from plant surfaces, primarily through stomata. This creates negative pressure (tension) that pulls water upward through xylem vessels against gravity, functioning as a passive transport mechanism.",
          eli10: "When water evaporates from leaves like steam from a hot cup, it creates a suction that pulls more water up from the roots! It's like drinking through a really long straw - the plant doesn't even have to pump, the suction does all the work!"
        }
      ],
      quiz: {
        question: "What are the vascular straws that carry water UP from the roots?",
        options: [
          "Phloem tubes",
          "Stomata pores",
          "Xylem vessels",
          "Root hairs"
        ],
        answer: 2 // Xylem
      }
    },
    reproduction: {
      title: "Plant Reproduction 🌸",
      short: "Flowers, pollen, and seed dispersion.",
      topics: [
        {
          name: "1. Pollination: The Insect Trade",
          scientist: "Pollination is the transference of microspores (pollen grains) from the anther (male gametophyte) to the receptive stigma (female carpel). This is facilitated by wind, water, or zoological vectors like insects, birds, and bats attracted by nectar rewards.",
          eli10: "Flowers want to create seed babies, but they can't walk to visit each other! So they hire fuzzy bees. When a bee lands to drink sweet juice, gold pollen glitter sticks to its furry knees. When it flies to another flower, the glitter falls off and spawns a new baby seed!"
        },
        {
          name: "2. Seeds: Little Time Capsules",
          scientist: "Fertilization yields a diploid zygote that matures into an embryo, encapsulated within a protective seed coat (testa) alongside nutrient reserves (endosperm). Seed dispersal methods include anemochory (wind), hydrochory (water), and zoochory (animals).",
          eli10: "A seed is like a tiny sleeping astronaut inside a capsule with a lunchbox! It can wait for years in dry sand. But the moment warm water drinks soak the shell, the baby wakes up, eats its lunchbox food, and sprouts a green helmet out into the sun!"
        },
        {
          name: "3. Germination: The Great Awakening",
          scientist: "Germination is the resumption of metabolic activity in a quiescent seed, triggered by favorable environmental conditions (water, oxygen, temperature). The radicle emerges first, followed by hypocotyl elongation and cotyledon expansion as photosynthetic structures develop.",
          eli10: "When a seed drinks enough water and feels warm sunshine, it's like an alarm clock going off! The baby plant stretches its legs (roots) down into the dirt, then stretches its arms (leaves) up toward the light, ready to start its new life!"
        }
      ],
      quiz: {
        question: "What does the flower reward bees with to carry their pollen?",
        options: [
          "Chlorophyll",
          "Seeds",
          "Nectar",
          "Sieve tubes"
        ],
        answer: 2 // Nectar
      }
    },
    ecology: {
      title: "Plant Ecology & Biomes 🌍",
      short: "Coexistence, biomes, and forests.",
      topics: [
        {
          name: "1. Symbiosis: Wood Wide Web",
          scientist: "Mycorrhizal networks consist of symbiotic fungal hyphae that intertwine with plant root cells. The fungi provide crucial phosphorus and minerals in exchange for photosynthetic carbohydrates, creating a complex underground communicative ecology.",
          eli10: "Trees talk to each other underground! They use a hidden network of tiny mushroom threads called the 'Wood Wide Web'. If a mother tree has too much sugar, she sends it through the threads to feed a baby tree struggling in the dark shade nearby!"
        },
        {
          name: "2. The Adaptation of Biomes",
          scientist: "Flora adapt morphologically to their climatological biomes. Desert xerophytes develop water-storing stems and needle-like leaves to reduce transpiration. Tropical hydrophytes develop massive flat leaves to shed heavy water runoffs.",
          eli10: "Plants dress up for their hometown weather! Cactus plants wear sharp needles to stop thirsty camels from eating them, while giant jungle trees grow smooth leaves that act like slides, letting monsoon raindrops slide right off without breaking stems!"
        },
        {
          name: "3. The Carbon Cycle: Earth's Breath",
          scientist: "Plants are primary carbon sinks, sequestering atmospheric CO₂ through photosynthesis and storing it as biomass. This process regulates global climate by mitigating greenhouse gas concentrations, while respiration and decomposition release carbon back into the atmosphere.",
          eli10: "Plants are like Earth's vacuum cleaners for dirty air! They suck in the bad gas (carbon dioxide) that makes our planet too warm, clean it up, and store it safely in their leaves and trunks. When plants breathe out, they give us fresh clean oxygen to breathe!"
        }
      ],
      quiz: {
        question: "What is the underground communication network of trees called?",
        options: [
          "Stomata grid",
          "Mycorrhizal fungi network",
          "Xylem highways",
          "Photosynthesis link"
        ],
        answer: 1 // Mycorrhizal
      }
    },
    advanced: {
      title: "Advanced Plant Genetics & Pathology 🧬",
      short: "Taxonomy, breeding, and disease dynamics.",
      topics: [
        {
          name: "1. Taxonomy: Organizing the Green Kingdom",
          scientist: "Taxonomy classifies plants hierarchically using binomial nomenclature: Domain, Kingdom, Division, Class, Order, Family, Genus, Species. This establishes evolutionary relationships and phylogenetic lineages.",
          eli10: "Scientists give plants first and last names just like us, but in Latin! The first name tells you their family group (like 'Ficus'), and the second name is their personal name (like 'benghalensis'). It helps gardeners speak the same language all over the world!"
        },
        {
          name: "2. Plant Pathology: Fighting the Invaders",
          scientist: "Plants lack adaptive immune systems but possess innate immunity including physical cutin barriers and localized cell death (hypersensitive response) to quarantine fungal spores, viral agents, and bacterial infections.",
          eli10: "Plants don't have blood cells or doctors, but they are tough! If a leaf gets infected by a nasty bug, it deliberately cuts off the water supply to that specific spot, letting the infected leaf segment die and fall off to save the rest of the green branches!"
        },
        {
          name: "3. Genetics: The Plant DNA Blueprint",
          scientist: "Plant genomes contain DNA sequences encoding proteins and regulatory elements that determine phenotypic traits. Genetic variation arises through mutation, recombination during meiosis, and polyploidy events, enabling adaptation and speciation.",
          eli10: "Every plant has a secret instruction book inside every single cell called DNA! This book tells the plant how tall to grow, what color its flowers should be, and whether its leaves should be pointy or round. It's like a recipe that makes each plant unique!"
        }
      ],
      quiz: {
        question: "In scientific binomial nomenclature, what does the first name represent?",
        options: [
          "Species",
          "Genus",
          "Family",
          "Biome"
        ],
        answer: 1 // Genus
      }
    }
  },

  render() {
    const mod = this.pathways[this.activeModule];
    const progress = this.userProgress[this.activeModule];

    // Compute aggregate progress
    const completedCount = Object.values(this.userProgress).filter(v => v).length;
    const progressPercent = Math.round((completedCount / 5) * 100);

    let html = `
      <div class="learning-container">
        <!-- Learning Pathway Dashboard Summary -->
        <div class="premium-card path-summary-card">
          <div class="summary-left">
            <h3>Botany Pathway Progression</h3>
            <p>Master the science and magic of plant life, unlocking new ranks.</p>
            <div class="progress-container">
              <div class="progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
            <span class="progress-label">${completedCount} of 5 Pathways Completed (${progressPercent}%)</span>
          </div>
          <div class="summary-right">
            <span class="path-badge">🏆</span>
          </div>
        </div>

        <!-- Layout Row: Modules selection + active module details -->
        <div class="learning-layout">
          <!-- Sidebar Navigation of Modules -->
          <div class="module-selector">
            ${Object.keys(this.pathways).map(key => {
              const active = key === this.activeModule;
              const finished = this.userProgress[key];
              return `
                <button class="module-btn ${active ? 'active' : ''} ${finished ? 'completed' : ''}" data-mod="${key}">
                  <span class="module-status-icon">${finished ? '✅' : '📖'}</span>
                  <div class="module-btn-text">
                    <strong>${this.pathways[key].title.split(' ')[0]} ${this.pathways[key].title.split(' ').slice(1).join(' ')}</strong>
                    <span>${this.pathways[key].short}</span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Active Module Screen -->
          <div class="active-module-viewport">
            <div class="premium-card lesson-card">
              <!-- Mode Toggles (Scientist vs Explorer) -->
              <div class="lesson-header">
                <h3>${mod.title}</h3>
                
                <div class="mode-toggle-wrapper">
                  <span class="mode-label ${!this.eli10Mode ? 'active' : ''}">🎓 Scientist</span>
                  <label class="switch">
                    <input type="checkbox" id="eli10-toggle-checkbox" ${this.eli10Mode ? 'checked' : ''}>
                    <span class="slider round"></span>
                  </label>
                  <span class="mode-label ${this.eli10Mode ? 'active' : ''}">🧚 Explorer (ELI10)</span>
                </div>
              </div>

              <!-- Topics contents -->
              <div class="lesson-topics">
                ${mod.topics.map(t => `
                  <div class="topic-block">
                    <h4>${t.name}</h4>
                    <div class="topic-content-body animated-switch">
                      ${this.eli10Mode ? `<p class="eli10-text">“${t.eli10}”</p>` : `<p class="scientific-text">${t.scientist}</p>`}
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Module Quiz Section -->
              <div class="quiz-block" id="quiz-block-element">
                ${progress ? `
                  <div class="quiz-passed-banner">
                    <span>🌟</span>
                    <div>
                      <strong>Pathway Mastered!</strong>
                      <p>You have correctly answered the quiz for this module and earned 25 XP.</p>
                    </div>
                  </div>
                ` : `
                  <h4>🧠 Mini-Quiz Challenge</h4>
                  <p class="quiz-q">${mod.quiz.question}</p>
                  <div class="quiz-options">
                    ${mod.quiz.options.map((opt, i) => `
                      <button class="quiz-opt-btn" data-opt-idx="${i}">${opt}</button>
                    `).join('')}
                  </div>
                  <div class="quiz-feedback hidden" id="quiz-feedback-box"></div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  },

  // Initialize event bindings after rendering
  init() {
    // Module selector click handlers
    document.querySelectorAll('.module-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeModule = btn.dataset.mod;
        window.Botaniq.Router.navigateTo('learning');
      });
    });

    // Scientist vs ELI10 Toggle
    const cb = document.getElementById('eli10-toggle-checkbox');
    if (cb) {
      cb.addEventListener('change', (e) => {
        this.eli10Mode = e.target.checked;
        
        // Dynamic smooth update to content blocks
        const topicBlocks = document.querySelectorAll('.topic-block');
        const mod = this.pathways[this.activeModule];
        
        topicBlocks.forEach((block, idx) => {
          const t = mod.topics[idx];
          const contentDiv = block.querySelector('.topic-content-body');
          if (this.eli10Mode) {
            contentDiv.innerHTML = `<p class="eli10-text">“${t.eli10}”</p>`;
          } else {
            contentDiv.innerHTML = `<p class="scientific-text">${t.scientist}</p>`;
          }
        });
        
        // Highlight active labels
        document.querySelectorAll('.mode-label').forEach((el, index) => {
          el.classList.toggle('active', (index === 0 && !this.eli10Mode) || (index === 1 && this.eli10Mode));
        });
      });
    }

    // Quiz options click handlers
    document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedIdx = parseInt(btn.dataset.optIdx);
        const mod = this.pathways[this.activeModule];
        const feedbackBox = document.getElementById('quiz-feedback-box');
        
        if (selectedIdx === mod.quiz.answer) {
          // Correct answer!
          btn.classList.add('correct');
          feedbackBox.className = "quiz-feedback correct-msg";
          feedbackBox.innerHTML = "✨ <strong>Correct!</strong> You've unlocked the secrets of this pathway. +25 XP!";
          feedbackBox.classList.remove('hidden');
          
          // Disable all buttons
          document.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);
          
          // Save progress
          this.userProgress[this.activeModule] = true;
          window.Botaniq.XPManager.addXP(25);
          
          // Add standard badge verification checking
          if (window.Botaniq.Achievements) {
            window.Botaniq.Achievements.checkUnlocks();
          }

          // Delay rerender to show passed state
          setTimeout(() => {
            window.Botaniq.Router.navigateTo('learning');
          }, 2000);
        } else {
          // Wrong answer
          btn.classList.add('wrong');
          feedbackBox.className = "quiz-feedback wrong-msg";
          feedbackBox.innerHTML = "❌ <strong>Incorrect.</strong> Read the Explorer story carefully and try again!";
          feedbackBox.classList.remove('hidden');
        }
      });
    });
  }
};

// Add simple CSS rule overrides in JS specifically for learning pathways
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  .learning-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .path-summary-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, rgba(139,168,136,0.1), rgba(200,169,126,0.15)) !important;
  }
  .path-badge {
    font-size: 40px;
  }
  .learning-layout {
    display: flex;
    gap: 24px;
  }
  .module-selector {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 320px;
    flex-shrink: 0;
  }
  .module-btn {
    background: var(--bg-card);
    border: 1px solid var(--border-organic);
    padding: 16px;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 14px;
    text-align: left;
    transition: var(--transition-fast);
    box-shadow: var(--shadow-soft);
  }
  .module-btn:hover, .module-btn.active {
    border-color: var(--primary-sage);
    background: rgba(139, 168, 136, 0.05);
    transform: translateX(4px);
  }
  .module-btn.active {
    background: linear-gradient(135deg, var(--bg-card), rgba(139, 168, 136, 0.1));
    border-left: 5px solid var(--primary-sage);
  }
  .module-status-icon {
    font-size: 20px;
  }
  .module-btn-text strong {
    display: block;
    font-size: 15px;
    color: var(--text-dark);
    font-family: var(--font-body);
  }
  .module-btn-text span {
    font-size: 12px;
    color: var(--text-muted);
  }
  .active-module-viewport {
    flex-grow: 1;
  }
  .lesson-card {
    padding: 32px !important;
    background: linear-gradient(135deg, var(--bg-card), rgba(139, 168, 136, 0.03)) !important;
  }
  .lesson-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-organic);
    padding-bottom: 18px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .lesson-header h3 {
    font-size: 22px;
    font-family: var(--font-heading);
    color: var(--primary-forest);
  }
  
  /* Mode Toggle Switch styling */
  .mode-toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg-input);
    padding: 6px 14px;
    border-radius: 50px;
    border: 1px solid var(--border-organic);
  }
  .mode-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
  }
  .mode-label.active {
    color: var(--primary-forest);
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
  }
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: var(--border-organic);
    transition: .4s;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
  }
  input:checked + .slider { background-color: var(--primary-sage); }
  input:checked + .slider:before { transform: translateX(16px); }
  .slider.round { border-radius: 34px; }
  .slider.round:before { border-radius: 50%; }

  .topic-block {
    margin-bottom: 28px;
  }
  .topic-block h4 {
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--primary-forest);
  }
  .scientific-text {
    font-size: 14px;
    color: var(--text-dark);
  }
  .eli10-text {
    font-size: 15px;
    color: var(--text-dark);
    font-style: italic;
    background: linear-gradient(135deg, rgba(200, 169, 126, 0.08), rgba(139, 168, 136, 0.05));
    border-left: 4px solid var(--accent-gold);
    padding: 16px 20px;
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    line-height: 1.7;
    position: relative;
  }
  .eli10-text::before {
    content: '✨';
    position: absolute;
    top: 12px;
    left: 8px;
    font-size: 14px;
  }

  .quiz-block {
    background: var(--bg-input);
    border: 1px dashed var(--border-organic);
    padding: 24px;
    border-radius: var(--radius-md);
    margin-top: 32px;
  }
  .quiz-block h4 {
    margin-bottom: 12px;
    font-family: var(--font-heading);
  }
  .quiz-q {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .quiz-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  .quiz-opt-btn {
    background: var(--bg-card);
    border: 1px solid var(--border-organic);
    padding: 12px 16px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    transition: var(--transition-fast);
  }
  .quiz-opt-btn:hover {
    border-color: var(--primary-sage);
    background: rgba(139, 168, 136, 0.05);
  }
  .quiz-opt-btn.correct {
    background: #A2BE9E !important;
    color: white !important;
    border-color: #A2BE9E !important;
  }
  .quiz-opt-btn.wrong {
    background: #E29E9E !important;
    color: white !important;
    border-color: #E29E9E !important;
  }
  .quiz-feedback {
    margin-top: 16px;
    padding: 10px 16px;
    border-radius: var(--radius-sm);
    font-size: 13px;
  }
  .quiz-feedback.correct-msg {
    background: rgba(162, 190, 158, 0.15);
    color: var(--primary-forest);
    border-left: 4px solid var(--primary-sage);
  }
  .quiz-feedback.wrong-msg {
    background: rgba(226, 158, 158, 0.15);
    color: #9E3A3A;
    border-left: 4px solid #E29E9E;
  }
  .quiz-passed-banner {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(200, 169, 126, 0.1);
    border: 1px solid var(--accent-gold);
    padding: 16px 20px;
    border-radius: var(--radius-md);
  }
  .quiz-passed-banner span { font-size: 28px; }

  @media (max-width: 992px) {
    .learning-layout {
      flex-direction: column;
    }
    .module-selector {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }
  }
`;
document.head.appendChild(styleElement);
