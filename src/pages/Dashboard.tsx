"use client";

import { useState } from "react";
import DashboardTabs from "../features/dashboard/DashboardTabs";
import BasicResult from "../features/dashboard/BasicResult";
import DetailResult from "../features/dashboard/DetailResult";

export default function DashboardPage() {
  const [activeTitle, setActiveTitle] = useState<"basic" | "detail">("basic");

  return (
    <div className="flex pt-[93px] pb-[93px] pl-[89px] pr-[89px] rounded-[36px] flex-col w-full h-full">
      {/* 탭 헤더 */}
      <DashboardTabs
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />

      {/* 탭 내용 */}
      <div className="w-full bg-white rounded-b-[36px] rounded-tr-[36px] p-8">
        {activeTitle === "basic" ? (
          <div className="flex flex-col p-8">
            <BasicResult />
          </div>
        ) : (
          <div className="flex flex-col p-8">
            <DetailResult />
          </div>
        )}
      </div>
    </div>
  );
}
