import React, { useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";

function MyList() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  //fetch its provider & home page
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
    </div>
  );
}

export default MyList;
