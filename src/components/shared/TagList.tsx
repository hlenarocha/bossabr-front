// src/components/shared/TagList.tsx

import React from 'react';

interface TagListProps {
  // Um array de strings para os itens (ex: ["Design", "Social Media"])
  items: string[];
  // O número máximo de tags a serem exibidas antes de agrupar
  maxVisible?: number;
  // Uma função que diz como renderizar cada tag individualmente
  renderTag: (item: string, index: number) => React.ReactNode;
}

const TagList: React.FC<TagListProps> = ({ items, maxVisible = 1, renderTag }) => {
  // Se não houver itens, não renderiza nada
  if (!items || items.length === 0) {
    return null;
  }

  // Se a quantidade de itens for menor ou igual ao máximo visível, renderiza todos
  if (items.length <= maxVisible) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => renderTag(item, index))}
      </div>
    );
  }

  // Separa os itens que serão visíveis dos que serão ocultos
  const visibleItems = items.slice(0, maxVisible);
  const hiddenCount = items.length - maxVisible;
  const hiddenItemsTooltip = items.slice(maxVisible).join(', ');

  return (
    <div className="flex flex-wrap items-center gap-1">
      {/* Renderiza os tags visíveis */}
      {visibleItems.map((item, index) => renderTag(item, index))}
      
      {/* Renderiza o indicador "+N" com a dica de ferramenta */}
      {hiddenCount > 0 && (
        <div
          className="bg-zinc-800 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full cursor-help"
          title={hiddenItemsTooltip}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default TagList;
