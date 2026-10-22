import { runner as migrationRunner } from 'node-pg-migrate';
import { join } from "node:path"

export default async function migrations(req, res) {
  if (req.method === "POST") {
    const migration = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations"
    });
    return res.status(200).json(migration);
  }

  if (req.method === "GET") {
    const migration = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations"
    });
    return res.status(200).json(migration);
  }

  return res.status(405).end();
}