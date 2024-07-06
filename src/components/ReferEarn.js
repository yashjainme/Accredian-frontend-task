
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const ReferEarn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrer: '',
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
      const response = await axios.post('http://localhost:5000/api/referral', formData);
      console.log(response.data);
      toast.success('Referral submitted successfully!');
      setIsModalOpen(false);
      setFormData({ referrer: '', referee: '', email: '' });
    } catch (error) {
      console.error('Error submitting referral:', error);
      toast.error('Failed to submit referral. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-indigo-100 to-purple-100">
      <header className="w-full bg-white shadow-md">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-800">Refer & Earn</h1>
          <img src="/comp-logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center w-full px-4 text-center">
        <div className="relative">
          <h2 className="text-4xl font-bold mb-6 text-indigo-900">Refer a Friend and Earn Rewards</h2>
          <img src="/coin.svg" alt="Coins" className="absolute -top-8 -left-8 w-16 h-16 animate-bounce" />
          <img src="/gift-box.svg" alt="Gift" className="absolute -bottom-8 -right-8 w-16 h-16 animate-pulse" />
        </div>
        <p className="text-lg text-gray-600 mb-8">Share the love and get rewarded for every friend you bring on board!</p>
        <button
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <img src="/referral-icon.svg" alt="Refer Icon" className="w-6 h-6 mr-2" />
          Refer Now
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* <img src="/confetti.svg" alt="Confetti" className="absolute top-0 left-0 w-full h-full pointer-events-none" /> */}
              <h3 className="text-2xl font-bold mb-6 text-indigo-800">Referral Form</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="referrer" className="block text-left text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="referrer"
                    id="referrer"
                    onChange={handleInputChange}
                    value={formData.referrer}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
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
                    onClick={() => setIsModalOpen(false)}
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
        )}
      </main>
      <footer className="w-full bg-indigo-900 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default ReferEarn;