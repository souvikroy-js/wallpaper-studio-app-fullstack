"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const deleteWallpaper = async (id: string, imageName: string) => {
	try {
		await rm(`public/upload/wallpaper/${imageName}`);
		await prisma.wallpaper.delete({
			where: { id },
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
