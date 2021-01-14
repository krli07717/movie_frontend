import axios from "axios";

//prepend base url
const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const backendInstance = axios.create({
  withCredentials: true, //for cookies
  baseURL: "https://safe-chamber-64755.herokuapp.com/",
});

export { movieInstance, backendInstance };
