import React, { useState } from "react";
import Modal from "react-modal";
import MovieModal from "./MovieModal";

Modal.setAppElement("#root");
const previewImagePrefix = `https://image.tmdb.org/t/p/w185/`;
const modalImagePrefix = `https://image.tmdb.org/t/p/w780/`;
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
  const previewImageUrl = `${previewImagePrefix}` + `${poster_path}`;
  const modalImageUrl = `${modalImagePrefix}` + `${poster_path}`;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalProps = {
    id,
    title,
    modalImageUrl,
    overview,
    release_date,
    modalIsOpen,
    setModalIsOpen,
  };
  return (
    <div>
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <img src={previewImageUrl} alt="" />
      </button>
      <h3>{title}</h3>
      <h3>
        {vote_average} by <span>{vote_count}</span>
      </h3>
      <MovieModal {...modalProps} />
    </div>
  );
}

export default MovieCard;
