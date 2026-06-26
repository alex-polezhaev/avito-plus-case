import axios from 'axios';

export const backend = (token) =>
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
