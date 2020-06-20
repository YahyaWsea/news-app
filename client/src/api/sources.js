import axios from './token_axios';


const SERVER_URL = "http://localhost:5000";

export const getSources = () => {
    return axios.get(`${SERVER_URL}/sources`);
}

export const getFilteredSources = (category = "", language = "") => {
    return axios.get(`${SERVER_URL}/sources/filtered?category=${category}&language=${language}`);
}

export const getUserSubscribtions = () => {
    return axios.get(`${SERVER_URL}/sources/subscribed`);
}

export const subscribeSource = (id, action) => {
    const payload = { action }
    return axios.patch(`${SERVER_URL}/user/subscribe/${id}`, payload);
}
