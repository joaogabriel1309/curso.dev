import database from 'infra/database.js';

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version");
  const version = versionResult.rows[0].server_version;

  const maximumResult = await database.query("SHOW max_connections;");
  const maximumConnection = Number(maximumResult.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const connectionsResult = await database.query({
    text: `SELECT COUNT(*)::int AS connections_used FROM pg_stat_activity WHERE datname = $1`,
    values: [databaseName]
  });
  const connectionsUsed = connectionsResult.rows[0].connections_used;

  console.log(connectionsUsed)
  res.status(200).json({
    updated_at: updatedAt,
    database: {
      version: version,
      maximum_connection: parseInt(maximumConnection),
      connections_used: connectionsUsed
    },
  });
}

export default status;
