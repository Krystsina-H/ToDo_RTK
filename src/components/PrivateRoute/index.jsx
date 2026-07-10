import { Outlet, Navigate } from 'react-router';
import { token } from '../../helpers/token';

const PrivateRoute = ({ ...props }) => {
  const isAuthenticated = !!token.get();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
