/**
 * BOTANIQ - Daily Care Planner Module
 * Complete garden schedule tracking with countdown indicators and PWA push notifications
 */
window.Botaniq.Care = {
  getPlants() {
    const defaultPlants = [
      {
        id: 'snake_plant',
        name: 'My Snake Plant',
        emoji: '🪴',
        species: 'Sansevieria trifasciata',
        wateringDays: 20,
        lastWatered: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        fertilizeDays: 45,
        lastFertilized: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days ago
        repotDays: 365,
        lastRepotted: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Needs little watering. Keep in the bedroom corner.',
        progress: 80
      },
      {
        id: 'monstera',
        name: 'Living Room Monstera',
        emoji: '🌿',
        species: 'Monstera deliciosa',
        wateringDays: 8,
        lastWatered: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago (OVERDUE)
        fertilizeDays: 30,
        lastFertilized: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        repotDays: 365,
        lastRepotted: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Wipe leaves monthly to improve light absorption.',
        progress: 65
      }
    ];

    try {
      const saved = localStorage.getItem('botaniq_care_plants');
      if (saved) return JSON.parse(saved);
      // Save default plants first time
      localStorage.setItem('botaniq_care_plants', JSON.stringify(defaultPlants));
      return defaultPlants;
    } catch (e) {
      return defaultPlants;
    }
  },

  savePlants(plants) {
    localStorage.setItem('botaniq_care_plants', JSON.stringify(plants));
    // Trigger update of dashboard UI if needed
    if (window.Botaniq.Dashboard) {
      localStorage.setItem('botaniq_care_plants_dirty', 'true');
    }
    this.checkNotifications(plants);
  },

  calculateDaysRemaining(lastDateStr, intervalDays) {
    const lastDate = new Date(lastDateStr);
    const dueDate = new Date(lastDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);
    const timeDiff = dueDate.getTime() - Date.now();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  },

  getBadgeClass(daysRemaining) {
    if (daysRemaining <= 0) return 'countdown-badge overdue';
    if (daysRemaining <= 2) return 'countdown-badge due-soon';
    return 'countdown-badge';
  },

  getBadgeText(daysRemaining) {
    if (daysRemaining < 0) return `⚠️ Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''}`;
    if (daysRemaining === 0) return `⏰ Due Today`;
    if (daysRemaining === 1) return `⏳ 1 Day Left`;
    return `🍃 ${daysRemaining} Days Left`;
  },

  render() {
    const plants = this.getPlants();
    
    return `
      <div class="care-planner-container">
        <!-- Overview summary banner -->
        <div class="premium-card care-summary-banner">
          <div class="banner-left">
            <h3>Garden Care Planner 📅</h3>
            <p>Manage watering, fertilizing, and repotting schedules to keep your botanical sanctuary green.</p>
          </div>
          <button class="btn-primary" id="open-add-plant-modal">➕ Add New Plant</button>
        </div>

        <!-- Plants Care Schedule Grid -->
        <div class="care-planner-grid">
          ${plants.length === 0 ? `
            <div class="premium-card" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
              <span style="font-size: 48px; display: block; margin-bottom: 16px;">🪴</span>
              <p>Your garden is currently empty.</p>
              <button class="btn-primary" style="margin-top: 16px;" onclick="window.Botaniq.Router.navigateTo('encyclopedia')">Browse Encyclopedia 📖</button>
            </div>
          ` : plants.map(p => {
            const waterRemaining = this.calculateDaysRemaining(p.lastWatered, p.wateringDays);
            const fertRemaining = this.calculateDaysRemaining(p.lastFertilized, p.fertilizeDays);
            const repotRemaining = this.calculateDaysRemaining(p.lastRepotted, p.repotDays);

            return `
              <div class="care-plant-card" data-plant-id="${p.id}">
                <div style="display: flex; gap: 16px; align-items: center;">
                  <div class="care-plant-emoji">${p.emoji || '🌿'}</div>
                  <div style="flex-grow: 1;">
                    <h4 style="font-size: 16px; margin: 0; color: var(--text-dark);">${p.name}</h4>
                    <span style="font-size: 12px; font-style: italic; color: var(--text-muted);">${p.species || 'Custom Species'}</span>
                  </div>
                  <button class="btn-delete delete-plant-btn" data-plant-id="${p.id}" title="Remove plant" style="background: none; border: none; font-size: 16px; cursor: pointer; color: var(--text-muted);">🗑️</button>
                </div>

                ${p.notes ? `
                  <div class="care-notes" style="font-size: 12px; background: var(--bg-input); padding: 8px 12px; border-radius: var(--radius-sm); color: var(--text-muted); border-left: 3px solid var(--accent-gold);">
                    📝 ${p.notes}
                  </div>
                ` : ''}

                <!-- Reminders Checklist -->
                <div class="care-schedules-list" style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
                  <!-- Water Schedule -->
                  <div class="care-schedule-item" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column;">
                      <span style="font-size: 13px; font-weight: 600;">💧 Watering Schedule</span>
                      <span style="font-size: 11px; color: var(--text-muted);">Every ${p.wateringDays} days</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span class="${this.getBadgeClass(waterRemaining)}">${this.getBadgeText(waterRemaining)}</span>
                      <button class="care-action-btn water-action-btn" data-plant-id="${p.id}">Water 💧</button>
                    </div>
                  </div>

                  <!-- Fertilize Schedule -->
                  <div class="care-schedule-item" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column;">
                      <span style="font-size: 13px; font-weight: 600;">🧪 Fertilizing Schedule</span>
                      <span style="font-size: 11px; color: var(--text-muted);">Every ${p.fertilizeDays} days</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span class="${this.getBadgeClass(fertRemaining)}">${this.getBadgeText(fertRemaining)}</span>
                      <button class="care-action-btn fertilize-action-btn" data-plant-id="${p.id}">Feed 🧪</button>
                    </div>
                  </div>

                  <!-- Repot Schedule -->
                  <div class="care-schedule-item" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column;">
                      <span style="font-size: 13px; font-weight: 600;">🪴 Repotting Schedule</span>
                      <span style="font-size: 11px; color: var(--text-muted);">Every ${p.repotDays} days</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span class="${this.getBadgeClass(repotRemaining)}">${this.getBadgeText(repotRemaining)}</span>
                      <button class="care-action-btn repot-action-btn" data-plant-id="${p.id}">Repot 🪴</button>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Add Custom Plant Modal Overlay -->
        <div id="add-plant-modal-overlay" class="modal-overlay hidden">
          <div class="modal-card" style="max-width: 500px; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-organic); padding-bottom: 12px; margin-bottom: 16px;">
              <h3 style="margin: 0; font-family: var(--font-heading);">Add Custom Plant</h3>
              <button id="close-add-plant-modal" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-muted);">×</button>
            </div>
            
            <form id="add-plant-form" style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; gap: 12px;">
                <div style="width: 80px; display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 12px; font-weight: 600;">Emoji icon</label>
                  <select id="new-plant-emoji" style="font-size: 20px; padding: 8px; text-align: center;">
                    <option>🌿</option><option>🪴</option><option>🌱</option><option>🌵</option>
                    <option>🌳</option><option>🌸</option><option>🍅</option><option>🌶️</option>
                    <option>🍁</option><option>🌴</option><option>🍀</option><option>🌼</option>
                  </select>
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 12px; font-weight: 600;">Custom Plant Name</label>
                  <input type="text" id="new-plant-name" placeholder="e.g., Bedroom Pothos" required>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 12px; font-weight: 600;">Species / Scientific Name (Optional)</label>
                <input type="text" id="new-plant-species" placeholder="e.g., Epipremnum aureum">
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 11px; font-weight: 600;">Water Interval</label>
                  <input type="number" id="new-plant-water" min="1" max="180" value="7" required style="padding: 10px;">
                  <span style="font-size: 10px; color: var(--text-muted); text-align: center;">Days</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 11px; font-weight: 600;">Feed Interval</label>
                  <input type="number" id="new-plant-fertilize" min="1" max="365" value="30" required style="padding: 10px;">
                  <span style="font-size: 10px; color: var(--text-muted); text-align: center;">Days</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 11px; font-weight: 600;">Repot Interval</label>
                  <input type="number" id="new-plant-repot" min="1" max="1000" value="365" required style="padding: 10px;">
                  <span style="font-size: 10px; color: var(--text-muted); text-align: center;">Days</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 12px; font-weight: 600;">Custom Notes</label>
                <textarea id="new-plant-notes" placeholder="Any specific requirements or placement remarks..." rows="2" style="font-size: 13px;"></textarea>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; margin-top: 10px;">💾 Save Plant to Garden</button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Modal controls
    const modal = document.getElementById('add-plant-modal-overlay');
    const openBtn = document.getElementById('open-add-plant-modal');
    const closeBtn = document.getElementById('close-add-plant-modal');
    
    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }

    const closeModal = () => {
      if (modal) modal.classList.add('hidden');
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Add Plant Form submit
    const form = document.getElementById('add-plant-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('new-plant-name').value.trim();
        const species = document.getElementById('new-plant-species').value.trim();
        const emoji = document.getElementById('new-plant-emoji').value;
        const wateringDays = parseInt(document.getElementById('new-plant-water').value) || 7;
        const fertilizeDays = parseInt(document.getElementById('new-plant-fertilize').value) || 30;
        const repotDays = parseInt(document.getElementById('new-plant-repot').value) || 365;
        const notes = document.getElementById('new-plant-notes').value.trim();

        const plants = this.getPlants();
        const newPlant = {
          id: 'custom_' + Date.now(),
          name,
          emoji,
          species,
          wateringDays,
          lastWatered: new Date().toISOString(),
          fertilizeDays,
          lastFertilized: new Date().toISOString(),
          repotDays,
          lastRepotted: new Date().toISOString(),
          notes,
          progress: 20
        };

        plants.push(newPlant);
        this.savePlants(plants);
        
        // Stats increment for custom plant added
        this.incrementStat('plants_added');

        window.Botaniq.XPManager.addXP(15);
        window.Botaniq.Notification.show(`${name} added to your Care Planner!`, 'success');
        
        closeModal();
        window.Botaniq.Router.navigateTo('care');
      });
    }

    // Action handlers (Water, Fertilize, Repot)
    document.querySelectorAll('.water-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.plantId;
        const plants = this.getPlants();
        const p = plants.find(item => item.id === id);
        if (p) {
          p.lastWatered = new Date().toISOString();
          p.progress = Math.min(100, p.progress + 5);
          this.savePlants(plants);
          
          this.playWaterChime();
          this.incrementStat('watering_completed');

          window.Botaniq.XPManager.addXP(5);
          window.Botaniq.Notification.show(`${p.name} watered! 💧 +5 XP`, 'success');
          window.Botaniq.Router.navigateTo('care');
        }
      });
    });

    document.querySelectorAll('.fertilize-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.plantId;
        const plants = this.getPlants();
        const p = plants.find(item => item.id === id);
        if (p) {
          p.lastFertilized = new Date().toISOString();
          p.progress = Math.min(100, p.progress + 8);
          this.savePlants(plants);

          this.playFeedChime();
          this.incrementStat('fertilizing_completed');

          window.Botaniq.XPManager.addXP(8);
          window.Botaniq.Notification.show(`${p.name} fertilized! 🧪 +8 XP`, 'success');
          window.Botaniq.Router.navigateTo('care');
        }
      });
    });

    document.querySelectorAll('.repot-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.plantId;
        const plants = this.getPlants();
        const p = plants.find(item => item.id === id);
        if (p) {
          p.lastRepotted = new Date().toISOString();
          p.progress = Math.min(100, p.progress + 15);
          this.savePlants(plants);

          this.playRepotChime();
          window.Botaniq.XPManager.addXP(15);
          window.Botaniq.Notification.show(`${p.name} repotted! 🪴 +15 XP`, 'success');
          window.Botaniq.Router.navigateTo('care');
        }
      });
    });

    // Delete handlers
    document.querySelectorAll('.delete-plant-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.plantId;
        const plants = this.getPlants();
        const p = plants.find(item => item.id === id);
        
        if (p && confirm(`Are you sure you want to remove ${p.name} from your garden?`)) {
          const filtered = plants.filter(item => item.id !== id);
          this.savePlants(filtered);
          window.Botaniq.Notification.show(`Removed ${p.name} from garden`, 'default');
          window.Botaniq.Router.navigateTo('care');
        }
      });
    });

    // Trigger local push notification request if not yet granted
    this.requestNotificationPermission();
  },

  // Notification Service
  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('[Botaniq] Notifications enabled!');
          window.Botaniq.Notification.show('Care reminder notifications enabled! 🔔', 'success');
          // Run check
          this.checkNotifications(this.getPlants());
        }
      });
    }
  },

  checkNotifications(plants) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (!window.Botaniq.State.settings.notifications) return;

    // Filter plants that are overdue today
    plants.forEach(p => {
      const waterRemaining = this.calculateDaysRemaining(p.lastWatered, p.wateringDays);
      if (waterRemaining <= 0) {
        // Push notification via registration
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(`${p.emoji || '🌿'} ${p.name} needs water!`, {
              body: `Watering is overdue by ${Math.abs(waterRemaining)} day(s). Keep it healthy!`,
              icon: 'icon.svg',
              vibrate: [200, 100, 200],
              tag: `water-reminder-${p.id}`,
              renotify: true
            });
          });
        }
      }
    });
  },

  // Audio Synthesis for actions
  playWaterChime() {
    const ac = window.Botaniq.AudioEngine.audioCtx;
    if (!ac || ac.state === 'suspended') return;
    
    // Water bubble pop synthesis
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    osc.stop(now + 0.15);
  },

  playFeedChime() {
    const ac = window.Botaniq.AudioEngine.audioCtx;
    if (!ac || ac.state === 'suspended') return;

    // Sparkly chime synthesis
    const now = ac.currentTime;
    const notes = [600, 800, 1000, 1200];
    notes.forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0.04, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.1);
      
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.1);
    });
  },

  playRepotChime() {
    const ac = window.Botaniq.AudioEngine.audioCtx;
    if (!ac || ac.state === 'suspended') return;

    // Cozy slide synthesis
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.linearRampToValueAtTime(450, now + 0.25);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    osc.stop(now + 0.25);
  },

  incrementStat(key) {
    try {
      const stats = JSON.parse(localStorage.getItem('botaniq_stats') || '{}');
      stats[key] = (stats[key] || 0) + 1;
      localStorage.setItem('botaniq_stats', JSON.stringify(stats));
      if (window.Botaniq.Achievements) {
        window.Botaniq.Achievements.checkUnlocks();
      }
    } catch(e) {}
  }
};

// Care Planner grid layout styles
const carePlannerStyles = document.createElement('style');
carePlannerStyles.innerHTML = `
  .care-planner-container { display: flex; flex-direction: column; gap: 24px; }
  .care-summary-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, rgba(139,168,136,0.1), rgba(200,169,126,0.15)) !important;
    flex-wrap: wrap;
    gap: 16px;
  }
  .care-planner-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }
  .care-schedule-item {
    background: var(--bg-card);
    border: 1px solid var(--border-organic);
    padding: 10px 14px;
    border-radius: var(--radius-sm);
  }
  @media (max-width: 480px) {
    .care-planner-grid { grid-template-columns: 1fr; }
    .care-schedule-item { flex-direction: column; align-items: flex-start !important; gap: 10px; }
    .care-schedule-item > div:last-child { width: 100%; justify-content: space-between; display: flex; }
  }
`;
document.head.appendChild(carePlannerStyles);
