"use client";

import { SelectCategoryType } from "@/lib/types";
import { selectCategorySchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, LoaderIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../shadcnui/select";

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

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isDirty },
	} = useForm({
		resolver: zodResolver(selectCategorySchema),
		defaultValues: {
			selectCategory: "",
		},
	});

	const wallpaperHandeler = (selectCategory: SelectCategoryType) => {
		console.log(plainFiles);
		console.log(selectCategory);
	};

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
							<ImageIcon /> Choose Wallpaper
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

				<form
					onSubmit={handleSubmit(wallpaperHandeler)}
					className="grid gap-6"
					noValidate>
					{/* category field */}
					<Controller
						name="selectCategory"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									Category<span className="font-bold text-red-500">*</span>
								</FieldLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Choose category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="engineering">Engineering</SelectItem>
									</SelectContent>
								</Select>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Button
						className="w-full cursor-pointer"
						type="submit"
						disabled={isSubmitting || !isDirty}>
						{isSubmitting ? (
							<>
								<LoaderIcon className="animate-spin" /> Submitting...
							</>
						) : (
							<>
								<UploadIcon /> Submit
							</>
						)}
					</Button>
				</form>
			</div>
		</>
	);
};

export default WallpaperForm;
