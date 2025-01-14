import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import './OrderPlaced.css';

const OrderPlaced = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <div className="order-placed-container">
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order.</p>
        <img 
          src="/images/orderPlaced.svg" 
          alt="Order Success" 
          className="order-placed-image" 
        />
        <button onClick={handleGoBack} className="back-to-home-button">
          Go Back To Home Page
        </button>
      </div>
    </div>
  );
};

export default OrderPlaced;
