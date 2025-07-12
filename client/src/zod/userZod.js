import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .min(3, "Username must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["user", "admin"]).optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
});

export const signinSchema = z.object({
  method: z.enum(["username", "email", "mobile"]),
  identifier: z.string().min(1, "Please enter your login identifier"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
