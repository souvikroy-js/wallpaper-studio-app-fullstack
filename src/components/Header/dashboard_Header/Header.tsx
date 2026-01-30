import LogoutButton from "@/components/LogoutButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";
import ProfileNavAvatar from "./ProfileNavAvatar";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

const Header = () => {
	return (
		<header
			className="fixed right-0 left-0 z-50 border-b bg-white shadow dark:bg-black"
			aria-label="app-header">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
				<Link href={"/"}>
					<h1
						className="text-2xl font-semibold"
						aria-label="App Name">
						Wallpaper App
					</h1>
				</Link>

				<nav className="flex items-center gap-4">
					<Link
						href={"/dashboard"}
						className="hover:underline">
						Dashboard
					</Link>
					<Link
						href={"/dashboard/create"}
						className="hover:underline">
						Create
					</Link>
					<Link href={"/dashboard/profile"}>
						<Suspense
							fallback={
								<div className="flex h-8 w-8 items-center justify-center">
									<Loader2Icon
										height={32}
										width={32}
										className="animate-spin"
									/>
								</div>
							}>
							<ProfileNavAvatar />
						</Suspense>
					</Link>

					<LogoutButton />

					<ThemeToggleButton />
				</nav>
			</div>
		</header>
	);
};

export default Header;
