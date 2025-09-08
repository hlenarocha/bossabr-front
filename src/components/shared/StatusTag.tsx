// src/components/shared/StatusTag.tsx

import React from "react";

interface StatusTagProps {
  status?: string | null;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {

  if (!status) {
    return (
      <span className="py-1 px-3 text-xs font-bold text-white bg-zinc-600 rounded-full">
        Indefinido
      </span>
    );
  }
  const tagClasses = "bg-zinc-800 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";
  
  const normalizedStatus = status.toLowerCase();
  // Variável para a cor do ícone
  let iconColorClass = "";
  let iconClass = "";

  // Define a cor do ícone com base no status
  switch (normalizedStatus) {
    // 9 STATUS
    case "atrasada":
      iconColorClass = "text-red-500"; // Cor aplicada apenas ao ícone
      iconClass = "fa-solid fa-clock-rotate-left";
      break;
    case "concluída":
      iconColorClass = "text-green-500";
      iconClass = "fa-solid fa-check-circle";
      break;
    case "em andamento":
      iconColorClass = "text-blue-500";
      iconClass = "fa-solid fa-palette";
      break;
    case "em execução":
      iconColorClass = "text-cyan-500";
      iconClass = "fa-solid fa-spinner";
      break;
    // case "novo":
    //   iconColorClass = "text-purple-500";
    //   iconClass = "fa-solid fa-star";
    //   break;
    case "não iniciada":
      iconColorClass = "text-gray-500";
      iconClass = "fa-solid fa-play";
      break;
    case "reprovada":
      iconColorClass = "text-rose-500";
      iconClass = "fa-solid fa-xmark-circle";
      break;
    case "aprovada":
      iconColorClass = "text-green-500";
      iconClass = "fa-solid fa-thumbs-up";
      break;
    case "enviada para aprovação":
      iconColorClass = "text-orange-500";
      iconClass = "fa-solid fa-paper-plane";
      break;
    case "em aprovação":
      iconColorClass = "text-purple-500";
      iconClass = "fa-solid fa-hourglass-half";
      break;
    default:
      iconColorClass = "text-gray-500";
      iconClass = "fa-solid fa-question-circle";
  }

  return (
    <div className={tagClasses}>
      {/* A cor e o ícone são aplicados aqui */}
      <i className={`${iconClass} ${iconColorClass}`}></i>
      <span>{status}</span>
    </div>
  );
};

export default StatusTag;