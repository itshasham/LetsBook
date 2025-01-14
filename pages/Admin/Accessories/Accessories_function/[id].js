import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../Accessories_style/update_product.css';

const UpdateProduct = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    description: product?.description || '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setError('Product ID is missing.');
      return;
    }

    try {
      const response = await fetch(`/api/accessories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product.');
      }

      alert('Product updated successfully.');
      router.push('/Admin/Accessories/Accessories_function/viewallaccessories');
    } catch (err) {
      setError(err.message || 'Failed to update product. Please try again.');
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="update-product-container">
      <h1>Update Product</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accessories/${params.id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch product details.');
    }

    const data = await res.json();

    return {
      props: {
        product: data?.product || null,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.error('Error fetching product details:', err.message);
    return {
      props: {
        product: null,
      },
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accessories`);
    if (!res.ok) {
      throw new Error('Failed to fetch product list.');
    }

    const data = await res.json();
    const paths = (data?.products || []).map((product) => ({
      params: { id: product.id.toString() },
    }));

    console.log('Generated paths:', paths); 

    return {
      paths,
      fallback: 'blocking', 
    };
  } catch (err) {
    console.error('Error fetching product list:', err.message);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
