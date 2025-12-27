import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlinePending, MdWheelchairPickup } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TbCreditCardRefund } from "react-icons/tb";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch stats
  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/order/state");
      return res.data;
    },
  });

  // Ensure all states are present, even if count = 0
  const allStates = [
    { _id: "pending", icon: <MdOutlinePending />, title: "Pending" },
    { _id: "delivered", icon: <AiOutlineDeliveredProcedure />, title: "Delivered" },
    { _id: "cancelled (refund)", icon: <TbCreditCardRefund />, title: "Cancelled (Refund)" },
    { _id: "awaiting_pickup", icon: <MdWheelchairPickup />, title: "Awaiting Pickup" },
  ];

  const fixedStats = allStates.map(state => {
    const found = stats.find(s => s._id === state._id);
    return { ...state, count: found ? found.count : 0 };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold mt-5 mb-9">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fixedStats.map((stat) => (
          <div
            key={stat._id}
            className="bg-gray-900 dark:bg-gray-800 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl text-indigo-400">{stat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">{stat.title}</h3>
                <p className="text-gray-400 text-sm">Orders</p>
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold text-white">{stat.count}</div>
            <div className="mt-2 text-sm text-green-400">Running...</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
