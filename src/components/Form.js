import React from "react";
import Button from "./Button";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";

const Form = ({
  onFormSubmit,
  onInputChange,
  SubmitButtonText,
  errorStatus,
  errorMessage,
}) => {
  return (
    <form className="auth_form" action="" onSubmit={(e) => onFormSubmit(e)}>
      <div>
        <HiOutlineMail size="30" />
        <input
          type="email"
          name="email"
          placeholder="電子信箱"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div>
        <AiOutlineLock size="30" />
        <input
          type="password"
          name="password"
          placeholder="密碼"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      {errorStatus && <h5>{errorMessage}</h5>}
      <div>
        <Button type="submit">{SubmitButtonText}</Button>
      </div>
    </form>
  );
};

export default Form;
