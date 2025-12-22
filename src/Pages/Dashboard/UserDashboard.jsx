import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ["stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/order/state?userEmail=${user.email}`
      );
      return res.data;
    },
  });
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">User Dashboard</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat._id}
              className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 hover:scale-105 transform transition duration-300"
            >
              <div className="stat-figure text-4xl text-primary mb-2">
                
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

export default UserDashboard;
