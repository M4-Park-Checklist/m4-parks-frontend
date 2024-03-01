import { Carousel } from "@material-tailwind/react";
import React from "react";
import './Carousel.css';
import PropTypes from "prop-types";

export default function NewCarousel({ parkMedia }) {
  let images = parkMedia.map((image, index) => (
    <img
      key={index}
      className="h-full w-full object-cover"
      src={image.url}
      alt={image.altText}
    />
  ));

  return (
    <div className="carousel-container"> 
      <Carousel className="rounded-xl">
        {images}
      </Carousel>
    </div>
  );
}

NewCarousel.propTypes = {
  parkMedia: PropTypes.arrayOf(PropTypes.shape({
    altText: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    credit: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired
}