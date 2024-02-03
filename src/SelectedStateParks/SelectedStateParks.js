import React from "react";
import Card from "../Card/Card";
import "./SelectedStateParks.css";

function SelectedStateParks({ parks, selectedState }) {
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
          />
        );
      })}
    </div>
  );
}

export default SelectedStateParks;
