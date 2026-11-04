const exec = require('node:child_process');

function waitForPostgres() {
  exec('docker exec postgres-dev-cursodev pg_isready', handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') !== -1) {
      console.log('Postgres is ready!');
      return;
    }

    console.log('Waiting for Postgres...');
    setTimeout(waitForPostgres, 1000);
  }
}

waitForPostgres();