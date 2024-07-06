

import { useState, useEffect } from 'react';
import axios from 'axios';

const UserPoints = () => {
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please sign up to earn points with your friends!');
          setLoading(false);
          return;
        }
        console.log('Sending token:', token);
        const response = await axios.get('http://localhost:5000/api/users/points', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPoints(response.data.points);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching points:', err);
        setError(err.response?.data?.error || 'Failed to fetch points');
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  if (loading) return <div>Loading points...</div>;
  if (error) return <div className="bg-white p-4 rounded-lg shadow-md text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Your Points</h3>
      <p className="text-3xl font-bold text-indigo-600">{points}</p>
    </div>
  );
};

export default UserPoints;
