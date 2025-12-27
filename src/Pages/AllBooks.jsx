import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AllBooks = () => {
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["books", "published", sort, order, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/books?sort=${sort}&order=${order}&search=${search}`
      );
      return res.data;
    },
  });
  const handleSort = (e) => {
    console.log(e.target.value);
    const sortText = e.target.value;
    setSort(sortText.split("-")[0]);
    setOrder(sortText.split("-")[1]);
    console.log(sort, order);
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value.trim());
  };
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-6 lg:grid lg:grid-cols-3 lg:items-center">
        {/* Left: Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center lg:text-left">
          All Books ({books.length})
        </h2>

        {/* Center: Search */}
        <div className="flex justify-center">
          <label className="input input-bordered flex items-center gap-2 w-full sm:w-72">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input
              onChange={handleSearch}
              type="search"
              className="grow"
              placeholder="Search Books"
            />
          </label>
        </div>

        {/* Right: Sort */}
        <div className="flex justify-center lg:justify-end">
          <select
            defaultValue=""
            onChange={handleSort}
            className="select select-bordered bg-[#1d232a] text-white w-full sm:w-56"
          >
            <option value="" disabled>
              Select Your Sort
            </option>
            <option value="price-desc">Price : High - Low</option>
            <option value="price-asc">Price : Low - High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 text-white sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default AllBooks;
