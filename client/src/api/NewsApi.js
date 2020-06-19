import axios from 'axios';

const API_KEY = "4886bf89257c4b0ebc74ac9c689fb27e";
const articlesURL = "https://newsapi.org/v2/everything?";
const sourcesURL = "https://newsapi.org/v2/sources?";

export const getArticles = (subscribtions) => {
    return axios.get(`${articlesURL}sources=${[...subscribtions]}&apiKey=${API_KEY}`);
}

export const getSources = () => {
    return axios.get(`${sourcesURL}apiKey=${API_KEY}`);
}

export const getFilteredSources = (category, language) => {
    if (category && language) {
        return axios.get(`${sourcesURL}category=${category}&language=${language}&apiKey=${API_KEY}`);
    } else if (!category && !language) {
        return axios.get(`${sourcesURL}apiKey=${API_KEY}`);
    } else if (!category) {
        return axios.get(`${sourcesURL}language=${language}&apiKey=${API_KEY}`);
    } else if (!language) {
        return axios.get(`${sourcesURL}category=${category}&apiKey=${API_KEY}`);
    }
}


