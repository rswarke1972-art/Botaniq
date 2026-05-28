/**
 * BOTANIQ - Mobile Navigation Module
 * Handles mobile-specific UI interactions
 */
window.Botaniq.Mobile = {
  init() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('mobile-open');
        }
      }
    });

    // Bottom navigation handling
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
      item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        window.Botaniq.Router.navigateTo(screen);
      });
    });
  }
};
