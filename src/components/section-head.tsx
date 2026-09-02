import { HeadLink } from "@/components/head-link";
import type { EntryLink } from "@/schema/portfolio";

type SectionHeadProps = {
	sectionId: string;
	title: string;
	link?: EntryLink;
};

export function SectionHead({ sectionId, title, link }: SectionHeadProps) {
	return (
		<div className="section-head">
			<h2 className="label" id={`${sectionId}-label`}>
				{title}
			</h2>
			{link ? <HeadLink link={link} /> : null}
		</div>
	);
}
