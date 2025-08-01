import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; 

function Navbar() {
  const { pathname } = useLocation();

  const profileImage = "https://placehold.co/40x40/4F46E5/ffffff?text=P";

  const isLoggedIn = localStorage.getItem("token"); // or use context/state in future

  return (
    <nav className="navbar-container">
      <h1 className="navbar-logo">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="navbar-logo-link">
          FocusGate
        </Link>
      </h1>

      <ul className="navbar-links">
        {isLoggedIn ? (
          <>
            <li>
              <Link
                to="/dashboard"
                className={`navbar-link ${pathname === "/dashboard" ? "active-link" : ""}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`navbar-link ${pathname === "/settings" ? "active-link" : ""}`}
              >
                Question Settings
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`navbar-profile-link ${pathname === "/profile" ? "active-profile" : ""}`}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/40x40/cccccc/000000?text=P";
                  }}
                />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className={`navbar-link ${pathname === "/login" ? "active-link" : ""}`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`navbar-link ${pathname === "/register" ? "active-link" : ""}`}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
