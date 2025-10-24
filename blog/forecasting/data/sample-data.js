/**
 * Sample data for demonstrations
 * Contains pre-generated time series and model outputs
 */

const SampleData = {
    // Sample time series for different patterns
    timeSeries: {
        stable: generateStableSeries(),
        trending: generateTrendingSeries(),
        seasonal: generateSeasonalSeries(),
        volatile: generateVolatileSeries()
    },
    
    // Pre-computed model outputs for demonstrations
    modelOutputs: {
        chronos: {
            mae: 0.0440,
            mape: 18.35,
            calibration: 58
        },
        patchtst: {
            mae: 0.0446,
            mape: 18.92,
            calibration: 85
        },
        arima: {
            mae: 0.0616,
            mape: 24.88,
            calibration: 91
        },
        naive: {
            mae: 0.0517,
            mape: 21.64,
            calibration: 70
        }
    }
};

function generateStableSeries() {
    const data = [];
    const base = 100;
    for (let i = 0; i < 360; i++) {
        data.push(base + Math.random() * 5 - 2.5);
    }
    return data;
}

function generateTrendingSeries() {
    const data = [];
    const base = 100;
    for (let i = 0; i < 360; i++) {
        data.push(base + i * 0.1 + Math.random() * 10 - 5);
    }
    return data;
}

function generateSeasonalSeries() {
    const data = [];
    const base = 100;
    for (let i = 0; i < 360; i++) {
        const seasonal = 20 * Math.sin(2 * Math.PI * i / 30); // Monthly pattern
        const noise = Math.random() * 5 - 2.5;
        data.push(base + seasonal + noise);
    }
    return data;
}

function generateVolatileSeries() {
    const data = [];
    const base = 100;
    let current = base;
    for (let i = 0; i < 360; i++) {
        const change = (Math.random() - 0.5) * 20;
        current = Math.max(50, Math.min(150, current + change));
        data.push(current);
    }
    return data;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SampleData;
}