import { Carousel } from "@material-tailwind/react";
 
export default function CarouselDefault({ parkImage }) {
  return (
    <Carousel className="rounded-xl">
      { parkImage }
    </Carousel>
  );
}