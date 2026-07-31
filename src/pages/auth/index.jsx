import { useState, useEffect } from 'react';
import { authUser } from '../../RTK/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Auth = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const { error, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/todos');
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser(userData));
    setUserData({ email: '', password: '', name: '' });
  };

  return (
    <div className="auth-container">
      <h1 className="title">{isLogin ? 'Login' : 'registration'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="email">
            password
          </label>
          <input
            className="input-field"
            id="password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        {!isLogin && (
          <div>
            <label className="input-label" htmlFor="userName">
              name
            </label>
            <input
              className="input-field"
              id="name"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">{isLogin ? 'Войти' : 'зарегистриовать'}</button>
      </form>
      <button onClick={() => setIsLogin((isLogin) => !isLogin)}>
        {isLogin
          ? 'У Вас ещё нет аккаунта? Регистрация'
          : ' Вы уже зарегистрировались? Авторизоваться'}
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error.message || error.error || 'Ошибка входа'}
        </div>
      )}
    </div>
  );
};
export default Auth;
