"use client";

import Image from "next/image";
import { Button } from "../shadcnui/button";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
	ImageIcon,
	LoaderCircleIcon,
	TrashIcon,
	UploadIcon,
} from "lucide-react";
import updateAvatar from "@/hooks/server/updateAvatar";
import { toast } from "react-toastify";
import { FileSizeValidator } from "use-file-picker/validators";

type AvatarFormProps = {
	defaultImage: string;
};

const AvatarForm = ({ defaultImage }: AvatarFormProps) => {
	const [isFile, setIsFile] = useState(false);

	const [isLoader, setIsLoader] = useState(false);

	const { openFilePicker, filesContent, clear, plainFiles, errors } =
		useFilePicker({
			readAs: "DataURL",
			accept: "image/*",
			multiple: false,
			validators: [
				new FileSizeValidator({
					maxFileSize: 5 * 1024 * 1024,
				}),
			],

			onFilesSuccessfullySelected: () => setIsFile(true),
			onClear: () => setIsFile(false),
		});

	const uploadBtnFn = async () => {
		setIsLoader(true);
		await new Promise((r) => setTimeout(r, 1500));

		const { isSuccess, message } = await updateAvatar(
			plainFiles[0],
			defaultImage,
		);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
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
							src={`/upload/avatar/${defaultImage}`}
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

						{errors[0] && (
							<div className="text-destructive text-center text-sm">
								File is Too large (5mb)
							</div>
						)}

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
									<>
										<LoaderCircleIcon className="animate-spin" /> Uploading...
									</>
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
