/**
 * =========================
 * MODAL.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles modal and popup functionality.
 */

const Modal = {
    // Cache modals
    modals: [],
    
    // Initialize modals
    init: function() {
        this.modals = document.querySelectorAll('.modal, [data-modal]');
        this.modals.forEach(function(modal) {
            ModalHandler.init(modal);
        });
        
        this.setupTriggers();
    },
    
    // Setup modal triggers
    setupTriggers: function() {
        document.querySelectorAll('[data-modal-trigger]').forEach(function(trigger) {
            trigger.addEventListener('click', function() {
                const targetId = this.getAttribute('data-modal-trigger');
                const modal = document.getElementById(targetId);
                if (modal) {
                    ModalHandler.open(modal);
                }
            });
        });
    }
};

// Individual modal handler
const ModalHandler = {
    // Initialize modal
    init: function(modal) {
        this.modal = modal;
        this.setupCloseButtons();
        this.setupOverlayClose();
        this.setupEscapeKey();
    },
    
    // Setup close buttons
    setupCloseButtons: function() {
        const closeButtons = this.modal.querySelectorAll('.modal-close, [data-modal-close]');
        const self = this;
        closeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                self.close();
            });
        });
    },
    
    // Setup overlay click to close
    setupOverlayClose: function() {
        const self = this;
        this.modal.addEventListener('click', function(e) {
            if (e.target === this) {
                self.close();
            }
        });
    },
    
    // Setup escape key to close
    setupEscapeKey: function() {
        const self = this;
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && self.modal.classList.contains('active')) {
                self.close();
            }
        });
    },
    
    // Open modal
    open: function() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Focus trap
        const focusable = this.modal.querySelectorAll('button, a, input, select, textarea');
        if (focusable.length) {
            focusable[0].focus();
        }
    },
    
    // Close modal
    close: function() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.modal.setAttribute('aria-hidden', 'true');
    }
};
