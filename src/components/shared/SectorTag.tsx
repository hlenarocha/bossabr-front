// src/components/shared/SectorTag.tsx

import React from "react";

interface SectorTagProps {
  sectorName?: string;
}

const SectorTag: React.FC<SectorTagProps> = ({ sectorName = "N/A" }) => {
  // Estilo base com fundo escuro
  const tagClasses = "bg-zinc-800 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";
  
  // Variáveis para o ícone e sua cor
  let iconClass = "";
  let iconColorClass = "";

  switch (sectorName.toLowerCase()) {
    case "social media":
      iconColorClass = "text-blue-500"; // Cor apenas no ícone
      iconClass = "fa-solid fa-share-nodes";
      break;
    case "design":
      iconColorClass = "text-pink-500"; // Cor apenas no ícone
      iconClass = "fa-solid fa-palette";
      break;
    default:
      iconColorClass = "text-gray-500";
      iconClass = "fa-solid fa-briefcase";
  }

  return (
    <div className={tagClasses}>
      <i className={`${iconClass} ${iconColorClass}`}></i>
      <span>{sectorName}</span>
    </div>
  );
};

export default SectorTag;
