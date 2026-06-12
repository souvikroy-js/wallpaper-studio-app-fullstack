import WallpaperCard from "@/components/WallpaperCard";
import Pagination from "@/components/Pagination";
import prisma from "@/lib/database/dbClient";
import { WALLPAPER_PAGE_SIZE } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Wallpaper | Wallpaper Studio App",
	description: "Public Wallpaper page of Wallpaper Studio App",
};

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) => {
	const { page: pageParam } = await searchParams;
	const parsedPage = parseInt(pageParam ?? "1", 10);
	const rawPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

	let allWallpapers: Awaited<ReturnType<typeof prisma.wallpaper.findMany<{ include: { user: { select: { id: true; name: true; image: true } }; category: true } }>>> = [];
	let totalCount = 0;
	let totalPages = 1;
	let currentPage = rawPage;

	try {
		totalCount = await prisma.wallpaper.count();
		totalPages = Math.max(1, Math.ceil(totalCount / WALLPAPER_PAGE_SIZE));
		currentPage = Math.min(rawPage, totalPages);

		allWallpapers = await prisma.wallpaper.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
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
				{allWallpapers.length === 0 ? (
					<p className="col-span-full text-center text-gray-500">
						No wallpapers found 🙂
					</p>
				) : (
					allWallpapers.map((wallpaperData) => (
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
