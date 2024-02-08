import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./SelectedStateParks.css";

function SelectedStateParks({ parks, selectedState, fetchParkDetails }) {
  if (!parks || parks.length === 0) {
    return <div>No parks available.</div>;
  }

  const filteredState = parks.filter(
    (results) => results.attributes.states === selectedState
  );

  if (!filteredState || filteredState.length === 0) {
    return <div>No parks match the selected state.</div>;
  }

  return (
    <div className="card-grid">
      {filteredState.map((park) => {
        const randomImage = park.attributes.media[Math.floor(Math.random())];
        return (
          <Card
            className="card"
            id={park.attributes.park_code}
            key={park.attributes.park_code}
            states={park.attributes.states}
            fullName={park.attributes.name}
            images={randomImage}
            description={park.attributes.description}
            fetchParkDetails={() => fetchParkDetails(park.attributes.park_code)}
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
      attributes: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        states: PropTypes.string.isRequired,
        weatherInfo: PropTypes.string,
        media: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          })
        ).isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedState: PropTypes.string.isRequired,
};
