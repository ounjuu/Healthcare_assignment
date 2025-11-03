"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HeartRateChartProps {
  chartData: { name: string; prev: number; current: number }[];
  avg: number;
}

const HeartRateChart: React.FC<HeartRateChartProps> = ({ chartData, avg }) => {
  return (
    <div>
      <div className="col-span-2 mt-4 relative">
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
            <Tooltip />
            <Line
              type="linear"
              dataKey="prev"
              stroke="#3B82F6"
              strokeWidth={4}
              strokeLinecap="round"
              dot={false}
              name="직전"
            />
            <Line
              type="linear"
              dataKey="current"
              stroke="#FF0000"
              strokeWidth={4}
              strokeLinecap="round"
              dot={false}
              name="현재"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* 평균 bpm */}
        <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 text-center font-semibold flex flex-col items-center justify-center gap-2">
          <span className="text-lg">평균</span>
          <div className="flex items-center justify-center gap-2">
            <img src="/heart.png" className="w-10 h-10" alt="heart" />
            <span className="text-[55px] leading-none">{avg.toFixed(0)}</span>
            <span className="text-[30px] leading-none">bpm</span>
          </div>
        </div>
      </div>
      {/* 안내 문구 1 */}
      <div className="text-center mt-4 space-y-2 font-semibold text-[15px]">
        <p>심박수는 1분 동안 심장이 뛰는 횟수를 의미해요.</p>
        <p>일반적으로 성인은 60-100 BPM이 정상 범위에요.</p>
        <p>
          심박수가 너무 높거나 낮으면 건강 문제의 신호일 수 있어 주의가
          필요해요.
        </p>
      </div>
    </div>
  );
};

export default HeartRateChart;
