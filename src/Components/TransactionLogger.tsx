// src/components/TransactionLogger.tsx
import { useEffect } from "react";
import EventBus from "../logic/EventBus";

const TransactionLogger = () => {
  useEffect(() => {
    const onTransactionAdded = (data: { id: string; description: string }) => {
      console.log("📝 Transazione aggiunta:", data);
    };

    EventBus.on("transactionAdded", onTransactionAdded);

    return () => {
      EventBus.off("transactionAdded", onTransactionAdded);
    };
  }, []);

  return null;
};

export default TransactionLogger;