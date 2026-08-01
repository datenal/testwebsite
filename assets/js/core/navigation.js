/**
 * =========================
 * NAVIGATION.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles navigation menu, mobile menu, active links,
 * sticky header, and scroll behavior.
 */

const Navigation = {
    // Cache DOM elements
    elements: {
        header: null,
        nav: null,
        menuToggle: null,
        navLinks: null,
        activeClass: 'active'
    },
    
    // Initialize navigation
    init: function() {
        this.cacheElements();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupStickyHeader();
        this.setupSmoothScroll();
        this.setupDropdowns();
    },
    
    // Cache DOM elements
    cacheElements: function() {
        this.elements.header = document.querySelector('header');
        this.elements.nav = document.getElementById('mainNav');
        this.elements.menuToggle = document.getElementById('menuToggle');
        this.elements.navLinks = document.querySelectorAll('nav a');
    },
    
    // Setup mobile menu toggle
    setupMobileMenu: function() {
        const toggle = this.elements.menuToggle;
        const nav = this.elements.nav;
        
        if (!toggle || !nav) return;
        
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = toggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        this.elements.navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = toggle.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    },
    
    // Setup active link highlighting
    setupActiveLinks: function() {
        const currentPath = window.location.pathname;
        this.elements.navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && currentPath.endsWith(href) || 
                (href === '#' && currentPath.endsWith('/'))) {
                link.classList.add('active');
            }
        });
    },
    
    // Setup sticky header behavior
    setupStickyHeader: function() {
        const header = this.elements.header;
        if (!header) return;
        
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    },
    
    // Setup smooth scroll for anchor links
    setupSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    // Setup dropdown menus (for future use)
    setupDropdowns: function() {
        // Placeholder for dropdown functionality
        // To be implemented if dropdown menus are added
    }
};
