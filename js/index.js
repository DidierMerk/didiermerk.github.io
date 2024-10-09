// Function to update the active navigation link based on the current scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('div[id]');
    const navLinksDesktop = document.querySelectorAll('.header-nav a');
    const navLinksMobile = document.querySelectorAll('.mobile-menu a');
    const headerHeight = document.getElementById('header').offsetHeight; // Get the height of the fixed header
    
    let foundActiveSection = false;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            const currentSectionId = section.getAttribute('id');
            setActiveLink(currentSectionId, navLinksDesktop, navLinksMobile);
            foundActiveSection = true;
        }
    });

    // If no section is active, default to the first navigation link
    if (!foundActiveSection) {
        setActiveLink(navLinksDesktop[0].getAttribute('href').substring(1), navLinksDesktop, navLinksMobile);
    }
}

function setActiveLink(sectionId, navLinksDesktop, navLinksMobile) {
    navLinksDesktop.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === sectionId);
    });

    navLinksMobile.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === sectionId);
    });
}

// Ensure the first section is highlighted on page load
window.addEventListener('load', updateActiveLink);

// Update active link on scroll
document.addEventListener('scroll', updateActiveLink);

// Update active link on window resize
window.addEventListener('resize', updateActiveLink);

// Toggle the mobile menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileHeader = document.getElementById('mobile-header'); // Get the mobile header element

menuToggle.addEventListener('click', function() {
    // Toggle the 'open' class to add/remove sliding effect
    mobileMenu.classList.toggle('open');

    // Toggle the 'no-shadow' class to remove/add box-shadow from/to mobile header
    mobileHeader.classList.toggle('no-shadow');
});

// Close the mobile menu when a link is clicked and restore the box-shadow
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('open'); // Collapse the menu
        mobileHeader.classList.remove('no-shadow'); // Restore the box-shadow
    });
});

// Script to dynamically adjust the height of the timeline lines
function adjustTimelineLines() {
    const items = document.querySelectorAll('.experience-item');

    items.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        if (dot && index < items.length - 1) {
            const nextItem = items[index + 1];
            const nextDot = nextItem.querySelector('.timeline-dot');

            // Calculate the positions of the dots
            const dotRect = dot.getBoundingClientRect();
            const nextDotRect = nextDot.getBoundingClientRect();

            const dotBottom = dotRect.bottom + window.scrollY;
            const nextDotTop = nextDotRect.top + window.scrollY;

            // Calculate the height of the line
            const height = nextDotTop - dotBottom;
            dot.style.setProperty('--line-height', `${height}px`);
        }
    });
}

window.addEventListener('resize', adjustTimelineLines);
window.addEventListener('load', adjustTimelineLines);
window.addEventListener('scroll', adjustTimelineLines);

// Dark Mode 
const darkModeToggleDesktop = document.getElementById('dark-mode-toggle-desktop');
const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');

    // Toggle the icon between moon and sun
    const iconDesktop = darkModeToggleDesktop.querySelector('i');
    const iconMobile = darkModeToggleMobile.querySelector('i');

    if (body.classList.contains('dark-mode')) {
        iconDesktop.classList.remove('fa-moon');
        iconDesktop.classList.add('fa-sun');
        iconMobile.classList.remove('fa-moon');
        iconMobile.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        iconDesktop.classList.remove('fa-sun');
        iconDesktop.classList.add('fa-moon');
        iconMobile.classList.remove('fa-sun');
        iconMobile.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
}

darkModeToggleDesktop.addEventListener('click', toggleDarkMode);
darkModeToggleMobile.addEventListener('click', toggleDarkMode);

// Optional: Apply the user's preference on page load
window.addEventListener('load', function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggleDesktop.querySelector('i').classList.remove('fa-moon');
        darkModeToggleDesktop.querySelector('i').classList.add('fa-sun');
        darkModeToggleMobile.querySelector('i').classList.remove('fa-moon');
        darkModeToggleMobile.querySelector('i').classList.add('fa-sun');
    }
});

