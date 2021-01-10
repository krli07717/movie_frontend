import React from "react";
import Collection from "../components/Collection";

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?`;

// all apis in one object; axios instance
// row {rowtitle, rowfetchURLs}
function Discover() {
  const collections = [
    { collectionName: "現正上映", collectionAPI: "NOW_PLAYING" },
    { collectionName: "即將上映", collectionAPI: "UPCOMING" },
    { collectionName: "人氣排行", collectionAPI: "POPULAR" },
  ];

  return (
    <div className="discover">
      {collections.map((collection, index) => {
        return <Collection key={index} {...collection} />;
      })}
    </div>
  );
}

export default Discover;
