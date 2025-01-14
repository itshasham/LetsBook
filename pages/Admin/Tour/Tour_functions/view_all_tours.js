import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import '../Tour_css/view_all_tours.css';

const AllToursPage = ({ initialTours }) => {
  const [tours, setTours] = useState(initialTours || []); 
  const [loading, setLoading] = useState(!initialTours);  
  const router = useRouter();

  useEffect(() => {
    if (!initialTours) {
      const fetchTours = async () => {
        try {
          const response = await fetch('/api/tours');
          if (response.ok) {
            const data = await response.json();
            setTours(data);
          } else {
            toast.error('Error fetching tours');
          }
        } catch (error) {
          toast.error('Error: Could not connect to the server.');
        } finally {
          setLoading(false);
        }
      };
      fetchTours();
    } else {
      setLoading(false);
    }
  }, [initialTours]);

  const handleUpdate = (tourId) => {
    router.push(`/Admin/Tour/Tour_functions/${tourId}`);
  };

  const handleDelete = async (tourId) => {
    try {
      const response = await fetch(`/api/tours/${tourId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== tourId));
        toast.success('Tour deleted successfully!');
      } else {
        toast.error('Failed to delete tour');
      }
    } catch (error) {
      toast.error('Error: Could not connect to the server.');
    }
  };

  if (loading) {
    return <p>Loading tours...</p>;
  }

  if (tours.length === 0) {
    return <p>No tours available at the moment.</p>;
  }

  return (
    <div className="all-tours-container">
      <h2>All Tours</h2>
      <div className="tours-grid">
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <h3>{tour.tourName || 'Unnamed Tour'}</h3>
            <p><strong>Cost:</strong> PKR {tour.cost || 'N/A'}</p>
            <p><strong>Start Date:</strong> {new Date(tour.tripStartDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(tour.tripEndDate).toLocaleDateString()}</p>
            <p><strong>Pickup Location:</strong> {tour.pickupLocation || 'N/A'}</p>
            <p><strong>Pickup Time:</strong> {tour.lahorePickupTime || 'N/A'}</p>
            <div className="tour-actions">
              <button className="update-button" onClick={() => handleUpdate(tour.id)}>Update</button>
              <button className="delete-button" onClick={() => handleDelete(tour.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`);
    if (!response.ok) {
      throw new Error('Failed to fetch tours');
    }
    const tours = await response.json();

    return {
      props: {
        initialTours: tours, 
      },
    };
  } catch (error) {
    console.error('Error fetching tours during SSR:', error);
    return {
      props: {
        initialTours: [], 
      },
    };
  }
}

export default AllToursPage;
