// src/components/BasicResult.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 타입 정의
type EmotionResult = Record<string, number>;

type RPPGData = {
  hr: string;
  hrValues: number[];
  hrv: string;
  emotion: string;
  stress: string;
  emotionResult: EmotionResult;
};

type DepressionScore = {
  previous: number;
  current: number;
};

type ApiResponse = {
  previousRPPG: RPPGData;
  currentRPPG: RPPGData;
  depressionScore: DepressionScore;
};

// API fetch 함수
const fetchSessionResult = async (): Promise<ApiResponse> => {
  const { data } = await axios.get(
    "https://core.lucycare.co.kr/api/pre-assignment/session-result-report"
  );

  console.log("data", data);
  return data;
};

const BasicResult: React.FC = () => {
  // v4 스타일 useQuery
  const { data, isLoading, isError, refetch } = useQuery<ApiResponse, Error>(
    ["sessionResult"],
    fetchSessionResult,
    {
      retry: 2, // 실패 시 재시도
    }
  );

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

  // 차트용 데이터
  const chartData = currentRPPG.hrValues.map((val, idx) => ({
    name: `측정 ${idx + 1}`,
    bpm: val,
  }));

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">기본결과</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-semibold">심박수</p>
          <p>{currentRPPG.hr}</p>
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

        <div className="col-span-2">
          <p className="font-semibold">우울증 점수</p>
          <p>
            이전: {depressionScore.previous} / 현재: {depressionScore.current}
          </p>
        </div>

        <div className="col-span-2 h-64">
          <p className="font-semibold mb-2">심박수 변화</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bpm" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BasicResult;
