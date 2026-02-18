"use client";

import updateProfile from "@/hooks/server/updateProfile";
import { NameType } from "@/lib/types";
import { nameSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PencilLineIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

type ProfileFormProps = {
	userName: string;
};

const ProfileForm = ({ userName }: ProfileFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(nameSchema),

		defaultValues: {
			name: userName,
		},

		mode: "all",
	});

	const nameHandeler = async (name: NameType) => {
		const { isSuccess, message } = await updateProfile(name);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			reset(name);
			setIsEditing(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(nameHandeler)}
				className="grid gap-6"
				noValidate>
				{/* Name field */}
				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Name</FieldLabel>
							<div className="relative">
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="Enter your name"
									autoComplete="name"
									disabled={!isEditing}
								/>

								<button
									onClick={() => {
										setIsEditing(true);
									}}
									type="button"
									className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer">
									<PencilLineIcon size={18} />
								</button>
							</div>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Button
					className="w-full cursor-pointer"
					type="submit"
					disabled={!isDirty || isSubmitting}>
					{isSubmitting ? (
						<>
							<Loader2Icon className="animate-spin" />
							Updating...
						</>
					) : (
						<>
							<PencilLineIcon />
							Update
						</>
					)}
				</Button>
			</form>
		</>
	);
};

export default ProfileForm;
