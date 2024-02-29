import { Carousel } from "@material-tailwind/react";
import React from "react";
export default function NewCarousel({ parkMedia }) {
  console.log(parkMedia);
  let images = parkMedia.map((image, index) => (
    <img
      key={index} // Don't forget to add a unique key for each image in a list
      className="h-full w-full object-cover"
      src={image.url}
      alt={image.altText}
    />
  ));
  console.log(images);
  return (
    <Carousel className="rounded-xl">
      {images}
    </Carousel>
  );
}