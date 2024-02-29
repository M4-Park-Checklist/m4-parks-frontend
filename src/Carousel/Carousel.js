import { Carousel } from "@material-tailwind/react";
import React from "react";
 
export default function NewCarousel({ parkMedia }) {
  console.log(parkMedia)
  let images = parkMedia.map(image => {
      <img
        className="h-full w-full object-cover"
        src={image.url}
        alt={image.altText}
      />
   })
   console.log(images)
  return (
    <Carousel className="rounded-xl">
      <img 
        className="h-full w-full object-cover"
        src={parkMedia[1].url}
        alt={parkMedia[1].altText}
      />


    </Carousel>
  );
}