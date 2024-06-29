export enum OrderStatus {
  //   when the order has been created, but the
  //   product is trying to order has not ben reserved
  Created = "created",

  //   The product & the order is trying to reserve has already
  //   been reserved, or when the user has cancelled the order
  //   The order expires b4 payment
  Cancelled = "cancelled",

  //   The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  //   The order has reserved the ticket and the user has
  //   provided payment successfully
  Complete = "complete",
}
