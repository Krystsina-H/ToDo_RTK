import { token } from '../helpers/token';

const API_URL = import.meta.env.VITE_URL;

const getHeaders = () => ({
  Authorization: `Bearer ${token.get()}`,
  'Content-Type': 'application/json',
});

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`,
    );
  }
  return response.json();
};

export const fetchTasks = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_URL}/todos?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token.get()}` },
  });
  return handleResponse(response);
};

export const createTaskApi = async (taskData) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const deleteTaskApi = async (taskId) => {
  const response = await fetch(`${API_URL}/todos/${taskId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token.get()}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`,
    );
  }

  return taskId;
};

export const toggleTaskApi = async (taskId) => {
  const response = await fetch(`${API_URL}/todos/${taskId}/toggle`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token.get()}` },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const updateTaskApi = async (taskId, updatedData) => {
  const response = await fetch(`${API_URL}/todos/${taskId}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};
