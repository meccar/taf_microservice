const { Listener, Subjects } = require('@tafvn/common-events');

class ProductCreatedListener extends Listener {
  constructor(client) {
    super(client);
    this.subject = Subjects.ProductCreated;
    this.queueGroupName = "payments-service";
  }

  onMessage(data, msg) {
    console.log("Event data: ", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}

module.exports = ProductCreatedListener;

