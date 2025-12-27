import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TiCancelOutline } from "react-icons/ti";
import { VscLayersActive } from "react-icons/vsc";
import { FaBook } from "react-icons/fa";

const LibrarianDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarian/order/state");
      return res.data;
    },
  });

   const { orderStat = [], bookStat = [] } = data || {};

  // Ensure all possible states exist even if count = 0
  const allOrderStates = [
    { _id: "deleted", label: "Librarian Remove Orders", icon: <TiCancelOutline /> },
    // { _id: "", label: "Active Orders", icon: <VscLayersActive /> },
  ];

  const fixedStats = allOrderStates.map((state) => {
    const found = orderStat.find((s) => s._id === state._id);
    return { ...state, count: found ? found.count : 0 };
  });

  const allBookStates = [
    { label: "Published Books", icon: <FaBook /> },
    { label: "Unpublished Books", icon: <FaBook /> },
  ];

   const fixedBookStats = allBookStates.map((state) => {
    const found = bookStat.find((s) => s.label === state.label);
    return { ...state, count: found ? found.count : 0 };
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Librarian Dashboard
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Orders Stats */}
        <h3 className="text-xl font-semibold mb-4">Order Stats</h3>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {fixedStats.map((stat) => (
            <div
              key={stat._id || stat.label}
              className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 hover:scale-105 transform transition duration-300"
            >
              <div className="stat-figure text-4xl text-primary mb-2">{stat.icon}</div>
              <div className="stat-title text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
              <div className="stat-value text-2xl md:text-3xl font-bold">{stat.count}</div>
              <div className="stat-desc text-green-500 dark:text-green-400 text-sm">Running...</div>
            </div>
          ))}
        </div>

        {/* Book Stats */}
        <h3 className="text-xl font-semibold mb-4">Book Stats</h3>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fixedBookStats.map((stat) => (
            <div
              key={stat.label}
              className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 hover:scale-105 transform transition duration-300"
            >
              <div className="stat-figure text-4xl text-primary mb-2">{stat.icon}</div>
              <div className="stat-title text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
              <div className="stat-value text-2xl md:text-3xl font-bold">{stat.count}</div>
              <div className="stat-desc text-green-500 dark:text-green-400 text-sm">Running...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
