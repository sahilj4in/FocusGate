import { useState } from "react";
import ProgressSummary from "../components/ProgressSummary";
import { FaUserEdit } from "react-icons/fa";
import "../styles/Profile.css";

function ProfilePage() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("Akarshan Tyagi");
  const [email, setEmail] = useState("akarshan@example.com");

  const handleLogout = () => {
  window.localStorage.removeItem('token');
  window.location.reload(); 
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Profile Page</h2>

      <div className="profile-card">
        <div className="profile-image-section">
          <img
            src={image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-imag"
          />
          <label className="edit-button">
            <FaUserEdit />
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>Name:</label>
            <span>{username}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{email}</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3>Progress Summary</h3>
        <ProgressSummary />
      </div>
      <button 
      className="logout-button"
      onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
