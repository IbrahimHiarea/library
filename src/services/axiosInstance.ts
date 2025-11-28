import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

export const API_BASE_URL = "http://localhost:5000";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add custom logic before request is sent
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle response data
    return response;
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/auth/login";
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 500:
          console.error("Server Error");
          break;
        default:
          console.error("Unknown Error");
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
