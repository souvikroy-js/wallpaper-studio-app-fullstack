"use server";

import { auth } from "@/lib/betterAuth/auth";
import { NameType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const updateProfile = async ({ name }: NameType) => {
	try {
		await auth.api.updateUser({
			body: {
				name: name,
			},
			headers: await headers(),
		});

		revalidatePath("/", "layout");

		return {
			isSuccess: true,
			message: "Profile updated successfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Profile update failed 😢",
		};
	}
};

export default updateProfile;
