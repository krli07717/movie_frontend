import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import { Link } from "react-router-dom";

function Register() {
  const { userInfoDispatch } = useContext(UserInfoContext);
  const [registerInputs, setRegisterInputs] = useState({
    email: "",
    password: "",
  });

  const register = async ({ email, password }) => {
    try {
      const res = await axios.post("register", {
        email,
        password,
      });
      console.log(res);
      //and then logs in
      await userInfoDispatch({
        type: ACTIONS.LOG_IN,
        payload: res.data.userId,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onInputChange = (e) => {
    setRegisterInputs({ ...registerInputs, [e.target.name]: e.target.value });
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    register(registerInputs);
  };

  return (
    <div>
      <form action="" onSubmit={(e) => onRegisterSubmit(e)}>
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
          minLength="4"
          required
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
