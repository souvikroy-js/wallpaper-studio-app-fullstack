"use server";
import sharp from "sharp";
import { nanoid } from "nanoid";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const updateAvatar = async (imgFile: File, previousImage: string) => {
	try {
		if (previousImage !== "avatar.png") {
			await rm(`public/upload/avatar/${previousImage}`);
		}

		const imgArrayBuffer = await imgFile.arrayBuffer();

		const imageName = `${nanoid()}.jpeg`;

		await sharp(imgArrayBuffer)
			.resize({
				width: 240,
				height: 240,
			})
			.jpeg({
				quality: 87,
				mozjpeg: true,
			})
			.toFile(`public/upload/avatar/${imageName}`);

		await auth.api.updateUser({
			body: {
				image: imageName,
			},

			headers: await headers(),
		});

		revalidatePath("/", "layout");

		return {
			isSuccess: true,
			massage: "Image uploaded Succesfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			massage: "Image upload failed 😢",
		};
	}
};

export default updateAvatar;
