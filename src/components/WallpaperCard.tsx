"use client";

import delayTime from "@/lib/delayTime";
import { ArrowDownToLine, Loader2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Prisma } from "../../generated/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { Card, CardContent } from "./shadcnui/card";
import deleteWallpaper from "@/hooks/server/deleteWallpaper";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

type WallpaperCardProp = {
	wallpaper: Prisma.WallpaperGetPayload<{
		include: {
			user: true;
			category: true;
		};
	}>;
};

const WallpaperCard = ({
	wallpaper: { image, createdAt, user, id, category },
}: WallpaperCardProp) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDelLoading, setIsDelLoading] = useState(false);

	const userName = user.name;
	const nameArray = userName.split(" ");
	const charactersArray = nameArray.map((n) => {
		return n.charAt(0);
	});

	const downloadHandeler = async () => {
		setIsLoading(true);
		await delayTime(500);
		setIsLoading(false);
	};

	const wallpaperDeleteHandler = async () => {
		setIsDelLoading(true);
		await delayTime(1500);

		const { isSuccess, message } = await deleteWallpaper(id, image);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
		}
		setIsDelLoading(false);
	};

	return (
		<>
			<Card className="max-w-lg">
				<CardContent className="relative">
					<div className="flex h-20 items-start justify-between">
						<div className="flex gap-4">
							{/* Avatar */}
							{
								<Link href={`/user/${user.id}`}>
									<Avatar className="h-14 w-14">
										<AvatarImage src={`/upload/avatar/${user.image}`} />
										<AvatarFallback>{charactersArray.join("")}</AvatarFallback>
									</Avatar>
								</Link>
							}

							<div className="">
								<div className="text-xl">{user.name}</div>
								<div className="text-neutral-400">
									{format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}
								</div>
							</div>
						</div>

						<Button
							onClick={wallpaperDeleteHandler}
							disabled={isDelLoading}
							variant={"outline"}
							className="cursor-pointer border-2 border-red-500 text-red-500 dark:border-red-500">
							{isDelLoading ? (
								<>
									<Loader2Icon className="animate-spin" /> Deleting...
								</>
							) : (
								<>
									<Trash2Icon /> Delete
								</>
							)}
						</Button>
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
							variant={"secondary"}
							className="rounded-2xl">
							<Link
								href={`/category/${category.categoryId}`}
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
								onClick={downloadHandeler}
								disabled={isLoading}
								variant={"outline"}
								className="cursor-pointer border-2 border-black dark:border-white">
								<a
									href={`/upload/wallpaper/${image}`}
									download={true}>
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
		</>
	);
};

export default WallpaperCard;
