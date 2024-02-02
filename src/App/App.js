import React from 'react';
import ParkChecklist from '../ParkChecklist/ParkChecklist';
import "./App.css"

const App = () => {
  const apiLink = 'https://developer.nps.gov/api/v1/parks?api_key=jR5uonh1B6R19iLhdweq7nHBs0uGgKgwzqn3BNfb';

  return (
    <div>
      <ParkChecklist apiLink={apiLink} />
    </div>
  );
};

export default App;