import React, { useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";

function MyList() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);

  return (
    <div>
      <h3>MyList!</h3>
      {userInfoState.MovieList.map(({ id, watched }) => {
        return (
          <h3>
            {id} watched: {`${watched}`}
          </h3>
        );
      })}
    </div>
  );
}

export default MyList;
