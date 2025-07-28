import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean; // propriedade opcional para desabilitar os botões durante o carregamento
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  // não renderiza nada se houver apenas uma página ou menos
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 p-4 mt-2 border-t border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 font-bold text-customTextGray transition-colors bg-customYellow rounded hover:opacity-70 disabled:bg-zinc-800 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span className="font-semibold text-white">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 font-bold text-customTextGray transition-colors bg-customYellow rounded hover:opacity-70 disabled:bg-zinc-800 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  );
};

export default PaginationControls;
