import CreateCategoryForm from "@/components/Forms/CreateCategoryForm";
import WallpaperForm from "@/components/Forms/WallpaperForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import prisma from "@/lib/database/dbClient";

const page = async () => {
	let allCategory: Awaited<ReturnType<typeof prisma.category.findMany>> = [];

	try {
		allCategory = await prisma.category.findMany();
	} catch (err) {
		console.error("[page] prisma.category.findMany() failed:", err);
		return (
			<section className="grid h-[90dvh] place-items-center">
				<p className="text-destructive text-lg font-medium">
					Failed to load categories. Please try again later.
				</p>
			</section>
		);
	}

	return (
		<section className="grid h-[90dvh] place-items-center">
			<Card className="drop-shadow-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
				<CardHeader className="gap-3">
					<CardTitle className="text-center text-3xl font-semibold">
						Create Wallpaper
					</CardTitle>
				</CardHeader>

				<CardContent>
					<WallpaperForm categoryArray={allCategory} />
				</CardContent>

				<CardFooter className="grid place-items-center text-xl font-light">
					Missing a category?
					<CreateCategoryForm />
				</CardFooter>
			</Card>
		</section>
	);
};

export default page;
