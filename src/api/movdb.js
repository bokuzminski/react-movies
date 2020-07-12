import axios from "axios";
//creating axios object with api key , save to env later
export const api_key = "?api_key=e366d974f73ae203397850eadc7bce1f";
export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
