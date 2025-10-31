import { useState } from "react";

const DashboardTitle: React.FC = () => {
  const [activeTitle, setActiveTitle] = useState<"basic" | "detail">("basic");

  return (
    <div className="relative min-h-screen bg-[#F8F8F8]">
      {/* 기본결과 */}
      <h2
        onClick={() => setActiveTitle("basic")}
        className={`absolute w-[376px] h-[116px] top-[165.45px] left-[215px]
          text-[96px] leading-[1] font-bold tracking-normal font-inter
          cursor-pointer
          ${activeTitle === "basic" ? "text-black" : "text-[#6B6B6B]"}
        `}
      >
        기본결과
      </h2>

      {/* 세부결과 */}
      <h2
        onClick={() => setActiveTitle("detail")}
        className={`absolute w-[376px] h-[116px] top-[165.45px] left-[812px]
          text-[96px] leading-[1] font-bold tracking-normal font-inter
          cursor-pointer
          ${activeTitle === "detail" ? "text-black" : "text-[#6B6B6B]"}
        `}
      >
        세부결과
      </h2>
    </div>
  );
};

export default DashboardTitle;
