import { pgTable, doublePrecision, serial, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./user";

export const uuids = pgTable("uuids", {
  id: uuid().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  correct: integer().notNull().default(0),
  guesses: integer().notNull().default(0)
});
