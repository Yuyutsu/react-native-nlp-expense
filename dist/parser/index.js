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
const normalizeSpaces = (value) => value.replace(/\s+/g, ' ').trim();
const removeMatchedSegment = (input, matchedText) => {
    if (!matchedText) {
        return input;
    }
    const escaped = matchedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return input.replace(new RegExp(escaped, 'i'), ' ');
};
const extractNote = (input, consumedSegments) => {
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
const calculateConfidence = (params) => {
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
export const parseExpenseText = (input, context) => {
    var _a, _b;
    const amountResult = parseAmount(input);
    const categoryResult = parseCategory(input, context.categories);
    const dateResult = parseDate(input, context.locale);
    const note = extractNote(input, [
        amountResult.matchedText,
        categoryResult.matchedText,
        dateResult.matchedText
    ]);
    return {
        amount: (_a = amountResult.amount) !== null && _a !== void 0 ? _a : 0,
        currency: (_b = amountResult.currency) !== null && _b !== void 0 ? _b : context.fallbackCurrency,
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
//# sourceMappingURL=index.js.map