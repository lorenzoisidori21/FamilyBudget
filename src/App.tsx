// App.tsx
import { useEffect, useState } from "react";
import MonthSelector from "./Components/MonthSelector";
import MonthlyView from "./Components/MonthlyView";
import { getAvailableMonths } from "./logic/dateUtils";
import MonthlyData from "./dto/MonthlyData";
import TransactionLogger from "./Components/TransactionLogger";
import { BudgetService } from "./logic/BudgetService";

export default function App() {
  const budgetService = new BudgetService();
  // Stato mese selezionato e dati mensili
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    () => budgetService.loadSelectedMonth()
  );
  const [monthlyData, setMonthlyData] = useState<Record<string, MonthlyData>>({});

  // Caricamento iniziale dati
  useEffect(() => {
    const stored = budgetService.loadAllData();
    if (stored) {
      setMonthlyData(stored);
    }
  }, []);

  // Persistenza selezione mese
  useEffect(() => {
    if (selectedMonth) {
      budgetService.saveSelectedMonth(selectedMonth);
    }
  }, [selectedMonth]);

  // Funzione per aggiornare dati mensili e salvare subito in storage
  const updateMonthlyData = (data: MonthlyData) => {
    setMonthlyData((prev) => {
      const updated = { ...prev, [data.month]: data };
      budgetService.saveAllData(updated);
      return updated;
    });
  };

  // Generazione mesi disponibili unendo salvati e futuri
  const futureMonths = getAvailableMonths();
  const savedMonths = Object.keys(monthlyData);
  const availableMonths = Array.from(new Set([...savedMonths, ...futureMonths]));

  const handleMonthSelect = (month: string) => {
    if (!monthlyData[month]) {
      const emptyData: MonthlyData = { month, transactions: [] };
      updateMonthlyData(emptyData);
    }
    setSelectedMonth(month);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center">Bilancio Familiare</h1>
      <TransactionLogger/>
      <MonthSelector
        availableMonths={availableMonths}
        onSelect={handleMonthSelect}
        selectedMonth={selectedMonth}
      />
      {selectedMonth && monthlyData[selectedMonth] && (
        <MonthlyView
          month={selectedMonth}
          data={monthlyData[selectedMonth]}
          onUpdate={updateMonthlyData}
        />
      )}
    </div>
  );
}
