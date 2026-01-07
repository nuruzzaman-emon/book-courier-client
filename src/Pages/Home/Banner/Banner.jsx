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
    <div className="p-4">
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
          rotate: 45,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
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
