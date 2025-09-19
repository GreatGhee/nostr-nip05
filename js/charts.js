// Chart carousel functionality
const chartImages = ["images/chart1.png", "images/chart2.png", "images/chart3.jpg"];
const chartCaptions = [
    "Chart 1: Animal Fat Comparison",
    "Chart 2: Nutritional Analysis",
    "Chart 3: Health Benefits Overview"
];
let currentChart = 0;

function initializeChartCarousel() {
    const chartDisplay = document.getElementById('chart-display');
    const chartLeft = document.querySelector('.chart-arrow.left');
    const chartRight = document.querySelector('.chart-arrow.right');

    if (!chartDisplay || !chartLeft || !chartRight) return;

    function updateChart(index) {
        chartDisplay.src = chartImages[index];
        chartDisplay.setAttribute('data-caption', chartCaptions[index]);
    }

    chartLeft.addEventListener('click', (e) => {
        e.stopPropagation();
        currentChart = (currentChart - 1 + chartImages.length) % chartImages.length;
        updateChart(currentChart);
    });

    chartRight.addEventListener('click', (e) => {
        e.stopPropagation();
        currentChart = (currentChart + 1) % chartImages.length;
        updateChart(currentChart);
    });
}