import type { Metadata } from "next";
import { loadLocaleContent } from "@/content/locale-content";
import { HomeView, homeMetadata } from "@/views/home";
import { localeParams } from "@/views/static-params";

type HomePageProps = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return localeParams();
}

export async function generateMetadata({
	params,
}: HomePageProps): Promise<Metadata> {
	const { locale } = await params;
	return homeMetadata(loadLocaleContent(locale));
}

export default async function Home({ params }: HomePageProps) {
	const { locale } = await params;
	return <HomeView content={loadLocaleContent(locale)} />;
}
