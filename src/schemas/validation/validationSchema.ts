import { z } from "zod";
import libphonenumber from "google-libphonenumber";
import dayjs, { Dayjs } from "dayjs";
export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// All valid weekdays
const WeekDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

// Time slot schema
const timeSlotSchema = z
  .object({
    startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start time",
    }),
    endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end time",
    }),
  })
  .refine((data) => new Date(data.startTime) < new Date(data.endTime), {
    message: "Start time must be before end time",
    path: ["endTime"], // This will show the error under `endTime`
  });

// Each day's availability schema
const serviceAvailabilitySchema = z.object({
  weekDay: z.enum(WeekDays),
  timeSlots: z
    .array(timeSlotSchema)
    .min(1, { message: "At least one time slot is required" }),
});

const dateSchema = z
  .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val) && val.isValid(), {
    message: "Invalid date",
  })
  .refine((val) => val !== null, {
    message: "Date is required",
  });

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
    .optional()
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
  street: z.string().optional(),
  city: z.string().optional(),

  country: z.string().optional(),

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

export const adminAppointmentSchema = z.object({
  customerName: z.string().min(1, { message: "First Name is required" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  phone: z
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
  status: z.string().min(1, { message: "Status is required" }),

  serviceId: z.string().min(1, { message: "Service is required" }),
  selectedDate: z.string().datetime(),

  selectedTime: z.string().datetime(),
  // .union([z.string(), z.object({ hours: z.number(), minutes: z.number() })]) // Accepts either string or object
  // .transform((val) => {
  //   if (typeof val === "string") {
  //     return val; // If it's already a string, use it directly
  //   } else if (val && typeof val === "object" && val.hours && val.minutes) {
  //     // If it's an object, format it to HH:mm
  //     const hours = val.hours.toString().padStart(2, "0");
  //     const minutes = val.minutes.toString().padStart(2, "0");
  //     return `${hours}:${minutes}`; // Format as HH:mm
  //   }
  //   return ""; // Return an empty string if no valid format is found
  // })
  // .refine((val) => /^([0-9]{2}):([0-9]{2})$/.test(val), {
  //   message: "Time must be in the format HH:mm (e.g., 14:30)",
  // }),
  createdById: z.string().min(1, { message: "Service is required" }),
  isForSelf: z.boolean(),
  message: z.string().min(8, { message: "Message is Required" }),
});

export type AdminAppointmentFormValues = z.infer<typeof adminAppointmentSchema>;

export const adminServiceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  estimatedDuration: z.string().min(1, { message: "Duration is required" }),
  status: z.string().min(1, { message: "Service Status is required" }),
  serviceAvailability: z
    .array(
      z.object({
        weekDay: z.string(),
        timeSlots: z
          .array(
            z.object({
              startTime: z.string().min(1, "Start time is required"),
              endTime: z.string().min(1, "End time is required"),
            })
          )
          .min(1, "At least one time slot required"),
      })
    )
    .min(1, "Select at least one weekday"),
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

export type AdminServiceFormValues = z.infer<typeof adminServiceSchema>;
