import ThemeProvider from "@/components/Providers/ThemeProvider";
import { PageLayoutProps } from "@/lib/types";
import "./globals.css";

const RootLayout = ({ children }: PageLayoutProps) => {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute={"class"}
					defaultTheme="dark"
					enableSystem={false}>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
