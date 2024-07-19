// import { Message } from "node-nats-streaming"
// import {Subjects, Listener, ProductCreatedEvent} from "@tafvn/common"
// import Product from "../../models/product.model";

// export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
//     subject: Subjects.ProductCreated = Subjects.ProductCreated
//     queueGroupName = "product-service"

//     onMessage(data: ProductCreatedEvent["data"], msg: Message) {}
// }

// const { Message } = require("node-nats-streaming");
const { Subjects, Listener } = require("@tafvn/common");
// const Product = require("../../models/product.model");

class ProductCreatedListener extends Listener {
  subject = Subjects.ProductCreated;

  queueGroupName = "product-service";

  // eslint-disable-next-line class-methods-use-this
  // onMessage(data, msg) {
  // Handle the message
  // }
}

module.exports = ProductCreatedListener;
