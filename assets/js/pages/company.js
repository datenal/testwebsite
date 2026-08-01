/**
 * =========================
 * COMPANY.JS
 * Datenal Technologies
 * =========================
 * 
 * Shared functionality for About, Why Choose Us, Our Process, Careers.
 */

const Company = {
    // Initialize company pages
    init: function() {
        this.setupScrollAnimations();
        this.setupProcessTimeline();
        this.setupLeaderSlider();
    },
    
    // Setup scroll animations
    setupScrollAnimations: function() {
        // Process steps
        const steps = document.querySelectorAll('.process-step');
        if (steps.length) {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry, index) {
                        if (entry.isIntersecting) {
                            setTimeout(function() {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateX(0)';
                            }, index * 100);
                        }
                    });
                }, { threshold: 0.1 });
                
                steps.forEach(function(step, index) {
                    step.style.opacity = '0';
                    step.style.transform = 'translateX(20px)';
                    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(step);
                });
            }
        }
        
        // Features
        const features = document.querySelectorAll('.process-feature, .advantage-card, .promise-card');
        if (features.length) {
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
                
                features.forEach(function(feature, index) {
                    feature.style.opacity = '0';
                    feature.style.transform = 'translateY(20px)';
                    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(feature);
                });
            }
        }
        
        // Industry cards
        const industries = document.querySelectorAll('.industry-card');
        if (industries.length) {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry, index) {
                        if (entry.isIntersecting) {
                            setTimeout(function() {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'scale(1)';
                            }, index * 60);
                        }
                    });
                }, { threshold: 0.1 });
                
                industries.forEach(function(industry, index) {
                    industry.style.opacity = '0';
                    industry.style.transform = 'scale(0.95)';
                    industry.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    observer.observe(industry);
                });
            }
        }
    },
    
    // Setup process timeline
    setupProcessTimeline: function() {
        const timeline = document.querySelector('.process-timeline');
        if (!timeline) return;
        
        // Ensure lines connect properly
        const steps = timeline.querySelectorAll('.process-step');
        steps.forEach(function(step, index) {
            const line = step.querySelector('.step-line');
            if (line && index === steps.length - 1) {
                line.style.display = 'none';
            }
        });
    },
    
    // Setup leader slider (if present)
    setupLeaderSlider: function() {
        const slider = document.querySelector('.leader-slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.leader-slide');
        const prevBtn = slider.parentElement.querySelector('.prev');
        const nextBtn = slider.parentElement.querySelector('.next');
        let current = 0;
        
        if (!slides.length) return;
        
        function showSlide(index) {
            slides.forEach(function(slide) {
                slide.classList.remove('active');
            });
            slides[index].classList.add('active');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                current = (current + 1) % slides.length;
                showSlide(current);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                current = (current - 1 + slides.length) % slides.length;
                showSlide(current);
            });
        }
        
        // Auto-slide
        let autoSlide = setInterval(function() {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        
        slider.addEventListener('mouseleave', function() {
            autoSlide = setInterval(function() {
                current = (current + 1) % slides.length;
                showSlide(current);
            }, 5000);
        });
    }
};
