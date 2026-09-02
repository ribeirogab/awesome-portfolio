import { portfolio } from "@/data/portfolio";
import { ogContentType, ogImage, ogSize } from "@/seo/og-image";

const { owner, pages } = portfolio;

export const alt = `${pages.projects.title} — ${owner.name}`;
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return ogImage({
		label: owner.name,
		title: pages.projects.title,
		description: pages.projects.description,
	});
}
