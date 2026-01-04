import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/database/dbClient";
import { notFound } from "next/navigation";

type CategoryPageProps = {
	params: Promise<{ cSlug: string }>;
};

export const generateMetadata = async ({ params }: CategoryPageProps) => {
	const { cSlug } = await params;

	try {
		const { categoryName } = await prisma.category.findUniqueOrThrow({
			where: {
				categorySlug: cSlug,
			},
			select: {
				categoryName: true,
			},
		});

		return {
			title: `${categoryName} Wallpapers | Wallpaper App`,
			description: `${categoryName} Wallpapers page of Wallpaper App`,
		};
	} catch (error) {
		console.error(error);

		return notFound();
	}
};

const page = async ({ params }: CategoryPageProps) => {
	const { cSlug } = await params;

	const categoryWallpapers = await prisma.wallpaper.findMany({
		include: {
			user: true,
			category: true,
		},
		where: {
			category: { categorySlug: cSlug },
		},
	});

	return (
		<>
			<section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{categoryWallpapers.map((wallpaperData) => (
					<WallpaperCard
						key={wallpaperData.id}
						wallpaper={wallpaperData}
					/>
				))}
			</section>
		</>
	);
};

export default page;
