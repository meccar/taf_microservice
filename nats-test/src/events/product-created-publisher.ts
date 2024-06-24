// import { Publisher } from "./publisher.event";
import { Publisher, ProductCreatedEvent, Subjects } from "@tafvn/common";
// import { ProductCreatedEvent } from "./product-created-event";
// import { Subjects } from "./subjects";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
