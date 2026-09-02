export function ArticleBody({ html }: { html: string }) {
	return (
		<div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
	);
}
