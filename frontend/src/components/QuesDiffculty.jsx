import React, { useState } from 'react';
import { FiBarChart2 } from "react-icons/fi";
import "../styles/Settings.css";

const DifficultySelector = () => {
  const [value, setValue] = useState(2);

  const getLabel = (val) => {
    switch(val) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return ""; 
    }
  };

  return (
    <div className="settings-card">
      <div className="card-header">
        <FiBarChart2 className="card-icon" />
        <h3 className="card-title">Difficulty Level</h3>
      </div>
      <p className="card-subtitle">Select Difficulty: {getLabel(value)}</p>
      <input
        type="range"
        min="1"
        max="3"
        step="1"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        className="difficulty-slider"
      />
      <div className="slider-labels">
        <span>Easy</span>
        <span>Medium</span>
        <span>Hard</span>
      </div>
    </div>
  );
};

export default DifficultySelector;