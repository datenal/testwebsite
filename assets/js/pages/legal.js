/**
 * =========================
 * LEGAL.JS
 * Datenal Technologies
 * =========================
 * 
 * Functionality for Privacy Policy and Terms & Conditions pages.
 */

const Legal = {
    // Initialize legal pages
    init: function() {
        this.setupScrollToTop();
        this.setupAnchorLinks();
        this.setupPrintStyles();
    },
    
    // Setup scroll to top button
    setupScrollToTop: function() {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (!scrollBtn) return;
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
    },
    
    // Setup anchor links within legal documents
    setupAnchorLinks: function() {
        const links = document.querySelectorAll('.legal-content a[href^="#"]');
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    // Setup print styles
    setupPrintStyles: function() {
        const printBtn = document.querySelector('.print-page');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                window.print();
            });
        }
    }
};
