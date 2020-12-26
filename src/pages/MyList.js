import React, { useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import Collection from "../components/Collection";

function MyList() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  //fetch its recommendations, tmdb url & home page

  return (
    <div>
      <h3>MyList!</h3>
      {userInfoState.MovieList.map(({ id, watched }, index) => {
        return (
          <h3 key={index}>
            {id} watched: {`${watched}`}
          </h3>
        );
      })}
      {userInfoState.MovieList.map(({ id }) => (
        <Collection
          key={id}
          collectionName={""}
          collectionAPI={"DETAILS"}
          movieId={id}
        />
      ))}
    </div>
  );
}

export default MyList;
