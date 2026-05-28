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
  }
};
