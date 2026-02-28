export type ExpenseResult = {
    amount: number;
    currency: string;
    category?: string;
    date: Date;
    note?: string;
    confidence: number;
};
export type NLPExpenseInputProps = {
    locale?: string;
    currency: string;
    categories: string[];
    onParsed: (result: ExpenseResult) => void;
    placeholder?: string;
    debounceMs?: number;
    showHint?: boolean;
};
export type ParseContext = {
    locale: string;
    fallbackCurrency: string;
    categories: string[];
};
export type ParseAmountResult = {
    amount?: number;
    currency?: string;
    matchedText?: string;
};
export type ParseDateResult = {
    date: Date;
    matchedText?: string;
    isDefaultToday: boolean;
};
export type ParseCategoryResult = {
    category?: string;
    matchedText?: string;
};
//# sourceMappingURL=types.d.ts.map