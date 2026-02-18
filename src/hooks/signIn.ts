import { authClient } from "@/lib/betterAuth/auth-client";
import { LoginType } from "@/lib/types";

const signIn = async ({ email, password, rememberMe }: LoginType) => {
	try {
		const { error } = await authClient.signIn.email({
			email,
			password,
			rememberMe,
		});

		if (error) {
			console.error(error);
			return {
				isSuccess: false,
				message: "Invalid email or password.",
			};
		}

		return {
			isSuccess: true,
			message: "User Login Successfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "User Login Failed 😢",
		};
	}
};

export default signIn;
