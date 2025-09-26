import { useEffect, useState } from "react";
import ProgressSummary from "../components/ProgressSummary";
import { FaUserEdit } from "react-icons/fa";
import "../styles/Profile.css";
import API from "../api/api"

const token=window.localStorage.getItem('token');
function ProfilePage() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

 useEffect(() => {
  const handleUser = async () => {
    try {
      const response = await API.get('/users/profile',{headers: {Authorization:token}});
      setUsername(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  handleUser();
}, []);

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
