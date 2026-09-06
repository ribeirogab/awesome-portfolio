import type { Metadata } from "next";
import { loadDefaultLocaleContent } from "@/content/locale-content";
import { ArticlesView, articlesMetadata } from "@/views/articles";

const content = loadDefaultLocaleContent();

export const metadata: Metadata = articlesMetadata(content);

export default function ArticlesPage() {
	return <ArticlesView content={content} />;
}
