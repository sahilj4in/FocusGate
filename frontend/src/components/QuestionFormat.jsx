// src/components/QuestionFormat.jsx
import React, { useState } from 'react';
import { FiCheckSquare } from "react-icons/fi";
import '../styles/Settings.css';

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="toggle-item">
    <label className="card-subtitle">{label}</label>
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider"></span>
    </label>
  </div>
);

function Format() {
  const [formats, setFormats] = useState({
    mcq:false,
    trueFalse:false,
    shortAnswer:false,
    numerical:false,
  });

  const toggleFormat = (key) => {
    setFormats({ ...formats, [key]: !formats[key] });
  };

  return (
    <div className="settings-card">
      <div className="card-header">
        <FiCheckSquare className="card-icon" />
        <h3 className="card-title">Question Format</h3>
      </div>
       <p className="card-subtitle">Select Question Formats</p>
      <div className="toggle-group">
        <ToggleSwitch 
          label="Multiple Choice" 
          checked={formats.mcq} 
          onChange={() => toggleFormat('mcq')} 
        />
        <br />
        <ToggleSwitch 
          label="True/False" 
          checked={formats.trueFalse} 
          onChange={() => toggleFormat('trueFalse')} 
        />
        <br />
        <ToggleSwitch 
          label="Short Answer" 
          checked={formats.shortAnswer} 
          onChange={() => toggleFormat('shortAnswer')} 
        />
        <br />
        <ToggleSwitch 
          label="Numerical" 
          checked={formats.shortAnswer} 
          onChange={() => toggleFormat('numerical')} 
        />
      </div>
    </div>
  );
}

export default Format;