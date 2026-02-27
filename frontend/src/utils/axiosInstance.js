import axios from "axios";
import { BACKEND_URL } from "./constants";
import { navigateTo } from "./navigationHelper";

const api = axios.create({ 
  baseURL: BACKEND_URL,
  timeout: 180000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigateTo("/login"); // uses React Router, no hard reload
    }
    return Promise.reject(error);
  }
);

export default api;




// import axios from "axios";
// import { BACKEND_URL } from "./constants";

// const api = axios.create({ baseURL: BACKEND_URL });

// // Auto-attach token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Auto-logout on 401
// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
