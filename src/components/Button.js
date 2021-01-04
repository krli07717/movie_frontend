import React from "react";

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
