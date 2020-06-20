import axios from './token_axios';
const SERVER_URL = "http://localhost:5000";


export const registerUser = (formData) => {
    return axios.post(`${SERVER_URL}/auth/register`, formData);
}

export const loginUser = (formData) => {
    return axios.post(`${SERVER_URL}/auth/login`, formData);
}
