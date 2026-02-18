"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ArrowDownToLine, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Prisma } from "../../generated/prisma";
import DeleteButton from "./DeleteButton";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { Card, CardContent } from "./shadcnui/card";

type WallpaperCardProp = {
	wallpaper: Prisma.WallpaperGetPayload<{
		include: {
			user: {
				select: {
					id: true;
					name: true;
					image: true;
				};
			};
			category: true;
		};
	}>;
};

const WallpaperCard = ({
	wallpaper: { image, createdAt, user, id, category, userId },
}: WallpaperCardProp) => {
	const [isLoading, setIsLoading] = useState(false);

	const userName = user.name;
	const nameArray = userName.split(" ");
	const charactersArray = nameArray.map((n) => {
		return n.charAt(0);
	});

	const downloadHandeler = async () => {
		setIsLoading(true);

		setIsLoading(false);
	};

	return (
		<Card className="max-w-lg">
			<CardContent className="relative">
				<div className="flex h-20 items-start justify-between">
					<div className="flex gap-4">
						{
							<Link href={`/user/${user.id}`}>
								<Avatar className="h-14 w-14">
									<AvatarImage src={`/upload/avatar/${user.image}`} />
									<AvatarFallback>{charactersArray.join("")}</AvatarFallback>
								</Avatar>
							</Link>
						}

						<div>
							<div className="text-xl">{user.name}</div>
							<div className="text-neutral-400">
								{format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}
							</div>
						</div>
					</div>

					<DeleteButton
						wallpaperImg={image}
						wallpaperOwnerId={userId}
						wallpaperId={id}
					/>
				</div>

				<Image
					src={`/upload/wallpaper/${image}`}
					alt="wallpaperImg"
					height={460}
					width={460}
					className="h-[460px] w-[460px] rounded-3xl object-cover"
				/>

				<div className="flex h-20 items-end justify-between">
					<Button
						asChild
						variant={"secondary"}
						className="rounded-2xl">
						<Link
							href={`/category/${category.categorySlug}`}
							className="hover:underline">
							# {category.categoryName}
						</Link>
					</Button>

					<div className="flex flex-col gap-3">
						<h1 className="text-neutral-400">
							{formatDistanceToNow(new Date(createdAt), {
								addSuffix: true,
								includeSeconds: true,
							})}
						</h1>

						<Button
							asChild
							onClick={downloadHandeler}
							disabled={isLoading}
							variant={"outline"}
							className="cursor-pointer border-2 border-black dark:border-white">
							<a
								href={`/upload/wallpaper/${image}`}
								download>
								{isLoading ? (
									<div className="flex items-center gap-1 text-green-500">
										<Loader2Icon className="animate-spin" />
										Downloading...
									</div>
								) : (
									<div className="flex items-center gap-1">
										<ArrowDownToLine className="animate-bounce" /> Download
									</div>
								)}
							</a>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default WallpaperCard;
