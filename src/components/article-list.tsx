import Link from "next/link";
import { formatDay, formatShortDate, yearOf } from "@/content/dates";
import type { Article } from "@/schema/article";

type ArticleListLayout = "rail" | "inline";

type ArticleListProps = {
	articles: Article[];
	layout?: ArticleListLayout;
};

function ArticleTitle({ article }: { article: Article }) {
	return (
		<h3 className="entry-title">
			<Link href={`/articles/${article.slug}`}>{article.title}</Link>
		</h3>
	);
}

function ArticleTags({ article }: { article: Article }) {
	return (
		<div className="article-tags">
			<span className="tech-tag">{article.tag}</span>
			<span className="entry-meta">{article.readingTime}</span>
		</div>
	);
}

function RailRow({
	article,
	showYear,
}: {
	article: Article;
	showYear: boolean;
}) {
	return (
		<article className="article-row">
			<div className="article-rail">
				{showYear ? (
					<span className="article-year">{yearOf(article.date)}</span>
				) : null}
				<span className="entry-meta">{formatDay(article.date)}</span>
			</div>
			<div className="article-main">
				<ArticleTitle article={article} />
				<p className="article-excerpt">{article.excerpt}</p>
				<ArticleTags article={article} />
			</div>
		</article>
	);
}

function InlineRow({ article }: { article: Article }) {
	return (
		<article className="article-row article-row-inline">
			<div className="article-line">
				<ArticleTitle article={article} />
				<span className="entry-meta">{formatShortDate(article.date)}</span>
			</div>
			<p className="article-excerpt">{article.excerpt}</p>
			<ArticleTags article={article} />
		</article>
	);
}

export function ArticleList({ articles, layout = "rail" }: ArticleListProps) {
	return (
		<>
			{articles.map((article, index) => {
				if (layout === "inline") {
					return <InlineRow key={article.slug} article={article} />;
				}
				const previous = articles[index - 1];
				const showYear =
					!previous || yearOf(previous.date) !== yearOf(article.date);
				return (
					<RailRow key={article.slug} article={article} showYear={showYear} />
				);
			})}
		</>
	);
}
