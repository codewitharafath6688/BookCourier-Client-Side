import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["books", "published"],
    queryFn: async () => {
      const res = await axiosSecure.get('/books');
      return res.data;
    },
  });
  return (
    <div className="mt-10 text-white flex flex-col items-center gap-8 px-4">
      <h2 className="text-2xl font-bold text-center">Latest Books</h2>

      {/* Responsive grid: 1 column mobile, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {books.slice(0, 6).map((book) => (
          <div
            key={book._id}
            className="bg-[#110a0b] shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <figure className="w-full h-64 overflow-hidden">
              <img
                src={book.bookImageUrl}
                alt={book.bookName}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Info */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h2 className="text-base font-semibold line-clamp-2">
                {book.bookName}
              </h2>
              <p className="mt-2 font-semibold text-primary">
                Price: ${book.price}
              </p>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/view-details/${book._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
