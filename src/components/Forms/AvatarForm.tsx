"use client";

import Image from "next/image";
import { Button } from "../shadcnui/button";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { ImageIcon, TrashIcon, UploadIcon } from "lucide-react";
import updateAvatar from "@/hooks/server/updateAvatar";
import { toast } from "react-toastify";

type AvatarFormProps = {
	previousImage: string;
};

const AvatarForm = ({ previousImage }: AvatarFormProps) => {
	const [isFile, setIsFile] = useState(false);

	const [isLoader, setIsLoader] = useState(false);

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

	const uploadBtnFn = async () => {
		setIsLoader(true);
		await new Promise((r) => setTimeout(r, 1500));

		const { isSuccess, massage } = await updateAvatar(
			plainFiles[0],
			previousImage,
		);

		if (!isSuccess) {
			toast.error(massage);
		}

		if (isSuccess) {
			toast.success(massage);
			clear();
		}

		setIsLoader(false);
	};

	return (
		<>
			<div className="">
				{!isFile && (
					<div className="grid justify-center gap-2">
						<Image
							src={`/upload/avatar/${previousImage}`}
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
								<TrashIcon /> Discard
							</Button>

							<Button
								onClick={uploadBtnFn}
								className="cursor-pointer">
								{isLoader ? (
									<> Uploading...</>
								) : (
									<>
										<UploadIcon /> Upload
									</>
								)}
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default AvatarForm;
