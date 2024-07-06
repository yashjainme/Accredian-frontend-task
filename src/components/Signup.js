

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';

const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', referralCode: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('ref');
    if (code) {
      setFormData(prevState => ({ ...prevState, referralCode: code }));
    }
  }, [location]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const completeReferral = async (token) => {
    if (formData.referralCode) {
      try {
        await axios.post('http://localhost:5000/api/referrals/complete-referral', 
          { referralCode: formData.referralCode },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Referral completed successfully!');
      } catch (error) {
        console.error('Error completing referral:', error);
        toast.error('Failed to complete referral.');
      }
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('token', response.data.token);
      toast.success('Registration successful!');
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        {formData.referralCode && (
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            readOnly
            className="w-full mb-4 p-2 border rounded bg-gray-100"
          />
        )}
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Sign Up</button>
      </form>
      
    </div>
  );
};

export default Signup;