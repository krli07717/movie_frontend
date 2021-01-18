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
  const [registerLoading, setRegisterLoading] = useState(false);

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
      // console.log(error.response.data);
      setRegisterLoading(false);
      setRegisterError(true);
    }
  };

  const onInputChange = (e) => {
    setRegisterInputs({ ...registerInputs, [e.target.name]: e.target.value });
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError(false);
    setRegisterLoading(true);
    register(registerInputs);
  };

  return (
    <div className="container item_center">
      <div className="form_container">
        <h1>註冊</h1>
        <Form
          onFormSubmit={onRegisterSubmit}
          onInputChange={onInputChange}
          loadingStatus={registerLoading}
          errorStatus={registerError}
          errorMessage="電子信箱已註冊"
          SubmitButtonText="註冊"
        />
        {/* {registerError && <h3>電子信箱已註冊</h3>} */}
      </div>
    </div>
  );
}

export default Register;
