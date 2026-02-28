import type { ExpenseResult, ParseContext } from '../types';
import { parseAmount } from './parseAmount';
import { parseCategory } from './parseCategory';
import { parseDate } from './parseDate';
export declare const parseExpenseText: (input: string, context: ParseContext) => ExpenseResult;
export { parseAmount, parseCategory, parseDate };
//# sourceMappingURL=index.d.ts.map