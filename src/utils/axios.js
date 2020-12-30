import axios from "axios";

//prepend base url
const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const backendInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export { movieInstance, backendInstance };
