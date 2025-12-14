import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import LatestBooks from "../Layout/LatestBooks";

const Home = () => {
  return (
    <div className="w-250 mx-auto my-5 rounded-2xl">
      <div>
        <Carousel
          autoPlay
          interval={2200}
          infiniteLoop
          className="h-125 rounded-2xl"
        >
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
              <Link to="/all-books" className="btn">
                See All Books
              </Link>
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
              <Link to="/all-books" className="btn">
                See All Books
              </Link>
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
                “There is no friend as loyal as a book.” <br /> — Ernest
                Hemingway
              </p>
              <Link to="/all-books" className="btn">
                See All Books
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
      <LatestBooks></LatestBooks>
      <div className="mt-8 w-250">
        <h2 className="text-2xl font-bold text-center">📚 Why BookCourier Is the Smart Choice ?</h2>
        <div className="flex items-center gap-10 mt-5 broder-2 mx-auto">
          <div className="w-87.5">
            <p>
              At BookCourier, we believe books deserve more than just delivery — they deserve care, speed, and trust. That’s why we go beyond ordinary courier services to ensure every book reaches you safely, on time, and in perfect condition. From careful packaging to reliable doorstep delivery, we treat each order like a story worth protecting. With affordable pricing, dependable service, and a passion for readers, BookCourier turns book buying into a smooth, worry-free experience—so you can focus on what truly matters: reading.
            </p>
          </div>
          <div className=" w-165 h-75 rounded-2xl">
            <img className="w-full h-full rounded-2xl" src="https://i.ibb.co.com/FbL6wwNJ/image.png"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
