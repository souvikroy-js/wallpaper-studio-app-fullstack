import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register | Wallpaper Studio App",
	description: "Register page of Wallpaper Studio App",
};

const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<div className="">Register</div>
		</section>
	);
};

export default page;
