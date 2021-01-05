import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import Form from "../components/Form";

function Register() {
  const { userInfoDispatch } = useContext(UserInfoContext);
  const [registerInputs, setRegisterInputs] = useState({
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(false);

  const register = async ({ email, password }) => {
    try {
      const res = await axios.post("auth/register", {
        email,
        password,
      });
      //and then logs in
      await userInfoDispatch({
        type: ACTIONS.LOG_IN,
        payload: res.data.userId,
      });
    } catch (error) {
      console.log(error.response.data);
      setRegisterError(true);
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
      <Form
        onFormSubmit={onRegisterSubmit}
        onInputChange={onInputChange}
        SubmitButtonText="Register"
      />
      {registerError && <h5>Email already taken</h5>}
    </div>
  );
}

export default Register;
