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
import { useSessionResult } from "../../hooks/useSessionResult"; // ✅ React Query 훅 import

const HeartRateChange: React.FC = () => {
  const { data, isLoading, isError, refetch } = useSessionResult();

  if (isLoading)
    return (
      <div className="text-center mt-10 text-gray-600">
        심박수 변화를 불러오는 중...
      </div>
    );

  if (isError || !data)
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          재시도
        </button>
      </div>
    );

  const { previousRPPG, currentRPPG } = data;

  return (
    <div
      className="bg-white rounded w-full flex flex-col border border-[#6B6B6B]
             rounded-[30px] pt-[30px] pr-[50px] pb-[50px] pl-[30px] gap-[30px] mt-[50px]"
    >
      {/* 제목 + 설명 */}
      <div className="flex items-center mb-4">
        <p className="font-bold text-[25px] mr-3">심박수 변화</p>
        <p className="font-semibold text-[#6B6B6B] text-sm">
          직전과 현재 심박수 추이를 비교해요.
        </p>
      </div>

      {/* 점 + 선 + 텍스트 */}
      <div
        className="flex items-center justify-center gap-6 border border-[#6B6B6B]
             rounded-[10px] p-[10px] w-[150px]"
      >
        {/* 점 + 선 컨테이너 */}
        <div className="relative flex flex-col items-center h-[150px] justify-between">
          {/* 세로선 */}
          <div className="absolute top-0 bottom-0 w-[3px] bg-black"></div>

          {/* 점 3개 */}
          <div className="w-3 h-3 bg-black rounded-full z-10"></div>
          <div className="w-3 h-3 bg-black rounded-full z-10"></div>
          <div className="w-3 h-3 bg-black rounded-full z-10"></div>
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col justify-between h-[150px] text-[18px] font-semibold text-gray-700">
          <span>최대값</span>
          <span>평균</span>
          <span>최소값</span>
        </div>
      </div>

      {/* 직전 그래프 */}
      <div className="flex flex-col items-center">
        <p className="font-semibold mb-2 text-[#3B82F6]">직전</p>

        {/* 최소/평균/최대값 계산 */}
        {(() => {
          const max = Math.max(...previousRPPG.hrValues);
          const min = Math.min(...previousRPPG.hrValues);
          const avg =
            previousRPPG.hrValues.reduce((a: number, b: number) => a + b, 0) /
            previousRPPG.hrValues.length;

          const chartData = [
            { name: "직전", value: max, label: "최고" },
            { name: "직전", value: avg, label: "평균" },
            { name: "직전", value: min, label: "최저" },
          ];

          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /> {/* 하나의 x축 */}
                <YAxis domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
                <Tooltip
                  formatter={(value: number, name: string, props: any) => [
                    `${value} bpm`,
                    props.payload.label,
                  ]}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          );
        })()}
      </div>

      {/* 현재 그래프 */}
      <div className="flex flex-col items-center">
        <p className="font-semibold mb-2 text-[#FF0000]">현재</p>

        {(() => {
          const min = Math.min(...currentRPPG.hrValues);
          const max = Math.max(...currentRPPG.hrValues);
          const avg =
            currentRPPG.hrValues.reduce((a: number, b: number) => a + b, 0) /
            currentRPPG.hrValues.length;

          const chartData = [
            { name: "최소", value: min },
            { name: "평균", value: avg },
            { name: "최대", value: max },
          ];

          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
                <Tooltip />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#FF0000"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#FF0000" }}
                />
              </LineChart>
            </ResponsiveContainer>
          );
        })()}
      </div>

      {/* 직전/현재 심박수 수치 */}
      <div className="flex justify-between text-[18px] font-semibold mt-4">
        <p>직전 심박수: {previousRPPG.hr}</p>
        <p>현재 심박수: {currentRPPG.hr}</p>
      </div>

      {/* ✅ 현재 심박수 표시 (파란 하트 + 평균 bpm 스타일 통일) */}
      <div className="flex flex-col items-center mt-6">
        <p className="font-semibold text-black mb-3">현재 심박수</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[40px] leading-none">💙</span>
          <span className="text-[55px] leading-none text-[#3B82F6]">
            {currentRPPG.hr}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeartRateChange;
