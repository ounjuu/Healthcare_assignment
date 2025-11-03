import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSessionResult = () => {
  return useQuery(
    ["sessionResultReport"], // 캐시 키
    async () => {
      const res = await axios.get(
        "https://core.lucycare.co.kr/api/pre-assignment/session-result-report"
      );
      console.log(res.data, "res.data??");
      return res.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5분 캐싱
      retry: 1, // 실패 시 1번 재시도
    }
  );
};
