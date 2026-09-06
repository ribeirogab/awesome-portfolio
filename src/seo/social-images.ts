import { formatLongDate } from "@/content/dates";
import type { LocaleContent } from "@/content/locale-content";
import {
	loadAllLocaleContent,
	loadLocaleContent,
} from "@/content/locale-content";
import { allLocales } from "@/content/locales";
import { ogImage, ogSize } from "@/seo/og-image";

const extension = ".png";

type SocialImage = {
	url: string;
	width: number;
	height: number;
};

function socialPath(locale: string, ...segments: string[]): string {
	return `/social/${[locale, ...segments].join("/")}${extension}`;
}

export function socialImageFor(locale: string, path: string): SocialImage {
	const article = path.match(/^\/articles\/([^/]+)$/);
	const url = article
		? socialPath(locale, "article", article[1])
		: path === "/"
			? socialPath(locale, "home")
			: socialPath(locale, path.slice(1));
	return { url, ...ogSize };
}

export function socialImageParams(): { segments: string[] }[] {
	return loadAllLocaleContent().flatMap((content) => [
		{ segments: [content.locale, `home${extension}`] },
		{ segments: [content.locale, `articles${extension}`] },
		{ segments: [content.locale, `projects${extension}`] },
		...content.articles.map((article) => ({
			segments: [content.locale, "article", `${article.slug}${extension}`],
		})),
	]);
}

function homeImage(content: LocaleContent) {
	const { owner } = content.portfolio;
	return ogImage(content.portfolio, {
		label: owner.role,
		title: owner.name,
		description: owner.intro,
		footer: owner.availability,
	});
}

function articlesImage(content: LocaleContent) {
	const { owner, pages } = content.portfolio;
	return ogImage(content.portfolio, {
		label: owner.name,
		title: pages.articles.title,
		description: pages.articles.description,
	});
}

function projectsImage(content: LocaleContent) {
	const { owner, pages } = content.portfolio;
	return ogImage(content.portfolio, {
		label: owner.name,
		title: pages.projects.title,
		description: pages.projects.description,
	});
}

function articleImage(content: LocaleContent, slug: string) {
	const article = content.articles.find((candidate) => candidate.slug === slug);
	if (!article) {
		return undefined;
	}
	const date = formatLongDate(article.date, content.portfolio.site.locale);
	return ogImage(content.portfolio, {
		label: `${article.tag} · ${date} · ${article.readingTime}`,
		title: article.title,
		description: article.excerpt,
	});
}

export function socialImageResponse(segments: string[]) {
	const [locale, kind, slug] = segments;
	if (!allLocales().includes(locale) || !kind?.endsWith(extension)) {
		return undefined;
	}
	const content = loadLocaleContent(locale);
	const name = kind.slice(0, -extension.length);
	if (slug === undefined) {
		if (name === "home") {
			return homeImage(content);
		}
		if (name === "articles") {
			return articlesImage(content);
		}
		if (name === "projects") {
			return projectsImage(content);
		}
		return undefined;
	}
	if (name === "article" && slug.endsWith(extension)) {
		return articleImage(content, slug.slice(0, -extension.length));
	}
	return undefined;
}
