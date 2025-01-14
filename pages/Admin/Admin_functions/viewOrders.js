import React, { useState, useEffect } from 'react';
import './viewOrders.css';

const ViewOrders = ({ serverOrders }) => {
  const [orders, setOrders] = useState(serverOrders || []); 
  const [loading, setLoading] = useState(!serverOrders); 

  useEffect(() => {
    if (!serverOrders || serverOrders.length === 0) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/orders');
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          } else {
            console.error('Error fetching orders:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [serverOrders]);

  const completeOrder = async (order) => {
    const { name, phone, date } = order;

    try {
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, date }),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter(
            (o) => !(o.name === name && o.phone === phone && o.date === date)
          )
        );
        alert('Order completed successfully.');
      } else {
        alert('Error completing the order.');
      }
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="orders-container">
      <h1>View Orders</h1>
      {orders.map((order, index) => (
        <div key={index} className="order-card">
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                <p><strong>{item.type === 'trip' ? 'Tour Name' : 'Product Name'}:</strong> {item.tourName || item.name}</p>
                <p><strong>Cost:</strong> PKR {item.cost || item.price}</p>
              </li>
            ))}
          </ul>
          <button
            className="complete-order-button"
            onClick={() => completeOrder(order)}
          >
            Complete Order
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/orders`);
    const data = await response.json();

    return {
      props: {
        serverOrders: data, 
      },
    };
  } catch (error) {
    console.error('Error fetching orders during SSR:', error);
    return {
      props: {
        serverOrders: null, 
      },
    };
  }
}

export default ViewOrders;
