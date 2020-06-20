import axios from "axios";
// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) config.headers.Authorization = `bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;