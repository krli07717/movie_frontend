import React, { useState, useContext } from "react";
import { UserInfoContext } from "../App";
import Collection from "../components/Collection";
import Button from "../components/Button";

function MyList() {
  const { userInfoState } = useContext(UserInfoContext);
  const [filterList, setFilterList] = useState(true);
  const [notWatchedOnly, setNotWatchedOnly] = useState(true);

  console.log("States @ MyList:", userInfoState);
  return (
    <div className="myList container">
      {userInfoState.MovieList.length ? (
        <>
          <div className="filter_buttons">
            <Button type="button" onClick={() => setFilterList(false)}>
              全部電影
            </Button>
            <Button
              type="button"
              onClick={() => {
                setFilterList(true);
                setNotWatchedOnly((prev) => !prev);
              }}
            >
              {notWatchedOnly ? "已觀看" : "待觀看"}
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
              } else {
                return null;
              }
            })}
          </div>
        </>
      ) : (
        <div className="noList">
          <h1>您尚未加入任何電影</h1>
        </div>
      )}
    </div>
  );
}

export default MyList;
