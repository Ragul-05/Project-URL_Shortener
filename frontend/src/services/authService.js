import api from './api';

export async function registerUser({ name, email, password }) {
  const payload = { name: name.trim(), email: email.trim(), password };
  const response = await api.post('/api/auth/register', payload);
  return response.data?.data;
}

export async function loginUser({ email, password }) {
  const payload = { email: email.trim(), password };
  const response = await api.post('/api/auth/login', payload);
  return response.data?.data;
}
