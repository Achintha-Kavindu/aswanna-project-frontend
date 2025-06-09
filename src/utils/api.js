// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || "http://localhost:5000",
  timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(
      `API Error: ${error.config?.url}`,
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
// Gallery API calls
export const galleryAPI = {
  // Add new gallery item
  addItem: async (itemData) => {
    try {
      const response = await api.post("/api/gallery/add", itemData);
      return response.data;
    } catch (error) {
      console.error("Error adding gallery item:", error);
      throw error;
    }
  },

  // Get farmer's gallery items
  getFarmerItems: async (farmerId) => {
    try {
      const response = await api.get(`/api/gallery/farmer/${farmerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching farmer gallery items:", error);
      throw error;
    }
  },
};
