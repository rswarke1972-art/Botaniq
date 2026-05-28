/**
 * BOTANIQ - Typo-Tolerant Search System & Levenshtein Algorithm
 */

window.Botaniq.Search = {
  // Levenshtein Distance Calculator for fuzzy matching
  getEditDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    a = a.toLowerCase();
    b = b.toLowerCase();

    const matrix = [];

    // Increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // Increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  },

  // Perform search
  query(searchTerm, category = 'all') {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }

    const queryStr = searchTerm.toLowerCase().trim();
    const results = [];

    // 1. Gather all searchable indices
    // A. Encyclopedia Plants
    const plants = window.Botaniq.PlantsData || [];
    plants.forEach(plant => {
      let score = 0;
      
      const name = plant.name.toLowerCase();
      const scientific = plant.scientific.toLowerCase();
      const catName = plant.category.toLowerCase();
      
      // Exact substring matching gets highest score
      if (name.includes(queryStr)) {
        score += 100 - (name.indexOf(queryStr) * 5);
      } else if (scientific.includes(queryStr)) {
        score += 80;
      } else {
        // Typo tolerance matching
        const words = name.split(' ');
        words.forEach(word => {
          const distance = this.getEditDistance(queryStr, word);
          if (distance <= 2 && queryStr.length > 3) {
            score += 50 - (distance * 15);
          }
        });
      }

      if (score > 0) {
        results.push({
          type: 'plants',
          title: plant.name,
          subtitle: plant.scientific,
          emoji: plant.emoji || '🌿',
          linkId: plant.id,
          desc: `Category: ${plant.category} | Habitat: ${plant.habitat}`,
          score: score
        });
      }
    });

    // B. Botany Lessons
    const lessons = [
      { id: 'foundation', title: 'What is a plant?', type: 'guides', emoji: '🌱', desc: 'Anatomy, cells, roots, stems, leaves, life cycles' },
      { id: 'biology', title: 'Plant Biology & Photosynthesis', type: 'guides', emoji: '☀️', desc: 'Photosynthesis, chlorophyll, transpiration, xylem/phloem' },
      { id: 'reproduction', title: 'Plant Reproduction', type: 'guides', emoji: '🌸', desc: 'Pollination, fertilization, seeds, flower anatomy' },
      { id: 'ecology', title: 'Ecosystem Ecology', type: 'guides', emoji: '🌍', desc: 'Forests, deserts, biomes, biodiversity, wetlands' },
      { id: 'advanced', title: 'Advanced Plant Genetics', type: 'guides', emoji: '🧬', desc: 'Taxonomy, plant pathology, genetics, evolution' }
    ];

    lessons.forEach(l => {
      let score = 0;
      const title = l.title.toLowerCase();
      const desc = l.desc.toLowerCase();
      
      if (title.includes(queryStr) || desc.includes(queryStr)) {
        score += 70;
      } else {
        // Typo check
        const distance = this.getEditDistance(queryStr, l.id);
        if (distance <= 2) {
          score += 40;
        }
      }

      if (score > 0) {
        results.push({
          type: 'guides',
          title: l.title,
          subtitle: 'Botany Academy',
          emoji: l.emoji,
          linkId: 'learning',
          desc: l.desc,
          score: score
        });
      }
    });

    // C. Special Science Simulators
    const sims = [
      { id: 'photosynthesis', title: 'Photosynthesis Animation', type: 'science', emoji: '🧪', desc: 'Animate sunlight, water, and CO2 synthesis' },
      { id: 'xylem', title: 'Water Xylem Transpiration', type: 'science', emoji: '💧', desc: 'Simulate capillary pull from root fibers' },
      { id: 'pollination', title: 'Interactive Bee Pollinator', type: 'science', emoji: '🐝', desc: 'Drag-and-drop bee pollination gameplay' },
      { id: 'growth', title: 'Procedural Growth Simulator', type: 'science', emoji: '🌱', desc: 'Alter sunlight, water, temperature variables' }
    ];

    sims.forEach(s => {
      let score = 0;
      const title = s.title.toLowerCase();
      const desc = s.desc.toLowerCase();
      
      if (title.includes(queryStr) || desc.includes(queryStr)) {
        score += 80;
      } else {
        const words = title.split(' ');
        words.forEach(w => {
          const distance = this.getEditDistance(queryStr, w);
          if (distance <= 1) score += 40;
        });
      }

      if (score > 0) {
        results.push({
          type: 'science',
          title: s.title,
          subtitle: 'Interactive Science Lab',
          emoji: s.emoji,
          linkId: 'science',
          desc: s.desc,
          score: score
        });
      }
    });

    // Sort results by matching confidence score
    results.sort((x, y) => y.score - x.score);

    // Category filter mapping
    if (category === 'all') {
      return results;
    }
    return results.filter(item => item.type === category);
  },

  // Setup visual event handlers
  init() {
    const modal = document.getElementById('search-modal');
    const searchBtn = document.getElementById('global-search-btn');
    const closeBtn = document.getElementById('close-search-btn');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results-list');
    
    let activeCategory = 'all';

    // Show modal
    searchBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      input.value = '';
      resultsContainer.innerHTML = '<div class="search-empty">Type something to search the Botaniq ecosystem...</div>';
      setTimeout(() => input.focus(), 150);
    });

    // Close modal
    const closeModal = () => {
      modal.classList.add('hidden');
    };
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // Category Pills selection
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.searchCat;
        triggerSearch();
      });
    });

    // Input listening
    const triggerSearch = () => {
      const val = input.value;
      if (!val || val.trim().length < 2) {
        resultsContainer.innerHTML = '<div class="search-empty">Type at least 2 characters...</div>';
        return;
      }
      
      const hits = this.query(val, activeCategory);
      if (hits.length === 0) {
        resultsContainer.innerHTML = `<div class="search-empty">No results found for "${val}". Try "bonsi", "monstr", "water", or "anatomy".</div>`;
        return;
      }

      let html = '';
      hits.forEach(hit => {
        html += `
          <div class="search-item" data-screen="${hit.linkId}" data-target="${hit.title}">
            <div class="search-item-left">
              <span class="search-item-icon">${hit.emoji}</span>
              <div>
                <div class="search-item-title">${hit.title}</div>
                <div class="search-item-desc">${hit.desc}</div>
              </div>
            </div>
            <span class="search-item-type">${hit.type.toUpperCase()}</span>
          </div>
        `;
      });
      resultsContainer.innerHTML = html;

      // Event listener on item click
      document.querySelectorAll('.search-results .search-item').forEach(item => {
        item.addEventListener('click', () => {
          const targetScreen = item.dataset.screen;
          const targetName = item.dataset.target;
          
          closeModal();
          
          if (targetScreen === 'learning') {
            window.Botaniq.Router.navigateTo('learning');
          } else if (targetScreen === 'science') {
            window.Botaniq.Router.navigateTo('science');
          } else {
            // It is an individual plant id
            window.Botaniq.Router.navigateTo('encyclopedia');
            // Select plant in encyclopedia
            setTimeout(() => {
              if (window.Botaniq.Encyclopedia && window.Botaniq.Encyclopedia.viewPlantDetails) {
                window.Botaniq.Encyclopedia.viewPlantDetails(targetScreen);
              }
            }, 100);
          }
        });
      });
    };

    input.addEventListener('input', triggerSearch);
  }
};

// Initial binding of search triggers
window.addEventListener('DOMContentLoaded', () => {
  window.Botaniq.Search.init();
});
