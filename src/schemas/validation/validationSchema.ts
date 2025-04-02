import { z } from "zod";

// Define your validation rules

export const adminUserSchema = z.object({
  full_name: z.string().min(1, { message: "First Name is required" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Invalid phone number format. Example: +1234567890",
  }),

  // password: z
  //   .string({ required_error: "Password is required" })
  //   .min(6, { message: "Password must be at least 6 characters long" })
  //   .max(100, { message: "Password cannot exceed 100 characters" }),

  // role: z.enum(["Admin", "User"], {
  //   required_error: "Role is required",
  //   message: "Role must be either 'Admin' or 'User'",
  // }),

  // isActive: z.boolean({ required_error: "isActive is required" }),
});

export type AdminUserFormValues = z.infer<typeof adminUserSchema>;
