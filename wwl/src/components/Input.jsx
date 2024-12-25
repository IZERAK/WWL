import React from "react";
import "../style/input.css";

const Input = ({ placeholder, value, onChange, style, type = "text",name }) => {
  return (
    <div className="input-container">
      <input
        className={`input ${style}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
      />
      <div className="input-underline"></div>
    </div>
  );
};

export default Input;
