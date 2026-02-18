"use client";

import { dialogDrawerAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../shadcnui/dialog";
import CategoryForm from "./CategoryForm";

const CreateCategoryForm = () => {
	const [open, setOpen] = useAtom(dialogDrawerAtom);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="cursor-pointer text-blue-500 underline">
					Create Now
				</button>
			</DialogTrigger>

			<DialogContent
				aria-describedby={undefined}
				className="sm:max-w-[425px]">
				<DialogHeader className="flex items-center">
					<DialogTitle>Create Category</DialogTitle>
				</DialogHeader>

				<div>
					<CategoryForm />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCategoryForm;
