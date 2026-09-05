import type { Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Dock, type LanguageOption } from "@/components/dock";
import type { LocaleContent } from "@/content/locale-content";
import { loadAllLocaleContent } from "@/content/locale-content";
import { localePrefix, localizePath } from "@/content/locales";
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

export const viewport: Viewport = {
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#faf8f3" },
		{ media: "(prefers-color-scheme: dark)", color: "#131210" },
	],
};

const themeInitializer =
	'(function(){var s=null;try{s=localStorage.getItem("theme")}catch(e){}var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)})();';

function navItemsOf(content: LocaleContent) {
	const home = localizePath(content.locale, "/");
	return content.portfolio.sections
		.filter((section) => section.navLabel)
		.map((section, index) => ({
			href: `${home}#${section.id}`,
			label: section.navLabel as string,
			index: String(index + 1).padStart(2, "0"),
		}));
}

function languageOptions(): LanguageOption[] {
	return loadAllLocaleContent().map((content) => ({
		locale: content.locale,
		name: content.messages.languageName,
		prefix: localePrefix(content.locale),
		articleSlugs: content.articles.map((article) => article.slug),
	}));
}

type DocumentProps = Readonly<{
	content: LocaleContent;
	children: ReactNode;
}>;

export function Document({ content, children }: DocumentProps) {
	return (
		<html
			lang={content.portfolio.site.locale}
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
				<Dock
					navItems={navItemsOf(content)}
					socialLinks={content.portfolio.socialLinks}
					messages={content.messages.dock}
					currentLocale={content.locale}
					languages={languageOptions()}
				/>
			</body>
		</html>
	);
}
