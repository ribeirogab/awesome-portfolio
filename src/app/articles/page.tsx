import type { Metadata } from "next";
import { ArticleList } from "@/components/article-list";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHead } from "@/components/page-head";
import { loadArticles } from "@/content/articles";
import { portfolio } from "@/data/portfolio";
import { JsonLd } from "@/seo/json-ld";
import { pageMetadata } from "@/seo/metadata";
import { articlesStructuredData } from "@/seo/structured-data";

const { owner, pages } = portfolio;

export const metadata: Metadata = pageMetadata({
	path: "/articles",
	title: `${pages.articles.title} — ${owner.name}`,
	description: pages.articles.description,
});

export default function ArticlesPage() {
	const articles = loadArticles();

	return (
		<div className="page">
			<JsonLd data={articlesStructuredData(articles)} />
			<Breadcrumb
				items={[
					{ label: owner.name, href: "/" },
					{ label: pages.articles.title },
				]}
			/>
			<PageHead
				title={pages.articles.title}
				description={pages.articles.description}
				link={{ label: "RSS", url: "/feed.xml" }}
			/>
			<section className="page-section" aria-label={pages.articles.title}>
				<ArticleList articles={articles} />
			</section>
		</div>
	);
}
