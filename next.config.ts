import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb",
		},
	},
	reactCompiler: true,
	typedRoutes: true,
	images: {
		remotePatterns: [new URL("https://placehold.co/**")],
	},
};

export default nextConfig;
