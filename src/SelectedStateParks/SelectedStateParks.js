import React from "react";
import PropTypes from 'prop-types';
import Card from "../Card/Card";
import "./SelectedStateParks.css";

function SelectedStateParks({ parks, selectedState, fetchParkDetails }) {
  if (!parks || parks.length === 0) {
    return <div>No parks available.</div>;
  }

  const filteredState = parks.filter(
    (results) => results.states === selectedState
  );

  if (!filteredState || filteredState.length === 0) {
    return <div>No parks match the selected state.</div>;
  }

// This variable used for random index of park.images
// const randomIndex = Math.floor(Math.random() * 2); 
  return (
    <div className="card-grid">
      {filteredState.map((park) => {
        const randomImage =
          park.images[Math.floor(Math.random())];

        return (
          <Card
            className="card"
            key={park.id}
            states={park.states}
            fullName={park.fullName}
            images={randomImage}
            weatherInfo={park.weatherInfo}
            fetchParkDetails={() => fetchParkDetails(park.id)}
          />
        );
      })}
    </div>
  );
}

export default SelectedStateParks;


SelectedStateParks.propTypes = {
    parks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        states: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          })
        ).isRequired,
        weatherInfo: PropTypes.string.isRequired,
      })
    ).isRequired,
    selectedState: PropTypes.string.isRequired,
  };
  
