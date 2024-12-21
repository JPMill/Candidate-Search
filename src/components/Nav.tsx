import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/SavedCandidates" style={styles.link}>
            Potential Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    padding: "1rem",
    color: "#ecf0f1",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "500",
  },
};

export default Nav;
