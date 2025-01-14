import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import './Accessories.css';
import Navbar from '@/components/Navbar';

const AllAccessoriesPage = () => {
    const [accessories, setAccessories] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch accessories data
    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await fetch('/api/accessories');
                if (response.ok) {
                    const data = await response.json();
                    setAccessories(data.accessories);
                } else {
                    toast.error('Error fetching accessories');
                }
            } catch (error) {
                toast.error('Error: Could not connect to the server.');
            } finally {
                setLoading(false);
            }
        };

        fetchAccessories();
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleAddToCart = (accessory) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isAlreadyInCart = storedCart.some((item) => item.id === accessory.id);

        if (isAlreadyInCart) {
            toast.info(`${accessory.name} is already in the cart.`);
            return;
        }

        const newCart = [...storedCart, { ...accessory, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart); 
        toast.success(`${accessory.name} added to cart.`);
    };

    const viewCart = () => {
        router.push('/Navbar_function/Cart'); 
    };

    if (loading) {
        return <p>Loading accessories...</p>;
    }

    if (accessories.length === 0) {
        return <p>No accessories available at the moment.</p>;
    }

    return (
        <div className="all-accessories-container">
            <Navbar />
            <h2>All Accessories</h2>
            <button onClick={viewCart} className="view-cart-button">
                View Cart ({cart.length}) 
            </button>
            <div className="accessories-grid">
                {accessories.map((accessory) => (
                    <div key={accessory.id} className="accessory-card">
                        <h3>{accessory.name || 'Unnamed Accessory'}</h3>
                        <p><strong>Description:</strong> {accessory.description || 'N/A'}</p>
                        <p><strong>Category:</strong> {accessory.category || 'N/A'}</p>
                        <p><strong>Price:</strong> PKR {accessory.price || 'N/A'}</p>
                        <h4>Attributes:</h4>
                        <ul>
                            <li><strong>Size:</strong> {accessory.attributes.size || 'N/A'}</li>
                            <li><strong>Color:</strong> {accessory.attributes.color || 'N/A'}</li>
                            <li><strong>Person Capacity:</strong> {accessory.attributes.personCapacity || 'N/A'}</li>
                            <li><strong>Weight:</strong> {accessory.attributes.weight || 'N/A'}</li>
                            <li><strong>Material:</strong> {accessory.attributes.material || 'N/A'}</li>
                        </ul>
                        <button
                            className="add-to-cart-button"
                            onClick={() => handleAddToCart(accessory)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAccessoriesPage;
