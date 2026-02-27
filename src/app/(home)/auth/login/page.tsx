import LoginForm from "@/components/Forms/LoginForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Login | Wallpaper Studio App",
	description: "Login page of Wallpaper Studio App",
};

const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<Card className="w-full max-w-md drop-shadow-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
				<CardHeader className="gap-3">
					<CardTitle className="text-center text-2xl font-semibold sm:text-3xl">
						Welcome back !
					</CardTitle>

					<CardDescription className="text-center text-lg leading-5">
						Enter your email below to login your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<LoginForm />
				</CardContent>

				<CardFooter className="grid place-items-center text-lg font-light sm:text-xl">
					You don&apos;t have an account?
					<div>
						Please
						<Link
							href={"/auth/register"}
							className="mx-2 text-blue-600 underline hover:font-normal">
							Register
						</Link>
						Now.
					</div>
				</CardFooter>
			</Card>
		</section>
	);
};

export default page;
