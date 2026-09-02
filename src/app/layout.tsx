import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Dock } from "@/components/dock";
import { portfolio } from "@/data/portfolio";
import { pageMetadata } from "@/seo/metadata";
import "./globals.css";

const manrope = localFont({
	src: "../fonts/manrope-latin.woff2",
	weight: "200 800",
	display: "swap",
	variable: "--font-manrope",
});

const cabinSketch = localFont({
	src: "../fonts/cabin-sketch-700.woff2",
	weight: "700",
	display: "swap",
	variable: "--font-cabin-sketch",
});

const { site, owner } = portfolio;

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	...pageMetadata({
		path: "/",
		title: site.title,
		description: site.description,
	}),
	applicationName: site.title,
	authors: [{ name: owner.name, url: site.url }],
	creator: owner.name,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
};

export const viewport: Viewport = {
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#faf8f3" },
		{ media: "(prefers-color-scheme: dark)", color: "#131210" },
	],
};

const themeInitializer =
	'(function(){var s=null;try{s=localStorage.getItem("theme")}catch(e){}var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)})();';

const navItems = portfolio.sections
	.filter((section) => section.navLabel)
	.map((section, index) => ({
		href: `/#${section.id}`,
		label: section.navLabel as string,
		index: String(index + 1).padStart(2, "0"),
	}));

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang="en"
			className={`${manrope.variable} ${cabinSketch.variable}`}
			suppressHydrationWarning
		>
			<body className={manrope.className}>
				<script
					dangerouslySetInnerHTML={{
						__html: themeInitializer,
					}}
				/>
				<main>{children}</main>
				<Dock navItems={navItems} socialLinks={portfolio.socialLinks} />
			</body>
		</html>
	);
}
