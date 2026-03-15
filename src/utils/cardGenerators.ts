const randomDigits = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

export const generateCardNumber = (): string => {
  const digits = randomDigits(16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

export const generateExpirationDate = (baseDate = new Date()): string => {
  const expiration = new Date(baseDate);
  expiration.setMonth(expiration.getMonth() + 36);
  const month = String(expiration.getMonth() + 1).padStart(2, '0');
  const year = String(expiration.getFullYear()).slice(-2);

  return `${month}/${year}`;
};
