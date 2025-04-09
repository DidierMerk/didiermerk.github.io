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
      // Example: Maastricht
      position: { lat: 50.8451423, lng: 5.6898313 },
      pov: {
        heading: 250,
        pitch: 0,
        zoom: 0
      },
      hint: "1" // First hint
    },
    {
      // Example: Sardinia
      position: { lat: 40.8758001, lng: 9.6289244 },
      pov: {
        heading: 70,
        pitch: 10,
        zoom: 0
      },
      hint: "2" // Second hint
    },
    {
      // Example: Nice, France
      position: { lat: 43.6952838, lng: 7.2757472 },
      pov: {
        heading: 180,
        pitch: 0,
        zoom: 0
      },
      hint: "1" // Third hint
    },
    {
      // Example: Dordogne, France
      position: { lat: 44.8265633, lng: 1.2669633 },
      pov: {
        heading: 0,
        pitch: 0,
        zoom: 0
      },
      hint: "4" // Fourth hint
    },
    {
        // Example: Tilburg, Netherlands
        position: { lat: 51.553584, lng: 5.103149 },
        pov: {
          heading: 0,
          pitch: 0,
          zoom: 0
        },
        hint: "J" // Fifth hint
      },
    {
      // Example: Gent, Belgium
      position: { lat: 51.0554101, lng: 3.7246344 },
      pov: {
        heading: 90,
        pitch: 0,
        zoom: 0
      },
      hint: "2" // Sixth hint
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