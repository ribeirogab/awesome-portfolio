import { marked } from "marked";

const wordsPerMinute = 220;

export function renderMarkdown(source: string): string {
	return marked.parse(source, { async: false, gfm: true });
}

function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function wordCount(html: string): number {
	return countWords(html.replace(/<[^>]+>/g, " "));
}

export function readingTime(source: string): string {
	const minutes = Math.max(1, Math.round(countWords(source) / wordsPerMinute));
	return `${minutes} min read`;
}
