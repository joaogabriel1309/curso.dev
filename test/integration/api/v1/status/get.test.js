test("GET /api/v1/status", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const data = await res.json();
  expect(data.status).toBe("ok");
});