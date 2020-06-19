import axios from './token_axios';

const SERVER_URL = "http://localhost:5000";


export const registerUser = (formData) => {
    return axios.post(`${SERVER_URL}/register`, formData);
}


export const loginUser = (formData) => {
    return axios.post(`${SERVER_URL}/login`, formData);
}

export const getUserSubscribtions = () => {
    return axios.get(`${SERVER_URL}/home/subscribtions`);
}

export const subscribeSource = (id, action) => {
    const payload = { action }
    return axios.patch(`${SERVER_URL}/home/subscribe/${id}`, payload);
}

// export const unSubscribeSource = (id) => {
//     return axios.patch(`${SERVER_URL}/home/subscribe/${id}`);
// }