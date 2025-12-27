import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Review = ({ promiseReview }) => {
  const reviews = use(promiseReview);
  console.log(reviews);
  return (
    <div className="px-4 my-10 md:px-10">
      <h2 className="text-2xl text-center md:text-3xl font-bold mb-6">
        Reviews
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1} 
        spaceBetween={20}
        coverflowEffect={{
          rotate: 30, 
          stretch: 0,
          depth: 100,
          modifier: 1,

          slideShadows: false, 
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        autoplay={{
          delay: 1000, 
          disableOnInteraction: false, 
        }}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
          1280: { slidesPerView: 3, spaceBetween: 50 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="flex justify-center">
            <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 flex flex-col gap-4">
              {/* Quote Icon */}
              <div className="text-green-200 text-5xl sm:text-6xl md:text-7xl">
                “
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {review.review}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                  <img
                    src={review.user_photoURL}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
                  {review.userName}
                </h4>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="rating rating-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      className="mask mask-star-2 bg-orange-400"
                      checked={star <= Math.round(review.ratings)}
                      readOnly
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs sm:text-sm md:text-base">
                  {review.ratings}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