// Function to remove the fragment identifier from the URL
function removeHashFromUrl() {
    history.replaceState(null, null, ' ');
}

// Function to scroll to header links
document.querySelectorAll('.header-nav a, .mobile-menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href'); // Get the target ID (e.g., #home)
        const targetElement = document.querySelector(targetId); // Find the target element

        // Calculate the offset position from the top of the page
        const offsetPosition = targetElement.offsetTop - 65; // Change 100 to whatever offset you need

        // Smooth scroll to the offset position
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Remove the hash from the URL
        setTimeout(removeHashFromUrl, 0);
    });
});

// Also apply the same to the mobile menu links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href'); // Get the target ID (e.g., #home)
        const targetElement = document.querySelector(targetId); // Find the target element

        // Smooth scroll to the target element
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });

        // Remove the hash from the URL
        setTimeout(removeHashFromUrl, 0);
    });
});

// Function to fetch BibTeX data from the modals folder
async function fetchBibtexData(filename) {
    try {
        const response = await fetch(`modals/${filename}.bib`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const bibtexData = await response.text();
        return bibtexData; // Return the BibTeX content as a string
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return ''; // Return an empty string if there was an error
    }
}

// Attach event listeners to all "Cite" buttons
document.querySelectorAll('.cite-button').forEach((citeButton) => {
    citeButton.addEventListener('click', async function (event) { // Use async to allow fetching
        event.preventDefault(); // Prevent default link behavior
        const bibtexFilename = this.getAttribute('data-bibtex'); // Get the filename (without .bib)
        const bibtexData = await fetchBibtexData(bibtexFilename); // Fetch the BibTeX data
        const modalId = `modal-${bibtexFilename}`; // Generate a unique modal ID based on filename
        openModal(bibtexData, modalId); // Pass the fetched BibTeX data and modal ID to openModal
    });
});

// Function to open the modal with dynamic BibTeX content
function openModal(bibtexData, modalId) {
    // Check if the modal already exists, if not, create it
    let modal = document.getElementById(modalId);
    if (!modal) {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.insertAdjacentHTML('beforeend', `
            <div id="${modalId}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Cite</h2>
                        <span class="close-modal">&times;</span>
                    </div>
                    <pre class="bibtex-code">${bibtexData}</pre> <!-- Use class instead of ID -->
                    <div class="modal-buttons">
                        <button class="copy-bibtex">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <button class="download-bibtex">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `);
        modal = document.getElementById(modalId);
    }

    // Show the modal
    modal.style.display = "block";
    document.body.classList.add('modal-open');
    setTimeout(() => {
        modal.classList.add('show');
        modal.querySelector('.modal-content').classList.add('show');
    }, 10);

    // Attach event listeners for close and copy buttons
    const closeButton = modal.querySelector('.close-modal');
    closeButton.onclick = () => closeModal(modal);

    // Close modal if clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    const copyButton = modal.querySelector('.copy-bibtex');
    copyButton.addEventListener('click', () => copyBibtex(modalId));

    const downloadButton = modal.querySelector('.download-bibtex');
    downloadButton.addEventListener('click', () => downloadBibtex(modalId));
}

// Function to close the modal
function closeModal(modal) {
    modal.querySelector('.modal-content').classList.remove('show');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.style.display = "none";
    }, 700); // Match this delay with the duration of your animation
}

// Function to copy BibTeX code to clipboard
function copyBibtex(modalId) {
    const bibtexCode = document.querySelector(`#${modalId} .bibtex-code`).textContent;
    navigator.clipboard.writeText(bibtexCode).then(() => {
        const copyButton = document.querySelector(`#${modalId} .copy-bibtex`);
        copyButton.classList.add('copied');
        setTimeout(() => {
            copyButton.classList.remove('copied');
        }, 1500);
    }).catch((error) => {
        console.error("Failed to copy text: " + error);
    });
}

// Function to download BibTeX as a file
function downloadBibtex(modalId) {
    const bibtexCode = document.querySelector(`#${modalId} .bibtex-code`).textContent;
    const blob = new Blob([bibtexCode], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${modalId}.bib`;
    link.click();
}