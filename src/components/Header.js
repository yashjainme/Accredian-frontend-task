import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-indigo-800">Refer & Earn</h1>
        </Link>
        <img src="/comp-logo.png" alt="Company Logo" className="h-12 w-auto mb-4 md:mb-0 md:ml-4" />
        <nav className="flex flex-col md:flex-row items-center justify-center md:justify-end">
          {isAuthenticated ? (
            <button 
              onClick={handleSignOut} 
              className="mb-2 md:mb-0 px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col md:flex-row items-center">
              <Link 
                to="/signup" 
                className="mb-2 md:mb-0 md:mr-4 px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
