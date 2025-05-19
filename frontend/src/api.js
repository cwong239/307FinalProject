import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/auth', // Adjust the baseURL as per your backend configuration
  withCredentials: true, // Include cookies in requests if your backend uses them
});

export default api;
