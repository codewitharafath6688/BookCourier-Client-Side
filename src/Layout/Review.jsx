import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Review = ({ promiseReview }) => {
  const reviews = use(promiseReview);

  return (
    <section className="px-4 my-20 md:px-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content">
          What Our Readers Say
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
      </div>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        autoplay={{
          delay: 3000, // slower & smoother
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="flex justify-center">
            <div
              className="
                  w-full max-w-md
    rounded-2xl
    bg-white/95 dark:bg-[#110a0b]/60
    border border-gray-200 dark:border-white/10
    shadow-sm hover:shadow-lg
    transition-all duration-300
    p-6 flex flex-col gap-5
              "
            >
              {/* Quote */}
              <div className="text-primary text-4xl font-bold leading-none">
                “
              </div>

              {/* Review Text */}
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {review.review}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                  <img
                    src={review.user_photoURL}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {review.userName}
                  </h4>

                  <div className="flex items-center gap-2 mt-1">
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

                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {review.ratings}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
