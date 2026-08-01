/**
 * =========================
 * HOME.JS
 * Datenal Technologies
 * =========================
 * 
 * Homepage-specific functionality.
 */

const Home = {
    // Initialize homepage
    init: function() {
        this.setupCounterAnimation();
        this.setupScrollAnimations();
    },
    
    // Setup counter animation for stats
    setupCounterAnimation: function() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;
        
        let animated = false;
        
        const animateCounters = function() {
            if (animated) return;
            
            counters.forEach(function(counter) {
                const rect = counter.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animated = true;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = Math.max(1, Math.floor(target / 60));
                    let current = 0;
                    
                    const updateCounter = function() {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                            return;
                        }
                        counter.textContent = current;
                        requestAnimationFrame(updateCounter);
                    };
                    
                    updateCounter();
                }
            });
        };
        
        // Run on scroll with debounce
        const debouncedAnimate = Utilities.debounce(animateCounters, 100);
        window.addEventListener('scroll', debouncedAnimate);
        window.addEventListener('resize', debouncedAnimate);
        
        // Also check on load
        setTimeout(animateCounters, 500);
    },
    
    // Setup scroll animations for cards
    setupScrollAnimations: function() {
        const cards = document.querySelectorAll('.advantage-card, .service-card, .value-card, .why-card');
        if (!cards.length) return;
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 80);
                    }
                });
            }, { threshold: 0.1 });
            
            cards.forEach(function(card, index) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(25px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
    }
};
