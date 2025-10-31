// src/pages/Dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center max-w-[2000px] mx-auto px-4">
      <div className="text-4xl font-bold flex">
        <h2
          className="absolute w-[376px] h-[116px] top-[165.45px] left-[215px]
             text-[96px] leading-[1] font-bold tracking-normal text-red-500 font-inter"
        >
          기본결과
        </h2>
        <h2>세부결과</h2>
      </div>
    </div>
  );
};

export default Dashboard;
