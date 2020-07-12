import axios from "axios";
//creating axios object with api key , save to env later
export const api_key = process.env.REACT_APP_API_KEY;
export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
