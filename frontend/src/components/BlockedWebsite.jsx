import { useState, useEffect } from "react";
import "../styles/Blocked.css";
import API from "../api/api";
import BlockedForms from "./BlockedForms";
import Modal from "./Modal";
import { FaTrash, FaPlus } from "react-icons/fa";

function Blocked({ onRefresh }) {
  const [websites, setWebsites] = useState([]);
  const [showBlockedForms, setShowBlockedForms] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await API.get("/sites", {
          headers: { Authorization: token },
        });
        setWebsites(response.data || []);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };
    fetchWebsites();
  }, [token, onRefresh]);

  const deleteWebsite = async (id) => {
    try {
      await API.delete(`/sites/${id}`, {
        headers: { Authorization: token },
      });
      onRefresh();
    } catch (error) {
      console.error("Error deleting website:", error);
    }
  };

  const addWebsite = async (website) => {
    try {
      const response = await API.post(
        "/sites",
        { url: website },
        { headers: { Authorization: token } }
      );
      if (response.status === 201) {
        setShowBlockedForms(false);
        onRefresh();
      }
    } catch (error) {
      console.error("Error adding website:", error);
      alert("Failed to add website. Please try again.");
    }
  };

  return (
    <div className="blocked-card">
      <div className="card-header">
        <h2 className="blocked-title">Blocked Websites</h2>
        <button className="add-btn" onClick={() => setShowBlockedForms(true)}>
          <FaPlus /> Add New
        </button>
      </div>

      <div className="website-list">
        {websites.length > 0 ? (
          websites.map((site) => (
            <div key={site._id} className="website-item">
              <span>{site.url}</span>
              <button
                className="delete-btn"
                onClick={() => deleteWebsite(site._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="empty-message">No websites blocked yet.</p>
        )}
      </div>

      <Modal
        isOpen={showBlockedForms}
        onClose={() => setShowBlockedForms(false)}
        title="Add a Blocked Website"
      >
        <BlockedForms
          onAdd={addWebsite}
          onCancel={() => setShowBlockedForms(false)}
        />
      </Modal>
    </div>
  );
}

export default Blocked;