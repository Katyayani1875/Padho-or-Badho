import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Padho & Badho
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
              <span className="text-gray-700">Welcome, {user.name}!</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;