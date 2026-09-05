import type { Metadata } from "next";
import { loadDefaultLocaleContent } from "@/content/locale-content";
import { ArticleView, articleMetadata } from "@/views/article";
import { articleParams } from "@/views/static-params";

type ArticlePageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return articleParams();
}

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params;
	return articleMetadata(loadDefaultLocaleContent(), slug);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params;
	return <ArticleView content={loadDefaultLocaleContent()} slug={slug} />;
}
