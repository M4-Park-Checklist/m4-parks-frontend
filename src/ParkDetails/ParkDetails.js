import React, { useState } from "react";
import PropTypes from "prop-types";
import NewCarousel from "../Carousel/Carousel";
import "./ParkDetails.css";
import Modal from "../Modal/Modal";
import WeatherModal from "../WeatherModal/WeatherModal";

function ParkDetails({ foundPark, weather }) {
  const [showModal, setShowModal] = useState(null);
  
  const toggleModal = (modalType) => {
    setShowModal(showModal === modalType ? null : modalType);
  };

  if (!foundPark || !weather || !weather.attributes.forecast) {
    return null; 
  }

  let parkMedia;
  if (foundPark.attributes.media && foundPark.attributes.media.length > 0) {
    parkMedia = foundPark.attributes.media;
  }

  return (
    <div className="park-details-container">
      <div className="park-details-title">
        <h2 className="single-title">{foundPark.attributes.name}</h2>
      </div>
      <section className="image-container">
        <NewCarousel parkMedia={parkMedia}/>
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
        <section
          className="park-details-activities"
          onClick={() => toggleModal("activities")}
        >
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
        <div className="park-details-weather" onClick={() => toggleModal("weather")}>
          <h1 className="single-weather">Weather</h1>
          <img
            className="weather-icon"
            src={foundPark.attributes.current_weather.icon}
            alt="Weather Icon"
          />
          <p>{foundPark.attributes.current_weather.condition}</p>
          <p>Temperature: {foundPark.attributes.current_weather.temperature} °F</p>
          <p>Feels Like: {foundPark.attributes.current_weather.feels_like} °F</p>
          <p>Humidity: {foundPark.attributes.current_weather.humidity}%</p>
        </div>
        <section
          className="park-details-amenities"
          onClick={() => toggleModal("amenities")}
        >
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
      {showModal === 'activities' && (
        <Modal
          isOpen={showModal === 'activities'}
          onClose={() => toggleModal('activities')}
          title="Activities"
          items={foundPark.attributes.things_to_do || []}
        />
      )}
      {showModal === 'amenities' && (
        <Modal
          isOpen={showModal === 'amenities'}
          onClose={() => toggleModal('amenities')}
          title="Amenities"
          items={foundPark.attributes.amenities || []}
        />
      )}
      {showModal === 'weather' && (
        <WeatherModal
        currentWeather={weather || []}
        isOpen={showModal === 'weather'}
        onClose={() => toggleModal('weather')} 
      />
      )}
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
  weather: PropTypes.shape({
    attributes: PropTypes.shape({
      id: PropTypes.string,
      forecast: PropTypes.array.isRequired
    }).isRequired,
    id: PropTypes.string,
    type: PropTypes.string.isRequired
  })
};
