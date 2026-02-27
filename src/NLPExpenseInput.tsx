import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { parseExpenseText } from './parser';
import type { NLPExpenseInputProps } from './types';

export const NLPExpenseInput: React.FC<NLPExpenseInputProps> = ({
  locale = 'en-IN',
  currency,
  categories,
  onParsed,
  placeholder = 'e.g. Spent ₹250 on coffee yesterday',
  debounceMs = 500,
  showHint = true
}) => {
  const [value, setValue] = useState('');
  const [hint, setHint] = useState<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const context = useMemo(
    () => ({
      locale,
      fallbackCurrency: currency,
      categories
    }),
    [categories, currency, locale]
  );

  const runParse = useCallback(
    (text: string) => {
      const result = parseExpenseText(text, context);
      onParsed(result);

      if (showHint) {
        if (result.amount > 0) {
          setHint(
            `Parsed ${result.currency} ${result.amount.toFixed(0)}${result.category ? ` • ${result.category}` : ''}`
          );
        } else {
          setHint('Amount not detected yet');
        }
      }
    },
    [context, onParsed, showHint]
  );

  const scheduleParse = useCallback(
    (text: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        runParse(text);
      }, debounceMs);
    },
    [debounceMs, runParse]
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => {
          setValue(text);
          scheduleParse(text);
        }}
        onBlur={() => runParse(value)}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="sentences"
      />
      {showHint && hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
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