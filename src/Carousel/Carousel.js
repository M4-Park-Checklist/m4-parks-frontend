import { Carousel } from "@material-tailwind/react";
import React from "react";
import './Carousel.css'

export default function NewCarousel({ parkMedia }) {
  console.log(parkMedia);
  let images = parkMedia.map((image, index) => (
    <img
      key={index}
      className="h-full w-full object-cover"
      src={image.url}
      alt={image.altText}
    />
  ));
  console.log(images);
  return (
    <div className="carousel-container"> 
      <Carousel className="rounded-xl">
        {images}
      </Carousel>
    </div>
  );
}