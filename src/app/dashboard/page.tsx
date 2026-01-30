import WallpaperCard from "@/components/WallpaperCard";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Privat Wallpaper | Wallpaper Studio App",
	description: "Privat Wallpaper page of Wallpaper Studio App",
};

const page = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/auth/login");
	}

	const { user } = session;

	const userWallpapers = await prisma.wallpaper.findMany({
		where: {
			userId: user.id,
		},
		include: {
			user: true,
			category: true,
		},
	});

	return (
		<section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{userWallpapers.length === 0 ? (
				<p className="col-span-full text-center text-gray-500">
					No wallpapers found 🙂
				</p>
			) : (
				userWallpapers.map((wallpaperData) => (
					<WallpaperCard
						key={wallpaperData.id}
						wallpaper={wallpaperData}
					/>
				))
			)}
		</section>
	);
};

export default page;
