import { loadArticles } from "@/content/articles";
import { toRfc822 } from "@/content/dates";
import { portfolio } from "@/data/portfolio";

export const dynamic = "force-static";

const xmlEntities: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&apos;",
};

function escapeXml(value: string): string {
	return value.replace(/[&<>"']/g, (character) => xmlEntities[character]);
}

export function GET() {
	const { site, owner, pages } = portfolio;
	const items = loadArticles()
		.map((article) => {
			const url = `${site.url}/articles/${article.slug}`;
			return [
				"<item>",
				`<title>${escapeXml(article.title)}</title>`,
				`<link>${url}</link>`,
				`<guid>${url}</guid>`,
				`<pubDate>${toRfc822(article.date)}</pubDate>`,
				`<category>${escapeXml(article.tag)}</category>`,
				`<description>${escapeXml(article.excerpt)}</description>`,
				"</item>",
			].join("");
		})
		.join("");
	const feed = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0">',
		"<channel>",
		`<title>${escapeXml(`${pages.articles.title} — ${owner.name}`)}</title>`,
		`<link>${site.url}/articles</link>`,
		`<description>${escapeXml(pages.articles.description)}</description>`,
		"<language>en</language>",
		items,
		"</channel>",
		"</rss>",
	].join("");

	return new Response(feed, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
