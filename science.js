/**
 * BOTANIQ - Interactive Plant Science Lab (Very Premium Canvas & SVG Simulators)
 */

window.Botaniq.Science = {
  activeTab: 'photosynthesis', // photosynthesis, xylem, pollination, growth
  animationFrameId: null,

  render() {
    let html = `
      <div class="science-container">
        <!-- Simulator Navigation Panel -->
        <div class="science-tabs">
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
    } else {
      this.initGrowth(viewport);
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
    
    // Fit canvas scale on mobile safely
    const parentWidth = canvas.parentElement.clientWidth;
    if (parentWidth < 550) {
      canvas.width = parentWidth;
      canvas.height = parentWidth * 0.65;
    }

    // Particle Classes
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
        
        // Bounce on chloroplast walls
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
        
        // Draw little inner labels
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

    // Inject buttons action listeners
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
        // Play slight audio chirping sweep for interaction feedback
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

    // Particle collision synthesising logic
    const checkSynthesize = () => {
      let h2os = particles.filter(p => p.type === 'h2o');
      let co2s = particles.filter(p => p.type === 'co2');
      let photons = particles.filter(p => p.type === 'photon');

      // We need: 6 CO2 + 6 H2O + 6 photons to produce 1 Glucose and 6 Oxygen
      if (h2os.length >= 6 && co2s.length >= 6 && photons.length >= 6) {
        // Splice reactants out
        let hCount = 0, cCount = 0, pCount = 0;
        particles = particles.filter(p => {
          if (p.type === 'h2o' && hCount < 6) { hCount++; return false; }
          if (p.type === 'co2' && cCount < 6) { cCount++; return false; }
          if (p.type === 'photon' && pCount < 6) { pCount++; return false; }
          return true;
        });

        // Spawn outputs
        glucoseYield += 1;
        oxygenYield += 6;

        document.getElementById('glucose-count').innerText = glucoseYield;
        document.getElementById('oxygen-count').innerText = oxygenYield;

        window.Botaniq.XPManager.addXP(5);
        window.Botaniq.Notification.show("Molecules Synthesized! Glucose created! 🍯", "success");
      }
    };

    // Draw Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Chloroplast outline
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#6B8F71';
      ctx.fillStyle = 'rgba(107, 143, 113, 0.08)';
      ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 20);
      ctx.stroke();
      ctx.fill();

      // Label
      ctx.fillStyle = '#6B8F71';
      ctx.font = '10px Outfit';
      ctx.fillText("CHLOROPLAST ORGANELLE", 20, 26);

      // Update & Draw molecules
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
    
    // Fit canvas scale on mobile safely
    const parentWidth = canvas.parentElement.clientWidth;
    if (parentWidth < 550) {
      canvas.width = parentWidth;
      canvas.height = parentWidth * 0.65;
    }

    const heatSlider = document.getElementById('heat-slider');
    let waterDrops = [];

    // Water droplets climbing xylem
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

      // Draw landscape zones (sky, tree, soil)
      // Soil
      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

      // Xylem Pipe outline (the tree stem)
      ctx.fillStyle = '#9C7A65';
      ctx.fillRect(235, 40, 50, canvas.height - 80);

      // Inner Xylem Tube lines
      ctx.strokeStyle = '#7D6150';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(245, 40);
      ctx.lineTo(245, canvas.height - 40);
      ctx.moveTo(275, 40);
      ctx.lineTo(275, canvas.height - 40);
      ctx.stroke();

      // Top Leaf Canopy
      ctx.beginPath();
      ctx.arc(260, 45, 60, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(77, 106, 79, 0.85)';
      ctx.fill();

      // Soil root branches
      ctx.strokeStyle = '#5E493B';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(260, canvas.height - 40);
      ctx.lineTo(220, canvas.height - 10);
      ctx.moveTo(260, canvas.height - 40);
      ctx.lineTo(300, canvas.height - 10);
      ctx.stroke();

      // Spawning new water drops at bottom roots
      if (Math.random() < 0.15 * heat) {
        waterDrops.push(new WaterDrop());
      }

      // Update & Draw water drops
      waterDrops.forEach((drop, idx) => {
        drop.update(heat);
        drop.draw();

        // Evaporates at the top leaf stomata (creates clean steam particle)
        if (drop.y < 45) {
          waterDrops.splice(idx, 1);
          // Spawn little steam glow
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        }
      });

      // Visual solar warmth indicator
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
    
    // Fit canvas scale on mobile safely
    const parentWidth = canvas.parentElement.clientWidth;
    if (parentWidth < 550) {
      canvas.width = parentWidth;
      canvas.height = parentWidth * 0.65;
    }

    let bee = { x: 50, y: 150, r: 12, carryingPollen: false };
    let flowerA = { x: 100, y: canvas.height - 70, type: 'anther', r: 35, color: '#C8A97E' };
    let flowerB = { x: canvas.width - 100, y: canvas.height - 70, type: 'stigma', r: 35, color: '#8BA888' };
    let sparkles = [];
    let seeds = [];

    // Track mouse / touch coordinates
    const handleMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      bee.x = clientX - rect.left;
      bee.y = clientY - rect.top;
      
      // Boundaries
      if (bee.x < bee.r) bee.x = bee.r;
      if (bee.x > canvas.width - bee.r) bee.x = canvas.width - bee.r;
      if (bee.y < bee.r) bee.y = bee.r;
      if (bee.y > canvas.height - bee.r) bee.y = canvas.height - bee.r;
    };

    canvas.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchmove', (e) => {
      // Prevents background drag scrolling on mobile! Important user spec.
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }, { passive: false });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw landscape floor
      ctx.fillStyle = '#6B8F71';
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

      // Draw Flower A: Anther (Male - has pollen dust)
      ctx.beginPath();
      ctx.arc(flowerA.x, flowerA.y, flowerA.r, 0, Math.PI * 2);
      ctx.fillStyle = flowerA.color;
      ctx.fill();

      // Flower A stem
      ctx.strokeStyle = '#4D6A4F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(flowerA.x, flowerA.y);
      ctx.lineTo(flowerA.x, canvas.height - 30);
      ctx.stroke();

      // Golden pollen grains resting on flower A
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

      // Draw Flower B: Stigma (Female - receives pollen)
      ctx.beginPath();
      ctx.arc(flowerB.x, flowerB.y, flowerB.r, 0, Math.PI * 2);
      ctx.fillStyle = flowerB.color;
      ctx.fill();

      // Flower B stem
      ctx.strokeStyle = '#4D6A4F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(flowerB.x, flowerB.y);
      ctx.lineTo(flowerB.x, canvas.height - 30);
      ctx.stroke();

      ctx.fillStyle = '#FFF';
      ctx.font = '10px Outfit';
      ctx.fillText("FLOWER B (Stigma)", flowerB.x, flowerB.y + 4);

      // Check collision: Bee touches Flower A (Gather Pollen)
      const distToA = Math.hypot(bee.x - flowerA.x, bee.y - flowerA.y);
      if (distToA < flowerA.r + bee.r && !bee.carryingPollen) {
        bee.carryingPollen = true;
        window.Botaniq.Notification.show("Pollen collected! Direct the Bee to Flower B.", "success");
      }

      // Check collision: Bee touches Flower B (Fertilize)
      const distToB = Math.hypot(bee.x - flowerB.x, bee.y - flowerB.y);
      if (distToB < flowerB.r + bee.r && bee.carryingPollen) {
        bee.carryingPollen = false;
        
        // Spawn seed burst
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

      // Render sparkles if carrying pollen
      if (bee.carryingPollen) {
        sparkles.push({
          x: bee.x + (Math.random() - 0.5) * 10,
          y: bee.y + (Math.random() - 0.5) * 10,
          r: 2 + Math.random() * 2,
          life: 1.0
        });
      }

      // Draw sparkles
      sparkles.forEach((s, idx) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 200, 93, ${s.life})`;
        ctx.fill();
        s.life -= 0.05;
        if (s.life <= 0) sparkles.splice(idx, 1);
      });

      // Draw seed explosions
      seeds.forEach((s, idx) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#C8A97E';
        ctx.fill();
        
        // Gravitational pull
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.25; // gravity

        if (s.y > canvas.height - 30) {
          seeds.splice(idx, 1);
        }
      });

      // Draw the Bee Emoji
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
    
    // Fit canvas scale on mobile safely
    const parentWidth = canvas.parentElement.clientWidth;
    if (parentWidth < 550) {
      canvas.width = parentWidth;
      canvas.height = parentWidth * 0.65;
    }

    const sliderSun = document.getElementById('grow-sun');
    const sliderWater = document.getElementById('grow-water');
    const sliderSoil = document.getElementById('grow-soil');
    const sliderTemp = document.getElementById('grow-temp');

    let currentPlantHeight = 0;
    let leavesSprouted = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sun = parseInt(sliderSun.value);
      const water = parseInt(sliderWater.value);
      const soil = parseInt(sliderSoil.value);
      const temp = parseInt(sliderTemp.value);

      // Update value tags
      document.getElementById('val-sun').innerText = sun;
      document.getElementById('val-water').innerText = water;
      document.getElementById('val-soil').innerText = soil;
      document.getElementById('val-temp').innerText = temp;

      // Growth health score calculation
      let health = 100;
      
      // Optimum thresholds:
      // Sun 40-70%
      // Water 50-80%
      // Soil 50-90%
      // Temp 20-30°C
      if (sun < 40) health -= (40 - sun) * 1.5;
      if (sun > 70) health -= (sun - 70) * 1.5;
      
      if (water < 50) health -= (50 - water) * 2;
      if (water > 80) health -= (water - 80) * 2;
      
      if (soil < 50) health -= (50 - soil) * 1;
      
      if (temp < 20) health -= (20 - temp) * 2;
      if (temp > 30) health -= (temp - 30) * 2.5;

      health = Math.max(0, Math.min(100, health));

      // Set label status
      const statusLabel = document.getElementById('growth-status-label');
      let plantColor = '#6B8F71';
      let flowerColor = '#E27E9F';

      if (health >= 80) {
        statusLabel.innerText = "Growth Condition: EXCELLENT 🌿✨";
        statusLabel.className = "growth-status-meter excellent-status";
        // Grow plant taller
        if (currentPlantHeight < 150) currentPlantHeight += 0.8;
      } else if (health >= 45) {
        statusLabel.innerText = "Growth Condition: STABLE 🌱";
        statusLabel.className = "growth-status-meter stable-status";
        if (currentPlantHeight < 100) currentPlantHeight += 0.3;
      } else {
        statusLabel.innerText = "Growth Condition: DISTRESSED 🍂⚠️";
        statusLabel.className = "growth-status-meter distressed-status";
        plantColor = '#A08E7A'; // brown decay color
        // Plant wilts down
        if (currentPlantHeight > 40) currentPlantHeight -= 0.6;
      }

      // Draw clay pot base
      ctx.fillStyle = '#6E5545';
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

      // Ceramic pot
      ctx.fillStyle = '#8C6A56';
      ctx.beginPath();
      ctx.moveTo(230, canvas.height - 20);
      ctx.lineTo(270, canvas.height - 20);
      ctx.lineTo(262, canvas.height - 70);
      ctx.lineTo(238, canvas.height - 70);
      ctx.closePath();
      ctx.fill();

      // Top rim of pot
      ctx.fillStyle = '#9C7A65';
      ctx.fillRect(234, canvas.height - 75, 32, 5);

      // Draw Plant Stem based on height
      ctx.strokeStyle = plantColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(250, canvas.height - 70);
      // Bend stem slightly based on temperature stress
      const bend = (temp - 24) * 0.8;
      ctx.quadraticCurveTo(
        250 + bend, canvas.height - 70 - currentPlantHeight * 0.5,
        250 + bend * 1.5, canvas.height - 70 - currentPlantHeight
      );
      ctx.stroke();

      // Draw leaf nodes if height permits
      const topY = canvas.height - 70 - currentPlantHeight;
      const topX = 250 + bend * 1.5;

      if (currentPlantHeight > 30) {
        // Draw Left Leaf
        ctx.fillStyle = plantColor;
        ctx.beginPath();
        ctx.ellipse(topX - 15, topY + 20, 10, 6, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (currentPlantHeight > 70) {
        // Draw Right Leaf
        ctx.fillStyle = plantColor;
        ctx.beginPath();
        ctx.ellipse(topX + 15, topY + 40, 12, 7, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (currentPlantHeight > 120 && health > 60) {
        // Sprout flower bud at apex
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
