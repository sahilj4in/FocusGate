import { GoGraph } from "react-icons/go";
import '../styles/Settings.css';

const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="progress-item">
      <div className="progress-labels">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{value}/{max}</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

function ProgressSummary() {
  return (
    <div className="settings-card">
      <div className="card-header">
        <GoGraph className="card-icon" />
        <h3 className="card-title">Progress Summary</h3>
      </div>
      <div className="progress-summary-content">
        <ProgressBar label="Technology" value={15} max={20} />
        <ProgressBar label="Science" value={8} max={10} />
      </div>
    </div>
  );
}

export default ProgressSummary;