const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../index");

jest.mock("../nats-wrapper");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: "7.0.3",
    },
  });

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {});
  console.log("Connected to in-memory MongoDB");
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
  console.log("Cleared collections");
});

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.connection.close();
  console.log("Disconnected from in-memory MongoDB");
});
