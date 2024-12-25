import React, { useEffect } from "react";
import "../style/toast.css";

const SuccessToast = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`toast success ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default SuccessToast;
