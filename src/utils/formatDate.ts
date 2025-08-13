/**
 * Formata uma string de data (ex: "2025-07-31") para o padrão brasileiro (dd/mm/yyyy).
 * @param dateString A data em formato YYYY-MM-DD.
 * @returns A data formatada ou "N/A" se a entrada for inválida.
 */

export const formatDateToBR = (dateString: string | null | undefined): string => {
  // Retorna "N/A" se a data for nula, indefinida ou uma string vazia.
  if (!dateString) {
    return "N/A";
  }

  try {
    // O construtor Date() pode interpretar "YYYY-MM-DD" como UTC (meia-noite).
    // Para evitar problemas de fuso horário que podem mudar o dia,
    // criamos a data de uma forma mais segura.
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);

    // Intl.DateTimeFormat é a API nativa do navegador para formatação.
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(correctedDate);
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "Data inválida";
  }
};

