"use client";

import createWallpaper from "@/hooks/server/createWallpaper";
import { authClient } from "@/lib/betterAuth/auth-client";
import { SelectCategoryType } from "@/lib/types";
import { selectCategorySchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2Icon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../shadcnui/select";

export type WallpaperFormProps = {
	categoryArray: {
		categoryId: string;
		categoryName: string;
	}[];
};

const WallpaperForm = ({ categoryArray }: WallpaperFormProps) => {
	const [isFile, setIsFile] = useState(false);

	const { push } = useRouter();

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

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(selectCategorySchema),
		defaultValues: {
			selectCategory: "",
		},
	});

	const wallpaperHandeler = async ({ selectCategory }: SelectCategoryType) => {
		const { data } = await authClient.getSession();

		if (data === null) {
			return;
		}

		const {
			user: { id },
		} = data;

		const { isSuccess, message } = await createWallpaper(
			selectCategory,
			plainFiles[0],
			id,
		);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			push("/dashboard");
			reset();
		}
	};

	return (
		<>
			<div className="grid gap-4">
				{!isFile && (
					<div className="grid gap-2">
						<Image
							src={"https://placehold.co/600x400/png"}
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

						{errors[0] && (
							<div className="text-destructive text-center text-sm">
								File is Too large (5mb)
							</div>
						)}

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
										{categoryArray.map(({ categoryId, categoryName }) => (
											<SelectItem
												key={categoryId}
												value={categoryId}>
												{categoryName}
											</SelectItem>
										))}
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
						disabled={isSubmitting || !isDirty || !plainFiles[0]}>
						{isSubmitting ? (
							<>
								<Loader2Icon className="animate-spin" /> Creating...
							</>
						) : (
							<>
								<UploadIcon /> Create
							</>
						)}
					</Button>
				</form>
			</div>
		</>
	);
};

export default WallpaperForm;
