import { useEffect, useState } from "react";

export default function LiveChart({ rate }) {
  const [points, setPoints] = useState([rate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => [
        ...prev.slice(-20),
        rate + (Math.random() - 0.5) * 2,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [rate]);

  return (
    <div className="bg-gradient-to-br from-black/60 to-black/40 p-6 rounded-2xl border border-cyan-500/20">
      <h3 className="text-cyan-400 font-semibold mb-4">
        Live Price Chart
      </h3>

      <div className="flex items-end gap-1 h-40">
        {points.map((p, i) => (
          <div
            key={i}
            className="bg-cyan-500/70 w-2 rounded-t"
            style={{ height: `${p}px` }}
          />
        ))}
      </div>
    </div>
  );
}
