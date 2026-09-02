import { marked } from "marked";

const wordsPerMinute = 220;

export function renderMarkdown(source: string): string {
	return marked.parse(source, { async: false, gfm: true });
}

export function readingTime(source: string): string {
	const words = source.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / wordsPerMinute));
	return `${minutes} min read`;
}
