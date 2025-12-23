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
			message: "User uploaded Succesfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "User upload failed 😢",
		};
	}
};

export default updateProfile;
