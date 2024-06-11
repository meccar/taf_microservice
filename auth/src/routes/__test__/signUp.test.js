const request = require("supertest");

const app = require("../../index");

it("returns a 201 on sucessful signup", async () => {
  return request(app)
    .post("/api/v1/user/register")
    .send({
      username: "test",
      email: "test@test.com",
      password: "passwordpassword",
      passwordConfirm: "passwordpassword",
    })
    .expect(201);
});
