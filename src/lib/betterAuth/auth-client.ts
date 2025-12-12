import { createAuthClient } from "better-auth/react";
import { clientEnv } from "../env/clientEnv";

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});
