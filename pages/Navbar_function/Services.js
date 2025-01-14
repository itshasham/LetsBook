import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import './Services.css';
import Navbar from '@/components/Navbar';

const AllToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  const handleAddToCart = (tour) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = storedCart.some((item) => item.id === tour.id && item.type === 'trip');

    if (isAlreadyInCart) {
      toast.info(`${tour.tourName} is already in the cart.`);
      return;
    }

    const newCart = [...storedCart, { ...tour, type: 'trip' }];
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success(`${tour.tourName} added to cart.`);

    router.push('/Navbar_function/Cart');
  };

  if (loading) {
    return <p>Loading tours...</p>;
  }

  if (tours.length === 0) {
    return <p>No tours available at the moment.</p>;
  }

  return (
    <div className="all-tours-container">
      <Navbar />
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
            <button onClick={() => handleAddToCart(tour)} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllToursPage;
