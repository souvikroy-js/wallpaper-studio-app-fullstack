import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcnui/avatar";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProfileNavAvatar = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/auth/login");
	}

	const {
		user: { image, name },
	} = session;

	const nameArray = name.split(" ");

	const charactersArray = nameArray.map((n) => {
		return n.charAt(0);
	});

	return (
		<div className="relative inline-flex">
			{/* Animated gradient ring */}
			<div className="absolute -inset-1 animate-[spin_4s_linear_infinite] rounded-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-purple-500" />

			{/* Avatar */}
			<Avatar className="bg-background relative">
				{image && (
					<AvatarImage
						src={`/upload/avatar/${image}`}
						alt={`${name} avatar`}
					/>
				)}
				<AvatarFallback>{charactersArray.join("")}</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default ProfileNavAvatar;
