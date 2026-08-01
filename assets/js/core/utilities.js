/**
 * =========================
 * UTILITIES.JS
 * Datenal Technologies
 * =========================
 * 
 * Shared helper functions used throughout the website.
 */

const Utilities = {
    // Initialize utilities
    init: function() {
        // Setup any global utility listeners
    },
    
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    },
    
    // Throttle function for performance
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    },
    
    // Format date
    formatDate: function(date) {
        const d = new Date(date);
        return d.toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Truncate text
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Validate email
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Validate phone number (South African format)
    validatePhone: function(phone) {
        return /^[\+\d\s\-\(\)]{8,20}$/.test(phone);
    },
    
    // Get URL parameters
    getUrlParams: function() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    },
    
    // Scroll to element with offset
    scrollToElement: function(element, offset) {
        offset = offset || 0;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    // Generate random ID
    generateId: function(prefix) {
        prefix = prefix || 'id';
        return prefix + '-' + Math.random().toString(36).substring(2, 9);
    },
    
    // Check if element is visible
    isElementVisible: function(element) {
        const rect = element.getBoundingClientRect();
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < viewHeight && rect.bottom > 0;
    },
    
    // Escape HTML entities
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
