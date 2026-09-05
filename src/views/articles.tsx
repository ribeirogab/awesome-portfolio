import type { Metadata } from "next";
import { ArticleList } from "@/components/article-list";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHead } from "@/components/page-head";
import type { LocaleContent } from "@/content/locale-content";
import { localizePath } from "@/content/locales";
import { JsonLd } from "@/seo/json-ld";
import { pageMetadata } from "@/seo/metadata";
import { articlesStructuredData } from "@/seo/structured-data";

export function articlesMetadata(content: LocaleContent): Metadata {
	const { owner, pages } = content.portfolio;
	return pageMetadata({
		content,
		path: "/articles",
		title: `${pages.articles.title} — ${owner.name}`,
		description: pages.articles.description,
	});
}

export function ArticlesView({ content }: { content: LocaleContent }) {
	const { owner, pages, site } = content.portfolio;
	const { messages, articles, locale } = content;

	return (
		<div className="page">
			<JsonLd data={articlesStructuredData(content, articles)} />
			<Breadcrumb
				label={messages.breadcrumb}
				items={[
					{ label: owner.name, href: localizePath(locale, "/") },
					{ label: pages.articles.title },
				]}
			/>
			<PageHead
				title={pages.articles.title}
				description={pages.articles.description}
				link={{ label: messages.rss, url: localizePath(locale, "/feed.xml") }}
			/>
			<section className="page-section" aria-label={pages.articles.title}>
				<ArticleList articles={articles} languageTag={site.locale} />
			</section>
		</div>
	);
}
