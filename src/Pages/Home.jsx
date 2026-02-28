import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import LatestBooks from "../Layout/LatestBooks";
import Review from "../Layout/Review";

const promiseReview = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto my-9 px-4">
      {/* Carousel */}
      <div className="w-full overflow-hidden rounded-2xl">
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          swipeable
          emulateTouch
          className="w-full"
        >
          {[
            {
              image: "https://i.ibb.co.com/My9L8nYc/image.png",
              quote: "“A room without books is like a body without a soul.”",
              author: "Marcus Tullius Cicero",
            },
            {
              image: "https://i.ibb.co.com/nMPJ3BDz/image.png",
              quote: "“Once you learn to read, you will be forever free.”",
              author: "Frederick Douglass",
            },
            {
              image: "https://i.ibb.co.com/pB0Hrs8z/image.png",
              quote: "“There is no friend as loyal as a book.”",
              author: "Ernest Hemingway",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative w-full h-[14rem] sm:h-[18rem] lg:h-[22rem]"
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/65 flex items-center justify-center text-center px-6">
                <div className="max-w-3xl space-y-3">
                  <p className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold leading-snug">
                    {item.quote}
                  </p>

                  <p className="text-gray-300 text-sm italic">
                    — {item.author}
                  </p>

                  <Link
                    to="/all-books"
                    className="btn btn-primary btn-sm sm:btn-md mt-3 rounded-full px-6"
                  >
                    Explore Books
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Latest Books */}
      <div className="mt-10">
        <LatestBooks />
      </div>

      {/* Why BookCourier */}
      <section className="mt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Why BookCourier Is the Smart Choice?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div
              className="space-y-6
  text-base-content
  text-sm sm:text-base md:text-lg
  leading-relaxed"
            >
              <p>
                At BookCourier, we believe books deserve more than just delivery
                — they deserve care, speed, and trust. That’s why we go beyond
                ordinary courier services to ensure every book reaches you
                safely, on time, and in perfect condition.
              </p>

              <p>
                From careful packaging to reliable doorstep delivery, we treat
                each order like a story worth protecting. With affordable
                pricing, dependable service, and a passion for readers,
                BookCourier turns book buying into a smooth, worry-free
                experience.
              </p>

              <p className="font-medium text-base-content">
                So you can focus on what truly matters — reading.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://i.ibb.co.com/FbL6wwNJ/image.png"
                  alt="BookCourier Service"
                  className="w-full h-[18rem] sm:h-[22rem] lg:h-[26rem] object-cover"
                />
              </div>

              {/* subtle accent glow */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>
      <Review promiseReview={promiseReview}></Review>
    </div>
  );
};

export default Home;
