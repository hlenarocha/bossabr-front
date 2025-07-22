export const validateInput = (value: string, type: string) => {

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const currentDate = new Date();
  const minBirthDate = new Date();
  const maxBirthDate = new Date();


  minBirthDate.setFullYear(currentDate.getFullYear() - 120);
  maxBirthDate.setFullYear(currentDate.getFullYear() - 14);


  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  }


  if (type === 'text') {
    const textRegex = /^[A-Za-z\s]+$/;
    return textRegex.test(value);

  }


  if (type === 'phone') {

    const phoneRegex = /\(\d{2}\) \d{5}-\d{4}/;
    return phoneRegex.test(value);

  }


  if (type === "birthDate") {
    const inputDate = new Date(value);
    // - data de nascimento não pode ser em anos anteriores a 100 anos atrás do atual

    // - data de nascimento não pode ser há menos de 14 anos atrás (jovem aprendiz)

    // - data de nascimento não pode ser em data futura

    if (inputDate < minBirthDate || inputDate > maxBirthDate || inputDate > currentDate) {
      return false;
    }
    return dateRegex.test(value) && value.length > 0;
  }


  if (type === "entryDate") {
    const inputDate = new Date(value);
    // - data de entrada não pode ser em data futura REVER

    if (inputDate > currentDate) {
      return false;
    }


    return dateRegex.test(value) && value.length > 0;

  }

  if (type === "deadline") {
    // CORREÇÃO DE FUSO: Constrói a data manualmente para garantir hora local.
    const dateParts = value.split('-').map(part => parseInt(part, 10));
    const inputDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // - data de prazo não pode ser em data passada
    if (inputDate < today) {
      return false;
    }

    return dateRegex.test(value) && value.length > 0;
  }

  if (type === 'cnpj') {
    const cnpj = value.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

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


} 