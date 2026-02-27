# react-native-nlp-expense

Lightweight, offline, rule-based NLP input for React Native expense capture.

`react-native-nlp-expense` parses plain-English expense phrases like:

- `Spent ₹250 on coffee yesterday`
- `Paid 1200 for groceries last Sunday`
- `Lunch 180`

It returns a predictable, typed `ExpenseResult` object with amount, currency, category, date, note, and confidence.

No AI, no backend, no network calls.

## Installation

```bash
npm install react-native-nlp-expense
```

Peer dependencies:

- `react`
- `react-native`

## Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { NLPExpenseInput, ExpenseResult } from 'react-native-nlp-expense';

export const ExpenseScreen = () => {
	const handleParsed = (result: ExpenseResult) => {
		console.log('Parsed expense', result);
	};

	return (
		<View style={{ padding: 16 }}>
			<NLPExpenseInput
				locale="en-IN"
				currency="INR"
				categories={['coffee', 'groceries', 'fuel', 'rent', 'food']}
				onParsed={handleParsed}
			/>
		</View>
	);
};
```

## Public API

### `NLPExpenseInput`

A ready-to-use React Native text input component that parses expense phrases as the user types.

Props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `string` | `"en-IN"` | Locale used for date parsing (e.g. `"en-US"`, `"en-IN"`) |
| `currency` | `string` | — | Fallback currency code when no symbol is detected (e.g. `"INR"`, `"USD"`) |
| `categories` | `string[]` | — | List of category names to match against (e.g. `["coffee", "groceries"]`) |
| `onParsed` | `(result: ExpenseResult) => void` | — | Callback invoked with the parsed result |
| `placeholder` | `string` | — | Placeholder text shown inside the input |
| `debounceMs` | `number` | `500` | Milliseconds to debounce parsing while the user is typing |
| `showHint` | `boolean` | `true` | Whether to show a subtle parse hint beneath the input |

### `parseExpenseText`

Low-level function that parses a raw expense string without requiring the React component.

```ts
import { parseExpenseText } from 'react-native-nlp-expense';

