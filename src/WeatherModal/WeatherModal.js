import React from "react";
import PropTypes from "prop-types";
import "./WeatherModal.css";

function WeatherModal({ currentWeather, isOpen, onClose }) {
    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    console.log(currentWeather.attributes.forecast[1])
    const forecast = currentWeather.attributes.forecast;

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`} onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>3 Day Weather Forecast</h2>
                <div className="weather-grid">
                    {forecast.map((day, index) => (
                        <div key={index} className="weather-day">
                            <img
                                className="weather-icon"
                                src={day.icon}
                                alt="Weather Icon"
                                />
                            <h3>Date: {day.date}</h3>
                            <p>{day.condition}</p>
                            <p>Max Temp: {day.max_temp} °F</p>
                            <p>Min Temp: {day.min_temp} °F</p>
                            <p>Sunrise: {day.sunrise}</p>
                            <p>Sunset: {day.sunset}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

WeatherModal.propTypes = {
    currentWeather: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            condition: PropTypes.string.isRequired,
            temperature: PropTypes.number.isRequired,
            feels_like: PropTypes.number.isRequired,
            humidity: PropTypes.number.isRequired,
        })
    ).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default WeatherModal;
