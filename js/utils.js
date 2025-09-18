// Utility functions
function preloadImages() {
    const imageUrls = [
        'images/chart1.png',
        'images/chart2.png',
        'images/chart3.jpg',
        'images/8ozRegFront.jpg',
        'images/8ozRegBack.jpg',
        'images/16ozRegFront.jpg',
        'images/16ozRegBack.jpg',
        'images/32ozRegFront.jpg',
        'images/32ozRegBack.jpg',
        'images/4ozCrispsFront.jpg',
        'images/4ozCrispsBack.jpg',
        'images/16oz_grassfed_front.jpg',
        'images/16oz_grassfed_back.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}