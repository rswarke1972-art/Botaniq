/**
 * BOTANIQ - Plant Diagnosis Tool ("Doctor for Plants" Multi-Symptom Matrix Wizard)
 */

window.Botaniq.Diagnosis = {
  selectedSymptoms: [],

  // Comprehensive Symptoms list
  symptoms: [
    { id: 'yellow_leaves', label: '🟡 Yellow Leaves', category: 'foliage' },
    { id: 'brown_edges', label: '🟤 Brown Edges or Tips', category: 'foliage' },
    { id: 'drooping', label: '🥀 Drooping or Wilting', category: 'structure' },
    { id: 'spots', label: '⚫ Dark Spots on Leaves', category: 'foliage' },
    { id: 'white_powder', label: '❄️ White Powdery Coating', category: 'pests' },
    { id: 'webbing', label: '🕸️ Tiny Spider-Webs', category: 'pests' },
    { id: 'stunted', label: '📏 Stunted growth', category: 'structure' },
    { id: 'sticky', label: '🍯 Sticky Clear Residue', category: 'pests' },
    { id: 'curling_leaves', label: '🌀 Curling Leaves', category: 'foliage' },
    { id: 'pale_color', label: '🌫️ Pale or Faded Color', category: 'foliage' },
    { id: 'leaf_drop', label: '🍂 Leaf Drop', category: 'structure' },
    { id: 'soft_stem', label: '🌱 Soft or Mushy Stem', category: 'structure' },
    { id: 'holes', label: '🕳️ Holes in Leaves', category: 'pests' },
    { id: 'mold', label: '🍄 Mold on Soil', category: 'pests' },
    { id: 'slow_growth', label: '🐌 Slow Growth', category: 'structure' }
  ],

  // Diagnostic Matrix correlating symptoms to probable causes with weights
  causes: [
    {
      id: 'overwatering',
      name: 'Overwatering (Saturated Roots)',
      remedy: 'Stop watering immediately. Check container drainage holes. If soil is swampy, slide plant out and check for blackened squishy roots. Repot into fresh dry aroid soil.',
      symptomsWeight: {
        yellow_leaves: 4,
        drooping: 3,
        soft_stem: 4,
        mold: 3,
        leaf_drop: 2,
        stunted: 2,
        brown_edges: 1
      }
    },
    {
      id: 'underwatering',
      name: 'Severe Underwatering (Dehydration)',
      remedy: 'Perform a deep soak: place the pot in a tub of tepid water for 20 minutes so soil fully rehydrates. Mist leaves to increase humidity and water on a regular schedule.',
      symptomsWeight: {
        brown_edges: 4,
        drooping: 4,
        curling_leaves: 3,
        leaf_drop: 3,
        pale_color: 2,
        slow_growth: 2,
        stunted: 1
      }
    },
    {
      id: 'spider_mites',
      name: 'Spider Mite Pest Infestation',
      remedy: 'Isolate plant. Spray foliage thoroughly with cold water to dislodge mites, then treat top and undersides of leaves with organic Neem Oil spray once a week for 3 weeks.',
      symptomsWeight: {
        webbing: 5,
        spots: 3,
        yellow_leaves: 2,
        drooping: 2,
        curling_leaves: 1,
        leaf_drop: 1
      }
    },
    {
      id: 'powdery_mildew',
      name: 'Powdery Mildew Fungal Infection',
      remedy: 'Trim heavily infected leaves. Spray remaining foliage with a mixture of 1 teaspoon baking soda, 1/2 teaspoon liquid organic soap, and 1 liter of warm water.',
      symptomsWeight: {
        white_powder: 5,
        spots: 2,
        yellow_leaves: 1,
        curling_leaves: 1
      }
    },
    {
      id: 'low_humidity',
      name: 'Low Atmospheric Humidity',
      remedy: 'Set up a pebble tray with water underneath the plant pot, or group plants together. Spray foliage weekly. Avoid placing near dry central heating vents.',
      symptomsWeight: {
        brown_edges: 4,
        curling_leaves: 3,
        leaf_drop: 2,
        pale_color: 1
      }
    },
    {
      id: 'sunburn',
      name: 'Sun Scorch (Excess Light Intensity)',
      remedy: 'Move plant 3-5 feet back from the scorching window pane. Cut off heavily burned paper-dry leaves. Filter harsh light using a sheer white curtain.',
      symptomsWeight: {
        brown_edges: 4,
        spots: 4,
        yellow_leaves: 2,
        pale_color: 2,
        leaf_drop: 1
      }
    },
    {
      id: 'scale_insects',
      name: 'Scale / Aphid Invasion',
      remedy: 'Dab insects directly with a cotton swab soaked in rubbing alcohol to dissolve their protective shells. Wipe leaves clean and spray with insecticidal organic soap.',
      symptomsWeight: {
        sticky: 5,
        yellow_leaves: 2,
        stunted: 3,
        slow_growth: 2,
        spots: 1,
        curling_leaves: 1
      }
    },
    {
      id: 'nutrient_deficiency',
      name: 'Nutrient Deficiency (Lack of Fertilizer)',
      remedy: 'Feed with balanced liquid fertilizer diluted to half strength. Yellowing older leaves suggest nitrogen deficiency, while pale new leaves indicate iron deficiency.',
      symptomsWeight: {
        yellow_leaves: 4,
        pale_color: 4,
        stunted: 3,
        slow_growth: 3,
        leaf_drop: 1
      }
    },
    {
      id: 'root_rot',
      name: 'Root Rot Fungal Infection',
      remedy: 'Emergency action required: Unpot plant, cut away all blackened mushy roots with sterile scissors. Dust remaining healthy roots with cinnamon powder. Repot in fresh sterile soil.',
      symptomsWeight: {
        soft_stem: 5,
        yellow_leaves: 4,
        drooping: 4,
        mold: 4,
        leaf_drop: 3,
        stunted: 2
      }
    },
    {
      id: 'cold_shock',
      name: 'Cold Shock or Draft Damage',
      remedy: 'Move plant away from cold windows, AC vents, or drafty doors. Maintain consistent temperature above minimum for the species. Avoid cold water on leaves.',
      symptomsWeight: {
        leaf_drop: 4,
        curling_leaves: 3,
        brown_edges: 3,
        drooping: 2,
        spots: 1
      }
    },
    {
      id: 'pest_chewing',
      name: 'Chewing Insects (Caterpillars/Beetles)',
      remedy: 'Inspect leaves thoroughly, especially undersides. Remove visible pests by hand. Apply organic insecticidal soap or neem oil. Use physical barriers like row covers for outdoor plants.',
      symptomsWeight: {
        holes: 5,
        spots: 2,
        stunted: 2,
        yellow_leaves: 1
      }
    },
    {
      id: 'fungal_leaf_spot',
      name: 'Fungal Leaf Spot Disease',
      remedy: 'Remove all infected leaves immediately. Improve air circulation around plant. Avoid wetting leaves when watering. Apply copper fungicide if severe.',
      symptomsWeight: {
        spots: 5,
        yellow_leaves: 2,
        leaf_drop: 2,
        brown_edges: 1
      }
    }
  ],

  render() {
    let html = `
      <div class="diagnosis-container">
        <!-- Explanatory intro -->
        <div class="premium-card diagnosis-intro-card">
          <div class="intro-left">
            <h3>Select Plant Symptoms</h3>
            <p>Select all symptoms currently visible on your plant. The Doctor engine will evaluate overlaps to calculate precise diagnosis likelihoods.</p>
          </div>
          <span class="intro-icon">🩺</span>
        </div>

        <div class="diagnosis-layout">
          <!-- Left symptoms selection grid -->
          <div class="premium-card symptoms-selection-card">
            <h3>Symptom Checklist</h3>
            <div class="symptoms-grid">
              ${this.symptoms.map(symptom => {
                const checked = this.selectedSymptoms.includes(symptom.id);
                return `
                  <button class="symptom-toggle-btn ${checked ? 'active' : ''}" data-symptom-id="${symptom.id}">
                    <span class="sym-box">${checked ? '✓' : '＋'}</span>
                    <span class="sym-label">${symptom.label}</span>
                  </button>
                `;
              }).join('')}
            </div>
            
            <div class="selection-actions">
              <button id="clear-diagnosis-btn" class="btn-secondary">Reset Choices</button>
              <button id="run-diagnosis-btn" class="btn-primary" ${this.selectedSymptoms.length === 0 ? 'disabled' : ''}>
                🔍 Diagnose Plant
              </button>
            </div>
          </div>

          <!-- Right results panel -->
          <div class="premium-card diagnosis-results-card" id="diagnosis-results-viewport">
            <div class="results-empty">
              <span>🩺</span>
              <p>Select plant symptoms on the left and click 'Diagnose' to generate confidence scores.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    return html;
  },

  // Symptom weighted probability calculations
  calculateDiagnosis() {
    if (this.selectedSymptoms.length === 0) return [];

    const diagnosisList = [];

    // Sum weights for each possible cause based on selected symptoms
    this.causes.forEach(cause => {
      let matchedScore = 0;
      let totalCauseWeight = 0;

      // Calculate maximum potential weight for this cause to normalize percentages
      Object.keys(cause.symptomsWeight).forEach(sym => {
        totalCauseWeight += cause.symptomsWeight[sym];
      });

      // Sum matching selected symptoms
      this.selectedSymptoms.forEach(symId => {
        if (cause.symptomsWeight[symId]) {
          matchedScore += cause.symptomsWeight[symId];
        }
      });

      if (matchedScore > 0) {
        // Calculate normalized probability percentage
        const percentage = Math.round((matchedScore / totalCauseWeight) * 100);
        
        diagnosisList.push({
          cause: cause,
          confidence: percentage
        });
      }
    });

    // Sort by confidence percentage
    diagnosisList.sort((a, b) => b.confidence - a.confidence);
    return diagnosisList;
  },

  init() {
    // Symptom toggling clicks
    document.querySelectorAll('.symptom-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.symptomId;
        const index = this.selectedSymptoms.indexOf(id);
        
        if (index === -1) {
          this.selectedSymptoms.push(id);
        } else {
          this.selectedSymptoms.splice(index, 1);
        }

        // Rerender state quickly
        window.Botaniq.Router.navigateTo('diagnosis');
      });
    });

    // Clear Choices action
    const clearBtn = document.getElementById('clear-diagnosis-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.selectedSymptoms = [];
        window.Botaniq.Router.navigateTo('diagnosis');
      });
    }

    // Run Diagnosis trigger
    const runBtn = document.getElementById('run-diagnosis-btn');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        const results = this.calculateDiagnosis();
        const viewport = document.getElementById('diagnosis-results-viewport');

        if (results.length === 0) {
          viewport.innerHTML = `
            <div class="results-empty">
              <span>🔎</span>
              <p>No matching causes found. Double check your symptom selections.</p>
            </div>
          `;
          return;
        }

        let html = `
          <h3>Diagnostic Diagnosis Results</h3>
          <div class="diagnosis-results-list">
            ${results.map((res, index) => {
              const mainCause = index === 0;
              return `
                <div class="diagnosis-result-item ${mainCause ? 'primary-cause' : ''}">
                  <div class="result-header">
                    <strong>${res.cause.name}</strong>
                    <span class="confidence-percentage">${res.confidence}% Match</span>
                  </div>
                  
                  <!-- Probability Bar -->
                  <div class="progress-container">
                    <div class="progress-fill" style="width: ${res.confidence}%; background: ${res.confidence > 70 ? 'var(--primary-forest)' : 'var(--accent-gold)'}"></div>
                  </div>

                  <div class="remedy-block">
                    <strong>🏥 Organic Recovery Plan:</strong>
                    <p>${res.cause.remedy}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
        viewport.innerHTML = html;
        
        // Award XP for taking care and diagnosing
        window.Botaniq.XPManager.addXP(10);
      });
    }
  }
};

// Styling for Doctor Diagnosis specific viewports
const diagStyles = document.createElement('style');
diagStyles.innerHTML = `
  .diagnosis-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .diagnosis-intro-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, rgba(77, 106, 79, 0.1), rgba(200, 169, 126, 0.1)) !important;
  }
  .intro-icon { font-size: 36px; }
  
  .diagnosis-layout {
    display: flex;
    gap: 24px;
  }
  .symptoms-selection-card {
    width: 400px;
    flex-shrink: 0;
  }
  .symptoms-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
  }
  .symptom-toggle-btn {
    background: var(--bg-input);
    border: 1px solid var(--border-organic);
    padding: 14px 16px;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    transition: var(--transition-fast);
    color: var(--text-dark);
  }
  .symptom-toggle-btn:hover {
    border-color: var(--primary-sage);
    background: var(--bg-card);
  }
  .symptom-toggle-btn.active {
    background: rgba(139, 168, 136, 0.15);
    border-color: var(--primary-sage);
    font-weight: 600;
  }
  .sym-box {
    font-size: 14px;
    color: var(--primary-forest);
  }

  .selection-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  .selection-actions button {
    flex-grow: 1;
  }

  .diagnosis-results-card {
    flex-grow: 1;
    min-height: 400px;
    display: flex;
    flex-direction: column;
  }
  .results-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-muted);
    text-align: center;
    padding: 40px;
  }
  .results-empty span { font-size: 48px; margin-bottom: 12px; }

  .diagnosis-results-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 18px;
  }
  .diagnosis-result-item {
    background: var(--bg-input);
    border: 1px solid var(--border-organic);
    padding: 20px;
    border-radius: var(--radius-lg);
  }
  .diagnosis-result-item.primary-cause {
    border-left: 6px solid var(--primary-sage);
    background: linear-gradient(135deg, var(--bg-input), rgba(139, 168, 136, 0.05));
  }
  .result-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 15px;
  }
  .confidence-percentage {
    color: var(--primary-forest);
  }
  .remedy-block {
    margin-top: 14px;
    font-size: 13.5px;
    line-height: 1.5;
  }
  .remedy-block strong {
    display: block;
    color: var(--text-dark);
    margin-bottom: 4px;
  }

  @media (max-width: 992px) {
    .diagnosis-layout {
      flex-direction: column;
    }
    .symptoms-selection-card {
      width: 100%;
    }
  }

  /* Mobile touch optimization for diagnosis */
  @media (max-width: 768px) {
    .symptom-toggle-btn {
      min-height: 56px;
      padding: 16px;
      font-size: 15px;
    }
    .sym-box {
      font-size: 16px;
    }
    .selection-actions button {
      min-height: 52px;
      font-size: 15px;
    }
    .diagnosis-result-item {
      padding: 16px;
    }
  }
`;
document.head.appendChild(diagStyles);
