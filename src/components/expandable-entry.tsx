"use client";

import { useState } from "react";

type ExpandableEntryProps = {
	descriptionId: string;
	title: string;
	organization?: string;
	period?: string;
	technology?: string;
	description: string;
};

export function ExpandableEntry({
	descriptionId,
	title,
	organization,
	period,
	technology,
	description,
}: ExpandableEntryProps) {
	const [open, setOpen] = useState(false);

	return (
		<article className={open ? "entry open" : "entry"}>
			<div className="entry-row">
				<div>
					<h3 className="entry-title">{title}</h3>
					{organization ? <p className="entry-org">{organization}</p> : null}
				</div>
				{period ? <p className="entry-meta">{period}</p> : null}
				{technology ? <span className="tech-tag">{technology}</span> : null}
			</div>
			<div className="entry-desc" id={descriptionId}>
				<p>{description}</p>
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
