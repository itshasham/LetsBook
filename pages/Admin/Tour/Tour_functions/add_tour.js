import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import '../Tour_css/add_tour.css';

const AddTripPage = () => {
  const router = useRouter();

  const [tourName, setTourName] = useState('');
  const [tripStartDate, setTripStartDate] = useState('');
  const [tripEndDate, setTripEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Lahore');
  const [lahorePickupTime, setLahorePickupTime] = useState('');
  const [tourGuideName, setTourGuideName] = useState('');
  const [tourGuidePhone, setTourGuidePhone] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [cost, setCost] = useState('');

  useEffect(() => {
    if (tripStartDate && tripEndDate) {
      const startDate = new Date(tripStartDate);
      const endDate = new Date(tripEndDate);
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;

      if (totalDays <= 0) {
        toast.error('End date must be after the start date.');
        setItineraries([]);
        return;
      }

      const newItineraries = Array.from({ length: totalDays }, (_, index) => ({
        day: index + 1,
        details: '',
      }));

      setItineraries(newItineraries);
    }
  }, [tripStartDate, tripEndDate]);

  const handleItineraryChange = (index, value) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[index].details = value.trim();
    setItineraries(updatedItineraries);
  };

  const calculateIslamabadPickupTime = (time) => {
    const [hours, minutes] = time.split(':');
    const lahoreTime = new Date();
    lahoreTime.setHours(parseInt(hours, 10) + 5, parseInt(minutes, 10));
    return lahoreTime.toISOString().substr(11, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tourName || !tripStartDate || !tripEndDate || !lahorePickupTime || !tourGuideName || !tourGuidePhone || !cost) {
      toast.error('Please fill all required fields.');
      return;
    }
  
    if (parseFloat(cost) <= 0) {
      toast.error('Cost must be greater than zero.');
      return;
    }
  
    if (itineraries.some((itinerary) => itinerary.details.trim() === '')) {
      toast.error('Please fill all itinerary details.');
      return;
    }
  
    const islamabadPickupTime = calculateIslamabadPickupTime(lahorePickupTime);
  
    const tripData = {
      tourName,
      tripStartDate,
      tripEndDate,
      lahorePickupTime,
      islamabadPickupTime,
      pickupLocation,
      tourGuide: {
        name: tourGuideName,
        phone: tourGuidePhone,
      },
      cost: parseFloat(cost),
      itineraries: itineraries.map((itinerary) => itinerary.details),
    };
  
    try {
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success(`Tour "${data.data.tourName}" added successfully!`);
        setTimeout(() => router.push('/Admin/Tour/Tour_functions/view_all_tours'), 3000); 
      } else {
        const errorData = await response.json();
        toast.error(`Error adding the tour: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Error: Could not connect to the server.');
    }
  };
  

  return (
    <div className="add-trip-container">
      <h2>Add a New Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tourName">Tour Name:</label>
          <input
            id="tourName"
            type="text"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tripStartDate">Start Date:</label>
          <input
            id="tripStartDate"
            type="date"
            value={tripStartDate}
            onChange={(e) => setTripStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tripEndDate">End Date:</label>
          <input
            id="tripEndDate"
            type="date"
            value={tripEndDate}
            onChange={(e) => setTripEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lahorePickupTime">Lahore Pickup Time:</label>
          <input
            id="lahorePickupTime"
            type="time"
            value={lahorePickupTime}
            onChange={(e) => setLahorePickupTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tourGuideName">Tour Guide Name:</label>
          <input
            id="tourGuideName"
            type="text"
            value={tourGuideName}
            onChange={(e) => setTourGuideName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tourGuidePhone">Tour Guide Phone:</label>
          <input
            id="tourGuidePhone"
            type="tel"
            value={tourGuidePhone}
            onChange={(e) => setTourGuidePhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost:</label>
          <input
            id="cost"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        {itineraries.length > 0 && (
          <div className="itinerary-section">
            <h3>Itineraries</h3>
            {itineraries.map((itinerary, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`itinerary-${index}`}>Day {index + 1}:</label>
                <textarea
                  id={`itinerary-${index}`}
                  value={itinerary.details}
                  onChange={(e) => handleItineraryChange(index, e.target.value)}
                  required/>
                  </div>
                ))}
              </div>
            )}
            <button type="submit">Add Trip</button>
          </form>
        </div>
      );
    };
    
    export default AddTripPage;
    