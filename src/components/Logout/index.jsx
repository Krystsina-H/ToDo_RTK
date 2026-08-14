import { useDispatch } from 'react-redux';
import { logoutUser } from '../../RTK/slices/authSlice';
import { useNavigate } from 'react-router';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  return <button onClick={handleLogout}>Выйти</button>;
};

export default Logout;
