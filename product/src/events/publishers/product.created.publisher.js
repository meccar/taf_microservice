// import { Publisher, Subjects, ProductCreatedEvent } from "@tafvn/common";

// export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
//   readonly subject = Subjects.ProductCreated;
// }

const { Publisher, Subjects } = require("@tafvn/common");

class ProductCreatedPublisher extends Publisher {
  constructor() {
    super();
    this.subject = Subjects.ProductCreated;
  }
}

module.exports = { ProductCreatedPublisher };
