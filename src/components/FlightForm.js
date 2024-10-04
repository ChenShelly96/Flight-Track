import React, { useState } from 'react';
import { getFlightDetails } from './flightInfo';

const FlightForm = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null); 

  const submitFlight = async (event) => {
    event.preventDefault();
    setError(null); 
    try {
    
      const flightDetails = await getFlightDetails(flightNumber);
      setFlightData(flightDetails);
      console.log("!!!!!" + flightDetails);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight details. Please try again.');
    }
  };

  return (
    <div>
      <h2>Flight Tracker</h2>
      <form onSubmit={submitFlight}>
        <div>
          <label htmlFor="flightNumber">Flight Number:</label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Track Flight</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {flightData && (
        <div>
          <h3>Flight Status</h3>
          <p><strong>Airline:</strong> {flightData.airline}</p>
          <p><strong>Flight Number:</strong> {flightData.flightNumber}</p>
          <p><strong>From:</strong> {flightData.from}</p>
          <p><strong>To:</strong> {flightData.to}</p>
          <p><strong>Terminal:</strong> {flightData.terminal || 'N/A'}</p>
          <p><strong>Scheduled Arrival Time:</strong> {flightData.scheduledTime}</p>
          <p><strong>Actual Arrival Time:</strong> {flightData.actualTime || 'N/A'}</p>
          <p><strong>Status:</strong> {flightData.status}</p>
        </div>
      )}
    </div>
  );
};

export default FlightForm;
