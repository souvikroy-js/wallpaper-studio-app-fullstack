import z from "zod";
import { loginSchema, registerSchema } from "./zodSchema";

// Login form data type
export type LoginType = z.infer<typeof loginSchema>;

// Register form data type
export type RegisterType = z.infer<typeof registerSchema>;
