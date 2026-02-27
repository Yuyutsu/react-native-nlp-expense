import * as chrono from 'chrono-node';

import type { ParseDateResult } from '../types';

const getChronoForLocale = (locale: string): typeof chrono => {
  if (locale.toLowerCase().startsWith('en')) {
    return chrono;
  }

  return chrono;
};

export const parseDate = (
  input: string,
  locale = 'en-IN',
  referenceDate = new Date()
): ParseDateResult => {
  const chronoParser = getChronoForLocale(locale);
  const parsedResults = chronoParser.parse(input, referenceDate);
  if (parsedResults.length > 0) {
    const bestMatch = parsedResults[0];
    return {
      date: bestMatch.start.date(),
      matchedText: bestMatch.text,
      isDefaultToday: false
    };
  }

  return {
    date: referenceDate,
    isDefaultToday: true
  };
};