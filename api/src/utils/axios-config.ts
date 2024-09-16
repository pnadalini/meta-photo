import axios, * as axiosConfig from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/";
const axiosInstance = axios.create({ baseURL: API_URL });

export { axiosInstance, axios, axiosConfig };
