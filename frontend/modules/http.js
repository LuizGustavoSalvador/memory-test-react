import axios from 'axios';

const baseUrl = window.location.hostname;

const http = axios.create({
    baseURL: `http://${baseUrl}:3333`,
});

export default http;