import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

const localeConfig = JSON.parse(readFileSync("content/i18n.json", "utf8")) as {
	locales: string[];
};

const multilingual = localeConfig.locales.length > 1;

const nextConfig: NextConfig = {
	output: "export",
	pageExtensions: multilingual
		? ["i18n.tsx", "i18n.ts", "tsx", "ts"]
		: ["tsx", "ts"],
	experimental: {
		globalNotFound: true,
	},
};

export default nextConfig;
