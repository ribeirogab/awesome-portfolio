import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { type Article, articleFrontmatterSchema } from "../schema/article.ts";
import { fill } from "../schema/messages.ts";
import { localeDirectory, localizePath } from "./locales.ts";
import { readingMinutes, renderMarkdown } from "./markdown.ts";
import { loadMessages } from "./messages.ts";

const cache = new Map<string, Article[]>();

export function articlesDirectory(locale: string): string {
	return join(localeDirectory(locale), "articles");
}

function parseArticle(
	filePath: string,
	locale: string,
	readingTimeTemplate: string,
	root: string,
): Article {
	const file = basename(filePath);
	const slug = file.replace(/\.md$/, "");
	const { data, content } = matter(readFileSync(filePath, "utf8"));
	const frontmatter = articleFrontmatterSchema.safeParse(data);
	if (!frontmatter.success) {
		throw new Error(`${file}: ${z.prettifyError(frontmatter.error)}`);
	}
	if (content.trim().length === 0) {
		throw new Error(`${file}: body is empty`);
	}
	return {
		...frontmatter.data,
		slug,
		locale,
		href: localizePath(locale, `/articles/${slug}`, root),
		html: renderMarkdown(content),
		readingTime: fill(readingTimeTemplate, {
			minutes: readingMinutes(content),
		}),
	};
}

export function loadArticles(locale: string, root = process.cwd()): Article[] {
	const key = `${root}:${locale}`;
	const cached = cache.get(key);
	if (cached) {
		return cached;
	}
	const directory = join(root, articlesDirectory(locale));
	const { readingTime } = loadMessages(locale, root);
	const articles = readdirSync(directory)
		.filter((file) => file.endsWith(".md"))
		.map((file) =>
			parseArticle(join(directory, file), locale, readingTime, root),
		)
		.sort((a, b) => b.date.localeCompare(a.date));
	cache.set(key, articles);
	return articles;
}
