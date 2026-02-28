const DEFAULT_CATEGORY_ALIASES = {
    food: ['lunch', 'dinner', 'breakfast', 'meal'],
    groceries: ['grocery'],
    coffee: ['cafe']
};
const toLowerTrim = (value) => value.trim().toLowerCase();
export const parseCategory = (input, categories) => {
    var _a;
    const text = input.toLowerCase();
    const normalizedCategories = categories.map(toLowerTrim);
    for (const category of normalizedCategories) {
        const exactMatch = text.match(new RegExp(`\\b${escapeRegex(category)}\\b`, 'i'));
        if (exactMatch) {
            return {
                category,
                matchedText: exactMatch[0]
            };
        }
    }
    for (const category of normalizedCategories) {
        const aliases = (_a = DEFAULT_CATEGORY_ALIASES[category]) !== null && _a !== void 0 ? _a : [];
        for (const alias of aliases) {
            const aliasMatch = text.match(new RegExp(`\\b${escapeRegex(alias)}\\b`, 'i'));
            if (aliasMatch) {
                return {
                    category,
                    matchedText: aliasMatch[0]
                };
            }
        }
    }
    return {};
};
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//# sourceMappingURL=parseCategory.js.map