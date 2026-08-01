/**
 * =========================
 * LOADING.JS
 * Datenal Technologies
 * =========================
 * 
 * Handles loading indicators, spinners, and page loading behavior.
 */

const Loading = {
    // Loading overlay
    overlay: null,
    
    // Initialize loading
    init: function() {
        this.createOverlay();
        this.setupPageLoad();
    },
    
    // Create loading overlay
    createOverlay: function() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'loading-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            z-index: 99999;
            display: none;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        `;
        
        // Spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 4px solid #e5e7eb;
            border-top-color: #0A3D91;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        `;
        
        // Label
        const label = document.createElement('p');
        label.textContent = 'Loading...';
        label.style.cssText = `
            margin-top: 20px;
            color: #667085;
            font-size: 14px;
        `;
        
        this.overlay.appendChild(spinner);
        this.overlay.appendChild(label);
        document.body.appendChild(this.overlay);
        
        // Add keyframe for spinner
        if (!document.getElementById('spinner-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spinner-keyframes';
            style.textContent = `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // Setup page load behavior
    setupPageLoad: function() {
        // Show loading on page navigation
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href]');
            if (link && link.href && !link.href.startsWith('#') && !link.target) {
                // Only show for internal links
                const currentOrigin = window.location.origin;
                if (link.href.startsWith(currentOrigin)) {
                    Loading.show();
                }
            }
        });
        
        // Hide loading when page is fully loaded
        window.addEventListener('load', function() {
            Loading.hide();
        });
    },
    
    // Show loading overlay
    show: function() {
        if (this.overlay) {
            this.overlay.style.display = 'flex';
        }
    },
    
    // Hide loading overlay
    hide: function() {
        if (this.overlay) {
            this.overlay.style.display = 'none';
        }
    }
};
