import React, { useContext, useEffect } from "react";
import axios from "../utils/axios";
import { UserInfoContext, ACTIONS } from "../App";
import APIS from "../utils/apis";
import Collection from "../components/Collection";

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?`;

// all apis in one object; axios instance
// row {rowtitle, rowfetchURLs}
function Discover() {
  const userInfoContext = useContext(UserInfoContext);
  const collections = [
    { collectionName: "Now playing...", collectionAPI: "NOW_PLAYING" },
    { collectionName: "Upcoming...", collectionAPI: "UPCOMING" },
    { collectionName: "Popular...", collectionAPI: "POPULAR" },
  ];

  return (
    <>
      <div>
        <h3>
          <span>
            {userInfoContext.userInfoState.isAuth && `Welcome Back User! `}
          </span>
          <br />
          Discover...
        </h3>
      </div>
      {collections.map((collection, index) => {
        return <Collection key={index} {...collection} />;
      })}
    </>
  );
}

export default Discover;
