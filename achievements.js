/**
 * BOTANIQ - Achievements System
 * Track and unlock botanical milestones with dynamic statistics and visual effects
 */
window.Botaniq.Achievements = {
  achievements: [
    { id: 'first_plant', name: 'First Seed 🌱', emoji: '🌱', description: 'Add your first plant to care plan', unlocked: false },
    { id: 'diagnosis_pro', name: 'Plant Doctor 🩺', emoji: '🩺', description: 'Complete 5 plant diagnoses', unlocked: false },
    { id: 'bonsai_master', name: 'Bonsai Master 🌳', emoji: '🌳', description: 'Perform 100 branches pruned in Bonsai Academy', unlocked: false },
    { id: 'botany_scholar', name: 'Botany Scholar 📚', emoji: '📚', description: 'Complete all 5 learning pathways', unlocked: false },
    { id: 'journal_keeper', name: 'Journal Keeper 📸', emoji: '📸', description: 'Create 10 growth journal entries', unlocked: false }
  ],

  render() {
    // Load unlocked states from database
    const unlockedList = this.getUnlockedFromStorage();
    this.achievements.forEach(ach => {
      ach.unlocked = unlockedList.includes(ach.id);
    });

    return `
      <div class="achievements-container">
        <div class="premium-card" style="background: linear-gradient(135deg, rgba(200, 169, 126, 0.1), rgba(139, 168, 136, 0.1)) !important;">
          <h3>🏅 Garden Achievements</h3>
          <p style="color:var(--text-muted);margin-bottom:20px;">Unlock milestones as you grow your botanical sanctuary.</p>
          <div class="achievements-grid">
            ${this.achievements.map(ach => `
              <div class="achievement-badge ${ach.unlocked ? 'unlocked' : 'locked'}">
                ${ach.unlocked ? '<span class="badge-unlocked-star">🌟</span>' : ''}
                <span class="badge-emoji">${ach.emoji}</span>
                <div class="badge-name">${ach.name}</div>
                <div class="badge-desc">${ach.description}</div>
                <div style="font-size: 11px; margin-top: 8px; font-weight: 700; color: ${ach.unlocked ? 'var(--primary-forest)' : 'var(--text-muted)'}">
                  ${ach.unlocked ? '✅ Unlocked (+50 XP)' : '🔒 Locked'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  getUnlockedFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('botaniq_unlocked_achievements')) || [];
    } catch (e) {
      return [];
    }
  },

  init() {
    this.checkUnlocks();
  },

  checkUnlocks() {
    const unlockedList = this.getUnlockedFromStorage();
    let newlyUnlocked = false;

    this.achievements.forEach(ach => {
      if (unlockedList.includes(ach.id)) {
        ach.unlocked = true;
        return;
      }

      let conditionMet = false;
      const stats = JSON.parse(localStorage.getItem('botaniq_stats') || '{}');

      if (ach.id === 'first_plant') {
        const plants = JSON.parse(localStorage.getItem('botaniq_care_plants') || '[]');
        if (plants.length >= 1) conditionMet = true;
      }
      
      if (ach.id === 'diagnosis_pro') {
        const diagnoses = stats.diagnoses_completed || 0;
        if (diagnoses >= 5) conditionMet = true;
      }

      if (ach.id === 'bonsai_master') {
        const prunes = stats.bonsai_prunes || 0;
        if (prunes >= 100) conditionMet = true;
      }

      if (ach.id === 'botany_scholar') {
        if (window.Botaniq.Learning && window.Botaniq.Learning.userProgress) {
          const finished = Object.values(window.Botaniq.Learning.userProgress).filter(v => v).length;
          if (finished >= 5) conditionMet = true;
        }
      }

      if (ach.id === 'journal_keeper') {
        const entries = JSON.parse(localStorage.getItem('botaniq_journal_entries') || '[]');
        if (entries.length >= 10) conditionMet = true;
      }

      if (conditionMet) {
        ach.unlocked = true;
        unlockedList.push(ach.id);
        newlyUnlocked = true;
        localStorage.setItem('botaniq_unlocked_achievements', JSON.stringify(unlockedList));
        
        // Award XP and notify
        window.Botaniq.XPManager.addXP(50); // major milestone
        window.Botaniq.Notification.show(`UNLOCKED: ${ach.emoji} ${ach.name}! +50 XP 🏅`, 'achievement');
        this.triggerConfetti();
      }
    });

    return newlyUnlocked;
  },

  // Falling botanical leaf confetti cascade
  triggerConfetti() {
    const leafEmojis = ['🍃', '🌿', '🍂', '🍁', '🌱', '🌸', '✨'];
    const container = document.body;

    for (let i = 0; i < 40; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'confetti-leaf';
      leaf.innerText = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      
      const leftStart = Math.random() * window.innerWidth;
      const duration = 2 + Math.random() * 3;
      const size = 16 + Math.random() * 16;
      
      leaf.style.left = `${leftStart}px`;
      leaf.style.fontSize = `${size}px`;
      leaf.style.animationDuration = `${duration}s`;
      leaf.style.animationDelay = `${Math.random() * 0.5}s`;
      
      container.appendChild(leaf);
      
      // Clear DOM after completion
      setTimeout(() => {
        leaf.remove();
      }, (duration + 1) * 1000);
    }
  }
};
