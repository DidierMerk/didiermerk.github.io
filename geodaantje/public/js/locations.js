/**
 * Game locations configuration
 * 
 * Each location has:
 * - position: latitude and longitude coordinates
 * - pov (optional): Point of view settings for street view
 *   - heading: Camera direction (0-360 degrees, 0 = north, 90 = east)
 *   - pitch: Camera tilt (-90 to 90 degrees)
 *   - zoom: Zoom level (0-5)
 * - hint: The hint to show if guessed correctly
 * 
 * To add your own locations:
 * 1. Find interesting places on Google Maps
 * 2. Get the coordinates (right-click on the map and select "What's here?")
 * 3. Replace the position values below
 * 4. Adjust the POV settings if desired
 * 5. Update the hints as needed
 */

const gameLocations = [
    {
      // Example: Eze
      position: { lat: 43.7276967, lng: 7.3617562 },
      pov: {
        heading: 250,
        pitch: 0,
        zoom: 0
      },
      hint: "I" // First hint
    },
    {
      // Example: Sardinia
      position: { lat: 53.2182207, lng: 6.5684624 },
      pov: {
        heading: 70,
        pitch: 10,
        zoom: 0
      },
      hint: "L" // Second hint
    },
    {
      // Example: Nice, France
      position: { lat: 53.3515336, lng: -6.2991907 },
      pov: {
        heading: 180,
        pitch: 0,
        zoom: 0
      },
      hint: "O" // Third hint
    },
    {
      // Example: Dordogne, France
      position: { lat: 52.3201849, lng: 4.8918898 },
      pov: {
        heading: 0,
        pitch: 0,
        zoom: 0
      },
      hint: "V" // Fourth hint
    },
    {
        // Example: Tilburg, Netherlands
        position: { lat: 48.8370604, lng: 2.3811095 },
        pov: {
          heading: 0,
          pitch: 0,
          zoom: 0
        },
        hint: "E" // Fifth hint
      },
    {
      // Example: Gent, Belgium
      position: { lat: 53.3867104, lng: -6.0660251 },
      pov: {
        heading: 90,
        pitch: 0,
        zoom: 0
      },
      hint: "U" // Sixth hint
    }
  ];
  
  /**
   * You can easily replace these locations with your own by:
   * 
   * 1. Using Google Maps to find interesting locations
   * 2. Right-click on the exact spot and select "What's here?"
   * 3. Copy the coordinates from the pop-up (format: lat, lng)
   * 4. Replace the position values above
   * 5. Optionally customize the POV settings
   * 6. Make sure to keep the hints you want
   * 
   * Tips for choosing good locations:
   * - Pick places with distinctive architecture or landmarks
   * - Choose locations in different countries/continents
   * - Look for places that have good Street View coverage
   * - Consider locations that might have personal meaning to Daantje
   * 
   * To preview a street view location before adding it:
   * Visit: https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=LAT,LNG
   * (Replace LAT,LNG with your coordinates)
   */