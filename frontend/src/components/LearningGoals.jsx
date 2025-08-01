import { GoGoal } from "react-icons/go";
import '../styles/Settings.css'; 
function LearningGoals() {
  return (
    <div className="settings-card">
      <div className="card-header">
        <GoGoal className="card-icon" />
        <h3 className="card-title">Learning Goals</h3>
      </div>
      <p className="card-subtitle">Describe your learning goals</p>
      <textarea
        className="settings-textarea"
        placeholder="I wanna solve previous year questions of my given exam.(max word 50)"
        maxLength="50"
      ></textarea>
      <p className="card-footer-note">
        FocusGate will try to tailor questions to help you achieve these goals.
      </p>
    </div>
  );
}

export default LearningGoals;