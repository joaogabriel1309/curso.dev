test("GET /api/v1/status", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const data = await res.json();
  console.log(data);
  expect(data.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(data.updated_at).toISOString();
  expect(data.updated_at).toEqual(parsedUpdatedAt);

  expect(data.database).toBeDefined();

  expect(data.database.version).toEqual(expect.any(String));
  expect(data.database.version).not.toBe("");

  expect(data.database.version).toEqual(expect.any(String));
  expect(data.database.version).not.toBe("");

  expect(Number.isInteger(data.database.maximum_connection)).toBe(true);
  expect(data.database.maximum_connection).toBeGreaterThan(0);

  expect(Number.isInteger(data.database.connections_used)).toBe(true);
  expect(data.database.connections_used).toBeGreaterThanOrEqual(1);
});