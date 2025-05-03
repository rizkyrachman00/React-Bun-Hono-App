import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  amount: z
    .string()
    .regex(/^\d+(?:\.\d+)?$/, { message: "Amount must be positive number" }),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
