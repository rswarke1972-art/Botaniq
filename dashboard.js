/**
 * BOTANIQ - Home Dashboard Module
 * Beautiful nature sanctuary home screen
 */
window.Botaniq.Dashboard = {

  getGreeting() {
    const h = new Date().getHours();
    const season = window.Botaniq.State.activeSeason;
    const seasonMsg = {
      Summer: 'The sun shines bright for your garden today. 🌞',
      Winter: 'Keep your plants cozy and warm indoors. ❄️',
      Monsoon: 'Roots drink deep in today\'s rains. 🌧️'
    }[season];

    let timeGreet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
    let timeEmoji = h < 12 ? '🌅' : h < 17 ? '🌞' : '🌙';
    return { timeGreet, timeEmoji, seasonMsg };
  },

  getTasks() {
    const defaultTasks = [
      { id: 't1', text: 'Water Jade Plant', icon: '💧', done: false },
      { id: 't2', text: 'Trim Mint Leaves', icon: '✂️', done: false },
      { id: 't3', text: 'Move Bonsai to shade', icon: '☀️', done: false },
      { id: 't4', text: 'Check soil moisture', icon: '🪴', done: false },
      { id: 't5', text: 'Fertilize Snake Plant', icon: '🌿', done: false }
    ];
    try {
      return JSON.parse(localStorage.getItem('botaniq_tasks')) || defaultTasks;
    } catch (e) { return defaultTasks; }
  },

  saveTasks(tasks) {
    localStorage.setItem('botaniq_tasks', JSON.stringify(tasks));
  },

  getGardenPlants() {
    try {
      const saved = JSON.parse(localStorage.getItem('botaniq_care_plants')) || [];
      if (saved.length > 0) return saved.slice(0, 4);
    } catch (e) {}
    return [
      { name: 'Jade Plant', emoji: '🌿', progress: 74, id: 'demo1' },
      { name: 'Bonsai', emoji: '🌳', progress: 41, id: 'demo2' },
      { name: 'Monstera', emoji: '🌱', progress: 88, id: 'demo3' }
    ];
  },

  getSeasonTips() {
    const s = window.Botaniq.State.activeSeason;
    const tips = {
      Summer: [
        '☀️ Move sun-sensitive plants away from west windows after noon.',
        '💧 Water twice as frequently. Check soil every 2-3 days.',
        '🌬️ Increase humidity with a pebble water tray or daily misting.'
      ],
      Winter: [
        '❄️ Stop fertilizing most plants — they are resting.',
        '💡 Move plants closer to windows for maximum winter light.',
        '🪴 Reduce watering by 40%. Most roots slow down significantly.'
      ],
      Monsoon: [
        '🌧️ Check pot drainage holes weekly — prevent waterlogging.',
        '🍃 Wipe leaf surfaces to remove dust that blocks monsoon light.',
        '🌱 Great season to propagate! Cuttings root faster in humidity.'
      ]
    };
    return tips[s] || tips.Summer;
  },

  getRankInfo() {
    const xp = window.Botaniq.State.xp || 0;
    const ranks = [
      { name: 'Seedling', emoji: '🌱', min: 0, max: 100 },
      { name: 'Leaf Explorer', emoji: '🍃', min: 100, max: 300 },
      { name: 'Garden Keeper', emoji: '🌸', min: 300, max: 600 },
      { name: 'Botany Scholar', emoji: '📚', min: 600, max: 1000 },
      { name: 'Nature Master', emoji: '🌳', min: 1000, max: 1000 }
    ];
    let current = ranks[0];
    let next = ranks[1];
    for (let i = 0; i < ranks.length; i++) {
      if (xp >= ranks[i].min) {
        current = ranks[i];
        next = ranks[i + 1] || ranks[i];
      }
    }
    const progress = current === next ? 100 :
      Math.round(((xp - current.min) / (next.min - current.min)) * 100);
    return { current, next, xp, progress };
  },

  render() {
    const { timeGreet, timeEmoji, seasonMsg } = this.getGreeting();
    const tasks = this.getTasks();
    const gardenPlants = this.getGardenPlants();
    const tips = this.getSeasonTips();
    const rankInfo = this.getRankInfo();
    const streak = window.Botaniq.State.streak || 0;
    const season = window.Botaniq.State.activeSeason;
    const doneTasks = tasks.filter(t => t.done).length;

    return `
      <!-- Hero Banner -->
      <div class="dashboard-hero">
        <svg class="hero-botanical-art" viewBox="0 0 300 400" fill="none">
          <circle cx="200" cy="120" r="90" fill="#4D6A4F" opacity="0.6"/>
          <circle cx="150" cy="100" r="70" fill="#6B8F71" opacity="0.7"/>
          <circle cx="230" cy="150" r="60" fill="#8BA888" opacity="0.5"/>
          <path d="M180 280 Q175 200 160 120" stroke="#4D6A4F" stroke-width="8" fill="none" stroke-linecap="round"/>
          <path d="M160 120 Q120 100 100 130" stroke="#4D6A4F" stroke-width="5" fill="none"/>
          <path d="M170 170 Q200 140 220 160" stroke="#4D6A4F" stroke-width="5" fill="none"/>
          <ellipse cx="175" cy="295" rx="25" ry="8" fill="#8C6A56" opacity="0.5"/>
          <rect x="162" y="282" width="26" height="25" rx="3" fill="#8C6A56" opacity="0.8"/>
        </svg>
        <div class="dashboard-hero-content">
          <h2>${timeEmoji} ${timeGreet}, Botanist!</h2>
          <p>${seasonMsg}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn-primary" onclick="window.Botaniq.Router.navigateTo('encyclopedia')">🌿 Explore Plants</button>
            <button class="btn-secondary" onclick="window.Botaniq.Router.navigateTo('learning')">🌱 Learn Botany</button>
          </div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="dashboard-stats-grid">
        <div class="stat-card">
          <div class="stat-card-icon">🔥</div>
          <div class="stat-card-info">
            <div class="stat-value">${streak}</div>
            <div class="stat-label">Day Nature Streak</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">${rankInfo.current.emoji}</div>
          <div class="stat-card-info">
            <div class="stat-value">${rankInfo.current.name}</div>
            <div class="stat-label">Current Rank • ${rankInfo.xp} XP</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">✅</div>
          <div class="stat-card-info">
            <div class="stat-value">${doneTasks}/${tasks.length}</div>
            <div class="stat-label">Tasks Done Today</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">📅</div>
          <div class="stat-card-info">
            <div class="stat-value">${season}</div>
            <div class="stat-label">Active Season Mode</div>
          </div>
        </div>
      </div>

      <!-- Main 2-column grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;" class="dash-main-grid">

        <!-- Daily Tasks -->
        <div class="premium-card">
          <h3>🗓️ Today's Plant Tasks</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Complete your daily plant care rituals.</p>
          <div id="task-list">
            ${tasks.map(t => `
              <div class="task-item ${t.done ? 'completed' : ''}" data-task-id="${t.id}">
                <div class="task-checkbox"></div>
                <span>${t.icon} ${t.text}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Rank Progress -->
        <div class="premium-card">
          <h3>🏆 Botanical Rank</h3>
          <div style="text-align:center;padding:16px 0;">
            <div style="font-size:56px;margin-bottom:8px;">${rankInfo.current.emoji}</div>
            <div style="font-family:var(--font-heading);font-size:20px;margin-bottom:4px;">${rankInfo.current.name}</div>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">${rankInfo.xp} XP Total</div>
            ${rankInfo.current.name !== 'Nature Master' ? `
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">Progress to <strong>${rankInfo.next.name}</strong></div>
              <div class="progress-container">
                <div class="progress-fill" id="rank-progress-bar" style="width:0%;"></div>
              </div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">${rankInfo.progress}% Complete</div>
            ` : `<div style="font-size:13px;color:var(--accent-gold);font-weight:600;">🌟 Maximum Rank Achieved!</div>`}
          </div>
          <button class="btn-secondary" style="width:100%;margin-top:12px;" onclick="window.Botaniq.Router.navigateTo('achievements')">View All Achievements 🏅</button>
        </div>

        <!-- Garden Progress -->
        <div class="premium-card">
          <h3>🌿 Garden Progress</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Your plants are growing beautifully.</p>
          <div class="garden-track-list" id="garden-track-list">
            ${gardenPlants.map(p => `
              <div class="garden-plant-row">
                <span class="garden-plant-icon">${p.emoji}</span>
                <div class="garden-plant-info">
                  <div class="garden-plant-header">
                    <span>${p.name}</span>
                    <span style="color:var(--primary-sage);font-weight:700;">${p.progress}%</span>
                  </div>
                  <div class="progress-container">
                    <div class="progress-fill" data-target="${p.progress}" style="width:0%;"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <button class="btn-primary" style="width:100%;margin-top:16px;" onclick="window.Botaniq.Router.navigateTo('care')">📅 Manage Care Plan</button>
        </div>

        <!-- Seasonal Tips -->
        <div class="premium-card">
          <h3>🌿 ${season} Care Tips</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Expert seasonal guidance for your plants.</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${tips.map(tip => `
              <div style="background:var(--bg-input);border:1px solid var(--border-organic);border-radius:var(--radius-md);padding:14px 16px;font-size:14px;line-height:1.5;">
                ${tip}
              </div>
            `).join('')}
          </div>
          <div style="margin-top:16px;padding:12px;background:rgba(200,169,126,0.08);border:1px dashed var(--accent-gold);border-radius:var(--radius-md);font-size:12px;color:var(--text-muted);">
            💡 Tap the season badge in the header to switch between Summer, Winter, and Monsoon care modes.
          </div>
        </div>
      </div>

      <!-- Quick Navigation -->
      <div class="premium-card" style="margin-top:24px;">
        <h3>🚀 Quick Explore</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-top:16px;">
          ${[
            { screen: 'encyclopedia', icon: '📖', label: 'Encyclopedia' },
            { screen: 'bonsai', icon: '🌳', label: 'Bonsai Academy' },
            { screen: 'diagnosis', icon: '🩺', label: 'Plant Doctor' },
            { screen: 'science', icon: '🧪', label: 'Science Lab' },
            { screen: 'journal', icon: '📸', label: 'Growth Journal' },
            { screen: 'ecosystems', icon: '🌎', label: 'Biome Map' }
          ].map(item => `
            <button onclick="window.Botaniq.Router.navigateTo('${item.screen}')"
              style="background:var(--bg-input);border:1px solid var(--border-organic);padding:16px 12px;border-radius:var(--radius-md);cursor:pointer;font-family:var(--font-body);font-size:13px;font-weight:600;color:var(--text-dark);transition:var(--transition-fast);display:flex;flex-direction:column;align-items:center;gap:8px;"
              onmouseover="this.style.background='var(--primary-sage)';this.style.color='white';this.style.borderColor='var(--primary-sage)';"
              onmouseout="this.style.background='var(--bg-input)';this.style.color='var(--text-dark)';this.style.borderColor='var(--border-organic)';">
              <span style="font-size:24px;">${item.icon}</span>${item.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  init() {
    // Animate progress bars
    requestAnimationFrame(() => {
      // Rank bar
      const rankBar = document.getElementById('rank-progress-bar');
      if (rankBar) {
        setTimeout(() => {
          rankBar.style.width = this.getRankInfo().progress + '%';
        }, 100);
      }
      // Garden plant bars
      document.querySelectorAll('.progress-fill[data-target]').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.target + '%';
        }, 200);
      });
    });

    // Task checkbox interaction
    document.querySelectorAll('.task-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.taskId;
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.done = !task.done;
          this.saveTasks(tasks);
          item.classList.toggle('completed', task.done);
          if (task.done) {
            window.Botaniq.XPManager.addXP(5);
          }
        }
      });
    });

    // Auto-increment streak if user is active today
    const today = new Date().toDateString();
    if (window.Botaniq.State.lastActiveDate !== today) {
      window.Botaniq.State.lastActiveDate = today;
      window.Botaniq.State.streak = (window.Botaniq.State.streak || 0) + 1;
      window.Botaniq.saveState();
      document.getElementById('sidebar-streak').innerText = `${window.Botaniq.State.streak} Days`;
    }
  }
};

// Mobile responsive dashboard grid
const dashStyle = document.createElement('style');
dashStyle.innerHTML = `
  .dash-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 768px) {
    .dash-main-grid { grid-template-columns: 1fr !important; }
  }
`;
document.head.appendChild(dashStyle);
