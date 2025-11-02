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
import { useSessionResult } from "../../hooks/useSessionResult"; // 훅 import

const BasicResult: React.FC = () => {
  // 훅 사용
  const { data, isLoading, isError, refetch } = useSessionResult();

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  if (isError || !data)
    return (
      <div className="text-center mt-20">
        <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => refetch()}
        >
          재시도
        </button>
      </div>
    );

  const { previousRPPG, currentRPPG, depressionScore } = data;

  // 차트용 데이터 (직전/현재)
  const chartData = currentRPPG.hrValues.map((val: number, idx: number) => ({
    name: `${idx + 1}`,
    prev: previousRPPG.hrValues[idx],
    current: val,
  }));

  // 평균 bpm 계산
  const avg =
    currentRPPG.hrValues.reduce((acc: number, val: number) => acc + val, 0) /
    currentRPPG.hrValues.length;

  return (
    <div
      className="bg-white rounded w-full flex flex-col border border-[#6B6B6B]  
             rounded-[30px] pt-[30px] pr-[50px] pb-[50px] pl-[30px] gap-[10px]"
    >
      <div className="w-full flex flex-col mt-10">
        {/* 심박수 */}
        <p className="font-bold text-[25px] mb-4">심박수</p>

        {/* 직전 / 현재 */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-[111.87px] h-0 border-t-[10px] border-[#3B82F6] rounded-full" />
            <span className="font-bold text-sm">직전</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[111.87px] h-0 border-t-[10px] border-[#FF0000] rounded-full" />
            <span className="font-bold text-sm">현재</span>
          </div>
        </div>

        <div className="col-span-2 mt-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[40, 160]} ticks={[40, 80, 120, 160]} />
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
          <div className="mt-2 text-center font-semibold flex flex-col items-center justify-center gap-2">
            <span className="text-lg">평균</span>
            <div className="flex items-center justify-center gap-2">
              <img src="/heart.png" className="w-10 h-10" alt="heart" />
              <span className="text-[55px] leading-none">{avg.toFixed(0)}</span>
              <span className="text-[30px] leading-none">bpm</span>
            </div>
          </div>
        </div>

        {/* 안내 문구 1 */}
        <div className="text-center mt-4 space-y-2">
          <p>심박수는 1분 동안 심장이 뛰는 횟수를 의미해요.</p>
          <p>일반적으로 성인은 60-100 BPM이 정상 범위에요.</p>
          <p>
            심박수가 너무 높거나 낮으면 건강 문제의 신호일 수 있어 주의가
            필요해요.
          </p>
        </div>

        <div className="mt-4">
          <p>현재 심박수: {currentRPPG.hr}</p>
        </div>

        <div>
          <p className="font-semibold">심박변이도(HRV)</p>
          <p>{currentRPPG.hrv}</p>
        </div>

        <div>
          <p className="font-semibold">스트레스</p>
          <p>{currentRPPG.stress}</p>
        </div>

        <div>
          <p className="font-semibold">감정</p>
          <p>{currentRPPG.emotion}</p>
        </div>

        <div className="col-span-2 mt-2">
          <p className="font-semibold">우울증 점수</p>
          <p>
            이전: {depressionScore.previous} / 현재: {depressionScore.current}
          </p>
        </div>

        <p className="font-semibold mb-2">심박수 변화</p>
      </div>
    </div>
  );
};

export default BasicResult;
