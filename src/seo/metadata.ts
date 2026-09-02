import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";

type ArticleMetadataInput = {
	publishedTime: string;
	tag: string;
};

type PageMetadataInput = {
	path: string;
	title: string;
	description: string;
	article?: ArticleMetadataInput;
};

const { site, owner, pages } = portfolio;

const feedTitle = `${pages.articles.title} — ${owner.name}`;

function openGraphFor(
	input: PageMetadataInput,
): NonNullable<Metadata["openGraph"]> {
	const base = {
		siteName: site.title,
		locale: "en_US",
		url: input.path,
		title: input.title,
		description: input.description,
	};
	if (input.article) {
		return {
			...base,
			type: "article",
			publishedTime: input.article.publishedTime,
			modifiedTime: input.article.publishedTime,
			authors: [owner.name],
			section: input.article.tag,
			tags: [input.article.tag],
		};
	}
	return { ...base, type: "website" };
}

export function pageMetadata(input: PageMetadataInput): Metadata {
	return {
		title: input.title,
		description: input.description,
		alternates: {
			canonical: input.path,
			types: {
				"application/rss+xml": [{ url: "/feed.xml", title: feedTitle }],
			},
		},
		openGraph: openGraphFor(input),
		twitter: {
			card: "summary_large_image",
			title: input.title,
			description: input.description,
		},
	};
}
