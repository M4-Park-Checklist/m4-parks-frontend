import React, { useState } from 'react';
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import Navigation from '../Navigation/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import "../styles.css"
import "./App.css"

const App = () => {
  const apiLink = "https://m4-parks-backend.onrender.com/api/v0/parks/";
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <ParkChecklist apiLink={apiLink}/>
    </Router>
  );
};

export default App;