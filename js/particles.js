/**
 * Particles.js configuration for Didier Merk's academic resume website
 * Creates an AI/ML network visualization in the background
 * Version: 2.0 - With robust theme support
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Get the current theme colors based on light/dark mode
     * @returns {Object} Theme-appropriate colors for particles
     */
    function getThemeColors() {
        const isLightMode = document.body.classList.contains('light-mode');
        return {
            particleColor: isLightMode ? '#007acc' : '#64ffda',
            lineColor: isLightMode ? '#007acc' : '#64ffda'
        };
    }
    
    /**
     * Create a complete particles.js configuration with theme awareness
     * @param {boolean} isMobile - Whether to use mobile optimization
     * @returns {Object} Complete particles.js configuration
     */
    function createConfig(isMobile = false) {
        const colors = getThemeColors();
        
        return {
            "particles": {
                "number": {
                    "value": isMobile ? 30 : 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": colors.particleColor
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": colors.lineColor,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": isMobile ? 1.5 : 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        };
    }
    
    /**
     * Initialize or refresh the particles based on current state
     */
    function initializeOrRefreshParticles() {
        const isMobile = window.innerWidth < 768;
        const particlesContainer = document.getElementById('particles-js');
        
        if (typeof particlesJS !== 'undefined' && particlesContainer) {
            // Generate a fresh config based on current theme and device
            const config = createConfig(isMobile);
            
            // Initialize particles with the theme-aware config
            particlesJS('particles-js', config);
        }
    }
    
    // Initialize particles on page load
    initializeOrRefreshParticles();
    
    // Debounced window resize handler with theme awareness
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(function() {
            initializeOrRefreshParticles();
        }, 200);
    });
    
    // Observer for theme changes - watches for class changes on body
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                // The body class has changed, which might indicate a theme change
                initializeOrRefreshParticles();
            }
        });
    });
    
    // Start observing the body for class changes
    bodyObserver.observe(document.body, { attributes: true });
    
    // Pause particles when tab is not active to save resources
    document.addEventListener('visibilitychange', function() {
        const particlesCanvas = document.querySelector('#particles-js canvas');
        
        if (document.hidden && particlesCanvas) {
            particlesCanvas.style.opacity = '0.3';
        } else if (particlesCanvas) {
            particlesCanvas.style.opacity = '1';
        }
    });
    
    // Make the updateParticlesColors function globally available
    // This allows other scripts (like theme.js) to trigger updates
    window.updateParticlesColors = function() {
        initializeOrRefreshParticles();
    };
});