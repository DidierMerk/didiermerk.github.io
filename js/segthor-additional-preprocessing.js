// Voxel Clipping
const generateVoxelData = () => {
    const data = [];
    for (let i = -1500; i <= 1500; i += 100) {
        if (i < -1000 || i > 1000) {
            data.push(Math.floor(Math.random() * 10));
        } else {
            data.push(Math.floor(Math.random() * 100) + 20);
        }
    }
    return data;
};

let chartInstance;
const renderVoxelClippingChart = (filteredData) => {
    const ctx = document.getElementById('voxelClippingChart').getContext('2d');
    const labels = Array.from({length: 31}, (_, i) => (-1500 + i * 100).toString());
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: filteredData,
                backgroundColor: '#66b3ff',
                borderColor: '#3399ff',
                borderWidth: 0.5,
                barPercentage: 0.6,
                categoryPercentage: 1.0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: (value) => value === 0,
                        drawBorder: true,
                        drawTicks: false,
                        color: '#333'
                    },
                    border: {
                        display: true,
                        color: '#333',
                        width: 2
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    grid: {
                        display: true,
                        drawBorder: true,
                        drawTicks: false,
                        color: '#e0e0e0'
                    },
                    border: {
                        display: true,
                        color: '#333',
                        width: 2
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Voxel Intensities (HU)',
                    font: {
                        family: 'monospace',
                        size: 12,
                        weight: 'bold',
                    },
                    color: "RGB (0, 0, 0)",
                    padding: {
                        top: 0,
                        bottom: 5
                    }
                },
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            scaleID: 'x',
                            value: '-1000',
                            borderColor: 'rgba(4, 4, 4, 1)',
                            borderWidth: 1,
                            borderDash: [5, 5],
                            label: {
                                content: 'Air',
                                display: true,
                                position: 'start',
                                yAdjust: -10,
                                xAdjust: -15,
                                font: {
                                    family: 'monospace',
                                    size: 12
                                },
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                color: 'rgb(0, 0, 0)'
                            }
                        },
                        line2: {
                            type: 'line',
                            scaleID: 'x',
                            value: '1000',
                            borderColor: 'rgba(4, 4, 4, 1)',
                            borderWidth: 1,
                            borderDash: [5, 5],
                            label: {
                                content: 'Bones',
                                display: true,
                                position: 'start',
                                yAdjust: -10,
                                xAdjust: 20,
                                font: {
                                    family: 'monospace',
                                    size: 12
                                },
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                color: 'rgb(0, 0, 0)'
                            }
                        }
                    }
                }
            }
        }
    });
};

let data = generateVoxelData();

function initializeVoxelClipping() {
    renderVoxelClippingChart(data);
    document.getElementById('leftSlider').value = -1500;
    document.getElementById('rightSlider').value = 1500;
    updateChart();
}

const leftSlider = document.getElementById('leftSlider');
const rightSlider = document.getElementById('rightSlider');

leftSlider.addEventListener('input', updateChart);
rightSlider.addEventListener('input', updateChart);

function updateChart() {
    let leftValue = parseInt(leftSlider.value);
    let rightValue = parseInt(rightSlider.value);

    // Prevent sliders from crossing
    if (leftValue >= rightValue) {
        if (this === leftSlider) {
            leftValue = rightValue - 10;
            leftSlider.value = leftValue;
        } else {
            rightValue = leftValue + 10;
            rightSlider.value = rightValue;
        }
    }

    let filteredData = new Array(31).fill(0);
    
    data.forEach((value, index) => {
        const hounsfieldUnit = -1500 + (index * 100);
        if (hounsfieldUnit < leftValue) {
            // Add to the first in-bounds bar on the left
            const firstInBoundsIndex = Math.floor((leftValue + 1500) / 100);
            filteredData[firstInBoundsIndex] += value;
        } else if (hounsfieldUnit > rightValue) {
            // Add to the last in-bounds bar on the right
            const lastInBoundsIndex = Math.floor((rightValue + 1500) / 100);
            filteredData[lastInBoundsIndex] += value;
        } else {
            // Within bounds, add to the corresponding bar
            filteredData[index] += value;
        }
    });

    renderVoxelClippingChart(filteredData);
}

// Rescaling

// Intensity Normalization with recalculated 50 bins for normalized data
let intensityChartInstance;
let isNormalized = false;

const gaussianRandom = (mean, stdDev) => {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean;
};

