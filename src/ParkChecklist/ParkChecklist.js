import React, { useState, useEffect } from "react";
import { useRoutes, useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "./ParkChecklist.css";
import page from "../resources/page.png";
import SelectedStateParks from "../SelectedStateParks/SelectedStateParks";
import ParkDetails from "../ParkDetails/ParkDetails";

const ParkChecklist = ({ apiLink }) => {
  const [loading, setLoading] = useState(true);
  const [parks, setParks] = useState([]);
  const [park_code, setParkCode] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [foundPark, setFoundPark] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const parksPerPage = 48;
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const fetchParkDetails = async (park_code) => {
    try {
      const response = await axios.get(`${apiLink}/${park_code}`);
      const selectedPark = response.data.data;

      if (selectedPark) {
        setParkCode(selectedPark.attributes.park_code);
        setFoundPark(selectedPark);
      } else {
        console.error(`Park with id ${park_code} not found.`);
      }
      console.log(selectedPark.attributes.park_code)
      navigate(`/Parks/${selectedState}/${park_code}`);
    } catch (error) {
      console.error("Error fetching park details:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(apiLink);
      setParks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiLink, selectedState, showResults, currentPage, navigate]);

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
    navigate(`/Parks/${selectedState}`);
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
                <label htmlFor={park.id}>{park.attributes.name}</label>
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
    {
      path: `/Parks/${selectedState}`,
      element: showResults ? (
        <SelectedStateParks
          parks={parks}
          selectedState={selectedState}
          fetchParkDetails={fetchParkDetails}
        />
      ) : null,
    },
    {
      path: `/Parks/${selectedState}/${park_code}`,
      element: selectedState ? <ParkDetails foundPark={foundPark} /> : null,
    },
    {
      path: "/*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <div
      className="park-checklist-container"
      style={{ backgroundImage: `url(${page})` }}
    >
      <Link to="/" className="header-link">
        <h1 className="page-title">National Park Service Service</h1>
      </Link>
      {loading ? <p className="loading-message">Loading Parks...</p> : routes}
    </div>
  );
};

export default ParkChecklist;

ParkChecklist.propTypes = {
  apiLink: PropTypes.string.isRequired,
  indivParkLink: PropTypes.string,
};
