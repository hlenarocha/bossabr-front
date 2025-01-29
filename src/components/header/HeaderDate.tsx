
import { getDateInfo } from "../../helpers/getDateInfo";

const HeaderDate = () => {
  const { day, monthName, dayOfWeek } = getDateInfo();

  return <>
  <div className="flex ">
    <div className="text-white text-[64px] font-black">
      {day}

    </div>
    <div className="">
    </div>
    <div>
      <div className="text-white text-[24px] font-black">{monthName}</div>
      <div className="text-white text-[24px] font-black">{dayOfWeek}</div>

    </div>

  </div>
  </>
}

export default HeaderDate;