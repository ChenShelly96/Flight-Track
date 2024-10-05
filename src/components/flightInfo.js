
const API_KEY = '6e7d32f1d3ff56a6d6ac8bca23f95df4';

/**
 * Fetch flight information based on flight number from AviationStack API
 * @param {string} flightNumber - The flight number input by the user
 * @returns {Promise<Object>} - Returns a promise with the flight details
 */
async function getFlightDetails(flightNumber, flightDate) {
    console.log(flightDate);
    try {
        
       /* if (!(flightDate instanceof Date)) {
         
            flightDate = new Date(flightDate);
        }
        flightDate = new Date(flightDate);*/
        console.log("FLIGHT INFO FILE !!  ");
        console.log(flightDate);

        const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;

        const response = await fetch(url);
        const apiResponse = await response.json();
        console.log(apiResponse);
        if (apiResponse.data && apiResponse.data.length > 0) {
            // Extracting the first flight from the results
            const flightData = apiResponse.data[0];
          
            
            // Extracting the required details
            const flightDetails = {
                airline: flightData.airline_name,
                flightNumber: flightData.flight.iata,
                from: flightData.departure.iata,
                fromAirport: flightData.departure.airport,
                to: flightData.arrival.iata,
                toAirport:  flightData.arrival.airport, 
                arrivalTerminal: flightData.arrival.terminal,
                departureTerminal: flightData.departure.terminal,
                arrivalScheduledTime: flightData.arrival.scheduled,
                arrivalActualTime: flightData.arrival.estimated,
                departureScheduledTime: flightData.departure.scheduled,
                departureActualTime: flightData.departure.estimated,
                depGate:flightData.departure.gate,
                arrGate: flightData.arrival.gate,
                status: flightData.flight_status,
            };
            console.log(flightDetails);
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
