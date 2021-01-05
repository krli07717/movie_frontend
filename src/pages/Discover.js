import React, { useContext } from "react";
import { UserInfoContext } from "../App";
import Collection from "../components/Collection";

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?`;

// all apis in one object; axios instance
// row {rowtitle, rowfetchURLs}
function Discover() {
  const { userInfoState } = useContext(UserInfoContext);
  const collections = [
    { collectionName: "Now playing...", collectionAPI: "NOW_PLAYING" },
    { collectionName: "Upcoming...", collectionAPI: "UPCOMING" },
    { collectionName: "Popular...", collectionAPI: "POPULAR" },
  ];

  return (
    <>
      {collections.map((collection, index) => {
        return <Collection key={index} {...collection} />;
      })}
    </>
  );
}

export default Discover;
