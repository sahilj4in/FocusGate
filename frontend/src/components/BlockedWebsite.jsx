import { useState } from "react";
import "../styles/Blocked.css"; 
import API from "../api/api"

function Blocked() {
  const [websites, setWebsites] = useState([
    "facebook.com",
    "twitter.com",
    "instagram.com",
    "youtube.com",
    "reddit.com",
  ]);
  const [newWebsite, setNewWebsite] = useState("");

  const deleteWebsite = async(site) => {
    await API.delete(`/sites/${site}`);
    setWebsites(websites.filter((w) => w !== site));
  };

  const addWebsite = () => {
     
  };

  return (
    <div className="blocked-container">
        
    </div>
  );
}

export default Blocked;
