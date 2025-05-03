import {
  pgTable as table,
  serial,
  text,
  numeric,
  index,
  timestamp,
} from "drizzle-orm/pg-core";

export const expenses = table(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => { 
    return {
      userIdIndex: index("expenses_user_id_idx").on(expenses.userId),
    };
  }
);
