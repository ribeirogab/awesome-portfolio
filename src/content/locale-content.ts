import type { Article } from "../schema/article.ts";
import type { Messages } from "../schema/messages.ts";
import type { Portfolio } from "../schema/portfolio.ts";
import { loadArticles } from "./articles.ts";
import { allLocales, defaultLocale } from "./locales.ts";
import { loadMessages } from "./messages.ts";
import { loadPortfolio } from "./portfolio.ts";

export type LocaleContent = {
	locale: string;
	isDefault: boolean;
	portfolio: Portfolio;
	messages: Messages;
	articles: Article[];
};

export function loadLocaleContent(
	locale: string,
	root = process.cwd(),
): LocaleContent {
	return {
		locale,
		isDefault: locale === defaultLocale(root),
		portfolio: loadPortfolio(locale, root),
		messages: loadMessages(locale, root),
		articles: loadArticles(locale, root),
	};
}

export function loadDefaultLocaleContent(root = process.cwd()): LocaleContent {
	return loadLocaleContent(defaultLocale(root), root);
}

export function loadAllLocaleContent(root = process.cwd()): LocaleContent[] {
	return allLocales(root).map((locale) => loadLocaleContent(locale, root));
}

export function localesWithArticle(
	slug: string,
	root = process.cwd(),
): string[] {
	return allLocales(root).filter((locale) =>
		loadArticles(locale, root).some((article) => article.slug === slug),
	);
}
