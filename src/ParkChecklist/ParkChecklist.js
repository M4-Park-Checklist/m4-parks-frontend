import React, { useState, useEffect } from "react";
import { useRoutes, useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "./ParkChecklist.css";
import page from "../resources/page.png";
import SelectedStateParks from "../SelectedStateParks/SelectedStateParks";
import ParkDetails from "../ParkDetails/ParkDetails";
import Login from '../Login/Login';
import StateSort from "../Modal/StateSort";
import DesignationSort from "../Modal/DesignationSort";

const ParkChecklist = ({ apiLink }) => {
  const [loading, setLoading] = useState(true);
  const [parks, setParks] = useState([]);
  const [park_code, setParkCode] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [foundPark, setFoundPark] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedStateParks, setSelectedStateParks] = useState([]);
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ parks: [], designations: [] });
  const navigate = useNavigate();
  const parksPerPage = 48;
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

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
      navigate(`/Parks/${selectedState}/${park_code}`);
    } catch (error) {
      console.error("Error fetching park details:", error);
    } finally {
    }
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

  

  const handleStateCheckboxChange = (stateCode) => {
    const parksInState = parks.filter(park => park.attributes.states === stateCode);
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      parks: prevFilters.parks.some(park => park.attributes.states === stateCode)
        ? prevFilters.parks.filter(park => park.attributes.states !== stateCode)
        : [...prevFilters.parks, ...parksInState]
    }));
  };

  const getUniqueDesignations = () => {
    const designations = new Set();
    parks.forEach((park) => {
      designations.add(park.attributes.designation);
    });
    return Array.from(designations);
  };

  const handleDesignationCheckboxChange = (designation) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      designations: prevFilters.designations.includes(designation)
        ? prevFilters.designations.filter(d => d !== designation)
        : [...prevFilters.designations, designation]
    }));
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
          <div className="sorting-options">
            <div className="sort-by-state">
              <StateSort
                states={states}
                selectedStateParks={selectedStateParks}
                handleStateCheckboxChange={handleStateCheckboxChange}
              />
            </div>
            <DesignationSort
        getUniqueDesignations={getUniqueDesignations}
        selectedDesignations={selectedDesignations}
        handleDesignationCheckboxChange={handleDesignationCheckboxChange}
      />
          </div>
          <h2>{`${totalChecked}/${parks.length} parks visited`}</h2>
          <h2>Parks Checklist</h2>
          <ul className="checkbox-list">
            {selectedFilters.parks.length > 0 ? (
              selectedFilters.parks
                .filter(
                  (park) =>
                    selectedFilters.designations.length === 0 ||
                    selectedFilters.designations.some(
                      (designation) =>
                        park.attributes.designation === designation
                    )
                )
                .map((park) => (
                  <li key={park.id}>
                    <input
                      type="checkbox"
                      id={park.id}
                      checked={checkedItems.includes(park.id)}
                      onChange={() => handleCheckboxChange(park.id)}
                    />
                    <label htmlFor={park.id}>{park.attributes.name}</label>
                  </li>
                ))
            ) : selectedFilters.designations.length > 0 ? (
              parks
                .filter((park) =>
                  selectedFilters.designations.includes(
                    park.attributes.designation
                  )
                )
                .map((park) => (
                  <li key={park.id}>
                    <input
                      type="checkbox"
                      id={park.id}
                      checked={checkedItems.includes(park.id)}
                      onChange={() => handleCheckboxChange(park.id)}
                    />
                    <label htmlFor={park.id}>{park.attributes.name}</label>
                  </li>
                ))
            ) : (
              currentParks.map((park) => (
                <li key={park.id}>
                  <input
                    type="checkbox"
                    id={park.id}
                    checked={checkedItems.includes(park.id)}
                    onChange={() => handleCheckboxChange(park.id)}
                  />
                  <label htmlFor={park.id}>{park.attributes.name}</label>
                </li>
              ))
            )}
          </ul>
          <div className="pagination">
            {currentPage !== 1 && (
              <button onClick={() => handlePageChange(1)}>{"<<"}</button>
            )}
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                {"<"}
              </button>
            )}
            <span>{`${currentPage}/${Math.ceil(
              parks.length / parksPerPage
            )}`}</span>
            {currentPage < Math.ceil(parks.length / parksPerPage) && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                {">"}
              </button>
            )}
            {currentPage !== Math.ceil(parks.length / parksPerPage) && (
              <button
                onClick={() =>
                  handlePageChange(Math.ceil(parks.length / parksPerPage))
                }
              >
                {">>"}
              </button>
            )}
          </div>
        </>
      ),
    },
    {
      path: `/login`,
      element: (
        <div>
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      )
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
      // style={{ backgroundImage: `url(${page})` }}
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
