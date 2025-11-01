"use client";

import { useState } from "react";
import DashboardTabs from "../features/dashboard/DashboardTabs";
import BasicResult from "../features/dashboard/BasicResult";
import DetailResult from "../features/dashboard/DetailResult";

export default function DashboardPage() {
  const [activeTitle, setActiveTitle] = useState<"basic" | "detail">("basic");

  return (
    <div className="flex max-w-[1800px] max-h-[4195.28px] absolute top-[93px] left-[89px] rounded-[36px] flex-col">
      {/* 탭 헤더 */}
      <DashboardTabs
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />

      {/* 탭 내용 */}
      <div className="w-full bg-white rounded-b-[36px] p-8">
        {activeTitle === "basic" ? (
          <div className="flex flex-col w-screen h-screen p-8">
            <BasicResult />
          </div>
        ) : (
          <div className="flex flex-col w-screen h-screen p-8">
            <DetailResult />
          </div>
        )}
      </div>
    </div>
  );
}
