import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';

const PrivateRoute = ({ children }) => {
  const user = useSelector(getUser) || null;
  return user ? children : <Navigate to="/welcome" replace />;
};

export default PrivateRoute;
