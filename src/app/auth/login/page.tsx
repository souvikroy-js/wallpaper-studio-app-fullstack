import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login | Wallpaper Studio App",
	description: "Login page of Wallpaper Studio App",
};

const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<div className="">login</div>
		</section>
	);
};

export default page;
