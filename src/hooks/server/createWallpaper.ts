"use server";

import prisma from "@/lib/database/dbClient";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import sharp from "sharp";

const MAX_WALLPAPER_BYTES = 5 * 1024 * 1024; // 5MB

const createWallpaper = async (
	selectCategory: string,
	plainFiles: File,
	id: string,
) => {
	if (!plainFiles.type || !plainFiles.type.startsWith("image/")) {
		return {
			isSuccess: false,
			message: "Invalid file type. Only image files are allowed.",
		};
	}

	if (plainFiles.size > MAX_WALLPAPER_BYTES) {
		return {
			isSuccess: false,
			message: "File too large. Maximum allowed size is 5MB.",
		};
	}

	const imgArrayBuffer = await plainFiles.arrayBuffer();
	const wallpaperName = `${nanoid()}.jpeg`;

	try {
		await sharp(imgArrayBuffer)
			.resize({ width: 240, height: 240 })
			.jpeg({ quality: 87, mozjpeg: true })
			.toFile(`public/upload/wallpaper/${wallpaperName}`);
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Image processing failed 😢",
		};
	}

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
			message: "Wallpaper Created Successfully 👍",
		};
	} catch (error) {
		console.error(error);

		await rm(`./public/upload/wallpaper/${wallpaperName}`, { force: true });

		return {
			isSuccess: false,
			message: "Wallpaper Create failed 😢",
		};
	}
};

export default createWallpaper;
