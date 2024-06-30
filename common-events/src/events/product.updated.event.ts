import { Subjects } from "./subject";

export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
