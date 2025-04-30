import Transaction from "../dto/Transaction";

export function getTransactionBorderClass(t: Transaction): string {
    if(!t.useForSummary)
        return "border-s-gray-500";
    if (t.type === "income")
    return "border-s-emerald-600";
    
    return "border-s-red-700";
}