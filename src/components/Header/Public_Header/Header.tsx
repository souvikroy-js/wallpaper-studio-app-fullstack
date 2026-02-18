import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";
import SessionNavbar from "./SessionNavbar";
import { Suspense } from "react";

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
						href={"/"}
						className="hover:underline">
						Home
					</Link>

					<Suspense
						fallback={
							<div className="bg-muted h-9 w-20 animate-pulse rounded-md" />
						}>
						<SessionNavbar />
					</Suspense>

					<ThemeToggleButton />
				</nav>
			</div>
		</header>
	);
};

export default Header;
