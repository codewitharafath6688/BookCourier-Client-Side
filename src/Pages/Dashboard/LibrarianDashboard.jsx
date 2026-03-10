import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TiCancelOutline } from "react-icons/ti";
import { FaBook } from "react-icons/fa";
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

const LibrarianDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarian/order/state");
      return res.data;
    },
  });

  const { orderStat = [], bookStat = [] } = data || {};

  const allOrderStates = [
    { _id: "deleted", label: "Librarian Remove Orders", icon: <TiCancelOutline /> },
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

  const orderChartData = fixedStats.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const bookChartData = fixedBookStats.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const ORDER_COLORS = ["#ef4444", "#6366f1", "#22c55e", "#f59e0b"];
  const BOOK_COLORS = ["#22c55e", "#f59e0b"];

  if (isLoading) {
    return (
      <div className="w-full min-h-screen overflow-y-auto bg-slate-900 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
            Librarian Dashboard
          </h2>
          <p className="text-center text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto bg-slate-900 px-4 py-6 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
          Librarian Dashboard
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-white">Order Stats</h3>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {fixedStats.map((stat) => (
            <div
              key={stat._id || stat.label}
              className="bg-gray-900 dark:bg-gray-800 text-white shadow-lg rounded-xl p-4 hover:scale-105 transform transition duration-300"
            >
              <div className="text-4xl text-indigo-400 mb-2">{stat.icon}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-bold mt-2">{stat.count}</div>
              <div className="text-green-400 text-sm mt-1">Live stats</div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4 text-white">Book Stats</h3>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {fixedBookStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 dark:bg-gray-800 text-white shadow-lg rounded-xl p-4 hover:scale-105 transform transition duration-300"
            >
              <div className="text-4xl text-indigo-400 mb-2">{stat.icon}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-bold mt-2">{stat.count}</div>
              <div className="text-green-400 text-sm mt-1">Live stats</div>
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
                <BarChart data={orderChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {orderChartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={ORDER_COLORS[index % ORDER_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Book Status Pie Chart
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {bookChartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={BOOK_COLORS[index % BOOK_COLORS.length]}
                      />
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

export default LibrarianDashboard;