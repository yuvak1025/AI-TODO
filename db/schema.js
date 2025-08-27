import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  todo: text("todo").notNull(),
  due_date: timestamp("due_date"), // NEW COLUMN
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
