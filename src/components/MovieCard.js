import React from "react";
import Link from "react-router-dom";

function MovieCard({
  id,
  title,
  poster_path,
  release_date,
  overview,
  vote_average,
  vote_count,
}) {
  return (
    <div>
      <p>
        {id}
        {title}
        {poster_path}
        {release_date}
        {overview}
        {vote_average}
        {vote_count}
      </p>
    </div>
  );
}

export default MovieCard;
