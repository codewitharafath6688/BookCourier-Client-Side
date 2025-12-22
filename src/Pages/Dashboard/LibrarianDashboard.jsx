import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TiCancelOutline } from "react-icons/ti";
import { VscLayersActive } from "react-icons/vsc";

const LibrarianDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryStatusStats = [] } = useQuery({
    queryKey: ["deliveryStatus-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarian/order/state");
      return res.data;
    },
  });
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Librarian Dashboard
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deliveryStatusStats.map((stat) => (
            <div
              key={stat._id}
              className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 hover:scale-105 transform transition duration-300"
            >
              <div className="stat-figure text-4xl text-primary mb-2">
                {stat._id === "deleted" && <TiCancelOutline />}
                {stat._id === "" && <VscLayersActive />}
              </div>
              <div className="stat-title text-gray-500 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
              <div className="stat-value text-2xl md:text-3xl font-bold">
                {stat.count}
              </div>
              <div className="stat-desc text-green-500 dark:text-green-400 text-sm">
                Running...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
