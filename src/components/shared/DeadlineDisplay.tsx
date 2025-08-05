import React from "react";
import { differenceInDays, parseISO, isPast } from "date-fns";
import { formatDateToBR } from "@/utils/formatDate";

interface DeadlineDisplayProps {
  prazo?: string;
}

const DeadlineDisplay: React.FC<DeadlineDisplayProps> = ({ prazo }) => {
  if (!prazo) {
    return <span className="text-gray-400">N/A</span>;
  }

  const deadlineDate = parseISO(prazo);
  const today = new Date();
  
  // Zera o horário para comparar apenas os dias
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const daysDifference = differenceInDays(deadlineDate, startOfToday);

  // Estilo padrão para datas normais (agora com estilo de tag)
  let containerClasses = "bg-zinc-700 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";
  let iconClass = "fa-solid fa-calendar-check"; 

  if (isPast(deadlineDate) && daysDifference < 0) {
    // Estilo para datas ATRASADAS (tag vermelha)
    containerClasses = "bg-customRedAlert text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";
    iconClass = "fa-solid fa-triangle-exclamation";
  } else if (daysDifference >= 0 && daysDifference <= 7) {
    // Estilo para datas PRÓXIMAS (tag amarela), que vão de 0 a 7 dias no futuro
    containerClasses = "bg-yellow-500 text-zinc-900 text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";
    iconClass = "fa-solid fa-hourglass-half";
  }

  return (
    <div className={containerClasses}>
      <i className={iconClass}></i>
      <span>{formatDateToBR(prazo)}</span>
    </div>
  );
};

export default DeadlineDisplay;
