// import Swiper core and required modules
import { Autoplay, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const TopSlider = ({ contents }) => {
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
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-fit lg:h-[650px] pt-8 lg:pt-0">
            <div className="w-full lg:w-4/5 mx-auto p-6 rounded-xl bg-neutral/5">
              <img
                src={item.image}
                alt=""
                className="w-full aspect-square object-cover object-center"
              />
            </div>
            <div className="space-y-8">
              <h1 className="font-extrabold text-5xl lg:text-6xl xl:text-7xl py-1 leading-snug">
                {item.caption.split(" ").map((a, i) => (
                  <span key={i} className="gradient-text">
                    {a}{" "}
                  </span>
                ))}
              </h1>
              <p className="text-lg sm:text-2xl lg:text-3xl pb-4">
                {item.description}
              </p>
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
