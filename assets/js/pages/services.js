/**
 * =========================
 * SERVICES.JS
 * Datenal Technologies
 * =========================
 * 
 * Shared functionality for all service pages
 * (IT Support, Networking, Hardware, Website Development, Hosting).
 */

const Services = {
    // Initialize services page
    init: function() {
        this.setupPriceToggles();
        this.setupServiceFilter();
        this.setupScrollAnimations();
    },
    
    // Setup price toggles (monthly/yearly if implemented)
    setupPriceToggles: function() {
        const toggle = document.querySelector('.price-toggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                const isYearly = this.classList.toggle('active');
                document.querySelectorAll('.price-amount').forEach(function(el) {
                    const monthly = el.getAttribute('data-monthly');
                    const yearly = el.getAttribute('data-yearly');
                    if (monthly && yearly) {
                        el.textContent = isYearly ? yearly : monthly;
                    }
                });
            });
        }
    },
    
    // Setup service filter
    setupServiceFilter: function() {
        const filterBtns = document.querySelectorAll('.service-filter-btn');
        const serviceItems = document.querySelectorAll('.service-item');
        
        if (!filterBtns.length || !serviceItems.length) return;
        
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter items
                serviceItems.forEach(function(item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    },
    
    // Setup scroll animations
    setupScrollAnimations: function() {
        const items = document.querySelectorAll('.service-card, .pricing-card, .step-card, .why-card');
        if (!items.length) return;
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 60);
                    }
                });
            }, { threshold: 0.1 });
            
            items.forEach(function(item, index) {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(item);
            });
        }
    }
};
