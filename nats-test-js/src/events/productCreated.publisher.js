const { Publisher, Subjects } = require('@tafvn/common-events');

class ProductCreatedPublisher extends Publisher {
  constructor() {
    super();
    this.subject = Subjects.ProductCreated;
  }
}

module.exports = ProductCreatedPublisher;
