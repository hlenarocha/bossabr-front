export const getDateInfo = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const dayOfWeekIndex = date.getDay();

  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const monthName = months[month];

  const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const dayOfWeek= daysOfWeek[dayOfWeekIndex];

  return {
    day,
    monthName,
    dayOfWeek,
  };
}