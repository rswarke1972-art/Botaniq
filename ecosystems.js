/**
 * BOTANIQ - Climate & Biomes Map Module
 * Interactive biome exploration with climate profiles and dynamic plant recommendations
 */
window.Botaniq.Ecosystems = {
  activeBiome: 'rainforest',

  biomes: {
    rainforest: {
      name: 'Tropical Rainforest 🌧️',
      emoji: '🌧️',
      color: 'linear-gradient(135deg, #2A5235, #5A8C64)',
      temperature: '20°C - 30°C',
      precipitation: '2000 - 4000 mm / year',
      soil: 'Nutrient-poor, highly leached acidic clay, rich organic surface humus.',
      climateProfile: 'Constantly warm, wet, and highly humid. Giant leaf surfaces help shed torrential monsoon downpours, while tall tree canopies create layers of shuffled shadows.',
      categories: ['tropical', 'indoor'],
      fallbackIds: ['monstera', 'bird_of_paradise', 'hoya', 'fiddle_leaf_fig', 'prayer_plant']
    },
    desert: {
      name: 'Arid Desert 🏜️',
      emoji: '🏜️',
      color: 'linear-gradient(135deg, #B58A3D, #D0A24A)',
      temperature: '10°C - 45°C',
      precipitation: 'Less than 250 mm / year',
      soil: 'Sandy, coarse gravelly stones, alkaline, excellent rapid drainage.',
      climateProfile: 'Extreme diurnal temperature swings (scorching hot days, near-freezing nights) with virtually zero humidity. Plants have evolved spiky needles, thick protective wax coatings, and fleshy water-storing tissues.',
      categories: ['succulents'],
      fallbackIds: ['aloe_vera', 'zebra_cactus', 'burros_tail', 'saguaro', 'golden_barrel']
    },
    wetlands: {
      name: 'Coastal Wetlands 🌊',
      emoji: '🌊',
      color: 'linear-gradient(135deg, #2E658E, #5F9EC7)',
      temperature: '15°C - 35°C',
      precipitation: '1000 - 2000 mm / year',
      soil: 'Waterlogged muck, peat, heavy anaerobic clay mud, high mineral concentration.',
      climateProfile: 'Saturated, swampy, or fully submerged conditions. Plant cells must handle poor oxygen levels in muddy roots and floating leaf dynamics to maximize overhead sun exposure.',
      categories: ['aquatic'],
      fallbackIds: ['water_lily', 'brahmi', 'duckweed', 'water_hyacinth', 'lotus_aquatic']
    },
    tundra: {
      name: 'Alpine Tundra ❄️',
      emoji: '❄️',
      color: 'linear-gradient(135deg, #4A5F7A, #7CA0B5)',
      temperature: '-10°C - 15°C',
      precipitation: '300 - 500 mm / year',
      soil: 'Thin rocky soil over deep frozen permafrost. Minimal organic decomposition.',
      climateProfile: 'Severe sub-zero winter dormancy with short, cool growing periods. Trees are dwarfed or grow in compact mats close to the soil to avoid freezing winds.',
      categories: ['bonsai', 'trees'],
      fallbackIds: ['japanese_maple', 'ginkgo', 'pine_tree', 'white_oak', 'juniper_bonsai']
    }
  },

  render() {
    const active = this.biomes[this.activeBiome];
    const recommendedPlants = this.getRecommendedPlants(active);

    return `
      <div class="ecosystems-container">
        <!-- Interactive Biome Scroll Cards Selector -->
        <div class="premium-card">
          <h3>🌎 Global Climate Biomes</h3>
          <p style="color:var(--text-muted); margin-bottom:16px;">Select a global biome to study its micro-climate parameters and discover native flora.</p>
          
          <div class="biome-scroll-row" style="display:flex; gap:16px; overflow-x:auto; padding-bottom:8px;">
            ${Object.entries(this.biomes).map(([key, data]) => `
              <div class="biome-card-item ${this.activeBiome === key ? 'active' : ''}" data-biome="${key}" 
                   style="min-width: 180px; background: ${data.color}; border-radius: var(--radius-md); padding: 18px; cursor: pointer; transition: var(--transition-smooth); color: white; border: 2px solid ${this.activeBiome === key ? 'white' : 'transparent'}; box-shadow: var(--shadow-soft);">
                <span style="font-size:36px; display:block; margin-bottom:8px;">${data.emoji}</span>
                <strong style="font-size:15px; display:block;">${data.name.split(' ')[0]} ${data.name.split(' ')[1] || ''}</strong>
                <span style="font-size:12px; opacity:0.8;">Temp: ${data.temperature.split(' ')[0]}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Biome Details and Recommendations -->
        <div class="premium-card" style="margin-top:20px; background: var(--bg-card) !important; border-color: var(--border-organic);">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-organic); padding-bottom:12px; margin-bottom:16px;">
            <h3 style="margin:0; color:var(--text-dark);">${active.name} Profile</h3>
            <span style="font-size:24px;">🌍</span>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;" class="biome-details-grid">
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="background:var(--bg-input); padding:12px; border-radius:var(--radius-sm);">
                <div style="font-size:11px; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:4px;">🌡️ Average Temperature</div>
                <div style="font-size:13.5px; font-weight:600; color:var(--text-dark);">${active.temperature}</div>
              </div>
              <div style="background:var(--bg-input); padding:12px; border-radius:var(--radius-sm);">
                <div style="font-size:11px; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:4px;">🌧️ Annual Precipitation</div>
                <div style="font-size:13.5px; font-weight:600; color:var(--text-dark);">${active.precipitation}</div>
              </div>
              <div style="background:var(--bg-input); padding:12px; border-radius:var(--radius-sm);">
                <div style="font-size:11px; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:4px;">🪨 Soil Structure</div>
                <div style="font-size:13px; color:var(--text-dark); line-height:1.4;">${active.soil}</div>
              </div>
            </div>

            <div>
              <div style="background:var(--bg-input); padding:16px; border-radius:var(--radius-sm); height:100%; border-left:4px solid var(--primary-sage);">
                <div style="font-size:11px; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">🔬 Ecological Profile</div>
                <p style="font-size:13.5px; line-height:1.6; margin:0; color:var(--text-dark); font-style:italic;">"${active.climateProfile}"</p>
              </div>
            </div>
          </div>

          <!-- Native Recommended Plants -->
          <div style="margin-top:20px; padding-top:16px; border-top:1px dashed var(--border-organic);">
            <div style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--primary-forest); margin-bottom:10px;">🍃 Native Flora Representatives:</div>
            <div class="featured-plants-row" style="display:flex; flex-wrap:wrap; gap:10px;">
              ${recommendedPlants.map(p => `
                <div class="featured-plant-pill" data-plant-id="${p.id}" 
                     style="background:var(--bg-input); border:1px solid var(--border-organic); padding:8px 16px; border-radius:50px; font-size:13px; cursor:pointer; transition:var(--transition-fast); display:flex; align-items:center; gap:8px;">
                  <span>${p.emoji || '🌿'}</span>
                  <strong>${p.name}</strong>
                  <span style="font-size:11px; color:var(--text-muted); font-style:italic;">(${p.scientific.split(' ')[0]})</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getRecommendedPlants(biome) {
    const plants = window.Botaniq.PlantsData || [];
    // Filter plants that belong to this biome's categories or are in list of custom fallback ids
    const matches = plants.filter(p => 
      biome.categories.includes(p.category) || biome.fallbackIds.includes(p.id)
    );
    return matches.slice(0, 5); // Return top 5 matches
  },

  init() {
    // Biome card clicking events
    document.querySelectorAll('.biome-card-item').forEach(card => {
      card.addEventListener('click', () => {
        this.activeBiome = card.dataset.biome;
        window.Botaniq.Router.navigateTo('ecosystems');
      });
      card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-4px)';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = 'none';
      });
    });

    // Native plants pill clicking handler -> goes to details modal in encyclopedia
    document.querySelectorAll('.featured-plant-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const plantId = pill.dataset.plantId;
        window.Botaniq.Router.navigateTo('encyclopedia');
        
        // Timeout to ensure encyclopedia is rendered before triggering details modal
        setTimeout(() => {
          if (window.Botaniq.Encyclopedia && window.Botaniq.Encyclopedia.viewPlantDetails) {
            window.Botaniq.Encyclopedia.viewPlantDetails(plantId);
          }
        }, 100);
      });
    });
  }
};

// Add styles overrides in JS specifically for Biomes layout
const biomeStyles = document.createElement('style');
biomeStyles.innerHTML = `
  @media (max-width: 768px) {
    .biome-details-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
  }
`;
document.head.appendChild(biomeStyles);
