import { Subjects } from "./subject";

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
