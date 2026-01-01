"use client";

import {
	ArrowDownToLine,
	Download,
	Loader2Icon,
	Trash2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Card, CardContent } from "./shadcnui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./shadcnui/button";
import { Prisma } from "../../generated/prisma";
import delayTime from "@/lib/delayTime";
import { useState } from "react";

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
	const [isDownload, setIsDownload] = useState(false);

	const userName = user.name;
	const nameArray = userName.split(" ");
	const charactersArray = nameArray.map((n) => {
		return n.charAt(0);
	});

	const downloadHandeler = async () => {
		setIsDownload(true);
		await delayTime(500);
		setIsDownload(false);
	};

	return (
		<>
			<Card className="max-w-lg">
				<CardContent className="relative">
					<div className="flex h-20 items-start justify-between">
						<div className="flex gap-4">
							{/* Avatar */}
							<Avatar className="h-14 w-14">
								<AvatarImage src={`/upload/avatar/${user.image}`} />
								<AvatarFallback>{charactersArray.join("")}</AvatarFallback>
							</Avatar>

							<div className="">
								<div className="text-xl">{user.name}</div>
								<div className="text-neutral-400">31/12/2025 </div>
							</div>
						</div>

						{/* <button className="flex cursor-pointer gap-1 text-red-600">
							<Trash2Icon size={20} /> Delete
						</button> */}

						<Button
							variant={"outline"}
							className="border-2 border-red-500 text-red-500 dark:border-red-500">
							<Trash2Icon size={20} /> Delete
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
								href={"#"}
								className="hover:underline">
								# {category.categoryName}
							</Link>
						</Button>

						<div className="flex flex-col gap-3">
							<h1 className="text-neutral-400">12 days ago</h1>
							<Button
								onClick={downloadHandeler}
								variant={"outline"}
								className="cursor-pointer border-2 border-black dark:border-white">
								<a
									href={`/upload/wallpaper/${image}`}
									download={true}>
									{isDownload ? (
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
