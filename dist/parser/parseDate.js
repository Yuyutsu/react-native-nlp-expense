import * as chrono from 'chrono-node';
const getChronoForLocale = (locale) => {
    if (locale.toLowerCase().startsWith('en')) {
        return chrono;
    }
    return chrono;
};
export const parseDate = (input, locale = 'en-IN', referenceDate = new Date()) => {
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
//# sourceMappingURL=parseDate.js.map