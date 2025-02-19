import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
import { useState } from "react";
import { ptBR } from "date-fns/locale";

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  /* Mudança para os próximos meses ou para os anteriores */
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  /* Data selecionada */
  const toggleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days.map((day, index) => {
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

      return (
        <div
          key={index}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg 
                     ${isToday(day) ? " text-white" : "text-white"}
            ${
              isSelected
                ? "border-2 border-customYellow text-white font-bold"
                : ""
            }
            ${isCurrentMonth ? "text-white" : "text-gray-600"}
            hover:bg-customYellow transition`}
          onClick={() => toggleSelectDate(day)}
        >
          {format(day, "d")}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center w-[350px] h-[350px] bg-[#1f1f1f] rounded-xl shadow-lg border-2 border-customYellow">
      {/* Cabeçalho */}
      <div className="flex gap-10 items-center mb-4">
        <button onClick={handlePrevMonth} className="text-customYellow text-xl">
          {"<"}
        </button>
        <h2 className="text-lg font-bold text-customYellow">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR }).toUpperCase()}
        </h2>
        <button onClick={handleNextMonth} className="text-customYellow text-xl">
          {">"}
        </button>
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 text-center text-gray-300 font-semibold">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
          <div
            key={index}
            className="w-10 h-10 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dias do Mês */}
      <div className="grid grid-cols-7">{renderDays()}</div>
    </div>
  );
};

export default CustomCalendar;
