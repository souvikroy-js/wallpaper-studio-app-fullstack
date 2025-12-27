import z from "zod";
import {
	createCategorySchema,
	loginSchema,
	nameSchema,
	registerSchema,
	selectCategorySchema,
} from "./zodSchema";
import { ReactNode } from "react";

// Page Layout Props type
export type PageLayoutProps = Readonly<{
	children: ReactNode;
}>;

// Login form data type
export type LoginType = z.infer<typeof loginSchema>;

// Register form data type
export type RegisterType = z.infer<typeof registerSchema>;

// user profile name type
export type NameType = z.infer<typeof nameSchema>;

// user select category type
export type SelectCategoryType = z.infer<typeof selectCategorySchema>;

// user create category type
export type CreateCategoryType = z.infer<typeof createCategorySchema>;
