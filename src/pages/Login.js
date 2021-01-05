import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import { Link } from "react-router-dom";
import Form from "../components/Form";

function Login() {
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("auth/login", {
        email,
        password,
      });

      console.log("login api fetched", res.data);

      await userInfoDispatch({
        type: ACTIONS.LOG_IN,
        payload: res.data.userId,
      });
    } catch (error) {
      console.log(error.response);
      setLoginError(true);
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
      <Form
        onFormSubmit={onLoginSubmit}
        onInputChange={onInputChange}
        SubmitButtonText="Log in"
      />
      {loginError && <h5>Wrong Combinations</h5>}
      <div>
        <h3>Not yet registered?</h3>
        <Link to="/Register">Register!</Link>
      </div>
    </div>
  );
}

export default Login;
