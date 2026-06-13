/**
 * BOTANIQ - Growth Journal Module with IndexedDB Storage & Growth Timeline
 * Cozy plant growth tracking with high-capacity offline image archiving
 */
window.Botaniq.Journal = {
  // Simple IndexedDB Wrapper
  DB: {
    DB_NAME: 'botaniq_journal_db',
    DB_VERSION: 1,
    STORE_NAME: 'entries',

    open() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.STORE_NAME)) {
            db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
          }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
      });
    },

    async getAll() {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          const res = req.result || [];
          // Sort descending by date
          res.sort((a, b) => new Date(b.date) - new Date(a.date));
          resolve(res);
        };
        req.onerror = () => reject(req.error);
      });
    },

    async put(item) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.put(item);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    },

    async delete(id) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    }
  },

  // Photo compression utility
  async compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          const originalSize = file.size;
          const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);
          const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
          
          console.log(`Photo compressed: ${compressionRatio}% reduction (${originalSize} → ${compressedSize} bytes)`);
          
          resolve({
            dataUrl: compressedDataUrl,
            originalSize,
            compressedSize,
            compressionRatio
          });
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  },

  render() {
    return `
      <div class="journal-container">
        <!-- Header -->
        <div class="premium-card journal-header-card">
          <div class="header-left">
            <h3>📸 Growth Journal</h3>
            <p>Document your plant's journey and compare snapshots chronologically.</p>
          </div>
          <div class="header-right">
            <span class="entry-count" id="journal-count-badge">0 Entries</span>
          </div>
        </div>

        <!-- Timeline Compare Dashboard -->
        <div class="premium-card" id="timeline-comparison-panel" style="background: linear-gradient(135deg, rgba(77, 106, 79, 0.04), rgba(200, 169, 126, 0.08)) !important;">
          <!-- Loaded dynamically in init() -->
        </div>

        <!-- Add Entry Form -->
        <div class="premium-card">
          <h3>🌱 Add Observation</h3>
          <div class="journal-form">
            <div class="form-group">
              <label>Select Plant</label>
              <select id="journal-plant-name-select" class="form-input" style="padding: 10px 14px;">
                <!-- Populated dynamically from care list + custom input option -->
              </select>
              <input type="text" id="journal-custom-plant" placeholder="Or type custom plant name..." class="form-input hidden" style="margin-top: 8px;">
            </div>
            
            <div class="form-group">
              <label>Observation Notes</label>
              <textarea id="journal-note" placeholder="How is your plant doing today? Sprouts? Leaves? Moisture levels?" class="form-textarea" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label>📷 Snapshot Photo</label>
              <div class="photo-upload-area" id="photo-upload-area">
                <input type="file" id="journal-photo-input" accept="image/*" style="display: none;">
                <button class="btn-secondary" onclick="document.getElementById('journal-photo-input').click()">
                  📷 Capture Photo
                </button>
                <span id="photo-preview-text" style="font-size: 12px; color: var(--text-muted); margin-left: 10px;">
                  High capacity IndexedDB storage active
                </span>
              </div>
              <div id="photo-preview-container" style="margin-top: 12px; display: none; position: relative; width: max-content;">
                <!-- Simulated Camera Guide overlay -->
                <div class="camera-grid-overlay" style="position: absolute; inset: 0; border: 2px dashed rgba(255,255,255,0.4); pointer-events: none; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); border-radius: var(--radius-md);">
                  <div style="border-right: 1px dashed rgba(255,255,255,0.25); border-bottom: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-right: 1px dashed rgba(255,255,255,0.25); border-bottom: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-bottom: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-right: 1px dashed rgba(255,255,255,0.25); border-bottom: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-right: 1px dashed rgba(255,255,255,0.25); border-bottom: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-bottom: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-right: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div style="border-right: 1px dashed rgba(255,255,255,0.25);"></div>
                  <div></div>
                </div>
                <img id="photo-preview" style="max-width: 100%; max-height: 200px; border-radius: var(--radius-md); object-fit: cover;">
                <button id="remove-photo-btn" class="btn-secondary" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 11px; background: rgba(0,0,0,0.6); color: white; border: none;">✕ Remove</button>
              </div>
            </div>
            
            <button id="save-journal-entry-btn" class="btn-primary" style="width: 100%; margin-top: 16px;">
              💾 Save Entry
            </button>
          </div>
        </div>

        <!-- Journal Entries Timeline -->
        <div class="premium-card">
          <h3>📖 Journal Stream</h3>
          <div id="journal-entries-viewport">
            <div style="text-align:center; padding:30px; color:var(--text-muted);">
              ⏳ Loading journal stream...
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    let selectedPhotoFile = null;

    // Load entries from DB
    const entries = await this.DB.getAll();
    
    // Cache count in localStorage for Stats Dashboard
    localStorage.setItem('botaniq_journal_count', entries.length);
    const countBadge = document.getElementById('journal-count-badge');
    if (countBadge) countBadge.innerText = `${entries.length} Entries`;

    // Populate plant dropdown selector
    const select = document.getElementById('journal-plant-name-select');
    const customInput = document.getElementById('journal-custom-plant');
    
    let gardenPlants = [];
    try {
      gardenPlants = JSON.parse(localStorage.getItem('botaniq_care_plants') || '[]');
    } catch(e) {}

    let selectHtml = '<option value="">-- Choose Plant --</option>';
    gardenPlants.forEach(p => {
      selectHtml += `<option value="${p.name}">${p.emoji || '🌿'} ${p.name}</option>`;
    });
    selectHtml += `<option value="__custom__">➕ Add Custom Name...</option>`;
    if (select) {
      select.innerHTML = selectHtml;
      select.addEventListener('change', (e) => {
        if (e.target.value === '__custom__') {
          customInput.classList.remove('hidden');
          customInput.required = true;
        } else {
          customInput.classList.add('hidden');
          customInput.required = false;
        }
      });
    }

    // Render entries list
    this.renderEntriesList(entries);

    // Render Timeline comparer
    this.renderTimelineComparer(entries);

    // Photo selection preview
    const photoInput = document.getElementById('journal-photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          selectedPhotoFile = file;
          const reader = new FileReader();
          reader.onload = (event) => {
            const preview = document.getElementById('photo-preview');
            const container = document.getElementById('photo-preview-container');
            const text = document.getElementById('photo-preview-text');
            
            if (preview && container && text) {
              preview.src = event.target.result;
              container.style.display = 'block';
              text.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Remove photo
    const removePhotoBtn = document.getElementById('remove-photo-btn');
    if (removePhotoBtn) {
      removePhotoBtn.addEventListener('click', () => {
        selectedPhotoFile = null;
        document.getElementById('journal-photo-input').value = '';
        document.getElementById('photo-preview-container').style.display = 'none';
        document.getElementById('photo-preview-text').textContent = 'High capacity IndexedDB storage active';
      });
    }

    // Save observation
    const saveBtn = document.getElementById('save-journal-entry-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const selectedVal = select.value;
        const customVal = customInput.value.trim();
        const plantName = selectedVal === '__custom__' ? customVal : selectedVal;
        const note = document.getElementById('journal-note').value.trim();

        if (!plantName || !note) {
          window.Botaniq.Notification.show('Please fill in a plant name and observation notes.', 'error');
          return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ Saving...';

        let photoDataUrl = null;
        let photoSize = 0;
        let ratio = '';

        if (selectedPhotoFile) {
          try {
            const comp = await this.compressImage(selectedPhotoFile, 650, 0.65);
            photoDataUrl = comp.dataUrl;
            photoSize = comp.compressedSize;
            ratio = comp.compressionRatio;
          } catch(err) {
            console.error(err);
          }
        }

        const newEntry = {
          id: Date.now().toString(),
          plantName,
          note,
          date: new Date().toISOString(),
          photo: photoDataUrl,
          photoSize,
          compressionRatio: ratio
        };

        await this.DB.put(newEntry);

        // Stats track
        try {
          const stats = JSON.parse(localStorage.getItem('botaniq_stats') || '{}');
          stats.journals_done = (stats.journals_done || 0) + 1;
          localStorage.setItem('botaniq_stats', JSON.stringify(stats));
        } catch(e){}

        window.Botaniq.XPManager.addXP(15);
        window.Botaniq.Notification.show('Journal observation entry saved! 📸', 'success');
        if (window.Botaniq.Achievements) window.Botaniq.Achievements.checkUnlocks();

        // Refresh screen
        window.Botaniq.Router.navigateTo('journal');
      });
    }
  },

  renderEntriesList(entries) {
    const viewport = document.getElementById('journal-entries-viewport');
    if (!viewport) return;

    if (entries.length === 0) {
      viewport.innerHTML = `
        <div style="text-align:center; padding:30px; color:var(--text-muted);">
          <span>📖</span>
          <p style="margin-top:8px;">No observations recorded yet. Plant your first seeds!</p>
        </div>
      `;
      return;
    }

    viewport.innerHTML = `
      <div class="journal-entries-list" style="display:flex; flex-direction:column; gap:16px; margin-top:10px;">
        ${entries.map(e => `
          <div class="journal-entry" style="background:var(--bg-input); border:1px solid var(--border-organic); padding:16px; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <strong style="color:var(--primary-forest); font-size:15px;">🌿 ${e.plantName}</strong>
              <span style="font-size:12px; color:var(--text-muted);">${new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            ${e.photo ? `
              <div style="margin:10px 0; position:relative;">
                <img src="${e.photo}" style="width:100%; max-height:220px; object-fit:cover; border-radius:var(--radius-sm); border:1px solid var(--border-organic);">
                ${e.compressionRatio ? `<span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.7); color:white; font-size:10px; padding:3px 6px; border-radius:4px;">Compressed ${e.compressionRatio}%</span>` : ''}
              </div>
            ` : ''}
            <p style="font-size:13.5px; line-height:1.5; color:var(--text-dark); margin:0;">${e.note}</p>
            <div style="display:flex; justify-content:flex-end; margin-top:10px;">
              <button class="delete-entry-db-btn" data-id="${e.id}" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:12px;">🗑️ Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Hook delete clicks
    document.querySelectorAll('.delete-entry-db-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (confirm('Delete this journal entry?')) {
          await this.DB.delete(id);
          window.Botaniq.Notification.show('Entry deleted', 'default');
          window.Botaniq.Router.navigateTo('journal');
        }
      });
    });
  },

  renderTimelineComparer(entries) {
    const panel = document.getElementById('timeline-comparison-panel');
    if (!panel) return;

    // Filter unique plant names that have photos in their logs
    const photoEntries = entries.filter(e => e.photo);
    const plantNames = [...new Set(photoEntries.map(e => e.plantName))];

    if (plantNames.length === 0) {
      panel.innerHTML = `
        <h3>📷 Plant Growth Timeline</h3>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.5; margin:0;">
          Create observation logs with photos to unlock the chronological progress comparison timeline! 
          Add at least 2 snapshot entries of the same plant.
        </p>
      `;
      return;
    }

    // Get selected target plant (default to first)
    let selectedPlant = localStorage.getItem('botaniq_timeline_selected_plant') || plantNames[0];
    if (!plantNames.includes(selectedPlant)) {
      selectedPlant = plantNames[0];
    }

    const filteredPhotos = photoEntries.filter(e => e.plantName === selectedPlant);
    // Sort chronological: oldest to newest
    filteredPhotos.sort((a, b) => new Date(a.date) - new Date(b.date));

    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-bottom:1px dashed var(--border-organic); padding-bottom:12px; margin-bottom:16px;">
        <h3 style="margin:0;">📷 Plant Growth Timeline</h3>
        <select id="timeline-plant-selector" style="width:auto; padding:6px 12px; background:var(--bg-card); font-size:13px; border-radius:var(--radius-sm);">
          ${plantNames.map(name => `
            <option value="${name}" ${name === selectedPlant ? 'selected' : ''}>${name}</option>
          `).join('')}
        </select>
      </div>

      <div id="timeline-photo-row-container">
        <!-- Render chronological flow -->
      </div>
    `;

    const rowContainer = document.getElementById('timeline-photo-row-container');
    if (!rowContainer) return;

    if (filteredPhotos.length < 2) {
      rowContainer.innerHTML = `
        <div style="font-size:13px; color:var(--text-muted); text-align:center; padding:20px 0;">
          📸 <strong>${selectedPlant}</strong> has ${filteredPhotos.length} photo log. 
          Upload at least 2 snapshot observations to compare changes over weeks or months!
        </div>
      `;
    } else {
      rowContainer.innerHTML = `
        <div class="timeline-comparison-flow" style="display:flex; align-items:center; gap:16px; overflow-x:auto; padding:12px 4px;">
          ${filteredPhotos.map((p, idx) => `
            <div class="timeline-compare-card" style="flex-shrink:0; width:150px; background:var(--bg-card); border:1px solid var(--border-organic); padding:10px; border-radius:var(--radius-md); text-align:center; position:relative;">
              <span style="position:absolute; top:-10px; left:12px; background:var(--primary-sage); color:white; font-size:10px; font-weight:700; padding:2px 8px; border-radius:50px; box-shadow:var(--shadow-soft);">
                Photo ${idx + 1}
              </span>
              <img src="${p.photo}" style="width:100%; height:110px; object-fit:cover; border-radius:var(--radius-sm); border:1px solid var(--border-organic); margin-top:6px; cursor:zoom-in;" class="timeline-img-zoom" data-src="${p.photo}">
              <div style="font-size:11.5px; font-weight:700; color:var(--text-dark); margin-top:8px;">
                ${new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div style="font-size:10px; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="${p.note}">
                ${p.note}
              </div>
            </div>
            ${idx !== filteredPhotos.length - 1 ? `
              <div style="font-size:24px; color:var(--primary-sage); font-weight:700; flex-shrink:0; display:flex; align-items:center; justify-content:center;">↓</div>
            ` : ''}
          `).join('')}
        </div>
      `;

      // Zoom photo lightbox trigger
      document.querySelectorAll('.timeline-img-zoom').forEach(img => {
        img.addEventListener('click', () => {
          this.openZoomLightbox(img.dataset.src);
        });
      });
    }

    // Dropdown change listener
    const selector = document.getElementById('timeline-plant-selector');
    if (selector) {
      selector.addEventListener('change', (e) => {
        localStorage.setItem('botaniq_timeline_selected_plant', e.target.value);
        this.renderTimelineComparer(entries);
      });
    }
  },

  openZoomLightbox(src) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.zIndex = '10000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.cursor = 'zoom-out';
    overlay.style.backdropFilter = 'blur(10px)';

    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = 'var(--radius-md)';
    img.style.border = '2px solid white';
    img.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener('click', close);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
  }
};
