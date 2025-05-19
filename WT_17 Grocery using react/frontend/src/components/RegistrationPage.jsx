import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RegistrationPage.css';

const RegistrationPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { username, email, password, address } = form;
    if (username && email && password && address) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, address }),
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess('Registration successful! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError(data.message || 'Registration failed');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        /><br />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
