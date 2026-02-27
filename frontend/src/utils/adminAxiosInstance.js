// src/utils/adminAxiosInstance.js
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { navigateTo } from "./navigationHelper";

const adminApi = axios.create({
  baseURL: BACKEND_URL,
  timeout: 180000,
});

// ✅ Attach admin_token, not user token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Redirect to admin login on 401, not user login
adminApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin");
      navigateTo("/admin/login");
    }
    return Promise.reject(error);
  }
);

export default adminApi;
