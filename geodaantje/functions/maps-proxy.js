// functions/maps-proxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Get your API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    // Get the callback parameter from query string
    const callback = event.queryStringParameters.callback || 'initApp';
    
    // Create the complete URL for the Maps API
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callback}`;
    
    // Fetch the Google Maps JavaScript API
    const response = await axios.get(url);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: response.data
    };
  } catch (error) {
    console.error('Error loading Maps API:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load Google Maps API' })
    };
  }
};