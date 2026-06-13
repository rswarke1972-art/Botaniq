/**
 * BOTANIQ - Core Application Controller & State Orchestrator
 */

// Global Application Namespace
window.Botaniq = {
  // Global Application State
  State: {
    activeScreen: 'dashboard',
    streak: 21,
    lastActiveDate: '',
    xp: 150,
    rank: 'Leaf Explorer',
    activeSeason: 'Summer', // Summer, Winter, Monsoon
    settings: {
      darkMode: false,
      animations: true,
      ambientActive: false,
      ambientSound: 'zen_garden', // zen_garden, stream, birds, breeze
      reducedMotion: false,
      notifications: true
    }
  },

  // Audio Synthesis Engine
  AudioEngine: {
    audioCtx: null,
    isPlaying: false,
    nodes: [],
    
    init() {
      if (this.audioCtx) return;
      // Initialize Audio Context safely
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    },

    start() {
      this.init();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      this.stop(); // Stop any current
      
      const soundType = window.Botaniq.State.settings.ambientSound;
      if (soundType === 'breeze') {
        this.playBreeze();
      } else if (soundType === 'stream') {
        this.playStream();
      } else if (soundType === 'birds') {
        this.playBirds();
      } else {
        this.playZenGarden();
      }
      
      this.isPlaying = true;
      document.getElementById('ambient-bar').classList.remove('hidden');
    },

    stop() {
      this.nodes.forEach(node => {
        try { node.stop(); } catch(e) {}
        try { node.disconnect(); } catch(e) {}
      });
      this.nodes = [];
      this.isPlaying = false;
      document.getElementById('ambient-bar').classList.add('hidden');
    },

    // 1. Synthesize Cozy Wind/Breeze (Pink/White noise with moving filters)
    playBreeze() {
      const bufferSize = 2 * this.audioCtx.sampleRate;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      // Generate white noise
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to shape wind sound
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 3.0;
      
      const gainNode = this.audioCtx.createGain();
      gainNode.gain.value = 0.15;

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      
      whiteNoise.start();
      this.nodes.push(whiteNoise);

      // Animate wind frequency
      const sweepWind = () => {
        if (!this.isPlaying) return;
        const now = this.audioCtx.currentTime;
        const targetFreq = 400 + Math.random() * 600;
        const sweepTime = 3 + Math.random() * 4;
        filter.frequency.exponentialRampToValueAtTime(targetFreq, now + sweepTime);
        setTimeout(sweepWind, sweepTime * 1000);
      };
      sweepWind();
    },

    // 2. Synthesize Flowing Water Stream
    playStream() {
      // Noise buffer for bubbling water
      const bufferSize = 2 * this.audioCtx.sampleRate;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const lowpass = this.audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 350;

      const gain = this.audioCtx.createGain();
      gain.gain.value = 0.25;

      whiteNoise.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(this.audioCtx.destination);
      whiteNoise.start();
      this.nodes.push(whiteNoise);

      // Bubbling pops
      const playBubble = () => {
        if (!this.isPlaying) return;
        const osc = this.audioCtx.createOscillator();
        const popGain = this.audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 1200, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.1);
        
        popGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
        
        osc.connect(popGain);
        popGain.connect(this.audioCtx.destination);
        
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.1);
        
        setTimeout(playBubble, 100 + Math.random() * 300);
      };
      playBubble();
    },

    // 3. Synthesize Bird Chirps
    playBirds() {
      const chirp = () => {
        if (!this.isPlaying) return;
        
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const chirpGain = this.audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(3000, now);
        // Chirp frequency sweep upward then down
        osc.frequency.exponentialRampToValueAtTime(4500, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(2500, now + 0.15);
        
        chirpGain.gain.setValueAtTime(0.02, now);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        
        osc.connect(chirpGain);
        chirpGain.connect(this.audioCtx.destination);
        
        osc.start();
        osc.stop(now + 0.16);
        
        setTimeout(chirp, 1000 + Math.random() * 2500);
      };
      chirp();
    },

    // 4. Combined Zen Garden ambient sound (Wind + Bird)
    playZenGarden() {
      this.playBreeze();
      // Add a slight bird chirping offset
      setTimeout(() => {
        this.playBirds();
      }, 500);
    }
  },

  // Drifting Leaves System
  LeafEffects: {
    container: null,
    active: true,
    leafEmojis: ['🍃', '🌿', '🍂', '🍁', '🌱', '🌸'],

    init() {
      this.container = document.getElementById('leaves-container');
      if (!this.container) return;
      
      // Start spawning leaves
      setInterval(() => {
        if (this.active && window.Botaniq.State.settings.animations) {
          this.spawnLeaf();
        }
      }, 3000);
    },

    spawnLeaf() {
      const leaf = document.createElement('div');
      leaf.className = 'drifting-leaf';
      leaf.innerText = this.leafEmojis[Math.floor(Math.random() * this.leafEmojis.length)];
      
      const leftStart = Math.random() * window.innerWidth;
      const scale = 0.6 + Math.random() * 1.0;
      const duration = 10 + Math.random() * 8;
      
      leaf.style.left = `${leftStart}px`;
      leaf.style.transform = `scale(${scale})`;
      leaf.style.animationDuration = `${duration}s`;
      
      this.container.appendChild(leaf);
      
      // Remove leaf after animation completes
      setTimeout(() => {
        leaf.remove();
      }, duration * 1000);
    }
  },

  // Notification Toast Engine
  Notification: {
    container: null,

    show(message, type = 'default') {
      if (!this.container) {
        this.container = document.getElementById('notification-container');
      }
      
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      let emoji = '🔔';
      if (type === 'success') emoji = '✨';
      if (type === 'achievement') emoji = '🏅';
      if (type === 'warning') emoji = '⚠️';
      
      toast.innerHTML = `<span>${emoji}</span> <p>${message}</p>`;
      this.container.appendChild(toast);
      
      // Dismiss after 4 seconds
      setTimeout(() => {
        toast.style.animation = 'toast-out 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => toast.remove(), 400);
      }, 4000);
    }
  },

  // Global XP & Level System
  XPManager: {
    addXP(amount) {
      window.Botaniq.State.xp += amount;
      const oldRank = window.Botaniq.State.rank;
      
      // Calculate rank
      let newRank = 'Seedling 🌱';
      if (window.Botaniq.State.xp >= 1000) {
        newRank = 'Nature Master 🌳';
      } else if (window.Botaniq.State.xp >= 600) {
        newRank = 'Botany Scholar 📚';
      } else if (window.Botaniq.State.xp >= 300) {
        newRank = 'Garden Keeper 🌸';
      } else if (window.Botaniq.State.xp >= 100) {
        newRank = 'Leaf Explorer 🍃';
      }
      
      window.Botaniq.State.rank = newRank;
      
      // Update sidebar
      document.getElementById('sidebar-rank-name').innerText = newRank.split(' ')[0];
      document.getElementById('sidebar-rank-icon').innerText = newRank.split(' ')[1] || '🌱';
      
      // Persist state
      window.Botaniq.saveState();
      
      if (newRank !== oldRank) {
        // Trigger rank promotion notification!
        window.Botaniq.Notification.show(`PROMOTED! You are now a ${newRank}!`, 'achievement');
        // If achievements is loaded, trigger unlock effect
        if (window.Botaniq.Achievements && window.Botaniq.Achievements.triggerConfetti) {
          window.Botaniq.Achievements.triggerConfetti();
        }
      } else {
        window.Botaniq.Notification.show(`+${amount} XP Earned!`, 'success');
      }
    }
  },

  // Persistency Manager
  saveState() {
    localStorage.setItem('botaniq_user_state', JSON.stringify(this.State));
  },

  loadState() {
    const saved = localStorage.getItem('botaniq_user_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.State = { ...this.State, ...parsed };
      } catch(e) {
        console.error("Could not parse saved user state", e);
      }
    }
    
    // Load state defaults to sidebar profile
    document.getElementById('sidebar-streak').innerText = `${this.State.streak} Days`;
    const rankEmoji = this.State.rank.includes('🌱') ? '🌱' : 
                      this.State.rank.includes('🍃') ? '🍃' : 
                      this.State.rank.includes('🌸') ? '🌸' : 
                      this.State.rank.includes('📚') ? '📚' : '🌳';
    document.getElementById('sidebar-rank-icon').innerText = rankEmoji;
    document.getElementById('sidebar-rank-name').innerText = this.State.rank.split(' ')[0];
    
    // Apply Active Season indicator
    this.updateSeasonIndicator();
    
    // Apply Settings
    if (this.State.settings.darkMode) {
      document.body.classList.add('dark-theme');
    }
  },

  // Router Engine (Dynamic view injection)
  Router: {
    activeView: null,

    navigateTo(screenId) {
      window.Botaniq.State.activeScreen = screenId;
      window.Botaniq.saveState();

      // Update Navigation elements selection
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenId);
      });
      document.querySelectorAll('.bottom-nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenId);
      });

      // Update Screen Header Title
      const screenTitleElement = document.getElementById('current-screen-title');
      const screenTitles = {
        dashboard: 'Botanical Sanctuary',
        encyclopedia: 'Ecosystem Encyclopedia',
        learning: 'Botany Pathways',
        bonsai: 'Bonsai Academy',
        diagnosis: 'Plant Diagnosis Wizard',
        care: 'Daily Care Planner',
        journal: 'Cozy Growth Scrapbook',
        ecosystems: 'Climate & Biomes Map',
        science: 'Interactive Science Lab',
        achievements: 'Garden Achievements',
        settings: 'Sanctuary Settings'
      };
      
      screenTitleElement.innerText = screenTitles[screenId] || 'Botaniq';

      // Load screen viewport dynamically
      const viewport = document.getElementById('view-viewport');
      viewport.className = `view-section screen-${screenId}`;
      
      // Switch rendering callback based on module exports
      let renderHtml = '';
      
      if (screenId === 'dashboard' && window.Botaniq.Dashboard) {
        renderHtml = window.Botaniq.Dashboard.render();
      } else if (screenId === 'encyclopedia' && window.Botaniq.Encyclopedia) {
        renderHtml = window.Botaniq.Encyclopedia.render();
      } else if (screenId === 'learning' && window.Botaniq.Learning) {
        renderHtml = window.Botaniq.Learning.render();
      } else if (screenId === 'bonsai' && window.Botaniq.Bonsai) {
        renderHtml = window.Botaniq.Bonsai.render();
      } else if (screenId === 'diagnosis' && window.Botaniq.Diagnosis) {
        renderHtml = window.Botaniq.Diagnosis.render();
      } else if (screenId === 'care' && window.Botaniq.Care) {
        renderHtml = window.Botaniq.Care.render();
      } else if (screenId === 'journal' && window.Botaniq.Journal) {
        renderHtml = window.Botaniq.Journal.render();
      } else if (screenId === 'ecosystems' && window.Botaniq.Ecosystems) {
        renderHtml = window.Botaniq.Ecosystems.render();
      } else if (screenId === 'science' && window.Botaniq.Science) {
        renderHtml = window.Botaniq.Science.render();
      } else if (screenId === 'achievements' && window.Botaniq.Achievements) {
        renderHtml = window.Botaniq.Achievements.render();
      } else if (screenId === 'settings' && window.Botaniq.Settings) {
        renderHtml = window.Botaniq.Settings.render();
      } else {
        renderHtml = `
          <div class="premium-card">
            <h3>Module Loading</h3>
            <p>Gathering fresh botanical wisdom for <strong>${screenId}</strong>...</p>
          </div>
        `;
      }

      viewport.innerHTML = renderHtml;
      
      // Call post-render setups if defined
      setTimeout(() => {
        if (screenId === 'dashboard' && window.Botaniq.Dashboard) window.Botaniq.Dashboard.init();
        if (screenId === 'encyclopedia' && window.Botaniq.Encyclopedia) window.Botaniq.Encyclopedia.init();
        if (screenId === 'learning' && window.Botaniq.Learning) window.Botaniq.Learning.init();
        if (screenId === 'bonsai' && window.Botaniq.Bonsai) window.Botaniq.Bonsai.init();
        if (screenId === 'diagnosis' && window.Botaniq.Diagnosis) window.Botaniq.Diagnosis.init();
        if (screenId === 'care' && window.Botaniq.Care) window.Botaniq.Care.init();
        if (screenId === 'journal' && window.Botaniq.Journal) window.Botaniq.Journal.init();
        if (screenId === 'ecosystems' && window.Botaniq.Ecosystems) window.Botaniq.Ecosystems.init();
        if (screenId === 'science' && window.Botaniq.Science) window.Botaniq.Science.init();
        if (screenId === 'achievements' && window.Botaniq.Achievements) window.Botaniq.Achievements.init();
        if (screenId === 'settings' && window.Botaniq.Settings) window.Botaniq.Settings.init();
      }, 50);

      // Close mobile drawer menu
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('active');
    }
  },

  // Toggle active seasonal care mode
  toggleSeason() {
    const seasons = ['Summer', 'Winter', 'Monsoon'];
    let idx = seasons.indexOf(this.State.activeSeason);
    idx = (idx + 1) % seasons.length;
    this.State.activeSeason = seasons[idx];
    this.saveState();
    this.updateSeasonIndicator();
    this.Notification.show(`Season switched to ${this.State.activeSeason}! Care rules updated.`, 'success');
    
    // Rerender active viewport if it's the dashboard, encyclopedia, or planner
    if (['dashboard', 'encyclopedia', 'care'].includes(this.State.activeScreen)) {
      this.Router.navigateTo(this.State.activeScreen);
    }
  },

  updateSeasonIndicator() {
    const el = document.getElementById('season-indicator');
    if (!el) return;
    const emojiMap = { Summer: '☀️', Winter: '❄️', Monsoon: '🌧️' };
    el.querySelector('.season-emoji').innerText = emojiMap[this.State.activeSeason];
    el.querySelector('.season-label').innerText = this.State.activeSeason;
  },

  // Setup Event Listeners
  initEventListeners() {
    // Nav Navigation item clicks
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        this.Router.navigateTo(btn.dataset.screen);
      });
    });

    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        this.Router.navigateTo(btn.dataset.screen);
      });
    });

    // Mobile menu toggle with backdrop sync
    const mobBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (mobBtn && sidebar && backdrop) {
      const toggleMenu = () => {
        sidebar.classList.toggle('active');
        backdrop.classList.toggle('active');
      };
      mobBtn.addEventListener('click', toggleMenu);
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
      });
    }

    // Mute button handler
    const muteBtn = document.getElementById('quick-mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        this.State.settings.ambientActive = false;
        this.AudioEngine.stop();
        this.saveState();
      });
    }

    // Season Indicator clicks
    const seasonBtn = document.getElementById('season-indicator');
    if (seasonBtn) {
      seasonBtn.addEventListener('click', () => this.toggleSeason());
    }

    // Safe Web Audio activation on first click
    const resumeAudio = () => {
      this.AudioEngine.init();
      if (this.AudioEngine.audioCtx && this.AudioEngine.audioCtx.state === 'suspended') {
        this.AudioEngine.audioCtx.resume();
      }
      // If ambient was active in state, start it
      if (this.State.settings.ambientActive && !this.AudioEngine.isPlaying) {
        this.AudioEngine.start();
      }
      document.removeEventListener('click', resumeAudio);
      document.removeEventListener('touchstart', resumeAudio);
    };
    document.addEventListener('click', resumeAudio);
    document.addEventListener('touchstart', resumeAudio);
  },

  // Core App Entry
  init() {
    console.log("Initializing Botaniq 🌿");
    this.loadState();
    this.LeafEffects.init();
    this.initEventListeners();
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('[Service Worker] Registered with scope:', reg.scope))
          .catch((err) => console.error('[Service Worker] Registration failed:', err));
      });
    }

    // Monitor Online/Offline state
    const updateOfflineStatus = () => {
      const indicator = document.getElementById('offline-indicator');
      if (indicator) {
        if (navigator.onLine) {
          indicator.classList.add('hidden');
        } else {
          indicator.classList.remove('hidden');
        }
      }
    };
    window.addEventListener('online', updateOfflineStatus);
    window.addEventListener('offline', updateOfflineStatus);
    updateOfflineStatus(); // Initial check

    // Navigate to default screen
    this.Router.navigateTo(this.State.activeScreen);
  }
};

// Start application when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.Botaniq.init();
});
