import React from 'react';
import PropTypes from 'prop-types';
import './ParkDetails.css'

function ParkDetails({ parkID }) {
  if (!parkID) {
    return null;
  }


  return (
    <div className="park-details-container">
      <div className="park-details-title">
        <h1 className="single-title">{parkID.title}</h1>
        {parkID.urlToImage && <img className='image' src={parkID.urlToImage} alt={parkID.title} />}
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

export default ParkDetails