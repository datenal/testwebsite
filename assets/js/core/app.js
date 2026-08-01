/**
 * =========================
 * APP.JS - APPLICATION CORE
 * Datenal Technologies
 * =========================
 * 
 * Handles global application initialization and state management.
 */

const AppCore = {
    // Application state
    state: {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        currentPage: '',
        breakpoints: {
            mobile: 600,
            tablet: 900,
            desktop: 1024
        }
    },
    
    // Initialize application
    init: function() {
        this.detectDevice();
        this.detectPage();
        this.setupEventListeners();
    },
    
    // Detect device type based on viewport
    detectDevice: function() {
        const width = window.innerWidth;
        this.state.isMobile = width < this.state.breakpoints.mobile;
        this.state.isTablet = width >= this.state.breakpoints.mobile && width < this.state.breakpoints.desktop;
        this.state.isDesktop = width >= this.state.breakpoints.desktop;
    },
    
    // Detect current page from body ID or class
    detectPage: function() {
        const body = document.body;
        if (body.id) {
            this.state.currentPage = body.id;
        } else {
            const classes = body.className.split(' ');
            for (let cls of classes) {
                if (cls.startsWith('page-')) {
                    this.state.currentPage = cls.replace('page-', '');
                    break;
                }
            }
        }
    },
    
    // Setup global event listeners
    setupEventListeners: function() {
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                AppCore.detectDevice();
            }, 250);
        });
    },
    
    // Helper: Check if element is in viewport
    isInViewport: function(element, offset) {
        offset = offset || 0;
        const rect = element.getBoundingClientRect();
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= viewHeight - offset && rect.bottom >= 0;
    }
};
