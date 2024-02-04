import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ParkChecklist.css";
import page from "../resources/page.png";
import SelectedStateParks from "../SelectedStateParks/SelectedStateParks";

const ParkChecklist = ({ apiLink }) => {
  const [parks, setParks] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const parksPerPage = 50;

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
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalChecked = checkedItems.length;
  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const currentParks = parks.slice(indexOfFirstPark, indexOfLastPark);

return (
  <div
    className="park-checklist-container"
    style={{ backgroundImage: `url(${page})` }}
  >
    <h1>National Park Service Service</h1>
    {showResults ? (
      <SelectedStateParks parks={parks} selectedState={selectedState} />
    ) : (
      <>
        <div className="below-header-box">
          <p className="welcome-message">Welcome User!</p>
          <div className="state-selector">
            <select onChange={handleStateChange} value={selectedState}>
              <option value="">Select a State</option>
              <option value="AL">Alabama</option>
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
          <button onClick={() => handlePageChange(currentPage - 1)}>{"<"}</button>
          <span>{`${currentPage}/${Math.ceil(
            parks.length / parksPerPage
          )}`}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>{">"}</button>
          <button
            onClick={() =>
              handlePageChange(Math.ceil(parks.length / parksPerPage))
            }
          >
            {">>"}
          </button>
        </div>
      </>
    )}
  </div>
);
};

export default ParkChecklist;
