/**
 * Normaliza uma string removendo acentos (diacríticos) e convertendo para minúsculas.
 * @param str A string a ser normalizada.
 * @returns A string normalizada.
 * * @example
 * normalizeString("Saúde"); // retorna "saude"
 * normalizeString("Açúcar"); // retorna "acucar"
 */
export const normalizeString = (str: string): string => {
  if (!str) return '';
  
  return str
    .normalize('NFD') // Separa os caracteres base dos seus acentos (ex: 'ú' -> 'u' + '´')
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos (diacríticos) usando uma faixa de códigos Unicode
    .toLowerCase(); 
};
