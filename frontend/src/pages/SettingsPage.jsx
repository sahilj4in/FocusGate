import { useState } from "react";
import Topic from "../components/QuestionTopic";
import DifficultySelector from "../components/QuesDiffculty";
import Frequency from "../components/QuestionFrequency";
import Format from "../components/QuestionFormat";
import LearningGoals from "../components/LearningGoals";
import "../styles/Settings.css";
import API from "../api/api";

function SettingsPage() {
  const [exam, setExam] = useState([]);
  const [topic, setTopic] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [format, setFormat] = useState({});
  const [frequency, setFrequency] = useState("");

  const token = localStorage.getItem("token");

  const handleSave = async () => {
    try {
      const response = await API.post(
        `/questions/generate`,
        {
          exam,
          topic,
          difficulty,
          format,
          frequency,
        },
        { headers: { Authorization: token } }
      );
      alert("Settings Saved!");

      window.location.reload(); 
    } catch (error) {
      alert("Settings Not Updated");
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      await API.delete(`/questions`, {
        headers: { Authorization: token }
      });
      alert("Settings Reset!");

      setExam([]);
      setTopic([]);
      setDifficulty("");
      setFormat({});
      setFrequency("");
      
      window.location.reload(); 
    } catch (error) {
      alert("Reset Failed");
      console.error(error);
    }
  };

  return (
    <div className="settings-page-container">
      <h1 className="page-title">Question Settings</h1>

      <div className="settings-grid">
        <Topic
          onSave={({ examKeywords, topicKeywords }) => {
            setExam(examKeywords);
            setTopic(topicKeywords);
          }}
        />
        <DifficultySelector
          onSave={(value) => setDifficulty(value)}
        />
        <Format
          onSave={(value) => setFormat(value)}
        />
        <Frequency
          onSave={(value) => setFrequency(value)}
        />
        <LearningGoals/>
      </div>

      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset to Defaults
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
