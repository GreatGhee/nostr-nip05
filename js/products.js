// Product configuration and pricing functionality
let btcPriceUSD = 0;

const products = [
    {
        selectId: 'selectReg',
        buttonId: 'buyButtonReg',
        imageSliderId: 'sliderReg',
        options: [
            { size: '8 oz', price: 18, front: 'images/8ozRegFront.jpg', back: 'images/8ozRegBack.jpg' },
            { size: '16 oz', price: 29, front: 'images/16ozRegFront.jpg', back: 'images/16ozRegBack.jpg' },
            { size: '32 oz', price: 45, front: 'images/32ozRegFront.jpg', back: 'images/32ozRegBack.jpg' }
        ]
    },
    {
        selectId: 'selectLiver',
        buttonId: 'buyButtonLiver',
        imageSliderId: 'sliderLiver',
        options: [
            { size: '1-pack (3 oz)', price: 26, front: 'images/4ozCrispsFront.jpg', back: 'images/4ozCrispsBack.jpg' },
            { size: '3-pack (Save 10%)', price: 70, front: 'images/4ozCrispsFront.jpg', back: 'images/4ozCrispsBack.jpg' },
            { size: '5-pack (Save 15%)', price: 110, front: 'images/4ozCrispsFront.jpg', back: 'images/4ozCrispsBack.jpg' }
        ]
    },
    {
        selectId: 'selectGrass',
        buttonId: 'buyButtonGrass',
        imageSliderId: 'sliderGrass',
        options: [
            { size: '16 oz', price: 42, front: 'images/16oz_grassfed_front.jpg', back: 'images/16oz_grassfed_back.jpg' }
        ]
    }
];

async function fetchSatoshiPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        btcPriceUSD = data.bitcoin.usd;
        updateAllProducts();
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
}

function updateAllProducts() {
    products.forEach(product => {
        const select = document.getElementById(product.selectId);
        if (!select) return;

        product.options.forEach((opt, idx) => {
            const sats = btcPriceUSD ? Math.round((opt.price / btcPriceUSD) * 100000000) : 0;
            const formattedSats = sats.toLocaleString() || 'N/A';
            const left = opt.size.padEnd(10, ' ');
            const right = `$${opt.price} / ${formattedSats} sats`;
            select.options[idx].text = left + right;
        });

        updateButton(product);
    });
}

function updateButton(product) {
    const select = document.getElementById(product.selectId);
    const button = document.getElementById(product.buttonId);
    if (!select || !button) return;

    const idx = select.selectedIndex;
    const link = select.options[idx].dataset.link;

    if (link === '#') {
        button.textContent = 'Coming Soon';
        button.href = '#';
        button.classList.add('disabled');
    } else {
        button.textContent = 'Buy Now';
        button.href = link;
        button.classList.remove('disabled');
    }

    // Update image if applicable
    if (product.imageSliderId) {
        const slider = document.getElementById(product.imageSliderId);
        if (slider) {
            const img = slider.querySelector('img');
            const opt = product.options[idx];
            if (opt.front) {
                img.src = opt.front;
                img.dataset.altSrc = opt.back;
            }
        }
    }
}

function initializeProducts() {
    // Add event listeners for select changes
    products.forEach(product => {
        const select = document.getElementById(product.selectId);
        if (select) {
            select.addEventListener('change', () => updateButton(product));
        }
    });
}

// Initialize pricing
function initializePricing() {
    fetchSatoshiPrices();
    setInterval(fetchSatoshiPrices, 60000);
}
