import { z } from "zod";

export const signupSchema = z.object({
  username: z.string({required_error: "username is required"} ).min(3, "Username must be at least 3 characters long"),
  email:z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  role: z.enum(["user", "admin"]).optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number").optional(),
});

