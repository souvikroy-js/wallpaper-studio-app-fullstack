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

		const { isSuccess, message } = await signout();

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			replace("/auth/login");
			return;
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
					<Loader2Icon className="animate-spin" />
					<span className="hidden sm:inline">Logging out...</span>
				</>
			) : (
				<>
					<LogOutIcon />
					<span className="hidden sm:inline">Logout</span>
				</>
			)}
		</Button>
	);
};

export default LogoutButton;
