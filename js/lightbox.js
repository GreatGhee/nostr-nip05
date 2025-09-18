// Enhanced lightbox functionality
const modal = document.getElementById('lightbox');
const modalImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImageData = null;
let isProductImage = false;
let isChartImage = false;
let productArrows = null;

// Get all gallery images
const images = document.querySelectorAll('.gallery-img');
let currentIndex = 0;

function openModal(index, productData = null, chartData = null) {
    currentIndex = index;
    isProductImage = !!productData;
    isChartImage = !!chartData;
    currentImageData = productData || chartData;

    // Clean up any existing product arrows
    if (productArrows) {
        productArrows.left?.remove();
        productArrows.right?.remove();
        productArrows = null;
    }

    if (isProductImage) {
        setupProductLightbox();
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else if (isChartImage) {
        setupChartLightbox();
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        updateModal();
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }

    modal.style.display = "flex";
    document.body.style.overflow = 'hidden';
}

function setupProductLightbox() {
    modalImg.src = currentImageData.currentSrc;
    captionText.innerHTML = currentImageData.alt;

    // Create product-specific arrows
    const leftArrow = document.createElement('button');
    leftArrow.className = 'product-arrow left';
    leftArrow.innerHTML = '&#10094;';
    leftArrow.onclick = toggleProductImage;

    const rightArrow = document.createElement('button');
    rightArrow.className = 'product-arrow right';
    rightArrow.innerHTML = '&#10095;';
    rightArrow.onclick = toggleProductImage;

    modal.appendChild(leftArrow);
    modal.appendChild(rightArrow);

    productArrows = { left: leftArrow, right: rightArrow };
}

function setupChartLightbox() {
    modalImg.src = currentImageData.currentSrc;
    captionText.innerHTML = currentImageData.caption;
}

function toggleProductImage() {
    if (currentImageData.showingAlt) {
        modalImg.src = currentImageData.originalSrc;
        currentImageData.showingAlt = false;
        currentImageData.currentSrc = currentImageData.originalSrc;
    } else {
        modalImg.src = currentImageData.altSrc;
        currentImageData.showingAlt = true;
        currentImageData.currentSrc = currentImageData.altSrc;
    }
}

function updateModal() {
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].getAttribute('data-caption') || '';
}

function navigateChart(direction) {
    let newIndex = direction === 'next'
        ? (currentImageData.chartIndex + 1) % chartImages.length
        : (currentImageData.chartIndex - 1 + chartImages.length) % chartImages.length;

    currentImageData.chartIndex = newIndex;
    currentImageData.currentSrc = chartImages[newIndex];
    currentImageData.caption = chartCaptions[newIndex];

    modalImg.src = currentImageData.currentSrc;
    captionText.innerHTML = currentImageData.caption;
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = '';

    // Clean up product arrows
    if (productArrows) {
        productArrows.left?.remove();
        productArrows.right?.remove();
        productArrows = null;
    }

    // Reset arrow visibility
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
}

function initializeLightbox() {
    if (!modal) return;

    // Close modal
    closeBtn.onclick = closeModal;

    // Navigation for gallery and chart images
    prevBtn.onclick = function() {
        if (isChartImage) {
            navigateChart('prev');
        } else if (!isProductImage) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateModal();
        }
    }

    nextBtn.onclick = function() {
        if (isChartImage) {
            navigateChart('next');
        } else if (!isProductImage) {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateModal();
        }
    }

    // Add click events to all gallery images
    images.forEach((img, index) => {
        img.onclick = function() {
            // Check if it's a chart image
            if (img.id === 'chart-display') {
                const chartData = {
                    currentSrc: img.src,
                    caption: img.getAttribute('data-caption'),
                    chartIndex: currentChart
                };
                openModal(index, null, chartData);
            }
            // Check if it's a product image
            else if (img.closest('.image-slider') && img.classList.contains('product-img')) {
                const productData = {
                    originalSrc: img.src,
                    altSrc: img.getAttribute('data-alt-src'),
                    currentSrc: img.src,
                    alt: img.alt,
                    showingAlt: false
                };
                openModal(index, productData);
            }
            // Regular gallery image
            else {
                openModal(index);
            }
        }
    });

    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Click image to toggle for product images
    modalImg.onclick = function() {
        if (isProductImage) {
            toggleProductImage();
        }
    }

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === "flex") {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                if (isProductImage) {
                    toggleProductImage();
                } else {
                    prevBtn.click();
                }
            } else if (event.key === 'ArrowRight') {
                if (isProductImage) {
                    toggleProductImage();
                } else {
                    nextBtn.click();
                }
            }
        }
    });
}