import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { Breadcrumb } from "@/components/breadcrumb";
import { formatDay, formatLongDate, yearOf } from "@/content/dates";
import type { LocaleContent } from "@/content/locale-content";
import { localesWithArticle } from "@/content/locale-content";
import { localizePath } from "@/content/locales";
import { wordCount } from "@/content/markdown";
import type { Article } from "@/schema/article";
import { JsonLd } from "@/seo/json-ld";
import { pageMetadata } from "@/seo/metadata";
import { articleStructuredData } from "@/seo/structured-data";

export function articleMetadata(
	content: LocaleContent,
	slug: string,
): Metadata {
	const article = content.articles.find((candidate) => candidate.slug === slug);
	if (!article) {
		return {};
	}
	return pageMetadata({
		content,
		path: `/articles/${article.slug}`,
		title: `${article.title} — ${content.portfolio.owner.name}`,
		description: article.excerpt,
		article: { publishedTime: article.date, tag: article.tag },
		locales: localesWithArticle(slug),
	});
}

function AdjacentLink({
	label,
	article,
	languageTag,
	align,
}: {
	label: string;
	article?: Article;
	languageTag: string;
	align: "start" | "end";
}) {
	if (!article) {
		return <span aria-hidden="true" />;
	}
	return (
		<Link href={article.href} className={`adjacent-${align}`}>
			<span className="label">{label}</span>
			<span className="entry-title">{article.title}</span>
			<span className="entry-meta">
				<time dateTime={article.date}>
					{formatDay(article.date, languageTag)}, {yearOf(article.date)}
				</time>{" "}
				· {article.readingTime}
			</span>
		</Link>
	);
}

export function ArticleView({
	content,
	slug,
}: {
	content: LocaleContent;
	slug: string;
}) {
	const { articles, messages, locale } = content;
	const { owner, pages, site } = content.portfolio;
	const index = articles.findIndex((candidate) => candidate.slug === slug);
	if (index === -1) {
		notFound();
	}
	const article = articles[index];
	const newer = articles[index - 1];
	const older = articles[index + 1];

	return (
		<div className="page">
			<JsonLd
				data={articleStructuredData(content, article, wordCount(article.html))}
			/>
			<Breadcrumb
				label={messages.breadcrumb}
				items={[
					{ label: owner.name, href: localizePath(locale, "/") },
					{
						label: pages.articles.title,
						href: localizePath(locale, "/articles"),
					},
					{ label: article.title },
				]}
			/>
			<article>
				<header className="article-head">
					<div className="meta-row">
						<span className="tech-tag">{article.tag}</span>
						<span>
							<time dateTime={article.date}>
								{formatLongDate(article.date, site.locale)}
							</time>
						</span>
						<span className="dot" aria-hidden="true">
							·
						</span>
						<span>{article.readingTime}</span>
					</div>
					<h1>{article.title}</h1>
					<p className="article-lede">{article.excerpt}</p>
				</header>
				<ArticleBody html={article.html} />
			</article>
			<nav
				className="adjacent section-gap"
				aria-label={messages.adjacentArticles}
			>
				<AdjacentLink
					label={messages.previous}
					article={older}
					languageTag={site.locale}
					align="start"
				/>
				<AdjacentLink
					label={messages.next}
					article={newer}
					languageTag={site.locale}
					align="end"
				/>
			</nav>
		</div>
	);
}
