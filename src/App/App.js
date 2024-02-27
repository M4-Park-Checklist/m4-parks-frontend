import React, { useState } from 'react';
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import "../styles.css"
import ErrorPage from '../ErrorPage/ErrorPage';
import "./App.css"

const App = () => {
  const apiLink = "https://m4-parks-backend.onrender.com/api/v0/parks/";
  const location = useLocation();

  const [selectedState, setSelectedState] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className='App'>

      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={<ParkChecklist apiLink={apiLink} selectedState={selectedState} setSelectedState={setSelectedState}/>} />
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path='/Parks/:selectedState' element={showResults ? (
          <SelectedStateParks
            parks={parks}
            selectedState={selectedState}
            fetchParkDetails={fetchParkDetails}
          />
          ) : null} 
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;