export const greetingFunction = () => {
  // pegar horario. se horas <= 12 e >= 6, bom dia, se horas >= 18 e < 6, boa noite, se horas > 12 e < 18, boa tarde
  const currentTime = new Date().getHours();
  let greeting = '';

  if (currentTime <= 12 && currentTime >= 6) {
    greeting = 'Bom dia';
  } else if (currentTime > 12 && currentTime <= 18) {
    greeting = 'Boa tarde';
  } else {
    greeting = 'Boa noite';
  }

  return greeting;


}
