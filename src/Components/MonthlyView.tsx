// components/MonthlyView.tsx
import MonthlyData from "../dto/MonthlyData";
import Transaction from "../dto/Transaction";
import { v4 as uuidv4 } from "uuid";
import { BiArrowToBottom, BiArrowToTop, BiMoney, BiMoneyWithdraw, BiTrash } from "react-icons/bi";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";

interface Props {
  month: string;
  data: MonthlyData;
  onUpdate: (updatedData: MonthlyData) => void;
}

function MonthlyView({ month, data, onUpdate }: Props) {
  const handleAddTransaction = () => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      description: "Nuova voce",
      amount: 0,
      paymentMethod: "contanti",
      type: "expense",
      useForSummary: true
    };
    onUpdate({
      ...data,
      transactions: [...data.transactions, newTransaction],
    });
  };

  const handleUpdateTransaction = (id: string, updated: Partial<Transaction>) => {
    const updatedTransactions = data.transactions.map((t) =>
      t.id === id ? { ...t, ...updated } : t
    );
    onUpdate({ ...data, transactions: updatedTransactions });
  };

  const handleDeleteTransaction = (id: string) => {
    const filtered = data.transactions.filter((t) => t.id !== id);
    onUpdate({ ...data, transactions: filtered });
  };

  // Calcoli basati su `type`
  const totalIncome = data.transactions
    .filter((t) => t.type === "income" && t.useForSummary)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = data.transactions
    .filter((t) => t.type === "expense" && t.useForSummary)
    .reduce((sum, t) => sum + t.amount, 0);
  const netSaving = totalIncome - totalExpense;

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Mese selezionato: {month}</h2>
      <Button
        onClick={handleAddTransaction}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Aggiungi Voce
      </Button>

      <div className="space-y-2">
        {data.transactions.map((t) => (
          <Card >
            <div className="flex items-center gap-2">
              {t.type === "income" ? (
                <BiArrowToTop className={t.useForSummary ? ("text-green-500") : "text-grey-200" } />
              ) : (
                <BiArrowToBottom className={t.useForSummary ? ("text-red-500") : "text-grey-200" }/>
              )}
              <input
              type="text"
              className={t.useForSummary ? "flex-1 border px-2 py-1 rounded" : "flex-1 border px-2 py-1 rounded line-through"}
              value={t.description}
              onChange={(e) =>
                handleUpdateTransaction(t.id, { description: e.target.value })
              }
            />
            </div>
            
            <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-28 border px-2 py-1 rounded"
              value={t.amount}
              onChange={(e) =>
                handleUpdateTransaction(t.id, { amount: parseFloat(e.target.value) })
              }
            />
            <select
              className="border px-2 py-1 rounded"
              value={t.paymentMethod}
              onChange={(e) =>
                handleUpdateTransaction(t.id, { paymentMethod: e.target.value as Transaction["paymentMethod"] })
              }
            >
              <option value="contanti">Contanti</option>
              <option value="bancomat">Bancomat</option>
              <option value="carta">Carta</option>
            </select>
            <select
              className="border px-2 py-1 rounded"
              value={t.type}
              onChange={(e) =>
                handleUpdateTransaction(t.id, { type: e.target.value as Transaction["type"] })
              }
            >
              <option value="income">Entrata</option>
              <option value="expense">Spesa</option>
            </select> 
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleUpdateTransaction(t.id, { useForSummary: !t.useForSummary as Transaction["useForSummary"] })}
                className={ t.useForSummary ? "text-red-600 hover:text-red-800" :  "text-green-600 hover:text-green-800"}
              >
                  { t.useForSummary ? 
                  (<BiMoneyWithdraw />)
                  :
                  (<BiMoney />)
                  }
              </button>
              <button
                onClick={() => handleDeleteTransaction(t.id)}
                className="text-grey-600 hover:text-grey--800"
              >
                <BiTrash/>
              </button>
            </div>           
          </Card>
        ))}
      </div>

      <div className="mt-4">
        <p>
          Totale Entrate: <strong>{totalIncome.toFixed(2)} €</strong>
        </p>
        <p>
          Totale Uscite: <strong>{totalExpense.toFixed(2)} €</strong>
        </p>
        <p>
          Risparmio: <strong>{netSaving.toFixed(2)} €</strong>
        </p>
      </div>
    </div>
  );
};

export default MonthlyView;
