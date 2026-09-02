import type { EntryLink } from "@/schema/portfolio";

type EntryLinksProps = {
	links: EntryLink[];
	label: string;
	focusable?: boolean;
};

export function EntryLinks({
	links,
	label,
	focusable = true,
}: EntryLinksProps) {
	return (
		<nav className="entry-links" aria-label={label}>
			{links.map((link) => (
				<a
					key={link.label}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					tabIndex={focusable ? undefined : -1}
				>
					{link.label}
					<span aria-hidden="true">↗</span>
				</a>
			))}
		</nav>
	);
}
