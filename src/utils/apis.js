const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const APIS = {
  NOW_PLAYING: `movie/now_playing?api_key=${API_KEY}&language=zh-TW&page=1&region=TW`,
};

export default APIS;
