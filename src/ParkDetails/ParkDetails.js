import React from "react";
import PropTypes from "prop-types";
import "./ParkDetails.css";

function ParkDetails({ foundPark }) {
  if (!foundPark) {
    return null;
  }

  console.log(foundPark);
  return (
    <div className="park-details-container">
      <div className="park-details-title">
        <h1 className="single-title">{foundPark.fullName}</h1>
      </div>
      <div className="park-details-activities">
        <h2 className="single-activities">Activities</h2>
      </div>
      <div className="park-details-weather">
        <h2 className="single-weather">Weather</h2>
      </div>
    </div>
  );
}

export default ParkDetails;
