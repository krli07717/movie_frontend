import React, { useContext, useEffect } from "react";
import axios from "../utils/axios";
import { UserInfoContext, ACTIONS } from "../App";
import APIS from "../utils/apis";
import Collection from "../components/Collection";

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// const NOW_PLAYING_API = `https://api.themoviedb.org/3/movie/now_playing?`;

// all apis in one object; axios instance
// row {rowtitle, rowfetchURLs}
function Home() {
  const userInfoContext = useContext(UserInfoContext);
  const collections = [
    { collectionName: "Now playing...", collectionAPI: "NOW_PLAYING" },
  ];
  //   const getNowPlaying = async () => {
  //     try {
  //       const response = await axios.get(APIS.NOW_PLAYING);
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     getNowPlaying();
  //   }, []);

  return (
    <>
      <div>
        <h3>
          <span>
            {userInfoContext.userInfoState.isAuth && `Welcome Back User! `}
          </span>
          Home!
        </h3>
      </div>
      {collections.map((collection, index) => {
        return <Collection key={index} {...collection} />;
      })}
    </>
  );
}

export default Home;
