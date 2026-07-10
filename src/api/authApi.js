import { token } from '../helpers/token';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://todo-redev.onrender.com/api';

export const authUserApi = async (userData) => {
  const url = userData.name ? 'register' : 'login';

  const response = await fetch(`${API_BASE_URL}/auth/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  if (data.token) {
    token.set(data.token);
  }

  return data;
};

export const logoutApi = () => {
  token.remove();
};
