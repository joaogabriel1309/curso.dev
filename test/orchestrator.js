import retry from "async-retry";

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
const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
