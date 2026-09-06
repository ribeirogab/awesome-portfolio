import type { Metadata } from "next";
import { loadLocaleContent } from "@/content/locale-content";
import { ArticleView, articleMetadata } from "@/views/article";
import { localizedArticleParams } from "@/views/static-params";

type ArticlePageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return localizedArticleParams();
}

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	return articleMetadata(loadLocaleContent(locale), slug);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { locale, slug } = await params;
	return <ArticleView content={loadLocaleContent(locale)} slug={slug} />;
}
