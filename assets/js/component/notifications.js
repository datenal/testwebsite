/**
 * =========================
 * NOTIFICATIONS.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles success, error, warning, and info notifications.
 */

const Notifications = {
    // Notification container
    container: null,
    
    // Initialize notifications
    init: function() {
        this.container = document.getElementById('notification-container');
        if (!this.container) {
            this.createContainer();
        }
    },
    
    // Create notification container if not exists
    createContainer: function() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    },
    
    // Show notification
    show: function(message, type, duration) {
        type = type || 'info';
        duration = duration || 5000;
        
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.setAttribute('role', 'alert');
        notification.style.cssText = `
            pointer-events: auto;
            padding: 14px 20px;
            border-radius: 5px;
            background: ${this.getBackgroundColor(type)};
            color: ${this.getTextColor(type)};
            border: 1px solid ${this.getBorderColor(type)};
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            font-size: 14px;
            line-height: 1.5;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            float: right;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: inherit;
            opacity: 0.6;
            margin-left: 12px;
        `;
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        notification.appendChild(closeBtn);
        notification.appendChild(document.createTextNode(message));
        
        this.container.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, duration);
    },
    
    // Success notification
    success: function(message, duration) {
        this.show(message, 'success', duration);
    },
    
    // Error notification
    error: function(message, duration) {
        this.show(message, 'error', duration);
    },
    
    // Warning notification
    warning: function(message, duration) {
        this.show(message, 'warning', duration);
    },
    
    // Info notification
    info: function(message, duration) {
        this.show(message, 'info', duration);
    },
    
    // Get background color by type
    getBackgroundColor: function(type) {
        const colors = {
            success: '#d1fae5',
            error: '#fee2e2',
            warning: '#fef3c7',
            info: '#dbeafe'
        };
        return colors[type] || colors.info;
    },
    
    // Get text color by type
    getTextColor: function(type) {
        const colors = {
            success: '#065f46',
            error: '#991b1b',
            warning: '#92400e',
            info: '#1e40af'
        };
        return colors[type] || colors.info;
    },
    
    // Get border color by type
    getBorderColor: function(type) {
        const colors = {
            success: '#a7f3d0',
            error: '#fecaca',
            warning: '#fde68a',
            info: '#bfdbfe'
        };
        return colors[type] || colors.info;
    }
};

// Add animation keyframes if not already present
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();
