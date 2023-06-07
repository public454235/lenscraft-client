// import Swiper core and required modules
import { Autoplay, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import useTheme from "../../hooks/useTheme";

const TopSlider = ({ contents }) => {
  const { theme } = useTheme();

  return (
    <Swiper
      grabCursor
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 6000,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {contents.map((item) => (
        <SwiperSlide key={item._id}>
          <div className="container grid grid-cols-2 items-center h-[700px]">
            <div
              className={`w-4/5 mx-auto p-5 rounded-xl ${
                theme === "dark" ? "bg-white/10" : "bg-black/10"
              }`}
            >
              <img
                src={item.image}
                alt=""
                className="w-full aspect-square object-cover object-center"
              />
            </div>
            <div className="space-y-8">
              <h1 className="font-extrabold text-7xl py-1 leading-snug">
                {item.caption.split(" ").map((a, i) => (
                  <span key={i} className="gradient-text">
                    {a}{" "}
                  </span>
                ))}
              </h1>
              <p className="text-3xl pb-4">{item.description}</p>
              <button className="btn md:btn-lg btn-gradient rounded-full">
                Explore Classes
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopSlider;
