import React from "react";
import "../style/toast.css";

const ErrorToast = ({ message, visible, onClose }) => {
  return (
    <div className={`toast error ${visible ? "show" : ""}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default ErrorToast;
