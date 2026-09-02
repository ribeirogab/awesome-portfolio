import Link from "next/link";
import type { EntryLink } from "@/schema/portfolio";

const fileExtension = /\.[a-z0-9]+$/i;

export function HeadLink({ link }: { link: EntryLink }) {
	if (!link.url.startsWith("/")) {
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
	if (fileExtension.test(link.url)) {
		return (
			<a className="head-link" href={link.url}>
				{link.label} →
			</a>
		);
	}
	return (
		<Link className="head-link" href={link.url}>
			{link.label} →
		</Link>
	);
}
