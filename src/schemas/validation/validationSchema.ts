import { z } from "zod";
import libphonenumber from "google-libphonenumber";
export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// Define your validation rules

export const adminUserSchema = z.object({
  full_name: z.string().min(1, { message: "First Name is required" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  phone_number: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .refine(
      (number: any) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid mobile number" }
    ),
  role: z.string().min(1, { message: "Role is required" }),

  isActive: z.boolean().optional(),

  password: z
    .string()
    .min(8, { message: "Password must be 8 character long." }),

  // business_days: z
  //   .array(z.enum(daysOfWeek))
  //   .min(1, "At least one day must be selected.")
  //   .default([]),

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
