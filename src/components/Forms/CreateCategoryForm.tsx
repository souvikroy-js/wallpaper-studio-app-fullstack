"use client";

import { dialogDrawerAtom } from "@/lib/atom";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../shadcnui/dialog";
import CategoryForm from "./CategoryForm";
import { useAtom } from "jotai";

const CreateCategoryForm = () => {
	const [open, setOpen] = useAtom(dialogDrawerAtom);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger className="cursor-pointer text-blue-500 underline">
				Create Now
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Category</DialogTitle>

					<DialogDescription className="hidden"></DialogDescription>
				</DialogHeader>

				<div className="">
					<CategoryForm />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCategoryForm;
