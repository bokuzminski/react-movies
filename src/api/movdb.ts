import axios from "axios";

export const movdb = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    method: "GET",
    params: { api_key: process.env.REACT_APP_API_KEY }
})
