import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHead } from "@/components/page-head";
import type { LocaleContent } from "@/content/locale-content";
import { localizePath } from "@/content/locales";

export function notFoundMetadata(content: LocaleContent): Metadata {
	return {
		title: `${content.messages.notFound.title} — ${content.portfolio.owner.name}`,
		alternates: {},
	};
}

export function NotFoundView({ content }: { content: LocaleContent }) {
	const { owner } = content.portfolio;
	const { messages, locale } = content;
	const home = localizePath(locale, "/");

	return (
		<div className="page">
			<Breadcrumb
				label={messages.breadcrumb}
				items={[
					{ label: owner.name, href: home },
					{ label: messages.notFound.title },
				]}
			/>
			<PageHead
				title={messages.notFound.title}
				description={messages.notFound.description}
				link={{ label: messages.notFound.backHome, url: home }}
			/>
		</div>
	);
}
