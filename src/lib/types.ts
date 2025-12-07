import z from "zod";
import { loginSchema, registerSchema } from "./zodSchema";
import { ReactNode } from "react";

// Page Layout Props type
export type PageLayoutProps = Readonly<{
	children: ReactNode;
}>;

// Login form data type
export type LoginType = z.infer<typeof loginSchema>;

// Register form data type
export type RegisterType = z.infer<typeof registerSchema>;
