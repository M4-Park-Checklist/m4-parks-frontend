import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Navigation = ({loggedIn, setLoggedIn}) => {
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
      <p className="welcome-message">Welcome User!</p>
      <nav>
        {loggedIn ? <button onClick={handleLoginNavigate}>Logout</button> : <button onClick={handleLoginNavigate}>Login</button>}
        {loggedIn ?? <button onClick={visitSaved}>Saved Parks</button>}
      </nav>
    </section>
  )
}

Navigation.PropTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired
}