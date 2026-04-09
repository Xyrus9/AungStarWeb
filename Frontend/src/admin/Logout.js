import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, setAdminAuthenticated } from './adminAuth.js';

const Logout = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAdminAuthenticated();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login', { replace: true });
      return;
    }

    const confirmed = window.confirm('Are you sure you want to log out of the admin dashboard?');

    if (confirmed) {
      setAdminAuthenticated(false);
      navigate('/admin/login', { replace: true });
      return;
    }

    navigate('/admin', { replace: true });
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return <Navigate to='/admin/login' replace />;
  }

  return null;
};

export default Logout;