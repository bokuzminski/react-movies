import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: import.meta.env.VITE_API_KEY
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    // Show a toast or something to the user
    // This is global errror handling
    console.error(error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
