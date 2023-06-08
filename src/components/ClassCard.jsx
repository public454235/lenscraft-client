import { useState } from "react";
import useTheme from "../hooks/useTheme";

const ClassCard = ({ content }) => {
  const { theme } = useTheme();
  const { name, image, price, instructor, availableSeats } = content;
  const [hovered, setHovered] = useState(false);
  console.log(hovered);
  return (
    <div
      className={`w-full rounded-md overflow-hidden ${
        availableSeats
          ? "bg-base-200"
          : theme === "dark"
          ? "bg-red-950"
          : "bg-red-100"
      }`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className="relative w-full aspect-[1.4/1] overflow-hidden">
        <img
          src={image}
          alt=""
          className={`w-full h-full object-cover object-center duration-700 ${
            hovered ? "scale-125" : "scale-100"
          }`}
        />
        <div className="py-3 px-5 bg-base-200/90 rounded-s-2xl absolute top-3 right-0 z-20">
          <h3 className="font-semibold gradient-text">$ {price}</h3>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-base-200/70 z-10 duration-300 text-center grid place-content-center ${
            hovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div
            className={`duration-200 delay-300 ${
              hovered ? "translate-x-0" : "-translate-x-[200%]"
            }`}
          >
            <div
              className={`w-fit py-2 px-4 rounded-full mb-4 ${
                availableSeats ? "bg-base-200/90" : "bg-red-500"
              }`}
            >
              <p className="font-semibold text-lg text-neutral">
                {availableSeats
                  ? `Available Seats: ${availableSeats}`
                  : "No seats available"}
              </p>
            </div>
            <button
              disabled={!availableSeats}
              className="btn btn-gradient border-none rounded-full normal-case disabled:opacity-0"
            >
              Select this class
            </button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-neutral text-xl font-bold mb-2">{name}</h2>
        <p>Instructor: {instructor?.name}</p>
      </div>
    </div>
  );
};

export default ClassCard;
