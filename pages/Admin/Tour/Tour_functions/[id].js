import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTourPage = ({ initialTour }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    tourName: initialTour.tourName || '',
    cost: initialTour.cost || '',
    tripStartDate: initialTour.tripStartDate.split('T')[0] || '',
    tripEndDate: initialTour.tripEndDate.split('T')[0] || '',
    lahorePickupTime: new Date(initialTour.lahorePickupTime).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }) || '',
    pickupLocation: initialTour.pickupLocation || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateIslamabadPickupTime = (time) => {
    const [hours, minutes] = time.split(':');
    const lahoreTime = new Date();
    lahoreTime.setHours(parseInt(hours, 10) + 5, parseInt(minutes, 10));
    return lahoreTime.toISOString().substr(11, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tourName || !formData.cost || !formData.tripStartDate || !formData.tripEndDate || !formData.lahorePickupTime) {
      toast.error('Please fill all required fields.');
      return;
    }

    const islamabadPickupTime = calculateIslamabadPickupTime(formData.lahorePickupTime);

    const updatedTour = {
      ...formData,
      lahorePickupTime: `${formData.tripStartDate}T${formData.lahorePickupTime}:00Z`,
      islamabadPickupTime: `${formData.tripStartDate}T${islamabadPickupTime}:00Z`,
    };

    try {
      const response = await fetch(`/api/tours/${initialTour.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTour),
      });

      if (response.ok) {
        toast.success('Tour updated successfully!');
        router.push('/Admin/Tour/Tour_functions/view_all_tours');
      } else {
        const errorData = await response.json();
        toast.error(`Error updating tour: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Error: Could not connect to the server.');
    }
  };

  return (
    <div className="update-tour-container">
      <h2>Update Tour</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tourName">Tour Name:</label>
          <input
            type="text"
            id="tourName"
            name="tourName"
            value={formData.tourName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tripStartDate">Start Date:</label>
          <input
            type="date"
            id="tripStartDate"
            name="tripStartDate"
            value={formData.tripStartDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tripEndDate">End Date:</label>
          <input
            type="date"
            id="tripEndDate"
            name="tripEndDate"
            value={formData.tripEndDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lahorePickupTime">Lahore Pickup Time:</label>
          <input
            type="time"
            id="lahorePickupTime"
            name="lahorePickupTime"
            value={formData.lahorePickupTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="update-button">
          Update Tour
        </button>
      </form>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`);
  const tours = await response.json();

  const paths = (tours?.data || []).map((tour) => ({
    params: { id: tour.id.toString() },
  }));

  console.log('Generated paths:', paths); 

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${id}`);
  const data = await response.json();

  return {
    props: {
      initialTour: data?.data || null, 
    },
  };
}

export default UpdateTourPage;
