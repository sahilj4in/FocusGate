import { useState } from "react";
import { FiBookmark } from "react-icons/fi";
import '../styles/Settings.css';
import "../data/examTopics";

function Topic({ onSave }) {
  const [exam, setExam] = useState("");
  const [topic, setTopic] = useState("");

  const [examKeywords, setExamKeywords] = useState([]);
  const [topicKeywords, setTopicKeywords] = useState([]);

  const handleAddExamKeyword = () => {
    const trimmed = exam.trim();
    if (trimmed && !examKeywords.includes(trimmed)) {
      const updated = [...examKeywords, trimmed];
      setExamKeywords(updated);
      setExam(""); 
      onSave && onSave({ examKeywords: updated, topicKeywords }); 
    }
  };

  const handleAddTopicKeyword = () => {
    const trimmed = topic.trim();
    if (trimmed && !topicKeywords.includes(trimmed)) {
      const updated = [...topicKeywords, trimmed];
      setTopicKeywords(updated);
      setTopic(""); 
      onSave && onSave({ examKeywords, topicKeywords: updated }); 
    }
  };

  const handleRemoveExamKeyword = (keywordToRemove) => {
    const updated = examKeywords.filter(keyword => keyword !== keywordToRemove);
    setExamKeywords(updated);
    onSave && onSave({ examKeywords: updated, topicKeywords });
  };

  const handleRemoveTopicKeyword = (keywordToRemove) => {
    const updated = topicKeywords.filter(keyword => keyword !== keywordToRemove);
    setTopicKeywords(updated);
    onSave && onSave({ examKeywords, topicKeywords: updated });
  };

  return (
    <div className="settings-card">
      <div className="card-header">
        <FiBookmark className="card-icon" />
        <h3 className="card-title">Topic Selection</h3>
      </div>

      <p className="card-subtitle">Select Exam</p>
      <div className="input-with-button">
        <input
          type="text"
          className="settings-input"
          placeholder="Add Exam"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
        />
        <button className="btn btn-tertiary" onClick={handleAddExamKeyword}>Add</button>
      </div>

      <div className="tags-container">
        {examKeywords.map(keyword => (
          <div key={keyword} className="tag">
            {keyword}
            <button onClick={() => handleRemoveExamKeyword(keyword)}>&times;</button>
          </div>
        ))}
      </div>

      <p className="card-subtitle">Select Topic</p>
      <div className="input-with-button">
        <input
          type="text"
          className="settings-input"
          placeholder="Add Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button className="btn btn-tertiary" onClick={handleAddTopicKeyword}>Add</button>
      </div>

      <div className="tags-container">
        {topicKeywords.map(keyword => (
          <div key={keyword} className="tag">
            {keyword}
            <button onClick={() => handleRemoveTopicKeyword(keyword)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topic;
