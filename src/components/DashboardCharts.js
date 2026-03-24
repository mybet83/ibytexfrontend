import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";


const data = [
  { name: "Mon", value: 1200 },
  { name: "Tue", value: 2100 },
  { name: "Wed", value: 1800 },
  { name: "Thu", value: 2800 },
  { name: "Fri", value: 2400 },
  { name: "Sat", value: 3000 },
];

const pieData = [
  { name: "Income", value: 400 },
  { name: "Expense", value: 300 },
];

const COLORS = ["#22c55e", "#ef4444"];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6 max-md:grid-cols-1">


      
      {/* LINE CHART */}
      <div className="bg-[#191D23] border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <h3 className="text-gray-300 mb-3">Income Analytics</h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#666" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DONUT CHART */}
      <div className="bg-[#191D23] border border-white/10 rounded-2xl p-4 backdrop-blur-xl flex flex-col items-center justify-center">
        <h3 className="text-gray-300 mb-3">Spending</h3>

        <PieChart width={200} height={200}>
          <Pie
            data={pieData}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}