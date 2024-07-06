
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ReferralModal = ({ isOpen, onClose, onReferralSubmit }) => {
  const [formData, setFormData] = useState({
    referee: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/referrals/postreferral`, formData, config);
      
      // Check if the response contains the referral data
      if (response.data && response.data.referralCode) {
        const referralLink = `${window.location.origin}/signup?ref=${response.data.referralCode}`;
        onReferralSubmit(referralLink);
        toast.success('Referral submitted successfully! Share the link with your friend.');
        onClose();
      } else {
        // If the response doesn't contain the expected data, show an error
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error submitting referral:', error);

      if (error.response && error.response.status === 400 && error.response.data.error === 'You have already referred to this email') {
        toast.error('You have already referred to this email.');
      } else if (error.response && error.response.status === 401) {
        toast.error('Please sign up first to refer someone!');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-indigo-800">Referral Form</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="referee" className="block text-left text-sm font-medium text-gray-700">
              Friend's Name
            </label>
            <input
              type="text"
              name="referee"
              id="referee"
              onChange={handleInputChange}
              value={formData.referee}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
              Friend's Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              value={formData.email}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-3 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center">
              <img src="/send-icon.svg" alt="Send Icon" className="w-5 h-5 mr-2" />
              Submit
            </button>
          </div>
        </form>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
            <ClipLoader color="#4A90E2" loading={loading} size={50} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReferralModal;
