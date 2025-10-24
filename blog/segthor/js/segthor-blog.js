/**
 * SegTHOR Blog Interactive Visualizations
 * Combined and optimized JavaScript for all interactions
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCTViewer();
    initializeVoxelClipping();
    initializeIntensityNormalization();
    initializeComparisonSlider();
    initializeTrainingProgress();
});

// ===== CT Scan Viewer =====
function initializeCTViewer() {
    const slider = document.getElementById('ct-scan-slider');
    const ctImage = document.getElementById('ct-scan-image');
    const overlayImage = document.getElementById('overlay-image');
    const sliceInfo = document.getElementById('slice-info');
    const overlayButtons = document.querySelectorAll('.overlay-btn');
    const viewerLegend = document.getElementById('viewer-legend');
    
    if (!slider || !ctImage) return;
    
    let currentOverlay = 'off';
    
    function updateCTViewer(value) {
        const sliceNum = value.toString().padStart(4, '0');
        ctImage.src = `images/CT27/${sliceNum}.png`;
        
        if (currentOverlay !== 'off') {
            const folder = currentOverlay === 'wrong' ? 'GT27_wrong' : 'GT27_correct';
            overlayImage.src = `images/${folder}/${sliceNum}.png`;
            overlayImage.style.display = 'block';
            viewerLegend.style.display = 'block';
        } else {
            overlayImage.style.display = 'none';
            viewerLegend.style.display = 'none';
        }
        
        sliceInfo.textContent = `Slice: ${value} / 211`;
    }
    
    slider.addEventListener('input', function() {
        updateCTViewer(parseInt(this.value));
    });
    
    overlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            overlayButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentOverlay = this.dataset.overlay;
            updateCTViewer(parseInt(slider.value));
        });
    });
    
    // Initialize
    updateCTViewer(0);
}

// ===== Voxel Clipping Visualization =====
function initializeVoxelClipping() {
    const canvas = document.getElementById('voxelClippingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const leftSlider = document.getElementById('leftSlider');
    const rightSlider = document.getElementById('rightSlider');
    
    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = -1500; i <= 1500; i += 100) {
            if (i < -1000 || i > 1000) {
                data.push(Math.floor(Math.random() * 10));
            } else {
                data.push(Math.floor(Math.random() * 80) + 20);
            }
        }
        return data;
    };
    
    let originalData = generateData();
    let chartInstance;
    
    function renderChart(data) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        const labels = Array.from({length: 31}, (_, i) => (-1500 + i * 100).toString());
        
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Voxel Count',
                    data: data,
                    backgroundColor: 'rgba(100, 255, 218, 0.5)',
                    borderColor: 'rgba(100, 255, 218, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Voxel Intensity Distribution (HU)',
                        font: { size: 12 }
                    },
                    annotation: {
                        annotations: {
                            airLine: {
                                type: 'line',
                                scaleID: 'x',
                                value: '-1000',
                                borderColor: 'rgba(255, 99, 132, 0.8)',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: 'Air',
                                    display: true,
                                    position: 'start'
                                }
                            },
                            boneLine: {
                                type: 'line',
                                scaleID: 'x',
                                value: '1000',
                                borderColor: 'rgba(255, 99, 132, 0.8)',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: 'Bone',
                                    display: true,
                                    position: 'start'
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { display: false }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    function updateClipping() {
        const leftValue = parseInt(leftSlider.value);
        const rightValue = parseInt(rightSlider.value);
        
        // Prevent sliders from crossing
        if (leftValue >= rightValue - 100) {
            if (this === leftSlider) {
                leftSlider.value = rightValue - 100;
                return;
            } else {
                rightSlider.value = leftValue + 100;
                return;
            }
        }
        
        // Apply clipping
        const clippedData = new Array(31).fill(0);
        originalData.forEach((value, index) => {
            const huValue = -1500 + (index * 100);
            if (huValue >= leftValue && huValue <= rightValue) {
                clippedData[index] = value;
            } else if (huValue < leftValue) {
                clippedData[Math.floor((leftValue + 1500) / 100)] += value;
            } else {
                clippedData[Math.floor((rightValue + 1500) / 100)] += value;
            }
        });
        
        renderChart(clippedData);
    }
    
    leftSlider.addEventListener('input', updateClipping);
    rightSlider.addEventListener('input', updateClipping);
    
    // Initialize
    renderChart(originalData);
}

// ===== Intensity Normalization =====
function initializeIntensityNormalization() {
    const canvas = document.getElementById('intensityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const normalizeBtn = document.getElementById('normalizeBtn');
    
    let isNormalized = false;
    let chartInstance;
    
    // Generate sample distributions
    const generateDistributions = () => {
        const slice1 = [];
        const slice2 = [];
        
        // Generate different distributions for two slices
        for (let i = 0; i < 1000; i++) {
            slice1.push(Math.random() * 800 - 200); // Broader distribution
            slice2.push(Math.random() * 400 + 200);  // Narrower, shifted distribution
        }
        
        return { slice1, slice2 };
    };
    
    const data = generateDistributions();
    
    function calculateHistogram(values, bins, min, max) {
        const histogram = new Array(bins).fill(0);
        const binSize = (max - min) / bins;
        
        values.forEach(value => {
            const index = Math.floor((value - min) / binSize);
            if (index >= 0 && index < bins) {
                histogram[index]++;
            }
        });
        
        return histogram;
    }
    
    function normalizeData(values) {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
        return values.map(v => (v - mean) / std);
    }
    
    function renderIntensityChart() {
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        let labels, datasets;
        
        if (isNormalized) {
            const norm1 = normalizeData(data.slice1);
            const norm2 = normalizeData(data.slice2);
            
            labels = Array.from({length: 50}, (_, i) => ((i - 25) * 0.2).toFixed(1));
            datasets = [
                {
                    label: 'Slice 63 (Normalized)',
                    data: calculateHistogram(norm1, 50, -5, 5),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Slice 184 (Normalized)',
                    data: calculateHistogram(norm2, 50, -5, 5),
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
            ];
        } else {
            labels = Array.from({length: 50}, (_, i) => (i * 40 - 1000).toString());
            datasets = [
                {
                    label: 'Slice 63',
                    data: calculateHistogram(data.slice1, 50, -1000, 1000),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Slice 184',
                    data: calculateHistogram(data.slice2, 50, -1000, 1000),
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
            ];
        }
        
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: isNormalized ? 'Z-Score Distribution' : 'Intensity Distribution (HU)',
                        font: { size: 12 }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { display: false },
                        ticks: {
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    normalizeBtn.addEventListener('click', function() {
        isNormalized = !isNormalized;
        this.textContent = isNormalized ? 'Show Original Distribution' : 'Apply Z-Score Normalization';
        renderIntensityChart();
    });
    
    // Initialize
    renderIntensityChart();
}

// ===== Before/After Comparison Slider =====
function initializeComparisonSlider() {
    const slider = document.querySelector('.comparison-slider');
    if (!slider) return;
    
    const handle = slider.querySelector('.comparison-handle');
    const beforeImage = slider.querySelector('.comparison-before');
    
    let isResizing = false;
    
    function setPosition(x) {
        const rect = slider.getBoundingClientRect();
        const percent = Math.min(Math.max((x - rect.left) / rect.width * 100, 0), 100);
        
        handle.style.left = `${percent}%`;
        beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }
    
    function startResize(e) {
        e.preventDefault();
        isResizing = true;
        slider.style.cursor = 'ew-resize';
    }
    
    function stopResize() {
        isResizing = false;
        slider.style.cursor = 'default';
    }
    
    function resize(e) {
        if (!isResizing) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        setPosition(x);
    }
    
    // Mouse events
    handle.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    
    // Touch events
    handle.addEventListener('touchstart', startResize);
    document.addEventListener('touchmove', resize);
    document.addEventListener('touchend', stopResize);
    
    // Initialize at 50%
    const rect = slider.getBoundingClientRect();
    setPosition(rect.left + rect.width / 2);
}

// ===== Training Progress Visualization =====
function initializeTrainingProgress() {
    const slider = document.getElementById('training-slider');
    const predictionImage = document.getElementById('training-prediction');
    const epochDisplay = document.getElementById('epoch-display');
    const diceDisplay = document.getElementById('dice-display');
    
    if (!slider || !predictionImage) return;
    
    // Simulated Dice scores for each epoch
    const diceScores = [
        0.42, 0.48, 0.55, 0.61, 0.65, 0.69, 0.72, 0.75, 0.77, 0.79,
        0.81, 0.82, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.89, 0.90
    ];
    
    function updateTraining(epoch) {
        const epochNum = epoch.toString().padStart(3, '0');
        predictionImage.src = `images/Segthor/Training/result_png/iter${epochNum}_Patient_01_0129.png`;
        epochDisplay.textContent = `Epoch: ${epoch + 1} / 20`;
        diceDisplay.textContent = `Dice: ${diceScores[epoch].toFixed(2)}`;
    }
    
    slider.addEventListener('input', function() {
        updateTraining(parseInt(this.value));
    });
    
    // Initialize
    updateTraining(0);
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth transitions when charts update
Chart.defaults.animation.duration = 500;
Chart.defaults.animation.easing = 'easeInOutQuart';