import Link from "next/link";
import type { EntryLink } from "@/schema/portfolio";

export function HeadLink({ link }: { link: EntryLink }) {
	if (link.url.startsWith("/")) {
		return (
			<Link className="head-link" href={link.url}>
				{link.label} →
			</Link>
		);
	}
	return (
		<a
			className="head-link"
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
		>
			{link.label} ↗
		</a>
	);
}
