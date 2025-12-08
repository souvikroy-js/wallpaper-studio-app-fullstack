"use client";

import Image from "next/image";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { Button } from "../shadcnui/button";

const WallpaperForm = () => {
	const [isFile, setIsFile] = useState(false);

	const { openFilePicker, filesContent, clear, plainFiles } = useFilePicker({
		readAs: "DataURL",
		accept: "image/*",
		multiple: false,
		// validators: [
		// 	new FileSizeValidator({
		// 		maxFileSize: 5 * 1024 * 1024,
		// 	}),
		// ],

		onFilesSuccessfullySelected: () => setIsFile(true),
		onClear: () => setIsFile(false),
	});

	return (
		<>
			<div className="grid gap-4">
				{!isFile && (
					<div className="grid gap-2">
						<Image
							src={"https://placehold.co/1920x1080"}
							alt="Avatar Image"
							width={640}
							height={360}
							className="aspect-video h-[360px] w-[640px] rounded-sm object-cover"
						/>

						<Button
							onClick={openFilePicker}
							className="cursor-pointer">
							Chose Img
						</Button>
					</div>
				)}

				{isFile && (
					<div className="grid gap-2">
						{filesContent.map((file, idx) => (
							<Image
								key={idx}
								src={file.content}
								alt={file.name}
								width={640}
								height={360}
								className="aspect-video h-[360px] w-[640px] rounded-sm object-cover"
							/>
						))}

						<Button
							onClick={clear}
							className="cursor-pointer">
							Discard
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

export default WallpaperForm;
