import AvatarForm from "@/components/Forms/AvatarForm";
import ProfileForm from "@/components/Forms/ProfileForm";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";

const page = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return <div>Not authenticated</div>;
	}

	console.log(session.user.image);

	return (
		<>
			<section className="grid h-[90dvh] place-items-center">
				<Card className="w-sm">
					<CardHeader className="">
						<CardTitle className="text-center text-3xl font-semibold">
							Profile Picture
						</CardTitle>
					</CardHeader>
					<CardContent>
						<AvatarForm previousImage={session.user.image as string} />
					</CardContent>
				</Card>

				<Card className="w-sm">
					<CardHeader className="">
						<CardTitle className="text-center text-3xl font-semibold">
							Profile Details
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ProfileForm />
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default page;
