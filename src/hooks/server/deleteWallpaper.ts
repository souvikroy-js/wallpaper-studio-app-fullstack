"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import { headers } from "next/headers";

const deleteWallpaper = async (wallpaperId: string) => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return { isSuccess: false, message: "Unauthorised 😢" };
		}

		const wallpaper = await prisma.wallpaper.findUnique({
			where: { id: wallpaperId },
			select: { userId: true, image: true },
		});

		if (!wallpaper || wallpaper.userId !== session.user.id) {
			return { isSuccess: false, message: "Forbidden 😢" };
		}

		const imageName = wallpaper.image;

		await rm(`public/upload/wallpaper/${imageName}`);

		await prisma.wallpaper.delete({
			where: { id: wallpaperId },
		});

		revalidatePath("/dashboard", "layout");

		return {
			isSuccess: true,
			message: "Wallpaper deleted succesfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Wallpaper delete failed 😢",
		};
	}
};

export default deleteWallpaper;
