// src/logic/BudgetService.ts
import EventEmitter from "eventemitter3";
import MonthlyData from "../dto/MonthlyData";

const STORAGE_KEY = "bilancioData";
const STORAGE_SELECTED_MOTNH_KEY = "selectedMonth";

class BudgetService extends EventEmitter{

    loadAllData(): Record<string, MonthlyData> | null 
    {
        try {
            const jsonData = localStorage.getItem(STORAGE_KEY);
            if (!jsonData) return null;
            return JSON.parse(jsonData) as Record<string, MonthlyData>;
        } catch (error) {
            console.error("Error loadAllData: ", error);
            return null;
        }
    }

    saveAllData (data: Record<string, MonthlyData>) {
        try {
            const key = `${STORAGE_KEY}`;
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
        } catch (error) {
            console.error("Error saveAllData: ", error);
            return null;
        }
    }

    loadSelectedMonth (): string | null {
        try {
            return localStorage.getItem(STORAGE_SELECTED_MOTNH_KEY);
        } catch (error) {
            console.error("Error loadSelectedMonth: ", error);
            return null;
        }
    }
    saveSelectedMonth (month: string) {
        try {
            return localStorage.setItem(STORAGE_SELECTED_MOTNH_KEY, month);
        } catch (error) {
            console.error("Error saveSelectedMonth: ", error);
            return null;
        }
    }
}

export { BudgetService };