import React from "react";
import "../style/input.css";

const Input = ({ placeholder, value, onChange, style, type = "text" }) => {
  return (
    <div className="input-container">
      <input
        className={`input ${style}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
      <div className="input-underline"></div>
    </div>
  );
};

export default Input;
