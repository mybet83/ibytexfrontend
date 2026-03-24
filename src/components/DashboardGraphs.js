import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const MiniCircle = ({ value, color, symbol, theme }) => {
  const max = value > 0 ? value * 1.1 : 100;
  const data = [{ value }];

  return (
    <div className="relative w-[90px] h-[90px]">
      <RadialBarChart
        width={90}
        height={90}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={8}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, max]}
          tick={false}
        />

        <RadialBar
          dataKey="value"
          cornerRadius={20}
          fill={color}
          background={{
            fill: theme === "dark" ? "#1f2937" : "#e5e7eb",
          }}
        />
      </RadialBarChart>

      {/* Center value */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {symbol}{value}
      </div>
    </div>
  );
};

export default function StatsWidget({
  availableBalance,
  lockedAmount,
  usdtTrade,
  theme
}) {
  return (
    <div
      className={`p-6 rounded-2xl flex justify-between items-center w-full mt-6  max-md:flex-col
      ${
        theme === "dark"
          ? "bg-[#191d23] text-white"
          : "bg-white text-black shadow-md"
      }`}
    >
      {/* LEFT TEXT */}
      <div>
        <h2
          className={`text-lg font-semibold mb-3 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Account Overview
        </h2>

        <div className="space-y-2 text-sm">
          <p className={`flex items-center gap-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-400 text-center"></span>
            Available Balance
          </p>

          <p className={`flex items-center gap-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Locked Withdrawn
          </p>

          <p className={`flex items-center gap-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            USDT Trade
          </p>
        </div>
      </div>

      {/* RIGHT CIRCLES */}
      <div className="flex gap-6">
        <MiniCircle
          value={availableBalance}
          color="#22c55e"
          symbol="₹"
          theme={theme}
        />

        <MiniCircle
          value={lockedAmount}
          color="#a855f7"
          symbol="₹"
          theme={theme}
        />

        <MiniCircle
          value={usdtTrade}
          color="#06b6d4"
          symbol="$"
          theme={theme}
        />
      </div>
    </div>
  );
}