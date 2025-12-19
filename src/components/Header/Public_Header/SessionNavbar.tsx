import { Button } from "@/components/shadcnui/button";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import Link from "next/link";

const SessionNavbar = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		return (
			<Button
				asChild
				variant={"outline"}>
				<Link
					href={"/dashboard"}
					className="hover:underline">
					Dashboard
				</Link>
			</Button>
		);
	}

	return (
		<>
			<Button
				asChild
				variant={"outline"}>
				<Link
					href={"/auth/login"}
					className="hover:underline">
					Login
				</Link>
			</Button>
			<Button
				asChild
				variant={"outline"}>
				<Link
					href={"/auth/register"}
					className="hover:underline">
					Register
				</Link>
			</Button>
		</>
	);
};

export default SessionNavbar;
