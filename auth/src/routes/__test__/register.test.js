const request = require("supertest");

const app = require("../../index");

it("returns a 201 on sucessful signup", async () => {
  await request(app)
    .post("/api/v1/user/register")
    .send({
      username: "test",
      email: "test@test.com",
      password: "passwordpassword",
      passwordConfirm: "passwordpassword",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/v1/user/register")
    .send({
      username: "test",
      email: "test",
      password: "passwordpassword",
      passwordConfirm: "passwordpassword",
    })
    .expect(400);
});
it("returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/v1/user/register")
    .send({
      username: "test",
      email: "test@gmail.com",
      password: "p",
      passwordConfirm: "p",
    })
    .expect(400);
});
it("returns a 400 with an invalid passwordConfirm", async () => {
  await request(app)
    .post("/api/v1/user/register")
    .send({
      username: "test",
      email: "test@gmail.com",
      password: "p",
      passwordConfirm: "pp",
    })
    .expect(400);
});
it("returns a 400 with missing email & password", async () => {
  await request(app).post("/api/v1/user/register").send({}).expect(400);
});

it("returns a 400 with duplicating emails", async () => {
  await request(app)
    .post("/api/v1/user/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/v1/user/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
