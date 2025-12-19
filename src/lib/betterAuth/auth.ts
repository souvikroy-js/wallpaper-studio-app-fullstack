import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../database/dbClient";
import { serverEnv } from "../env/serverEnv";
import { hashPasswordFn, verifyPasswordFn } from "./argon2";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	secret: serverEnv.BETTER_AUTH_SECRET,
	//...
	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: false,
		password: {
			hash: hashPasswordFn,
			verify: verifyPasswordFn,
		},
	},
	advanced: {
		cookiePrefix: "wp",
		database: {
			generateId: false,
		},
	},
});
