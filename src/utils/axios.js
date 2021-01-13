import axios from "axios";

//prepend base url
const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const backendInstance = axios.create({
  withCredentials: true, //for cookies
  baseURL: "https://movie-app-717.herokuapp.com/",
});

export { movieInstance, backendInstance };
