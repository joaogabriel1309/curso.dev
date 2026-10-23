import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;")
}

test('GET /api/v1/migration', async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST'
  });
  expect(res.status).toBe(200);

  const responseBoby = await res.json();

  expect(Array.isArray(responseBoby)).toBe(true);
});