import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import '../App.css';
import '../styles/FlightForm.css';
import { getFlightDetails } from './flightInfo';


const FlightForm = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dates, setDates] = useState([]);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);


  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };


  const generateDates = useCallback(() => {
    const dateArray = [];
    const today = new Date();
    
    for (let i = 0; i <= 3; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      const formattedDate = formatDate(futureDate); // Use the formatDate function
      dateArray.push(formattedDate);
    }
    
    return dateArray;
  }, []);

  useEffect(() => {
    const generatedDates = generateDates();
    setDates(generatedDates);
    setSelectedDate(generatedDates[0]); // Set the default selected date to today's date
  }, [generateDates]);


  const submitFlight = async (event) => {
    event.preventDefault();
    try {
      setError(null); 
      const flightDetails = await getFlightDetails(flightNumber, selectedDate);
      setFlightData(flightDetails);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data. Please try again.');
    }
  };

  const handleFlightWatch = () => {
    const watchlist = JSON.parse(localStorage.getItem('flightWatchlist')) || [];
    const newFlight = { flightNumber: flightData.flightNumber, date: selectedDate };

    // Check if flight already exists in the watchlist
    const flightExists = watchlist.some(
      (flight) => flight.flightNumber === newFlight.flightNumber && flight.date === newFlight.date
    );

    if (!flightExists) {
      watchlist.push(newFlight);
      localStorage.setItem('flightWatchlist', JSON.stringify(watchlist));
      alert('Flight added to watchlist!');
    } else {
      alert('This flight is already in the watchlist.');
    }
  };

 
  return (
    <div className="flight-form">
      <h2>Flight Tracker</h2>

      <form onSubmit={submitFlight}>
        <div className="input-group mb-3">
          {/* Flight Number Input */}
          <input
            type="text"
            className="form-control"
            placeholder="Flight Number"
            aria-label="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
          
          {/* Date Picker Dropdown */}
          <div className="input-group-append">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret className="btn btn-secondary">
                {selectedDate === 'Today' ? 'Today' : selectedDate}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose Date</DropdownItem>
                {dates.map((date, index) => (
                  <DropdownItem key={index} onClick={() => setSelectedDate(date)}>
                    {index === 0 ? 'Today' : date}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Search Flight Button */}
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Search Flight</button>
          </div>
        </div>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

       {/* Display flight details */}
<Container>
      {flightData && (
        <div className="flight-details">
          <div className="d-flex justify-content-between">
            <h3>{flightData.airline} ({flightData.flightNumber})</h3>
        </div>

   {/* Add Track Flight Button */}
   <Row className="mt-3">
              <Col>
              <button className="btn btn-info mt-3" onClick={handleFlightWatch}>Track Flight</button>
              </Col>
            </Row>


  {/* Display flight status */}
    <Row>
        <div class="card text-white bg-success mb-3" style={{width: '10rem'}}>
            <div class="card-header">{flightData.status}</div>
           
        </div>
    </Row>
        <Row>

          
         {/* Departue section */}
         <Col>
                <Card border="card text-dark bg-warning mb-3" style={{ width: '28rem' }}>
                    <Card.Header>Departure</Card.Header>
                    <Card.Body>
                        <div className='depText'>
                                <Card.Title>{flightData.from}</Card.Title>
                                <Card.Title>{flightData.fromAirport}</Card.Title>
                                <Card.Text>
                        
                                <p>Scheduled: {new Date(flightData.departureScheduledTime).toLocaleString()}</p>
                                <p>Estimated: {new Date(flightData.departureActualTime).toLocaleString()}</p>
                                <p>Terminal: {flightData.departureTerminal || '-'}</p>
                                <p>Gate: {flightData.depGate || '-'}</p>
                    
                                </Card.Text> 
                        </div>
                    </Card.Body>
                </Card>
        </Col>
 {/* Arrival section */}
        <Col>
            <Card border="card text-dark bg-warning mb-3" style={{ width: '28rem' }}>
                <Card.Header>Arrival</Card.Header>
                        <Card.Body>
                            <div className='arrText'>
                                    <Card.Title>{flightData.to}</Card.Title>
                                    <Card.Title>{flightData.toAirport}</Card.Title>
                                    <Card.Text>
                            
                                    <p>Scheduled: {new Date(flightData.arrivalScheduledTime).toLocaleString()}</p>
                                    <p>Estimated: {new Date(flightData.arrivalActualTime).toLocaleString()}</p>
                                    <p>Terminal: {flightData.arrivalTerminal || '-'}</p>
                                    <p>Gate: {flightData.arrGate || '-'}</p>
                        
                                    </Card.Text> 
                            </div>
                        </Card.Body>
                </Card>
          </Col>
        </Row> 

        </div> )}
       
    </Container>
    </div>
  );
};

export default FlightForm;
