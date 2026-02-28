import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [] } = useQuery({
    queryKey: ["books", "published"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  return (
    <section className="mt-14 px-4">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
  Latest Books
</h2>
<div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Discover our most recently added books
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.slice(0, 6).map((book) => (
          <div
            key={book._id}
            className="
              group bg-white/70 dark:bg-[#110a0b]/30
              rounded-2xl overflow-hidden
              border border-gray-200 dark:border-white/10
              transition-all duration-300
              hover:shadow-xl
              flex flex-col
            "
          >
            {/* Image */}
            <figure className="relative w-full h-60 overflow-hidden">
              <img
                src={book.bookImageUrl}
                alt={book.bookName}
                className="
                  w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
            </figure>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-semibold  text-base-content line-clamp-2">
                {book.bookName}
              </h3>

              <p className="mt-2 text-primary font-semibold">${book.price}</p>

              <div className="mt-auto flex justify-end pt-4">
                <Link
                  to={`/view-details/${book._id}`}
                  className="btn btn-primary btn-sm rounded-full px-5"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;
