import { loadArticles } from "@/content/articles";
import { formatLongDate } from "@/content/dates";
import { portfolio } from "@/data/portfolio";
import { ogContentType, ogImage, ogSize } from "@/seo/og-image";

type ImageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
	return loadArticles().map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: ImageProps) {
	const { slug } = await params;
	const article = loadArticles().find((candidate) => candidate.slug === slug);
	if (!article) {
		return ogImage({
			label: portfolio.owner.name,
			title: portfolio.pages.articles.title,
		});
	}
	return ogImage({
		label: `${article.tag} · ${formatLongDate(article.date)} · ${article.readingTime}`,
		title: article.title,
		description: article.excerpt,
	});
}
