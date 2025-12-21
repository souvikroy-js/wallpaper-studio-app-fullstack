"use client";

import Image from "next/image";
import { Button } from "../shadcnui/button";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { ImageIcon } from "lucide-react";

type AvatarFormProps = {
	previousImage: string;
};

const AvatarForm = ({ previousImage }: AvatarFormProps) => {
	console.log(previousImage);

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
			<div className="">
				{!isFile && (
					<div className="grid justify-center gap-2">
						<Image
							// src={`/upload/avatar/${previousImage}`}
							src="https://placehold.co/1920x1080"
							alt="Avatar Image"
							width={240}
							height={240}
							className="aspect-square h-60 w-60 rounded-full object-cover"
						/>

						<Button
							onClick={openFilePicker}
							className="cursor-pointer">
							<ImageIcon />
							Choose Image
						</Button>
					</div>
				)}

				{isFile && (
					<div className="grid justify-center gap-2">
						{filesContent.map((file, idx) => (
							<Image
								key={idx}
								src={file.content}
								alt={file.name}
								width={240}
								height={240}
								className="aspect-square h-60 w-60 rounded-full object-cover"
							/>
						))}

						<div className="grid grid-cols-2 gap-2">
							<Button
								onClick={clear}
								className="cursor-pointer">
								Discard
							</Button>

							<Button className="cursor-pointer">Uplode</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default AvatarForm;
