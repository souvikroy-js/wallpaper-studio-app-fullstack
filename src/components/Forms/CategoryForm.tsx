import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Button } from "../shadcnui/button";
import { LoaderIcon, UploadIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/lib/zodSchema";
import { CreateCategoryType } from "@/lib/types";

const CategoryForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			createCategory: "",
		},
	});

	const categoryHandeler = (createCategory: CreateCategoryType) => {
		console.log(createCategory);
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(categoryHandeler)}
				className="grid gap-6"
				noValidate>
				{/* category field */}
				<Controller
					name="createCategory"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Category</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your category"
								autoComplete="category"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Button
					className="w-full cursor-pointer"
					type="submit"
					disabled={isSubmitting}>
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
		</>
	);
};

export default CategoryForm;
