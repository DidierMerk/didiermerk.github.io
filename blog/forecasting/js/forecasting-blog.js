/**
 * Financial Forecasting Blog Interactive Components
 * All interactive visualizations and functionality
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeForecastingDemo();
    initializeTokenizationVisualizer();
    initializePerformanceExplorer();
    initializeCalibrationExplorer();
    initializePatternExplorer();
    initializeModelComparison();
});

// ===== Live Forecasting Demo =====
function initializeForecastingDemo() {
    const canvas = document.getElementById('forecastingCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const drawingCanvas = document.getElementById('drawingCanvas');
    const drawingCtx = drawingCanvas ? drawingCanvas.getContext('2d') : null;
    const drawingOverlay = document.getElementById('drawingOverlay');
    
    let currentSeries = 'trend';
    let chartInstance = null;
    let isDrawing = false;
    let drawnPoints = [];
    
    // Generate sample time series
    function generateSeries(type) {
        const length = 90;
        const data = [];
        const time = [];
        
        for (let i = 0; i < length; i++) {
            time.push(`Day ${i + 1}`);
            
            switch(type) {
                case 'trend':
                    data.push(100 + i * 0.5 + Math.random() * 10);
                    break;
                case 'seasonal':
                    data.push(100 + 20 * Math.sin(i * Math.PI / 15) + Math.random() * 5);
                    break;
                case 'volatile':
                    data.push(100 + Math.random() * 40 - 20);
                    break;
                default:
                    data.push(100);
            }
        }
        
        return { time, data };
    }
    
    // Initialize chart
    function initChart(seriesType) {
        const series = generateSeries(seriesType);
        
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: series.time,
                datasets: [{
                    label: 'Historical Data',
                    data: series.data,
                    borderColor: 'rgba(100, 255, 218, 1)',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
    
    // Handle series type buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.demo-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSeries = this.dataset.series;
            
            if (currentSeries === 'draw') {
                // Enable drawing mode
                drawingOverlay.style.display = 'block';
                setupDrawing();
            } else {
                drawingOverlay.style.display = 'none';
                initChart(currentSeries);
            }
        });
    });
    
    // Drawing functionality
    function setupDrawing() {
        drawingCanvas.width = canvas.width;
        drawingCanvas.height = canvas.height;
        drawnPoints = [];
        
        drawingCanvas.addEventListener('mousedown', startDrawing);
        drawingCanvas.addEventListener('mousemove', draw);
        drawingCanvas.addEventListener('mouseup', stopDrawing);
        drawingCanvas.addEventListener('touchstart', startDrawing);
        drawingCanvas.addEventListener('touchmove', draw);
        drawingCanvas.addEventListener('touchend', stopDrawing);
    }
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = drawingCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        drawnPoints.push({x, y});
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const rect = drawingCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        drawingCtx.beginPath();
        if (drawnPoints.length > 0) {
            const lastPoint = drawnPoints[drawnPoints.length - 1];
            drawingCtx.moveTo(lastPoint.x, lastPoint.y);
        }
        drawingCtx.lineTo(x, y);
        drawingCtx.strokeStyle = '#64ffda';
        drawingCtx.lineWidth = 2;
        drawingCtx.stroke();
        
        drawnPoints.push({x, y});
    }
    
    function stopDrawing() {
        isDrawing = false;
        // Convert drawn points to time series data
        if (drawnPoints.length > 0) {
            convertDrawnToSeries();
        }
    }
    
    function convertDrawnToSeries() {
        // Sample the drawn points and convert to time series
        const numPoints = 90;
        const step = Math.floor(drawnPoints.length / numPoints);
        const sampledData = [];
        
        for (let i = 0; i < numPoints; i++) {
            const idx = Math.min(i * step, drawnPoints.length - 1);
            const y = drawnPoints[idx].y;
            // Normalize y to data range
            const value = 200 - (y / drawingCanvas.height) * 100;
            sampledData.push(value);
        }
        
        // Update main chart with drawn data
        if (chartInstance) {
            chartInstance.data.datasets[0].data = sampledData;
            chartInstance.update();
        }
    }
    
    // Forecast button
    document.getElementById('forecastBtn').addEventListener('click', generateForecast);
    
    function generateForecast() {
        const modelSelect = document.getElementById('modelSelect');
        const model = modelSelect.value;
        
        // Simulate forecast generation
        const currentData = chartInstance.data.datasets[0].data;
        const forecastLength = 30;
        const lastValue = currentData[currentData.length - 1];
        
        // Generate forecast based on model type
        const forecast = [];
        const lower = [];
        const upper = [];
        
        for (let i = 0; i < forecastLength; i++) {
            let value;
            switch(model) {
                case 'naive':
                    value = lastValue;
                    break;
                case 'arima':
                    value = lastValue + (Math.random() - 0.5) * 5;
                    break;
                case 'chronos':
                    // Simulate better performance
                    value = lastValue + Math.sin(i * 0.2) * 10 + (Math.random() - 0.5) * 3;
                    break;
                default:
                    value = lastValue + (Math.random() - 0.5) * 10;
            }
            forecast.push(value);
            lower.push(value - 10);
            upper.push(value + 10);
        }
        
        // Add forecast to chart
        const forecastLabels = [];
        for (let i = 0; i < forecastLength; i++) {
            forecastLabels.push(`Day ${currentData.length + i + 1}`);
        }
        
        // Update chart
        chartInstance.data.datasets.push({
            label: 'Forecast',
            data: Array(currentData.length).fill(null).concat(forecast),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false
        });
        
        chartInstance.data.datasets.push({
            label: 'Confidence Interval',
            data: Array(currentData.length).fill(null).concat(upper),
            borderColor: 'rgba(255, 159, 64, 0.3)',
            backgroundColor: 'rgba(255, 159, 64, 0.05)',
            borderWidth: 1,
            fill: '+1'
        });
        
        chartInstance.data.datasets.push({
            label: 'Confidence Interval Lower',
            data: Array(currentData.length).fill(null).concat(lower),
            borderColor: 'rgba(255, 159, 64, 0.3)',
            borderWidth: 1,
            fill: false
        });
        
        chartInstance.data.labels = chartInstance.data.labels.concat(forecastLabels);
        chartInstance.update();
        
        // Show metrics
        document.getElementById('forecastMetrics').style.display = 'flex';
        document.getElementById('maeValue').textContent = (Math.random() * 5 + 2).toFixed(2);
        document.getElementById('mapeValue').textContent = (Math.random() * 10 + 5).toFixed(1) + '%';
        document.getElementById('confidenceValue').textContent = (Math.random() * 20 + 70).toFixed(0) + '%';
    }
    
    // Initialize with trend series
    initChart('trend');
}

// ===== Tokenization Visualizer =====
function initializeTokenizationVisualizer() {
    // Create mini charts for tokenization steps
    const originalCanvas = document.createElement('canvas');
    const scaledCanvas = document.createElement('canvas');
    
    const originalContainer = document.getElementById('originalSeries');
    const scaledContainer = document.getElementById('scaledSeries');
    
    if (!originalContainer || !scaledContainer) return;
    
    originalContainer.appendChild(originalCanvas);
    scaledContainer.appendChild(scaledCanvas);
    
    // Generate sample data
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(140 + Math.random() * 20);
    }
    
    // Original series chart
    new Chart(originalCanvas, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: data,
                borderColor: '#64ffda',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
    
    // Scaled series chart
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const scaledData = data.map(v => v / mean);
    
    new Chart(scaledCanvas, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: scaledData,
                borderColor: '#ff9f40',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

// ===== Performance Explorer =====
function initializePerformanceExplorer() {
    const container = document.getElementById('performanceChart');
    if (!container) return;
    
    // Model performance data from thesis
    const performanceData = {
        '1': {
            'Naive': 0.0091,
            'AutoARIMA': 0.0237,
            'AutoETS': 0.0239,
            'NHITS': 0.0158,
            'PatchTST': 0.0116,
            'TimesNet': 0.0258,
            'DeepAR': 0.0123,
            'Chronos-S': 0.0083,
            'Chronos-L': 0.0077
        },
        '7': {
            'Naive': 0.0323,
            'AutoARIMA': 0.0459,
            'AutoETS': 0.0456,
            'NHITS': 0.0403,
            'PatchTST': 0.0320,
            'TimesNet': 0.0385,
            'DeepAR': 0.0346,
            'Chronos-S': 0.0293,
            'Chronos-L': 0.0280
        },
        '14': {
            'Naive': 0.0449,
            'AutoARIMA': 0.0571,
            'AutoETS': 0.0580,
            'NHITS': 0.0485,
            'PatchTST': 0.0403,
            'TimesNet': 0.0473,
            'DeepAR': 0.0450,
            'Chronos-S': 0.0397,
            'Chronos-L': 0.0389
        },
        '30': {
            'Naive': 0.0517,
            'AutoARIMA': 0.0616,
            'AutoETS': 0.0636,
            'NHITS': 0.0550,
            'PatchTST': 0.0446,
            'TimesNet': 0.0514,
            'DeepAR': 0.0524,
            'Chronos-S': 0.0460,
            'Chronos-L': 0.0440
        }
    };
    
    let currentHorizon = '30';
    
    function updatePerformanceChart(horizon) {
        const data = performanceData[horizon];
        const models = Object.keys(data);
        const values = Object.values(data);
        
        const colors = models.map(model => {
            if (model.includes('Chronos')) return '#64ffda';
            if (model.includes('Naive')) return '#ff6384';
            return '#36a2eb';
        });
        
        const trace = {
            x: models,
            y: values.map(v => v * 100), // Convert to percentage
            type: 'bar',
            marker: {
                color: colors
            },
            text: values.map(v => (v * 100).toFixed(2) + '%'),
            textposition: 'outside'
        };
        
        const layout = {
            title: '',
            xaxis: {
                title: 'Model',
                tickangle: -45
            },
            yaxis: {
                title: 'Mean Absolute Error (%)',
                range: [0, Math.max(...values) * 120]
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: {
                color: getComputedStyle(document.body).getPropertyValue('--text-primary')
            },
            margin: {
                b: 100
            }
        };
        
        Plotly.newPlot(container, [trace], layout, {responsive: true});
        
        // Update insights
        const bestModel = models[values.indexOf(Math.min(...values))];
        const avgMape = (values.reduce((a, b) => a + b, 0) / values.length * 100).toFixed(2);
        const baseline = data['Naive'];
        const improvement = ((baseline - Math.min(...values)) / baseline * 100).toFixed(1);
        
        document.getElementById('bestPerformer').textContent = bestModel;
        document.getElementById('avgMape').textContent = avgMape + '%';
        document.getElementById('vsBaseline').textContent = '-' + improvement + '%';
    }
    
    // Horizon buttons
    document.querySelectorAll('.horizon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.horizon-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentHorizon = this.dataset.horizon;
            updatePerformanceChart(currentHorizon);
        });
    });
    
    // Initialize
    updatePerformanceChart(currentHorizon);
}

// ===== Calibration Explorer =====
function initializeCalibrationExplorer() {
    const canvas = document.getElementById('calibrationChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let chartInstance = null;
    
    // Calibration data (simplified from thesis)
    const calibrationData = {
        '60': {
            'Chronos-L': 35,
            'Chronos-S': 38,
            'NHITS': 42,
            'PatchTST': 55,
            'DeepAR': 58,
            'AutoARIMA': 62,
            'AutoETS': 61
        },
        '70': {
            'Chronos-L': 45,
            'Chronos-S': 48,
            'NHITS': 52,
            'PatchTST': 65,
            'DeepAR': 68,
            'AutoARIMA': 72,
            'AutoETS': 71
        },
        '80': {
            'Chronos-L': 52,
            'Chronos-S': 55,
            'NHITS': 60,
            'PatchTST': 75,
            'DeepAR': 78,
            'AutoARIMA': 82,
            'AutoETS': 81
        },
        '90': {
            'Chronos-L': 58,
            'Chronos-S': 62,
            'NHITS': 68,
            'PatchTST': 85,
            'DeepAR': 88,
            'AutoARIMA': 91,
            'AutoETS': 90
        }
    };
    
    function updateCalibrationChart(confidence) {
        const data = calibrationData[confidence];
        
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Actual Coverage',
                    data: Object.values(data),
                    backgroundColor: Object.keys(data).map(model => 
                        model.includes('Chronos') ? 'rgba(255, 99, 132, 0.5)' : 'rgba(100, 255, 218, 0.5)'
                    ),
                    borderColor: Object.keys(data).map(model => 
                        model.includes('Chronos') ? 'rgba(255, 99, 132, 1)' : 'rgba(100, 255, 218, 1)'
                    ),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: parseInt(confidence),
                                yMax: parseInt(confidence),
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: `Expected: ${confidence}%`,
                                    enabled: true,
                                    position: 'end'
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Coverage (%)'
                        }
                    }
                }
            }
        });
    }
    
    // Confidence level buttons
    document.querySelectorAll('.conf-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.conf-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateCalibrationChart(this.dataset.conf);
        });
    });
    
    // Initialize
    updateCalibrationChart('80');
}

// ===== Pattern Explorer =====
function initializePatternExplorer() {
    const container = document.getElementById('patternVisualization');
    if (!container) return;
    
    const patterns = {
        'seasonal': {
            data: {
                'No Seasonality': [25, 28, 26, 24, 27],
                'Single Season': [18, 20, 19, 17, 19],
                'Multiple Seasons': [22, 24, 23, 21, 23]
            },
            insight: 'Models perform best on series with clear seasonal patterns. Foundation models show particular strength in detecting hidden periodicities that traditional methods miss.'
        },
        'entropy': {
            data: {
                'Low Entropy': [15, 17, 16, 14, 16],
                'Medium Entropy': [22, 24, 23, 21, 23],
                'High Entropy': [32, 35, 33, 30, 34]
            },
            insight: 'Higher entropy (unpredictability) correlates with increased forecasting errors across all models. Foundation models maintain better relative performance on high-entropy series.'
        },
        'trend': {
            data: {
                'No Trend': [20, 22, 21, 19, 21],
                'Linear Trend': [18, 20, 19, 17, 19],
                'Non-linear Trend': [25, 28, 26, 24, 27]
            },
            insight: 'Linear trends are easiest to forecast. Non-linear trends challenge traditional models but are handled well by deep learning and foundation models.'
        }
    };
    
    function updatePatternVisualization(pattern) {
        const patternData = patterns[pattern];
        
        const traces = Object.entries(patternData.data).map(([key, values], i) => ({
            x: ['Naive', 'ARIMA', 'ETS', 'PatchTST', 'Chronos'],
            y: values,
            name: key,
            type: 'scatter',
            mode: 'lines+markers',
            line: { width: 2 },
            marker: { size: 8 }
        }));
        
        const layout = {
            title: '',
            xaxis: { title: 'Model' },
            yaxis: { title: 'MAPE (%)' },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: {
                color: getComputedStyle(document.body).getPropertyValue('--text-primary')
            }
        };
        
        Plotly.newPlot(container, traces, layout, {responsive: true});
        
        // Update insight
        document.getElementById('patternInsight').textContent = patternData.insight;
    }
    
    // Pattern tabs
    document.querySelectorAll('.pattern-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.pattern-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            updatePatternVisualization(this.dataset.pattern);
        });
    });
    
    // Initialize
    updatePatternVisualization('seasonal');
}

// ===== Model Comparison Radar Chart =====
function initializeModelComparison() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let chartInstance = null;
    
    // Model metrics (normalized to 0-100 scale)
    const modelMetrics = {
        'chronos-large': {
            'Accuracy': 95,
            'Speed': 30,
            'Calibration': 40,
            'Simplicity': 20,
            'Robustness': 85
        },
        'chronos-small': {
            'Accuracy': 90,
            'Speed': 50,
            'Calibration': 45,
            'Simplicity': 25,
            'Robustness': 80
        },
        'patchtst': {
            'Accuracy': 85,
            'Speed': 60,
            'Calibration': 75,
            'Simplicity': 40,
            'Robustness': 70
        },
        'nhits': {
            'Accuracy': 75,
            'Speed': 70,
            'Calibration': 60,
            'Simplicity': 50,
            'Robustness': 65
        },
        'deepar': {
            'Accuracy': 70,
            'Speed': 65,
            'Calibration': 80,
            'Simplicity': 45,
            'Robustness': 60
        },
        'arima': {
            'Accuracy': 60,
            'Speed': 90,
            'Calibration': 85,
            'Simplicity': 80,
            'Robustness': 50
        },
        'ets': {
            'Accuracy': 58,
            'Speed': 92,
            'Calibration': 83,
            'Simplicity': 85,
            'Robustness': 48
        },
        'naive': {
            'Accuracy': 50,
            'Speed': 100,
            'Calibration': 70,
            'Simplicity': 100,
            'Robustness': 40
        }
    };
    
    const summaries = {
        'chronos-large vs patchtst': 'Chronos-Large excels in accuracy across all horizons but struggles with confidence calibration. PatchTST offers better uncertainty estimates at the cost of slightly lower accuracy.',
        'chronos-large vs arima': 'Chronos-Large provides superior accuracy but requires significant computational resources. AutoARIMA offers fast, well-calibrated predictions with lower accuracy.',
        'patchtst vs nhits': 'Both deep learning models offer balanced performance. PatchTST excels in longer horizons while NHITS provides faster inference.',
        'default': 'Select two models to see a detailed comparison of their strengths and weaknesses.'
    };
    
    function updateComparison() {
        const modelA = document.getElementById('modelA').value;
        const modelB = document.getElementById('modelB').value;
        
        const metricsA = modelMetrics[modelA];
        const metricsB = modelMetrics[modelB];
        
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: Object.keys(metricsA),
                datasets: [
                    {
                        label: modelA.replace('-', ' ').toUpperCase(),
                        data: Object.values(metricsA),
                        borderColor: 'rgba(100, 255, 218, 1)',
                        backgroundColor: 'rgba(100, 255, 218, 0.2)',
                        borderWidth: 2
                    },
                    {
                        label: modelB.replace('-', ' ').toUpperCase(),
                        data: Object.values(metricsB),
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
        
        // Update summary
        const key = `${modelA} vs ${modelB}`;
        const summary = summaries[key] || summaries['default'];
        document.getElementById('comparisonSummary').innerHTML = `<p>${summary}</p>`;
    }
    
    // Model selectors
    document.getElementById('modelA').addEventListener('change', updateComparison);
    document.getElementById('modelB').addEventListener('change', updateComparison);
    
    // Initialize
    updateComparison();
}