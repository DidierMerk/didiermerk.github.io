/**
 * Main JavaScript file for Didier Merk's academic resume website
 * Contains core functionality and scroll effects
 * Version: 1.0
 */

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');
const scrollIndicator = document.getElementById('scrollIndicator');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Hide scroll indicator when scrolled
    if (window.scrollY > 100) {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
        }
    } else {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        this.classList.toggle('active'); // Toggle active class for animation
        
        // Add this new line to toggle the solid header background
        header.classList.toggle('header-menu-open');
    });
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
    // Check if nav is open and click is outside nav and nav toggle
    if (navLinks.classList.contains('show') && 
        !navLinks.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navLinks.classList.remove('show');
        navToggle.classList.remove('active'); // Remove active class
        
        // Add this new line to remove the solid header background
        header.classList.remove('header-menu-open');
    }
});

// Close mobile nav when clicking a link
if (navLinksItems) {
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
            navToggle.classList.remove('active'); // Remove active class
            
            // Add this new line to remove the solid header background
            header.classList.remove('header-menu-open');
        });
    });
}

// Scroll indicator click
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Find the section title within the about section
            const sectionTitle = aboutSection.querySelector('.section-title');
            
            const headerHeight = document.querySelector('header').offsetHeight;
            let targetPosition;
            
            if (sectionTitle) {
                // Target the section title instead of the section top
                targetPosition = sectionTitle.getBoundingClientRect().top + window.pageYOffset;
                // Subtract 10px to position the title just below the header with a small gap
                const offsetPosition = targetPosition - headerHeight - 10;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback to original behavior if section title not found
                const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Back to top button
if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    // Get viewport height
    const viewportHeight = window.innerHeight;
    const activationPoint = viewportHeight * 0.8;
    
    // Timeline items animation
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        
        if (itemPosition < activationPoint) {
            item.classList.add('active');
        }
    });
    
    // Project cards animation
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        
        if (cardPosition < activationPoint) {
            card.classList.add('active');
        }
    });
    
    // Publication items animation
    publicationItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        
        if (itemPosition < activationPoint) {
            item.classList.add('active');
        }
    });
}

