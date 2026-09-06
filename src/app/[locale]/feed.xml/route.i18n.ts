import { loadLocaleContent } from "@/content/locale-content";
import { feedResponse } from "@/seo/feed";
import { localeParams } from "@/views/static-params";

export const dynamic = "force-static";

export function generateStaticParams() {
	return localeParams();
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ locale: string }> },
) {
	const { locale } = await params;
	return feedResponse(loadLocaleContent(locale));
}
