import Header from "@/components/Header/Public_Header/Header";
import { PageLayoutProps } from "@/lib/types";

const layout = ({ children }: PageLayoutProps) => {
	return (
		<>
			<Header />

			<main className="mx-auto max-w-7xl px-6 py-24">{children}</main>
		</>
	);
};

export default layout;
