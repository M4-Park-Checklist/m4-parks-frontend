import React, { useState, useEffect } from 'react';
import axios from "axios";
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import { Routes, Route, useLocation } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const [foundPark, setFoundPark] = useState(null);
  const [parks, setParks] = useState([]);
  const [park_code, setParkCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink);
        setParks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, [apiLink]);

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
            loading={loading}
            setLoading={setLoading}
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