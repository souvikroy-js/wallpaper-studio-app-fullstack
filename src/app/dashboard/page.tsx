import WallpaperCard from "@/components/WallpaperCard";
import Pagination from "@/components/Pagination";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Private Wallpaper | Wallpaper Studio App",
	description: "Private Wallpaper page of Wallpaper Studio App",
};

const PAGE_SIZE = 2;

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
	const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

	const [userWallpapers, totalCount] = await prisma.$transaction([
		prisma.wallpaper.findMany({
			where: {
				userId: user.id,
			},
			include: {
				user: true,
				category: true,
			},
			skip: (currentPage - 1) * PAGE_SIZE,
			take: PAGE_SIZE,
			orderBy: { createdAt: "desc" },
		}),
		prisma.wallpaper.count({
			where: {
				userId: user.id,
			},
		}),
	]);

	const totalPages = Math.ceil(totalCount / PAGE_SIZE);

	return (
		<div className="space-y-16">
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

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default page;
