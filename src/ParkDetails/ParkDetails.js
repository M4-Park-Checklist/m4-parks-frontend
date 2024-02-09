import React from "react";
import PropTypes from "prop-types";
import "./ParkDetails.css";

function ParkDetails({ foundPark }) {
  if (!foundPark) {
    return null;
  }

  let parkImage;
  if (foundPark.attributes.media && foundPark.attributes.media.length > 1) {
    parkImage = (
      <img
        className="single-image"
        src={foundPark.attributes.media[1].url}
        alt={foundPark.attributes.media[1].altText}
      />
    );
  } else {
    parkImage = (
      <img
        className="single-image"
        src={foundPark.attributes.media[0].url}
        alt={foundPark.attributes.media[0].altText}
      />
    );
  }

  return (
    <div className="park-details-container">
      <div className="park-details-title">
        <h2 className="single-title">{foundPark.attributes.name}</h2>
      </div>
      <section className="image-container">{parkImage}</section>
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
          {foundPark.attributes.active_alerts[0] ? (
            <>
              <p>{foundPark.attributes.active_alerts[0]}</p>
              <p>{foundPark.attributes.active_alerts[1]}</p>
            </>
          ) : (
            <p>No Active Alerts at this Time</p>
          )}
        </div>
      </section>
      <section className="park-info">
        <section className="park-details-activities">
          <h1 className="single-activities">Activities</h1>
          {foundPark.attributes.things_to_do &&
          foundPark.attributes.things_to_do.length > 0 ? (
            foundPark.attributes.things_to_do
              .slice(0, 10)
              .map((activity, index) => (
                <p key={index}>{`${index + 1}. ${activity}`}</p>
              ))
          ) : (
            <p>No Information on Activities Available</p>
          )}
        </section>
        <div className="park-details-weather">
          <h1 className="single-weather">Weather</h1>
          <img
            className="weather-icon"
            src={foundPark.attributes.current_weather.icon}
            alt="Weather Icon"
          />
          <p>{foundPark.attributes.current_weather.condition}</p>
          <p>
            Temperature: {foundPark.attributes.current_weather.temperature} °F
          </p>
          <p>
            Feels Like: {foundPark.attributes.current_weather.feels_like} °F
          </p>
          <p>Humidity: {foundPark.attributes.current_weather.humidity}%</p>
        </div>
        <section className="park-details-amenities">
          <h3>Amenities</h3>
          {foundPark.attributes.amenities &&
          foundPark.attributes.amenities.length > 0 ? (
            foundPark.attributes.amenities
              .slice(0, 10)
              .map((amenity, index) => (
                <p key={index}>{`${index + 1}. ${amenity}`}</p>
              ))
          ) : (
            <p>No Information on Amenities Available</p>
          )}
        </section>
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