const generateIntensityData = () => {
    const slice0063 = [];
    const slice0184 = [];
    // Generate flat distribution (Slice 0063)
    for (let i = 0; i < 1000; i++) {
        slice0063.push(Math.round(gaussianRandom(0, 400)));
    }
    // Generate spikey distribution (Slice 0184)
    for (let i = 0; i < 1000; i++) {
        slice0184.push(Math.round(gaussianRandom(400, 100)));
    }
    return { slice0063, slice0184 };
};

const calculateZScore = (data) => {
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const stdDev = Math.sqrt(data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length);
    return data.map(value => (value - mean) / stdDev);
};

const getHistogramData = (data, binSize, minVal, maxVal) => {
    const numBins = Math.ceil((maxVal - minVal) / binSize);
    const histogramData = new Array(numBins).fill(0);

    data.forEach(value => {
        const index = Math.floor((value - minVal) / binSize);
        if (index >= 0 && index < numBins) {
            histogramData[index]++;
        }
    });

    return histogramData;
};

const renderIntensityDistributionChart = (data, normalizedData) => {
    const ctx = document.getElementById('intensityDistributionChart');
    if (!ctx) {
        console.error('Intensity Distribution Chart canvas not found');
        return;
    }

    const labels = isNormalized
        ? Array.from({length: 50}, (_, i) => `${-5 + (i * 0.2)}σ`) // 50 bins for normalized plot
        : Array.from({length: 50}, (_, i) => (i * 40 - 1000).toString()); // Original HU bins
    
    const chartTitle = isNormalized ? 'Voxel Z-Scores' : 'Voxel Intensities (HU)'; // Dynamic title

    if (intensityChartInstance) {
        intensityChartInstance.destroy();
    }

    const binSize = isNormalized ? 0.2 : 40; // Smaller bins for normalized data
    const minVal = isNormalized ? -5 : -1000;
    const maxVal = isNormalized ? 5 : 1000;

    const slice0063Histogram = getHistogramData(
        isNormalized ? normalizedData.slice0063 : data.slice0063,
        binSize,
        minVal,
        maxVal
    );
    const slice0184Histogram = getHistogramData(
        isNormalized ? normalizedData.slice0184 : data.slice0184,
        binSize,
        minVal,
        maxVal
    );

    intensityChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Slice 0063',
                    data: slice0063Histogram,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    barPercentage: 0.8,
                    categoryPercentage: 1.0
                },
                {
                    label: 'Slice 0184',
                    data: slice0184Histogram,
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    barPercentage: 0.8,
                    categoryPercentage: 1.0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 0
            },
            scales: {
                x: {
                    stacked: true,
                    display: true,
                    grid: {
                        display: false,
                        drawBorder: true,
                        drawTicks: false,
                        color: '#333'
                    },
                    border: {
                        display: true,
                        color: '#333',
                        width: 2
                    },
                    ticks: {
                        display: false // Turn off all x-axis ticks
                    }
                },
                y: {
                    stacked: true,
                    display: true,
                    grid: {
                        display: false,
                        drawBorder: true,
                        drawTicks: false,
                        color: '#e0e0e0'
                    },
                    border: {
                        display: true,
                        color: '#333',
                        width: 2
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'chartArea',
                    align: 'bottom',
                    labels: {
                        boxWidth: 8,
                        padding: 10,
                        font: {
                            family: 'monospace',
                            size: 9
                        },
                        color: 'rgb(0, 0, 0)'
                    },
                    onClick: null,
                },
                title: {
                    display: true,
                    text: chartTitle,  // Set the dynamic title here
                    font: {
                        family: 'monospace',  // Use monospace font
                        size: 12,
                        weight: 'bold'
                    },
                    color: '#000000',
                    padding: {
                        top: 0,
                        bottom: 5
                    }
                }
            }
        }
    });       
};

const initializeIntensityDistribution = () => {
    const data = generateIntensityData();
    const normalizedData = {
        slice0063: calculateZScore(data.slice0063),
        slice0184: calculateZScore(data.slice0184)
    };
    renderIntensityDistributionChart(data, normalizedData);

    const normalizeButton = document.getElementById('normalizeButton');
    normalizeButton.addEventListener('click', () => {
        isNormalized = !isNormalized;
        renderIntensityDistributionChart(data, normalizedData);
        normalizeButton.textContent = isNormalized ? 'Show Original' : 'Compute Z-scores';
    });
};

// Initialize Voxel Clipping (not changed) and Intensity Distribution
document.addEventListener('DOMContentLoaded', () => {
    initializeVoxelClipping();
    initializeIntensityDistribution();
});