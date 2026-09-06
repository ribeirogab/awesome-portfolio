import { toRfc822 } from "@/content/dates";
import type { LocaleContent } from "@/content/locale-content";
import { localizePath } from "@/content/locales";
import { feedTitle } from "@/seo/metadata";

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

export function feedResponse(content: LocaleContent): Response {
	const { site, pages } = content.portfolio;
	const items = content.articles
		.map((article) => {
			const url = `${site.url}${article.href}`;
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
		`<title>${escapeXml(feedTitle(content))}</title>`,
		`<link>${site.url}${localizePath(content.locale, "/articles")}</link>`,
		`<description>${escapeXml(pages.articles.description)}</description>`,
		`<language>${escapeXml(site.locale)}</language>`,
		items,
		"</channel>",
		"</rss>",
	].join("");

	return new Response(feed, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
