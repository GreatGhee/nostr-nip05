// Main initialization file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing GreatGhee website...');

    // Initialize all modules
    initializePricing();
    initializeProducts();
    initializeChartCarousel();
    initializeImageSliders();
    initializeLightbox();
    preloadImages();

    console.log('Website initialization complete');
});