import axios from "axios";

const azure_api = "https://307-final-project-afa0h6ardsdtbfdh.westus3-01.azurewebsites.net";

const api = axios.create({
  // baseURL: "http://localhost:5000/", // Adjust the baseURL as per your backend configuration
  baseURL: `${azure_api}:5000/`, // Adjust the baseURL as per your backend configuration
  withCredentials: true // Include cookies in requests if your backend uses them
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token attached to request:", token);
  } else {
    console.log("No token found in localStorage.");
  }
  return config;
});

export default api;
