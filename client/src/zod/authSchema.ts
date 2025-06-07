import {object, z} from 'zod'
const signupSchema = z.object({
  username: z.string().min(3, "Username too short"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Mobile must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  method: z.enum(["username", "email", "mobile"]),
  identifier: z.string().min(1, "Please enter your login identifier"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export {
    signinSchema,
    signupSchema
}