import type { ParseAmountResult } from '../types';

const SYMBOL_TO_CURRENCY: Record<string, string> = {
  '₹': 'INR',
  '$': 'USD'
};

const NUMBER_CAPTURE = '(\\d{1,3}(?:,\\d{2,3})*(?:\\.\\d+)?|\\d+(?:\\.\\d+)?)';

export const parseAmount = (input: string): ParseAmountResult => {
  const text = input.trim();

  const symbolBeforeRegex = new RegExp(`([₹$])\\s*${NUMBER_CAPTURE}`);
  const symbolBeforeMatch = text.match(symbolBeforeRegex);
  if (symbolBeforeMatch) {
    const symbol = symbolBeforeMatch[1];
    const amountRaw = symbolBeforeMatch[2].replace(/,/g, '');
    const amount = Number.parseFloat(amountRaw);

    if (!Number.isNaN(amount)) {
      return {
        amount,
        currency: SYMBOL_TO_CURRENCY[symbol],
        matchedText: symbolBeforeMatch[0]
      };
    }
  }

  const numberRegex = new RegExp(`\\b${NUMBER_CAPTURE}\\b`, 'g');
  let numberMatch = numberRegex.exec(text);
  while (numberMatch) {
    const fullMatch = numberMatch[0];
    const nextSlice = text.slice(numberMatch.index + fullMatch.length);
    const ordinalSuffix = nextSlice.match(/^(st|nd|rd|th)\b/i);
    if (!ordinalSuffix) {
      const amountRaw = numberMatch[1].replace(/,/g, '');
      const amount = Number.parseFloat(amountRaw);

      if (!Number.isNaN(amount)) {
        return {
          amount,
          matchedText: fullMatch
        };
      }
    }

    numberMatch = numberRegex.exec(text);
  }

  return {};
};