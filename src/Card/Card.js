import React from 'react';
import 'Card.css'

function Card({ park }) {
  const {
    fullName,
    parkCode,
    description,
    latitude,
    longitude,
    states,
    directionsInfo,
    directionsUrl,
    images,
    weatherInfo,
    name,
    designation,
  } = park;

  return (
    <div className="park-card">
      <h2>{fullName}</h2>
      <p>Park Code: {parkCode}</p>
      <p>Description: {description}</p>
      <p>Location: {latitude}, {longitude}</p>
      <p>State: {states}</p>
      <p>Directions Info: {directionsInfo}</p>
      <p>Directions URL: <a href={directionsUrl} target="_blank" rel="noopener noreferrer">{directionsUrl}</a></p>
      <p>Weather Info: {weatherInfo}</p>
      <p>Name: {name}</p>
      <p>Designation: {designation}</p>

      {/* Display images if available */}
      {images && images.length > 0 && (
        <div className="image-gallery">
          {images.map((image, index) => (
            <img key={index} src={image.url} alt={`Park Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;