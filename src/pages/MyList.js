import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import Collection from "../components/Collection";
import Button from "../components/Button";

function MyList() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  const [filterList, setFilterList] = useState(false);
  const [notWatchedOnly, setNotWatchedOnly] = useState(true);

  console.log("States @ MyList:", userInfoState);
  return (
    <div className="myList container">
      {userInfoState.MovieList.length ? (
        <>
          <div className="filter_buttons">
            <Button type="button" onClick={() => setFilterList(false)}>
              All
            </Button>
            <Button
              type="button"
              onClick={() => {
                setFilterList(true);
                setNotWatchedOnly((prev) => !prev);
              }}
            >
              {notWatchedOnly ? "Show Watched" : "Show To-Watch"}
            </Button>
          </div>
          <div className="myList_rows">
            {userInfoState.MovieList.map(({ id, watched }) => {
              if (
                !filterList ||
                (notWatchedOnly && !watched) ||
                (!notWatchedOnly && watched)
              ) {
                return (
                  <Collection
                    key={id}
                    collectionName={""}
                    collectionAPI={"DETAILS"}
                    movieId={id}
                  />
                );
              }
            })}
          </div>
        </>
      ) : (
        <div className="noList">
          <h1>You don't have any to-watch movie</h1>
        </div>
      )}
    </div>
  );
}

export default MyList;
