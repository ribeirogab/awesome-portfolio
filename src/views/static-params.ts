import { loadArticles } from "@/content/articles";
import { defaultLocale, secondaryLocales } from "@/content/locales";

export function localeParams() {
	return secondaryLocales().map((locale) => ({ locale }));
}

export function articleParams(locale = defaultLocale()) {
	return loadArticles(locale).map((article) => ({ slug: article.slug }));
}

export function localizedArticleParams() {
	return secondaryLocales().flatMap((locale) =>
		articleParams(locale).map((params) => ({ locale, ...params })),
	);
}