const result = parseExpenseText('Spent ₹250 on coffee yesterday', {
  locale: 'en-IN',
  fallbackCurrency: 'INR',
  categories: ['coffee', 'groceries', 'fuel'],
});
```

### `ExpenseResult`

```ts
type ExpenseResult = {
  amount: number;       // Parsed numeric amount (0 if not found)
  currency: string;     // ISO currency code, e.g. "INR" or "USD"
  category?: string;    // Matched category from your list (or via alias)
  date: Date;           // Parsed date; defaults to today when not found
  note?: string;        // Remaining meaningful text after all fields are extracted
  confidence: number;   // Parse confidence score from 0 (low) to 1 (high)
};
```

### `ParseContext`

```ts
type ParseContext = {
  locale: string;           // e.g. "en-IN"
  fallbackCurrency: string; // e.g. "INR"
  categories: string[];     // e.g. ["coffee", "groceries"]
};
```

## Parsing Rules

- **Amount**: detects `250`, `₹250`, `1,200`, `1200.50`, and other comma-formatted or decimal values. Ordinal numbers like `1st` and `2nd` are correctly excluded.
- **Currency**: inferred from symbol (`₹` → `INR`, `$` → `USD`); otherwise falls back to the `currency` prop / `fallbackCurrency` context field.
- **Date**: parsed via [`chrono-node`](https://github.com/wanasit/chrono) for natural-language phrases like `yesterday`, `last Sunday`, `1st Feb`, `last month`; defaults to today when no date phrase is found.
- **Category**: exact match against the provided `categories` list (case-insensitive), with built-in lightweight aliases (e.g. `lunch` → `food` when `food` is in your list).
- **Note**: all remaining meaningful text after removing the matched amount, date, category, and common filler words (`spent`, `paid`, `on`, `for`, `rs`, `rupees`, etc.).
- **Confidence**: deterministic score from `0` to `1` based on how many fields were confidently parsed:
  - Base score: `0.25`
  - Amount found: `+0.45`
  - Category found: `+0.15`
  - Explicit date phrase found: `+0.10`
  - Note found: `+0.05`

### Built-in Category Aliases

| Alias | Resolves to |
| --- | --- |
| `lunch`, `dinner`, `breakfast`, `meal` | `food` |
| `grocery` | `groceries` |
| `cafe` | `coffee` |

## Supported Input Patterns

### Basic Patterns

| Pattern | Example |
| --- | --- |
| Amount + Category | `250 coffee` |
| Currency + Amount + Category | `₹250 coffee` |
| Action + Amount + Category | `Spent 250 coffee` |
| Amount + Category + Date | `250 coffee yesterday` |
| Action + Currency + Amount + Category | `Paid ₹1200 rent` |
| Category + Amount | `Lunch 180` |
| Amount + Category + Note | `250 coffee with friends` |
| Action + Amount + Category + Date | `Spent 400 fuel last Sunday` |
| Amount + Category + Specific Date | `250 groceries 1st Feb` |
| Category + Amount + Date | `Dinner 300 today` |
| Amount Only (defaults category) | `180` |
| Amount + Note | `300 taxi to office` |

### Advanced Patterns

| Pattern | Example | Parsed As |
| --- | --- | --- |
| Action + Amount + Preposition + Category + Date | `Spent ₹250 on coffee yesterday` | amount=250, category=coffee |
| Amount + Category + Note + Date | `300 dinner with team last Friday` | amount=300, category=food, note=with team |
| Action + Amount + Category + Reason | `Paid 1200 rent for March` | amount=1200, category=rent, note=for March |
| Amount + Category + Location | `180 coffee at Starbucks` | amount=180, category=coffee, note=at Starbucks |
| Action + Amount + Category + Time Reference | `Spent 400 fuel in the morning` | amount=400, category=fuel |
| Category + Amount + Extra Words | `Lunch 250 office canteen` | amount=250, category=food |
| Amount + Currency Word + Category | `500 rupees groceries` | amount=500, category=groceries |
| Action + Approximate Amount | `Spent around 300 on snacks` | amount=300 (lower confidence) |
| Amount + Category + Possessive Note | `250 coffee with client` | amount=250, note=with client |
| Action + Amount + Category + Relative Date | `Paid 900 electricity bill last month` | amount=900, category=electricity |

## Behavior

- Single text input optimized for mobile typing.
- Parsing runs on `onBlur` and on debounced `onChangeText` (default 500 ms).
- The input field is never blocked or reset while parsing.
- An optional subtle parse hint can be displayed below the input (`showHint` prop).

## Typed Exports

```ts
import {
  NLPExpenseInput,
  parseExpenseText,
  parseAmount,
  parseDate,
  parseCategory,
  ExpenseResult,
} from 'react-native-nlp-expense';
```

| Export | Kind | Description |
| --- | --- | --- |
| `NLPExpenseInput` | Component | Drop-in React Native text input with NLP parsing |
| `parseExpenseText` | Function | Parse a raw string into an `ExpenseResult` |
| `parseAmount` | Function | Extract amount and currency from a string |
| `parseDate` | Function | Extract a date from a string using chrono-node |
| `parseCategory` | Function | Match a category from a string against a list |
| `ExpenseResult` | Type | The structured result returned by the parser |

## Limitations

- Rule-based parser only (not AI): complex or ambiguous sentence structures may not parse perfectly.
- Currency inference currently supports `₹` (`INR`) and `$` (`USD`) symbols only.
- Category detection depends entirely on the list you provide plus the built-in aliases above.
- Locale handling is English-oriented; non-English date phrases are not supported in v1.
- Multiple expenses in a single phrase are not supported in v1.

## Local Development

```bash
npm install
npm run build
```

Build output is generated in `dist/`.
