import orchestrator from "test/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Usuário anônimo", () => {
    test("deve retornar uma lista de migrações", async () => {
      const res = await fetch("http://localhost:3000/api/v1/migrations");
      expect(res.status).toBe(200);

      const responseBoby = await res.json();

      expect(Array.isArray(responseBoby)).toBe(true);
      expect(responseBoby.length).toBeGreaterThan(0);
    });
  });
});
