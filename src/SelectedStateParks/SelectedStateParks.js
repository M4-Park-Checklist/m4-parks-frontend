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

  return (
    <div className="card-grid">
      {filteredState.map((park) => {
        const randomImage =
          park.media[Math.floor(Math.random())];
        return (
          <Card
            className="card"
            id={park.id}
            key={park.id}
            states={park.states}
            fullName={park.name}
            images={randomImage}
            description={park.description}
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
  
