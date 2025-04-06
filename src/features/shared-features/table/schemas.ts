import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // You can adjust this to Date type if you'd prefer.
  totalAppointments: number;
  lastAppointment: string; // Same as dateOfBirth, this can be Date too.
  createdBy: string;
};

export const UserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  totalAppointments: z.number().nonnegative("Must be 0 or more"),
  lastAppointment: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  createdBy: z.string().min(1, "Creator is required"),
});
export type User1 = z.infer<typeof UserSchema>;
