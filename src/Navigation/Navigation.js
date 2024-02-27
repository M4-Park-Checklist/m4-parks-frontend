import "./Navigation.css";
import Login from '../Login/Login';
import { useRoutes, useNavigate, Link, Navigate } from "react-router-dom";


export const Navigation = ({loggedIn, setLoggedIn}) => {
  const navigate = useNavigate();
  const handleLoginNavigate = () => {
    setLoggedIn(false);
    navigate(`/login`);
  }

  return (
    <section>
      <p className="welcome-message">Welcome User!</p>
      <nav>
        {loggedIn ? <button onClick={handleLoginNavigate}>Login</button> : <button onClick={handleLoginNavigate}>Logout</button>}
      </nav>
    </section>
    
  )
}