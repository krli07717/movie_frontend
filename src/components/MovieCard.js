import React from "react";
import Link from "react-router-dom";

const imagePrefix = `https://image.tmdb.org/t/p/w185/`;
// poster_sizes:"w92","w154","w185","w342","w500","w780","original"

function MovieCard({
  id,
  title,
  poster_path,
  release_date,
  overview,
  vote_average,
  vote_count,
}) {
  const imageUrl = `${imagePrefix}` + `${poster_path}`;
  return (
    <div>
      {/* <Link to=""> */}
      <div>
        <img src={imageUrl} alt="" />
      </div>
      {/* </Link> */}
      <p>
        {id}
        {title}
        {release_date}
        {vote_average}
        {vote_count}
      </p>
    </div>
  );
}

export default MovieCard;
