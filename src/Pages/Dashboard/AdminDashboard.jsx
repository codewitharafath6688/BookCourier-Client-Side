import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlinePending, MdWheelchairPickup } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TbCreditCardRefund } from "react-icons/tb";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/order/state");
      return res.data;
    },
  });
  return (
    <div className="max-w-7xl mx-auto px-4 text-white sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6 mt-3">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat._id}
            className="stat bg-white dark:bg-gray-800 shadow rounded-xl p-4 hover:scale-105 transform transition duration-300"
          >
            <div className="stat-figure text-4xl text-secondary mb-2">
              {stat._id === "pending" && <MdOutlinePending />}
              {stat._id === "delivered" && <AiOutlineDeliveredProcedure />}
              {stat._id === "cancelled (refund)" && <TbCreditCardRefund />}
              {stat._id === "awaiting_pickup" && <MdWheelchairPickup />}
            </div>
            <div className="stat-title text-gray-500 dark:text-gray-400">
              {stat._id}
            </div>
            <div className="stat-value text-2xl md:text-3xl font-bold">
              {stat.count}
            </div>
            <div className="stat-desc text-green-500 dark:text-green-400">
              Running...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
