import WallpaperCard from "@/components/WallpaperCard";
import Pagination from "@/components/Pagination";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Wallpaper | Wallpaper Studio App",
	description: "Public Wallpaper page of Wallpaper Studio App",
};

const PAGE_SIZE = 2;

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) => {
	const { page: pageParam } = await searchParams;
	const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

	const [allWallpapers, totalCount] = await prisma.$transaction([
		prisma.wallpaper.findMany({
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
			skip: (currentPage - 1) * PAGE_SIZE,
			take: PAGE_SIZE,
			orderBy: { createdAt: "desc" },
		}),
		prisma.wallpaper.count(),
	]);

	const totalPages = Math.ceil(totalCount / PAGE_SIZE);

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
