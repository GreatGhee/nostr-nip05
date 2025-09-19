// Product image slider functionality
function initializeImageSliders() {
    document.querySelectorAll('.image-slider').forEach(slider => {
        const img = slider.querySelector('img');
        const originalSrc = img.src;
        const altSrc = img.getAttribute('data-alt-src');
        let showingAlt = false;

        function toggleImage() {
            if (showingAlt) {
                img.src = originalSrc;
                showingAlt = false;
            } else {
                img.src = altSrc;
                showingAlt = true;
            }
        }

        // Click arrow support
        slider.querySelector('.left').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleImage();
        });

        slider.querySelector('.right').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleImage();
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        img.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        img.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            if (Math.abs(deltaX) > 50) {
                e.stopPropagation();
                toggleImage();
            }
        }
    });
}