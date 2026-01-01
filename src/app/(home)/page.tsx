import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Wallpaper | Wallpaper Studio App",
	description: "Public Wallpaper page of Wallpaper Studio App",
};

const page = async () => {
	const allWallpapers = await prisma.wallpaper.findMany({
		include: {
			user: true,
			category: true,
		},
	});

	return (
		<section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{allWallpapers.map((wallpaperData) => (
				<WallpaperCard
					key={wallpaperData.id}
					wallpaper={wallpaperData}
				/>
			))}
		</section>
	);
};

export default page;
