import { Subjects } from "./subject";
import { OrderStatus } from "./types/order.status";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    product: {
      id: string;
      price: number;
    };
  };
}
