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

Props:

- `locale?: string` (default: `en-IN`)
- `currency: string` (fallback currency when symbol not present)
- `categories: string[]`
- `onParsed: (result: ExpenseResult) => void`
- `placeholder?: string`
- `debounceMs?: number` (default: `500`)
- `showHint?: boolean` (default: `true`)

### `ExpenseResult`

```ts
type ExpenseResult = {
	amount: number;
	currency: string;
	category?: string;
	date: Date;
	note?: string;
	confidence: number; // 0 to 1
};
```

## Parsing Rules (v1)

- **Amount**: detects `250`, `₹250`, `1200`, comma-formatted values, and decimals.
- **Currency**: inferred from symbol (`₹` -> `INR`, `$` -> `USD`) else falls back to `currency` prop.
- **Date**: parsed via `chrono-node` for phrases like `yesterday`, `last Sunday`, `1st Feb`; defaults to today.
- **Category**: exact match against provided `categories` (case-insensitive), with lightweight aliases (e.g. `lunch` -> `food` when `food` exists).
- **Note**: remaining meaningful text after removing matched amount/date/category and filler words.
- **Confidence**: deterministic score (`0`–`1`) from how many fields were confidently parsed.

## Supported Phrases (examples)

| Input | Parsed highlights |
| --- | --- |
| `₹250 coffee yesterday` | amount `250`, currency `INR`, category `coffee` |
| `Paid 1200 rent` | amount `1200`, category `rent` |
| `Lunch 180` | amount `180`, category `food` (via alias) |

## Behavior

- Single text input optimized for mobile typing.
- Parsing runs on `onBlur` and debounced `onChangeText`.
- Input is never blocked while parsing.
- Optional subtle parse hint can be shown under the input.

## Typed Exports

```ts
import {
	NLPExpenseInput,
	parseExpenseText,
	parseAmount,
	parseDate,
	parseCategory,
	ExpenseResult
} from 'react-native-nlp-expense';
```

## Limitations

- Rule-based parser only (not AI): complex sentence structures may not parse perfectly.
- Currency inference currently supports `₹` and `$` symbols only.
- Category detection depends on your provided category list and built-in aliases.
- Locale handling is currently English-oriented for date phrases.
- Multiple expenses in one sentence are not supported in v1.

## Local Development

```bash
npm install
npm run build
```

Build output is generated in `dist/`.
