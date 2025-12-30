"use client";

import { dialogDrawerAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../shadcnui/dialog";
import CategoryForm from "./CategoryForm";

const CreateCategoryForm = () => {
	const [open, setOpen] = useAtom(dialogDrawerAtom);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			{/* <DialogTrigger asChild> */}
			<button
				onClick={() => setOpen(true)}
				className="cursor-pointer text-blue-500 underline">
				Create Now
			</button>
			{/* </DialogTrigger> */}
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
