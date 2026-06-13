/**
 * BOTANIQ - Plant Encyclopedia Module
 * 50+ plant searchable database with seasonal care
 */
window.Botaniq.Encyclopedia = {
  activeCategory: 'all',
  searchQuery: '',
  activeModalPlantId: null,

  categories: [
    { id: 'all', label: 'All Plants 🌿' },
    { id: 'indoor', label: 'Indoor 🪴' },
    { id: 'trees', label: 'Trees 🌳' },
    { id: 'flowers', label: 'Flowers 🌸' },
    { id: 'herbs', label: 'Herbs 🌿' },
    { id: 'medicinal', label: 'Medicinal 💊' },
    { id: 'succulents', label: 'Succulents 🌵' },
    { id: 'carnivorous', label: 'Carnivorous 🪰' },
    { id: 'aquatic', label: 'Aquatic 🌊' },
    { id: 'bonsai', label: 'Bonsai 🌳' }
  ],

  getFilteredPlants() {
    let plants = window.Botaniq.PlantsData || [];
    if (this.activeCategory !== 'all') {
      plants = plants.filter(p => p.category === this.activeCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      plants = plants.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.scientific.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return plants;
  },

  getSeasonWatering(plant) {
    const season = window.Botaniq.State.activeSeason;
    if (plant.watering && typeof plant.watering === 'object') {
      return plant.watering[season] || plant.watering.Summer || 'See care guide';
    }
    return plant.watering || 'See care guide';
  },

  render() {
    const plants = this.getFilteredPlants();
    const season = window.Botaniq.State.activeSeason;
    const seasonEmoji = { Summer: '☀️', Winter: '❄️', Monsoon: '🌧️' }[season];

    return `
      <div class="encyclopedia-container">
        <!-- Search Bar -->
        <div class="enc-search-row">
          <div class="enc-search-wrap">
            <span style="font-size:18px;">🔍</span>
            <input type="text" id="enc-search-input" placeholder="Search plants by name or habitat..." value="${this.searchQuery}" style="border:none;background:none;font-size:16px;flex-grow:1;">
          </div>
          <div class="season-info-badge">
            ${seasonEmoji} ${season} Mode
          </div>
        </div>

        <!-- Smart Plant Recommendations Finder -->
        <div class="premium-card" style="margin-top: 16px; margin-bottom: 8px; background: linear-gradient(135deg, rgba(139,168,136,0.06), rgba(200,169,126,0.08)) !important;">
          <h3 style="margin-bottom: 6px;">🌿 Smart Plant Finder</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Specify your space conditions to receive instant tailored recommendations.</p>
          <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;">
            <div style="flex-grow: 1; min-width: 160px; display: flex; flex-direction: column; gap: 6px;">
              <label style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">🌞 Light Level</label>
              <select id="finder-light" style="background:var(--bg-input);border:1px solid var(--border-organic);padding:10px 14px;border-radius:var(--radius-sm);font-family:var(--font-body);font-size:13.5px;">
                <option value="any">Any Light Level ☀️</option>
                <option value="low">Low Light ☁️</option>
                <option value="medium">Medium / Indirect Light ⛅</option>
                <option value="direct">Full Direct Sunlight ☀️</option>
              </select>
            </div>
            <div style="flex-grow: 1; min-width: 160px; display: flex; flex-direction: column; gap: 6px;">
              <label style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">💧 Humidity</label>
              <select id="finder-humidity" style="background:var(--bg-input);border:1px solid var(--border-organic);padding:10px 14px;border-radius:var(--radius-sm);font-family:var(--font-body);font-size:13.5px;">
                <option value="any">Any Humidity 💦</option>
                <option value="low">Dry / Low Humidity 🌵</option>
                <option value="high">Moist / High Humidity 💧</option>
              </select>
            </div>
            <button class="btn-primary" id="finder-search-btn" style="min-height: 40px; padding: 10px 20px; font-size: 13.5px; border-radius:var(--radius-sm);">Get Recommendations ✨</button>
          </div>
          <div id="finder-results" class="hidden" style="margin-top: 18px; padding-top: 18px; border-top: 1px dashed var(--border-organic);">
            <!-- Populated dynamically by JS -->
          </div>
        </div>

        <!-- Category Filter Pills -->
        <div class="category-scroll" style="margin:16px 0 4px;">
          ${this.categories.map(cat => `
            <button class="cat-pill ${this.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">${cat.label}</button>
          `).join('')}
        </div>

        <!-- Results Count -->
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:4px;">
          Showing <strong>${plants.length}</strong> plant${plants.length !== 1 ? 's' : ''}
          ${this.activeCategory !== 'all' ? `in <strong>${this.activeCategory}</strong>` : ''}
        </div>

        <!-- Plants Grid -->
        ${plants.length === 0 ? `
          <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
            <div style="font-size:48px;margin-bottom:12px;">🔎</div>
            <p>No plants found. Try a different search or category.</p>
          </div>
        ` : `
          <div class="plants-grid">
            ${plants.map(plant => {
              const waterInfo = this.getSeasonWatering(plant);
              const seasonClass = season.toLowerCase();
              return `
                <div class="plant-card" data-plant-id="${plant.id}">
                  <div class="plant-card-art">
                    ${window.Botaniq.drawPlantIllustration(plant)}
                  </div>
                  <div class="plant-card-body">
                    <div class="plant-card-name">${plant.name}</div>
                    <div class="plant-card-scientific">${plant.scientific}</div>
                    <span class="plant-category-badge">${plant.emoji || '🌿'} ${plant.category}</span>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">
                      <span class="season-water-badge ${seasonClass}">${seasonEmoji} ${waterInfo.split('.')[0]}</span>
                    </div>
                    <button class="btn-primary" style="margin-top:10px;padding:8px 16px;font-size:13px;" data-view-plant="${plant.id}">View Details →</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

        <!-- Detail Modal (initially hidden) -->
        <div id="plant-detail-modal-overlay" class="modal-overlay hidden">
          <div class="modal-card plant-detail-modal" id="plant-detail-modal-content">
            <!-- Injected by viewPlantDetails() -->
          </div>
        </div>
      </div>
    `;
  },

  viewPlantDetails(plantId) {
    const plant = (window.Botaniq.PlantsData || []).find(p => p.id === plantId);
    if (!plant) return;

    const season = window.Botaniq.State.activeSeason;
    const seasonEmoji = { Summer: '☀️', Winter: '❄️', Monsoon: '🌧️' }[season];
    const waterInfo = this.getSeasonWatering(plant);

    const modal = document.getElementById('plant-detail-modal-overlay');
    const content = document.getElementById('plant-detail-modal-content');

    if (!modal || !content) return;

    content.innerHTML = `
      <div class="plant-detail-header">
        <div class="plant-detail-art">
          ${window.Botaniq.drawPlantIllustration(plant)}
        </div>
        <div class="plant-detail-meta" style="flex-grow:1;">
          <h2>${plant.name}</h2>
          <p class="sci">${plant.scientific}</p>
          <span class="plant-category-badge">${plant.emoji || '🌿'} ${plant.category}</span>
          <div style="margin-top:12px;padding:10px 14px;background:rgba(139,168,136,0.08);border:1px solid var(--border-organic);border-radius:var(--radius-md);font-size:13px;">
            ${seasonEmoji} <strong>${season} Watering:</strong> ${waterInfo}
          </div>
        </div>
        <button id="close-plant-modal" style="background:none;border:none;font-size:28px;cursor:pointer;color:var(--text-muted);line-height:1;flex-shrink:0;">×</button>
      </div>

      <div class="plant-detail-body">
        <div class="detail-item">
          <div class="detail-item-label">🌞 Sunlight</div>
          <div class="detail-item-value">${plant.sunlight}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item-label">🌡️ Temperature</div>
          <div class="detail-item-value">${plant.temperature}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item-label">🪴 Soil Type</div>
          <div class="detail-item-value">${plant.soil}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item-label">📏 Growth Speed</div>
          <div class="detail-item-value">${plant.growth}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item-label">🌍 Native Habitat</div>
          <div class="detail-item-value">${plant.habitat}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item-label">🐶 Pet Safety</div>
          <div class="detail-item-value">${plant.petSafety}</div>
        </div>
        <div class="detail-item full-width">
          <div class="detail-item-label">⚠️ Common Diseases</div>
          <div class="detail-item-value">${plant.diseases}</div>
        </div>
        <div class="detail-item full-width">
          <div class="detail-item-label">✂️ Pruning Guide</div>
          <div class="detail-item-value">${plant.pruning}</div>
        </div>
        <div class="detail-item full-width">
          <div class="detail-item-label">🌱 Propagation Methods</div>
          <div class="detail-item-value">${plant.propagation}</div>
        </div>
        <div class="detail-item full-width">
          <div class="detail-item-label">🧠 Beginner Mistakes</div>
          <div class="detail-item-value">${plant.mistakes}</div>
        </div>
        <div class="detail-item full-width" style="background:linear-gradient(135deg,rgba(139,168,136,0.06),rgba(200,169,126,0.06));border-color:var(--primary-sage);">
          <div class="detail-item-label">📖 About This Plant</div>
          <div class="detail-item-value" style="font-size:14px;line-height:1.6;">${plant.description}</div>
        </div>

        <!-- Seasonal Care Section -->
        <div class="detail-item full-width">
          <div class="detail-item-label">🗓️ Seasonal Care Schedule</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px;">
            ${['Summer','Winter','Monsoon'].map(s => {
              const water = (plant.watering && plant.watering[s]) ? plant.watering[s] : 'Follow standard schedule.';
              const emoji = {Summer:'☀️',Winter:'❄️',Monsoon:'🌧️'}[s];
              return `
                <div style="background:var(--bg-card);border:1px solid var(--border-organic);padding:12px;border-radius:var(--radius-sm);">
                  <div style="font-weight:700;font-size:13px;margin-bottom:6px;">${emoji} ${s}</div>
                  <div style="font-size:12px;color:var(--text-muted);line-height:1.4;">${water}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="plant-detail-actions">
        <button class="btn-primary" id="add-to-garden-btn" data-plant-id="${plant.id}" data-plant-name="${plant.name}" data-plant-emoji="${plant.emoji || '🌿'}">
          🪴 Add to My Garden
        </button>
        <button class="btn-secondary" id="close-plant-modal-2">Close</button>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Close handlers
    const closeModal = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    };
    document.getElementById('close-plant-modal').addEventListener('click', closeModal);
    document.getElementById('close-plant-modal-2').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Add to garden
    document.getElementById('add-to-garden-btn').addEventListener('click', () => {
      const existing = JSON.parse(localStorage.getItem('botaniq_care_plants') || '[]');
      const alreadyAdded = existing.find(p => p.id === plant.id);
      if (alreadyAdded) {
        window.Botaniq.Notification.show(`${plant.name} is already in your garden!`, 'default');
        return;
      }
      const newPlant = {
        id: plant.id,
        name: plant.name,
        emoji: plant.emoji || '🌿',
        species: plant.scientific,
        wateringDays: 7,
        lastWatered: new Date().toISOString(),
        lastFertilized: new Date().toISOString(),
        fertilizeDays: 30,
        lastRepotted: new Date().toISOString(),
        repotDays: 365,
        notes: '',
        addedDate: new Date().toISOString(),
        progress: 10
      };
      existing.push(newPlant);
      localStorage.setItem('botaniq_care_plants', JSON.stringify(existing));
      window.Botaniq.XPManager.addXP(20);
      window.Botaniq.Notification.show(`${plant.name} added to your garden! 🌱`, 'success');
      if (window.Botaniq.Achievements) window.Botaniq.Achievements.checkUnlocks();
      closeModal();
    });
  },

  init() {
    // Smart Finder Trigger
    const finderBtn = document.getElementById('finder-search-btn');
    if (finderBtn) {
      finderBtn.addEventListener('click', () => {
        const light = document.getElementById('finder-light').value;
        const humidity = document.getElementById('finder-humidity').value;
        const resultsDiv = document.getElementById('finder-results');

        const plants = window.Botaniq.PlantsData || [];
        const recommendations = [];

        plants.forEach(p => {
          let lightMatch = false;
          let humidityMatch = false;

          const sunlightText = (p.sunlight || '').toLowerCase();
          const descriptionText = (p.description || '').toLowerCase();
          const category = (p.category || '').toLowerCase();
          const soilText = (p.soil || '').toLowerCase();
          const habitatText = (p.habitat || '').toLowerCase();

          // 1. Evaluate Light
          if (light === 'any') {
            lightMatch = true;
          } else if (light === 'low') {
            if (sunlightText.includes('low') || sunlightText.includes('shade') || sunlightText.includes('survivor')) {
              lightMatch = true;
            }
          } else if (light === 'medium') {
            if (sunlightText.includes('indirect') || sunlightText.includes('partial') || sunlightText.includes('medium') || sunlightText.includes('shade')) {
              lightMatch = true;
            }
          } else if (light === 'direct') {
            if (sunlightText.includes('direct') || sunlightText.includes('full') || sunlightText.includes('south') || sunlightText.includes('west') || sunlightText.includes('blazing')) {
              lightMatch = true;
            }
          }

          // 2. Evaluate Humidity
          if (humidity === 'any') {
            humidityMatch = true;
          } else if (humidity === 'low') {
            if (category === 'succulents' || soilText.includes('cactus') || soilText.includes('sand') || sunlightText.includes('desert') || descriptionText.includes('drought')) {
              humidityMatch = true;
            }
          } else if (humidity === 'high') {
            if (category === 'aquatic' || category === 'carnivorous' || category === 'tropical' || habitatText.includes('rainforest') || habitatText.includes('wetland') || habitatText.includes('swamp') || descriptionText.includes('humidity') || descriptionText.includes('tropical')) {
              humidityMatch = true;
            }
          }

          if (lightMatch && humidityMatch) {
            recommendations.push(p);
          }
        });

        // Show recommended results list
        resultsDiv.classList.remove('hidden');
        if (recommendations.length === 0) {
          resultsDiv.innerHTML = `
            <div style="font-size: 13.5px; color: var(--text-muted); text-align: center; padding: 10px;">
              No exact match found for this micro-climate. Try a different combination! 🌿
            </div>
          `;
        } else {
          // Take top 4 recommendations
          const list = recommendations.slice(0, 4);
          resultsDiv.innerHTML = `
            <div style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--primary-forest); margin-bottom:10px;">⭐ Recommended Plants for Your Room:</div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:10px;">
              ${list.map(p => `
                <div class="recommended-item" data-rec-id="${p.id}" style="background:var(--bg-card); border:1px solid var(--border-organic); padding:10px; border-radius:var(--radius-sm); text-align:center; cursor:pointer; transition:var(--transition-fast);">
                  <div style="font-size: 24px; margin-bottom: 4px;">${p.emoji || '🌿'}</div>
                  <div style="font-size: 13px; font-weight: 600; color: var(--text-dark); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${p.category}</div>
                </div>
              `).join('')}
            </div>
          `;

          // Click handler to open details
          document.querySelectorAll('.recommended-item').forEach(item => {
            item.addEventListener('click', () => {
              this.viewPlantDetails(item.dataset.recId);
            });
            item.addEventListener('mouseover', () => {
              item.style.borderColor = 'var(--primary-sage)';
              item.style.transform = 'translateY(-2px)';
            });
            item.addEventListener('mouseout', () => {
              item.style.borderColor = 'var(--border-organic)';
              item.style.transform = 'none';
            });
          });
        }
      });
    }

    // Category pill clicks
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.activeCategory = pill.dataset.cat;
        window.Botaniq.Router.navigateTo('encyclopedia');
      });
    });

    // Search input
    const searchInput = document.getElementById('enc-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        // Debounced rerender
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => {
          window.Botaniq.Router.navigateTo('encyclopedia');
        }, 300);
      });
    }

    // Plant card "View Details" clicks
    document.querySelectorAll('[data-view-plant]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.viewPlantDetails(btn.dataset.viewPlant);
      });
    });

    // Entire plant card click also opens detail
    document.querySelectorAll('.plant-card').forEach(card => {
      card.addEventListener('click', () => {
        this.viewPlantDetails(card.dataset.plantId);
      });
    });
  }
};

// Encyclopedia-specific styling
const encStyle = document.createElement('style');
encStyle.innerHTML = `
  .encyclopedia-container { display: flex; flex-direction: column; gap: 0; }
  .enc-search-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .enc-search-wrap { display: flex; align-items: center; gap: 12px; flex-grow: 1; background: var(--bg-card); border: 1px solid var(--border-organic); border-radius: var(--radius-md); padding: 12px 16px; box-shadow: var(--shadow-soft); }
  .enc-search-wrap input { border: none !important; background: none !important; box-shadow: none !important; padding: 0 !important; font-size: 15px; }
  .season-info-badge { background: var(--bg-input); border: 1px solid var(--border-organic); padding: 8px 16px; border-radius: 50px; font-size: 13px; font-weight: 600; white-space: nowrap; }
`;
document.head.appendChild(encStyle);
