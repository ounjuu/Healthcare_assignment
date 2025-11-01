// src/components/DetailedResult.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

type DetailedData = {
  empathy: {
    rows: {
      suggestedEmotion: string;
      aiAnalysis: string;
      myEmotion: string;
      match: boolean;
      scoreBefore: number;
      scoreAfter: number;
    }[];
  };
  mimic: {
    rows: {
      suggestedEmotion: string;
      matchBefore: number;
      matchAfter: number;
    }[];
  };
  recognition: {
    rows: {
      suggestedEmotion: string;
      selectedEmotion: string;
      accuracy: number;
      responseTime: number;
    }[];
  };
  replication: {
    rows: {
      suggestedEmotion: string;
      aiBefore: number;
      aiAfter: number;
    }[];
  };
};

type ApiResponse = {
  previousRPPG: RPPGData;
  currentRPPG: RPPGData;
  depressionScore: DepressionScore;
  detailed?: DetailedData;
};

const fetchSessionResult = async (): Promise<ApiResponse> => {
  const { data } = await axios.get(
    "https://core.lucycare.co.kr/api/pre-assignment/session-result-report"
  );
  return data;
};

const DetailedResult: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery<ApiResponse, Error>(
    ["sessionResult"],
    fetchSessionResult,
    {
      retry: 2, // 500 에러 발생 시 최대 2회 재시도
      onError: (err) => {
        console.error("API 호출 실패:", err);
        alert("데이터를 불러오는 중 문제가 발생했습니다. 재시도해주세요.");
      },
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

  // detailed 기본값 설정
  const detailed = data.detailed ?? {
    empathy: { rows: [] },
    mimic: { rows: [] },
    recognition: { rows: [] },
    replication: { rows: [] },
  };

  const renderTable = (headers: string[], rows: React.ReactNode[]) => (
    <table className="w-full text-left border-collapse mb-6">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="border px-2 py-1 bg-gray-100">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 표정 공감하기 */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">표정 공감하기</h2>
        {renderTable(
          [
            "제시된 감정",
            "AI 표정 분석",
            "나의 감정",
            "일치 여부",
            "공감도(이전→현재)",
          ],
          (detailed.empathy.rows ?? []).map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.suggestedEmotion}</td>
              <td className="border px-2 py-1">{row.aiAnalysis}</td>
              <td className="border px-2 py-1">{row.myEmotion}</td>
              <td className="border px-2 py-1">{row.match ? "O" : "X"}</td>
              <td className="border px-2 py-1">
                {row.scoreBefore} → {row.scoreAfter}
              </td>
            </tr>
          ))
        )}
      </div>

      {/* 표정 따라하기 */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">표정 따라하기</h2>
        {renderTable(
          ["제시된 감정", "표정 일치율(이전→현재)"],
          (detailed.mimic.rows ?? []).map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.suggestedEmotion}</td>
              <td className="border px-2 py-1">
                {row.matchBefore} → {row.matchAfter}
              </td>
            </tr>
          ))
        )}
      </div>

      {/* 표정 인지하기 */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">표정 인지하기</h2>
        {renderTable(
          ["제시된 감정", "내가 선택한 감정", "정확도", "반응 속도(ms)"],
          (detailed.recognition.rows ?? []).map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.suggestedEmotion}</td>
              <td className="border px-2 py-1">{row.selectedEmotion}</td>
              <td className="border px-2 py-1">{row.accuracy}</td>
              <td className="border px-2 py-1">{row.responseTime}</td>
            </tr>
          ))
        )}
      </div>

      {/* 표정 지어보기 */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">표정 지어보기</h2>
        {renderTable(
          ["제시된 감정", "AI 표정 분석(이전→현재)"],
          (detailed.replication.rows ?? []).map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.suggestedEmotion}</td>
              <td className="border px-2 py-1">
                {row.aiBefore} → {row.aiAfter}
              </td>
            </tr>
          ))
        )}
      </div>
    </div>
  );
};

export default DetailedResult;
