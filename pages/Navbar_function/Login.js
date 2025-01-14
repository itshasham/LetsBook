import React, { useState } from 'react';
import './Login.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/token';
import ImageSlider from './ImageSlider';

const Login = () => {
  const [user1, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const { storeTokenInLS, d1 } = useAuth(); 

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user1, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user1),
      });
      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      storeTokenInLS(data.token);
      router.push('/Admin/Admin_functions/main_admin');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <p className="welcome-message">Welcome Back</p>
          <h1>Login Your Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user1.email}
                onChange={handleInput}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user1.password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="btn-submit" type="submit">Login</button>
          </form>
        </div>
        <div className="slider-section">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default Login;
