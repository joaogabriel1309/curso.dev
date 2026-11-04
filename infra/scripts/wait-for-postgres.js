const { exec } = require("node:child_process");

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let currentFrame = 0;

const spinner = setInterval(() => {
  const frame = spinnerFrames[currentFrame % spinnerFrames.length];
  process.stdout.write(`\r${frame} Waiting for postgres to be ready...`);
  currentFrame++;
}, 80);

function waitForPostgres() {
  exec("docker exec postgres-dev-cursodev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      setTimeout(waitForPostgres, 1000);
      return;
    }

    clearInterval(spinner);
    process.stdout.write("\r\x1b[K");
    console.log("✅ Postgres is ready!");
  }
}

waitForPostgres();
