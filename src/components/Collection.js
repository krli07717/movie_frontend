import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import APIS from "../utils/apis";
import MovieCard from "./MovieCard";

function Collection({ collectionName, collectionAPI }) {
  const [collection, setCollection] = useState([]);
  const getCollection = async () => {
    try {
      const response = await axios.get(APIS[collectionAPI]);
      const refinedData = await response.data.results.reduce(
        (
          arr,
          {
            id,
            title,
            poster_path,
            release_date,
            overview,
            vote_average,
            vote_count,
          }
        ) => {
          arr.push({
            id,
            title,
            poster_path,
            release_date,
            overview,
            vote_average,
            vote_count,
          });
          return arr;
        },
        []
      );
      setCollection((prevCollection) => [...prevCollection, ...refinedData]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);
  return (
    <section>
      <h2>{collectionName}</h2>
      <div className="collection">
        {collection.map((movieInfos) => {
          return <MovieCard key={movieInfos.id} {...movieInfos} />;
        })}
      </div>
    </section>
  );
}

export default Collection;
