import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Dock } from "@/components/dock";
import { portfolio } from "@/data/portfolio";
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

export const metadata: Metadata = {
	metadataBase: new URL(portfolio.site.url),
	title: portfolio.site.title,
	description: portfolio.site.description,
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
				{children}
				<Dock navItems={navItems} socialLinks={portfolio.socialLinks} />
			</body>
		</html>
	);
}
