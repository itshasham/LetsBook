import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import './Cart.css'

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id, type) => {
    const updatedCart = cart.filter((item) => !(item.id === id && item.type === type));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success('Item removed from cart.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handlePlaceOrder = async () => {
    const { name, phone, address, email } = orderDetails;

    if (!name || !phone || !address || !email) {
      toast.error('Please fill in all the fields.');
      return;
    }
    if (!/^\d+$/.test(phone)) {
      toast.error('Phone number should contain digits only.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Invalid email address.');
      return;
    }

    const order = {
      ...orderDetails,
      items: cart,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        localStorage.removeItem('cart');
        setCart([]);
        setOrderDetails({ name: '', phone: '', address: '', email: '' });
        router.push('/Navbar_function/OrderPlaced');
      } else {
        toast.error('Failed to place the order.');
      }
    } catch (error) {
      toast.error('Error placing order.');
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <Navbar />
      <h2>Your Cart</h2>
      <ul className="cart-grid">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <h3>{item.name || item.tourName}</h3>
            <p><strong>Price:</strong> PKR {item.price || item.cost}</p>
            <button className="remove-button" onClick={() => handleRemoveFromCart(item.id, item.type)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Enter Your Details</h3>
      <form className="order-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={orderDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={orderDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>House Address:</label>
          <input
            type="text"
            name="address"
            value={orderDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={orderDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CartPage;
