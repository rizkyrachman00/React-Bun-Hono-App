import {
  pgTable as table,
  serial,
  text,
  numeric,
  index,
} from "drizzle-orm/pg-core";

export const expenses = table(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  },
  (expenses) => {
    return {
      userIdIndex: index("expenses_user_id_idx").on(expenses.userId),
    };
  }
);
