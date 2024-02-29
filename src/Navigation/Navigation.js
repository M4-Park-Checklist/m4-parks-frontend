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
    <section className="nav-header">
      <Link to="/" className="header-link">
        <h1 className="page-title">National Park Service Service</h1>
      </Link>
      <nav>
        {loggedIn ? <section className="banner"><p className="welcome-message">Welcome User!</p><button className="bg-green-500 hover:bg-pink-300 text-pink font-bold py-2 px-4 mt-4 rounded" onClick={visitSaved}>Saved Parks</button><button onClick={handleLoginNavigate}>Logout</button></section> : <button onClick={handleLoginNavigate}>Login</button>}
      </nav>
    </section>
  )
}

export default Navigation;

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired
}