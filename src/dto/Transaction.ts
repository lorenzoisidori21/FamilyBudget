// types/Transaction.ts
export type TransactionType = "income" | "expense";

export default interface Transaction {
  id: string;
  type: TransactionType;
  useForSummary: boolean;
  description: string;
  amount: number;
  paymentMethod: string;
}