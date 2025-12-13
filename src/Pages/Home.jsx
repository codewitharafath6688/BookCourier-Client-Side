import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="w-250 mx-auto mt-5 rounded-2xl">
      <Carousel autoPlay infiniteLoop className="h-75 rounded-2xl">
        <div
          className="h-125 bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/My9L8nYc/image.png)",
          }}
        >
          <div className="bg-black/60 rounded-2xl w-full h-full flex flex-col gap-5 justify-center items-center">
            <p className="text-3xl drop-shadow-lg font-bold  text-white">
              “A room without books is like a body without a soul.” <br /> —
              Marcus Tullius Cicero
            </p>
            <Link to="/all-books" className="btn">See All Books</Link>
          </div>
        </div>
        <div
          className="h-125 bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/nMPJ3BDz/image.png)",
          }}
        >
          <div className="bg-black/60 flex-col gap-5 rounded-2xl w-full h-full flex justify-center items-center">
            <p className="text-3xl rounded-2xl drop-shadow-lg font-bold  text-white">
              “Once you learn to read, you will be forever free.” <br /> —
              Frederick Douglass
            </p>
            <Link to="/all-books" className="btn">See All Books</Link>
          </div>
        </div>
        <div
          className="h-125 bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/pB0Hrs8z/image.png)",
          }}
        >
          <div className="bg-black/60 flex-col gap-5 rounded-2xl w-full h-full flex justify-center items-center">
            <p className="text-3xl rounded-2xl drop-shadow-lg font-bold  text-white">
              “There is no friend as loyal as a book.” <br /> — Ernest Hemingway
            </p>
            <Link to="/all-books" className="btn">See All Books</Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
