import type { Metadata } from "next";
import { loadLocaleContent } from "@/content/locale-content";
import { ArticlesView, articlesMetadata } from "@/views/articles";
import { localeParams } from "@/views/static-params";

type ArticlesPageProps = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return localeParams();
}

export async function generateMetadata({
	params,
}: ArticlesPageProps): Promise<Metadata> {
	const { locale } = await params;
	return articlesMetadata(loadLocaleContent(locale));
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
	const { locale } = await params;
	return <ArticlesView content={loadLocaleContent(locale)} />;
}
