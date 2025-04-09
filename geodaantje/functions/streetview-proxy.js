// functions/streetview-proxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Get your API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    // Extract parameters from query string
    const { size, location, heading, pitch } = event.queryStringParameters;
    
    if (!size || !location) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }
    
    // Create URL for the Street View Static API
    const url = `https://maps.googleapis.com/maps/api/streetview`;
    
    // Make request to Street View API
    const response = await axios({
      method: 'get',
      url: url,
      params: {
        key: apiKey,
        size,
        location,
        heading,
        pitch
      },
      responseType: 'arraybuffer'  // Important for handling image data
    });
    
    // Return the image directly
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg'
      },
      body: response.data.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Error fetching Street View image:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Street View image' })
    };
  }
};