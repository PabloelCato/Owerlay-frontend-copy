export const numbersToWords = (n: number) => {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  if (n < 0 || n > 99) return false;

  if (n === 0) return 'zero';

  if (n < 20) {
    return ones[n];
  }

  const numString = n.toString();

  if (n >= 20 && n < 100) {
    return `${tens[Number(numString[0])]} ${tens[Number(numString[1])]}`;
  }
  return false;
};
