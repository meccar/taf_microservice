const request = require("supertest");

const app = require("../../index");

it("returns a 201 on sucessful login", async () => {
  const response = await request(app)
    .post("/api/v1/user/login")
    .send({
      username: "test",
      email: "test@test.com",
      password: "passwordpassword",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined;
});
