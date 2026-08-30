import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
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
	title: portfolio.site.title,
	description: portfolio.site.description,
};

const themeInitializer =
	'(function(){var s=null;try{s=localStorage.getItem("theme")}catch(e){}var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)})();';

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
			</body>
		</html>
	);
}
