"use server";

import sharp from "sharp";
import { nanoid } from "nanoid";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024; // 5MB

const ALLOWED_MIME_TYPES: Record<string, string> = {
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/webp": "webp",
};

const updateAvatar = async (imgFile: File, defaultImage: string) => {
	if (!imgFile.type || !(imgFile.type in ALLOWED_MIME_TYPES)) {
		return {
			isSuccess: false,
			message: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
		};
	}

	if (imgFile.size > MAX_AVATAR_BYTES) {
		return {
			isSuccess: false,
			message: "File too large. Maximum allowed size is 5MB.",
		};
	}

	try {
		if (defaultImage !== "avatar.png") {
			await rm(`public/upload/avatar/${defaultImage}`);
		}

		const imgArrayBuffer = await imgFile.arrayBuffer();

		const imageName = `${nanoid()}.jpeg`;

		await sharp(imgArrayBuffer)
			.resize({ width: 240, height: 240 })
			.jpeg({ quality: 87, mozjpeg: true })
			.toFile(`public/upload/avatar/${imageName}`);

		await auth.api.updateUser({
			body: { image: imageName },
			headers: await headers(),
		});

		revalidatePath("/", "layout");

		return {
			isSuccess: true,
			message: "Avatar uploaded successfully 👍",
		};
	} catch (error) {
		console.error(error);

		return {
			isSuccess: false,
			message: "Image upload failed 😢",
		};
	}
};

export default updateAvatar;
