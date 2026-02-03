import { Elysia } from "elysia";
import { APIRoutes } from "./routes/v1/app.routes";
import { openapi } from "@elysiajs/openapi";
import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as Sentry from "@sentry/bun";
export type DatabaseType = NodePgDatabase<Record<string, never>> & { $client: Pool };
let sentryEnabled = false;

const db = drizzle({
  client: new Pool({
    connectionString: process.env.DB_URL,
  }),
  casing: "snake_case",
});

await migrate(db, {
  migrationsFolder: "./migrations",
});

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_NAME || "logpheus",
    integrations: [],
    tracesSampleRate: 0,
    sendDefaultPii: true,
  });
  sentryEnabled = true;
}

const app = new Elysia()
  .use(openapi())
  .use(APIRoutes)
  .get("/healthcheck", "Chat, I think we are good probably?")
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type ElysiaApp = typeof app;
