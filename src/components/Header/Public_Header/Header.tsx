import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";
import SessionNavbar from "./SessionNavbar";
import { Suspense } from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
	return (
		<header
			className="fixed z-50 w-full border-b backdrop-blur-md"
			aria-label="app-header">
			<div className="container mx-auto flex items-center justify-between px-6 py-3">
				<Link href={"/"}>
					<h1
						className="text-2xl font-semibold"
						aria-label="App Name">
						Wallpaper App
					</h1>
				</Link>

				<nav className="flex items-center">
					{/* Desktop Nav */}
					<div className="hidden items-center gap-6 sm:flex md:flex">
						<Suspense
							fallback={
								<div className="bg-muted h-9 w-20 animate-pulse rounded-md" />
							}>
							<SessionNavbar />
						</Suspense>

						<ThemeToggleButton />
					</div>

					{/* Mobile: ThemeToggle + Hamburger */}
					<div className="flex items-center gap-4 sm:hidden">
						<ThemeToggleButton />

						<MobileMenu
							sessionNavbar={
								<Suspense
									fallback={
										<div className="bg-muted h-9 w-20 animate-pulse rounded-md" />
									}>
									<SessionNavbar />
								</Suspense>
							}
						/>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
