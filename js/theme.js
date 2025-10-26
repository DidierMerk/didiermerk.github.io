/**
 * Theme toggle functionality for Didier Merk's academic resume website
 * Handles dark/light mode switching and persistence
 * Version: 1.0
 */

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileThemeIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;

// Check for saved user preference, if any
function getThemePreference() {
    // First check localStorage
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    
    // If I want the system preference detection back, uncomment below:
    // // If not found in localStorage, check system preference
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    //     return 'light';
    // }

    // Default to dark mode for all first-time visitors
    return 'dark';
}

// Apply the user's theme preference
function applyTheme(theme) {
    // Empty the icon first to prevent layout shifts
    themeIcon.className = '';
    if (mobileThemeIcon) mobileThemeIcon.className = '';
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.add('fas', 'fa-moon');
        if (mobileThemeIcon) mobileThemeIcon.classList.add('fas', 'fa-moon');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.add('fas', 'fa-sun');
        if (mobileThemeIcon) mobileThemeIcon.classList.add('fas', 'fa-sun');
    }
}

// Save user preference to localStorage
function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = getThemePreference();
    applyTheme(savedTheme);
    
    // Theme toggle button click handler
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            // Switch to dark mode
            applyTheme('dark');
            saveThemePreference('dark');
        } else {
            // Switch to light mode
            applyTheme('light');
            saveThemePreference('light');
        }
        
        // Update particles colors based on theme
        updateParticlesColors();
    });

    // Add this new click handler for mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-mode')) {
                // Switch to dark mode
                applyTheme('dark');
                saveThemePreference('dark');
            } else {
                // Switch to light mode
                applyTheme('light');
                saveThemePreference('light');
            }
            
            // Update particles colors based on theme
            updateParticlesColors();
        });
    }
    
    // Handle system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newTheme = e.matches ? 'dark' : 'light';
            // Only apply if the user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                applyTheme(newTheme);
                updateParticlesColors();
            }
        });
    }
    
    // Initial particles color update based on theme
    updateParticlesColors();
});

// Update particles colors based on current theme
function updateParticlesColors() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        const isLightMode = body.classList.contains('light-mode');
        const particleColor = isLightMode ? '#007acc' : '#64ffda';
        const lineColor = isLightMode ? '#007acc' : '#64ffda';
        
        // Update particles colors
        try {
            pJSDom[0].pJS.particles.color.value = particleColor;
            pJSDom[0].pJS.particles.line_linked.color = lineColor;
            
            // Refresh particles
            pJSDom[0].pJS.fn.particlesRefresh();
        } catch (e) {
            console.warn('Could not update particles colors:', e);
        }
    }
}