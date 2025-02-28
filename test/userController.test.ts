// import request from "supertest";
// import { app } from "../app";

// describe("User Controller Tests", () => {
//   describe("POST /register", () => {
//     it("Debe registrar un usuario nuevo", async () => {
//       const response = await request(app).post("/register").send({
//         email: "test@example.com",
//         password: "securepassword",
//         firstname: "Test",
//         lastname: "User",
//       });

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("email", "test@example.com");
//     });

//     it("Debe retornar error si falta información", async () => {
//       const response = await request(app).post("/register").send({
//         email: "test@example.com",
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty("error");
//     });
//   });

//   describe("POST /login", () => {
//     it("Debe retornar error si el usuario no existe", async () => {
//       const response = await request(app).post("/login").send({
//         email: "nonexistent@example.com",
//         password: "wrongpassword",
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty("error", "Email o contraseña incorrectos");
//     });
//   });

//   describe("GET /getUserInfo", () => {
//     it("Debe retornar error si no hay token", async () => {
//       const response = await request(app).get("/getUserInfo");

//       expect(response.status).toBe(401);
//       expect(response.body).toHaveProperty("error", "Token no proporcionado");
//     });
//   });
// });
