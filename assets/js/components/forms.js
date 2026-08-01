/**
 * =========================
 * FORMS.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles form validation, submission, and input behavior.
 */

const Forms = {
    // Cache forms
    forms: [],
    
    // Initialize forms
    init: function() {
        this.forms = document.querySelectorAll('form[data-validate]');
        this.forms.forEach(function(form) {
            FormHandler.init(form);
        });
    },
    
    // Validate a single field
    validateField: function(field) {
        const form = field.closest('form');
        if (!form) return true;
        return FormHandler.validateField(field);
    }
};

// Individual form handler
const FormHandler = {
    // Initialize form
    init: function(form) {
        this.form = form;
        this.setupValidation();
        this.setupSubmission();
        this.setupRealTimeValidation();
    },
    
    // Setup validation rules
    setupValidation: function() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        fields.forEach(function(field) {
            if (field.hasAttribute('required') || field.hasAttribute('data-validate')) {
                field.setAttribute('aria-required', 'true');
            }
        });
    },
    
    // Setup form submission
    setupSubmission: function() {
        const self = this;
        this.form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (self.validateForm()) {
                self.submitForm();
            }
        });
    },
    
    // Setup real-time validation
    setupRealTimeValidation: function() {
        const self = this;
        const fields = this.form.querySelectorAll('input, select, textarea');
        fields.forEach(function(field) {
            field.addEventListener('blur', function() {
                self.validateField(field);
            });
            field.addEventListener('input', function() {
                if (field.classList.contains('error')) {
                    self.validateField(field);
                }
            });
        });
    },
    
    // Validate entire form
    validateForm: function() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        fields.forEach(function(field) {
            if (!FormHandler.validateField(field)) {
                isValid = false;
            }
        });
        
        // Check privacy consent if present
        const privacyCheck = this.form.querySelector('#privacyConsent');
        if (privacyCheck && !privacyCheck.checked) {
            FormHandler.showFieldError(privacyCheck, 'Please agree to the privacy policy.');
            isValid = false;
        }
        
        return isValid;
    },
    
    // Validate a single field
    validateField: function(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        const errorMessage = field.dataset.error || field.getAttribute('data-error');
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Check required
        if (required && !value) {
            this.showFieldError(field, errorMessage || 'This field is required.');
            return false;
        }
        
        // Skip validation if field is empty and not required
        if (!required && !value) {
            return true;
        }
        
        // Type-specific validation
        let isValid = true;
        let message = '';
        
        switch (type) {
            case 'email':
                if (!Utilities.validateEmail(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address.';
                }
                break;
            case 'tel':
                if (!Utilities.validatePhone(value)) {
                    isValid = false;
                    message = 'Please enter a valid phone number.';
                }
                break;
            case 'url':
                try {
                    new URL(value);
                } catch (e) {
                    isValid = false;
                    message = 'Please enter a valid URL.';
                }
                break;
            case 'number':
                if (isNaN(value) || value < 1) {
                    isValid = false;
                    message = 'Please enter a valid number.';
                }
                break;
            default:
                // Text validation - check minimum length
                const minLength = field.getAttribute('minlength');
                if (minLength && value.length < parseInt(minLength)) {
                    isValid = false;
                    message = 'Please enter at least ' + minLength + ' characters.';
                }
                break;
        }
        
        if (!isValid) {
            this.showFieldError(field, message || 'Please enter a valid value.');
            return false;
        }
        
        return true;
    },
    
    // Show field error
    showFieldError: function(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        // Find or create error message container
        let errorEl = field.parentElement.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
        errorEl.classList.add('visible');
        errorEl.setAttribute('role', 'alert');
    },
    
    // Clear field error
    clearFieldError: function(field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        
        const errorEl = field.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.classList.remove('visible');
            errorEl.textContent = '';
        }
    },
    
    // Submit form
    submitForm: function() {
        const form = this.form;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Disable submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }
        
        // Simulate submission (replace with actual AJAX)
        setTimeout(function() {
            // Show success message
            const formContainer = form.closest('.form-card') || form.parentElement;
            if (formContainer) {
                const successMessage = formContainer.querySelector('.success-message');
                if (successMessage) {
                    form.style.display = 'none';
                    successMessage.classList.add('visible');
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Request';
            }
        }, 1500);
    }
};
