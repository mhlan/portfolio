/* Additional performance optimizations */

/* Preload critical assets */
document.addEventListener('DOMContentLoaded', function() {
    // Preload important images
    const imagesToPreload = [
        // Add actual image paths when available
        // 'images/profile.jpg',
        // 'images/project1.jpg'
    ];
    
    // Create preload links for images
    imagesToPreload.forEach(imagePath => {
        if (imagePath) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = imagePath;
            document.head.appendChild(preloadLink);
        }
    });
    
    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
        });
    }
});

// Add structured data for better SEO
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Matt Lanin",
        "jobTitle": "Marketing Automation Specialist",
        "url": "https://mattlanin.com",
        "sameAs": [
            // Add social media profiles when available
            // "https://linkedin.com/in/mattlanin",
            // "https://github.com/mattlanin"
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Call the function to add structured data
addStructuredData();

// Implement performance monitoring
function reportWebVitals() {
    if ('web-vitals' in window) {
        window.webVitals.getCLS(console.log);
        window.webVitals.getFID(console.log);
        window.webVitals.getLCP(console.log);
    }
}

// Defer non-critical CSS
function loadDeferredStyles() {
    const deferredStyles = [
        // Add paths to non-critical CSS files when available
        // 'css/print.css'
    ];
    
    deferredStyles.forEach(stylePath => {
        if (stylePath) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = stylePath;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        }
    });
}

// Call the function to load deferred styles
loadDeferredStyles();
