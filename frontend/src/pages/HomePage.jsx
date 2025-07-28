import { Link } from "react-router-dom";
import "../styles/HomePage.css"; 
function HomePage() {
  return (
    <div className="homepage-container">
      <main className="homepage-hero">
        <div className="hero-content">
          <h2 className="hero-title">Take Control of Your Focus</h2>
          <p className="hero-subtitle">
            Block distractions. Unlock websites by answering smart, subject-relevant questions.
          </p>
          <Link to="/register" className="hero-cta">Get Started</Link>
        </div>
        <div className="hero-image">
          <img
            src="https://placehold.co/500x300/4F46E5/ffffff?text=Focus+Illustration"
            alt="Illustration of productivity"
          />
        </div>
      </main>

      <section className="homepage-features">
        <h3>Key Features</h3>
        <ul>
          <li>🔒 Website Locking</li>
          <li>🧠 AI-Powered Question Generation</li>
          <li>👤 Personalized Profiles & Stats</li>
          <li>📈 Adaptive Question Difficulty</li>
          <li>🧩 Extension-based Locking Enforcement</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
