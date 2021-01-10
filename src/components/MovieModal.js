import React, { useEffect, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import Button from "./Button";

Modal.setAppElement("#root");

function MovieModal({
  id,
  title,
  modalImageUrl,
  backdropImageUrl,
  overview,
  release_date,
  modalIsOpen,
  setModalIsOpen,
  similar,
}) {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  const movieAlreadyIncluded = userInfoState.MovieList.find(
    (item) => item.id === id
  );

  //redirect to login when !isAuth
  let history = useHistory();
  const redirectLogin = () => {
    history.push("/Login");
  };

  const addToList = () => {
    userInfoDispatch({
      type: ACTIONS.ADD_TO_LIST,
      payload: { id: id, watched: false },
    });
  };

  const toggleWatched = () => {
    let watched = movieAlreadyIncluded.watched;
    userInfoDispatch({
      type: ACTIONS.TOGGLE_WATCHED,
      payload: { id: id, watched: !watched },
    });
  };

  const deleteFromList = () => {
    userInfoDispatch({
      type: ACTIONS.REMOVE_FROM_LIST,
      payload: { id },
    });
  };

  const showSimilarMovies = () => {
    return similar && similar.results.length ? (
      <div className="recommendations">
        <h2>您可能也喜歡..</h2>
        <div className="movie_rows">
          {similar.results.map(
            ({
              id,
              title,
              poster_path,
              backdrop_path,
              release_date,
              overview,
              vote_average,
              vote_count,
            }) => {
              let props = {
                id,
                title,
                poster_path,
                backdrop_path,
                release_date,
                overview,
                vote_average,
                vote_count,
              };
              console.log("similar props renders");
              return poster_path ? <MovieCard key={id} {...props} /> : null;
            }
          )}
        </div>
      </div>
    ) : null;
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(211, 150, 150, 0.35)",
      maxWidth: "1300px",
      margin: "0 auto",
      // position: "static",
      zIndex: "4",
    },
    content: {
      border: "none",
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  useEffect(() => {
    if (similar) {
      //why it keeps re-rendering
      showSimilarMovies();
    }
  }, [similar]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyles}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="modal_content">
          <div className="modal_text">
            <h1>{title}</h1>
            <h5>({release_date})</h5>
            <h4>{overview}</h4>
          </div>
          <div>
            <img src={modalImageUrl} alt="" />
          </div>
          <div>{backdropImageUrl && <img src={backdropImageUrl} alt="" />}</div>
          <div className="modal_buttons">
            {!userInfoState.isAuth ? (
              <Button onClick={redirectLogin} type="button">
                登入以加入清單
              </Button>
            ) : !movieAlreadyIncluded ? (
              <Button onClick={() => addToList()} type="button">
                加入清單
              </Button>
            ) : (
              <>
                <Button onClick={toggleWatched} type="button">
                  {movieAlreadyIncluded.watched ? `未觀看` : `已觀看`}
                </Button>
                <Button onClick={deleteFromList} type="button">
                  刪除
                </Button>
              </>
            )}
            <Button onClick={() => setModalIsOpen(false)} type="button">
              關閉
            </Button>
          </div>
          {/* only for MyList */}
          {showSimilarMovies()}
        </div>
      </Modal>
    </div>
  );
}

export default MovieModal;
