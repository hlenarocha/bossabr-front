export const validateInput = (value: string, type: string) => {
  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  }

  if (type === 'text') {
    const textRegex = /^[A-Za-z\s]+$/;
    return textRegex.test(value) && value.length > 0 && value.length <= 50;
  }

}

