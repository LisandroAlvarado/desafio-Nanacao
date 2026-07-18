import request from "supertest";

import app from "../app.js";

// Todos los tests relacionados con el CRUD de cafés.
describe("Operaciones CRUD de cafés", () => {
  // Realizamos una petición GET a la ruta /cafes.
  // La respuesta completa se guarda en la variable response.
  it("GET /cafes devuelve status 200 y un arreglo con al menos un café", async () => {
    const response = await request(app).get("/cafes").send();

    // Comprobamos que el servidor responda con el código HTTP 200.
    expect(response.statusCode).toBe(200);

    // Comprobamos que el cuerpo de la respuesta sea un arreglo.
    expect(response.body).toBeInstanceOf(Array);

    // Comprobamos que el arreglo contenga al menos un elemento.
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Verificamos que el servidor responda con un 404
  it("DELETE /cafes/:id devuelve 404 si el café no existe", async () => {
    const idInexistente = 999999;

    // Realizamos la petición DELETE.
    const response = await request(app)
      .delete(`/cafes/${idInexistente}`)
      .send();

    // Comprobamos que el servidor responda con un 404.
    expect(response.statusCode).toBe(404);
  });
});

// Verificamos que la ruta POST agregue un nuevo café y responda con un 201.
it("POST /cafes agrega un nuevo café y devuelve status 201", async () => {
  // Datos del café que queremos crear.
  const nuevoCafe = {
    nombre: "Americano",
  };

  // Enviamos la petición POST junto con el payload.
  const response = await request(app).post("/cafes").send(nuevoCafe);

  // Comprobamos que el servidor responda con 201.
  expect(response.statusCode).toBe(201);

  // Comprobamos que el nombre recibido sea el mismo.
  expect(response.body.nombre).toBe(nuevoCafe.nombre);

  // Comprobamos que Prisma haya generado un id.
  expect(response.body).toHaveProperty("id");
});

// Verificamos que el servidor responda con 400 cuando el id de la URL y el id del body son distintos.
it("PUT /cafes/:id devuelve 400 si los ids no coinciden", async () => {
  const cafeActualizado = {
    id: 999,
    nombre: "Flat White",
  };

  const response = await request(app).put("/cafes/1").send(cafeActualizado);

  expect(response.statusCode).toBe(400);
});
