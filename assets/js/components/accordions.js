/**
 * =========================
 * ACCORDIONS.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles FAQ and accordion functionality.
 */

const Accordions = {
    // Cache accordion containers
    containers: [],
    
    // Initialize all accordions
    init: function() {
        this.containers = document.querySelectorAll('.faq-container, .accordion-container');
        this.containers.forEach(function(container) {
            AccordionHandler.init(container);
        });
        
        // Also handle standalone FAQ items (for FAQ grid)
        this.setupStandaloneFaqs();
    },
    
    // Setup standalone FAQ items (not inside a container)
    setupStandaloneFaqs: function() {
        const faqItems = document.querySelectorAll('.faq-item:not(.faq-container .faq-item)');
        faqItems.forEach(function(item) {
            AccordionHandler.setupItem(item);
        });
    }
};

// Individual accordion handler
const AccordionHandler = {
    // Initialize accordion container
    init: function(container) {
        this.container = container;
        this.items = container.querySelectorAll('.faq-item');
        this.setupItems();
    },
    
    // Setup all items in container
    setupItems: function() {
        const self = this;
        this.items.forEach(function(item) {
            self.setupItem(item);
        });
    },
    
    // Setup a single accordion item
    setupItem: function(item) {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!button || !answer) return;
        
        // Ensure answer starts closed
        answer.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        
        // Click handler
        button.addEventListener('click', function(e) {
            const isOpen = answer.classList.contains('open');
            const container = item.closest('.faq-container') || item.parentElement;
            
            // Close all items in the same container
            const siblings = container ? container.querySelectorAll('.faq-item') : [];
            siblings.forEach(function(sibling) {
                const siblingButton = sibling.querySelector('.faq-question');
                const siblingAnswer = sibling.querySelector('.faq-answer');
                if (siblingAnswer) {
                    siblingAnswer.classList.remove('open');
                }
                if (siblingButton) {
                    siblingButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle clicked item
            if (!isOpen) {
                answer.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
};
