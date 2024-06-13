const request = require("supertest");

const app = require("../../index");

it("returns a 201 on clearing the cookie while logging out", async () => {
  await request(app)
    .post("/api/v1/user/logout")
    .send({
      username: "test",
      email: "test@test.com",
      password: "passwordpassword",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/v1/user/logout")
    .send({})
    .expect(200);

  console.log(response.get("Set-Cookie"));
//   expect(response.get("Set-Cookie")[0].toEqual());
});
