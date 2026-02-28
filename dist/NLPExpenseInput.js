import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { parseExpenseText } from './parser';
export const NLPExpenseInput = ({ locale = 'en-IN', currency, categories, onParsed, placeholder = 'e.g. Spent ₹250 on coffee yesterday', debounceMs = 500, showHint = true }) => {
    const [value, setValue] = useState('');
    const [hint, setHint] = useState(null);
    const debounceTimerRef = useRef(null);
    const context = useMemo(() => ({
        locale,
        fallbackCurrency: currency,
        categories
    }), [categories, currency, locale]);
    const runParse = useCallback((text) => {
        const result = parseExpenseText(text, context);
        onParsed(result);
        if (showHint) {
            if (result.amount > 0) {
                setHint(`Parsed ${result.currency} ${result.amount.toFixed(0)}${result.category ? ` • ${result.category}` : ''}`);
            }
            else {
                setHint('Amount not detected yet');
            }
        }
    }, [context, onParsed, showHint]);
    const scheduleParse = useCallback((text) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            runParse(text);
        }, debounceMs);
    }, [debounceMs, runParse]);
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);
    return (_jsxs(View, { style: styles.container, children: [_jsx(TextInput, { value: value, placeholder: placeholder, onChangeText: (text) => {
                    setValue(text);
                    scheduleParse(text);
                }, onBlur: () => runParse(value), style: styles.input, autoCorrect: false, autoCapitalize: "sentences" }), showHint && hint ? _jsx(Text, { style: styles.hint, children: hint }) : null] }));
};
const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16
    },
    hint: {
        marginTop: 6,
        fontSize: 12
    }
});
//# sourceMappingURL=NLPExpenseInput.js.map