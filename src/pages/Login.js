import React, { useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";

function Login() {
  const userInfoContext = useContext(UserInfoContext);
  return (
    <div>
      <h3>Login: {`${userInfoContext.userInfoState.isAuth}`}</h3>
      <button
        onClick={() =>
          userInfoContext.userInfoDispatch({ type: ACTIONS.LOG_IN })
        }
      >
        Log in
      </button>
    </div>
  );
}

export default Login;
