import React from "react";
import PropTypes from 'prop-types';
import "./Card.css";

function Card({ id, states, fullName, weatherInfo, images, active_alerts }) {
  console.log(active_alerts)
  return (
    <div className="park-card">
      <h2>{fullName}</h2>
      <p>State: {states}</p>
      <div className="image-container">
        <img key={images.id} src={images.url} alt={images.altText} />
      </div>
      <h3>{active_alerts}</h3>
      {/* <p>{weatherInfo}</p> */}
      <button>See More!</button>
    </div>
  );
}

export default Card;


Card.propTypes = {
    id: PropTypes.string,
    states: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    weatherInfo: PropTypes.string,
    images: PropTypes.shape({
      id: PropTypes.string,
      credit: PropTypes.string,
      title: PropTypes.string,
      altText: PropTypes.string.isRequired,
      caption: PropTypes.string,
      url: PropTypes.string.isRequired,
    }).isRequired,
  };
