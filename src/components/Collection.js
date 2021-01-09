import React, { useState, useEffect } from "react";
import { movieInstance as axios } from "../utils/axios";
import APIS from "../utils/apis";
import MovieCard from "./MovieCard";
import Button from "./Button";

//Search has prop searchQuery
//MyList has prop movieId, fetch details for each movie
function Collection({ collectionName, collectionAPI, searchQuery, movieId }) {
  const [pages, setPages] = useState(1);
  const [collection, setCollection] = useState([]);
  const [noMoreLoads, setNoMoreLoads] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const getCollection = async (pages) => {
    let query = searchQuery ? `&query=${searchQuery}` : "";
    let API = movieId
      ? APIS(collectionAPI, movieId)
      : APIS(collectionAPI) + `${pages}` + query;
    try {
      const response = await axios.get(API);
      let structure = movieId ? [response.data] : response.data.results;

      if (searchQuery && structure.length === 0) {
        setNoSearchResults(true);
      }
      if (movieId || structure.length < 20) {
        // tmdb api gives every page 20 results by default
        setNoMoreLoads(true);
      }

      //MyList has props: similar
      const refinedData = await structure.reduce(
        (
          arr,
          {
            id,
            title,
            poster_path,
            backdrop_path,
            release_date,
            overview,
            vote_average,
            vote_count,
            similar,
          }
        ) => {
          arr.push({
            id,
            title,
            poster_path,
            backdrop_path,
            release_date,
            overview,
            vote_average,
            vote_count,
            similar,
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
      <Button
        onClick={() => setPages((prevPage) => prevPage + 1)}
        type="button"
      >
        更多
      </Button>
    ) : null;
  };

  useEffect(() => {
    getCollection(pages);
  }, [pages]);

  return (
    <section className="collection">
      <h2>{collectionName}</h2>
      <div className="movie_rows">
        {collection.map((movieInfos) =>
          movieInfos.poster_path ? (
            <MovieCard key={movieInfos.id} {...movieInfos} />
          ) : null
        )}
      </div>
      {noSearchResults && <h3>沒有搜尋結果</h3>}
      {showLoadButton()}
    </section>
  );
}

export default Collection;
