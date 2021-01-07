import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import { Link } from "react-router-dom";
import Button from "../components/Button";
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
    <div className="container item_center">
      <div className="form_container">
        <h1>Login</h1>
        <Form
          onFormSubmit={onLoginSubmit}
          onInputChange={onInputChange}
          SubmitButtonText="Log in"
        />
        {loginError && <h5>Wrong Combinations</h5>}
        <h3>Not yet registered?</h3>
        <Button type="button">
          <Link to="/Register">Register!</Link>
        </Button>
      </div>
    </div>
  );
}

export default Login;
