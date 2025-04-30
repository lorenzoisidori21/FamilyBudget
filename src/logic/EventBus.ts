// src/logic/EventBus.ts
import EventEmitter from "eventemitter3";

const EventBus = new EventEmitter<{
  transactionAdded: { id: string; description: string };
  transactionDeleted: { id: string };
  transactionUpdated: { id: string };
}>();

export default EventBus;