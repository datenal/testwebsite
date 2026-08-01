/**
 * =========================
 * CONTACT.JS
 * Datenal Technologies
 * =========================
 * 
 * Contact page and Request Form functionality.
 */

const Contact = {
    // Initialize contact page
    init: function() {
        this.setupForm();
        this.setupOtherServiceToggle();
        this.setupFileUpload();
    },
    
    // Setup contact form
    setupForm: function() {
        const form = document.querySelector('#requestForm, .contact-form');
        if (!form) return;
        
        // Form is handled by Forms component
        // This is just for additional contact-specific logic
    },
    
    // Setup "Other" service toggle
    setupOtherServiceToggle: function() {
        const serviceSelect = document.getElementById('service');
        const otherContainer = document.getElementById('otherServiceContainer');
        const otherInput = document.getElementById('otherService');
        
        if (!serviceSelect || !otherContainer) return;
        
        serviceSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherContainer.style.display = 'block';
                if (otherInput) {
                    otherInput.setAttribute('required', 'required');
                }
            } else {
                otherContainer.style.display = 'none';
                if (otherInput) {
                    otherInput.removeAttribute('required');
                    otherInput.value = '';
                }
            }
        });
    },
    
    // Setup file upload for contact form
    setupFileUpload: function() {
        // Reuse the file upload from Support module
        if (typeof Support !== 'undefined' && Support.setupFileUpload) {
            Support.setupFileUpload();
        }
    },
    
    // Reset form (for "Submit Another Request")
    resetForm: function() {
        const form = document.querySelector('#requestForm');
        const formContainer = document.querySelector('.form-card');
        const successMessage = document.querySelector('.success-message');
        
        if (form) {
            form.reset();
            form.style.display = 'block';
        }
        
        if (successMessage) {
            successMessage.classList.remove('visible');
        }
        
        // Reset file list
        const fileList = document.querySelector('.file-list');
        if (fileList) {
            fileList.innerHTML = '';
        }
        
        // Reset other service
        const otherContainer = document.getElementById('otherServiceContainer');
        if (otherContainer) {
            otherContainer.style.display = 'none';
        }
        
        // Clear errors
        document.querySelectorAll('.error').forEach(function(el) {
            el.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(function(el) {
            el.classList.remove('visible');
        });
        
        if (formContainer) {
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};
