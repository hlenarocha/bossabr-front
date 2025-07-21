import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface StatusViewProps {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
  errorSubMessage?: string;
}

/**
 * componente para gerenciar e exibir os estados de uma operação assíncrona (loading, error, success).
 * Ele envolve o conteúdo principal e exibe um spinner ou uma mensagem de erro conforme necessário
 */
export const StatusView = ({
  isLoading,
  isError,
  children,
  errorMessage = "Erro ao carregar os dados.",
  errorSubMessage = "Por favor, tente recarregar a página.",
}: StatusViewProps) => {

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full p-4">
          <i className="fa-solid fa-circle-exclamation text-customRedAlert text-5xl mb-4"></i>
          <p className="text-lg font-bold text-white">{errorMessage}</p>
          <p className="text-sm text-gray-400 mt-1">{errorSubMessage}</p>
        </div>
    );
  }

  return <>{children}</>;
};
