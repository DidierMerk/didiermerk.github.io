/**
 * Main application logic for the GeoGuess birthday game
 */

// Game state
let gameState = {
    currentRound: 0,
    totalRounds: gameLocations.length,
    locations: [...gameLocations], // Copy the locations array
    guessPosition: null,
    results: [],
    collectedHints: [],
    thumbnails: []
  };
  
  // Google Maps objects
  let streetViewService;
  let streetViewPanorama;
  let map;
  let guessMarker;
  
  // Initialize the application
  function initApp() {
    // Initialize animations
    initAnimations();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize Google Maps services
    streetViewService = new google.maps.StreetViewService();
    
    // Update UI elements
    document.getElementById('total-rounds').textContent = gameState.totalRounds;
  }
  
  // Set up event listeners for UI interactions
  function setupEventListeners() {
    // Start button
    document.getElementById('start-button').addEventListener('click', startGame);
    
    // Guess button
    document.getElementById('guess-button').addEventListener('click', showGuessMap);
    
    // Confirm guess button
    document.getElementById('confirm-guess').addEventListener('click', submitGuess);
    
    // Back to view button
    document.getElementById('back-to-view').addEventListener('click', () => {
      transitionToPage('map-page', 'streetview-page');
    });
    
    // Next location button
    document.getElementById('next-location').addEventListener('click', nextLocation);
  }
  
  // Start a new game
  function startGame() {
    // Reset game state
    resetGame();
    
    // Go to the first location
    transitionToPage('landing-page', 'streetview-page');
    
    // Load the first location
    loadLocation(gameState.currentRound);
  }
  
  // Reset the game state
  function resetGame() {
    gameState = {
      currentRound: 0,
      totalRounds: gameLocations.length,
      locations: [...gameLocations], // Make a fresh copy
      guessPosition: null,
      results: [],
      collectedHints: [],
      thumbnails: []
    };
    
    // Clear the results
    document.getElementById('location-thumbnails').innerHTML = '';
    document.getElementById('collected-hints').innerHTML = '';
    
    // Reset UI elements
    document.getElementById('current-round').textContent = 1;
  }
  
  // Load a location into street view
  function loadLocation(locationIndex) {
    // Show loading overlay
    showLoading();
    
    // Get the location data
    const location = gameState.locations[locationIndex];
    
    // Initialize street view if not already done
    if (!streetViewPanorama) {
      streetViewPanorama = new google.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
          position: location.position,
          pov: location.pov || { heading: 0, pitch: 0, zoom: 1 },
          addressControl: false,
          linksControl: false,     // Disables street links
          clickToGo: false,        // Disables clicking to navigate
          showRoadLabels: false,   // Hides street names overlaid on the panorama
          panControl: true,
          enableCloseButton: false,
          zoomControl: true,
          fullscreenControl: false,
          motionTracking: false,
          motionTrackingControl: false
        }
      );
    } else {
      // Update the street view with the new location
      streetViewPanorama.setPosition(location.position);
      
      if (location.pov) {
        streetViewPanorama.setPov(location.pov);
      }
      
      // Make sure our movement restrictions are still applied
      streetViewPanorama.setOptions({
        clickToGo: false,
        showRoadLabels: false,
        linksControl: false
      });
    }
    
    // Hide loading overlay after street view is loaded
    google.maps.event.addListenerOnce(streetViewPanorama, 'status_changed', function() {
      if (streetViewPanorama.getStatus() === google.maps.StreetViewStatus.OK) {
        hideLoading();
        
        // Capture a thumbnail of this location for the final results
        const thumbnailUrl = captureStreetViewThumbnail(streetViewPanorama);
        if (thumbnailUrl) {
          gameState.thumbnails[gameState.currentRound] = thumbnailUrl;
        }
      } else {
        console.error('Street View data not found for this location');
        hideLoading();
        // Try to load the next location if this one fails
        nextLocation();
      }
    });
  }
  
  // Show the guess map
  function showGuessMap() {
    // Transition to the map page
    transitionToPage('streetview-page', 'map-page');
    
    // Initialize the map if not already done
    if (!map) {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20, lng: 0 },
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        streetViewControl: false,
        fullscreenControl: false
      });
      
      // Add click listener to place a guess
      map.addListener('click', function(event) {
        placeGuessMarker(event.latLng);
      });
    } else {
      // Reset the map view
      map.setCenter({ lat: 20, lng: 0 });
      map.setZoom(2);
      
      // Clear any existing marker
      if (guessMarker) {
        guessMarker.setMap(null);
      }
    }
    
    // Disable the confirm guess button until a marker is placed
    document.getElementById('confirm-guess').classList.add('disabled');
    gameState.guessPosition = null;
  }
  
  // Place a marker on the map for the guess
  function placeGuessMarker(position) {
    // Clear any existing marker
    if (guessMarker) {
      guessMarker.setMap(null);
    }
    
    // Create a new marker at the clicked position
    guessMarker = createMapMarker(map, position, '#6e8efb');
    
    // Add a bounce animation
    guessMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      guessMarker.setAnimation(null);
    }, 500);
    
    // Store the guess position
    gameState.guessPosition = {
      lat: position.lat(),
      lng: position.lng()
    };
    
    // Enable the confirm guess button
    document.getElementById('confirm-guess').classList.remove('disabled');
  }
  
  // Submit the guess and show results
  function submitGuess() {
    // Make sure a guess was made
    if (!gameState.guessPosition) {
      return;
    }
    
    // Get the actual location
    const currentLocation = gameState.locations[gameState.currentRound];
    const actualPosition = currentLocation.position;
    
    // Calculate the distance between the guess and the actual location
    const distance = calculateDistance(gameState.guessPosition, actualPosition);
    
    // Determine if the guess was correct (within 15km)
    const isCorrect = distance <= 15;
    
    // Store the result
    const result = {
      round: gameState.currentRound + 1,
      isCorrect: isCorrect,
      distance: distance,
      guessPosition: gameState.guessPosition,
      actualPosition: actualPosition,
      hint: currentLocation.hint,
      thumbnailUrl: gameState.thumbnails[gameState.currentRound]
    };
    
    gameState.results.push(result);
    
    // If correct, collect the hint
    if (isCorrect) {
      gameState.collectedHints.push(currentLocation.hint);
    }
    
    // Show the result page
    transitionToPage('map-page', 'result-page');
    
    // Display the appropriate result box
    showResultBox(isCorrect);
    
    // Update the result details
    if (isCorrect) {
      // Show the actual distance
      document.getElementById('correct-distance-value').textContent = formatDistance(distance);
      
      // Animate the hint reveal
      animateHintReveal(currentLocation.hint);
      
      // Play celebration animation
      playCelebrationAnimation();
    } else {
      // Update the distance display
      document.getElementById('distance-value').textContent = formatDistance(distance);
    }
    
    // Check if this was the last round
    if (gameState.currentRound === gameState.totalRounds - 1) {
      // Change the "Next Location" button text to "See Final Results"
      document.getElementById('next-location').textContent = 'See Final Results';
    }
  }
  
  // Move to the next location
  function nextLocation() {
    // Check if this was the last round
    if (gameState.currentRound === gameState.totalRounds - 1) {
      // Show the final results page
      transitionToPage('result-page', 'final-results-page');
      
      // Update the location thumbnails
      updateLocationThumbnails();
      
      // Update the collected hints display
      updateHintsDisplay();
      
      return;
    }
    
    // Move to the next round
    gameState.currentRound++;
    
    // Update the current round display
    document.getElementById('current-round').textContent = gameState.currentRound + 1;
    
    // Go back to the street view page
    transitionToPage('result-page', 'streetview-page');
    
    // Load the next location
    loadLocation(gameState.currentRound);
    
    // Reset the "Next Location" button text
    document.getElementById('next-location').textContent = 'Next Location';
  }
  
  // Update the location thumbnails in the final results
  function updateLocationThumbnails() {
    const thumbnailsContainer = document.getElementById('location-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    // Create a card for each location in order of round number (1-6)
    for (let i = 0; i < gameState.totalRounds; i++) {
      const roundNumber = i + 1;
      
      // Find the result for this round
      const result = gameState.results.find(r => r.round === roundNumber);
      
      if (result) {
        const card = createLocationCard(
          result.round,
          result.thumbnailUrl,
          result.isCorrect,
          result.isCorrect ? `✓ Hint: ${result.hint}` : `✗ ${formatDistance(result.distance)} away`
        );
        
        thumbnailsContainer.appendChild(card);
      }
    }
  }
  
  // Update the hint boxes in the final results screen
  function updateHintsDisplay() {
    const hintsContainer = document.getElementById('collected-hints');
    hintsContainer.innerHTML = '';
    
    // Create a hint box for each round
    for (let i = 0; i < gameState.totalRounds; i++) {
      // Find the result for this round
      const result = gameState.results.find(r => r.round === i + 1);
      
      // Create a hint box
      const hintBox = createHintBox(
        result && result.isCorrect ? result.hint : '?',
        !(result && result.isCorrect)
      );
      
      hintsContainer.appendChild(hintBox);
    }
  }
  
  // Initialize the application when the Google Maps API has loaded
  window.initApp = initApp;