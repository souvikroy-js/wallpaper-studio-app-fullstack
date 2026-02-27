import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/database/dbClient";
import { notFound } from "next/navigation";

type UserPageProps = {
	params: Promise<{ uId: string }>;
};

export const generateMetadata = async ({ params }: UserPageProps) => {
	const { uId } = await params;

	try {
		const { name } = await prisma.user.findUniqueOrThrow({
			where: {
				id: uId,
			},
			select: {
				name: true,
			},
		});

		return {
			title: `${name} Wallpapers | Wallpaper App`,
			description: `${name} Wallpapers page of Wallpaper App`,
		};
	} catch (error) {
		console.error(error);

		return notFound();
	}
};

const page = async ({ params }: UserPageProps) => {
	const { uId } = await params;

	const userWallpapers = await prisma.wallpaper.findMany({
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
				{userWallpapers.map((wallpaperData) => (
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
