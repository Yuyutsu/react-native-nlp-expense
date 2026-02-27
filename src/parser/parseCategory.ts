import type { ParseCategoryResult } from '../types';

const DEFAULT_CATEGORY_ALIASES: Record<string, string[]> = {
  food: ['lunch', 'dinner', 'breakfast', 'meal'],
  groceries: ['grocery'],
  coffee: ['cafe']
};

const toLowerTrim = (value: string): string => value.trim().toLowerCase();

export const parseCategory = (input: string, categories: string[]): ParseCategoryResult => {
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
    const aliases = DEFAULT_CATEGORY_ALIASES[category] ?? [];
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

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');