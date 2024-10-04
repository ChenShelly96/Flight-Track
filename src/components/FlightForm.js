import axios from 'axios';
import React, { useState } from 'react';

const FlightForm = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);

  const submitFlight = async (event) => {
    event.preventDefault();
    try {
  
      const response = await axios.get(`https://mysterious-fortress-46920-6fc91d4ef02d.herokuapp.com/check-updates/${flightNumber}`);
      setFlightData(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
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

      {flightData && (
        <div>
          <h3>Flight Status</h3>
          <p>Status: {flightData.status}</p>
          <p>Departure Time: {flightData.departureTime}</p>
          <p>Arrival Time: {flightData.arrivalTime}</p>
        </div>
      )}
    </div>
  );
};

export default FlightForm;
