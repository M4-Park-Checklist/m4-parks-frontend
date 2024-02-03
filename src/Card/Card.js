import React from "react";
import "./Card.css";

function Card({ id, states, fullName, weatherInfo, images }) {
  return (
    <div className="park-card">
      <h2>{fullName}</h2>
      <p>State: {states}</p>
      <div className="image-container">
        {Array.isArray(images) ? (
          images.map((image, index) => (
            <img key={index} src={image.url} alt={image.altText} />
          ))
        ) : (
          <img src={images.url} alt={images.altText} />
        )}
      </div>
      <p>Weather Info: {weatherInfo}</p>
    </div>
  );
}

export default Card;