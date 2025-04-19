// types/MonthlyData.ts
import Transaction from ".\\Transaction";

export default interface MonthlyData {
  month: string; // es. "Aprile 2025"
  transactions: Transaction[];
}