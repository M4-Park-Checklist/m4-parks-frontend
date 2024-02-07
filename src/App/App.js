import React from 'react';
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css"

const App = () => {
  const apiLink = 'https://developer.nps.gov/api/v1/parks?api_key=jR5uonh1B6R19iLhdweq7nHBs0uGgKgwzqn3BNfb';
  const indivParkLink = `https://m4-parks-backend.onrender.com/api/v0/parks/`

  return (
    <Router>
      <ParkChecklist apiLink={apiLink}/>
    </Router>
  );
};

export default App;