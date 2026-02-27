import type { ExpenseResult, ParseContext } from '../types';

import { parseAmount } from './parseAmount';
import { parseCategory } from './parseCategory';
import { parseDate } from './parseDate';

const FILLER_WORDS = new Set([
  'spent',
  'pay',
  'paid',
  'for',
  'on',
  'rs',
  'rupees',
  'inr',
  'usd'
]);

const normalizeSpaces = (value: string): string => value.replace(/\s+/g, ' ').trim();

const removeMatchedSegment = (input: string, matchedText?: string): string => {
  if (!matchedText) {
    return input;
  }

  const escaped = matchedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return input.replace(new RegExp(escaped, 'i'), ' ');
};

const extractNote = (
  input: string,
  consumedSegments: Array<string | undefined>
): string | undefined => {
  let noteCandidate = input;
  consumedSegments.forEach((segment) => {
    noteCandidate = removeMatchedSegment(noteCandidate, segment);
  });

  const words = normalizeSpaces(noteCandidate)
    .split(' ')
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .filter((word) => !FILLER_WORDS.has(word.toLowerCase()));

  if (words.length === 0) {
    return undefined;
  }

  return words.join(' ');
};

const calculateConfidence = (params: {
  hasAmount: boolean;
  hasCategory: boolean;
  hasDatePhrase: boolean;
  hasNote: boolean;
}): number => {
  let score = 0.25;

  if (params.hasAmount) {
    score += 0.45;
  }

  if (params.hasCategory) {
    score += 0.15;
  }

  if (params.hasDatePhrase) {
    score += 0.1;
  }

  if (params.hasNote) {
    score += 0.05;
  }

  return Math.max(0, Math.min(1, Number(score.toFixed(2))));
};

export const parseExpenseText = (input: string, context: ParseContext): ExpenseResult => {
  const amountResult = parseAmount(input);
  const categoryResult = parseCategory(input, context.categories);
  const dateResult = parseDate(input, context.locale);

  const note = extractNote(input, [
    amountResult.matchedText,
    categoryResult.matchedText,
    dateResult.matchedText
  ]);

  return {
    amount: amountResult.amount ?? 0,
    currency: amountResult.currency ?? context.fallbackCurrency,
    category: categoryResult.category,
    date: dateResult.date,
    note,
    confidence: calculateConfidence({
      hasAmount: typeof amountResult.amount === 'number',
      hasCategory: Boolean(categoryResult.category),
      hasDatePhrase: !dateResult.isDefaultToday,
      hasNote: Boolean(note)
    })
  };
};

export { parseAmount, parseCategory, parseDate };