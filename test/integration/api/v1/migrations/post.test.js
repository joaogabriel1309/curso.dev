import database from "infra/database";
import orchestrator from "test/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Usuário anônimo", () => {
    describe("deve criar uma nova migração", () => {
      test("Rodando pela primeira vez", async () => {
        const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(res1.status).toBe(201);

        const responseBoby = await res1.json();

        expect(Array.isArray(responseBoby)).toBe(true);
        expect(responseBoby.length).toBeGreaterThan(0);
      });

      test("Rodando pela segunda vez", async () => {
        const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(res2.status).toBe(200);

        const response2Boby = await res2.json();

        expect(Array.isArray(response2Boby)).toBe(true);
        expect(response2Boby.length).toBe(0);
      });
    });
  });
});
