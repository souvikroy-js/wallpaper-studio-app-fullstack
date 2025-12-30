"use server";

import prisma from "@/lib/database/dbClient";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const createWallpaper = async (
	selectCategory: string,
	plainFiles: File,
	id: string,
) => {
	const imgArrayBuffer = await plainFiles.arrayBuffer();

	const wallpaperName = `${nanoid()}.jpeg`;

	await sharp(imgArrayBuffer)
		.resize({
			width: 240,
			height: 240,
		})
		.jpeg({
			quality: 87,
			mozjpeg: true,
		})
		.toFile(`public/upload/wallpaper/${wallpaperName}`);

	try {
		await prisma.wallpaper.create({
			data: {
				image: wallpaperName,
				categoryCategoryId: selectCategory,
				userId: id,
			},
		});

		revalidatePath("/", "layout");

		return {
			isSuccess: true,
			message: "Wallpaper Created Succesfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Wallpaper Creat failed 😢",
		};
	}
};

export default createWallpaper;
