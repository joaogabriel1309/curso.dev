import database from "infra/database";

test('GET /api/v1/migration', async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  expect(res.status).toBe(200);

  const responseBoby = await res.json();

  expect(Array.isArray(responseBoby)).toBe(true);
  expect(responseBoby.length).toBeGreaterThan(0);
});