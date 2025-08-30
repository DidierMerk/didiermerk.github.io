/**
 * Blog JavaScript - Enhanced with Main Site Features
 * Handles all blog interactivity including theme switching
 * Version: 5.0
 */

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const body = document.body;
const sections = document.querySelectorAll('section[id]');

// Theme Management
function getThemePreference() {
    // First check localStorage
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    
    // If not found in localStorage, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    
    // Default to dark
    return 'dark';
}

function applyTheme(theme) {
    const themeIcon = themeToggle.querySelector('i');
    const mobileThemeIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;
    
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

function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme
    const savedTheme = getThemePreference();
    applyTheme(savedTheme);
    
    // Initialize all features
    initScrollEffects();
    initMobileMenu();
    initBackToTop();
    initReadingProgress();
    initShareMenu();
    initThemeToggle();
    
    // Set initial active navigation
    setActiveNav();
});

// Theme Toggle Functionality
function initThemeToggle() {
    // Desktop theme toggle
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            applyTheme('dark');
            saveThemePreference('dark');
        } else {
            applyTheme('light');
            saveThemePreference('light');
        }
    });

    // Mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-mode')) {
                applyTheme('dark');
                saveThemePreference('dark');
            } else {
                applyTheme('light');
                saveThemePreference('light');
            }
        });
    }
    
    // Handle system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newTheme = e.matches ? 'dark' : 'light';
            // Only apply if the user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                applyTheme(newTheme);
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Update active navigation
        setActiveNav();
    });
}

// Add active class to navigation based on scroll position
function setActiveNav() {
    const scrollPosition = window.scrollY;
    
    // First remove all active classes
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Get specific links by their text content
    const homeLink = Array.from(document.querySelectorAll('.nav-links a')).find(a => a.textContent.trim() === 'Home');
    const blogLink = Array.from(document.querySelectorAll('.nav-links a')).find(a => a.textContent.trim() === 'Blog');
    const aboutLink = document.querySelector('.nav-links a[href="#about-author"]');
    const relatedLink = document.querySelector('.nav-links a[href="#related-articles"]');
    
    // If at the very top of the page, highlight Home
    if (scrollPosition < 100) {
        if (homeLink) homeLink.classList.add('active');
        return;
    }
    
    // Check if we're in a specific section
    let currentSection = null;
    
    // Check About and Related sections
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Highlight the appropriate link based on current section
    if (currentSection === 'about-author' && aboutLink) {
        aboutLink.classList.add('active');
    } else if (currentSection === 'related-articles' && relatedLink) {
        relatedLink.classList.add('active');
    } else {
        // Default to Blog when reading the article
        if (blogLink) blogLink.classList.add('active');
    }
}

// Mobile Menu - Matching Main Site
function initMobileMenu() {
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            this.classList.toggle('active');
            header.classList.toggle('header-menu-open');
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navLinks.classList.remove('show');
            navToggle.classList.remove('active');
            header.classList.remove('header-menu-open');
        }
    });

    // Close mobile nav when clicking a link
    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show');
                navToggle.classList.remove('active');
                header.classList.remove('header-menu-open');
            });
        });
    }
}

// Back to Top Button - Matching Main Site
function initBackToTop() {
    if (!backToTop) return;
    
    // Show/hide based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;
    
    const article = document.querySelector('.article-content-section');
    if (!article) return;
    
    window.addEventListener('scroll', function() {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        
        // Calculate progress
        const progress = Math.max(0, Math.min(1, 
            (scrolled - articleTop + windowHeight) / articleHeight
        ));
        
        // Update bar width
        progressBar.style.width = `${progress * 100}%`;
    });
}

// Share Menu
function initShareMenu() {
    const shareButton = document.getElementById('shareButton');
    const shareMenu = document.getElementById('shareMenu');
    
    if (!shareButton || !shareMenu) return;
    
    // Toggle menu
    shareButton.addEventListener('click', function(e) {
        e.stopPropagation();
        shareMenu.classList.toggle('active');
    });
    
    // Close on outside click
    document.addEventListener('click', function() {
        shareMenu.classList.remove('active');
    });
    
    // Handle share options
    const shareOptions = shareMenu.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.querySelector('.article-title').textContent);
            
            let shareUrl;
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    break;
                    
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    break;
                    
                case 'copy':
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        // Visual feedback
                        const icon = this.querySelector('i');
                        const originalClass = icon.className;
                        icon.className = 'fas fa-check';
                        this.style.backgroundColor = 'var(--secondary)';
                        this.style.color = 'var(--primary)';
                        
                        setTimeout(() => {
                            icon.className = originalClass;
                            this.style.backgroundColor = '';
                            this.style.color = '';
                        }, 2000);
                    });
                    break;
            }
            
            // Close menu
            shareMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - 10;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Call setActiveNav on scroll
window.addEventListener('scroll', setActiveNav);

// Call setActiveNav on page load
window.addEventListener('load', setActiveNav);