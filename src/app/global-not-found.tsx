import type { Metadata } from "next";
import { Document } from "@/app/document";
import { loadDefaultLocaleContent } from "@/content/locale-content";
import { rootMetadata } from "@/seo/metadata";
import { NotFoundView, notFoundMetadata } from "@/views/not-found";

export { viewport } from "@/app/document";

const content = loadDefaultLocaleContent();

export const metadata: Metadata = {
	...rootMetadata(content),
	...notFoundMetadata(content),
};

export default function GlobalNotFound() {
	return (
		<Document content={content}>
			<NotFoundView content={content} />
		</Document>
	);
}
