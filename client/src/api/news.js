import axios from './token_axios';



const SERVER_URL = "http://localhost:5000";


export const getArticles = (page, pageSize) => {
    return axios.get(`${SERVER_URL}/news?page=${page}&pageSize=${pageSize}`);
}

