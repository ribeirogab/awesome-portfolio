import { portfolio } from "@/data/portfolio";
import { ogContentType, ogImage, ogSize } from "@/seo/og-image";

export const alt = portfolio.site.title;
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	const { owner } = portfolio;
	return ogImage({
		label: owner.role,
		title: owner.name,
		description: owner.intro,
		footer: owner.availability,
	});
}
