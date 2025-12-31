"use client";

import { Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Card, CardContent } from "./shadcnui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./shadcnui/button";
import { Prisma } from "../../generated/prisma";

type WallpaperCardProp = {
	wallpaper: Prisma.WallpaperGetPayload<{
		include: {
			user: true;
			category: true;
		};
	}>;
};

const WallpaperCard = ({
	wallpaper: {
		image,
		createdAt,
		updatedAt,
		categoryCategoryId,
		user,
		id,
		category,
	},
}: WallpaperCardProp) => {
	return (
		<>
			<Card className="max-w-lg">
				<CardContent className="relative">
					<div className="flex h-20 items-start justify-between">
						<div className="flex gap-4">
							{/* Avatar */}
							<Avatar className="h-14 w-14">
								<AvatarImage src={`/upload/avatar/${user.image}`} />
								<AvatarFallback>cn</AvatarFallback>
							</Avatar>

							<div className="">
								<div className="text-xl">{user.name}</div>
								<div className="text-neutral-400">31/12/2025 </div>
							</div>
						</div>

						<button className="cursor-pointer text-red-600">
							<Trash2Icon size={20} />
						</button>
					</div>

					<Image
						src={`/upload/wallpaper/${image}`}
						alt="wallpaperImg"
						height={460}
						width={460}
						className="h-[460px] w-[460px] rounded-3xl object-cover"
					/>

					<div className="flex h-20 items-end justify-between">
						<button className="rounded-2xl">
							<Link href={"#"}> # {category.categoryName}</Link>
						</button>

						<div className="flex flex-col gap-3">
							<h1 className="text-neutral-400">12 days ago</h1>
							<Button
								variant={"outline"}
								className="cursor-pointer border-2 border-black">
								Download
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default WallpaperCard;
