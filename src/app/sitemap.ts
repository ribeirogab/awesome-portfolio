import type { MetadataRoute } from "next";
import { loadAllLocaleContent } from "@/content/locale-content";
import { localizePath } from "@/content/locales";

export const dynamic = "force-static";

type SitemapEntry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
	const editions = loadAllLocaleContent();
	const { site } = editions[0].portfolio;
	const multilingual = editions.length > 1;

	const absolute = (locale: string, path: string) =>
		`${site.url}${localizePath(locale, path)}`;

	const alternatesFor = (path: string, locales: string[]) => {
		if (!multilingual) {
			return undefined;
		}
		const languages: Record<string, string> = {};
		for (const edition of editions) {
			if (locales.includes(edition.locale)) {
				languages[edition.portfolio.site.locale] = absolute(
					edition.locale,
					path,
				);
			}
		}
		return { languages };
	};

	const everywhere = editions.map((edition) => edition.locale);

	const staticPages = (
		path: string,
		entry: Omit<SitemapEntry, "url" | "alternates">,
	): SitemapEntry[] =>
		editions.map((edition) => ({
			url: absolute(edition.locale, path),
			alternates: alternatesFor(path, everywhere),
			...entry,
		}));

	const articlePages: SitemapEntry[] = editions.flatMap((edition) =>
		edition.articles.map((article) => {
			const path = `/articles/${article.slug}`;
			const locales = editions
				.filter((candidate) =>
					candidate.articles.some((other) => other.slug === article.slug),
				)
				.map((candidate) => candidate.locale);
			return {
				url: absolute(edition.locale, path),
				lastModified: article.date,
				changeFrequency: "yearly" as const,
				priority: 0.6,
				alternates: alternatesFor(path, locales),
			};
		}),
	);

	return [
		...staticPages("/", { changeFrequency: "monthly", priority: 1 }),
		...editions.map((edition) => ({
			url: absolute(edition.locale, "/articles"),
			lastModified: edition.articles[0]?.date,
			changeFrequency: "weekly" as const,
			priority: 0.8,
			alternates: alternatesFor("/articles", everywhere),
		})),
		...staticPages("/projects", { changeFrequency: "monthly", priority: 0.8 }),
		...articlePages,
	];
}
