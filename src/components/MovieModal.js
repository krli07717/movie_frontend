import React, { useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

Modal.setAppElement("#root");

function MovieModal({
  id,
  title,
  modalImageUrl,
  overview,
  release_date,
  modalIsOpen,
  setModalIsOpen,
}) {
  //fetch provider & home page?
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  const movieAlreadyIncluded = userInfoState.MovieList.find(
    (item) => item.id === id
  );
  //add/watched/delete/redirect to login button
  let history = useHistory();
  const redirectLogin = () => {
    history.push("/Login");
  };

  const addToList = () => {
    userInfoDispatch({
      type: ACTIONS.ADD_TO_LIST,
      payload: { id: id, watched: false },
    });
    setModalIsOpen(false);
    console.log(userInfoState.MovieList);
  };

  const toggleWatched = () => {
    let watched = movieAlreadyIncluded.watched;
    userInfoDispatch({
      type: ACTIONS.TOGGLE_WATCHED,
      payload: { id: id, watched: !watched },
    });
    setModalIsOpen(false);
    console.log(userInfoState.MovieList);
  };

  const deleteFromList = () => {
    userInfoDispatch({
      type: ACTIONS.REMOVE_FROM_LIST,
      payload: { id },
    });
    setModalIsOpen(false);
    console.log(userInfoState.MovieList);
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h1>{title}</h1>
        <img src={modalImageUrl} alt="" />
        <p>{overview}</p>
        <h3>{release_date}</h3>
        {!userInfoState.isAuth ? (
          <button onClick={redirectLogin}>Login To Add This</button>
        ) : !movieAlreadyIncluded ? (
          <button onClick={() => addToList()}>Add To List</button>
        ) : (
          <>
            <button
              onClick={() => {
                toggleWatched();
              }}
            >
              Mark as {movieAlreadyIncluded.watched ? `unwatched` : `watched`}
            </button>
            <button
              onClick={() => {
                deleteFromList();
              }}
            >
              Delete From List
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default MovieModal;
