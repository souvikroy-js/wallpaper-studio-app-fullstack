import deleteWallpaper from "@/hooks/server/deleteWallpaper";
import { authClient } from "@/lib/betterAuth/auth-client";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./shadcnui/button";

type DeleteButtonProps = {
	wallpaperOwnerId: string;
	wallpaperId: string;
};

const DeleteButton = ({ wallpaperOwnerId, wallpaperId }: DeleteButtonProps) => {
	const [isDelLoading, setIsDelLoading] = useState(false);

	const { data } = authClient.useSession();

	if (!data) {
		return null;
	}

	const {
		user: { id },
	} = data;

	if (id !== wallpaperOwnerId) return null;

	const wallpaperDeleteHandler = async () => {
		setIsDelLoading(true);

		try {
			const { isSuccess, message } = await deleteWallpaper(wallpaperId);

			if (!isSuccess) {
				toast.error(message);
			}

			if (isSuccess) {
				toast.success(message);
			}
		} catch {
			toast.error("Wallpaper delete failed 😢");
		} finally {
			setIsDelLoading(false);
		}
	};

	return (
		<Button
			onClick={wallpaperDeleteHandler}
			disabled={isDelLoading}
			variant={"outline"}
			className="cursor-pointer border-2 border-red-500 text-red-500 dark:border-red-500">
			{isDelLoading ? (
				<>
					<Loader2Icon className="animate-spin" /> Deleting...
				</>
			) : (
				<>
					<Trash2Icon /> Delete
				</>
			)}
		</Button>
	);
};

export default DeleteButton;
