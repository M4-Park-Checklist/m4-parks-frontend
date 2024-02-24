import React from "react";
import PropTypes from "prop-types";
import "./WeatherModal.css";

function WeatherModal({ currentWeather, isOpen, onClose }) {
    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`} onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>7 Day Weather Forecast</h2>
                <div className="weather-grid">
                    {currentWeather.map((day, index) => (
                        <div key={index} className="weather-day">
                            <h3>{day.day}</h3>
                            <img
                                className="weather-icon"
                                src={day.icon}
                                alt="Weather Icon"
                            />
                            <p>{day.condition}</p>
                            <p>Temperature: {day.temperature} °F</p>
                            <p>Feels Like: {day.feels_like} °F</p>
                            <p>Humidity: {day.humidity}%</p>
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
