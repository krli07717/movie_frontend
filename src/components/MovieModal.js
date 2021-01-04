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
      <div>
        <h3>You may also like...</h3>
        <div className="recommmendations" style={recommendationsStyle}>
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

  const recommendationsStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  useEffect(() => {
    if (similar) {
      //why it keeps re-rendering
      showSimilarMovies();
    }
  }, [similar]);

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h1>{title}</h1>
        <img src={modalImageUrl} alt="" />
        {backdropImageUrl && <img src={backdropImageUrl} alt="" />}
        <p>{overview}</p>
        <h3>{release_date}</h3>
        {!userInfoState.isAuth ? (
          <Button onClick={redirectLogin} type="button">
            Login To Add This
            {/* <button onClick={redirectLogin}>Login To Add This</button> */}
          </Button>
        ) : !movieAlreadyIncluded ? (
          <Button onClick={() => addToList()} type="button">
            Add To List
            {/* <button onClick={() => addToList()}>Add To List</button> */}
          </Button>
        ) : (
          <>
            <Button onClick={toggleWatched} type="button">
              Mark as {movieAlreadyIncluded.watched ? `unwatched` : `watched`}
              {/* <button onClick={() => {toggleWatched();}}>
              Mark as {movieAlreadyIncluded.watched ? `unwatched` : `watched`}
              </button> */}
            </Button>
            <Button onClick={deleteFromList} type="button">
              Delete From List
              {/* <button onClick={() => {deleteFromList();}}>
              Delete From List
              </button> */}
            </Button>
          </>
        )}
        <br />
        {/* only for MyList */}
        {showSimilarMovies()}
        <br />
        <Button onClick={() => setModalIsOpen(false)} type="button">
          Close
          {/* <button onClick={() => {setModalIsOpen(false);}}>
            Close
          </button> */}
        </Button>
      </Modal>
    </div>
  );
}

export default MovieModal;
