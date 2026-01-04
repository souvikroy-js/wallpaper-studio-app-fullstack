import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/database/dbClient";

type CidPageProps = {
	params: Promise<{ cId: string }>;
};

const page = async ({ params }: CidPageProps) => {
	const { cId } = await params;

	const categoryWallpapers = await prisma.wallpaper.findMany({
		include: {
			user: true,
			category: true,
		},
		where: {
			category: { categorySlug: cId },
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
