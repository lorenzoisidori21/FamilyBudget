// components/MonthlyView.tsx
import MonthlyData from "../dto/MonthlyData";
import Transaction from "../dto/Transaction";
import { v4 as uuidv4 } from "uuid";
import { BiArrowToBottom, BiArrowToTop, BiTrash } from "react-icons/bi";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import EventBus from "../logic/EventBus";
import { getTransactionBorderClass } from "../utils/styleHelper";

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
    EventBus.emit("transactionAdded", { id: newTransaction.id, description: newTransaction.description });
  };

  
  const toggleTransactionType = (t: Transaction) => {
    let newType = t.type;
    let newUseForSummary  = t.useForSummary;
    if(t.type === "expense" && t.useForSummary){
      newType = "income";
      newUseForSummary = true;
    }
    else if(t.type === "income" && t.useForSummary){
      newType = "expense";                
      newUseForSummary = false;
    }
    else if(t.type === "expense" && !t.useForSummary){
      newType = "expense";
      newUseForSummary = true;
    }
    handleUpdateTransaction(t.id, { type: newType, useForSummary: newUseForSummary });
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

      <div className="space-y-2 " >
        {data.transactions.map((t) => (
          <Card key={t.id} className={`border px-2 border-s-8 cursor-pointer select-none ${getTransactionBorderClass(t)}`}
            onClick={(e) => {
              // Evita il click se è partito da un input o da un button
              if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).tagName === "SELECT" || (e.target as HTMLElement).tagName === "path" || (e.target as HTMLElement).tagName === "svg") {
                return;
              }
              toggleTransactionType(t);
            }}
>
            <div className="flex items-center gap-1">
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
            
            <div className="flex items-center gap-1">
            <input
              type="number"
              className="w-16 border px-2 py-1 rounded"
              value={t.amount}
              
              onChange={(e) =>
                handleUpdateTransaction(t.id, { amount: parseFloat(e.target.value) })
              }
            />
            <select
              className="border px-2 py-1 rounded"
              value={t.paymentMethod}
              hidden={t.type == "income"}
              onChange={(e) =>
                handleUpdateTransaction(t.id, { paymentMethod: e.target.value as Transaction["paymentMethod"] })
              }
            >
              <option value="contanti">Contanti</option>
              <option value="bancomat">Bancomat</option>
              <option value="carta">Carta</option>
            </select>
              <button
                onClick={() => handleDeleteTransaction(t.id)}
                className="text-grey-600 hover:text-grey--800"
              >
                <BiTrash className="size-10"/>
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
