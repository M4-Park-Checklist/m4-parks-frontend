import React from 'react';
import PropTypes from "prop-types";
import Card from "../Card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SelectedStateParks.css";

function SelectedStateParks({ apiLink, parks, selectedState, setFoundPark, setParkCode, weatherLink, setWeather }) {
  const navigate = useNavigate();
  const fetchParkDetails = async (park_code) => {
    try {
      const response = await axios.get(`${apiLink}/${park_code}`);
      const selectedPark = response.data.data;
      const weatherResponse = await axios.get(`${weatherLink.replace(':id', park_code)}`);
      const weatherData = weatherResponse.data.data;
      
      if (selectedPark && weatherData)  {
        setParkCode(selectedPark.attributes.park_code);
        setFoundPark(selectedPark);
        setWeather(weatherData);

      } else {
        console.error(`Park with id ${park_code} not found.`);
      }
      navigate(`/Parks/${selectedState}/${park_code}`);
    } catch (error) {
      console.error("Error fetching park details:", error);
    } finally {
    }
  };

  const filteredState = parks.filter(
    (results) => results.attributes.states === selectedState
  );

  if (!filteredState || filteredState.length === 0) {
    return <div className="no-state">No Parks are Available for this State</div>;
  }
  
  if (!parks || parks.length === 0) {
    return <h3>No parks available.</h3>;
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
  apiLink: PropTypes.string.isRequired,
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
  setFoundPark: PropTypes.func.isRequired,
  setParkCode: PropTypes.func.isRequired,
  weatherLink: PropTypes.string.isRequired,
  setWeather: PropTypes.func.isRequired
};
