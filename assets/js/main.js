/**
 * =========================
 * MAIN.JS - ENTRY POINT
 * Datenal Technologies
 * =========================
 * 
 * This file serves as the central JavaScript entry point.
 * It initializes all core functionality and page-specific modules.
 */

(function() {
    'use strict';

    // =========================
    // CORE MODULES
    // =========================
    const App = {
        // Initialize everything
        init: function() {
            // Core functionality (always loaded)
            Navigation.init();
            Utilities.init();
            
            // Component functionality (always loaded)
            Accordions.init();
            
            // Page-specific functionality
            this.initPageModules();
            
            // Theme (future-ready)
            Theme.init();
        },
        
        // Initialize page-specific modules based on body ID or class
        initPageModules: function() {
            const body = document.body;
            
            // Homepage
            if (body.id === 'home' || body.classList.contains('page-home')) {
                if (typeof Home !== 'undefined') Home.init();
            }
            
            // Services pages (IT Support, Networking, etc.)
            if (body.classList.contains('page-services') || 
                body.id === 'services' ||
                body.classList.contains('page-it-support') ||
                body.classList.contains('page-networking') ||
                body.classList.contains('page-hardware') ||
                body.classList.contains('page-website-development') ||
                body.classList.contains('page-hosting')) {
                if (typeof Services !== 'undefined') Services.init();
            }
            
            // Support / Help Center
            if (body.id === 'support' || body.classList.contains('page-support')) {
                if (typeof Support !== 'undefined') Support.init();
            }
            
            // Company pages (About, Process, Why Choose Us)
            if (body.id === 'about' || 
                body.id === 'process' || 
                body.id === 'why-choose' ||
                body.classList.contains('page-company')) {
                if (typeof Company !== 'undefined') Company.init();
            }
            
            // Contact / Request Form
            if (body.id === 'contact' || 
                body.id === 'request-form' ||
                body.classList.contains('page-contact')) {
                if (typeof Contact !== 'undefined') Contact.init();
            }
            
            // Legal pages (Privacy Policy, Terms)
            if (body.classList.contains('page-legal')) {
                if (typeof Legal !== 'undefined') Legal.init();
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', App.init);
    } else {
        App.init();
    }

})();
