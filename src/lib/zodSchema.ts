import z from "zod";

// login form data schema
export const loginSchema = z.object({
	loginEmail: z.email({ error: "Invalid email address" }),

	loginPassword: z
		.string()
		.min(8, { error: "Password must be minimum 8 characters long" }),

	rememberMe: z.boolean(),
});

// Register form data schema
export const registerSchema = z
	.object({
		registerName: z
			.string()
			.min(2, { error: "Name must be minimum 2 characters long" }),

		registerEmail: z.email({ error: "Invalid email address" }),

		registerPassword: z
			.string()
			.min(8, { error: "Password must be minimum 8 characters long" }),

		registerConfirmPassword: z
			.string()
			.min(1, { error: "Password didn't match" }),
	})
	.refine((data) => data.registerPassword === data.registerConfirmPassword, {
		error: "Password didn't match",
		path: ["registerConfirmPassword"],
	});
