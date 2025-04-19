// App.tsx
import { useEffect, useState } from "react";
import MonthSelector from "./Components/MonthSelector";
import MonthlyView from "./Components/MonthlyView";
import { getAvailableMonths } from "./logic/dateUtils";
import MonthlyData from "./dto/MonthlyData";

export default function App() {
  // Stato mese selezionato e dati mensili
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    () => localStorage.getItem("selectedMonth") || null
  );
  const [monthlyData, setMonthlyData] = useState<Record<string, MonthlyData>>({});

  // Caricamento iniziale dati da localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bilancioData");
    if (stored) {
      setMonthlyData(JSON.parse(stored));
    }
  }, []);

  // Persistenza selezione mese
  useEffect(() => {
    if (selectedMonth) {
      localStorage.setItem("selectedMonth", selectedMonth);
    }
  }, [selectedMonth]);

  // Funzione per aggiornare dati mensili e salvare subito in localStorage
  const updateMonthlyData = (data: MonthlyData) => {
    setMonthlyData((prev) => {
      const updated = { ...prev, [data.month]: data };
      localStorage.setItem("bilancioData", JSON.stringify(updated));
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
