

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_API_BASE_URL 
      const response = await axios.post(`${backendUrl}/api/users/login`, formData);
      console.log(backendUrl)
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded ">Login</button>
      </form>
      
    </div>
  );
};

export default Login;