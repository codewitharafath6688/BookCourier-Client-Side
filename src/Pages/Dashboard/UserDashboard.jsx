import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { TiCancelOutline } from "react-icons/ti";
import { VscLayersActive } from "react-icons/vsc";
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

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["user-dashboard-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/order/state?userEmail=${user.email}`
      );
      return res.data;
    },
  });

  const allStates = [
    {
      _id: "deleted",
      label: "User Deleted Orders",
      icon: <TiCancelOutline />,
    },
    {
      _id: "",
      label: "Show Orders (Cancel / Active)",
      icon: <VscLayersActive />,
    },
  ];

  const fixedStats = allStates.map((state) => {
    const found = stats.find((s) => s._id === state._id);
    return { ...state, count: found ? found.count : 0 };
  });

  const chartData = fixedStats.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const COLORS = ["#ef4444", "#6366f1", "#22c55e", "#f59e0b"];

  if (isLoading) {
    return (
      <div className="w-full min-h-screen overflow-y-auto bg-slate-900 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
            User Dashboard
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
          User Dashboard
        </h2>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

        <div className="mt-10">
          <p className="text-white text-lg font-semibold mb-4">Analytics Overview</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              User Order Status Bar Chart
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
              User Order Status Pie Chart
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

export default UserDashboard;