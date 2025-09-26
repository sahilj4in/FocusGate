import { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";
import "../styles/Settings.css";

function Frequency({ onSave }) {
  const [time, setTime] = useState(5);

  useEffect(() => {
    onSave && onSave(time);
  }, [time]);

  return (
    <div className="settings-card">
      <div className="card-header">
        <FiClock className="card-icon" />
        <h3 className="card-title">Question Frequency</h3>
      </div>
      <p className="card-subtitle">Ask a question every (max:30mins)</p>
      <input
        type="number"
        min="5"
        max="30"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="settings-input frequency-input"
      />
    </div>
  );
}

export default Frequency;
