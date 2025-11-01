import React from "react";

interface DashboardTabsProps {
  activeTitle: "basic" | "detail";
  setActiveTitle: React.Dispatch<React.SetStateAction<"basic" | "detail">>;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTitle,
  setActiveTitle,
}) => {
  return (
    <div className="flex">
      <h2
        onClick={() => setActiveTitle("basic")}
        className={`w-[376px] h-[116px] leading-[1] font-bold tracking-normal font-inter rounded-tr-[36px] rounded-tl-[36px]
        cursor-pointer text-[48px] transition-colors duration-300 flex items-center justify-center
        ${
          activeTitle === "basic"
            ? "text-black bg-white"
            : "text-[#6B6B6B] bg-transparent"
        }`}
      >
        기본결과
      </h2>

      <h2
        onClick={() => setActiveTitle("detail")}
        className={`w-[376px] h-[116px] leading-[1] font-bold tracking-normal font-inter rounded-tr-[36px] rounded-tl-[36px]
        cursor-pointer text-[48px] transition-colors duration-300 flex items-center justify-center
        ${
          activeTitle === "detail"
            ? "text-black bg-white"
            : "text-[#6B6B6B] bg-transparent"
        }`}
      >
        세부결과
      </h2>
    </div>
  );
};

export default DashboardTabs;
