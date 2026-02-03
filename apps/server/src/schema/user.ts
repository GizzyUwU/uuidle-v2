import { integer } from "drizzle-orm/gel-core";
import {
  pgTable,
  doublePrecision,
  serial,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text().notNull().unique(),
  password: text().notNull(),
  avgSkill: doublePrecision("avg_skill").notNull().default(0),
  avgSteps: doublePrecision("avg_steps").notNull().default(0),
  avgLuck: doublePrecision("avg_luck").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
