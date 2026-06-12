import WallpaperCard from "@/components/WallpaperCard";
import Pagination from "@/components/Pagination";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { WALLPAPER_PAGE_SIZE } from "@/lib/constants";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Private Wallpaper | Wallpaper Studio App",
	description: "Private Wallpaper page of Wallpaper Studio App",
};

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/auth/login");
	}

	const { user } = session;

	const { page: pageParam } = await searchParams;
	const parsedPage = parseInt(pageParam ?? "1", 10);
	const rawPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

	let userWallpapers: Awaited<ReturnType<typeof prisma.wallpaper.findMany<{ include: { user: true; category: true } }>>> = [];
	let totalCount = 0;
	let totalPages = 1;
	let currentPage = rawPage;

	try {
		totalCount = await prisma.wallpaper.count({
			where: { userId: user.id },
		});
		totalPages = Math.max(1, Math.ceil(totalCount / WALLPAPER_PAGE_SIZE));
		currentPage = Math.min(rawPage, totalPages);

		userWallpapers = await prisma.wallpaper.findMany({
			where: {
				userId: user.id,
			},
			include: {
				user: true,
				category: true,
			},
			skip: (currentPage - 1) * WALLPAPER_PAGE_SIZE,
			take: WALLPAPER_PAGE_SIZE,
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		console.error("Database query error:", error);
	}

	return (
		<div className="space-y-16">
			<section className="grid grid-cols-1 gap-6 sm:grid-cols-2">

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

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default page;
