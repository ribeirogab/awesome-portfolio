"use client";

import Image from "next/image";
import { useState } from "react";
import { EntryLinks } from "@/components/entry-links";
import type { EntryLink } from "@/schema/portfolio";

type ExpandableEntryProps = {
	descriptionId: string;
	title: string;
	subtitle?: string;
	logo?: string;
	period?: string;
	tag?: string;
	description?: string;
	links?: EntryLink[];
};

export function ExpandableEntry({
	descriptionId,
	title,
	subtitle,
	logo,
	period,
	tag,
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
						{subtitle ? <p className="entry-org">{subtitle}</p> : null}
					</div>
				</div>
				{period ? <p className="entry-meta">{period}</p> : null}
				{tag ? <span className="tech-tag">{tag}</span> : null}
			</div>
			{description ? (
				<>
					<div className="entry-desc" id={descriptionId}>
						<p>{description}</p>
						{links?.length ? (
							<EntryLinks
								links={links}
								label={`${title} links`}
								focusable={open}
							/>
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
				</>
			) : null}
		</article>
	);
}
