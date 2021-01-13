// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_KEY = process.env.apikey;

const APIS = (apiName, movieId) => {
  const apis = {
    NOW_PLAYING: `movie/now_playing?api_key=${API_KEY}&language=zh-TW&region=TW&page=`,
    UPCOMING: `movie/upcoming?api_key=${API_KEY}&language=zh-TW&region=TW&page=`,
    POPULAR: `movie/popular?api_key=${API_KEY}&language=zh-TW&region=TW&page=`,
    SEARCH: `search/movie?api_key=${API_KEY}&language=zh-TW&include_adult=false&region=TW&page=`,
    DETAILS: `movie/${movieId}?api_key=${API_KEY}&language=zh-TW&append_to_response=similar`,
  };
  return apis[apiName];
};

export default APIS;
