import React, { useState } from 'react';
import '../style/switch.css';

const Switch = ({ name, onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    // Отправляем 1 или 0 в родительский компонент
    if (onToggle) {
      onToggle(isOn ? "0" : "1"); // передаем "1" или "0" в родительский компонент
    }
  };

  return (
    <div className="switch-container">
      <label htmlFor="switch" className="switch-label">
        <input
          type="checkbox"
          id="switch"
          checked={isOn}
          onChange={toggleSwitch}
          className="switch-input"
          name={name}
        />
        <span className={`switch-slider ${isOn ? "on" : "off"}`} />
      </label>
    </div>
  );
};

export default Switch;
