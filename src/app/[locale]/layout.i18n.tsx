import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Document } from "@/app/document";
import { loadLocaleContent } from "@/content/locale-content";
import { rootMetadata } from "@/seo/metadata";
import { localeParams } from "@/views/static-params";

export { viewport } from "@/app/document";

type LocaleLayoutProps = Readonly<{
	children: ReactNode;
	params: Promise<{ locale: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
	return localeParams();
}

export async function generateMetadata({
	params,
}: LocaleLayoutProps): Promise<Metadata> {
	const { locale } = await params;
	return rootMetadata(loadLocaleContent(locale));
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params;
	return <Document content={loadLocaleContent(locale)}>{children}</Document>;
}
