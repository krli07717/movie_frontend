import React from "react";
import Button from "./Button";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";

const Form = ({ onFormSubmit, onInputChange, SubmitButtonText }) => {
  return (
    <form className="auth_form" action="" onSubmit={(e) => onFormSubmit(e)}>
      <div>
        <HiOutlineMail size="30" />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div>
        <AiOutlineLock size="30" />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div>
        <Button type="submit">{SubmitButtonText}</Button>
      </div>
    </form>
  );
};

export default Form;
