"use client";

import Image from "next/image";
import { useState } from "react";
import type { EntryLink } from "@/data/portfolio";

type ExpandableEntryProps = {
	descriptionId: string;
	title: string;
	organization?: string;
	logo?: string;
	period?: string;
	technology?: string;
	description: string;
	links?: EntryLink[];
};

export function ExpandableEntry({
	descriptionId,
	title,
	organization,
	logo,
	period,
	technology,
	description,
	links,
}: ExpandableEntryProps) {
	const [open, setOpen] = useState(false);

	return (
		<article className={open ? "entry open" : "entry"}>
			<div className="entry-row">
				<div className="entry-lead">
					{logo ? (
						<Image
							className="entry-logo"
							src={logo}
							alt=""
							width={40}
							height={40}
							unoptimized
						/>
					) : null}
					<div>
						<h3 className="entry-title">{title}</h3>
						{organization ? <p className="entry-org">{organization}</p> : null}
					</div>
				</div>
				{period ? <p className="entry-meta">{period}</p> : null}
				{technology ? <span className="tech-tag">{technology}</span> : null}
			</div>
			<div className="entry-desc" id={descriptionId}>
				<p>{description}</p>
				{links?.length ? (
					<nav className="entry-links" aria-label={`${title} links`}>
						{links.map((link) => (
							<a
								key={link.label}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								tabIndex={open ? undefined : -1}
							>
								{link.label}
								<span aria-hidden="true">↗</span>
							</a>
						))}
					</nav>
				) : null}
			</div>
			<button
				className="view-more"
				type="button"
				aria-expanded={open}
				aria-controls={descriptionId}
				onClick={() => setOpen((value) => !value)}
			>
				{open ? "View less" : "View more"}{" "}
				<span className="chev" aria-hidden="true">
					▾
				</span>
			</button>
		</article>
	);
}
