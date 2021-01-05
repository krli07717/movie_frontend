import React, { useState } from "react";
import Modal from "react-modal";
import MovieModal from "./MovieModal";
import Button from "./Button";

Modal.setAppElement("#root");
const previewImagePrefix = `https://image.tmdb.org/t/p/w185/`;
const modalImagePrefix = `https://image.tmdb.org/t/p/w500/`;
const backdropImagePrefix = `https://image.tmdb.org/t/p/w1280/`;
// poster_sizes:"w92","w154","w185","w342","w500","w780","original"

function MovieCard({
  id,
  title,
  poster_path,
  backdrop_path,
  release_date,
  overview,
  vote_average,
  vote_count,
  similar,
}) {
  const previewImageUrl = `${previewImagePrefix}${poster_path}`;
  const modalImageUrl = `${modalImagePrefix}${poster_path}`;
  const backdropImageUrl = backdrop_path
    ? `${backdropImagePrefix}${backdrop_path}`
    : null;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalProps = {
    id,
    title,
    modalImageUrl,
    backdropImageUrl,
    overview,
    release_date,
    modalIsOpen,
    setModalIsOpen,
    similar,
  };
  return (
    <div>
      <div className="movieCard">
        <Button onClick={() => setModalIsOpen(true)} type="button">
          <img src={previewImageUrl} alt="" />
        </Button>
        <h4>{title}</h4>
        <h4>
          {vote_average} by <span>{vote_count}</span>
        </h4>
      </div>
      <MovieModal {...modalProps} />
    </div>
  );
}

export default MovieCard;
