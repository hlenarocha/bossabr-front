export const validateInput = (value: string, type: string) => {
  if (!value) return false;

  // --- VALIDAÇÃO DE CNPJ ---
  if (type === 'cnpj') {
    // Remove caracteres não numéricos
    const cnpj = value.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Validação dos dígitos verificadores
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0), 10)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1), 10)) return false;

    return true;
  }

  // --- OUTRAS VALIDAÇÕES ---
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const currentDate = new Date();

  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value) && value.length > 0 && value.length <= 100;
  }

  if (type === 'text') {
    const textRegex = /^[A-Za-z\s]+$/;
    return textRegex.test(value) && value.length > 0 && value.length <= 50;
  }

  if (type === 'phone') {
    const phoneRegex = /\(\d{2}\) \d{5}-\d{4}/;
    return phoneRegex.test(value) && value.length <= 15;
  }

  if (type === "birthDate") {
    if (!dateRegex.test(value)) return false;
    const inputDate = new Date(value);
    const minBirthDate = new Date();
    minBirthDate.setFullYear(currentDate.getFullYear() - 120);
    const maxBirthDate = new Date();
    maxBirthDate.setFullYear(currentDate.getFullYear() - 14);

    return inputDate >= minBirthDate && inputDate <= maxBirthDate && inputDate <= currentDate;
  }

  if (type === "entryDate") {
    if (!dateRegex.test(value)) return false;
    const inputDate = new Date(value);
    return inputDate <= currentDate;
  }

  return false;
}
