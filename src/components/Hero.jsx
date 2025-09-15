import React from "react";
import hero from "../assets/Focus-WTV.png";

const Hero = () => {
  return (
    <div className="relative shadow-2xl">
      <img src={hero} alt={"image"} className=" w-full sm:h-24 md:h-80 lg:h-96 xl:h-full object-fit" />
    </div>
  );
};

export default Hero;
