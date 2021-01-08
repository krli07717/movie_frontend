import React, { useState, useContext } from "react";
import { UserInfoContext } from "../App";
import Modal from "react-modal";
import MovieModal from "./MovieModal";
import Button from "./Button";
import { FaCheckCircle, FaSave } from "react-icons/fa";

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
  const { userInfoState } = useContext(UserInfoContext);
  const movieAlreadyIncluded = userInfoState.MovieList.find(
    (item) => item.id === id
  );

  const ratingStyle =
    vote_average > 8
      ? "high"
      : vote_average > 6
      ? "decent"
      : vote_average > 4
      ? "mid"
      : "low";

  return (
    <>
      <div className="movie_card">
        <div className="button_img">
          <Button onClick={() => setModalIsOpen(true)} type="button">
            <img src={previewImageUrl} alt="" />
          </Button>
        </div>
        {movieAlreadyIncluded ? (
          <div className="status">
            {movieAlreadyIncluded.watched ? (
              <FaCheckCircle size="20" color="rgb(67, 179, 117)" />
            ) : (
              <FaSave size="20" color="rgb(236, 203, 146)" />
            )}
          </div>
        ) : null}
        <div className="info">
          <h4>{title}</h4>
          <h5 className={ratingStyle}>{vote_average}</h5>
          <span>({vote_count})</span>
        </div>
      </div>
      <MovieModal {...modalProps} />
    </>
  );
}

export default MovieCard;
