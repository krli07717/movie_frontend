import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import APIS from "../utils/apis";
import MovieCard from "./MovieCard";

function Collection({ collectionName, collectionAPI, searchQuery }) {
  const [pages, setPages] = useState(1);
  const [collection, setCollection] = useState([]);
  const [noMoreLoads, setNoMoreLoads] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const getCollection = async (pages) => {
    try {
      let query = searchQuery ? `&query=${searchQuery}` : "";
      let API = APIS[collectionAPI] + `${pages}` + query;
      const response = await axios.get(API);
      if (searchQuery && response.data.results.length === 0) {
        setNoSearchResults(true);
      }
      if (response.data.results.length < 20) {
        // tmdb api gives every page 20 results by default
        setNoMoreLoads(true);
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

  const showLoadButton = () => {
    // not letting LoadMore button render at first
    return collection.length && !noMoreLoads ? (
      <button onClick={() => setPages((prevPage) => prevPage + 1)}>
        <h1>Load More</h1>
      </button>
    ) : null;
  };

  const noResults = () => {
    return noSearchResults ? <h3>No Results Found</h3> : null;
  };

  useEffect(() => {
    getCollection(pages);
  }, [pages]);

  return (
    <section>
      <h2>{collectionName}</h2>
      <div className="collection">
        {collection.map((movieInfos) => {
          if (movieInfos.poster_path) {
            return <MovieCard key={movieInfos.id} {...movieInfos} />;
          }
        })}
      </div>
      {noResults()}
      {showLoadButton()}
    </section>
  );
}

export default Collection;
