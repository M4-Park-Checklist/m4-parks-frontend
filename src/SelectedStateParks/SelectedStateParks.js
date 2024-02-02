import React from "react";
import Card from "../Card/Card";

function SelectedStateParks({ showResults, selectedState }) {
  const filteredState = showResults.filter(results => results.data.states === selectedState);

    return (
        <Card
            key={filteredState.id}
            park={filteredState}
        />
    )
}

export default SelectedStateParks;
