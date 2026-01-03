import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/database/dbClient";

type UidPageProps = {
	params: Promise<{ uId: string }>;
};

const page = async ({ params }: UidPageProps) => {
	const { uId } = await params;

	const dynamicUserWallpapers = await prisma.wallpaper.findMany({
		where: {
			userId: uId,
		},
		include: {
			user: true,
			category: true,
		},
	});

	return (
		<>
			<section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{dynamicUserWallpapers.map((wallpaperData) => (
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
