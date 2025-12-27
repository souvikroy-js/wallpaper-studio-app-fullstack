import WallpaperForm from "@/components/Forms/WallpaperForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";

const page = () => {
	return (
		<>
			<section className="grid h-[90dvh] place-items-center">
				<Card className="drop-shadow-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
					<CardHeader className="gap-3">
						<CardTitle className="text-center text-3xl font-semibold">
							Create Wallpaper
						</CardTitle>
					</CardHeader>

					<CardContent>
						<WallpaperForm />
					</CardContent>
					<CardFooter>create category</CardFooter>
				</Card>
			</section>
		</>
	);
};

export default page;
