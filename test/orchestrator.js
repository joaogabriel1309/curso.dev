import retry from "async-retry";
import database from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fechStatusPage, {
      retries: 100,
    });
    async function fechStatusPage() {
      const res = await fetch("http://localhost:3000/api/v1/status");
      if (res.status !== 200) {
        throw new Error(`Status page returned ${res.status}`);
      }
    }
  }
}

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  cleanDatabase,
};

export default orchestrator;
