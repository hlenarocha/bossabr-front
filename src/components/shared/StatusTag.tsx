// src/components/shared/StatusTag.tsx

import React from "react";

interface StatusTagProps {
  status: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  // --- ESTILO ATUALIZADO ---
  // Fundo escuro e texto branco fixos para a tag
  const tagClasses = "bg-zinc-800 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";
  
  // Variável para a cor do ícone
  let iconColorClass = "";
  let iconClass = "";

  // Define a cor do ícone com base no status
  switch (status.toLowerCase()) {
    case "atrasado":
      iconColorClass = "text-red-500"; // Cor aplicada apenas ao ícone
      iconClass = "fa-solid fa-clock-rotate-left";
      break;
    case "concluído":
      iconColorClass = "text-green-500";
      iconClass = "fa-solid fa-check-circle";
      break;
    case "em andamento":
      iconColorClass = "text-blue-500";
      iconClass = "fa-solid fa-palette";
      break;
    case "novo":
      iconColorClass = "text-purple-500";
      iconClass = "fa-solid fa-star";
      break;
    case "em aprovação":
      iconColorClass = "text-yellow-500";
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