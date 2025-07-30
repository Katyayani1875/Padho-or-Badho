import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

function ProtectedRoute({ children }) {
  const { token } = useAuthStore();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;