import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";
const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className="header">🍑 Peach.Tech Contribution RANKING 👑</div>
      <div className="navigate">
        {location.pathname !== "/" && (
          <Link className="home" to="/">
            HOME
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
