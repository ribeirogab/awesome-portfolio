import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { type Article, articleFrontmatterSchema } from "../schema/article.ts";
import { readingTime, renderMarkdown } from "./markdown.ts";

export const articlesDirectory = join("content", "articles");

function parseArticle(filePath: string): Article {
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
		html: renderMarkdown(content),
		readingTime: readingTime(content),
	};
}

export function loadArticles(root = process.cwd()): Article[] {
	const directory = join(root, articlesDirectory);
	return readdirSync(directory)
		.filter((file) => file.endsWith(".md"))
		.map((file) => parseArticle(join(directory, file)))
		.sort((a, b) => b.date.localeCompare(a.date));
}
