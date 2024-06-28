// import { Publisher, Subjects, ProductUpdatedEvent } from "@tafvn/common";

// export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
//   readonly subject = Subjects.ProductUpdated;
// }

const { Publisher, Subjects } = require("@tafvn/common");

class ProductUpdatedPublisher extends Publisher {
  constructor() {
    super();
    this.subject = Subjects.ProductUpdated;
  }
}

module.exports = { ProductUpdatedPublisher };
