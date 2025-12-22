import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import LatestBooks from "../Layout/LatestBooks";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto my-9 px-4">
  {/* Carousel */}
  <div className="w-full rounded-2xl overflow-hidden">
    <Carousel autoPlay interval={2200} infiniteLoop className="rounded-2xl">
      {[{
        image: "https://i.ibb.co.com/My9L8nYc/image.png",
        quote: "“A room without books is like a body without a soul.” — Marcus Tullius Cicero"
      },{
        image: "https://i.ibb.co.com/nMPJ3BDz/image.png",
        quote: "“Once you learn to read, you will be forever free.” — Frederick Douglass"
      },{
        image: "https://i.ibb.co.com/pB0Hrs8z/image.png",
        quote: "“There is no friend as loyal as a book.” — Ernest Hemingway"
      }].map((item, idx) => (
        <div
          key={idx}
          className="relative w-full h-64 sm:h-96 lg:h-[28rem] bg-center bg-cover"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-4 text-center">
            <p className="text-white font-bold text-lg sm:text-2xl md:text-3xl drop-shadow-lg mb-4">
              {item.quote}
            </p>
            <Link to="/all-books" className="btn btn-primary">
              See All Books
            </Link>
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
  <div className="mt-12 text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">📚 Why BookCourier Is the Smart Choice?</h2>
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Text */}
      <div className="flex-1 text-left text-sm sm:text-base md:text-lg">
        <p>
          At BookCourier, we believe books deserve more than just delivery — they deserve care, speed, and trust. That’s why we go beyond ordinary courier services to ensure every book reaches you safely, on time, and in perfect condition. From careful packaging to reliable doorstep delivery, we treat each order like a story worth protecting. With affordable pricing, dependable service, and a passion for readers, BookCourier turns book buying into a smooth, worry-free experience—so you can focus on what truly matters: reading.
        </p>
      </div>
      {/* Image */}
      <div className="flex-1 w-full max-w-lg h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src="https://i.ibb.co.com/FbL6wwNJ/image.png"
          alt="BookCourier Service"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default Home;
