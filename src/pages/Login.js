import React, { useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";

function Login() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  return (
    <div>
      <h3>Login: {`${userInfoState.isAuth}`}</h3>
      <button onClick={() => userInfoDispatch({ type: ACTIONS.LOG_IN })}>
        Log in
      </button>
    </div>
  );
}

export default Login;
