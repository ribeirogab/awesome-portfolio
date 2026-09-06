import type { Metadata } from "next";
import type { LocaleContent } from "@/content/locale-content";
import { loadLocaleContent } from "@/content/locale-content";
import { allLocales, defaultLocale, localizePath } from "@/content/locales";
import { socialImageFor } from "@/seo/social-images";

type ArticleMetadataInput = {
	publishedTime: string;
	tag: string;
};

type PageMetadataInput = {
	content: LocaleContent;
	path: string;
	title: string;
	description: string;
	article?: ArticleMetadataInput;
	locales?: string[];
};

function openGraphLocale(languageTag: string): string {
	return languageTag.replace("-", "_");
}

function languageTagOf(locale: string): string {
	return loadLocaleContent(locale).portfolio.site.locale;
}

function languageAlternates(
	path: string,
	locales: string[],
): Record<string, string> | undefined {
	if (allLocales().length < 2) {
		return undefined;
	}
	const languages: Record<string, string> = {};
	for (const locale of locales) {
		languages[languageTagOf(locale)] = localizePath(locale, path);
	}
	const fallback = defaultLocale();
	if (locales.includes(fallback)) {
		languages["x-default"] = localizePath(fallback, path);
	}
	return languages;
}

function openGraphFor(
	input: PageMetadataInput,
	locales: string[],
): NonNullable<Metadata["openGraph"]> {
	const { site, owner } = input.content.portfolio;
	const base = {
		images: [
			{ ...socialImageFor(input.content.locale, input.path), alt: input.title },
		],
		siteName: site.title,
		locale: openGraphLocale(site.locale),
		alternateLocale: locales
			.filter((locale) => locale !== input.content.locale)
			.map((locale) => openGraphLocale(languageTagOf(locale))),
		url: localizePath(input.content.locale, input.path),
		title: input.title,
		description: input.description,
	};
	if (input.article) {
		return {
			...base,
			type: "article",
			publishedTime: input.article.publishedTime,
			modifiedTime: input.article.publishedTime,
			authors: [owner.name],
			section: input.article.tag,
			tags: [input.article.tag],
		};
	}
	return { ...base, type: "website" };
}

export function feedTitle(content: LocaleContent): string {
	const { owner, pages } = content.portfolio;
	return `${pages.articles.title} — ${owner.name}`;
}

export function pageMetadata(input: PageMetadataInput): Metadata {
	const locales = input.locales ?? allLocales();
	return {
		title: input.title,
		description: input.description,
		alternates: {
			canonical: localizePath(input.content.locale, input.path),
			languages: languageAlternates(input.path, locales),
			types: {
				"application/rss+xml": [
					{
						url: localizePath(input.content.locale, "/feed.xml"),
						title: feedTitle(input.content),
					},
				],
			},
		},
		openGraph: openGraphFor(input, locales),
		twitter: {
			card: "summary_large_image",
			title: input.title,
			description: input.description,
			images: [socialImageFor(input.content.locale, input.path).url],
		},
	};
}

export function rootMetadata(content: LocaleContent): Metadata {
	const { site, owner } = content.portfolio;
	return {
		metadataBase: new URL(site.url),
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
}
