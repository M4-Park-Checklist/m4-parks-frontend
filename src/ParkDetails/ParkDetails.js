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
      <section className="image-container">
        <img
         className="single-image"
         src={foundPark.images[1].url}
         alt={foundPark.images[0].altText}
        />
      </section>
      <section className="park-info">
        <div className="park-details-activities">
          <h3 className="single-activities">Activities</h3>
          {/* <p>{foundPark.activities}</p> */}
        </div>
        <div className="park-details-weather">
          <h3 className="single-weather">Weather</h3>
          <p>{foundPark.weatherInfo}</p>
        </div>
      </section>
    </div>
  );
}

export default ParkDetails;


ParkDetails.propTypes = {
  foundPark: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        altText: PropTypes.string.isRequired
      })
    ).isRequired,
    weatherInfo: PropTypes.string.isRequired
  }).isRequired
};
