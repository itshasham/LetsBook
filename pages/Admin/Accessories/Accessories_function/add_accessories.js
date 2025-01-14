import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'; 
const AddProductForm = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
    stock: '',
    size: '',
    color: '',
    personCapacity: '',
    weight: '',
    material: '',
  });
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.cost || !formData.stock || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    const productData = {
      name: formData.name,
      description: formData.description,
      category: category,
      price: formData.cost,
      stock: formData.stock,
      featured: false, 
      attributes: {
        size: formData.size || 'N/A',
        color: formData.color || 'N/A',
        personCapacity: formData.personCapacity || 0,
        weight: formData.weight || 0,
        material: formData.material || 'N/A',
      },
    };
    console.log('Submitting Product Data:', productData);
    try {
      const loadingToastId = toast.info('Saving product... Please wait.', { autoClose: false });
      setLoading(true); 

      const response = await fetch('/api/accessories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product added successfully:', result);
        toast.update(loadingToastId, {
          render: 'Product added successfully!',
          type: 'success',
          autoClose: 3000,
        });
        router.push('/Admin/Accessories/Accessories_function/Accessories_list');
      } else {
        console.error('Failed to add product');
        toast.update(loadingToastId, {
          render: 'Failed to add product. Please try again later.',
          type: 'error',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.update(loadingToastId, {
        render: 'Error adding product. Please check your internet connection and try again.',
        type: 'error',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Person Capacity:</label>
          <input
            type="number"
            name="personCapacity"
            value={formData.personCapacity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Material:</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
