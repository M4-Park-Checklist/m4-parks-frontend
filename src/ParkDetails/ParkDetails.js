import React from "react";
import PropTypes from "prop-types";
import "./ParkDetails.css";

function ParkDetails({ foundPark }) {
  if (!foundPark) {
    return null;
  }

  return (
    <div className="park-details-container">
      <div className="park-details-title">
        <h2 className="single-title">{foundPark.fullName}</h2>
      </div>
      <div className="park-details-activities">
        <h3 className="single-activities">Activities</h3>
        {/* <p>{foundPark.activities}</p> */}
      </div>
      <div className="park-details-weather">
        <h3 className="single-weather">Weather</h3>
        <p>{foundPark.weatherInfo}</p>
      </div>
    </div>
  );
}

export default ParkDetails;
