/**
 * =========================
 * THEME.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles theme management including dark/light mode
 * and future theming capabilities.
 */

const Theme = {
    // Current theme state
    state: {
        currentTheme: 'light',
        availableThemes: ['light', 'dark']
    },
    
    // Initialize theme
    init: function() {
        this.loadThemePreference();
        this.setupThemeToggle();
    },
    
    // Load saved theme preference
    loadThemePreference: function() {
        const savedTheme = localStorage.getItem('datenal-theme');
        if (savedTheme && this.state.availableThemes.includes(savedTheme)) {
            this.setTheme(savedTheme);
        } else {
            // Default to light or system preference
            this.setTheme('light');
        }
    },
    
    // Set theme
    setTheme: function(theme) {
        if (!this.state.availableThemes.includes(theme)) return;
        
        this.state.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('datenal-theme', theme);
        
        // Dispatch event for other modules
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
    },
    
    // Toggle theme
    toggleTheme: function() {
        const newTheme = this.state.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },
    
    // Setup theme toggle button
    setupThemeToggle: function() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                Theme.toggleTheme();
            });
        }
    },
    
    // Get current theme
    getCurrentTheme: function() {
        return this.state.currentTheme;
    }
};
