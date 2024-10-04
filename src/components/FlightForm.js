import React, { useState } from 'react';
import { getFlightDetails } from './flightInfo'; // Importing the function from flightInfo.js

const FlightForm = () => {
  // State to store the flight number input by the user
  const [flightNumber, setFlightNumber] = useState('');
  // State to store the fetched flight data
  const [flightData, setFlightData] = useState(null);
  // State to handle and display error messages
  const [error, setError] = useState(null);

  // Function that handles the form submission
  const submitFlight = async (event) => {
    event.preventDefault(); // Prevents page from refreshing
    try {
      setError(null); // Resetting any previous errors
      // Calling the function from flightInfo.js to fetch flight details
      const flightDetails = await getFlightDetails(flightNumber);
      // Storing the fetched flight details in the state
      setFlightData(flightDetails);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      // Setting the error state to display the message
      setError('Failed to fetch flight data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Flight Tracker</h2>
      {/* Form to input flight number */}
      <form onSubmit={submitFlight}>
        <div>
          <label htmlFor="flightNumber">Flight Number:</label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            // Updating the flight number state when user types
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Track Flight</button>
      </form>

      {/* Displaying error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Displaying flight details if available */}
      {flightData && (
        <div>
          <h3>Flight Status</h3>
          <p>Airline: {flightData.airline}</p> {/* Airline name */}
          <p>Flight Number: {flightData.flightNumber}</p> {/* Flight number */}
          <p>From: {flightData.from}</p> {/* Departure airport */}
          <p>To: {flightData.to}</p> {/* Arrival airport */}
          <p>Terminal: {flightData.terminal}</p> {/* Arrival terminal */}
          <p>Scheduled Arrival: {new Date(flightData.scheduledTime).toLocaleString()}</p> {/* Scheduled time */}
          <p>Actual Arrival: {new Date(flightData.actualTime).toLocaleString()}</p> {/* Actual time if available */}
          <p>Status: {flightData.status}</p> {/* Flight status */}
        </div>
      )}
    </div>
  );
};

export default FlightForm;
