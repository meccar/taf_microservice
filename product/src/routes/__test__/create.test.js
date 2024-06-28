const request = require("supertest");
const { it } = require("node:test");

const app = require("../../index");
const Product = require("../../models/product.model");
const { natsWrapper } = require("../../nats-wrapper");

it("has a route handle listening to /api/v1/product", async () => {
  const response = (await request(app).post("/api/v1/product")).setEncoding({});

  expect(response.statusCode).not.toEsqual(404);
});

it("publishes an event", async () => {
  const title = "dasfas";
  await request(app)
    .post("/api/v1/product")
    .set("Cookie", global.login())
    .send({ title, price: 20 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
