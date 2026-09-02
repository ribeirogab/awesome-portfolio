import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	const { site } = portfolio;
	return {
		rules: [{ userAgent: "*", allow: "/" }],
		sitemap: `${site.url}/sitemap.xml`,
		host: site.url,
	};
}
