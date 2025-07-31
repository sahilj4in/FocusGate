import Blocked from "../components/BlockedWebsite";
import "../styles/Dashboard.css";
import Card from "../components/StatisticCard";
import { useEffect, useState } from "react";
import API from "../api/api";
import WelcomeImage from "../assets/welcome-image.png";

function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("token");
  const [noOfUrl, setNoOfUrl] = useState(0);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await API.get("/sites", {
          headers: { Authorization: token },
        });
        setNoOfUrl(response.data.length);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };
    fetchWebsites();
  }, [refresh]);

  return (
    <div className="dashboard-layout">
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Welcome Back, Productivity Hacker!</h1>
          <p>
            Manage your blocked sites here and see how FocusGate is helping you
            stay on track.
          </p>
        </div>
        <img src={WelcomeImage} alt="Sketching" className="welcome-image" />
      </div>

      <main className="main-content">
        <div className="blocked-section">
          <Blocked onRefresh={() => setRefresh((prev) => !prev)} />
        </div>
        <div className="stats-section">
          <div className="stat-card-wrapper">
            <Card
              className="stats-card"
              title="Sites Blocked"
              value={noOfUrl}
              icon="🖥️"
            />
          </div>
          <div className="stat-card-wrapper">
            <Card
            // hard coded value
              className="stats-card"
              title="Questions Answered"
              value="210"
              icon="💬"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;