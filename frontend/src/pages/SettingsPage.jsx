import Topic from "../components/QuestionTopic";
import DifficultySelector from "../components/QuesDiffculty";
import Frequency from "../components/QuestionFrequency";
import Format from "../components/QuestionFormat";
import LearningGoals from "../components/LearningGoals";
import "../styles/Settings.css";

function SettingsPage() {
  const handleSave = () => {
    // Save logic here
    alert("Settings Saved!");
  };

  const handleReset = () => {
    // Reset logic here
    alert("Settings Reset!");
  };

  return (
    <div className="settings-page-container">
      <h1 className="page-title">Question Settings</h1>
      
      <div className="settings-grid">
        {/* These items will be placed into the grid automatically */}
        <Topic />
        <DifficultySelector />
        <Format />
        <Frequency />
        <LearningGoals />
      </div>

      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={handleReset}>Reset to Defaults</button>
        <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}

export default SettingsPage;