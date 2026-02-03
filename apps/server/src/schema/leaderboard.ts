import { pgTable, doublePrecision, serial, uuid, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { users } from "./user";
import { uuids } from "./uuids";

export const leaderboard = pgTable("leaderboard", {
  id: uuid().primaryKey().references(() => uuids.id),
  userId: integer("user_id").notNull().references(() => users.id),
  skill: doublePrecision("skill").notNull().default(0),
  steps: doublePrecision("steps").notNull().default(0),
  luck: doublePrecision("luck").notNull().default(0),
  timeTaken: doublePrecision("time_taken").notNull().default(0),
  correct: boolean().notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
