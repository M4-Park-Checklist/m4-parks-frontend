import React, { useState } from 'react';

import ParkChecklist from '../ParkChecklist/ParkChecklist';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SelectedStateParks from '../SelectedStateParks/SelectedStateParks';
import ParkDetails from '../ParkDetails/ParkDetails';
import "../styles.css"
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';
import "./App.css"

const App = () => {
  const apiLink = "https://m4-parks-backend.onrender.com/api/v0/parks/";
  const location = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const [foundPark, setFoundPark] = useState(null);
  const [parks, setParks] = useState([]);
  const [park_code, setParkCode] = useState(null);

  return (
    <div className='App'>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={
          <ParkChecklist 
            apiLink={apiLink}
            parks={parks}
            setParks={setParks}
            selectedState={selectedState} 
            setSelectedState={setSelectedState} 
            showResults={showResults}
            setShowResults={setShowResults} 
          />
        } />
        <Route path='/login' element={
          <Login 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn} 
          />
        } />
        <Route path='/Parks/:selectedState' element={
          <SelectedStateParks
            parks={parks}
            selectedState={selectedState}
            apiLink={apiLink}
            setFoundPark={setFoundPark}
            setParkCode={setParkCode}
          />} 
        />
        <Route path='/Parks/:selectedState/:park_code' element={selectedState ? <ParkDetails foundPark={foundPark} /> : null} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;