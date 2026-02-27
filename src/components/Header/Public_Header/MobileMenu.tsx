"use client";

import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

const MobileMenu = ({ sessionNavbar }: { sessionNavbar: ReactNode }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			{/* Hamburger Button */}
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className="cursor-pointer">
				{menuOpen ? <X /> : <AlignJustify />}
			</button>

			{/* Mobile Dropdown Links */}
			{menuOpen && (
				<div
					onClick={() => setMenuOpen(false)}
					className="absolute left-0 mt-51 flex w-full flex-col items-center justify-center gap-4 bg-gray-100 py-4 sm:hidden dark:bg-neutral-900">
					<Link
						href={"/"}
						className="hover:underline">
						Home
					</Link>
					{sessionNavbar}
				</div>
			)}
		</>
	);
};

export default MobileMenu;
