import { Link } from "react-router-dom";
import "./ErrorPage.css";
import CustomButton from "../ButtonRule";

const ErrorPage = () => {
  return (
    <div className="error-display">
      <h2>Please stay on the marked trails.</h2>
      <p>Follow leave no trace guidelines and return to the visitor's center.</p>
      <Link to={'/'}>
        <CustomButton>Understood</CustomButton>
      </Link>
    </div>
  )
};

export default ErrorPage;