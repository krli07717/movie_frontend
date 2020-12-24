import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import APIS from "../utils/apis";
import MovieCard from "./MovieCard";

function Collection({ collectionName, collectionAPI }) {
  const [pages, setPages] = useState(1);
  const [collection, setCollection] = useState([]);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const getCollection = async (pages) => {
    try {
      let API = APIS[collectionAPI] + `${pages}`;
      const response = await axios.get(API);
      if (response.data.results.length < 20) {
        // tmdb api gives every page 20 results by default
        setNoMoreResults(true);
      }
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
    getCollection(pages);
  }, [pages]);
  return (
    <section>
      <h2>{collectionName}</h2>
      <div className="collection">
        {collection.map((movieInfos) => {
          return <MovieCard key={movieInfos.id} {...movieInfos} />;
        })}
      </div>
      {!noMoreResults && (
        <button onClick={() => setPages((prevPage) => prevPage + 1)}>
          <h1>Load More</h1>
        </button>
      )}
    </section>
  );
}

export default Collection;
