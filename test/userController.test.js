const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../src/app"); // Importa directamente el archivo TypeScript

describe("User API Tests", function () {
  it("Debería registrar un usuario", async function () {
    const res = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password123!",
        firstname: "John",
        lastname: "Doe",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("email").equal("test@example.com");
  });
});
