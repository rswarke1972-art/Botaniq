/**
 * BOTANIQ - Growth Journal Module with Photo Compression
 * Cozy plant growth tracking with optimized storage
 */
window.Botaniq.Journal = {
  entries: [],

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
          
          // Calculate new dimensions maintaining aspect ratio
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress and convert to base64
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          
          // Calculate compression ratio
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

  // Check localStorage capacity
  checkStorageCapacity() {
    try {
      const testKey = 'botaniq_storage_test';
      const testData = 'x'.repeat(1024 * 1024); // 1MB test
      localStorage.setItem(testKey, testData);
      localStorage.removeItem(testKey);
      return { hasSpace: true, available: 'Unknown' };
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        return { hasSpace: false, available: 'Full' };
      }
      return { hasSpace: true, available: 'Unknown' };
    }
  },

  // Get journal entries from localStorage
  getEntries() {
    try {
      const saved = localStorage.getItem('botaniq_journal_entries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading journal entries:', e);
      return [];
    }
  },

  // Save journal entries to localStorage
  saveEntries(entries) {
    try {
      const storageCheck = this.checkStorageCapacity();
      if (!storageCheck.hasSpace) {
        window.Botaniq.Notification.show('Storage full! Please delete old entries.', 'error');
        return false;
      }
      
      localStorage.setItem('botaniq_journal_entries', JSON.stringify(entries));
      return true;
    } catch (e) {
      console.error('Error saving journal entries:', e);
      if (e.name === 'QuotaExceededError') {
        window.Botaniq.Notification.show('Storage full! Please delete old entries.', 'error');
      }
      return false;
    }
  },

  // Add new journal entry
  async addEntry(plantName, note, photoFile = null) {
    const entry = {
      id: Date.now().toString(),
      plantName,
      note,
      date: new Date().toISOString(),
      photo: null,
      photoSize: 0
    };

    if (photoFile) {
      try {
        const compressed = await this.compressImage(photoFile, 600, 0.65);
        entry.photo = compressed.dataUrl;
        entry.photoSize = compressed.compressedSize;
        entry.compressionRatio = compressed.compressionRatio;
      } catch (e) {
        console.error('Error compressing photo:', e);
        window.Botaniq.Notification.show('Error processing photo', 'error');
        return null;
      }
    }

    const entries = this.getEntries();
    entries.unshift(entry); // Add to beginning
    
    if (this.saveEntries(entries)) {
      window.Botaniq.XPManager.addXP(15);
      window.Botaniq.Notification.show('Journal entry saved! +15 XP 📸', 'achievement');
      return entry;
    }
    
    return null;
  },

  // Delete journal entry
  deleteEntry(entryId) {
    const entries = this.getEntries();
    const filtered = entries.filter(e => e.id !== entryId);
    
    if (this.saveEntries(filtered)) {
      window.Botaniq.Notification.show('Entry deleted', 'info');
      return true;
    }
    return false;
  },

  render() {
    const entries = this.getEntries();
    const storageCheck = this.checkStorageCapacity();

    return `
      <div class="journal-container">
        <!-- Header -->
        <div class="premium-card journal-header-card">
          <div class="header-left">
            <h3>📸 Growth Journal</h3>
            <p>Document your plant's journey through the seasons.</p>
          </div>
          <div class="header-right">
            <span class="entry-count">${entries.length} Entries</span>
            ${!storageCheck.hasSpace ? '<span class="storage-warning">⚠️ Storage Full</span>' : ''}
          </div>
        </div>

        <!-- Add Entry Form -->
        <div class="premium-card">
          <h3>🌱 New Entry</h3>
          <div class="journal-form">
            <div class="form-group">
              <label>Plant Name</label>
              <input type="text" id="journal-plant-name" placeholder="e.g., My Monstera" class="form-input">
            </div>
            
            <div class="form-group">
              <label>Today's Observation</label>
              <textarea id="journal-note" placeholder="How is your plant doing today? New leaves? Flowers?" class="form-textarea" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label>📷 Add Photo (Optional)</label>
              <div class="photo-upload-area" id="photo-upload-area">
                <input type="file" id="journal-photo-input" accept="image/*" style="display: none;">
                <button class="btn-secondary" onclick="document.getElementById('journal-photo-input').click()">
                  📷 Choose Photo
                </button>
                <span id="photo-preview-text" style="font-size: 12px; color: var(--text-muted); margin-left: 10px;">
                  Photos are auto-compressed to save space
                </span>
              </div>
              <div id="photo-preview-container" style="margin-top: 12px; display: none;">
                <img id="photo-preview" style="max-width: 100%; max-height: 200px; border-radius: var(--radius-md); object-fit: cover;">
                <button id="remove-photo-btn" class="btn-secondary" style="margin-top: 8px; padding: 6px 12px; font-size: 12px;">✕ Remove</button>
              </div>
            </div>
            
            <button id="save-journal-entry-btn" class="btn-primary" style="width: 100%; margin-top: 16px;">
              💾 Save Entry
            </button>
          </div>
        </div>

        <!-- Journal Entries -->
        <div class="premium-card">
          <h3>📖 Your Journey</h3>
          ${entries.length === 0 ? `
            <div class="empty-journal">
              <span>🌱</span>
              <p>No entries yet. Start documenting your plant's growth!</p>
            </div>
          ` : `
            <div class="journal-entries-list">
              ${entries.map(entry => `
                <div class="journal-entry" data-entry-id="${entry.id}">
                  <div class="entry-header">
                    <div class="entry-plant">${entry.plantName}</div>
                    <div class="entry-date">${new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                  ${entry.photo ? `
                    <div class="entry-photo">
                      <img src="${entry.photo}" alt="Plant photo" loading="lazy">
                      ${entry.compressionRatio ? `<span class="compression-badge">Compressed ${entry.compressionRatio}%</span>` : ''}
                    </div>
                  ` : ''}
                  <div class="entry-note">${entry.note}</div>
                  <button class="delete-entry-btn" data-entry-id="${entry.id}">🗑️ Delete</button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  init() {
    let selectedPhotoFile = null;

    // Photo input handler
    const photoInput = document.getElementById('journal-photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          selectedPhotoFile = file;
          
          // Show preview
          const reader = new FileReader();
          reader.onload = (event) => {
            const preview = document.getElementById('photo-preview');
            const container = document.getElementById('photo-preview-container');
            const text = document.getElementById('photo-preview-text');
            
            preview.src = event.target.result;
            container.style.display = 'block';
            text.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Remove photo button
    const removePhotoBtn = document.getElementById('remove-photo-btn');
    if (removePhotoBtn) {
      removePhotoBtn.addEventListener('click', () => {
        selectedPhotoFile = null;
        document.getElementById('journal-photo-input').value = '';
        document.getElementById('photo-preview-container').style.display = 'none';
        document.getElementById('photo-preview-text').textContent = 'Photos are auto-compressed to save space';
      });
    }

    // Save entry button
    const saveBtn = document.getElementById('save-journal-entry-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const plantName = document.getElementById('journal-plant-name').value.trim();
        const note = document.getElementById('journal-note').value.trim();
        
        if (!plantName || !note) {
          window.Botaniq.Notification.show('Please fill in plant name and note', 'error');
          return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ Saving...';

        const entry = await this.addEntry(plantName, note, selectedPhotoFile);
        
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Save Entry';
        
        if (entry) {
          // Clear form
          document.getElementById('journal-plant-name').value = '';
          document.getElementById('journal-note').value = '';
          selectedPhotoFile = null;
          document.getElementById('journal-photo-input').value = '';
          document.getElementById('photo-preview-container').style.display = 'none';
          document.getElementById('photo-preview-text').textContent = 'Photos are auto-compressed to save space';
          
          // Refresh view
          window.Botaniq.Router.navigateTo('journal');
        }
      });
    }

    // Delete entry buttons
    document.querySelectorAll('.delete-entry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const entryId = btn.dataset.entryId;
        if (confirm('Delete this journal entry?')) {
          if (this.deleteEntry(entryId)) {
            window.Botaniq.Router.navigateTo('journal');
          }
        }
      });
    });
  }
};

// Journal-specific styles
const journalStyle = document.createElement('style');
journalStyle.innerHTML = `
  .journal-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .journal-header-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, rgba(139,168,136,0.1), rgba(200,169,126,0.15)) !important;
  }
  .entry-count {
    background: var(--primary-sage);
    color: white;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
  }
  .storage-warning {
    background: #E29E9E;
    color: white;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 8px;
  }
  
  .journal-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .form-group label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark);
  }
  .form-input, .form-textarea {
    background: var(--bg-input);
    border: 1px solid var(--border-organic);
    padding: 12px 16px;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-dark);
    transition: var(--transition-fast);
  }
  .form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--primary-sage);
    box-shadow: 0 0 0 3px rgba(139,168,136,0.1);
  }
  .form-textarea {
    resize: vertical;
    min-height: 80px;
  }
  .photo-upload-area {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .empty-journal {
    text-align: center;
    padding: 40px;
    color: var(--text-muted);
  }
  .empty-journal span {
    font-size: 48px;
    margin-bottom: 12px;
    display: block;
  }
  
  .journal-entries-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
  }
  .journal-entry {
    background: var(--bg-input);
    border: 1px solid var(--border-organic);
    padding: 16px;
    border-radius: var(--radius-md);
    position: relative;
  }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .entry-plant {
    font-weight: 600;
    color: var(--primary-forest);
    font-size: 15px;
  }
  .entry-date {
    font-size: 12px;
    color: var(--text-muted);
  }
  .entry-photo {
    margin-bottom: 12px;
    position: relative;
  }
  .entry-photo img {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border-radius: var(--radius-md);
  }
  .compression-badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: 11px;
  }
  .entry-note {
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-dark);
    margin-bottom: 12px;
  }
  .delete-entry-btn {
    background: transparent;
    border: 1px solid var(--border-organic);
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--text-muted);
    transition: var(--transition-fast);
  }
  .delete-entry-btn:hover {
    background: #E29E9E;
    color: white;
    border-color: #E29E9E;
  }

  @media (max-width: 768px) {
    .journal-form button {
      min-height: 48px;
      font-size: 15px;
    }
    .photo-upload-area {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
document.head.appendChild(journalStyle);
