import Footer from "@/components/Header/Dashboard_Header/Footer";
import Header from "@/components/Header/Dashboard_Header/Header";
import { auth } from "@/lib/betterAuth/auth";
import { PageLayoutProps } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: PageLayoutProps) => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			redirect("/auth/login");
		}
	} catch (error) {
		console.error("Dashboard auth error:", error);
		redirect("/auth/login");
	}

	return (
		<>
			<Header />
			<main className="mx-auto max-w-7xl px-6 pt-20 pb-20 sm:pb-0">{children}</main>
			<Footer />
		</>
	);
};

export default layout;
