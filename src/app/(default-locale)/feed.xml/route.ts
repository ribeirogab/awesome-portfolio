import { loadDefaultLocaleContent } from "@/content/locale-content";
import { feedResponse } from "@/seo/feed";

export const dynamic = "force-static";

export function GET() {
	return feedResponse(loadDefaultLocaleContent());
}
