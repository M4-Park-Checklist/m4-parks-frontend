import React from "react";
import Card from "../Card/Card";
import "./SelectedStateParks.css"

function SelectedStateParks({ parks, selectedState }) {
  if (!parks || parks.length === 0) {
    return <div>No parks available.</div>;
  }

  const filteredState = parks.filter(
    (results) => results.states === selectedState
  );
  console.log(filteredState);
  if (!filteredState || filteredState.length === 0) {
    return <div>No parks match the selected state.</div>;
  }
  console.log(filteredState[0].states);

  return (
    <div className="card-grid">
      {filteredState.map((park) => (
        <Card
          className="card"
          key={park.id}
          states={park.states}
          fullName={park.fullName}
          images={park.images[Math.floor(Math.random() * park.images.length)]}
          weatherInfo={park.weatherInfo}
        />
      ))}
    </div>
  );
}

export default SelectedStateParks;
