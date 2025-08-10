// src/components/shared/TeamTypeTag.tsx

import React from 'react';

interface TeamTypeTagProps {
  isInternal: boolean;
}

const TeamTypeTag: React.FC<TeamTypeTagProps> = ({ isInternal }) => {
  // 1. Estilo base copiado do SectorTag para consistência
  const tagClasses = "bg-zinc-800 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-2";

  const text = isInternal ? "Interna" : "Externa";
  
  // 2. Define a cor e o ícone com base na propriedade
  const iconColorClass = isInternal ? "text-teal-500" : "text-amber-500";
  const iconClass = isInternal ? "fa-solid fa-building" : "fa-solid fa-handshake";

  return (
    <div className={tagClasses}>
      {/* 3. Aplica a cor apenas ao ícone */}
      <i className={`${iconClass} ${iconColorClass}`}></i>
      <span>{text}</span>
    </div>
  );
};

export default TeamTypeTag;
