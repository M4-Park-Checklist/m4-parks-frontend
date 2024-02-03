import React from "react";
import "./Card.css";

function Card({ id, states, fullName, weatherInfo, images }) {
  return (
    <div className="park-card">
      <h2>{fullName}</h2>
      <p>State: {states}</p>
      <div className="image-container">
        <img key={images.id} src={images.url} alt={images.altText} />
      </div>
      <h3>Weather Info</h3>
      <p>{weatherInfo}</p>
    </div>
  );
}

export default Card;
