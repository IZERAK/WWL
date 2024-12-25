import React from "react";
import "../style/button.css"

const Button = ({ text, onClick, style_b, type = "button" }) => {
  return (
    <button className={`button ${style_b}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
