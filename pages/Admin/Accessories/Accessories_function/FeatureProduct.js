import React, { useEffect, useState } from 'react';
import '../Accessories_style/FeatureProduct.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products/get_products');  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      const featured = data.products.filter(product => product.featured === true);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load featured products. Please try again later.');
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="featured-products-container">
      <h2>Featured Products</h2>
      {error && <p className="error-message">{error}</p>}
      {featuredProducts.length > 0 ? (
        <div className="products-grid">
          {featuredProducts.map((product) => {
            const discountedPrice = product.price * (1 - (product.discounted || 0) / 100);

            return (
              <div className="product-card" key={product._id}>
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
                        <span className="original-price">${product.price.toFixed(2)}</span>{' '}
                        <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}
                  </p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No featured products available.</p>
      )}
    </div>
  );
};

export default FeaturedProducts;
