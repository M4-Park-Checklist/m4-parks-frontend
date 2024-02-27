import React, { useState } from 'react';
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import "../styles.css"
import "./App.css"

const App = () => {
  const apiLink = "https://m4-parks-backend.onrender.com/api/v0/parks/";
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className='App'>

      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={<ParkChecklist apiLink={apiLink}/>} />
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;