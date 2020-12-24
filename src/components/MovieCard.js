import React, { useState } from "react";
import Modal from "react-modal";
import MovieModal from "./MovieModal";

Modal.setAppElement("#root");
const previewImagePrefix = `https://image.tmdb.org/t/p/w185/`;
const modalImagePrefix = `https://image.tmdb.org/t/p/w500/`;
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
    <>
      <div>
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <img src={previewImageUrl} alt="" />
        </button>
        <h4>{title}</h4>
        <h4>
          {vote_average} by <span>{vote_count}</span>
        </h4>
      </div>
      <MovieModal {...modalProps} />
    </>
  );
}

export default MovieCard;
