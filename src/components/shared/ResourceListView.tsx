import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ResourceListViewProps<T extends { [key: string]: any }> {
  isLoading: boolean;
  isError: boolean;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  errorMessage?: string;
  emptyMessage?: string;
  showMessage?: string;
}

export function ResourceListView<T extends { [key:string]: any }>({
  isLoading,
  isError,
  items,
  renderItem,
  errorMessage = "Ocorreu um erro ao carregar os dados.",
  emptyMessage = "Nenhum dado foi encontrado.",
  showMessage = "", // Default value added
}: ResourceListViewProps<T>) {

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full p-4">
        <i className="fa-solid fa-circle-exclamation text-customRedAlert text-5xl mb-4"></i>
        <p className="text-lg font-bold text-white">{errorMessage}</p>
        <p className="text-sm text-gray-400 mt-1">Por favor, tente recarregar a página.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full p-4">
        <i className="fa-solid fa-magnifying-glass text-gray-300 text-5xl mb-4"></i>
        <p className="text-lg font-bold text-white">{emptyMessage}</p>
        <p className="text-sm text-gray-400 mt-1">{showMessage? showMessage : "Tente uma busca com termos diferentes ou adicione um novo item."}</p>
      </div>
    );
  }

  return <>{items.map(renderItem)}</>;
}
