"use server";

import prisma from "@/lib/database/dbClient";

const createCategory = async (category: string) => {
	console.log(category);

	try {
		await prisma.category.create({
			data: {
				categoryName: category,
				categorySlug: category.toLowerCase(),
			},
		});
		return {
			isSuccess: true,
			message: "Category created Succesfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Category create failed 😢",
		};
	}
};

export default createCategory;
