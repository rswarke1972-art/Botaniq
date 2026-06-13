/**
 * BOTANIQ - Mobile Navigation Module
 * Handles mobile-specific UI interactions and sidebar closing
 */
window.Botaniq.Mobile = {
  init() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    // Close mobile drawer when clicking nav links
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          if (sidebar) sidebar.classList.remove('active');
          if (backdrop) backdrop.classList.remove('active');
        }
      });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      const menuToggle = document.getElementById('mobile-menu-toggle');
      if (window.innerWidth <= 992 && sidebar && menuToggle && backdrop) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
          backdrop.classList.remove('active');
        }
      }
    });
  }
};

// Auto-run mobile events setup
window.addEventListener('DOMContentLoaded', () => {
  window.Botaniq.Mobile.init();
});
