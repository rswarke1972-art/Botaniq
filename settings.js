/**
 * BOTANIQ - Settings Module
 * Application preferences and configuration
 */
window.Botaniq.Settings = {
  render() {
    const settings = window.Botaniq.State.settings;
    return `
      <div class="settings-container">
        <div class="premium-card">
          <h3>⚙️ Settings</h3>
          <p style="color:var(--text-muted);margin-bottom:20px;">Customize your Botaniq experience.</p>
          
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">🌙 Dark Mode</span>
                <span class="setting-desc">Switch between light and dark themes</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="dark-mode-toggle" ${settings.darkMode ? 'checked' : ''}>
                <span class="slider round"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">✨ Animations</span>
                <span class="setting-desc">Enable smooth UI transitions</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="animations-toggle" ${settings.animations ? 'checked' : ''}>
                <span class="slider round"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">🔔 Notifications</span>
                <span class="setting-desc">Show achievement and task notifications</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="notifications-toggle" ${settings.notifications ? 'checked' : ''}>
                <span class="slider round"></span>
              </label>
            </div>

            <!-- Ambient Sound Therapy Selector -->
            <div class="setting-item" style="flex-direction:column;align-items:flex-start;gap:12px;border-top:1px solid var(--border-organic);padding-top:20px;margin-top:10px;">
              <div class="setting-info">
                <span class="setting-label">🎵 Ambient Sanctuary Sounds</span>
                <span class="setting-desc">Select soothing background sounds</span>
              </div>
              <div class="sound-selector-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;width:100%;">
                <button class="sound-card ${settings.ambientSound === 'zen_garden' ? 'active' : ''}" data-sound="zen_garden" style="background:var(--bg-input);border:1px solid var(--border-organic);padding:10px;border-radius:var(--radius-md);cursor:pointer;font-family:var(--font-body);font-size:13px;font-weight:600;transition:var(--transition-fast);">🎋 Zen Garden</button>
                <button class="sound-card ${settings.ambientSound === 'stream' ? 'active' : ''}" data-sound="stream" style="background:var(--bg-input);border:1px solid var(--border-organic);padding:10px;border-radius:var(--radius-md);cursor:pointer;font-family:var(--font-body);font-size:13px;font-weight:600;transition:var(--transition-fast);">💧 Water Stream</button>
                <button class="sound-card ${settings.ambientSound === 'birds' ? 'active' : ''}" data-sound="birds" style="background:var(--bg-input);border:1px solid var(--border-organic);padding:10px;border-radius:var(--radius-md);cursor:pointer;font-family:var(--font-body);font-size:13px;font-weight:600;transition:var(--transition-fast);">🐦 Forest Birds</button>
                <button class="sound-card ${settings.ambientSound === 'breeze' ? 'active' : ''}" data-sound="breeze" style="background:var(--bg-input);border:1px solid var(--border-organic);padding:10px;border-radius:var(--radius-md);cursor:pointer;font-family:var(--font-body);font-size:13px;font-weight:600;transition:var(--transition-fast);">🌬️ Gentle Breeze</button>
              </div>
              <div style="display:flex;justify-content:space-between;width:100%;align-items:center;margin-top:10px;">
                <span class="setting-desc" style="font-weight:600;font-size:13px;">Play Sound in Background</span>
                <label class="switch">
                  <input type="checkbox" id="ambient-toggle" ${settings.ambientActive ? 'checked' : ''}>
                  <span class="slider round"></span>
                </label>
              </div>
            </div>

            <!-- Backup & Sync -->
            <div class="setting-item" style="flex-direction:column;align-items:flex-start;gap:12px;border-top:1px solid var(--border-organic);padding-top:20px;margin-top:10px;">
              <div class="setting-info">
                <span class="setting-label">💾 Backup & Sync</span>
                <span class="setting-desc">Export or restore your botanical sanctuary data</span>
              </div>
              <div style="display:flex;gap:10px;width:100%;">
                <button class="btn-secondary" id="export-backup-btn" style="flex-grow:1;font-size:13px;padding:10px;">📤 Export Data</button>
                <button class="btn-secondary" id="import-backup-btn" style="flex-grow:1;font-size:13px;padding:10px;">📥 Import Backup</button>
              </div>
              <input type="file" id="backup-file-input" accept=".json" style="display:none;">
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Dark mode toggle
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
      darkToggle.addEventListener('change', (e) => {
        window.Botaniq.State.settings.darkMode = e.target.checked;
        document.body.classList.toggle('dark-theme', e.target.checked);
        window.Botaniq.saveState();
      });
    }

    // Animations toggle
    const animToggle = document.getElementById('animations-toggle');
    if (animToggle) {
      animToggle.addEventListener('change', (e) => {
        window.Botaniq.State.settings.animations = e.target.checked;
        window.Botaniq.saveState();
      });
    }

    // Notifications toggle
    const notifToggle = document.getElementById('notifications-toggle');
    if (notifToggle) {
      notifToggle.addEventListener('change', (e) => {
        window.Botaniq.State.settings.notifications = e.target.checked;
        window.Botaniq.saveState();
      });
    }

    // Ambient Sound active toggle
    const ambToggle = document.getElementById('ambient-toggle');
    if (ambToggle) {
      ambToggle.addEventListener('change', (e) => {
        window.Botaniq.State.settings.ambientActive = e.target.checked;
        window.Botaniq.saveState();
        if (e.target.checked) {
          window.Botaniq.AudioEngine.start();
        } else {
          window.Botaniq.AudioEngine.stop();
        }
      });
    }

    // Ambient Sound card selector
    document.querySelectorAll('.sound-card').forEach(card => {
      card.addEventListener('click', () => {
        const sound = card.dataset.sound;
        window.Botaniq.State.settings.ambientSound = sound;
        window.Botaniq.saveState();
        
        // Update styling
        document.querySelectorAll('.sound-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Restart audio if already playing
        if (window.Botaniq.State.settings.ambientActive) {
          window.Botaniq.AudioEngine.start();
        }
      });
    });

    // Backup Export
    const exportBtn = document.getElementById('export-backup-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = {
          user_state: window.Botaniq.State,
          care_plants: JSON.parse(localStorage.getItem('botaniq_care_plants') || '[]'),
          journal_entries: JSON.parse(localStorage.getItem('botaniq_journal_entries') || '[]'),
          unlocked_achievements: JSON.parse(localStorage.getItem('botaniq_unlocked_achievements') || '[]'),
          stats: JSON.parse(localStorage.getItem('botaniq_stats') || '{}')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `botaniq_backup_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        window.Botaniq.Notification.show('Sanctuary data backup exported! 📤', 'success');
      });
    }

    // Backup Import
    const importBtn = document.getElementById('import-backup-btn');
    const fileInput = document.getElementById('backup-file-input');
    if (importBtn && fileInput) {
      importBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.user_state) {
              localStorage.setItem('botaniq_user_state', JSON.stringify(data.user_state));
              localStorage.setItem('botaniq_care_plants', JSON.stringify(data.care_plants || []));
              localStorage.setItem('botaniq_journal_entries', JSON.stringify(data.journal_entries || []));
              localStorage.setItem('botaniq_unlocked_achievements', JSON.stringify(data.unlocked_achievements || []));
              localStorage.setItem('botaniq_stats', JSON.stringify(data.stats || {}));
              
              window.Botaniq.Notification.show('Sanctuary backup restored successfully! Reloading...', 'success');
              setTimeout(() => location.reload(), 1500);
            } else {
              window.Botaniq.Notification.show('Invalid backup file structure', 'error');
            }
          } catch(err) {
            window.Botaniq.Notification.show('Error parsing backup file', 'error');
          }
        };
        reader.readAsText(file);
      });
    }
  }
};
