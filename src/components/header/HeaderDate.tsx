
import { getDateInfo } from "../../helpers/getDateInfo";

const HeaderDate = () => {
  const { day, monthName, dayOfWeek } = getDateInfo();

  return <>
  <div className="flex justify-center items-center gap-2">
    <div className="text-white text-[64px] font-black font-albert">
      {day}

    </div>
    <div className="bg-white w-[4px] h-[60px]"></div>
    <div className="flex flex-col items-center">
      <div className="text-white text-4xl font-black">{monthName}</div>
      <div className="text-white text-base font-bold">{dayOfWeek}</div>

    </div>

  </div>
  </>
}

export default HeaderDate;