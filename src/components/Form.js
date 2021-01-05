import React from "react";
import Button from "./Button";

const Form = ({ onFormSubmit, onInputChange, SubmitButtonText }) => {
  return (
    <form action="" onSubmit={(e) => onFormSubmit(e)}>
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
      <Button type="submit">{SubmitButtonText}</Button>
    </form>
  );
};

export default Form;
