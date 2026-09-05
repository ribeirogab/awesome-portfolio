import type { MetadataRoute } from "next";
import { loadDefaultLocaleContent } from "@/content/locale-content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	const { site } = loadDefaultLocaleContent().portfolio;
	return {
		rules: [{ userAgent: "*", allow: "/" }],
		sitemap: `${site.url}/sitemap.xml`,
		host: site.url,
	};
}
