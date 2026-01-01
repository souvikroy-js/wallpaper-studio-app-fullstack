import RegisterForm from "@/components/Forms/RegisterForm";
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
	title: "Register | Wallpaper Studio App",
	description: "Register page of Wallpaper Studio App",
};

const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<Card className="w-sm drop-shadow-lg sm:w-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
				<CardHeader className="gap-3">
					<CardTitle className="text-center text-3xl font-semibold">
						Create Account
					</CardTitle>

					<CardDescription className="text-center text-lg leading-5">
						Enter your details below to register your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<RegisterForm />
				</CardContent>

				<CardFooter className="grid place-items-center text-xl font-light">
					You already have an account?
					<div>
						Please
						<Link
							href={"/auth/login"}
							className="mx-2 text-blue-600 underline hover:font-normal">
							Login
						</Link>
						Now .
					</div>
				</CardFooter>
			</Card>
		</section>
	);
};

export default page;
