import React from "react";
import PropTypes from "prop-types";
import "./ParkDetails.css";

function ParkDetails({ foundPark }) {
  if (!foundPark) {
    return null;
  }
  console.log(foundPark);
  return (
    <div className="park-details-container">
      <div className="park-details-title">
        <h2 className="single-title">{foundPark.attributes.name}</h2>
      </div>
      <section className="image-container">
        <img
          className="single-image"
          src={foundPark.attributes.media[1].url}
          alt={foundPark.attributes.media[0].altText}
        />
      </section>
      <section className="park-description">
        <div className="single-park-description">
          <h3>Park Info</h3>
          <p>{foundPark.attributes.designation}</p>
          <p>{foundPark.attributes.description}</p>
        </div>
      </section>
      <section className="active-alerts">
        <div className="single-park-alerts">
          <h3>Active Alerts</h3>
          <p>{foundPark.attributes.active_alerts[0]}</p>
          <p>{foundPark.attributes.active_alerts[1]}</p>
        </div>
      </section>
      <section className="park-info">
        <div className="park-details-activities">
          <h1 className="single-activities">Activities</h1>
          <p>1. {foundPark.attributes.things_to_do[0]}</p>
          <p>2. {foundPark.attributes.things_to_do[1]}</p>
          <p>3. {foundPark.attributes.things_to_do[2]}</p>
          <p>4. {foundPark.attributes.things_to_do[3]}</p>
          <p>5. {foundPark.attributes.things_to_do[4]}</p>
        </div>
        <div className="park-details-weather">
          <h1 className="single-weather">Weather</h1>
          <h3>Current Weather</h3>
          <p>{foundPark.attributes.current_weather.condition}</p>
          <p>
            Temperature: {foundPark.attributes.current_weather.temperature} °F
          </p>
          <p>
            Feels Like: {foundPark.attributes.current_weather.feels_like} °F
          </p>
          <p>Humidity: {foundPark.attributes.current_weather.humidity}%</p>
          {/* <img src={foundPark.attributes.current_weather.icon}/> */}
        </div>
        <div className="park-details-amenities">
          <h3>Amenities</h3>
          <p>1. {foundPark.attributes.amenities[0]}</p>
          <p>2. {foundPark.attributes.amenities[1]}</p>
          <p>3. {foundPark.attributes.amenities[2]}</p>
          <p>4. {foundPark.attributes.amenities[3]}</p>
          <p>5. {foundPark.attributes.amenities[4]}</p>
        </div>
      </section>
    </div>
  );
}

export default ParkDetails;

ParkDetails.propTypes = {
  foundPark: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      media: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          altText: PropTypes.string.isRequired,
        })
      ).isRequired,
      things_to_do: PropTypes.arrayOf(PropTypes.string).isRequired,
      current_weather: PropTypes.shape({
        condition: PropTypes.string.isRequired,
        temperature: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }),
};
