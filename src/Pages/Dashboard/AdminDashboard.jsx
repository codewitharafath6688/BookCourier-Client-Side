import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlinePending, MdWheelchairPickup } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TbCreditCardRefund } from "react-icons/tb";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["admin-order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/order/state");
      return res.data;
    },
  });

  const allStates = [
    { _id: "pending", icon: <MdOutlinePending />, title: "Pending" },
    { _id: "delivered", icon: <AiOutlineDeliveredProcedure />, title: "Delivered" },
    { _id: "cancelled (refund)", icon: <TbCreditCardRefund />, title: "Cancelled (Refund)" },
    { _id: "awaiting_pickup", icon: <MdWheelchairPickup />, title: "Awaiting Pickup" },
  ];

  const fixedStats = allStates.map((state) => {
    const found = stats.find((s) => s._id === state._id);
    return {
      ...state,
      count: found ? found.count : 0,
    };
  });

  const chartData = fixedStats.map((item) => ({
    name: item.title,
    value: item.count,
  }));

  const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b"];

  if (isLoading) {
    return (
      <div className="w-full min-h-screen overflow-y-auto bg-slate-900 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center font-bold mt-5 mb-9 text-white">
            Admin Dashboard
          </h2>
          <p className="text-center text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto bg-slate-900 px-4 py-6 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-center font-bold mt-5 mb-9 text-white">
          Admin Dashboard
        </h2>

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
              <div className="mt-2 text-sm text-green-400">Live stats</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-white text-lg font-semibold mb-4">Analytics Overview</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Order Status Bar Chart
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Order Status Pie Chart
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;