import axios from "axios";
//creating axios object with api key , save to env later
export const api_key = "API_KEY_HERE";
export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
