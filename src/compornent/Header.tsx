import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="modern-header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-title">
            <img src="/PeachTech-logo.png" alt="PeachTech Logo" className="peach-logo" />
            <h1 className="title-text">PeachTech Contribution RANKING</h1>
            <span className="crown-emoji">👑</span>
          </div>
          <div className="header-subtitle">
            <span className="update-info">※毎日30分ごとに更新されます</span>
          </div>
        </div>
        <nav className="header-nav">
          {location.pathname !== "/" && (
            <Link className="nav-home-btn" to="/">
              <span className="nav-icon">🏠</span>
              HOME
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
