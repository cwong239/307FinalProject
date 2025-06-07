import axios from "axios";
import CD_DOMAIN from "./azure";

const azure_api = CD_DOMAIN;

const api = axios.create({
  baseURL: `${azure_api}/`,
  withCredentials: true
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
