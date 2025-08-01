import { useState } from "react";
import "../styles/Blocked.css";

function BlockedForms({ onAdd, onCancel }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onAdd(url);
  };

  return (
    <form className="blocked-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="url"
        placeholder="Enter website URL"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="form-buttons">
        <button type="submit">Add</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default BlockedForms;
