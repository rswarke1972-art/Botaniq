/**
 * BOTANIQ - Bonsai Academy Module
 * Dedicated bonsai training with interactive pruning simulator
 */
window.Botaniq.Bonsai = {
  activeSpecies: 'juniper',
  pruneScore: 0,
  treeState: null,
  animFrameId: null,

  species: {
    juniper: {
      name: 'Juniper Bonsai', emoji: '🌲', scientific: 'Juniperus procumbens',
      difficulty: 'Beginner', style: 'Informal Upright', age: '3–10 years',
      description: 'The most popular beginner bonsai. Hardy, forgiving, and grows beautiful deadwood features (shari). Perfect for training outdoors.',
      seasonalCare: {
        Summer: 'Water daily in summer. Place in full sun. Protect from scorching afternoon heat above 38°C.',
        Winter: 'Junipers need cold winter dormancy. Keep outdoors in a sheltered spot. Do not let roots freeze solid.',
        Monsoon: 'Excellent natural rainfall helps. Ensure pot drainage is perfect. Remove dead branches to prevent fungal rot.'
      },
      pruningSeasons: 'Spring and early summer (March–June)',
      wiring: 'Apply copper or aluminum wire in autumn when growth slows. Leave for 6–12 months.',
      repotting: 'Every 2–3 years in early spring before new growth appears. Use akadama + pumice mix.',
      rootTrimming: 'Remove up to 1/3 of root mass during repotting. Cut dead or circling roots clean.',
      soilMix: '60% pumice, 40% akadama. Excellent drainage is critical.',
      commonMistakes: 'Keeping indoors (needs outdoor light), overwatering in winter, repotting too frequently.'
    },
    ficus: {
      name: 'Ginseng Ficus', emoji: '🌳', scientific: 'Ficus microcarpa',
      difficulty: 'Beginner', style: 'Informal Upright', age: '5–20 years',
      description: 'Thick ginseng-like bulbous roots topped with lush tropical foliage. Adapts well to indoor conditions with bright light.',
      seasonalCare: {
        Summer: 'Place near bright window. Water every 4–5 days. Mist leaves to boost humidity.',
        Winter: 'Move away from cold drafts. Water less (every 7–10 days). Leaf drop is normal.',
        Monsoon: 'Keep indoors away from monsoon dampness. Water every 6–8 days. Watch for fungus gnats.'
      },
      pruningSeasons: 'Spring and summer. Can prune lightly year-round.',
      wiring: 'Wire young branches in spring. Ficus branches thicken fast — check wires every 3 weeks.',
      repotting: 'Every 2 years in spring. Tolerates aggressive root pruning.',
      rootTrimming: 'Can remove up to 40% of roots. Clean cuts with sterile scissors.',
      soilMix: '50% akadama, 30% pumice, 20% organic compost.',
      commonMistakes: 'Moving the tree frequently (causes leaf drop), underwatering in summer, allowing root rot.'
    },
    japanese_maple: {
      name: 'Japanese Maple', emoji: '🍁', scientific: 'Acer palmatum',
      difficulty: 'Advanced', style: 'Formal/Informal Upright', age: '10–50 years',
      description: 'Famous for spectacular autumn foliage in red, orange, and gold. Requires patience and skill but produces breathtaking seasonal bonsai.',
      seasonalCare: {
        Summer: 'Protect from afternoon sun above 32°C. Water daily (twice on very hot days). Mist leaves morning only.',
        Winter: 'Protect roots from freezing. Keep in unheated garage or cold greenhouse. Do not let soil dry completely.',
        Monsoon: 'Excellent growth season! Allow natural rainfall. Monitor for black spot fungal disease on leaves.'
      },
      pruningSeasons: 'Early spring before bud break, and late summer after growth hardens.',
      wiring: 'Wire in autumn after leaf drop. Leave for maximum 3–4 months — maples scar easily.',
      repotting: 'Every 2–3 years in early spring when buds just begin to swell.',
      rootTrimming: 'Remove up to 30% of roots. Work quickly to avoid roots drying out.',
      soilMix: '50% akadama, 30% pumice, 20% fine grit. Slightly more organic than conifers.',
      commonMistakes: 'Exposing to drying wind, summer scorching, over-wiring causing deep scars.'
    },
    pine: {
      name: 'Japanese Black Pine', emoji: '🌲', scientific: 'Pinus thunbergii',
      difficulty: 'Expert', style: 'Formal Upright', age: '10–100+ years',
      description: 'The king of bonsai. Extremely long-lived with dramatic ramification. Requires advanced timing techniques like candle management.',
      seasonalCare: {
        Summer: 'Full sun all day. Water daily. Candle decandling technique performed in July–August.',
        Winter: 'Hardy to moderate frost. Protect in cold climates below -10°C. Reduce water.',
        Monsoon: 'Natural rain is beneficial. Ensure exceptional pot drainage. Avoid waterlogged roots.'
      },
      pruningSeasons: 'Candle pinching in spring. Needle reduction and branch pruning in autumn.',
      wiring: 'Wire in autumn. Can leave wire for 1–2 full years on thick primary branches.',
      repotting: 'Every 3–5 years in late winter. Less frequently than deciduous trees.',
      rootTrimming: 'Minimal root pruning. Pines have mycorrhizal fungi — preserve as much as possible.',
      soilMix: '70% pumice, 30% akadama. Maximum drainage. Zero organic matter.',
      commonMistakes: 'Overwatering, repotting too frequently, removing too many needles at once.'
    },
    cherry_blossom: {
      name: 'Cherry Blossom', emoji: '🌸', scientific: 'Prunus serrulata',
      difficulty: 'Intermediate', style: 'Informal Upright / Cascade', age: '5–30 years',
      description: 'Produces spectacular pink spring blooms that last 2 weeks. A living symbol of impermanence — beautiful and humbling.',
      seasonalCare: {
        Summer: 'Partial shade after flowering. Water daily. Fertilize to prepare for next year\'s blooms.',
        Winter: 'Needs cold dormancy (below 10°C) to trigger spring flowering. Protect from hard freeze.',
        Monsoon: 'Good natural watering. Watch for brown rot disease on remaining fruits and stems.'
      },
      pruningSeasons: 'Immediately after flowering in spring. Light autumn pruning only.',
      wiring: 'Wire young branches in summer. Cherry scars easily — use soft aluminum wire with padding.',
      repotting: 'Every 2 years, just before spring bud break.',
      rootTrimming: 'Moderate root pruning (25-30%). Seal cut surfaces with bonsai paste.',
      soilMix: '40% akadama, 40% pumice, 20% pine bark.',
      commonMistakes: 'Pruning at the wrong time (destroys flower buds), insufficient winter cold.'
    }
  },

  render() {
    const s = this.species[this.activeSpecies];
    return `
      <div class="bonsai-container">
        <!-- Species Selector Tabs -->
        <div class="bonsai-species-tabs">
          ${Object.keys(this.species).map(key => `
            <button class="species-tab-btn ${this.activeSpecies === key ? 'active' : ''}" data-species="${key}">
              ${this.species[key].emoji} ${this.species[key].name.split(' ')[0]}
            </button>
          `).join('')}
        </div>

        <!-- Main Layout -->
        <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:24px;" class="bonsai-layout">

          <!-- Left: Species Info -->
          <div style="display:flex;flex-direction:column;gap:20px;">
            <div class="premium-card">
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
                <span style="font-size:48px;">${s.emoji}</span>
                <div>
                  <h3 style="margin:0;">${s.name}</h3>
                  <div style="font-style:italic;color:var(--text-muted);font-size:13px;">${s.scientific}</div>
                  <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                    <span style="background:rgba(139,168,136,0.15);border:1px solid rgba(139,168,136,0.3);color:var(--primary-forest);padding:3px 10px;border-radius:50px;font-size:11px;font-weight:700;">${s.difficulty}</span>
                    <span style="background:var(--bg-input);border:1px solid var(--border-organic);padding:3px 10px;border-radius:50px;font-size:11px;">${s.style}</span>
                  </div>
                </div>
              </div>
              <p style="font-size:14px;line-height:1.6;color:var(--text-dark);">${s.description}</p>
            </div>

            <!-- Care Details -->
            <div class="premium-card">
              <h3>📋 Expert Care Guide</h3>
              <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
                ${[
                  ['✂️ Pruning Season', s.pruningSeasons],
                  ['🌀 Wiring Guide', s.wiring],
                  ['🪴 Repotting Schedule', s.repotting],
                  ['🌱 Root Trimming', s.rootTrimming],
                  ['🪨 Soil Mix', s.soilMix],
                  ['⚠️ Common Mistakes', s.commonMistakes]
                ].map(([label, val]) => `
                  <div style="background:var(--bg-input);padding:14px;border-radius:var(--radius-md);border:1px solid var(--border-organic);">
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:4px;font-weight:600;">${label}</div>
                    <div style="font-size:13px;line-height:1.5;">${val}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Seasonal Care Cards -->
            <div class="premium-card">
              <h3>🗓️ Seasonal Care</h3>
              <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
                ${Object.entries(s.seasonalCare).map(([season, tip]) => {
                  const emojis = {Summer:'☀️',Winter:'❄️',Monsoon:'🌧️'};
                  const colors = {Summer:'rgba(242,200,93,0.1)',Winter:'rgba(104,149,210,0.1)',Monsoon:'rgba(107,143,113,0.1)'};
                  return `
                    <div style="background:${colors[season]};padding:14px;border-radius:var(--radius-md);border:1px solid var(--border-organic);">
                      <div style="font-weight:700;margin-bottom:6px;">${emojis[season]} ${season}</div>
                      <div style="font-size:13px;line-height:1.5;color:var(--text-muted);">${tip}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Right: Pruning Simulator -->
          <div style="display:flex;flex-direction:column;gap:20px;">
            <div class="premium-card">
              <h3>✂️ Interactive Pruning Simulator</h3>
              <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Tap branch leaf clusters to prune them. Shape your ${s.name} for maximum points!</p>

              <div class="bonsai-canvas-container">
                <canvas id="bonsai-canvas" class="bonsai-canvas"></canvas>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;flex-wrap:wrap;gap:12px;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-size:13px;color:var(--text-muted);">Pruning Score:</span>
                  <span id="prune-score-display" style="font-family:var(--font-heading);font-size:22px;color:var(--primary-forest);">${this.pruneScore}</span>
                </div>
                <div style="display:flex;gap:10px;">
                  <button class="btn-secondary" id="reset-bonsai-btn" style="padding:8px 16px;font-size:13px;">🔄 Reset Tree</button>
                  <button class="btn-primary" id="share-bonsai-btn" style="padding:8px 16px;font-size:13px;">🌟 Claim XP</button>
                </div>
              </div>

              <div id="prune-feedback" style="margin-top:12px;font-size:13px;color:var(--text-muted);text-align:center;min-height:20px;"></div>
            </div>

            <!-- Pruning Guide -->
            <div class="premium-card">
              <h3>📐 Bonsai Design Principles</h3>
              <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
                ${[
                  ['Rule of Thirds', 'The apex (top) should not be centered. Offset for natural movement.'],
                  ['Branch Alternation', 'Branches should alternate left/right/back — never two on the same level.'],
                  ['Taper', 'Trunk narrows toward the apex. Remove competing leaders to define single trunk.'],
                  ['Negative Space', 'Empty space between branches is as important as foliage. Do not over-fill.'],
                  ['Movement', 'Curves and bends tell the tree\'s story. Straight trunks look unnatural.']
                ].map(([title, desc]) => `
                  <div style="display:flex;gap:12px;align-items:flex-start;">
                    <span style="color:var(--primary-sage);font-size:18px;flex-shrink:0;">🎋</span>
                    <div>
                      <div style="font-weight:600;font-size:14px;margin-bottom:2px;">${title}</div>
                      <div style="font-size:13px;color:var(--text-muted);">${desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Species tab switching
    document.querySelectorAll('.species-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        this.activeSpecies = btn.dataset.species;
        this.pruneScore = 0;
        window.Botaniq.Router.navigateTo('bonsai');
      });
    });

    // Setup canvas simulator
    const canvas = document.getElementById('bonsai-canvas');
    if (!canvas) return;

    // Responsive canvas sizing
    const container = canvas.parentElement;
    const cw = Math.min(container.clientWidth - 32, 480);
    const ch = Math.round(cw * 0.7);
    canvas.width = cw;
    canvas.height = ch;

    const ctx = canvas.getContext('2d');
    this.treeState = this.buildTree(cw, ch);

    // Claim XP button
    const claimBtn = document.getElementById('share-bonsai-btn');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        if (this.pruneScore > 0) {
          window.Botaniq.XPManager.addXP(this.pruneScore);
          window.Botaniq.Notification.show(`Bonsai Mastery! +${this.pruneScore} XP earned! 🌳`, 'achievement');
          if (window.Botaniq.Achievements) window.Botaniq.Achievements.checkUnlocks();
          // Track stat for achievements
          const stats = JSON.parse(localStorage.getItem('botaniq_stats') || '{}');
          stats.bonsai_prunes = (stats.bonsai_prunes || 0) + this.pruneScore;
          localStorage.setItem('botaniq_stats', JSON.stringify(stats));
          this.pruneScore = 0;
          document.getElementById('prune-score-display').innerText = '0';
        }
      });
    }

    // Reset button
    const resetBtn = document.getElementById('reset-bonsai-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.treeState = this.buildTree(cw, ch);
        this.pruneScore = 0;
        document.getElementById('prune-score-display').innerText = '0';
        document.getElementById('prune-feedback').innerText = '';
      });
    }

    // Click/Touch handler for pruning
    const handlePrune = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = cw / rect.width;
      const scaleY = ch / rect.height;
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      let hit = false;
      this.treeState.branches.forEach(b => {
        if (!b.pruned) {
          const dx = x - b.leafX;
          const dy = y - b.leafY;
          if (Math.sqrt(dx * dx + dy * dy) < b.leafR + 5) {
            b.pruned = true;
            b.pruneAlpha = 1.0;
            this.pruneScore += b.level === 1 ? 5 : b.level === 2 ? 8 : 3;
            document.getElementById('prune-score-display').innerText = this.pruneScore;

            const feedback = document.getElementById('prune-feedback');
            const msgs = [
              'Clean cut! ✂️ +points', 'Nice technique! 🌿', 'Shaping nicely! 🌳',
              'Perfect pruning angle! ✨', 'This will encourage growth! 🌱'
            ];
            feedback.innerText = msgs[Math.floor(Math.random() * msgs.length)];
            hit = true;

            // Trigger small audio click
            if (window.Botaniq.AudioEngine && window.Botaniq.AudioEngine.audioCtx) {
              const ac = window.Botaniq.AudioEngine.audioCtx;
              if (ac.state !== 'suspended') {
                const osc = ac.createOscillator();
                const g = ac.createGain();
                osc.frequency.value = 1200;
                g.gain.setValueAtTime(0.015, ac.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
                osc.connect(g); g.connect(ac.destination);
                osc.start(); osc.stop(ac.currentTime + 0.08);
              }
            }
          }
        }
      });
    };

    canvas.addEventListener('click', (e) => {
      handlePrune(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const t = e.changedTouches[0];
      handlePrune(t.clientX, t.clientY);
    }, { passive: false });

    // Prevent scroll on canvas during touch
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      this.drawBonsai(ctx, cw, ch);
      this.animFrameId = requestAnimationFrame(draw);
    };
    draw();
  },

  buildTree(w, h) {
    const trunk = { x: w / 2, baseY: h - 20, topY: h * 0.42 };
    const branches = [
      // Level 1 primary branches (from trunk)
      { id: 0, level: 1, startX: trunk.x - 10, startY: trunk.topY + (trunk.baseY - trunk.topY) * 0.65, endX: trunk.x - 70, endY: trunk.topY + (trunk.baseY - trunk.topY) * 0.35, leafX: trunk.x - 100, leafY: trunk.topY + (trunk.baseY - trunk.topY) * 0.2, leafR: 24, pruned: false, pruneAlpha: 0 },
      { id: 1, level: 1, startX: trunk.x + 10, startY: trunk.topY + (trunk.baseY - trunk.topY) * 0.55, endX: trunk.x + 80, endY: trunk.topY + (trunk.baseY - trunk.topY) * 0.3, leafX: trunk.x + 110, leafY: trunk.topY + (trunk.baseY - trunk.topY) * 0.15, leafR: 22, pruned: false, pruneAlpha: 0 },
      { id: 2, level: 1, startX: trunk.x - 5, startY: trunk.topY + (trunk.baseY - trunk.topY) * 0.4, endX: trunk.x - 55, endY: trunk.topY + (trunk.baseY - trunk.topY) * 0.1, leafX: trunk.x - 80, leafY: trunk.topY - 10, leafR: 26, pruned: false, pruneAlpha: 0 },
      { id: 3, level: 1, startX: trunk.x + 5, startY: trunk.topY + (trunk.baseY - trunk.topY) * 0.35, endX: trunk.x + 50, endY: trunk.topY + (trunk.baseY - trunk.topY) * 0.05, leafX: trunk.x + 75, leafY: trunk.topY - 15, leafR: 22, pruned: false, pruneAlpha: 0 },
      // Level 2 secondary branches
      { id: 4, level: 2, startX: trunk.x - 70, startY: trunk.topY + (trunk.baseY - trunk.topY) * 0.35, endX: trunk.x - 110, endY: trunk.topY + (trunk.baseY - trunk.topY) * 0.15, leafX: trunk.x - 130, leafY: trunk.topY + (trunk.baseY - trunk.topY) * 0.05, leafR: 16, pruned: false, pruneAlpha: 0 },
      { id: 5, level: 2, startX: trunk.x + 80, startY: trunk.topY + (trunk.baseY - trunk.topY) * 0.3, endX: trunk.x + 120, endY: trunk.topY + (trunk.baseY - trunk.topY) * 0.12, leafX: trunk.x + 140, leafY: trunk.topY + (trunk.baseY - trunk.topY) * 0.03, leafR: 16, pruned: false, pruneAlpha: 0 },
      // Apex cluster
      { id: 6, level: 3, startX: trunk.x, startY: trunk.topY + 15, endX: trunk.x, endY: trunk.topY, leafX: trunk.x, leafY: trunk.topY - 22, leafR: 30, pruned: false, pruneAlpha: 0 },
      { id: 7, level: 3, startX: trunk.x, startY: trunk.topY + 20, endX: trunk.x - 30, endY: trunk.topY + 5, leafX: trunk.x - 44, leafY: trunk.topY - 8, leafR: 20, pruned: false, pruneAlpha: 0 },
      { id: 8, level: 3, startX: trunk.x, startY: trunk.topY + 20, endX: trunk.x + 30, endY: trunk.topY + 5, leafX: trunk.x + 44, leafY: trunk.topY - 8, leafR: 20, pruned: false, pruneAlpha: 0 },
    ];
    return { trunk, branches };
  },

  drawBonsai(ctx, w, h) {
    const { trunk, branches } = this.treeState;

    // Soil and pot
    ctx.fillStyle = '#6E5545';
    ctx.fillRect(0, h - 20, w, 20);
    ctx.fillStyle = '#8C6A56';
    ctx.beginPath();
    ctx.moveTo(w/2 - 45, h - 20);
    ctx.lineTo(w/2 + 45, h - 20);
    ctx.lineTo(w/2 + 35, h - 70);
    ctx.lineTo(w/2 - 35, h - 70);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(w/2 - 38, h - 73, 76, 6);
    ctx.fillStyle = '#6E5545';
    ctx.fillRect(w/2 - 36, h - 72, 72, 4);

    // Main trunk (bezier curve for natural look)
    ctx.strokeStyle = '#7A5C48';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(trunk.x, trunk.baseY - 70);
    ctx.quadraticCurveTo(trunk.x - 12, trunk.topY + (trunk.baseY - trunk.topY) * 0.5, trunk.x, trunk.topY);
    ctx.stroke();

    // Trunk texture lines
    ctx.strokeStyle = '#5E4436';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(trunk.x - 5 + i * 4, trunk.baseY - 70);
      ctx.quadraticCurveTo(trunk.x - 8 + i * 4, trunk.topY + 60, trunk.x + i * 3, trunk.topY + 10);
      ctx.stroke();
    }

    // Draw branches and leaf clusters
    branches.forEach(b => {
      const alpha = b.pruned ? Math.max(0, b.pruneAlpha) : 1;
      if (alpha <= 0) return;

      ctx.globalAlpha = alpha;

      // Branch stick
      ctx.strokeStyle = '#7A5C48';
      ctx.lineWidth = b.level === 1 ? 6 : b.level === 2 ? 4 : 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(b.startX, b.startY);
      ctx.quadraticCurveTo((b.startX + b.endX) / 2, b.startY - 10, b.endX, b.endY);
      ctx.stroke();

      // Secondary stick to leaf
      ctx.lineWidth = b.level === 1 ? 4 : 3;
      ctx.beginPath();
      ctx.moveTo(b.endX, b.endY);
      ctx.lineTo(b.leafX, b.leafY);
      ctx.stroke();

      // Leaf cluster
      const leafColors = ['#4D6A4F', '#6B8F71', '#8BA888'];
      const lc = leafColors[b.level - 1] || '#6B8F71';

      ctx.beginPath();
      ctx.arc(b.leafX, b.leafY, b.leafR, 0, Math.PI * 2);
      ctx.fillStyle = lc;
      ctx.shadowColor = '#4D6A4F';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner leaf highlight
      ctx.beginPath();
      ctx.arc(b.leafX - 4, b.leafY - 4, b.leafR * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 168, 136, 0.25)';
      ctx.fill();

      // Prune fade-out
      if (b.pruned && b.pruneAlpha > 0) {
        b.pruneAlpha -= 0.025;
        // Flash white on prune
        ctx.beginPath();
        ctx.arc(b.leafX, b.leafY, b.leafR * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${b.pruneAlpha * 0.6})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    });
  }
};

// Bonsai specific styles
const bonsaiStyle = document.createElement('style');
bonsaiStyle.innerHTML = `
  .bonsai-container { display: flex; flex-direction: column; gap: 24px; }
  .bonsai-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; }
  @media (max-width: 900px) {
    .bonsai-layout { grid-template-columns: 1fr !important; }
  }
`;
document.head.appendChild(bonsaiStyle);
