import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { Breadcrumb } from "@/components/breadcrumb";
import { loadArticles } from "@/content/articles";
import { formatDay, formatLongDate, yearOf } from "@/content/dates";
import { portfolio } from "@/data/portfolio";
import type { Article } from "@/schema/article";

type ArticlePageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return loadArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = loadArticles().find((candidate) => candidate.slug === slug);
	if (!article) {
		return {};
	}
	return {
		title: `${article.title} — ${portfolio.owner.name}`,
		description: article.excerpt,
	};
}

function AdjacentLink({
	label,
	article,
	align,
}: {
	label: string;
	article?: Article;
	align: "start" | "end";
}) {
	if (!article) {
		return <span aria-hidden="true" />;
	}
	return (
		<Link href={`/articles/${article.slug}`} className={`adjacent-${align}`}>
			<span className="label">{label}</span>
			<span className="entry-title">{article.title}</span>
			<span className="entry-meta">
				{formatDay(article.date)}, {yearOf(article.date)} ·{" "}
				{article.readingTime}
			</span>
		</Link>
	);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params;
	const articles = loadArticles();
	const index = articles.findIndex((candidate) => candidate.slug === slug);
	if (index === -1) {
		notFound();
	}
	const article = articles[index];
	const newer = articles[index - 1];
	const older = articles[index + 1];

	return (
		<div className="page">
			<Breadcrumb
				items={[
					{ label: portfolio.owner.name, href: "/" },
					{ label: portfolio.pages.articles.title, href: "/articles" },
					{ label: article.title },
				]}
			/>
			<header className="article-head">
				<div className="meta-row">
					<span className="tech-tag">{article.tag}</span>
					<span>{formatLongDate(article.date)}</span>
					<span className="dot" aria-hidden="true">
						·
					</span>
					<span>{article.readingTime}</span>
				</div>
				<h1>{article.title}</h1>
				<p className="article-lede">{article.excerpt}</p>
			</header>
			<ArticleBody html={article.html} />
			<nav className="adjacent section-gap" aria-label="Adjacent articles">
				<AdjacentLink label="Previous" article={older} align="start" />
				<AdjacentLink label="Next" article={newer} align="end" />
			</nav>
		</div>
	);
}
