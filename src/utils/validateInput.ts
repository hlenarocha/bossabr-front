export const validateInput = (value: string, type: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const currentDate = new Date();
  const minBirthDate = new Date();
  const maxBirthDate = new Date();

  minBirthDate.setFullYear(currentDate.getFullYear() - 100);
  maxBirthDate.setFullYear(currentDate.getFullYear() - 14);



  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value) && value.length > 0 && value.length <= 50;
  }

  if (type === 'text') {
    const textRegex = /^[A-Za-z\s]+$/;
    return textRegex.test(value) && value.length > 0 && value.length <= 50;
  }

  if (type === 'phone') {
    const phoneRegex = /\(\d{2}\) \d{5}-\d{4}/;
    return phoneRegex.test(value) && value.length > 0 && value.length <= 15;
  }

  if (type === "birthdayDate") {
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

}

