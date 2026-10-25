// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Slider from "./Slider";

const Banner = ({ books }) => {
  return (
    <div className="p-6 shadow-2xl rounded-xl">
      <Swiper
        loop={true}
        spaceBetween={20}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 20,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        breakpoints={{
          640: {
            slidesPerView: 2, // medium screens
          },
          1024: {
            slidesPerView: 3, // large screens
          },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <Slider book={book}></Slider>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
