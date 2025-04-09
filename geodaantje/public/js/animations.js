/**
 * Animations and visual effects for the game
 */

// Generate the SVG background for pages with background
function generateBackgroundSVG(container) {
  if (!container) return;
  
  // Clear any existing content
  container.innerHTML = '';
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
  // Add a subtle grid pattern to represent a map
  const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
  pattern.setAttribute('id', 'grid');
  pattern.setAttribute('width', '40');
  pattern.setAttribute('height', '40');
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  
  const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  gridLine.setAttribute('d', 'M 40 0 L 0 0 0 40');
  gridLine.setAttribute('fill', 'none');
  gridLine.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
  gridLine.setAttribute('stroke-width', '1');
  
  pattern.appendChild(gridLine);
  svg.appendChild(pattern);
  
  // Create a rectangle with the grid pattern
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('fill', 'url(#grid)');
  svg.appendChild(rect);
  
  // Add decorative map elements
  addMapElements(svg, width, height);
  
  // Add the SVG to the container
  container.appendChild(svg);
}

// Add decorative elements to represent map features
function addMapElements(svg, width, height) {
  // Add continents/islands as blobs
  const continents = [
    { cx: width * 0.2, cy: height * 0.3, r: 40 },
    { cx: width * 0.7, cy: height * 0.4, r: 50 },
    { cx: width * 0.8, cy: height * 0.7, r: 35 },
    { cx: width * 0.4, cy: height * 0.6, r: 45 },
    { cx: width * 0.1, cy: height * 0.8, r: 30 }
  ];
  
  // Create a group for the continents
  const continentGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  continentGroup.setAttribute('class', 'continents');
  
  continents.forEach((continent, index) => {
    const blob = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    blob.setAttribute('cx', continent.cx);
    blob.setAttribute('cy', continent.cy);
    blob.setAttribute('r', continent.r);
    blob.setAttribute('fill', 'rgba(255, 255, 255, 0.15)');
    blob.setAttribute('filter', 'url(#blur)');
    blob.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
    
    continentGroup.appendChild(blob);
  });
  
  // Add SVG filter for blur effect
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'blur');
  
  const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  gaussianBlur.setAttribute('stdDeviation', '10');
  gaussianBlur.setAttribute('result', 'blur');
  
  filter.appendChild(gaussianBlur);
  defs.appendChild(filter);
  
  // Add animated location pins
  const pins = [
    { x: width * 0.3, y: height * 0.4, delay: 0 },
    { x: width * 0.6, y: height * 0.2, delay: 0.5 },
    { x: width * 0.5, y: height * 0.7, delay: 1 },
    { x: width * 0.8, y: height * 0.5, delay: 1.5 },
    { x: width * 0.2, y: height * 0.6, delay: 2 }
  ];
  
  const pinGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  pinGroup.setAttribute('class', 'location-pins');
  
  pins.forEach((pin, index) => {
    const pinElement = createLocationPin(pin.x, pin.y);
    pinElement.style.animation = `dropPin 0.5s ease-out ${pin.delay}s forwards, float 3s ease-in-out ${pin.delay + 0.5}s infinite alternate`;
    pinElement.style.opacity = '0';
    pinElement.style.transform = 'translateY(-20px)';
    
    pinGroup.appendChild(pinElement);
  });
  
  // Append all elements to the SVG
  svg.appendChild(defs);
  svg.appendChild(continentGroup);
  svg.appendChild(pinGroup);
  
  // Add CSS animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }
    
    @keyframes dropPin {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;
  
  document.head.appendChild(style);
}

// Create a location pin SVG element
function createLocationPin(x, y) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', `translate(${x}, ${y})`);
  
  const pin = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pin.setAttribute('d', 'M0,0 C-5,-20 5,-20 0,0 M0,-15 L0,-30');
  pin.setAttribute('stroke', 'rgba(255, 255, 255, 0.6)');
  pin.setAttribute('stroke-width', '3');
  pin.setAttribute('stroke-linecap', 'round');
  pin.setAttribute('fill', 'none');
  
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '0');
  circle.setAttribute('cy', '0');
  circle.setAttribute('r', '5');
  circle.setAttribute('fill', 'white');
  
  g.appendChild(pin);
  g.appendChild(circle);
  
  return g;
}

// Page transitions
function transitionToPage(fromPageId, toPageId) {
  const fromPage = document.getElementById(fromPageId);
  const toPage = document.getElementById(toPageId);
  
  // Start transition
  fromPage.classList.remove('active');
  
  // Wait for the exit transition to complete
  setTimeout(() => {
    toPage.classList.add('active');
    
    // If transitioning to a page with an SVG background, generate it
    if (toPageId === 'landing-page' || toPageId === 'result-page' || toPageId === 'final-results-page') {
      const svgBackground = toPage.querySelector('.svg-background');
      generateBackgroundSVG(svgBackground);
    }
  }, 500); // Match the CSS transition time
}

// Celebration animation for correct guess
function playCelebrationAnimation() {
  // Create and append confetti container if it doesn't exist
  let confettiContainer = document.getElementById('confetti-container');
  
  if (!confettiContainer) {
    confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Add styles for the confetti
    const style = document.createElement('style');
    style.textContent = `
      #confetti-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 9999;
      }
      
      .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #f00;
        opacity: 0.8;
        animation: fall 3s ease-out forwards;
      }
      
      @keyframes fall {
        0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create confetti pieces
  const colors = ['#ff4e50', '#fc913a', '#f9d423', '#ede574', '#e1f5c4', '#add8e6', '#99c5c4'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Randomize confetti properties
    const left = Math.random() * 100;
    const size = Math.random() * 6 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 2;
    
    confetti.style.left = `${left}%`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.animationDelay = `${delay}s`;
    
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Pulse animation for the hint reveal
function animateHintReveal(hintValue) {
  const hintElement = document.getElementById('hint-value');
  hintElement.textContent = hintValue;
  hintElement.style.animation = 'none';
  
  // Trigger reflow to restart animation
  void hintElement.offsetWidth;
  
  hintElement.style.animation = 'pulseHint 1s ease-in-out';
}

// Capture a static image from street view for thumbnails
function captureStreetViewThumbnail(panorama) {
  if (!panorama) return null;
  
  // Get the position and POV from the panorama
  const position = panorama.getPosition();
  const pov = panorama.getPov();
  
  if (!position) return null;
  
  // Create a Street View Static API URL using our proxy
  const lat = position.lat();
  const lng = position.lng();
  const heading = pov.heading || 0;
  const pitch = pov.pitch || 0;
  
  // Use our proxy instead of directly accessing the Google API
  return `/api/streetview-proxy?size=400x300&location=${lat},${lng}&heading=${heading}&pitch=${pitch}`;
}

// Initialize animations
function initAnimations() {
  // Generate the SVG background for all pages with svg-background class
  const svgBackgrounds = document.querySelectorAll('.svg-background');
  svgBackgrounds.forEach(container => {
    if (container.closest('.page.active')) {
      generateBackgroundSVG(container);
    }
  });
  
  // Resize handler for responsive SVG
  window.addEventListener('resize', () => {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
      const svgContainer = activePage.querySelector('.svg-background');
      if (svgContainer) {
        generateBackgroundSVG(svgContainer);
      }
    }
  });
}