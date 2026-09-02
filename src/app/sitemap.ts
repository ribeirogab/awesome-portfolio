import type { MetadataRoute } from "next";
import { loadArticles } from "@/content/articles";
import { portfolio } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const { site } = portfolio;
	const articles = loadArticles();
	const newestArticle = articles[0]?.date;

	return [
		{ url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
		{
			url: `${site.url}/articles`,
			lastModified: newestArticle,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{ url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.8 },
		...articles.map((article) => ({
			url: `${site.url}/articles/${article.slug}`,
			lastModified: article.date,
			changeFrequency: "yearly" as const,
			priority: 0.6,
		})),
	];
}
