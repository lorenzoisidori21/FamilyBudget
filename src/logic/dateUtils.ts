// utils/dateUtils.ts
export function getAvailableMonths(): string[] {
    const currentDate = new Date();
    const months: string[] = [];
  
    // Aggiungi i 6 mesi successivi
    for (let i = 0; i <= 6; i++) {
      const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthLabel = futureDate.toLocaleString("default", { month: "long", year: "numeric" });
      months.push(capitalize(monthLabel));
    }
  
    // Aggiungi i mesi passati presenti nel localStorage (se esistono)
    const storedKeys = Object.keys(localStorage);
    const pastMonths = storedKeys
      .filter((key) => /^\w+ \d{4}$/.test(key) && !months.includes(key))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
    return [...pastMonths, ...months];
  }
  
  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  