// ===== PROJECTS CAROUSEL FUNCTIONALITY =====
(function() {
    const carouselTrack = document.getElementById('projectsCarouselTrack');
    const carouselWrapper = document.querySelector('.projects-carousel-wrapper');
    const leftBtn = document.getElementById('carouselControlLeft');
    const rightBtn = document.getElementById('carouselControlRight');
    const paginationContainer = document.getElementById('carouselPagination');
    
    if (!carouselTrack || !leftBtn || !rightBtn || !paginationContainer) return;
    
    const cards = carouselTrack.querySelectorAll('.project-card');
    const cardCount = cards.length;

    // Helper function to get actual card dimensions
    function getCardDimensions() {
        if (cards.length === 0) return { width: 380, gap: 24 };
        
        const firstCard = cards[0];
        const cardWidth = firstCard.offsetWidth;
        
        // Calculate gap from CSS
        const trackStyle = window.getComputedStyle(carouselTrack);
        const gap = parseFloat(trackStyle.gap) || 24;
        
        return { width: cardWidth, gap: gap };
    }
    
    // Create pagination dots
    function createPaginationDots() {
        paginationContainer.innerHTML = '';
        
        // Create the sliding selection bar
        const selectionBar = document.createElement('div');
        selectionBar.className = 'carousel-selection-bar';
        selectionBar.id = 'carouselSelectionBar';
        paginationContainer.appendChild(selectionBar);
        
        // Create dots
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to project ${i + 1}`);
            dot.setAttribute('data-index', i);
            
            // Click handler for each dot
            dot.addEventListener('click', () => scrollToCard(i));
            
            paginationContainer.appendChild(dot);
        }
        
        // Set initial selection bar position
        updateSelectionBar();
    }
    
    // Scroll to a specific card by index
    function scrollToCard(index) {
        const { width: cardWidth, gap } = getCardDimensions();
        const scrollPosition = index * (cardWidth + gap);
        
        carouselTrack.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Scroll one card at a time
    function scrollCarousel(direction) {
        const currentIndex = getCurrentCardIndex();
        
        if (direction === 'left' && currentIndex > 0) {
            scrollToCard(currentIndex - 1);
        } else if (direction === 'right' && currentIndex < cardCount - 1) {
            scrollToCard(currentIndex + 1);
        }
    }
    
    // Get the current card index based on scroll position
    function getCurrentCardIndex() {
        const scrollLeft = carouselTrack.scrollLeft;
        const { width: cardWidth, gap } = getCardDimensions();
        const cardTotalWidth = cardWidth + gap;
        
        // Calculate which card is most visible
        const index = Math.round(scrollLeft / cardTotalWidth);
        return Math.max(0, Math.min(index, cardCount - 1));
    }
    
    // Update the sliding selection bar position and width
    function updateSelectionBar() {
        const selectionBar = document.getElementById('carouselSelectionBar');
        if (!selectionBar) return;
        
        const dots = paginationContainer.querySelectorAll('.carousel-dot');
        if (dots.length === 0) return;
        
        const scrollLeft = carouselTrack.scrollLeft;
        const viewportWidth = carouselTrack.clientWidth;
        const { width: cardWidth, gap } = getCardDimensions();
        const cardTotalWidth = cardWidth + gap;
        
        // Calculate the range of visible cards
        const firstVisibleIndex = Math.floor(scrollLeft / cardTotalWidth);
        const lastVisibleIndex = Math.floor((scrollLeft + viewportWidth - gap) / cardTotalWidth);
        
        // Get the first and last visible dots
        const firstDot = dots[firstVisibleIndex];
        const lastDot = dots[lastVisibleIndex];
        
        if (firstDot && lastDot) {
            // Calculate position relative to pagination container
            const containerRect = paginationContainer.getBoundingClientRect();
            const firstDotRect = firstDot.getBoundingClientRect();
            const lastDotRect = lastDot.getBoundingClientRect();
            
            // Calculate the bar's left position and width
            const barLeft = firstDotRect.left - containerRect.left;
            const barWidth = lastDotRect.right - firstDotRect.left;
            
            // Apply the position and width
            selectionBar.style.left = `${barLeft}px`;
            selectionBar.style.width = `${barWidth}px`;
        }
    }
    
    // Update button visibility and fade effects based on scroll position
    function updateCarouselState() {
        const scrollLeft = carouselTrack.scrollLeft;
        const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
        const currentIndex = getCurrentCardIndex();
        
        // Update active dot
        updateSelectionBar();
        
        // Update button states
        if (scrollLeft <= 0) {
            leftBtn.classList.add('hidden');
            carouselWrapper.classList.add('at-start');
        } else {
            leftBtn.classList.remove('hidden');
            carouselWrapper.classList.remove('at-start');
        }
        
        if (scrollLeft >= maxScroll - 1) {
            rightBtn.classList.add('hidden');
            carouselWrapper.classList.add('at-end');
        } else {
            rightBtn.classList.remove('hidden');
            carouselWrapper.classList.remove('at-end');
        }
    }
    
    // Event Listeners
    leftBtn.addEventListener('click', () => scrollCarousel('left'));
    rightBtn.addEventListener('click', () => scrollCarousel('right'));
    
    // Update on scroll
    carouselTrack.addEventListener('scroll', updateCarouselState);
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateCarouselState();
        // Scroll to current card to maintain position
        const currentIndex = getCurrentCardIndex();
        scrollToCard(currentIndex);
    });
    
    // Initialize
    createPaginationDots();
    updateCarouselState();
})();

// Timeline item expand/collapse functionality
function initializeTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-header');
        const toggle = item.querySelector('.timeline-toggle');
        const expandable = item.querySelector('.timeline-expandable');
        
        // Set initial state - all collapsed
        item.setAttribute('data-expanded', 'false');
        expandable.style.maxHeight = '0';
        expandable.style.opacity = '0';
        
        // Add click event to header and toggle button
        header.addEventListener('click', (e) => {
            // Prevent clicks on links or buttons within the header from triggering expansion
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
                e.target.closest('a') || e.target.closest('button:not(.timeline-toggle)')) {
                return;
            }
            
            toggleTimelineItem(item);
        });
        
        // Also add specific click handler to toggle button
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTimelineItem(item);
            });
        }
    });
}

// Function to toggle timeline item expansion
function toggleTimelineItem(item) {
    const isExpanded = item.getAttribute('data-expanded') === 'true';
    const expandable = item.querySelector('.timeline-expandable');
    const toggleIcon = item.querySelector('.timeline-toggle i');
    
    // Close any other open items first
    const allItems = document.querySelectorAll('.timeline-item');
    allItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.getAttribute('data-expanded') === 'true') {
            resetTimelineItem(otherItem);
        }
    });
    
    // Toggle current item
    if (isExpanded) {
        // Collapse
        resetTimelineItem(item);
    } else {
        // Expand
        item.setAttribute('data-expanded', 'true');
        expandable.style.maxHeight = '500px';
        expandable.style.opacity = '1';
        expandable.style.marginTop = '1rem';
        toggleIcon.style.transform = 'rotate(180deg)';
        
        // Scroll into view if needed (with a small delay to allow animation to start)
        setTimeout(() => {
            const itemRect = item.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (itemRect.bottom > viewportHeight) {
                const scrollAdjustment = Math.min(150, itemRect.height / 3);
                window.scrollBy({
                    top: itemRect.bottom - viewportHeight + scrollAdjustment,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    // Update experience section position (if needed)
    updateExperienceSectionPosition();
}

// Function to properly reset a timeline item to its collapsed state
function resetTimelineItem(item) {
    const expandable = item.querySelector('.timeline-expandable');
    const toggleIcon = item.querySelector('.timeline-toggle i');
    
    // Reset data attribute
    item.setAttribute('data-expanded', 'false');
    
    // Reset all visual styles
    expandable.style.maxHeight = '0';
    expandable.style.opacity = '0';
    expandable.style.marginTop = '0';
    
    // Reset icon rotation
    if (toggleIcon) {
        toggleIcon.style.transform = 'rotate(0deg)';
    }
    
    // Remove any animation classes
    expandable.classList.remove('timeline-expandable-animating');
    expandable.classList.add('timeline-collapsible-animating');
    
    // Clean up animation classes after transition completes
    setTimeout(() => {
        expandable.classList.remove('timeline-collapsible-animating');
    }, 500); // Match the transition duration
}

// Fix for hash links and fixed header
// When clicking on a link, adjust scroll position to account for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Find the section title within the target section
            const sectionTitle = targetElement.querySelector('.section-title');
            
            const headerHeight = document.querySelector('header').offsetHeight;
            let targetPosition;
            
            if (sectionTitle) {
                // Target the section title instead of the section top
                targetPosition = sectionTitle.getBoundingClientRect().top + window.pageYOffset;
                // Subtract 10px to position the title just below the header with a small gap
                const offsetPosition = targetPosition - headerHeight - 10;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback to original behavior if section title not found
                targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Reset animations for education items
function resetEducationItemAnimations() {
    const educationItems = document.querySelectorAll('.education-item');
    
    // Remove any existing animations and delays
    educationItems.forEach(item => {
        // Clear any existing animation styles
        item.style.animation = 'none';
        item.style.opacity = '0';
    });
    
    // Force a browser reflow to ensure styles are applied
    void document.querySelector('.education-item').offsetWidth;
    
    // Apply animations with proper sequential delays
    educationItems.forEach((item, index) => {
        // Set proper animation with delay based on index
        item.style.animation = `fadeInUp 0.5s ease forwards ${0.2 + (index * 0.1)}s`;
    });
}

// Reset animations for degree detail views (fixes Safari bug with disappearing grades)
function resetDegreeDetailAnimations(degreeId) {
    const degreeDetails = document.getElementById(`${degreeId}-details`);
    
    if (!degreeDetails) return;
    
    // Get all animated elements within the degree details
    const degreeInfo = degreeDetails.querySelector('.degree-detail-info');
    const degreeHighlights = degreeDetails.querySelector('.degree-highlights');
    
    // Reset degree-detail-info animation
    if (degreeInfo) {
        degreeInfo.style.animation = 'none';
        degreeInfo.style.opacity = '0';
        
        // Force reflow
        void degreeInfo.offsetWidth;
        
        // Reapply animation
        degreeInfo.style.animation = 'slideDown 0.5s ease forwards';
        degreeInfo.style.opacity = '';
    }
    
    // Reset degree-highlights animation (the grades section)
    if (degreeHighlights) {
        degreeHighlights.style.animation = 'none';
        degreeHighlights.style.opacity = '0';
        
        // Force reflow - CRITICAL for Safari
        void degreeHighlights.offsetWidth;
        
        // Reapply animation with delay
        degreeHighlights.style.animation = 'scaleUp 0.5s ease forwards';
        degreeHighlights.style.animationDelay = '0.2s';
        degreeHighlights.style.opacity = '';
    }
}

// Properly setup education overview
function setupEducationOverview() {
    // Hide all degree details first
    document.querySelectorAll('.degree-details').forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Show education overview
    const educationOverview = document.getElementById('education-overview');
    educationOverview.style.display = 'block';
    educationOverview.classList.remove('slide-out');
    educationOverview.classList.add('slide-in');
    
    // Reset animations for the education items
    resetEducationItemAnimations();
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial animations with slight delay
    setTimeout(function() {
        animateOnScroll();
    }, 200);
    
    // Add smooth fade-in for page content
    document.body.classList.add('loaded');

    // Initialize the tab system
    initializeTabSystem();

    // Initialize the expandable timeline items
    initializeTimelineItems();
    
    // Degree detail view functionality
    initializeDegreeDetailView();
});

// Initialize degree detail view functionality
function initializeDegreeDetailView() {
    // Get all degree links
    const degreeLinks = document.querySelectorAll('.degree-link');
    const backButtons = document.querySelectorAll('.back-to-education');
    
    // Add click event to degree links
    if (degreeLinks.length > 0) {
        degreeLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the degree ID
                const degreeId = this.getAttribute('data-degree');
                
                // Show the degree details
                showDegreeDetails(degreeId);
            });
        });
    }
    
    // Add click event to back buttons
    if (backButtons.length > 0) {
        backButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling
                
                // Show education overview
                showEducationOverview();
            });
        });
    }
}

// Tab System Functionality
function initializeTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Skip if already active
            if (this.classList.contains('active')) return;
            
            // Get target tab
            const targetTab = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(`${targetTab}-tab`);
            const currentPanel = document.querySelector('.tab-panel.active');
            
            // Don't proceed if we're mid-animation
            if (currentPanel.classList.contains('animating')) return;
            
            // REPLACE this block with the animation code below
            // Update active button with animation
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'animate-in');
            });
            this.classList.add('active', 'animate-in');
            
            // Mark that we're animating
            if (currentPanel) currentPanel.classList.add('animating');
            
            // Get current height of the container for smooth transition
            const tabsContent = document.querySelector('.tabs-content');
            const currentHeight = tabsContent.offsetHeight;
            
            // First fade out the current panel
            if (currentPanel) {
                currentPanel.classList.add('content-fade-out');
                
                // Wait for fade out to complete
                setTimeout(() => {
                    currentPanel.classList.remove('active', 'content-fade-out', 'animating');
                    
                    // Now prepare for height animation
                    tabsContent.style.height = `${currentHeight}px`;
                    tabsContent.classList.add('tabs-content-animating');
                    
                    // Show the target panel (invisible but in DOM flow)
                    targetPanel.style.opacity = '0';
                    targetPanel.classList.add('active');
                    
                    // Get the new height and animate to it
                    const newHeight = targetPanel.offsetHeight;
                    tabsContent.style.height = `${newHeight}px`;
                    
                    // Fade in the content
                    setTimeout(() => {
                        targetPanel.classList.add('content-fade-in');
                        targetPanel.style.opacity = ''; // Remove inline opacity
                        
                        // Clean up after animation completes
                        setTimeout(() => {
                            tabsContent.style.height = '';
                            tabsContent.classList.remove('tabs-content-animating');
                            targetPanel.classList.remove('content-fade-in', 'animating');
                            
                            // Only prepare skills animations when switching TO skills tab
                            if (targetTab === 'skills') {
                                prepareSkillsAnimation();
                            }
                        }, 300); // Match content fade-in duration
                    }, 50);
                }, 200); // Match fade-out duration
            }
        });
    });
}

// Add a clean, simple function to show skills with animation
function prepareSkillsAnimation() {
    // First remove any previous animation classes
    document.getElementById('skills-tab').classList.remove('show-skills');
    
    // Set a short timeout to add the animation class after the tab is visible
    setTimeout(() => {
        document.getElementById('skills-tab').classList.add('show-skills');
    }, 50);
}

// ===================================
// SIMPLE SKILLS LIST FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-simple-item');
    
    skillItems.forEach(item => {
        const header = item.querySelector('.skill-simple-header');
        
        header.addEventListener('click', function() {
            const isExpanded = item.getAttribute('data-expanded') === 'true';
            
            // Close all other items first (accordion behavior)
            skillItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.getAttribute('data-expanded') === 'true') {
                    otherItem.setAttribute('data-expanded', 'false');
                }
            });
            
            // Toggle the clicked item
            item.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
        });
    });
});

// Show degree details
function showDegreeDetails(degreeId) {
    // Hide education overview with slide-out animation
    const educationOverview = document.getElementById('education-overview');
    educationOverview.classList.remove('slide-in');
    educationOverview.classList.add('slide-out');
    
    // Hide tabs navigation with animation
    const tabsNav = document.querySelector('.tabs-nav');
    tabsNav.classList.add('tabs-nav-slide-up');
    
    // Get current height for smooth transition
    const tabsContent = document.querySelector('.tabs-content');
    const currentHeight = tabsContent.offsetHeight;
    tabsContent.style.height = `${currentHeight}px`;
    tabsContent.classList.add('tabs-content-animating');
    
    // After a short delay, hide overview and show details
    setTimeout(() => {
        // Remove animation class and add hidden class
        tabsNav.classList.remove('tabs-nav-slide-up');
        tabsNav.classList.add('tabs-nav-hidden');
        
        // Hide education overview
        educationOverview.style.display = 'none';
        
        // Show degree details
        const degreeDetails = document.getElementById(`${degreeId}-details`);
        degreeDetails.style.display = 'block';
        degreeDetails.classList.remove('slide-out');
        degreeDetails.classList.add('slide-in');
        
        // Get new height and animate to it
        const newHeight = degreeDetails.offsetHeight;
        tabsContent.style.height = `${newHeight}px`;

        // *** FIX: Reset and retrigger animations for degree details (fixes Safari grades bug) ***
        setTimeout(() => {
            resetDegreeDetailAnimations(degreeId);
        }, 50);
        
        // Clean up after animation completes
        setTimeout(() => {
            tabsContent.style.height = '';
            tabsContent.classList.remove('tabs-content-animating');
            
            // Ensure experience section doesn't overlap
            updateExperienceSectionPosition();
        }, 300);
    }, 300);
}

// Show education overview
function showEducationOverview() {
    // Hide all degree details with slide-out animation
    const degreeDetails = document.querySelectorAll('.degree-details');
    const tabsContent = document.querySelector('.tabs-content');
    
    // Get current height for animation
    const currentHeight = tabsContent.offsetHeight;
    tabsContent.style.height = `${currentHeight}px`;
    tabsContent.classList.add('tabs-content-animating');
    
    degreeDetails.forEach(detail => {
        if (detail.style.display === 'block') {
            detail.classList.remove('slide-in');
            detail.classList.add('slide-out');
            detail.style.opacity = '0';
        }
    });
    
    // After a short delay, hide details and show overview
    setTimeout(() => {
        // Hide all degree details
        degreeDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Show tabs navigation with animation
        const tabsNav = document.querySelector('.tabs-nav');
        tabsNav.classList.remove('tabs-nav-hidden');
        tabsNav.classList.add('tabs-nav-slide-down');
        
        // Show education overview (but invisible initially)
        const educationOverview = document.getElementById('education-overview');
        educationOverview.style.display = 'block';
        educationOverview.style.opacity = '0';
        
        // Get new height and animate to it
        const newHeight = educationOverview.offsetHeight + tabsNav.offsetHeight + 20; // Add some padding
        tabsContent.style.height = `${newHeight}px`;
        
        // Fade in education overview
        setTimeout(() => {
            educationOverview.classList.remove('slide-out');
            educationOverview.classList.add('slide-in');
            educationOverview.style.opacity = '';

            // *** FIX: Reset and retrigger education item animations for Safari ***
            resetEducationItemAnimations();
            
            // Clear animation class after it completes
            setTimeout(() => {
                tabsNav.classList.remove('tabs-nav-slide-down');
                tabsContent.style.height = '';
                tabsContent.classList.remove('tabs-content-animating');
            }, 400); // Match animation duration
        }, 50);
    }, 250);
}

// Update experience section position to avoid overlap
function updateExperienceSectionPosition() {
    setTimeout(() => {
        const aboutCards = document.querySelector('.about-cards');
        const experienceSection = document.getElementById('experience');
        
        if (experienceSection && aboutCards) {
            const cardRect = aboutCards.getBoundingClientRect();
            const cardBottom = cardRect.top + cardRect.height;
            const experienceSectionTop = experienceSection.getBoundingClientRect().top;
            
            // If there's an overlap, add margin to push experience section down
            if (cardBottom > experienceSectionTop) {
                const marginNeeded = cardBottom - experienceSectionTop + 20; // 20px extra space
                experienceSection.style.marginTop = `${marginNeeded}px`;
            } else {
                experienceSection.style.marginTop = '1rem';
            }
        }
    }, 350);
}

// Call updateExperienceSectionPosition when the window loads to ensure proper initial layout
window.addEventListener('load', updateExperienceSectionPosition);

// Make back button more accessible
document.addEventListener('DOMContentLoaded', function() {
    const backButtons = document.querySelectorAll('.back-to-education');
    
    backButtons.forEach(button => {
        // Increase z-index to ensure button is above other elements
        button.style.zIndex = '20';
        
        // Add a more distinctive hover effect
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(100, 255, 218, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        // Add keyboard accessibility
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Initialize citation modal functionality
    initializeCitationModal();
});

// Citation Modal Functionality - moved outside the DOMContentLoaded event
function initializeCitationModal() {
    // DOM elements
    const citationLinks = document.querySelectorAll('.cite-link');
    const citationModal = document.getElementById('citationModal');
    const closeButton = document.querySelector('.citation-modal-close');
    const copyButton = document.getElementById('copyBibtex');
    const downloadButton = document.getElementById('downloadBibtex');
    const bibtexContent = document.getElementById('bibtexContent');
    
    // Open modal and load BibTeX content
    citationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the BibTeX file path from data attribute
            const bibtexFile = this.getAttribute('data-bibtex');
            
            // Load the BibTeX content
            fetch(bibtexFile)
                .then(response => response.text())
                .then(text => {
                    bibtexContent.textContent = text;
                    citationModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                })
                .catch(error => {
                    console.error('Error loading BibTeX file:', error);
                    bibtexContent.textContent = 'Error loading citation data.';
                    citationModal.style.display = 'block';
                });
        });
    });
    
    // Close modal
    function closeModal() {
        citationModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    // Close when clicking the X button
    closeButton.addEventListener('click', closeModal);
    
    // Close when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === citationModal) {
            closeModal();
        }
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && citationModal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Copy BibTeX to clipboard
    copyButton.addEventListener('click', function() {
        const textToCopy = bibtexContent.textContent;
        const originalContent = copyButton.innerHTML;
        
        if (navigator.clipboard && textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Visual feedback that copy was successful
                    copyButton.classList.add('copy-success');
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    
                    // Reset button after animation
                    setTimeout(() => {
                        copyButton.classList.remove('copy-success');
                        copyButton.innerHTML = originalContent;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    
                    // Show error state
                    copyButton.classList.add('copy-error');
                    copyButton.innerHTML = '<i class="fas fa-times"></i> Failed';
                    
                    // Reset button after animation
                    setTimeout(() => {
                        copyButton.classList.remove('copy-error');
                        copyButton.innerHTML = originalContent;
                    }, 1500);
                });
        }
    });
    
    // Download BibTeX file
    downloadButton.addEventListener('click', function() {
        const textToDownload = bibtexContent.textContent;
        const filename = 'citation.bib';
        
        if (textToDownload) {
            const blob = new Blob([textToDownload], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }
    });
}

// Add active class to navigation based on scroll position
function setActiveNav() {
    const scrollPosition = window.scrollY + 100; // Adjust for header height
    
    // First remove all active classes
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find the current section and add active class
    let currentSection = null;
    
    // Loop through sections in reverse order to handle overlap correctly
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop) {
            currentSection = sectionId;
            break;
        }
    }
    
    // Add active class to the current section link
    if (currentSection) {
        const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // If at the top of the page, activate the first link (Home)
        const firstLink = document.querySelector('.nav-links a[href="#hero"]');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
}

// Call setActiveNav on scroll
window.addEventListener('scroll', setActiveNav);

// Initialize setActiveNav on page load
document.addEventListener('DOMContentLoaded', setActiveNav);

// Add window resize handler to adjust experience section position
window.addEventListener('resize', function() {
    updateExperienceSectionPosition();
});

// ===== BLOG TOAST NOTIFICATION =====
document.addEventListener('DOMContentLoaded', function() {
    const blogLinks = document.querySelectorAll('.blog-coming-soon');
    const toast = document.getElementById('blogToast');
    const closeButton = toast ? toast.querySelector('.blog-toast-close') : null;
    let toastTimeout;
    
    if (!toast || blogLinks.length === 0) return;
    
    // Function to show toast
    function showToast() {
        if (toastTimeout) clearTimeout(toastTimeout);
        
        toast.classList.add('show');
        
        // Auto-hide after 3.5 seconds
        toastTimeout = setTimeout(() => {
            hideToast();
        }, 3500);
    }
    
    // Function to hide toast
    function hideToast() {
        toast.classList.remove('show');
        if (toastTimeout) clearTimeout(toastTimeout);
    }
    
    // Add click event to all blog links
    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showToast();
        });
    });
    
    // Close button
    if (closeButton) {
        closeButton.addEventListener('click', hideToast);
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && toast.classList.contains('show')) {
            hideToast();
        }
    });
});