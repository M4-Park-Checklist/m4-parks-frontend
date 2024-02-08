import React from 'react';
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import { BrowserRouter as Router } from 'react-router-dom';
import "../styles.css"
import "./App.css"

const App = () => {
  const apiLink = `https://m4-parks-backend.onrender.com/api/v0/parks/`;

  return (
    <Router>
      <ParkChecklist apiLink={apiLink}/>
    </Router>
  );
};

export default App;