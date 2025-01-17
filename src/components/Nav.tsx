import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
