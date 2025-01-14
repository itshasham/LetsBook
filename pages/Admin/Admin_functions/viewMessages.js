import React, { useEffect, useState } from 'react';
import './viewMessages.css';

const ContactUsQueries = ({ queries: serverQueries }) => {
  const [queries, setQueries] = useState(serverQueries || []); 
  const [loading, setLoading] = useState(!serverQueries); 

  useEffect(() => {
    if (!serverQueries || serverQueries.length === 0) {
      const fetchQueries = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/contact');
          if (response.ok) {
            const data = await response.json();
            setQueries(data);
          } else {
            console.error('Error fetching queries:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchQueries();
    }
  }, [serverQueries]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (queries.length === 0) {
    return <p>No queries found.</p>;
  }

  return (
    <div className="queries-container">
      <h1>Contact Us Queries</h1>
      <div className="queries-grid">
        {queries.map((query, index) => (
          <div key={index} className="query-card">
            <p><strong>Email:</strong> {query.email}</p>
            <p><strong>Phone Number:</strong> {query.phoneno}</p>
            <p><strong>Message:</strong> {query.message}</p>
            <p><strong>Date:</strong> {new Date(query.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`);
    const data = await response.json();

    return {
      props: {
        queries: data,
      },
    };
  } catch (error) {
    console.error('Error fetching queries:', error);
    return {
      props: {
        queries: null, 
      },
    };
  }
}

export default ContactUsQueries;
