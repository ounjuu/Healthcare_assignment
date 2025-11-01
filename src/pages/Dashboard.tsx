import { useState } from "react";

const DashboardTitle: React.FC = () => {
  const [activeTitle, setActiveTitle] = useState<"basic" | "detail">("basic");

  return (
    <div className="flex w-[1800px] h-[4195.28px] absolute top-[93px] left-[89px] rounded-tr-[36px] rounded-br-[36px] rounded-bl-[36px]">
      {/* 기본결과 */}
      <h2
        onClick={() => setActiveTitle("basic")}
        className={`w-[376px] h-[116px] top-[165.45px] left-[215px]
    leading-[1] font-bold tracking-normal font-inter rounded-tr-[36px] rounded-tl-[36px]
    cursor-pointer text-[96px] transition-colors duration-300 flex items-center justify-center
    ${
      activeTitle === "basic"
        ? "text-black bg-white"
        : "text-[#6B6B6B] bg-transparent"
    }
  `}
      >
        기본결과
      </h2>

      {/* 세부결과 */}
      <div
        onClick={() => setActiveTitle("detail")}
        className={`w-[376px] h-[116px] top-[165.45px] left-[215px]
    leading-[1] font-bold tracking-normal font-inter rounded-tr-[36px] rounded-tl-[36px]
    cursor-pointer text-[96px] transition-colors duration-300  flex items-center justify-center
    ${
      activeTitle === "basic"
        ? "text-[#6B6B6B] bg-transparent"
        : "text-black bg-white"
    }
  `}
      >
        세부결과
      </div>
    </div>
  );
};

export default DashboardTitle;
