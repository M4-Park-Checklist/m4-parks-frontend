import "./Navigation.css";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({loggedIn, setLoggedIn}) => {
  const navigate = useNavigate();
  const handleLoginNavigate = () => {
    setLoggedIn(false);
    navigate(`/login`);
  }
  const visitSaved = () => {
    navigate(`/saved`);
  }

  return (
    <section>
      <Link to="/" className="header-link">
        <h1 className="page-title">National Park Service Service</h1>
      </Link>
      <p className="welcome-message">Welcome User!</p>
      <nav>
        {loggedIn ? <button onClick={handleLoginNavigate}>Logout</button> : <button onClick={handleLoginNavigate}>Login</button>}
        {loggedIn ?? <button onClick={visitSaved}>Saved Parks</button>}
      </nav>
    </section>
  )
}

export default Navigation;

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired
}