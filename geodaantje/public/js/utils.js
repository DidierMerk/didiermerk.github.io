/**
 * Utility functions for the game
 */

// Calculate distance between two coordinates in kilometers
function calculateDistance(point1, point2) {
  // Earth's radius in kilometers
  const earthRadius = 6371;
  
  // Convert latitude and longitude from degrees to radians
  const lat1 = toRadians(point1.lat);
  const lon1 = toRadians(point1.lng);
  const lat2 = toRadians(point2.lat);
  const lon2 = toRadians(point2.lng);
  
  // Haversine formula
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  
  // Round to 1 decimal place
  return Math.round(distance * 10) / 10;
}

// Convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Format a distance nicely
function formatDistance(distance) {
  // Display in meters if less than 1 km
  if (distance < 1) {
    const meters = Math.round(distance * 1000);
    return `${meters} meters`;
  }
  // Otherwise display in km
  return `${distance.toLocaleString()} km`;
}

// Show/hide an element
function toggleElementVisibility(elementId, visible) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = visible ? 'block' : 'none';
  }
}

// Show a specific result box (correct or incorrect)
function showResultBox(isCorrect) {
  // Hide both result boxes first
  document.getElementById('correct-result').classList.remove('active');
  document.getElementById('incorrect-result').classList.remove('active');
  
  // Show the appropriate result box
  if (isCorrect) {
    document.getElementById('correct-result').classList.add('active');
  } else {
    document.getElementById('incorrect-result').classList.add('active');
  }
}

// Create a location card for the final results page
function createLocationCard(roundNumber, thumbnailUrl, isCorrect, resultText) {
  const card = document.createElement('div');
  card.className = 'location-card';
  
  // Create thumbnail
  const thumbnail = document.createElement('div');
  thumbnail.className = 'location-thumbnail';
  
  // Set the background image if we have a thumbnail URL
  if (thumbnailUrl) {
    thumbnail.style.backgroundImage = `url(${thumbnailUrl})`;
  } else {
    // Fallback solid color
    thumbnail.style.backgroundColor = '#eee';
  }
  
  // Add round number overlay
  const roundOverlay = document.createElement('div');
  roundOverlay.className = 'location-round';
  roundOverlay.textContent = roundNumber;
  thumbnail.appendChild(roundOverlay);
  
  // Create result text
  const result = document.createElement('div');
  result.className = `location-result ${isCorrect ? 'location-correct' : 'location-incorrect'}`;
  result.textContent = resultText;
  
  // Append elements to card
  card.appendChild(thumbnail);
  card.appendChild(result);
  
  return card;
}

// Create a hint box for the final results page
function createHintBox(hint, isEmpty) {
  const hintBox = document.createElement('div');
  hintBox.className = `hint-box ${isEmpty ? 'empty-hint' : ''}`;
  hintBox.textContent = hint;
  return hintBox;
}

// Show loading overlay
function showLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.add('active');
}

// Hide loading overlay
function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.remove('active');
}

// Create a marker for the map
function createMapMarker(map, position, color = 'red', label = '') {
  return new google.maps.Marker({
    position: position,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: 'white',
      strokeWeight: 2,
      scale: 10
    },
    label: label
  });
}

// Draw a line between two points on the map
function drawMapLine(map, point1, point2) {
  return new google.maps.Polyline({
    path: [point1, point2],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    map: map
  });
}

// Fit map bounds to include multiple points
function fitMapToBounds(map, points) {
  const bounds = new google.maps.LatLngBounds();
  
  points.forEach(point => {
    bounds.extend(point);
  });
  
  map.fitBounds(bounds);
  
  // Add some padding
  map.setZoom(map.getZoom() - 0.5);
}