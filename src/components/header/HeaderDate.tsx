
import { getDateInfo } from "@/utils/getDateInfo";

const HeaderDate = () => {
  const { day, monthName, dayOfWeek } = getDateInfo();

  return <>
  <div className="hidden sm:flex justify-center items-center gap-3 cursor-default">
    <div className="text-white text-[64px] font-black font-albert">
      {day}

    </div>
    <div className="bg-white w-[3px] h-[55px]"></div>
    <div className="flex flex-col items-center">
      <div className="text-white text-4xl font-black">{monthName}</div>
      <div className="text-white text-base font-bold">{dayOfWeek}</div>

    </div>

  </div>
  </>
}

export default HeaderDate;