// flightInfo.js
const axios = require('axios');

// API key for AviationStack - put your actual API key here
const API_KEY = "6e7d32f1d3ff56a6d6ac8bca23f95df4"
/**
 * Fetch flight information based on flight number from AviationStack API
 * @param {string} flightNumber - The flight number input by the user
 * @returns {Promise<Object>} - Returns a promise with the flight details
 */
async function getFlightDetails(flightNumber) {
    try {
        // URL for the AviationStack API with query parameters
        const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;

        // Sending request to AviationStack API
        const response = await axios.get(url);
        
        if (response.data && response.data.data.length > 0) {
            const flightData = response.data.data[0]; // Extracting the first result
            
            // Extracting the required details
            const flightDetails = {
                airline: flightData.airline.name,
                flightNumber: flightData.flight.iata,
                from: flightData.departure.iata,
                to: flightData.arrival.iata,
                terminal: flightData.arrival.terminal,
                scheduledTime: flightData.arrival.scheduled,
                actualTime: flightData.arrival.estimated,
                status: flightData.flight_status
            };
            console.log("!!!!!" + flightDetails);
            return flightDetails; // Return flight details
        } else {
            throw new Error('Flight not found.');
        }
    } catch (error) {
        console.error('Error fetching flight details:', error.message);
        throw error;
    }
}

module.exports = { getFlightDetails };
