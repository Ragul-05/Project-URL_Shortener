import api from './api';

export async function fetchProfile() {
  const response = await api.get('/api/users/profile');
  return response.data?.data;
}

export async function updateProfile({ name }) {
  const response = await api.put('/api/users/profile', { name: name.trim() });
  return response.data?.data;
}
