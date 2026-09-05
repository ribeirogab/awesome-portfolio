import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Document } from "@/app/document";
import { loadDefaultLocaleContent } from "@/content/locale-content";
import { rootMetadata } from "@/seo/metadata";

export { viewport } from "@/app/document";

const content = loadDefaultLocaleContent();

export const metadata: Metadata = rootMetadata(content);

export default function DefaultLocaleLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return <Document content={content}>{children}</Document>;
}
