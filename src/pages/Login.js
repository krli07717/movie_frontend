import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import { Link } from "react-router-dom";

function Login() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("login", {
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value }); //[e.target.value] is a "computed property name"
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    login(loginInputs);
  };

  return (
    <div>
      <form action="" onSubmit={(e) => onLoginSubmit(e)}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => onInputChange(e)}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => onInputChange(e)}
          required
        />
        <br />
        <input type="submit" value="Log in" />
      </form>
      <button onClick={() => userInfoDispatch({ type: ACTIONS.LOG_IN })}>
        Fast Log in
      </button>
      <div>
        <h3>Not yet registered?</h3>
        <Link to="/Register">Register!</Link>
      </div>
    </div>
  );
}

export default Login;
