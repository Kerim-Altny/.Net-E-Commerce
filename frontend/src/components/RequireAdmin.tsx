import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/auth';

export default function RequireAdmin() {
  if (!isAuthenticated()) {
    return <Navigate to="/identity/login" replace />;
  }
  if (!hasRole('Admin')) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
