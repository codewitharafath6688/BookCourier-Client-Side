import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [], refetch } = useQuery({
    queryKey: ["books", "published"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books`);
      return res.data;
    },
  });
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Books ({books.length})</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="card bg-[#110a0b] shadow-md hover:shadow-lg transition"
          >
            {/* Image full width, same height */}
            <figure className="overflow-hidden rounded-t-xl">
              <img
                src={book.bookImageUrl}
                alt={book.bookName}
                className="w-full h-64 object-cover"
              />
            </figure>

            {/* Info */}
            <div className="card-body p-4">
              <h2 className="card-title text-base">{book.bookName}</h2>
              <p className="font-semibold text-primary">Price: ${book.price}</p>
              <div className="card-actions justify-end">
                <Link to={`/view-details/${book._id}`} className="btn btn-primary btn-sm">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
