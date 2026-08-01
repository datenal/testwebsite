/**
 * =========================
 * SUPPORT.JS
 * Datenal Technologies
 * =========================
 * 
 * Shared functionality for Help Centre, FAQ, Resources, and Remote Support.
 */

const Support = {
    // Initialize support page
    init: function() {
        this.setupSearch();
        this.setupSearchTags();
        this.setupFileUpload();
    },
    
    // Setup search functionality
    setupSearch: function() {
        const searchBox = document.querySelector('.search-box input');
        const searchBtn = document.querySelector('.search-box button');
        
        if (!searchBox) return;
        
        // Search on button click
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                Support.performSearch(searchBox.value);
            });
        }
        
        // Search on Enter key
        searchBox.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                Support.performSearch(this.value);
            }
        });
    },
    
    // Perform search
    performSearch: function(query) {
        query = query.trim();
        if (!query) {
            Notifications.info('Please enter a search term.');
            return;
        }
        
        // In production, this would redirect to search results
        Notifications.info('Searching for: "' + query + '"');
        
        // Simulate search - filter articles
        const articles = document.querySelectorAll('.article-card');
        let found = 0;
        
        articles.forEach(function(article) {
            const text = article.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                article.style.display = 'block';
                found++;
            } else {
                article.style.display = 'none';
            }
        });
        
        if (found === 0) {
            Notifications.info('No articles found for "' + query + '". Try a different search term.');
        } else {
            Notifications.success('Found ' + found + ' article(s) for "' + query + '".');
        }
    },
    
    // Setup search tags
    setupSearchTags: function() {
        const tags = document.querySelectorAll('.search-tag');
        const searchInput = document.querySelector('.search-box input');
        
        if (!tags.length || !searchInput) return;
        
        tags.forEach(function(tag) {
            tag.addEventListener('click', function() {
                searchInput.value = this.textContent.trim();
                Support.performSearch(searchInput.value);
            });
        });
    },
    
    // Setup file upload for support forms
    setupFileUpload: function() {
        const dropZones = document.querySelectorAll('.file-upload-wrapper');
        
        dropZones.forEach(function(dropZone) {
            const fileInput = dropZone.querySelector('input[type="file"]');
            const fileList = dropZone.parentElement.querySelector('.file-list');
            
            if (!fileInput) return;
            
            // Click to upload
            dropZone.addEventListener('click', function(e) {
                if (e.target.closest('.file-list')) return;
                fileInput.click();
            });
            
            // Drag and drop
            dropZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = '#0A3D91';
                this.style.background = '#edf5ff';
            });
            
            dropZone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.style.borderColor = '#d1d5db';
                this.style.background = 'white';
            });
            
            dropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = '#d1d5db';
                this.style.background = 'white';
                const files = e.dataTransfer.files;
                Support.handleFiles(files, fileList);
            });
            
            fileInput.addEventListener('change', function() {
                Support.handleFiles(this.files, fileList);
            });
        });
    },
    
    // Handle file upload
    handleFiles: function(files, fileList) {
        if (!fileList) return;
        
        for (let file of files) {
            const tag = document.createElement('span');
            tag.className = 'file-tag';
            const size = (file.size / 1024).toFixed(0);
            tag.innerHTML = '<i class="fa-regular fa-file"></i> ' + file.name + ' (' + size + 'KB) <span class="remove-file" onclick="this.parentElement.remove()">&times;</span>';
            fileList.appendChild(tag);
        }
        
        // Reset file input
        const fileInput = document.querySelector('.file-upload-wrapper input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
    }
};
