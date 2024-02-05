import React, { useState, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "./ParkChecklist.css";
import page from "../resources/page.png";
import SelectedStateParks from "../SelectedStateParks/SelectedStateParks";
import ParkDetails from "../ParkDetails/ParkDetails";

const ParkChecklist = ({ apiLink, apiLinkSingle }) => {
  const [parks, setParks] = useState([]);
  const [parkID, setParkID] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [singlePark, setSinglePark] = useState(false);
  const [foundPark, setFoundPark] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const parksPerPage = 50;
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiLink}&limit=500`);
        setParks(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiLink, selectedState, showResults, currentPage]);

  const fetchParkDetails = (parkID) => {
    const selectedPark = parks.find((park) => park.id === parkID);
  
    if (selectedPark) {
      setParkID(selectedPark.id);
      setSinglePark(true);
      setFoundPark(selectedPark)
      console.log(selectedPark);
    } else {
      console.error(`Park with id ${parkID} not found.`);
    }
  };

  useEffect(() => {
    if (parkID) {
      navigate(`/${selectedState}/${parkID}`);
    }
  }, [parkID, navigate]);

  const handleCheckboxChange = (parkId) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(parkId)) {
        return prevCheckedItems.filter((id) => id !== parkId);
      } else {
        return [...prevCheckedItems, parkId];
      }
    });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleGoClick = () => {
    setShowResults(true);
    navigate(`/selected-state/${selectedState}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalChecked = checkedItems.length;
  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const currentParks = parks.slice(indexOfFirstPark, indexOfLastPark);

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <>
          <div className="below-header-box">
            <p className="welcome-message">Welcome User!</p>
            <div className="state-selector">
              <select onChange={handleStateChange} value={selectedState}>
                <option value="">Select a State</option>
                {states.map((stateCode) => (
                  <option key={stateCode} value={stateCode}>
                    {stateCode}
                  </option>
                ))}
              </select>
              <button onClick={handleGoClick}>Go!</button>
            </div>
          </div>
          <h2>{`${totalChecked}/${parks.length} parks visited`}</h2>
          <h2>Parks Checklist</h2>
          <ul className="checkbox-list">
            {currentParks.map((park) => (
              <li key={park.id}>
                <input
                  type="checkbox"
                  id={park.id}
                  checked={checkedItems.includes(park.id)}
                  onChange={() => handleCheckboxChange(park.id)}
                />
                <label htmlFor={park.id}>{park.fullName}</label>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={() => handlePageChange(1)}>{"<<"}</button>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              {"<"}
            </button>
            <span>{`${currentPage}/${Math.ceil(
              parks.length / parksPerPage
            )}`}</span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              {">"}
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.ceil(parks.length / parksPerPage))
              }
            >
              {">>"}
            </button>
          </div>
        </>
      ),
    },
    // !singlePark conditional will need rework. Can't search new state
    {
      path: `/selected-state/${selectedState}`,
      element:
        showResults && !singlePark ? (
          <SelectedStateParks
            parks={parks}
            selectedState={selectedState}
            fetchParkDetails={fetchParkDetails}
          />
        ) : null,
    },
    {
      path: `/${selectedState}/${parkID}`,
      element: parkID ? <ParkDetails foundPark={foundPark} /> : null,
    },
  ]);

  return (
    <div
      className="park-checklist-container"
      style={{ backgroundImage: `url(${page})` }}
    >
      <h1>National Park Service Service</h1>
      {routes}
    </div>
  );
};

export default ParkChecklist;

ParkChecklist.propTypes = {
  apiLink: PropTypes.string.isRequired,
};
