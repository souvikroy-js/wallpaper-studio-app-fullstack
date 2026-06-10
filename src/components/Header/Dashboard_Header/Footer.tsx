import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="fixed right-0 bottom-0 left-0 z-40 border-t bg-white sm:hidden dark:bg-black" aria-label="Footer">
			<nav className="flex items-center justify-around px-6 py-3" aria-label="Primary dashboard navigation">
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
				<LogoutButton />
			</nav>
		</footer>
	);
};

export default Footer;
