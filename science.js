/**
 * BOTANIQ - Interactive Plant Science Lab (Very Premium Canvas & SVG Simulators)
 * Extended with Phototropism, Germination, and Nutrient Deficiency
 */

window.Botaniq.Science = {
  activeTab: 'photosynthesis', // photosynthesis, xylem, pollination, growth, phototropism, germination, deficiency
  animationFrameId: null,

  render() {
    let html = `
      <div class="science-container">
        <!-- Simulator Navigation Panel -->
        <div class="science-tabs" style="display:flex; gap:8px; overflow-x:auto; padding-bottom:8px;">
          <button class="science-tab-btn ${this.activeTab === 'photosynthesis' ? 'active' : ''}" data-tab="photosynthesis">
            🧪 Photosynthesis Reactor
          </button>
          <button class="science-tab-btn ${this.activeTab === 'xylem' ? 'active' : ''}" data-tab="xylem">
            💧 Water Transport
          </button>
          <button class="science-tab-btn ${this.activeTab === 'pollination' ? 'active' : ''}" data-tab="pollination">
            🐝 Pollination Matcher
          </button>
          <button class="science-tab-btn ${this.activeTab === 'growth' ? 'active' : ''}" data-tab="growth">
            🌱 Procedural Growth
          </button>
          <button class="science-tab-btn ${this.activeTab === 'phototropism' ? 'active' : ''}" data-tab="phototropism">
            🌞 Phototropism Lab
          </button>
          <button class="science-tab-btn ${this.activeTab === 'germination' ? 'active' : ''}" data-tab="germination">
            🌰 Seed Germination
          </button>
          <button class="science-tab-btn ${this.activeTab === 'deficiency' ? 'active' : ''}" data-tab="deficiency">
            🍂 Nutrient Deficiency
          </button>
        </div>

        <!-- Dynamic Simulation Frame -->
        <div class="premium-card simulation-card">
          <div id="sim-viewport">
            <!-- Canvas viewport rendered by JS -->
          </div>
        </div>
      </div>
    `;
    return html;
  },

  // Switch simulators and manage frame loop cancellations
  switchTab(tabId) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.activeTab = tabId;
    window.Botaniq.Router.navigateTo('science');
  },

  init() {
    // Tabs click actions
    document.querySelectorAll('.science-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    const viewport = document.getElementById('sim-viewport');
    
    if (this.activeTab === 'photosynthesis') {
      this.initPhotosynthesis(viewport);
    } else if (this.activeTab === 'xylem') {
      this.initXylem(viewport);
    } else if (this.activeTab === 'pollination') {
      this.initPollination(viewport);
    } else if (this.activeTab === 'growth') {
      this.initGrowth(viewport);
    } else if (this.activeTab === 'phototropism') {
      this.initPhototropism(viewport);
    } else if (this.activeTab === 'germination') {
      this.initGermination(viewport);
    } else if (this.activeTab === 'deficiency') {
      this.initDeficiency(viewport);
    }

    // Attach orientation resize auto-scaler
    window.addEventListener('resize', this.handleResizeScale);
  },

  handleResizeScale() {
    const canvas = document.querySelector('.science-canvas');
    if (canvas) {
      const parentWidth = canvas.parentElement.clientWidth;
      if (parentWidth < 550) {
        canvas.width = parentWidth;
        canvas.height = parentWidth * 0.65;
      }
    }
  },

  /* ==========================================================================
     1. PHOTOSYNTHESIS INTERACTIVE PARTICLE SIMULATOR
     ========================================================================== */
  initPhotosynthesis(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>Photosynthesis Particle Synthesizer</h4>
        <p>Inject raw inputs to watch Chloroplast cells combine molecules using Sunlight photons!</p>
      </div>
      <div class="photosynthesis-layout">
        <canvas id="photo-canvas" width="550" height="350" class="science-canvas"></canvas>
        <div class="control-panel">
          <button class="btn-primary input-inject-btn" data-inject="h2o">💧 Inject Water (H₂O)</button>
          <button class="btn-primary input-inject-btn" data-inject="co2">💨 Inject Carbon (CO₂)</button>
          <button class="btn-primary input-inject-btn" data-inject="sun">☀️ Shine Sunlight</button>
          
          <div class="formula-dashboard">
            <div class="formula-title">Synthesized Output:</div>
            <div class="yield-counters">
              <div class="counter-box">🍎 Glucose: <span id="glucose-count">0</span></div>
              <div class="counter-box">💨 Oxygen (O₂): <span id="oxygen-count">0</span></div>
            </div>
            <div class="equation-box">
              6CO₂ + 6H₂O + light ➜ C₆H₁₂O₆ + 6O₂
            </div>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('photo-canvas');
    const ctx = canvas.getContext('2d');
    this.handleResizeScale();

    class Molecule {
      constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // h2o, co2, photon
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.r = type === 'photon' ? 5 : 8;
        this.color = type === 'h2o' ? '#6895D2' : type === 'co2' ? '#A1A8B8' : '#F2C85D';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 15 || this.x > canvas.width - 15) this.vx *= -1;
        if (this.y < 15 || this.y > canvas.height - 15) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.type === 'photon' ? 12 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.font = '7px Outfit';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const txt = this.type === 'h2o' ? 'H₂O' : this.type === 'co2' ? 'CO₂' : 'hν';
        ctx.fillText(txt, this.x, this.y);
      }
    }

    let particles = [];
    let glucoseYield = 0;
    let oxygenYield = 0;

    document.querySelectorAll('.input-inject-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.inject;
        for (let i = 0; i < 6; i++) {
          particles.push(new Molecule(
            20 + Math.random() * (canvas.width - 40),
            20 + Math.random() * (canvas.height - 40),
            type
          ));
        }
        window.Botaniq.AudioEngine.init();
        if (window.Botaniq.AudioEngine.audioCtx) {
          const osc = window.Botaniq.AudioEngine.audioCtx.createOscillator();
          const gain = window.Botaniq.AudioEngine.audioCtx.createGain();
          osc.frequency.setValueAtTime(600 + Math.random() * 200, window.Botaniq.AudioEngine.audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1200, window.Botaniq.AudioEngine.audioCtx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.01, window.Botaniq.AudioEngine.audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, window.Botaniq.AudioEngine.audioCtx.currentTime + 0.15);
          osc.connect(gain);
          gain.connect(window.Botaniq.AudioEngine.audioCtx.destination);
          osc.start();
          osc.stop(window.Botaniq.AudioEngine.audioCtx.currentTime + 0.15);
        }
      });
    });

    const checkSynthesize = () => {
      let h2os = particles.filter(p => p.type === 'h2o');
      let co2s = particles.filter(p => p.type === 'co2');
      let photons = particles.filter(p => p.type === 'photon');

      if (h2os.length >= 6 && co2s.length >= 6 && photons.length >= 6) {
        let hCount = 0, cCount = 0, pCount = 0;
        particles = particles.filter(p => {
          if (p.type === 'h2o' && hCount < 6) { hCount++; return false; }
          if (p.type === 'co2' && cCount < 6) { cCount++; return false; }
          if (p.type === 'photon' && pCount < 6) { pCount++; return false; }
          return true;
        });

        glucoseYield += 1;
        oxygenYield += 6;

        document.getElementById('glucose-count').innerText = glucoseYield;
        document.getElementById('oxygen-count').innerText = oxygenYield;

        window.Botaniq.XPManager.addXP(5);
        window.Botaniq.Notification.show("Molecules Synthesized! Glucose created! 🍯", "success");
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#6B8F71';
      ctx.fillStyle = 'rgba(107, 143, 113, 0.08)';
      ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 20);
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = '#6B8F71';
      ctx.font = '10px Outfit';
      ctx.fillText("CHLOROPLAST ORGANELLE", 20, 26);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      checkSynthesize();
      this.animationFrameId = requestAnimationFrame(draw);
    };

    draw();
  },

  /* ==========================================================================
     2. WATER TRANSPORT & CAPILLARY TRANSPIRATION SIMULATOR
     ========================================================================== */
  initXylem(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>Water Xylem Capillary Transpiration</h4>
        <p>Drag the slider to adjust the sun heat. Watch transpiration suck water molecules UP from the root layers!</p>
      </div>
      <div class="photosynthesis-layout">
        <canvas id="xylem-canvas" width="550" height="350" class="science-canvas"></canvas>
        <div class="control-panel">
          <label>☀️ Sunshine Intensity (Water Pull):</label>
          <input type="range" id="heat-slider" min="1" max="10" value="3" style="width: 100%; margin-bottom: 20px;">
          
          <div class="formula-dashboard">
            <div class="formula-title">Transpiration Pull Dynamics:</div>
            <p style="font-size: 13px; line-height: 1.5; color: var(--text-muted);">
              Water cohesive attraction forces molecules into continuous chains inside capillary xylem cells, carrying minerals from the soil.
            </p>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('xylem-canvas');
    const ctx = canvas.getContext('2d');
    this.handleResizeScale();

    const heatSlider = document.getElementById('heat-slider');
    let waterDrops = [];

    class WaterDrop {
      constructor() {
        this.x = 250 + (Math.random() - 0.5) * 20;
        this.y = canvas.height - 20;
        this.vy = 1 + Math.random() * 2;
        this.r = 4 + Math.random() * 3;
      }

      update(speedMultiplier) {
        this.y -= this.vy * (speedMultiplier * 0.5);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(104, 149, 210, 0.8)';
        ctx.fill();
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const heat = parseInt(heatSlider.value);

      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

      ctx.fillStyle = '#9C7A65';
      ctx.fillRect(235, 40, 50, canvas.height - 80);

      ctx.strokeStyle = '#7D6150';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(245, 40);
      ctx.lineTo(245, canvas.height - 40);
      ctx.moveTo(275, 40);
      ctx.lineTo(275, canvas.height - 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(260, 45, 60, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(77, 106, 79, 0.85)';
      ctx.fill();

      ctx.strokeStyle = '#5E493B';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(260, canvas.height - 40);
      ctx.lineTo(220, canvas.height - 10);
      ctx.moveTo(260, canvas.height - 40);
      ctx.lineTo(300, canvas.height - 10);
      ctx.stroke();

      if (Math.random() < 0.15 * heat) {
        waterDrops.push(new WaterDrop());
      }

      waterDrops.forEach((drop, idx) => {
        drop.update(heat);
        drop.draw();

        if (drop.y < 45) {
          waterDrops.splice(idx, 1);
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        }
      });

      ctx.beginPath();
      ctx.arc(60, 60, 20 + heat * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(242, 200, 93, ${0.1 + (heat * 0.08)})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(60, 60, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#F2C85D';
      ctx.fill();

      this.animationFrameId = requestAnimationFrame(draw);
    };

    draw();
  },

  /* ==========================================================================
     3. POLLINATION INTERACTIVE MATCHING SIMULATOR
     ========================================================================== */
  initPollination(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>Interactive Bee Pollinator Game</h4>
        <p>Move/Drag your finger or cursor to guide the fuzzy Bee! Touch Flower A (Anther) to collect golden pollen, then pollinate Flower B (Stigma) to spawn seeds!</p>
      </div>
      <div class="pollination-game-area">
        <canvas id="pollination-canvas" width="550" height="350" class="science-canvas" style="touch-action: none; cursor: none;"></canvas>
      </div>
    `;

    const canvas = document.getElementById('pollination-canvas');
    const ctx = canvas.getContext('2d');
    this.handleResizeScale();

    let bee = { x: 50, y: 150, r: 12, carryingPollen: false };
    let flowerA = { x: 100, y: canvas.height - 70, type: 'anther', r: 35, color: '#C8A97E' };
    let flowerB = { x: canvas.width - 100, y: canvas.height - 70, type: 'stigma', r: 35, color: '#8BA888' };
    let sparkles = [];
    let seeds = [];

    const handleMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      bee.x = clientX - rect.left;
      bee.y = clientY - rect.top;
      
      if (bee.x < bee.r) bee.x = bee.r;
      if (bee.x > canvas.width - bee.r) bee.x = canvas.width - bee.r;
      if (bee.y < bee.r) bee.y = bee.r;
      if (bee.y > canvas.height - bee.r) bee.y = canvas.height - bee.r;
    };

    canvas.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }, { passive: false });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6B8F71';
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

      ctx.beginPath();
      ctx.arc(flowerA.x, flowerA.y, flowerA.r, 0, Math.PI * 2);
      ctx.fillStyle = flowerA.color;
      ctx.fill();

      ctx.strokeStyle = '#4D6A4F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(flowerA.x, flowerA.y);
      ctx.lineTo(flowerA.x, canvas.height - 30);
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(
          flowerA.x - 15 + Math.sin(i) * 15,
          flowerA.y - 15 + Math.cos(i) * 15,
          3, 0, Math.PI * 2
        );
        ctx.fillStyle = '#E2C85D';
        ctx.fill();
      }

      ctx.fillStyle = '#FFF';
      ctx.font = '10px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText("FLOWER A (Anther)", flowerA.x, flowerA.y + 4);

      ctx.beginPath();
      ctx.arc(flowerB.x, flowerB.y, flowerB.r, 0, Math.PI * 2);
      ctx.fillStyle = flowerB.color;
      ctx.fill();

      ctx.strokeStyle = '#4D6A4F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(flowerB.x, flowerB.y);
      ctx.lineTo(flowerB.x, canvas.height - 30);
      ctx.stroke();

      ctx.fillStyle = '#FFF';
      ctx.font = '10px Outfit';
      ctx.fillText("FLOWER B (Stigma)", flowerB.x, flowerB.y + 4);

      const distToA = Math.hypot(bee.x - flowerA.x, bee.y - flowerA.y);
      if (distToA < flowerA.r + bee.r && !bee.carryingPollen) {
        bee.carryingPollen = true;
        window.Botaniq.Notification.show("Pollen collected! Direct the Bee to Flower B.", "success");
      }

      const distToB = Math.hypot(bee.x - flowerB.x, bee.y - flowerB.y);
      if (distToB < flowerB.r + bee.r && bee.carryingPollen) {
        bee.carryingPollen = false;
        
        for (let i = 0; i < 15; i++) {
          seeds.push({
            x: flowerB.x,
            y: flowerB.y - 20,
            vx: (Math.random() - 0.5) * 4,
            vy: -3 - Math.random() * 4,
            r: 3 + Math.random() * 2
          });
        }
        
        window.Botaniq.XPManager.addXP(10);
        window.Botaniq.Notification.show("Foliage Fertilized! Seeds Generated! 🌸✨", "achievement");
      }

      if (bee.carryingPollen) {
        sparkles.push({
          x: bee.x + (Math.random() - 0.5) * 10,
          y: bee.y + (Math.random() - 0.5) * 10,
          r: 2 + Math.random() * 2,
          life: 1.0
        });
      }

      sparkles.forEach((s, idx) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 200, 93, ${s.life})`;
        ctx.fill();
        s.life -= 0.05;
        if (s.life <= 0) sparkles.splice(idx, 1);
      });

      seeds.forEach((s, idx) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#C8A97E';
        ctx.fill();
        
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.25;

        if (s.y > canvas.height - 30) {
          seeds.splice(idx, 1);
        }
      });

      ctx.font = '28px Outfit';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("🐝", bee.x, bee.y);

      this.animationFrameId = requestAnimationFrame(draw);
    };

    draw();
  },

  /* ==========================================================================
     4. PROCEDURAL GROWTH PLANT VARIABLE SIMULATOR
     ========================================================================== */
  initGrowth(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>Procedural Variable Growth Lab</h4>
        <p>Calibrate variables (Sunlight, Water, Soil compost, Temp) to watch the green stem sprout shoots or shrink in distress.</p>
      </div>
      <div class="growth-simulator-layout">
        <canvas id="growth-canvas" width="550" height="350" class="science-canvas"></canvas>
        <div class="control-panel growth-sliders">
          <div class="slider-row">
            <label>☀️ Sunlight Intensity: <span id="val-sun">50</span>%</label>
            <input type="range" class="growth-input-slider" id="grow-sun" min="0" max="100" value="50">
          </div>
          <div class="slider-row">
            <label>💧 Water Hydration: <span id="val-water">50</span>%</label>
            <input type="range" class="growth-input-slider" id="grow-water" min="0" max="100" value="50">
          </div>
          <div class="slider-row">
            <label>🪴 Soil Nutrients: <span id="val-soil">50</span>%</label>
            <input type="range" class="growth-input-slider" id="grow-soil" min="0" max="100" value="50">
          </div>
          <div class="slider-row">
            <label>🌡 Ambient Temp: <span id="val-temp">24</span>°C</label>
            <input type="range" class="growth-input-slider" id="grow-temp" min="0" max="45" value="24">
          </div>
          
          <div class="growth-status-meter" id="growth-status-label">
            Growth Condition: PERFECT 🌱✨
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('growth-canvas');
    const ctx = canvas.getContext('2d');
    this.handleResizeScale();

    const sliderSun = document.getElementById('grow-sun');
    const sliderWater = document.getElementById('grow-water');
    const sliderSoil = document.getElementById('grow-soil');
    const sliderTemp = document.getElementById('grow-temp');

    let currentPlantHeight = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sun = parseInt(sliderSun.value);
      const water = parseInt(sliderWater.value);
      const soil = parseInt(sliderSoil.value);
      const temp = parseInt(sliderTemp.value);

      document.getElementById('val-sun').innerText = sun;
      document.getElementById('val-water').innerText = water;
      document.getElementById('val-soil').innerText = soil;
      document.getElementById('val-temp').innerText = temp;

      let health = 100;
      
      if (sun < 40) health -= (40 - sun) * 1.5;
      if (sun > 70) health -= (sun - 70) * 1.5;
      
      if (water < 50) health -= (50 - water) * 2;
      if (water > 80) health -= (water - 80) * 2;
      
      if (soil < 50) health -= (50 - soil) * 1;
      
      if (temp < 20) health -= (20 - temp) * 2;
      if (temp > 30) health -= (temp - 30) * 2.5;

      health = Math.max(0, Math.min(100, health));

      const statusLabel = document.getElementById('growth-status-label');
      let plantColor = '#6B8F71';
      let flowerColor = '#E27E9F';

      if (health >= 80) {
        statusLabel.innerText = "Growth Condition: EXCELLENT 🌿✨";
        statusLabel.className = "growth-status-meter excellent-status";
        if (currentPlantHeight < 150) currentPlantHeight += 0.8;
      } else if (health >= 45) {
        statusLabel.innerText = "Growth Condition: STABLE 🌱";
        statusLabel.className = "growth-status-meter stable-status";
        if (currentPlantHeight < 100) currentPlantHeight += 0.3;
      } else {
        statusLabel.innerText = "Growth Condition: DISTRESSED 🍂⚠️";
        statusLabel.className = "growth-status-meter distressed-status";
        plantColor = '#A08E7A';
        if (currentPlantHeight > 40) currentPlantHeight -= 0.6;
      }

      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

      ctx.fillStyle = '#8C6A56';
      ctx.beginPath();
      ctx.moveTo(230, canvas.height - 20);
      ctx.lineTo(270, canvas.height - 20);
      ctx.lineTo(262, canvas.height - 70);
      ctx.lineTo(238, canvas.height - 70);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#9C7A65';
      ctx.fillRect(234, canvas.height - 75, 32, 5);

      ctx.strokeStyle = plantColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(250, canvas.height - 70);
      const bend = (temp - 24) * 0.8;
      ctx.quadraticCurveTo(
        250 + bend, canvas.height - 70 - currentPlantHeight * 0.5,
        250 + bend * 1.5, canvas.height - 70 - currentPlantHeight
      );
      ctx.stroke();

      const topY = canvas.height - 70 - currentPlantHeight;
      const topX = 250 + bend * 1.5;

      if (currentPlantHeight > 30) {
        ctx.fillStyle = plantColor;
        ctx.beginPath();
        ctx.ellipse(topX - 15, topY + 20, 10, 6, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (currentPlantHeight > 70) {
        ctx.fillStyle = plantColor;
        ctx.beginPath();
        ctx.ellipse(topX + 15, topY + 40, 12, 7, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (currentPlantHeight > 120 && health > 60) {
        ctx.beginPath();
        ctx.arc(topX, topY, 12, 0, Math.PI * 2);
        ctx.fillStyle = flowerColor;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(topX, topY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#E2C85D';
        ctx.fill();
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };

    draw();
  },

  /* ==========================================================================
     5. PHOTOTROPISM INTERACTIVE SIMULATOR (NEW)
     ========================================================================== */
  initPhototropism(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>🌞 Phototropism Cell Elongation Lab</h4>
        <p>Drag the slider to move the sun. Watch auxin hormones accumulate on the shaded side, causing the plant shoot to bend toward light!</p>
      </div>
      <div class="growth-simulator-layout">
        <canvas id="tropism-canvas" width="550" height="350" class="science-canvas" style="background:#FFF; cursor:crosshair;"></canvas>
        <div class="control-panel">
          <label>☀️ Position of the Sun:</label>
          <input type="range" id="sun-angle-slider" min="50" max="500" value="275" style="width:100%; margin-bottom:20px;">
          
          <div class="formula-dashboard" style="font-size:12.5px; line-height:1.5; color:var(--text-dark);">
            <div class="formula-title">🧪 Auxin Hormone Action:</div>
            <p>Auxin moves away from light. High auxin concentrations on the dark side stimulate hydrogen ion pumps in cell walls, lowering pH and activating expansin proteins to loosen cell structures. Water pressure then forces these loosened cells to expand, causing bending.</p>
            <div style="margin-top:10px; padding:8px; border-radius:4px; border:1.5px dashed var(--accent-gold); background:rgba(200,169,126,0.08); font-weight:600; text-align:center;">
              🧬 Bending Ratio: <span id="bend-ratio">0.00</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('tropism-canvas');
    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('sun-angle-slider');
    this.handleResizeScale();

    let sunX = 275;
    let sunY = 50;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 120) {
        sunX = x;
        sunY = Math.max(20, y);
        slider.value = x;
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (slider) {
        sunX = parseInt(slider.value);
      }

      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      ctx.fillStyle = '#8C6A56';
      ctx.fillRect(canvas.width/2 - 35, canvas.height - 40, 70, 20);

      ctx.beginPath();
      ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#F2C85D';
      ctx.shadowColor = '#F2C85D';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(242, 200, 93, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX + Math.cos(angle) * 40, sunY + Math.sin(angle) * 40);
        ctx.stroke();
      }

      const base = canvas.width / 2;
      const targetDiff = (sunX - base) * 0.35;

      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      const isLeftOfSun = base < sunX;
      ctx.strokeStyle = isLeftOfSun ? 'rgba(139, 168, 136, 0.2)' : 'rgba(200, 169, 126, 0.3)';
      ctx.beginPath();
      ctx.moveTo(base, canvas.height - 40);
      ctx.quadraticCurveTo(base, canvas.height - 100, base + targetDiff, canvas.height - 180);
      ctx.stroke();

      ctx.strokeStyle = '#6B8F71';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(base, canvas.height - 40);
      ctx.quadraticCurveTo(base, canvas.height - 100, base + targetDiff, canvas.height - 180);
      ctx.stroke();

      ctx.fillStyle = isLeftOfSun ? '#85AB8C' : '#DAB98D';
      ctx.font = '9px Outfit';
      ctx.fillText(isLeftOfSun ? '🌿 Growth' : '🧬 Auxin buildup', isLeftOfSun ? base - 60 : base + 20, canvas.height - 100);

      const apexX = base + targetDiff;
      const apexY = canvas.height - 180;
      ctx.fillStyle = '#4D6A4F';
      
      ctx.beginPath();
      ctx.ellipse(apexX - 8, apexY - 4, 10, 5, -Math.PI/4 + (targetDiff*0.003), 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(apexX + 8, apexY - 4, 10, 5, Math.PI/4 + (targetDiff*0.003), 0, Math.PI * 2);
      ctx.fill();

      const ratio = document.getElementById('bend-ratio');
      if (ratio) ratio.innerText = (Math.abs(targetDiff) / 100).toFixed(2);

      this.animationFrameId = requestAnimationFrame(draw);
    };
    draw();
  },

  /* ==========================================================================
     6. SEED GERMINATION INTERACTIVE SIMULATOR (NEW)
     ========================================================================== */
  initGermination(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>🌰 Subterranean Seed Germination Lab</h4>
        <p>Set moisture and temperature, then click "Start Germination" to watch the cellular development phases!</p>
      </div>
      <div class="growth-simulator-layout">
        <canvas id="germination-canvas" width="550" height="350" class="science-canvas" style="background:#6E5545;"></canvas>
        <div class="control-panel">
          <div class="slider-row">
            <label>💧 Soil Moisture: <span id="val-g-moisture">50</span>%</label>
            <input type="range" class="growth-input-slider" id="germ-moisture" min="0" max="100" value="50">
          </div>
          <div class="slider-row">
            <label>🌡️ Soil Temp: <span id="val-g-temp">22</span>°C</label>
            <input type="range" class="growth-input-slider" id="germ-temp" min="0" max="45" value="22">
          </div>
          
          <button class="btn-primary" id="germ-start-btn" style="margin-top:10px;">🌰 Start Germination</button>
          
          <div class="formula-dashboard" style="font-size:12px; line-height:1.5;">
            <div class="formula-title">🌱 Germination Phase:</div>
            <div id="germ-phase-text" style="font-weight:600; color:var(--primary-forest);">Dormant Seed (Quiescent)</div>
            <p id="germ-desc-text" style="color:var(--text-muted); margin-top:6px; font-size:11px;">Waiting for water absorption (imbibition) to awaken seed metabolic activities.</p>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('germination-canvas');
    const ctx = canvas.getContext('2d');
    const sliderMoisture = document.getElementById('germ-moisture');
    const sliderTemp = document.getElementById('germ-temp');
    const startBtn = document.getElementById('germ-start-btn');
    this.handleResizeScale();

    let phase = 0; 
    let germProgress = 0;
    let isGerminating = false;

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        isGerminating = true;
        germProgress = 0;
        phase = 0;
        startBtn.disabled = true;
        startBtn.textContent = '⏳ Germinating...';
        
        try {
          const stats = JSON.parse(localStorage.getItem('botaniq_stats') || '{}');
          stats.experiments_performed = (stats.experiments_performed || 0) + 1;
          localStorage.setItem('botaniq_stats', JSON.stringify(stats));
        } catch(e){}
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const moisture = parseInt(sliderMoisture.value);
      const temp = parseInt(sliderTemp.value);

      document.getElementById('val-g-moisture').innerText = moisture;
      document.getElementById('val-g-temp').innerText = temp;

      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#8C6A56';
      ctx.fillRect(0, 0, canvas.width, 40);

      ctx.fillStyle = 'rgba(104, 149, 210, 0.4)';
      for (let i = 0; i < moisture / 3; i++) {
        ctx.beginPath();
        ctx.arc((i * 47) % canvas.width, (i * 31) % (canvas.height - 40) + 40, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isGerminating) {
        germProgress += 0.3;

        const isRot = moisture > 85 || temp > 38 || moisture < 20 || temp < 10;
        
        if (isRot && germProgress > 20) {
          phase = 5;
        } else {
          if (germProgress > 90) phase = 4;
          else if (germProgress > 60) phase = 3;
          else if (germProgress > 30) phase = 2;
          else if (germProgress > 5) phase = 1;
        }

        if (phase === 5) {
          startBtn.disabled = false;
          startBtn.textContent = '🔄 Retry Germination';
          isGerminating = false;
          document.getElementById('germ-phase-text').innerText = '❌ Failed (Seed Rotted)';
          document.getElementById('germ-phase-text').style.color = '#9E3A3A';
          document.getElementById('germ-desc-text').innerText = moisture > 85 ? 'Too much moisture suffocated the embryo (anaerobic waterlogging).' : temp > 38 ? 'Scorching heat destroyed the seed protein structures.' : 'Insufficient moisture or warmth prevented awakening.';
        } else if (phase === 4) {
          startBtn.disabled = false;
          startBtn.textContent = '🔄 Restart Experiment';
          isGerminating = false;
          window.Botaniq.XPManager.addXP(10);
          window.Botaniq.Notification.show('Successful germination! +10 XP 🌱', 'success');
          document.getElementById('germ-phase-text').innerText = '🌱 Sprout Fully Formed!';
          document.getElementById('germ-phase-text').style.color = '#4D6A4F';
          document.getElementById('germ-desc-text').innerText = 'Cotyledons have emerged above ground and started photosynthesis. Root network anchors the plant.';
        } else {
          const texts = {
            1: ['Imbibition (Water Absorption)', 'The seed swells, drinking moisture through micropyle, triggering enzyme secretion.'],
            2: ['Radicle Emergence', 'The embryonic root (radicle) pierces the seed coat, growing downward with gravity.'],
            3: ['Hypocotyl Elongation', 'The shoot stem bends in a protective hook shape and pushes upward toward sunlight.']
          };
          if (texts[phase]) {
            document.getElementById('germ-phase-text').innerText = '🌰 Phase: ' + texts[phase][0];
            document.getElementById('germ-desc-text').innerText = texts[phase][1];
          }
        }
      }

      const sx = canvas.width / 2;
      const sy = canvas.height / 2;

      if (phase === 0) {
        ctx.fillStyle = '#5A463B';
        ctx.beginPath();
        ctx.ellipse(sx, sy, 10, 7, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#DFD5C8';
        ctx.beginPath();
        ctx.arc(sx + 5, sy - 3, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (phase === 1) {
        ctx.fillStyle = '#6E5C4E';
        ctx.beginPath();
        ctx.ellipse(sx, sy, 14, 10, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (phase === 2) {
        ctx.fillStyle = '#6E5C4E';
        ctx.beginPath();
        ctx.ellipse(sx - 3, sy, 13, 9, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#F7F2E8';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx + 10, sy + 15, sx + 5, sy + 40);
        ctx.stroke();
      } else if (phase === 3) {
        ctx.strokeStyle = '#F7F2E8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx + 10, sy + 20, sx + 5, sy + 60);
        ctx.stroke();

        ctx.strokeStyle = '#A2BE9E';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx - 15, sy - 30, sx - 10, sy - 60);
        ctx.stroke();

        ctx.fillStyle = '#5A463B';
        ctx.beginPath();
        ctx.ellipse(sx + 12, sy, 10, 7, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (phase === 4) {
        ctx.strokeStyle = '#F7F2E8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 5, sy + 70);
        ctx.moveTo(sx + 2, sy + 30);
        ctx.lineTo(sx - 15, sy + 45);
        ctx.moveTo(sx + 4, sy + 50);
        ctx.lineTo(sx + 20, sy + 60);
        ctx.stroke();

        ctx.strokeStyle = '#8BA888';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx - 5, sy - 50, sx, 35);
        ctx.stroke();

        ctx.fillStyle = '#4D6A4F';
        ctx.beginPath();
        ctx.ellipse(sx - 10, 35, 12, 6, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(sx + 10, 35, 12, 6, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (phase === 5) {
        ctx.fillStyle = '#4D423C';
        ctx.beginPath();
        ctx.ellipse(sx, sy, 12, 8, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#78706B';
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(sx + Math.sin(i)*16, sy + Math.cos(i)*16, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };
    draw();
  },

  /* ==========================================================================
     7. NUTRIENT DEFICIENCY SIMULATOR (NEW)
     ========================================================================== */
  initDeficiency(container) {
    container.innerHTML = `
      <div class="sim-header">
        <h4>🍂 N-P-K Plant Nutrient Deficiency Lab</h4>
        <p>Adjust the slider dials for Nitrogen (N), Phosphorus (P), and Potassium (K) to observe how nutrient shortages alter leaf structures and trigger cell necrosis!</p>
      </div>
      <div class="growth-simulator-layout">
        <canvas id="deficiency-canvas" width="550" height="350" class="science-canvas" style="background:#FFF;"></canvas>
        <div class="control-panel">
          <div class="slider-row">
            <label style="color:#C15C5C; font-weight:700;">🔴 Nitrogen (N) Level: <span id="val-n">100</span>%</label>
            <input type="range" class="growth-input-slider" id="def-n" min="0" max="100" value="100">
          </div>
          <div class="slider-row">
            <label style="color:#6895D2; font-weight:700;">🔵 Phosphorus (P) Level: <span id="val-p">100</span>%</label>
            <input type="range" class="growth-input-slider" id="def-p" min="0" max="100" value="100">
          </div>
          <div class="slider-row">
            <label style="color:#C8A97E; font-weight:700;">🟡 Potassium (K) Level: <span id="val-k">100</span>%</label>
            <input type="range" class="growth-input-slider" id="def-k" min="0" max="100" value="100">
          </div>

          <div class="formula-dashboard" style="font-size:12.5px; line-height:1.5;">
            <div class="formula-title">🔬 Diagnostic Analysis:</div>
            <div id="def-diagnosis" style="font-weight:600; color:var(--primary-forest);">Healthy Foliage ✨</div>
            <p id="def-desc" style="color:var(--text-muted); margin-top:6px; font-size:11px;">Optimum N-P-K concentration supports deep chlorophyll absorption, protein synthesis, and water balance.</p>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('deficiency-canvas');
    const ctx = canvas.getContext('2d');
    const sliderN = document.getElementById('def-n');
    const sliderP = document.getElementById('def-p');
    const sliderK = document.getElementById('def-k');
    this.handleResizeScale();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const n = parseInt(sliderN.value);
      const p = parseInt(sliderP.value);
      const k = parseInt(sliderK.value);

      document.getElementById('val-n').innerText = n;
      document.getElementById('val-p').innerText = p;
      document.getElementById('val-k').innerText = k;

      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      ctx.fillStyle = '#8C6A56';
      ctx.fillRect(canvas.width/2 - 35, canvas.height - 50, 70, 30);

      let leafFillColor = '#6B8F71';
      let edgeStrokeColor = '#4D6A4F';
      let oldLeafColor = '#6B8F71';

      if (n < 40) {
        oldLeafColor = `rgb(${210 - (n*1.5)}, ${200 - (n*1.5)}, ${100 - (n)})`;
        leafFillColor = `rgb(${120 - (n*0.5)}, ${160 - (n*0.4)}, ${120 - (n*0.5)})`;
      }

      if (p < 40) {
        edgeStrokeColor = `rgb(${80 + (40-p)*2.5}, 50, ${100 + (40-p)*2.5})`;
      }

      if (k < 40) {
        edgeStrokeColor = `rgb(120, ${100 - (40-k)*2}, 45)`;
      }

      const diagEl = document.getElementById('def-diagnosis');
      const descEl = document.getElementById('def-desc');

      if (n < 40) {
        diagEl.innerText = '⚠️ Nitrogen (N) Deficiency';
        diagEl.style.color = '#B58A3D';
        descEl.innerText = 'Chlorosis detected. Nitrogen is highly mobile; the plant moves it from older bottom leaves to feed young top leaves, turning old leaves yellow.';
      } else if (p < 40) {
        diagEl.innerText = '⚠️ Phosphorus (P) Deficiency';
        diagEl.style.color = '#70648E';
        descEl.innerText = 'Stunted growth and purple leaf margins. Phosphorus is critical for root expansion and nucleic acid structure; deficiencies trigger anthocyanin pigment buildup.';
      } else if (k < 40) {
        diagEl.innerText = '⚠️ Potassium (K) Deficiency';
        diagEl.style.color = '#8C6A56';
        descEl.innerText = 'Leaf margin necrosis. Potassium regulates stomatal breathing and water balance. Deficiencies cause outer leaf cells to scorch, wither, and die.';
      } else {
        diagEl.innerText = 'Healthy Foliage ✨';
        diagEl.style.color = 'var(--primary-forest)';
        descEl.innerText = 'Balanced N-P-K concentration supports deep chlorophyll absorption, protein synthesis, and water balance.';
      }

      ctx.strokeStyle = '#5E8560';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height - 50);
      ctx.lineTo(canvas.width / 2, canvas.height - 180);
      ctx.stroke();

      const centerX = canvas.width / 2;

      ctx.fillStyle = oldLeafColor;
      ctx.strokeStyle = edgeStrokeColor;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.ellipse(centerX - 24, canvas.height - 110, 24, 10, -Math.PI / 8, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX + 24, canvas.height - 110, 24, 10, Math.PI / 8, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = leafFillColor;

      ctx.beginPath();
      ctx.ellipse(centerX - 20, canvas.height - 150, 20, 8, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX + 20, canvas.height - 150, 20, 8, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, canvas.height - 185, 14, 6, -Math.PI / 2, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      this.animationFrameId = requestAnimationFrame(draw);
    };
    draw();
  }
};

// Procedural Science visual overrides inside JS
const simStyle = document.createElement('style');
simStyle.innerHTML = `
  .science-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .science-tabs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .science-tab-btn {
    background: var(--bg-card);
    border: 1px solid var(--border-organic);
    padding: 10px 18px;
    border-radius: 50px;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    transition: var(--transition-fast);
    color: var(--text-dark);
  }
  .science-tab-btn.active {
    background: var(--primary-sage);
    color: white;
    border-color: var(--primary-sage);
    box-shadow: var(--shadow-soft);
  }
  .simulation-card {
    padding: 24px !important;
  }
  .sim-header {
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-organic);
    padding-bottom: 12px;
  }
  .sim-header h4 {
    font-family: var(--font-heading);
    font-size: 18px;
    color: var(--text-dark);
  }
  .sim-header p {
    font-size: 13px;
    color: var(--text-muted);
  }
  
  .photosynthesis-layout {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .science-canvas {
    background: #000;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
    background-color: var(--bg-input);
    flex-grow: 1;
    max-width: 550px;
  }
  .control-panel {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
  }
  .formula-dashboard {
    background: var(--bg-input);
    border: 1px solid var(--border-organic);
    padding: 16px;
    border-radius: var(--radius-md);
    margin-top: 12px;
  }
  .formula-title {
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 10px;
  }
  .yield-counters {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
  .counter-box {
    font-size: 14px;
    font-weight: 500;
    background: var(--bg-card);
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-organic);
  }
  .equation-box {
    font-size: 10px;
    font-weight: bold;
    color: var(--primary-forest);
    background: var(--bg-card);
    padding: 8px;
    border-radius: var(--radius-sm);
    text-align: center;
    border: 1px solid var(--border-organic);
  }

  .pollination-game-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .growth-simulator-layout {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .growth-sliders {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .slider-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .slider-row label {
    font-size: 13px;
    font-weight: 600;
  }
  .growth-input-slider {
    -webkit-appearance: none;
    height: 6px;
    border-radius: 5px;
    background: var(--bg-input);
    outline: none;
    padding: 0;
  }
  .growth-input-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary-sage);
    cursor: pointer;
    transition: var(--transition-fast);
  }
  .growth-input-slider::-webkit-slider-thumb:hover {
    background: var(--primary-forest);
    transform: scale(1.1);
  }
  
  .growth-status-meter {
    padding: 12px;
    border-radius: var(--radius-sm);
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    margin-top: 10px;
  }
  .excellent-status {
    background: rgba(162, 190, 158, 0.15);
    color: var(--primary-forest);
    border: 1px solid var(--primary-sage);
  }
  .stable-status {
    background: rgba(200, 169, 126, 0.15);
    color: #8C6A56;
    border: 1px solid var(--accent-gold);
  }
  .distressed-status {
    background: rgba(226, 158, 158, 0.15);
    color: #9E3A3A;
    border: 1px solid #E29E9E;
  }
`;
document.head.appendChild(simStyle);
