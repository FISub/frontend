import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8443",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response
api.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
