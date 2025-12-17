"use client";

import { Loader2Icon, LogOutIcon } from "lucide-react";
import { Button } from "./shadcnui/button";
import { useState } from "react";
import signout from "@/hooks/signout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const [loading, setLoading] = useState(false);

	const { replace } = useRouter();

	const logoutBtnFn = async () => {
		setLoading(true);

		await new Promise((r) => setTimeout(r, 1500));

		const { isSuccess, message } = await signout();

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);

			replace("/auth/login");
		}

		setLoading(false);
	};

	return (
		<Button
			onClick={logoutBtnFn}
			disabled={loading}
			type="button"
			variant={"destructive"}
			className="cursor-pointer">
			{loading ? (
				<>
					<Loader2Icon className="animate-spin" /> Logging out...
				</>
			) : (
				<>
					<LogOutIcon /> Logout
				</>
			)}
		</Button>
	);
};

export default LogoutButton;
