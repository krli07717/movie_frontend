import React, { useState, useContext } from "react";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import Button from "../components/Button";

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
        <Button type="submit">
          Register
          {/* <input type="submit" value="Register" /> */}
        </Button>
      </form>
      {registerError && <h5>Email already taken</h5>}
    </div>
  );
}

export default Register;
