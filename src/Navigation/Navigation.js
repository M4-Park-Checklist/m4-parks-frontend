import "./Navigation.css";
import { useNavigate, Link } from "react-router-dom";
import CustomButton from "../ButtonRule";
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
        {loggedIn ? <section className="banner"><p className="welcome-message">Welcome User!</p><CustomButton onClick={visitSaved}>Saved Parks</CustomButton><CustomButton onClick={handleLoginNavigate}>Logout</CustomButton></section> : <CustomButton onClick={handleLoginNavigate}>Login</CustomButton>}
      </nav>
    </section>
  )
}

export default Navigation;

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired
}