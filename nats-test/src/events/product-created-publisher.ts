import { Publisher, ProductCreatedEvent, Subjects } from "@tafvn/common-events";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
