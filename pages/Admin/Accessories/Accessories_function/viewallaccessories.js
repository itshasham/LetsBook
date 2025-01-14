import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../Accessories_style/viewallaccessories.css';

const ViewAllAccessories = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/accessories');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data.accessories); 
          console.log('Successfully fetched products:', data.accessories);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Failed to fetch products. Please try again later.');
          toast.error('Error fetching products');
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [initialProducts]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/accessories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        toast.success('Product deleted successfully!');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Error: Could not connect to the server.');
    }
  };

  const handleEdit = (id) => {
    router.push(`/Admin/Accessories/Accessories_function/${id}`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="products-container">
      <h1>All Accessories</h1>
      {error && <p className="error-message">{error}</p>}
      {Array.isArray(products) && products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => {
            const discountedPrice = parseFloat(product.price) * (1 - (product.discounted || 0) / 100);

            return (
              <div className="product-card" key={product.id}> 
                <div className="product-image">
                  <img src={product.image || '/placeholder.jpg'} alt={product.name} />
                </div>

                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p>
                    <strong>Price:</strong>{' '}
                    {product.discounted ? (
                      <>
                        <span className="original-price">${parseFloat(product.price).toFixed(2)}</span>{' '}
                        <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>${parseFloat(product.price).toFixed(2)}</span>
                    )}
                  </p>
                  <p><strong>Stock:</strong> {product.stock}</p>

                  {product.attributes && (
                    <ul className="product-features">
                      {product.attributes.size && <li>Size: {product.attributes.size}</li>}
                      {product.attributes.color && <li>Color: {product.attributes.color}</li>}
                      {product.attributes.personCapacity && (
                        <li>Person Capacity: {product.attributes.personCapacity}</li>
                      )}
                      {product.attributes.material && <li>Material: {product.attributes.material}</li>}
                      {product.attributes.weight && <li>Weight: {product.attributes.weight} kg</li>}
                    </ul>
                  )}
                </div>

                <div className="product-actions">
                  <button className="edit-button" onClick={() => handleEdit(product.id)}> 
                    Edit
                  </button>

                  <button className="delete-button" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accessories`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();

    return {
      props: {
        initialProducts: data.accessories || [], 
      },
    };
  } catch (error) {
    console.error('Error fetching products during SSR:', error);
    return {
      props: {
        initialProducts: [], 
      },
    };
  }
}

export default ViewAllAccessories;
